var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    nombre: { type: String, require: true },
    cedula: { type: String, require: true },
    ubicacion: { type: String, require: true },
    telefonos: [{type: mongoose.Schema.Types.ObjectId, ref: 'phone'}],
    correo: {type: mongoose.Schema.Types.ObjectId, ref: 'email'},
    estado: { type: Boolean }
}, {
    versionKey: false
});

module.exports = mongoose.model('office', schema);
