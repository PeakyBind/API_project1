// ./server.js

var express = require('express'),
    morgan = require('morgan'),
    path = require('path'),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv'),
    mongoose = require('mongoose');
// Initialisation de dotenv
dotenv.config();

// Connexion à la base de données
mongoose.connect(
  process.env.MONGO_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(
  () => { console.log("La connexion à la base de données a bien été établie.") },
  err => { console.log("Erreur lors de la connexion à la base de données: "+ err) }
);

// Détection des erreurs après que la connexion initiale à la base de données sois établie
mongoose.connection.on('error', err => {
  console.log(err);
});

// Initialisation de l'api et spécification des middlewares utilisés
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/users', require('./app/routes/usersRoutes'));

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

