'use strict';
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var SucursalsRsrc = require(__base + 'server/infrastructure/resources').sucursal;

function getSucursal(id) {
    var result;
    console.log('get Sucursal by ' + id);
    try {
        if(id){
            result = await (SucursalsRsrc.getSucursal(id));
        } else {
            result = await (SucursalsRsrc.getSucursals());
        }
        console.log('result length ' + result.length);    
    } catch(error) {
        throw error;
    }
    return { sucursal: result };
}

function getSucursalCedula(cedula,clave) {
    var result;
    console.log('get Sucursal by cedula ' + cedula);
    try {
        result = await (SucursalsRsrc.getSucursalCedula(cedula,clave));
    } catch(error) {
        throw error;
    }
    return { sucursal: result };
}

function updateSucursal(sucursal) {
    var result;
    console.log('update Sucursal by ' + sucursal._id);
    try {
        result = await (SucursalsRsrc.updateSucursal(sucursal));
        console.log('result length ' + result.length);    
    } catch(error) {
        throw error;
    }
    return { sucursal: result };
}

function deleteSucursal(id) {
    var result;
    console.log('delete Sucursal by ' + id);
    try {
        result = await (SucursalsRsrc.deleteSucursal(id));
        console.log('result length ' + result.length);    
    } catch(error) {
        throw error;
    }
    return { sucursal: result };
}

function postSucursal(sucursal) {
    var result;
    console.log('post Sucursal service',sucursal);
    try {
        result = await (SucursalsRsrc.addSucursal(sucursal));
        console.log('result length ' + result.length);    
    } catch(error) {
        throw error;
    }
    return { sucursal: result };
}

module.exports.getSucursal = async(getSucursal);
module.exports.getSucursalCedula = async(getSucursalCedula);
module.exports.updateSucursal = async(updateSucursal);
module.exports.deleteSucursal = async(deleteSucursal);
module.exports.postSucursal = async(postSucursal);