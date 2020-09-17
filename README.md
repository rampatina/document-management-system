# document-management-system

***To Deploy with docker***
Dockerized the DMS app, here is the steps to run it.
* Clone the repo
* Run the docker compose
  * If VS code already installed in your system then just open the repo and right click on 'docker-compose.yml' and click 'Compose Up'(OR)
  * Open terminal in the repo and execute 'docker-compose -f "docker-compose.yml" up -d --build'
* Open http://localhost:4200 to see the application
* Signup/Login to the app and verify.


***To run locally***

You just have MongoDB installed and running, and NodeJS installed.

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