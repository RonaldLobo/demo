'use strict';
var await = require('asyncawait/await');
var async = require('asyncawait/async');
var handlers = require(__base + 'server/routes/router-handlers');
var service = require(__base + 'server/services');
var routes = require('express').Router();


function getEmpresas(request, response) {
    console.log('GET Empresa');
    var result;
    try {
        result = await (service.empresasService.getEmpresa(request.params.id));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        console.log('error',error);
        return handlers.errorResponseHandler(response, error);
    }
}

function deleteEmpresa(request, response) {
    console.log('DELETE Empresa');
    var result;
    try {
        result = await (service.empresasService.deleteEmpresa(request.params.id));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function updateEmpresa(request, response) {
    console.log('UPDATE Empresa');
    var result;
    try {
        result = await (service.empresasService.updateEmpresa(request.body.empresa));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function postEmpresa(request, response) {
    console.log('POST Empresa',request.body);
    var result;
    try {
        result = await (service.empresasService.postEmpresa(request.body.empresa));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        if(error.code === 11000){
            return handlers.validationErrorHandler(response, error);
        }
        return handlers.errorResponseHandler(response, error);
    }
}

routes.get('/:id', async(getEmpresas));
routes.get('/', async(getEmpresas));
routes.delete('/:id', async(deleteEmpresa));
routes.put('/:id', async(updateEmpresa));
routes.post('/', async(postEmpresa));

module.exports = routes;