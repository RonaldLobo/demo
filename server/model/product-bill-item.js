var mongoose = require('mongoose');

var productModel = require('./product');
var productModelSchema = productModel.schema;

var schema = new mongoose.Schema({
    producto: productModelSchema,
    descuento: { type: Number, require: true },
    descuento_tipo: { type: Number, require: true },
    cantidad: { type: Number, require: true },
    estado: { type: Boolean }
}, {
    versionKey: false
});

module.exports = mongoose.model('product-bill-item', schema);
