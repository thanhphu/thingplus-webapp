# thingplus-webapp
Demo app for Thing+, an IoT platform.

This app simulates a train with several carriages, with people counter sensor at each door. It works in conjunction with rules in Thing+. When a rule is triggered, Thing+ will call this app's API and increase or decrease the number of people in one car.

The app is self contained and contains a GUI. Access it via port 3000 (by default).

This app have been tested on Heroku and is confirmed to work. However, any environment supporting Node.JS should work just fine.

## Development
Built with Node.js, express, bootstrap and jQuery. Also uses loki, an in-memory NoSQL DB with simple file persistence

`/public`: Static resources like javascript, css and images

`/routes`: Handlers for specific functions of the site

`/views`: Layout files, written in Jade

## Running
Please fill your OAuth ID and secret in .env.example and rename it to .env before running

    PORT=3000
    CLIENT_ID="Thing+ Client ID you created"
    CLIENT_SECRET="Thing+ Secret you chose"
    SESSION_SECRET="A random string"

Edit auth.js and put in the address of the api server you want to use

    const apiHost = 'api.thingplus.net';

In your console, type

    npm install
    node server.js

## Customizing
Use `routes/sample.js` as a starting point for your application. It contains a sample request to Thing+ 

## API documentation
API Endpoint: `/api`

Documentation: https://app.swaggerhub.com/apis/thanh-phu/train-monitoring/1.0.0
