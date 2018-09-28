var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    nombre: { type: String, require: true },
    phone: [{type: mongoose.Schema.Types.ObjectId, ref: 'phone'}],
    email: {type: mongoose.Schema.Types.ObjectId, ref: 'email'},
    estado: { type: Boolean, require: true }
},{ 
	versionKey: false 
});

module.exports = mongoose.model('provider', schema);
