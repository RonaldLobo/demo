var async = require('asyncawait/async');
var await = require('asyncawait/await');
var sucursalModel = require(__base + 'server/model/sucursal');

function getSucursals() {
    var sucursals = await(sucursalModel.find({}));
    return sucursals;
}

function getSucursal(id) {
    var sucursal = await(sucursalModel.findOne({_id:id}));
    return sucursal;
}

function getSucursalCedula(cedula,clave) {
    var sucursal = await(sucursalModel.findOne({cedula:cedula , clave:clave}));
    return sucursal;
}

function deleteSucursal(id) {
    var sucursal = await(sucursalModel.remove({_id:id}));
    return sucursal;
}

function updateSucursal(sucursalParam) {
    var sucursal = await(sucursalModel.update({_id:sucursalParam._id},sucursalParam));
    return sucursal;
}

function addSucursal(sucursalParam) {
    var sucursal = await(sucursalModel.create(sucursalParam));
    return sucursal;
}

module.exports = {
    getSucursals: async(getSucursals),
    getSucursalCedula: async(getSucursalCedula),
    getSucursal: async(getSucursal),
    deleteSucursal: async(deleteSucursal),
    updateSucursal: async(updateSucursal),
    addSucursal: async(addSucursal)
};