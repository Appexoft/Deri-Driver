# Running on development

- Install dependencies: `yarn`
- build docker image: `docker-compose build`
- start docker: `docker-compose up`
- setup the database: `docker-compose exec server yarn run setup`
- If you need to sync the models: `docker-compose exec server npm run sync_db`

access ngrok dashboard: `http://localhost:4551`
 
# Login with Auth0 
Client Application settings:
- The Client application who’s client ID you are using must be of type native and password must be checked within the Applications -> Settings -> Advanced Settings -> Grant Types pannel

- Tenant Settings:
(Under tenant user account -> settings)
Set General -> API Authorization Settings ->Default Directory to Username-Password-Authentication


# AWS
```
sudo yum install fontconfigy
```
- Set PORT = 3030

# Deploying to AWS

## Requirements

- EB CLI (https://github.com/aws/aws-elastic-beanstalk-cli-setup) and AWS CLI (https://aws.amazon.com/es/cli/)
- Access to the AWS account or an access key and access secret to perform the deploy

## Initial configuration

- Clone the repo and install both EB CLI and AWS CLI.
- Obtain your aws keys (https://console.aws.amazon.com/iam/home#/security_credentials)
- Add your keys to the aws profiles (https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html#cli-configure-profiles-create)
- Configure the project running `eb init --profile <YOUR PROFILE NAME>`
  If the application and environment are already created, this should prompt you to select them.

## Deployment

- Deploy the application: `eb deploy --profile <YOUR PROFILE NAME> --region <REGION>`
