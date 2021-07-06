const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
"use strict";  

const userSchema = mongoose.Schema({
  email: { type: String, require: true, unique: true },
 // emailMasked: { type: String, require: true, unique: true }, //mod
  password: { type: String, require: true }
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);