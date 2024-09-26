# Deploying a Node.js Application on AWS EC2 ##
## Introduction
This project demonstrates the process of deploying a Node.js application on an AWS EC2 instance. It covers the necessary steps to set up the development environment, configure the EC2 instance, and deploy the application.
## Getting Started
## Prerequisites
- An AWS account with appropriate permissions to create and manage EC2 instances.
- Basic knowledge of Node.js and AWS services.
## Cloning the Repository
1. Clone the repository: git clone https://github.com/AkashBhadana/AWS-Node.js-Deployment.git
## Setting up the Environment
1. Navigate to the project directory:  
    cd AWS-Node.js-Deployment
2. Create a .env file and set the following environment variables:  
   DOMAIN=  
  PORT=3000  
  STATIC_DIR="./client"  
  PUBLISHABLE_KEY=  
  SECRET_KEY=  
3. Install the project dependencies: npm install
4. Start the development server: npm run start 
## Deploying to AWS EC2
1. Create an IAM user with the necessary permissions to manage EC2 instances.
2. Create an EC2 instance:
- Select an Ubuntu OS image.
- Create a new key pair and download the .pem file.
3. Connect to the EC2 instance using SSH:  
  ssh -i instance.pem ubuntu@<EC2_INSTANCE_IP>
4. Update the package manager and install the required dependencies:  
  sudo apt update  
  sudo apt install git nodejs npm
5. Clone the repository on the EC2 instance:  
  git clone https://github.com/AkashBhadana/AWS-Node.js-Deployment.git
6. Set up the environment variables on the EC2 instance:  
  cd AWS-Node.js-Deployment  
  vim/nano .env  
  Add the necessary environment variables and save the file.
7. Install the project dependencies: npm install
8. Start the application: npm run start
9. Update the security group rules to allow traffic on the specified port.
## Conclusion
  This project provides a step-by-step guide to deploying a Node.js application on an AWS EC2 instance. By following these instructions, you can set up a development environment, configure the EC2 instance, and successfully deploy your application to the cloud.
  For any issues or questions, please feel free to open an issue on the GitHub repo(https://github.com/AkashBhadana/AWS-Node.js-Deployment)
