const passwordSchema = require('../models/password');
"use strict";


module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {        
        res.writeHead(400, '{"message":"Mot de passe requis : 8 caractères minimun. Au moins 1 Majuscule, 1chiffre, 1 minuscule. Sans espaces"}', {
            'content-type': 'application/json'
        });
        res.end('Format de mot de passe incorrect');
    } else {
        next();
    }
};