process.env.DOMAIN = process.env.DOMAIN || "http://localhost:3000";
process.env.PORT = process.env.PORT || "3000";
process.env.STATIC_DIR = process.env.STATIC_DIR || "./client";
process.env.PUBLISHABLE_KEY = process.env.PUBLISHABLE_KEY || "pk_test_exampl123";
process.env.SECRET_KEY = process.env.SECRET_KEY || "sk_test_example123";
process.env.WORKSHOP_PRICE_1 = process.env.WORKSHOP_PRICE_1 || "price_test_1";
process.env.WORKSHOP_PRICE_2 = process.env.WORKSHOP_PRICE_2 || "price_test_2";
process.env.WORKSHOP_PRICE_3 = process.env.WORKSHOP_PRICE_3 || "price_test_3";

const request = require("supertest");
const app = require("../app");

describe("App routes", () => {
  test("/healthz returns status ok", async () => {
    const res = await request(app).get("/healthz");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
    expect(res.body).toHaveProperty("uptime");
  });

  test("/config exposes publishable key and workshops", async () => {
    const res = await request(app).get("/config");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("publishableKey");
    expect(res.body.publishableKey).toBe(process.env.PUBLISHABLE_KEY);
    expect(Array.isArray(res.body.workshops)).toBe(true);
    expect(res.body.workshops.length).toBeGreaterThanOrEqual(1);
    expect(res.body.workshops[0]).toHaveProperty("priceId");
  });
});
