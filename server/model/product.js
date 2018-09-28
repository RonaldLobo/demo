var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    nombre: { type: String, require: true },
    descripcion: { type: String, require: true },
    precio: { type: Number, require: true },
    marca: { type: String },
    codigo: { type: String, require: true},
    unidad: { type: String, require: true },
    provedor1: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    provedor2: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    cantidad: { type: Number, require: true },
    descuento: { type: Number, require: true },
    descuento_tipo: { type: Number, require: true },
    categoria: { type: Number, require: true },
    estado: { type: Boolean },
    impuestos: { type: Number, require: true },
    utilidad: { type: Number },
    idSucursal: { type: String },
    ubicacion: { type: String },
    proveedor: { type: String },
    modelo: { type: String },
    costo: { type: Number }
}, {
    versionKey: false
});

module.exports = mongoose.model('product', schema);
