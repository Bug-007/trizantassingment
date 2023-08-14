const { Schema, model } = require('../Connection');
const myschema = new Schema({
    email: String,
    pno: Number,
    password: String,
 
});

module.exports = model('tranzita', myschema);