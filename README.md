# thingplus-webapp
Demo app for Thing+, an IoT platform

## Development
Built with Node.js, express, bootstrap and jQuery. Also uses loki, an in-memory NoSQL DB with simple file persistence

`/public`: Static resources like javascript, css and images

`/routes`: Handlers for specific functions of the site

`/views`: Layout files, written in Jade

## Running
Please fill your OAuth ID and secret in .env.example and rename it to .env before running

    PORT=3000
    CLIENT_ID=...
    CLIENT_SECRET=...
    SESSION_SECRET=...

Edit auth.js and put in the address of the api server you want to use

    const apiHost = 'api.thingplus.net';

In your console4

    npm install
    node server.js

## Customizing
Use `routes/sample.js` as a starting point for your application. It contains a sample request to Thing+ 

## API documentation
API Endpoint: `/api`

Documentation: https://app.swaggerhub.com/apis/thanh-phu/train-monitoring/1.0.0