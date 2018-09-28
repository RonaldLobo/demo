'use strict';
var await = require('asyncawait/await');
var async = require('asyncawait/async');
var handlers = require(__base + 'server/routes/router-handlers');
var service = require(__base + 'server/services');
var routes = require('express').Router();


function getSucursals(request, response) {
    console.log('GET Sucursal');
    var result;
    try {
        result = await (service.sucursalService.getSucursal(request.params.id));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        console.log('error',error);
        return handlers.errorResponseHandler(response, error);
    }
}

function deleteSucursal(request, response) {
    console.log('DELETE Sucursal');
    var result;
    try {
        result = await (service.sucursalService.deleteSucursal(request.params.id));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function updateSucursal(request, response) {
    console.log('UPDATE Sucursal');
    var result;
    try {
        result = await (service.sucursalService.updateSucursal(request.body.sucursal));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function postSucursal(request, response) {
    console.log('POST Sucursal',request.body);
    var result;
    try {
        result = await (service.sucursalService.postSucursal(request.body.sucursal));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        if(error.code === 11000){
            return handlers.validationErrorHandler(response, error);
        }
        return handlers.errorResponseHandler(response, error);
    }
}

routes.get('/:id', async(getSucursals));
routes.get('/', async(getSucursals));
routes.delete('/:id', async(deleteSucursal));
routes.put('/:id', async(updateSucursal));
routes.post('/', async(postSucursal));

module.exports = routes;