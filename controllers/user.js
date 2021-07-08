const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config()

"use strict";

exports.signup = (req, res, next) => {
  // On appelle la méthode hash de bcrypt et on lui passe le mdp de l'utilisateur, le salte (10) ce sera le nombre de tours qu'on fait faire à l'algorithme
  bcrypt.hash(req.body.password, 10)
    // On récupère le hash de mdp qu'on va enregister en tant que nouvel utilisateur dans la BBD mongoDB
    .then(hash => {
      // Création du nouvel utilisateur avec le model mongoose
      const user = new User({
        // On passe l'email qu'on trouve dans le corps de la requête
        email: req.body.email,
        // On récupère le mdp hashé de bcrypt
        password: hash
      });
      // On enregistre l'utilisateur dans la base de données
      user.save()
        .then(() => res.status(201).json({
          message: 'Utilisateur créé !'
        }))
        .catch(error => res.status(400).json({
          error,
          //message: 'Utilisateur déjà créé'           
        })); // Si il existe déjà un utilisateur avec cette adresse email
    })
    .catch(error => res.status(500).json({
      error,
    }));
};


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                process.env.DB_TOKEN,
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};