'use strict';
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var EmpresasRsrc = require(__base + 'server/infrastructure/resources').empresa;

function getEmpresa(id) {
    var result;
    console.log('get Empresa by ' + id);
    try {
        if(id){
            result = await (EmpresasRsrc.getEmpresa(id));
        } else {
            result = await (EmpresasRsrc.getEmpresas());
        }
        console.log('result length ' + result.length);    
    } catch(error) {
        throw error;
    }
    return { empresa: result };
}

function getEmpresaCedula(cedula,clave) {
    var result;
    console.log('get Empresa by cedula ' + cedula);
    try {
        result = await (EmpresasRsrc.getEmpresaCedula(cedula,clave));
    } catch(error) {
        throw error;
    }
    return { empresa: result };
}

function updateEmpresa(empresa) {
    var result;
    console.log('update Empresa by ' + empresa._id);
    try {
        result = await (EmpresasRsrc.updateEmpresa(empresa));
        console.log('result length ' + result.length);    
    } catch(error) {
        throw error;
    }
    return { empresa: result };
}

function deleteEmpresa(id) {
    var result;
    console.log('delete Empresa by ' + id);
    try {
        result = await (EmpresasRsrc.deleteEmpresa(id));
        console.log('result length ' + result.length);    
    } catch(error) {
        throw error;
    }
    return { empresa: result };
}

function postEmpresa(empresa) {
    var result;
    console.log('post Empresa service',empresa);
    try {
        result = await (EmpresasRsrc.addEmpresa(empresa));
        console.log('result length ' + result.length);    
    } catch(error) {
        throw error;
    }
    return { empresa: result };
}

module.exports.getEmpresa = async(getEmpresa);
module.exports.getEmpresaCedula = async(getEmpresaCedula);
module.exports.updateEmpresa = async(updateEmpresa);
module.exports.deleteEmpresa = async(deleteEmpresa);
module.exports.postEmpresa = async(postEmpresa);