'use strict';
var await = require('asyncawait/await');
var async = require('asyncawait/async');
var handlers = require(__base + 'server/routes/router-handlers');
var service = require(__base + 'server/services');
var routes = require('express').Router();


function getAcceptacions(request, response) {
    console.log('GET acceptacion',request.params.id);
    console.log('GET acceptacion',request.query.idCliente);
    var result;
    try {
        result = await (service.aceptacionesService.getAcceptacion(request.params.id,request.query.idCliente));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        console.log('error',error);
        return handlers.errorResponseHandler(response, error);
    }
}

function deleteAcceptacions(request, response) {
    console.log('DELETE acceptacion');
    var result;
    try {
        result = await (service.aceptacionesService.deleteAcceptacion(request.params.id));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function updateAcceptacions(request, response) {
    console.log('UPDATE acceptacion');
    var result;
    try {
        result = await (service.aceptacionesService.updateAcceptacion(request.body.aceptacion));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function postAcceptacions(request, response) {
    console.log('POST acceptacion');
    var result;
    try {
        result = await (service.aceptacionesService.postAcceptacion(request.body.aceptacion));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        if(error.code === 11000){
            return handlers.validationErrorHandler(response, error);
        }
        return handlers.errorResponseHandler(response, error);
    }
}

routes.get('/:id', async(getAcceptacions));
routes.get('/', async(getAcceptacions));
routes.delete('/:id', async(deleteAcceptacions));
routes.put('/:id', async(updateAcceptacions));
routes.post('/', async(postAcceptacions));

module.exports = routes;