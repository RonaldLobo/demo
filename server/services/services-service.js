'use strict';
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var ServicesRsrc = require(__base + 'server/infrastructure/resources').service;

function getService(id) {
    var result;
    console.log('get service by ' + id);
    try {
    	if(id){
        	result = await (ServicesRsrc.getService(id));
        } else {
        	result = await (ServicesRsrc.getServices());
        }   
    } catch(error) {
        throw error;
    }
    return { service: result };
}

function updateService(service) {
    var result;
    console.log('update service by ' + service._id);
    try {
        result = await (ServicesRsrc.updateService(service));
    } catch(error) {
        throw error;
    }
    return { service: result };
}

function deleteService(id) {
    var result;
    console.log('delete service by ' + id);
    try {
        result = await (ServicesRsrc.deleteService(id));
    } catch(error) {
        throw error;
    }
    return { service: result };
}

function postService(service) {
    var result;
    console.log('post service');
    try {
        result = await (ServicesRsrc.addService(service));
    } catch(error) {
        throw error;
    }
    return { service: result };
}

module.exports.getService = async(getService);
module.exports.updateService = async(updateService);
module.exports.deleteService = async(deleteService);
module.exports.postService = async(postService);