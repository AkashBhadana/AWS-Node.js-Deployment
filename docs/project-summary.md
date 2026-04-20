# Project Summary

- **Production-ready stack:** Node.js + Express server validates every environment variable with `envalid`, serves static assets, and exposes `/config` + `/healthz` for observability.
- **Stripe integration:** Checkout sessions are wrapped with error handling + structured logs and can redirect via Stripe.js on the frontend.
- **Frontend polish:** Modern responsive landing page with hero, workshop grid, and Stripe.js integration; UI reflects actual workshop offerings with highlight points.
- **DevOps essentials:** Dockerfile, Docker Compose healthchecks, ESLint, Jest, Supertest, and a GitHub Actions workflow prove CI/CD discipline.
- **Deployment narrative:** README & docs walk through Docker-to-AWS deployment, Terraform-ready infrastructure notes, and observability via logs/health.

## Resume-ready bullets

1. Implemented a Dockerized Node.js + Stripe checkout experience with validated runtime config, health probes, and structured logging for production-grade reliability.
2. Crafted a dynamic workshop landing page that consumes `/config`, renders price-aware cards, and redirects users through Stripe.js checkout flows.
3. Automated quality gates via ESLint, Jest + Supertest, and a GitHub Actions workflow that installs dependencies, runs lint/tests, and builds the Docker image.
4. Documented the AWS deployment blueprint (ECR/ECS, secrets management, monitoring) and explained necessary Terraform/CloudWatch hooks for future infra work.
