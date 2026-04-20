# AWS Deployment Blueprint

This repo is designed to be Dockerized and pushed to AWS. The following blueprint keeps deployments reproducible and secure:

1. **Container registry** – Build the Docker image locally (`docker build -t aws-node-stripe-demo .`) and push it to an ECR repository that matches the `project-alias` you use in ECS.
2. **Secrets management** – Store `SECRET_KEY`, `PUBLISHABLE_KEY`, and `WORKSHOP_PRICE_X` values in Systems Manager Parameter Store (secure string) or Secrets Manager, then mount them in ECS Task Definitions.
3. **Networking** – Create a VPC, subnets, and a security group that exposes port 3000 (or your custom port). Attach an Application Load Balancer with a listener on port 80/443.
4. **ECS service** – Define a Fargate task (or EC2) with the image, link it to the log group for observability, and configure a health check against `/healthz`.
5. **CI/CD** – GitHub Actions can build & push the image to ECR, then update the ECS service via the AWS CLI (or use CodeDeploy/CodePipeline). The included workflow demonstrates how to run lint/tests and build the container as part of each push.
6. **Monitoring** – Ship request/error logs to CloudWatch via an IAM role and set alarms on high latency or checkout failures for early detection.

Produce Terraform/CloudFormation templates to stand up the VPC, ECS cluster, and supporting resources; adjust the names/regions to match your AWS structure.
