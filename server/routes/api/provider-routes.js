'use strict';
var await = require('asyncawait/await');
var async = require('asyncawait/async');
var handlers = require(__base + 'server/routes/router-handlers');
var service = require(__base + 'server/services');
var routes = require('express').Router();


function getProviders(request, response) {
    console.log('GET provider',request.params.id);
    var result;
    try {
        result = await (service.providersService.getProvider(request.params.id));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
    	console.log('error',error);
        return handlers.errorResponseHandler(response, error);
    }
}

function deleteProviders(request, response) {
    console.log('DELETE provider');
    var result;
    try {
        result = await (service.providersService.deleteProvider(request.params.id));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function updateProviders(request, response) {
    console.log('UPDATE provider');
    var result;
    try {
        result = await (service.providersService.updateProvider(request.body.provider));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function postProviders(request, response) {
    console.log('POST provider');
    var result;
    try {
        result = await (service.providersService.postProvider(request.body.provider));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        if(error.code === 11000){
            return handlers.validationErrorHandler(response, error);
        }
        return handlers.errorResponseHandler(response, error);
    }
}

routes.get('/:id', async(getProviders));
routes.get('/', async(getProviders));
routes.delete('/:id', async(deleteProviders));
routes.put('/:id', async(updateProviders));
routes.post('/', async(postProviders));

module.exports = routes;