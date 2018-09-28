var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    comprador: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    vendedor: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    notas: { type: String, require: true },
    servicios: [{type: mongoose.Schema.Types.ObjectId, ref: 'service-bill-item'}],
    descuento: { type: Number, require: true },
    descuento_tipo: { type: Number, require: true },
    tipoDePago: { type: String, require: true },
    comprobante: { type: String, require: true },
    estado: { type: Boolean }
}, {
    versionKey: false
});

module.exports = mongoose.model('service-bill', schema);
