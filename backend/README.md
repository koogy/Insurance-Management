# Description

Backend project

# Local development

## Installation

```bash
$ npm install
```

## Start a database

```bash
$ npm run containers:db:start
```

## Running the app

Runs the app in the development mode.
```bash
# development
$ npm run start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Reset the database

```
npm run containers:stop
npm run containers:db:erase
```

# With docker

```
docker build -t poca/poca-2022:latest .
docker image ls
```

## Start the docker image

Assuming a database is ready:

```
docker run --net=host --env NODE_ENV=development poca/poca-2022:latest
```

## Publish the image

```
docker login
docker push poca/poca-2022:latest
```

## Remove old images

```
docker image prune
```

## Use the software online

Go to http://35.181.2.217/api/front

## Logs

Logs are stored on AWS Cloudwatch: https://eu-west-3.console.aws.amazon.com/cloudwatch/home?region=eu-west-3#logsV2:log-groups/log-group/poca-web/log-events
