const express = require("express");
const { resolve } = require("path");
const morgan = require("morgan");
const config = require("./config");
const logger = require("./logger");
const stripe = require("stripe")(config.STRIPE.SECRET_KEY);

const app = express();

const staticPath = config.STATIC_DIR_PATH;

app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

const sendStatic = (fileName) => (req, res, next) => {
  const filePath = resolve(staticPath, fileName);
  res.sendFile(filePath, (err) => {
    if (err) {
      next(err);
    }
  });
};

app.get("/", sendStatic("index.html"));
app.get("/success", sendStatic("success.html"));
app.get("/cancel", sendStatic("cancel.html"));

app.get("/healthz", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.get("/config", (req, res) => {
  const workshops = config.WORKSHOPS.map((workshop) => ({
    id: workshop.id,
    title: workshop.title,
    summary: workshop.summary,
    priceLabel: workshop.priceLabel,
    duration: workshop.duration,
    highlights: workshop.highlights,
    priceId: workshop.priceId,
  }));

  res.json({
    publishableKey: config.STRIPE.PUBLISHABLE_KEY,
    domain: config.DOMAIN,
    workshops,
  });
});

app.post("/create-checkout-session/:pid", async (req, res, next) => {
  const priceId = req.params.pid;

  if (!priceId) {
    return res.status(400).json({ error: "Missing price identifier" });
  }

  try {
    const successUrl = new URL("/success", config.DOMAIN).toString();
    const cancelUrl = new URL("/cancel", config.DOMAIN).toString();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${successUrl}?id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
    });

    res.status(201).json({
      sessionId: session.id,
      url: session.url || null,
    });
  } catch (error) {
    logger.error({ err: error, priceId, path: req.originalUrl }, "Stripe checkout failure");
    res.status(500).json({ error: "Unable to create checkout session right now." });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((error, req, res, next) => {
  logger.error({ err: error, path: req.originalUrl }, "Unhandled server error");
  res.status(error.statusCode || 500).json({ error: "Internal server failure" });
});

module.exports = app;
