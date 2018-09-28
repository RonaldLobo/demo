'use strict';
var await = require('asyncawait/await');
var async = require('asyncawait/async');
var handlers = require(__base + 'server/routes/router-handlers');
var service = require(__base + 'server/services');
var routes = require('express').Router();


function getClients(request, response) {
    console.log('GET Client');
    console.log('GET nombre',request.query.nombre);
    console.log('GET codigo',request.query.cedula);
    var result;
    try {
        if(request.query.cedula){
            result = await (service.clientsService.getClientCedula(request.query.cedula));
        } else if (request.query.nombre){
            result = await (service.clientsService.getClientNombre(request.query.nombre));
        } else {
            result = await (service.clientsService.getClient(request.params.id));
        }
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        console.log('error',error);
        return handlers.errorResponseHandler(response, error);
    }
}

function deleteClient(request, response) {
    console.log('DELETE Client');
    var result;
    try {
        result = await (service.clientsService.deleteClient(request.params.id));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function updateClient(request, response) {
    console.log('UPDATE Client');
    var result;
    try {
        result = await (service.clientsService.updateClient(request.body.client));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function postClient(request, response) {
    console.log('POST Client',request.body);
    var result;
    try {
        result = await (service.clientsService.postClient(request.body.client));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        if(error.code === 11000){
            return handlers.validationErrorHandler(response, error);
        }
        return handlers.errorResponseHandler(response, error);
    }
}

routes.get('/:id', async(getClients));
routes.get('/', async(getClients));
routes.delete('/:id', async(deleteClient));
routes.put('/:id', async(updateClient));
routes.post('/', async(postClient));

module.exports = routes;