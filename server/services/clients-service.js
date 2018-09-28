'use strict';
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var ClientsRsrc = require(__base + 'server/infrastructure/resources').client;

function getClient(id) {
    var result;
    console.log('get Client by ' + id);
    try {
        if(id){
            result = await (ClientsRsrc.getClient(id));
        } else {
            result = await (ClientsRsrc.getClients());
        }
        console.log('result length ' + result.length);    
    } catch(error) {
        throw error;
    }
    return { client: result };
}

function getClientNombre(nombre) {
    var result;
    console.log('get client by ' + nombre);
    try {
        result = await (ClientsRsrc.getClientsNombre(nombre));
    } catch(error) {
        throw error;
    }
    return { client: result };
}

function getClientCedula(codigo) {
    var result;
    console.log('get client by ' + codigo);
    try {
        result = await (ClientsRsrc.getClientsCedula(codigo));
    } catch(error) {
        throw error;
    }
    return { client: result };
}

function updateClient(client) {
    var result;
    console.log('update Client by ' + client._id);
    try {
        result = await (ClientsRsrc.updateClient(client));
        console.log('result length ' + result.length);    
    } catch(error) {
        throw error;
    }
    return { client: result };
}

function deleteClient(id) {
    var result;
    console.log('delete Client by ' + id);
    try {
        result = await (ClientsRsrc.deleteClient(id));
        console.log('result length ' + result.length);    
    } catch(error) {
        throw error;
    }
    return { client: result };
}

function postClient(client) {
    var result;
    console.log('post Client service',client);
    try {
        result = await (ClientsRsrc.addClient(client));
        console.log('result length ' + result.length);    
    } catch(error) {
        throw error;
    }
    return { client: result };
}

module.exports.getClient = async(getClient);
module.exports.getClientNombre = async(getClientNombre);
module.exports.getClientCedula = async(getClientCedula);
module.exports.updateClient = async(updateClient);
module.exports.deleteClient = async(deleteClient);
module.exports.postClient = async(postClient);