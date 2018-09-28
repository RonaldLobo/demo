var mongoose = require('mongoose');
var await = require('asyncawait/await');
var async = require('asyncawait/async');
const csv = require('csvtojson');
mongoose.connect('mongodb://localhost:27017/solhidra_pdv', {
    connectTimeoutMS: 1000
});
var db = mongoose.connection;


db.on('error',function (error) {
    console.log('CONNECTION ERROR:',error);
});
//Output - 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting 
db.once('open',function () {
    console.log('Connected to mongodb');
});

var productoModel = require('../model/product');
var sucursalModel = require('../model/sucursal');

async function add(argument) {
	var sucursals = await(sucursalModel.find({}));
	console.log(sucursals);
	console.log(sucursals[0]._id);
	const csvFilePath='./pistones.csv';
	csv()
	.fromFile(csvFilePath)
	.then((jsonObj)=>{
	    // console.log(jsonObj);
	    var filtered = jsonObj.filter(obj => obj.field2 && obj.field1 != 'CANTIDAD');
	    for (var i = 0; i < filtered.length; i++) {
	    	filtered[i].field1 = (filtered[i].field1 == '') ? 0 : filtered[i].field1;
	    	filtered[i].field2 = filtered[i].field2.trim();
	    	filtered[i].field4 = (filtered[i].field4 == '') ? ''+i : filtered[i].field4.trim();
	    	filtered[i].field9 = filtered[i].field9.trim();
	    	filtered[i].field10 = filtered[i].field10.trim();
	    	delete filtered[i].field13;
	    	delete filtered[i].field14;
	    	delete filtered[i].field15;
	    	delete filtered[i].field16;
	    	delete filtered[i].field17;
	    	delete filtered[i].field18;
	    	delete filtered[i].field19;
	    	delete filtered[i].field20;
	    	delete filtered[i].field21;
	    	delete filtered[i].field22;
	    	delete filtered[i].field23;
	    	delete filtered[i].field24;
	    	delete filtered[i].field25;
	    	delete filtered[i].field26;
	    	insert(filtered[i],sucursals[0]._id)
			// console.log(producto._id);
	    }
	    console.log(filtered);
	    /**
	     * [
	     * 	{a:"1", b:"2", c:"3"},
	     * 	{a:"4", b:"5". c:"6"}
	     * ]
	     */ 
	})
}


async function insert(obj,sucId) {
	var producto = await(productoModel.create({
	    nombre : obj.field3.trim(),
		precio : obj.field7.trim(),
		descripcion : obj.field3.trim(),
		marca : obj.field9.trim(),
		codigo : obj.field4.trim(),
		unidad : 'Unid',
		cantidad : obj.field1,
		descuento : 0,
		descuento_tipo : 1,
		categoria : 1,
		estado : true,
		impuestos : 13,
		idSucursal : sucId,
		proveedor : obj.field10.trim(),
		modelo : obj.field2.trim(),
		utilidad : obj.field6,
		costo : obj.field5
	}));
}

add();







