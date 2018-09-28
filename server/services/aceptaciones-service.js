'use strict';
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var AceptacionsRsrc = require(__base + 'server/infrastructure/resources').aceptacion;

function getAcceptacion(id,idCliente) {
    var result;
    console.log('get Acceptacion by ' + id);
    try {
        if(id){
            result = await (AceptacionsRsrc.getAcceptacion(id));
        } else {
            result = await (AceptacionsRsrc.getAcceptacions(idCliente));
        }
        console.log('result length ' + result.length);    
    } catch(error) {
        throw error;
    }
    return { acceptacion: result };
}

function getAcceptacionCedula(cedula,clave) {
    var result;
    console.log('get Acceptacion by cedula ' + cedula);
    try {
        result = await (AceptacionsRsrc.getAcceptacionCedula(cedula,clave));
    } catch(error) {
        throw error;
    }
    return { acceptacion: result };
}

function updateAcceptacion(acceptacion) {
    var result;
    console.log('update Acceptacion by ' + acceptacion._id);
    try {
        result = await (AceptacionsRsrc.updateAcceptacion(acceptacion));
        console.log('result length ' + result.length);    
    } catch(error) {
        throw error;
    }
    return { acceptacion: result };
}

function deleteAcceptacion(id) {
    var result;
    console.log('delete Acceptacion by ' + id);
    try {
        result = await (AceptacionsRsrc.deleteAcceptacion(id));
        console.log('result length ' + result.length);    
    } catch(error) {
        throw error;
    }
    return { acceptacion: result };
}

function postAcceptacion(acceptacion) {
    var result;
    console.log('post Acceptacion service',acceptacion);
    try {
        result = await (AceptacionsRsrc.addAcceptacion(acceptacion));
        console.log('result length ' + result.length);    
    } catch(error) {
        throw error;
    }
    return { acceptacion: result };
}

module.exports.getAcceptacion = async(getAcceptacion);
module.exports.getAcceptacionCedula = async(getAcceptacionCedula);
module.exports.updateAcceptacion = async(updateAcceptacion);
module.exports.deleteAcceptacion = async(deleteAcceptacion);
module.exports.postAcceptacion = async(postAcceptacion);