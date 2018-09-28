'use strict';
var await = require('asyncawait/await');
var async = require('asyncawait/async');
var handlers = require(__base + 'server/routes/router-handlers');
var service = require(__base + 'server/services');
var routes = require('express').Router();


function getServices(request, response) {
    console.log('GET service',request.params.id);
    var result;
    try {
        result = await (service.servicesService.getService(request.params.id));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
    	console.log('error',error);
        return handlers.errorResponseHandler(response, error);
    }
}

function deleteServices(request, response) {
    console.log('DELETE service');
    var result;
    try {
        result = await (service.servicesService.deleteService(request.params.id));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function updateServices(request, response) {
    console.log('UPDATE service');
    var result;
    try {
        result = await (service.servicesService.updateService(request.body.service));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function postServices(request, response) {
    console.log('POST service');
    var result;
    try {
        result = await (service.servicesService.postService(request.body.service));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        if(error.code === 11000){
            return handlers.validationErrorHandler(response, error);
        }
        return handlers.errorResponseHandler(response, error);
    }
}

routes.get('/:id', async(getServices));
routes.get('/', async(getServices));
routes.delete('/:id', async(deleteServices));
routes.put('/:id', async(updateServices));
routes.post('/', async(postServices));

module.exports = routes;