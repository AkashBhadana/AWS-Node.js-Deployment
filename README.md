# AWS Node.js Deployment with Stripe Integration 🛍️

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

![CI](https://github.com/AkashBhadana/AWS-Node.js-Deployment/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/github/license/AkashBhadana/AWS-Node.js-Deployment?style=flat)

A production-minded Node.js + Express template that demonstrates a Stripe checkout flow, Docker deployment, CI/CD, and an AWS-ready infrastructure story.

## Table of contents
- [Overview](#overview)
- [Demo](#demo)
- [Technology stack](#technology-stack)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Environment variables](#environment-variables)
- [API endpoints](#api-endpoints)
- [Project structure](#project-structure)
- [Development commands](#development-commands)
- [Deployment](#deployment)
  - [Recommended: Docker](#recommended-docker)
  - [AWS readiness](#aws-readiness)
- [Testing & CI](#testing--ci)
- [Observability](#observability)
- [Resume bullets](#resume-bullets)

## Overview

- Validates every required environment variable (Stripe keys, price identifiers) before the server starts.
- Exposes `/config` for the frontend and `/healthz` for orchestration tooling.
- Ships a responsive SPA that fetches the workshop configuration, renders cards, and uses Stripe.js to redirect attendees.
- Includes Docker/Docker Compose, ESLint, Jest/Supertest tests, and a GitHub Actions workflow to prove CI/CD.

## Demo
- Home page: `http://localhost:3000`
- Health: `http://localhost:3000/healthz`

## Technology stack
- **Backend:** Node.js, Express, Stripe SDK, envalid for config validation.
- **Frontend:** Static HTML/CSS with a dynamic workshop grid powered by Stripe.js.
- **Workflows:** Docker, Docker Compose, GitHub Actions, Jest + Supertest, ESLint.
- **Deployment target:** AWS (ECR, ECS/Fargate, CloudWatch).

## Getting started

### Prerequisites
- [Node.js 18+](https://nodejs.org/) and npm
- Docker & Docker Compose (for containerized runs)
- A Stripe account with publishable + secret keys
- AWS account (optional) for production deployment

### Setup
1. **Clone the repo**
   ```bash
   git clone https://github.com/AkashBhadana/AWS-Node.js-Deployment.git
   cd AWS-Node.js-Deployment
   ```
2. **Copy the example env**
   ```bash
   cp .env.example .env
   ```
   Update the values inside `.env` (required). You must set:
   - `PUBLISHABLE_KEY` (Stripe publishable key, `pk_test_...`)
   - `SECRET_KEY` (Stripe secret key, `sk_test_...`)
   - at least one Stripe Price ID: `WORKSHOP_PRICE_1` (or `_2` / `_3`) (`price_...`)
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Run the development server**
   ```bash
   npm run devStart
   ```
   Open `http://localhost:3000` to see the landing page.

### Environment variables
| Key | Description |
| --- | --- |
| `DOMAIN` | Base URL used in Stripe success/cancel routes (e.g., `http://localhost:3000`). |
| `PORT` | Port for Express (default `3000`). |
| `STATIC_DIR` | Path to the static client assets (`./client`). |
| `LOG_LEVEL` | Log level (`info`, `debug`, `warn`, `error`). |
| `PUBLISHABLE_KEY` | Stripe publishable key (`pk_test_...`). |
| `SECRET_KEY` | Stripe secret key (`sk_test_...`). |
| `WORKSHOP_PRICE_1-3` | Stripe price IDs used by the workshop cards to build checkout sessions. |

### How to get Stripe values (test mode)
1. In Stripe Dashboard, switch to **Test mode**.
2. Copy `PUBLISHABLE_KEY` and `SECRET_KEY` from **Developers → API keys**.
3. Create a **Product** and a **Price** in Stripe, then copy the **Price ID** (starts with `price_...`).
4. Paste that ID into at least one of: `WORKSHOP_PRICE_1`, `WORKSHOP_PRICE_2`, `WORKSHOP_PRICE_3`.

## API endpoints
| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/healthz` | Health probe for Docker/ECS/ALB. |
| `GET` | `/config` | Frontend config payload (publishable key + workshops). |
| `POST` | `/create-checkout-session/:pid` | Creates a Stripe Checkout Session for a Stripe Price ID. |

## Project structure
- `server.js` bootstraps env + starts the server.
- `app.js` defines routes, Stripe session creation, and middleware.
- `config/index.js` validates env vars and builds the workshop config.
- `client/` contains the landing page and Stripe.js integration.
- `docs/` contains the AWS blueprint and resume summary.
- `tests/` contains Jest + Supertest sanity checks.

## Development commands
- `npm run devStart` – Start the server with Nodemon.
- `npm run lint` – Run ESLint over the backend files.
- `npm run test` – Execute Jest + Supertest requests.
- `npm run ci` – Runs `lint` and `test` in sequence.

## Deployment

### Recommended: Docker
Docker Compose picks up `.env` and exposes port 3000 with health checks.
```bash
docker-compose up --build
```
Stop with `docker-compose down`.

Note: If you change `PORT` in `.env`, Docker Compose will map the same port using `${PORT}` automatically.

### AWS readiness
Follow the blueprint in `docs/aws-deployment.md`:
1. Build & push the Docker image to Amazon ECR.
2. Store Stripe secrets + price IDs in Secrets Manager or Parameter Store.
3. Deploy the app to ECS (Fargate or EC2) behind an ALB targeting `/healthz`.
4. Use CloudWatch Logs + alarms to monitor request latency & failure rates.

## Testing & CI
- Local testing: ensure dependencies are installed (`npm install`), then run `npm test`.
- CI workflow: GitHub Actions installs deps, lints, runs Jest, and builds the Docker image (`.github/workflows/ci.yml`).

## Observability
- `/healthz` signals readiness; Docker Compose uses the same endpoint for health checks.
- `morgan` + `pino` log requests and structured errors, which can be forwarded to CloudWatch or Datadog.
- Stripe checkout errors are logged with metadata for faster debugging.

## Documentation
- `docs/project-summary.md` lists the resume-ready highlights.
- `docs/aws-deployment.md` outlines the AWS deployment steps.
