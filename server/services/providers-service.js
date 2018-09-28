'use strict';
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var ProvidersRsrc = require(__base + 'server/infrastructure/resources').provider;

function getProvider(id) {
    var result;
    console.log('get provider by ' + id);
    try {
    	if(id){
        	result = await (ProvidersRsrc.getProvider(id));
        } else {
        	result = await (ProvidersRsrc.getProviders());
        }   
    } catch(error) {
        throw error;
    }
    return { provider: result };
}

function updateProvider(provider) {
    var result;
    console.log('update provider by ' + provider._id);
    try {
        result = await (ProvidersRsrc.updateProvider(provider));
    } catch(error) {
        throw error;
    }
    return { provider: result };
}

function deleteProvider(id) {
    var result;
    console.log('delete provider by ' + id);
    try {
        result = await (ProvidersRsrc.deleteProvider(id));
    } catch(error) {
        throw error;
    }
    return { provider: result };
}

function postProvider(provider) {
    var result;
    console.log('post provider');
    try {
        result = await (ProvidersRsrc.addProvider(provider));
    } catch(error) {
        throw error;
    }
    return { provider: result };
}

module.exports.getProvider = async(getProvider);
module.exports.updateProvider = async(updateProvider);
module.exports.deleteProvider = async(deleteProvider);
module.exports.postProvider = async(postProvider);