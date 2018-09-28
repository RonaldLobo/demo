var mongoose = require('mongoose');
var emailModel = require('./email');
var phoneModel = require('./phone');
var phoneSchema = phoneModel.schema;
var emailSchema = emailModel.schema;

var schema = new mongoose.Schema({
    nombre: { type: String, require: true },
    apellido1: { type: String, require: true },
    apellido2: { type: String },
    provincia : { type: String },
	canton : { type: String },
	distrito : { type: String },
	tipoId : { type: String },
    telefonos: [phoneSchema],
    correo: emailSchema,
    cedula: { type: String, require: true}
},{ 
	versionKey: false 
});

module.exports = mongoose.model('client', schema);
