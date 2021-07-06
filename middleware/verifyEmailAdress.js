
// const User = require ('../models/User');
// const mongoose = require('mongoose')
// const {body} = require('express-validator');
// "use strict";

// const message = "Email and incorrect. Please try with a valid mail";
// exports.checkEmail = [
// 	body('email').isEmail().withMessage(message),
// ]



// const User = require ('../models/User');
// const mongoose = require('mongoose')
// const {check, validationResult} = require('express-validator');
// "use strict";

// const message = "Email and incorrect. Please try with a valid mail";
// exports.checkEmail = (req,res,next) => {
// 	check('email').isEmail().withMessage(message);

// 	let errors = validationResult(req);
// 	console.log(errors);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     } else {
// 		next()
// 	}
// }






// module.exports = async (req, res, next) => {
//     const user = new User({email: req.body.email});
//     const userEmail = user.email;
//     const message = "Email is incorrect. Please try with a valid mail";
//     console.log(userEmail); 
//     body('email').isEmail().withMessage(message)   
//     next();
// }



// exports.emailValidator = [
//     validate({
//       validator: 'isLength',
//       arguments: [3, 50],
//       message: 'email should be between {ARGS[0]} and {ARGS[1]} characters',
//     }),
//     validate({
//         validator: 'matches',
//         arguments: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, 
//         message: "Veuillez entrer un format d'adresse email valide svp",
//       }),
//   ];


// procéder autrement pour la validation d'emails 
// utiliser les regex 
// voir le package Mongo Express Validator


// module.exports = async (req, res, next) => {
//     const nbUsers = await User.countDocuments();
//     if (nbUsers === 0) {
//         next();
//     } else {
//         const users = await User.find();
//         const user = users.reduce((acc, user) => {
//             const emailDecrypted = utils.decrypt(user.email);
//             if (emailDecrypted === req.body.email) {
//                 acc = user;
//             }
//             return acc;
//         }, null);

//         if (user) {
//             return res.status(400).json({error: 'Email déjà utilisé ! '});
//         } else {
//             next();
//         }
//     }
// }





