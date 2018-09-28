var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    correo: { type: String, require: true },
    estado: { type: Boolean }
}, {
    versionKey: false
});

module.exports = mongoose.model('email', schema);
