# document-management-system

Dockerized the MEAN app, but have some issues with Angular dependencies to load app.

*To run locally*, you just have MongoDB installed and running, and NodeJS installed.

* Start MongoDB
* Connect to mongo and create two collections
  * db.createCollection('folders');
  * db.createCollection('documents');
* Clone the repo
* Please update the URI in api/models/db.js with your local monog URI.
* To start express server: `npm install` to install API dependencies and `npm start` to start the API
* To start front end: Open a new terminal and navigate to the `client` directory, `npm install` to setup the Angular dependencies, and `npm start` to start the local development server
* Open http://localhost:4200 to see the application
* Signup/login to the app and use it.