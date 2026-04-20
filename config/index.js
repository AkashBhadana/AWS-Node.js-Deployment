const path = require("path");
const { cleanEnv, port, str, url } = require("envalid");

const env = cleanEnv(process.env, {
  DOMAIN: url({ default: "http://localhost:3000" }),
  PORT: port({ default: 3000 }),
  STATIC_DIR: str({ default: "./client" }),
  PUBLISHABLE_KEY: str(),
  SECRET_KEY: str(),
  // Allow running with 1..3 workshops configured (at least one required).
  WORKSHOP_PRICE_1: str({ default: "" }),
  WORKSHOP_PRICE_2: str({ default: "" }),
  WORKSHOP_PRICE_3: str({ default: "" }),
});

const STATIC_DIR_PATH = path.resolve(env.STATIC_DIR);

const WORKSHOPS = [
  {
    id: "productivity-boost",
    title: "Productivity Boost Workshop",
    summary: "Ship customer-ready Stripe flows with a modern Node stack.",
    priceLabel: "$49",
    duration: "1.5 hrs",
    priceId: env.WORKSHOP_PRICE_1,
    highlights: ["Live Stripe checkout", "Hands-on Express labs", "Deployment checklist"],
  },
  {
    id: "automation-sprint",
    title: "Automation Sprint",
    summary: "Automate deployments and CI/CD so your team releases confidently.",
    priceLabel: "$69",
    duration: "2 hrs",
    priceId: env.WORKSHOP_PRICE_2,
    highlights: ["Docker & ECS", "CI/CD pipe", "Monitoring best practices"],
  },
  {
    id: "infrastructure-lab",
    title: "Infrastructure Lab",
    summary: "Define AWS infra with reproducible code that scales safely.",
    priceLabel: "$89",
    duration: "2.5 hrs",
    priceId: env.WORKSHOP_PRICE_3,
    highlights: ["Terraform sample", "Secure secrets", "Observability hooks"],
  },
];

const configuredWorkshops = WORKSHOPS.filter((workshop) => Boolean(workshop.priceId));

if (!configuredWorkshops.length) {
  throw new Error("At least one WORKSHOP_PRICE_X variable must be set to enable workshops.");
}

const config = {
  PORT: env.PORT,
  DOMAIN: env.DOMAIN,
  STATIC_DIR_PATH,
  STRIPE: {
    SECRET_KEY: env.SECRET_KEY,
    PUBLISHABLE_KEY: env.PUBLISHABLE_KEY,
  },
  WORKSHOPS: configuredWorkshops,
};

module.exports = config;
