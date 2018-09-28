var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    nombre: { type: String, require: true },
    duracion: { type: Number, require: true },
    precio: { type: Number, require: true },
    descripcion: { type: String, require: true },
    descuento: { type: String, require: true },
    tipo_desc: { type: String, require: true },
    codigo: { type: String},
    fecha: { type: Date, require: true },
    estado: { type: Boolean }
}, {
    versionKey: false
});

module.exports = mongoose.model('service', schema);
