var async = require('asyncawait/async');
var await = require('asyncawait/await');
var acceptacionModel = require(__base + 'server/model/acceptacion');

function getAcceptacions(idCliente) {
    var acceptacions;
    if(idCliente){
        acceptacions = await(acceptacionModel.find({'clienteApp':idCliente}));
    } else {
        acceptacions = await(acceptacionModel.find({}));
    }
    return acceptacions;
}

function getAcceptacion(id) {
    var acceptacion = await(acceptacionModel.findOne({_id:id}));
    return acceptacion;
}

function getAcceptacionCedula(cedula,clave) {
    var acceptacion = await(acceptacionModel.findOne({cedula:cedula , clave:clave}));
    return acceptacion;
}

function deleteAcceptacion(id) {
    var acceptacion = await(acceptacionModel.remove({_id:id}));
    return acceptacion;
}

function updateAcceptacion(acceptacionParam) {
    console.log('update',acceptacionParam);
    var acceptacion = await(acceptacionModel.update({_id:acceptacionParam._id},acceptacionParam));
    return acceptacion;
}

function addAcceptacion(acceptacionParam) {
    var acceptacion = await(acceptacionModel.create(acceptacionParam));
    return acceptacion;
}

module.exports = {
    getAcceptacions: async(getAcceptacions),
    getAcceptacionCedula: async(getAcceptacionCedula),
    getAcceptacion: async(getAcceptacion),
    deleteAcceptacion: async(deleteAcceptacion),
    updateAcceptacion: async(updateAcceptacion),
    addAcceptacion: async(addAcceptacion)
};