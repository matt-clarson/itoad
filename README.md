# It's This or a Doughnut Website

Website made with Gatsby.

## Setup

To setup, you need a machine with the following installed:

-   [Git](https://git-scm.com/)
-   [NodeJS (LTS)](https://nodejs.org/en/)
-   [NPM](https://docs.npmjs.com/cli/v6/commands/npm) or [Yarn](https://yarnpkg.com/)
-   [Python > 3.6](https://www.python.org/downloads/)
-   [AWS Cli v2](https://aws.amazon.com/cli/)

Clone this repo:

```bash
git clone https://github.com/matt-clarson/itoad.git
```

Install code dependencies

```bash
# site dependencies
npm install
# deployer dependencies
python3 -m venv env; # create virtual environment
source ./env/bin/activate # activate the environment
pip install -r requirements.txt # install python dependencies
```

Configure AWS

```bash
# run this and follow the prompts to configure an IAM user profile called 'itoad-publisher'
aws configure --profile itoad-publisher
```

## Develop

Run `npm start` and write code etc.

## Build and Deploy

```bash
# build the site
npm run build

# deploy to AWS (note, must have awscli installed, and a publisher IAM user configured)
#
# deploy to the TEST environment:
./deploy/publish.py $PWD/public
# deploy to the PROD environment:
BUCKET_NAME=<prod_bucket_name> ./deploy/publish.py $PWD/public
# deploy to PROD and clear old files from cache
CACHE_ID=<cache_id> BUCKET_NAME=<prod_bucket_name> ./deploy/publish.py $PWD/public
```
