// ./server.js

var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv');

// Initialisation de dotenv
dotenv.config();

// Initialisation de l'api et spécification des middlewares utilisés
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Definition du port
var port = process.env.APP_PORT;
app.listen(port);
console.log('Ecoute sur le port ' + port);

