## Description

Trip Planner: this repo implements API that let the user search for a trip in a 3rd party service and manage it with CRUD operations

## Project setup

```bash
# Download this repo
$ git clone git@github.com:gtoso81/trip-planner.git
#OR
$ git clone https://github.com/gtoso81/trip-planner.git
```

```bash
# Go to the downloaded repo folder
$ cd trip-planner
```

```bash
# Download dependencies
$ npm install
```

Make a .env file starting from .env.example and fill in the values for X_API_KEY, SEARCH_URL and MONGODB_URL
For MONGODB_URL can be used the one provided by docker-compose `mongodb://localhost:27017/trip-planner`

## Run Docker
This project leverages a MongoDB provided with Docker, to run it you have to have Docker installed 
```bash
$ docker-compose up -d
```

## Run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Description 
When the app is running you can find a Swagger with the API documentation at this url: `http://localhost:3000/api`, you can try out the requests using the suggested fields and description

The available routes are:
* `/search`: to query the 3rd party API 
* `/manage`: to perform CRUD operations that let the user save, list, get a single saved trip, update it or delete it; implemented using CQRS
