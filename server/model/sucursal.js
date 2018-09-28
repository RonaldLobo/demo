var mongoose = require('mongoose');
var emailModel = require('./email');
var phoneModel = require('./phone');
var phoneSchema = phoneModel.schema;
var emailSchema = emailModel.schema;

var schema = new mongoose.Schema({
    nombre: { type: String, require: true },
    senas: { type: String },
    provincia: { type: String },
    canton: { type: String },
    distrito: { type: String },
    idEmpresa: { type: String },
    telefonos: [phoneSchema],
    correo: emailSchema,
},{ 
	versionKey: false 
});

module.exports = mongoose.model('sucursal', schema);
