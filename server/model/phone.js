var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    telefono: { type: Number, require: true },
    estado: { type: Boolean }
}, {
    versionKey: false
});

module.exports = mongoose.model('phone', schema);
