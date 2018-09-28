var async = require('asyncawait/async');
var await = require('asyncawait/await');
var clientModel = require(__base + 'server/model/client');

function getClients() {
    var clients = await(clientModel.find({}));
    return clients;
}

function getClientsNombre(nombre) {
    var clients = await(clientModel.aggregate(
        [
            {$addFields: { fullName: { $concat : ['$nombre', " ",'$apellido1' ," ",'$apellido2']}}},
            {$match : { fullName: { $regex : nombre, $options: 'i' }}}
        ]
    ));
    return clients;
}

function getClientsCedula(cedula) {
    var clients = await(clientModel.find({cedula:new RegExp(cedula, 'i')}));
    return clients;
}

function getClient(id) {
    var client = await(clientModel.findOne({_id:id}));
    return client;
}

function deleteClient(id) {
    var client = await(clientModel.remove({_id:id}));
    return client;
}

function updateClient(clientParam) {
    var client = await(clientModel.update({_id:clientParam._id},clientParam));
    return client;
}

function addClient(clientParam) {
    var client = await(clientModel.create(clientParam));
    return client;
}

module.exports = {
    getClients: async(getClients),
    getClientsNombre: async(getClientsNombre),
    getClientsCedula: async(getClientsCedula),
    getClient: async(getClient),
    deleteClient: async(deleteClient),
    updateClient: async(updateClient),
    addClient: async(addClient)
};