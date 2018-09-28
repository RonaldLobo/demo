var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    servicio: {type: mongoose.Schema.Types.ObjectId, ref: 'service'},
    descuento: { type: Number, require: true },
    descuento_tipo: { type: Number, require: true },
    estado: { type: Boolean }
}, {
    versionKey: false
});

module.exports = mongoose.model('service-bill-item', schema);
