const bcrypt = require('bcrypt');
// const base64 = require("base-64");

function bcryptingPassword(password) {
    try {
        const saltRounds = 10; 
        const hash = bcrypt.hashSync(password, saltRounds);
        return hash;
    } catch (err) {
        console.error('Error hashing password: ', err);
        throw err; 
    }
}

module.exports = {
    bcryptingPassword,
}