const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const session = require('cookie-session');
const nocache = require('nocache');
const path = require('path');
"use strict"


const app = express();

mongoose.connect('mongodb+srv://database_manager:dbmanager@cluster0.t6got.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Middleware Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur
app.use((req, res, next) => {
  // on indique que les ressources peuvent être partagées depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*');
  // on indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // on indique les méthodes autorisées pour les requêtes HTTP
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  // on autorise ce serveur à fournir des scripts pour la page visitée
  // res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

app.use(session ({
  secret: "s3Cur3",
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'http://localhost:3000',
  }
})
);

//Désactive la mise en cache du navigateur
app.use(nocache());

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;