const workshopGrid = document.querySelector("#workshop-grid");
const statusMessage = document.querySelector("#status-message");

const updateStatus = (text, variant = "") => {
  if (!statusMessage) return;
  statusMessage.textContent = text;
  statusMessage.className = variant ? `status ${variant}` : "status";
};

const createCard = (workshop) => {
  const highlights = workshop.highlights
    .map((item) => `<li>${item}</li>`) // no escaping for simplicity; data is trusted.
    .join("");

  return `
    <article class="card">
      <header>
        <span>${workshop.duration}</span>
        <strong>${workshop.priceLabel}</strong>
      </header>
      <h3>${workshop.title}</h3>
      <p>${workshop.summary}</p>
      <ul class="highlights">${highlights}</ul>
      <footer>
        <button class="btn primary" data-action="checkout" data-price-id="${workshop.priceId}">
          Reserve a seat
        </button>
      </footer>
    </article>
  `;
};

const attachCheckoutHandlers = (stripeClient) => {
  const buttons = document.querySelectorAll("button[data-action='checkout']");
  buttons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const priceId = button.dataset.priceId;
      if (!priceId) {
        updateStatus("Price information is missing.", "error");
        return;
      }

      button.disabled = true;
      const originalText = button.textContent;
      button.textContent = "Redirecting…";

      try {
        const response = await fetch(`/create-checkout-session/${priceId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || "Unable to create checkout session.");
        }

        updateStatus("Redirecting to Stripe…");

        if (payload.url) {
          window.location.href = payload.url;
          return;
        }

        const { error } = await stripeClient.redirectToCheckout({ sessionId: payload.sessionId });

        if (error) {
          throw new Error(error.message);
        }
      } catch (err) {
        updateStatus(err.message || "Checkout failed.", "error");
      } finally {
        button.disabled = false;
        button.textContent = originalText;
      }
    });
  });
};

const bootstrap = async () => {
  try {
    const response = await fetch("/config");

    if (!response.ok) {
      throw new Error("Unable to load configuration.");
    }

    const config = await response.json();

    if (!config.workshops?.length) {
      throw new Error("No workshops configured.");
    }

    if (!window.Stripe) {
      throw new Error("Stripe.js failed to load.");
    }

    const stripeClient = Stripe(config.publishableKey);
    const markup = config.workshops.map(createCard).join("\n");
    workshopGrid.innerHTML = markup;
    attachCheckoutHandlers(stripeClient);
    updateStatus("");
  } catch (error) {
    workshopGrid.innerHTML = `
      <p class="muted">${error.message || "Something went wrong."}</p>
    `;
    updateStatus(error.message || "Unable to load workshops.", "error");
  }
};

document.addEventListener("DOMContentLoaded", bootstrap);
