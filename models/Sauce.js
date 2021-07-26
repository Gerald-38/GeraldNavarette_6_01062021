const mongoose = require('mongoose');
"use strict";


const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { 
    type: String,
    validate: {
      validator: function(v) {
        return  /^[a-z\d\-_\s]+$/i.test(v) && v.length>3 && v.length<50;
      },
      message: 'this name is not  valid'
    },
    required: [true, 'Sauce name required']
  },
  manufacturer: {
    type: String, 
    validate: {
      validator: function(v) {
        return  /^[a-z\d\-_\s]+$/i.test(v) && v.length>3 && v.length<50;
      },
      message: 'this manufacturer is not  valid'
    },
    required: [true, 'Sauce manufacturer required']
  },
  description: { 
    type: String, 
    validate: {
      validator: function(v) {
        return  v.length>3 && v.length<255;
      },
      message: 'this description is not  valid'
    },
    required: [true, 'Sauce description required']
  },
  mainPepper: { 
    type: String, 
    validate: {
      validator: function(v) {
        return  /^[a-z\d\-_\s]+$/i.test(v) && v.length>3 && v.length<50;
      },
      message: 'this main pepper is not  valid'
    },
    required: [true, 'Sauce main pepper required']
  },
  imageUrl: { type: String, required: true },  
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: {type: Array, default: []},
  usersDisliked: {type: Array, default: []},
});
module.exports = mongoose.model('Sauce', sauceSchema);

