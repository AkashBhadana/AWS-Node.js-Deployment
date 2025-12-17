# AWS Node.js Deployment with Stripe Integration 🛍️

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

This project demonstrates a streamlined process for deploying a Node.js and Express application, featuring Stripe integration, onto AWS using Docker.

---

## 📋 Table of Contents

- [Introduction](#aws-nodejs-deployment-with-stripe-integration-️)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#-prerequisites)
  - [Setup](#-setup)
- [🚀 Deployment](#-deployment)
  - [Recommended: Docker Deployment](#recommended-docker-deployment)
  - [Alternative: Manual EC2 Deployment](#alternative-manual-ec2-deployment)
- [Conclusion](#-conclusion)

---

## ✨ Features

-   **Stripe Integration:** Pre-configured for processing payments with Stripe.
-   **Dockerized:** Includes a `Dockerfile` for easy, consistent, and reliable deployments.
-   **AWS Ready:** Designed to be deployed on AWS services like EC2.
-   **Simple Frontend:** A basic client interface to demonstrate functionality.

---

## 🛠️ Technology Stack

-   **Backend:** Node.js, Express.js
-   **Payments:** Stripe
-   **Deployment:** Docker, AWS EC2
-   **Dev Tools:** Nodemon

---

## 🏁 Getting Started

### Prerequisites

-   An AWS account with permissions for EC2.
-   Node.js and npm installed locally.
-   Docker installed locally.
-   A Stripe account with API keys.

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AkashBhadana/AWS-Node.js-Deployment.git
    cd AWS-Node.js-Deployment
    ```

2.  **Create `.env` file:**
    Create a `.env` file in the root directory and add the following variables. Get your keys from the [Stripe Developer Dashboard](https://dashboard.stripe.com/test/apikeys).

    ```env
    DOMAIN=http://localhost:3000
    PORT=3000
    STATIC_DIR=./client
    PUBLISHABLE_KEY=pk_test_...
    SECRET_KEY=sk_test_...
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run devStart
    ```
    The application should now be running at `http://localhost:3000`.

---

## 🚀 Deployment

This project is designed to be deployed using Docker, which is the recommended method.

### Recommended: Docker Deployment

The included `Dockerfile` and `docker-compose.yml` make deployment simple and reliable.

1.  **Build and run with Docker Compose:**
    Ensure your `.env` file is configured with the necessary variables.
    ```bash
    docker-compose up --build
    ```
    This command will build the Docker image (if not already built) and start the application container. Your application will be running inside a Docker container and accessible at `http://localhost:3000`.

2.  **Stopping the application:**
    To stop the running containers, press `Ctrl+C` in the terminal where `docker-compose up` is running, or run:
    ```bash
    docker-compose down
    ```

    You can push this image to a registry like Docker Hub or Amazon ECR to deploy it on AWS.

### Alternative: Manual EC2 Deployment

<details>
<summary>Click to expand for manual deployment steps</summary>

> **Note:** This method is not recommended for production environments due to its manual and error-prone nature.

1.  **Create an EC2 instance:**
    -   Select an Ubuntu OS image.
    -   Create a new key pair and download the `.pem` file.
    -   Ensure your security group allows inbound traffic on your desired port (e.g., 3000).

2.  **Connect to the EC2 instance:**
    ```bash
    ssh -i "your-key.pem" ubuntu@<EC2_INSTANCE_IP>
    ```

3.  **Install dependencies:**
    ```bash
    sudo apt update
    sudo apt install git nodejs npm
    ```

4.  **Clone the repository:**
    ```bash
    git clone https://github.com/AkashBhadana/AWS-Node.js-Deployment.git
    cd AWS-Node.js-Deployment
    ```

5.  **Set up environment variables:**
    ```bash
    nano .env
    # Add your variables here
    ```

6.  **Install project dependencies and start:**
    ```bash
    npm install
    npm start
    ```

</details>

---

## ✅ Conclusion

This project provides a clear, containerized, and modern approach to deploying a Node.js application. By leveraging Docker, we ensure consistency from development to production.

For any issues or questions, please open an issue on the [GitHub repository](https://github.com/AkashBhadana/AWS-Node.js-Deployment).
