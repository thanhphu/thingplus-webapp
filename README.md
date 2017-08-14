# thingplus-webapp
Demo app for thing+, an IoT platform

## Development
Built with Node.js, express, bootstrap and jQuery. Also uses loki, an in-memory NoSQL DB with simple file persistence

`/public`: Static resources like javascript, css and images

`/routes`: Handlers for specific functions of the site

`/views`: Layout files, written in Jade

## Running
Please fill your OAuth ID and secret in .env.example and rename it to .env before running

    npm install
    node server.js

## API documentation
API Endpoint: `/api`

Documentation: https://app.swaggerhub.com/apis/thanh-phu/train-monitoring/1.0.0