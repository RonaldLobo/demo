var async = require('asyncawait/async');
var await = require('asyncawait/await');
var providerModel = require(__base + 'server/model/provider');

function getProviders() {
    var providers = await(providerModel.find({}));
    return providers;
}

function getProvider(id) {
    var provider = await(providerModel.findOne({_id:id}));
    return provider;
}

function deleteProvider(id) {
    var provider = await(providerModel.remove({_id:id}));
    return provider;
}

function updateProvider(providerParam) {
    var provider = await(providerModel.update({_id:providerParam._id},providerParam));
    return provider;
}

function addProvider(providerParam) {
    var provider = await(providerModel.create(providerParam));
    return provider;
}

module.exports = {
    getProviders: async(getProviders),
    getProvider: async(getProvider),
    deleteProvider: async(deleteProvider),
    updateProvider: async(updateProvider),
    addProvider: async(addProvider)
};