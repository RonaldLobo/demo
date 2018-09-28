var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    detalle_mensaje: { type: String, require: true },
    mensaje: { type: String, require: true },
    fecha_emision_doc: { type: String, require: true },
    monto_total_impuesto: { type: String, require: true },
    numero_cedula_emisor: { type: String, require: true },
    numero_cedula_receptor: { type: String, require: true },
    tipo_cedula_emisor: { type: String, require: true },
    tipo_cedula_receptor: { type: String, require: true },
    total_factura: { type: String, require: true },
    cliente: { type: String, require: true },
    clienteApp: { type: String, default: '' },
    clave : { type: String },
    refresh : { type: String },
    estado: { type: String }
},{ 
	versionKey: false 
});

module.exports = mongoose.model('aceptacion', schema);
