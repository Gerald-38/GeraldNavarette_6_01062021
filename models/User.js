const mongoose = require('mongoose');
require('mongoose-type-email');
const uniqueValidator = require('mongoose-unique-validator');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');
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
// s'assurer que les données venant du front end ne font pas l'objet d'injections qui peuvent créer des attaques non sql.
userSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model('User', userSchema);

