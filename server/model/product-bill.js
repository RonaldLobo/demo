var mongoose = require('mongoose');
var pbiModel = require('./product-bill-item');
var clientModel = require('./client');
var userModel = require('./user');
var pbiModelSchema = pbiModel.schema;
var clientSchema = clientModel.schema;
var userSchema = userModel.schema;

var schema = new mongoose.Schema({
    comprador: clientSchema,
    vendedor: userSchema,
    productos: [pbiModelSchema],
    notas: { type: String, require: true },
    tipo_de_pago: { type: String, require: true },
    comprobante: { type: String, require: true },
    descuento: { type: Number, require: true },
    total: { type: Number, require: true, default: 0 },
    descuento_tipo: { type: Number, require: true },
    consecutivo : { type: String },
    clave : { type: String },
    refresh : { type: String },
    fecha_modificada: { type: Date, default: Date.now },
    estado: { type: String, require: true},
    idSucursal: { type: String}
}, {
    versionKey: false
});

module.exports = mongoose.model('product-bill', schema);
