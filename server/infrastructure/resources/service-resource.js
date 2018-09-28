var async = require('asyncawait/async');
var await = require('asyncawait/await');
var serviceModel = require(__base + 'server/model/service');

function getServices() {
    var services = await(serviceModel.find({}));
    return services;
}

function getService(id) {
    var service = await(serviceModel.findOne({_id:id}));
    return service;
}

function deleteService(id) {
    var service = await(serviceModel.remove({_id:id}));
    return service;
}

function updateService(serviceParam) {
    var service = await(serviceModel.update({_id:serviceParam._id},serviceParam));
    return service;
}

function addService(serviceParam) {
    var service = await(serviceModel.create(serviceParam));
    return service;
}

module.exports = {
    getServices: async(getServices),
    getService: async(getService),
    deleteService: async(deleteService),
    updateService: async(updateService),
    addService: async(addService)
};