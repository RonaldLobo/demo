var async = require('asyncawait/async');
var await = require('asyncawait/await');
var empresaModel = require(__base + 'server/model/empresa');

function getEmpresas() {
    var empresas = await(empresaModel.find({}));
    return empresas;
}

function getEmpresa(id) {
    var empresa = await(empresaModel.findOne({_id:id}));
    return empresa;
}

function getEmpresaCedula(cedula,clave) {
    var empresa = await(empresaModel.findOne({cedula:cedula , clave:clave}));
    return empresa;
}

function deleteEmpresa(id) {
    var empresa = await(empresaModel.remove({_id:id}));
    return empresa;
}

function updateEmpresa(empresaParam) {
    var empresa = await(empresaModel.update({_id:empresaParam._id},empresaParam));
    return empresa;
}

function addEmpresa(empresaParam) {
    var empresa = await(empresaModel.create(empresaParam));
    return empresa;
}

module.exports = {
    getEmpresas: async(getEmpresas),
    getEmpresaCedula: async(getEmpresaCedula),
    getEmpresa: async(getEmpresa),
    deleteEmpresa: async(deleteEmpresa),
    updateEmpresa: async(updateEmpresa),
    addEmpresa: async(addEmpresa)
};