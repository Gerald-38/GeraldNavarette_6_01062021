const passwordValidator = require('password-validator');  

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)
.has().uppercase()
.has().lowercase()
.has().digits()
.is().not().oneOf(['Passw0rd', 'Passwprd123']);

module.exports = passwordSchema;