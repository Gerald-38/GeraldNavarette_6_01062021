const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const verifyPassword = require('../middleware/verifyPassword');
const verifyEmailAdress = require('../middleware/verifyEmailAdress');

"use strict" 

router.post('/signup', verifyEmailAdress.checkEmail, verifyPassword,  userCtrl.signup);
router.post('/login',  userCtrl.login);

module.exports = router;