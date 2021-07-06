const mongoose = require('mongoose');
require('mongoose-type-email');
// Package pour vérifier que l'email n'est pas déjà enregistré
const uniqueValidator = require('mongoose-unique-validator');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');
// const validate = require('mongoose-validator');
"use strict";  

const userSchema = mongoose.Schema({
  email: {
     type: String, 
     require: [true, "Veuillez entrer votre adresse email"], 
     unique: true,
     match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Veuillez entrer une adresse email correcte"]
    },
  password: { 
    type: String, 
    require: [true, "Veuillez choisir un mot de passe"] 
  }
});

userSchema.plugin(uniqueValidator);

// Plugin pour Mongoose qui purifie les champs du model avant de les enregistrer dans la base MongoDB.
// On utilise le HTML Sanitizer de Google Caja pour effectuer cette désinfection.
userSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model('User', userSchema);

