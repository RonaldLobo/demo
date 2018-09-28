'use strict';
var await = require('asyncawait/await');
var async = require('asyncawait/async');
var handlers = require(__base + 'server/routes/router-handlers');
var service = require(__base + 'server/services');
var routes = require('express').Router();


function getServiceBills(request, response) {
    console.log('GET serviceBill',request.params.id);
    var result;
    try {
        result = await (service.serviceBillsService.getServiceBill(request.params.id));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
    	console.log('error',error);
        return handlers.errorResponseHandler(response, error);
    }
}

function deleteServiceBills(request, response) {
    console.log('DELETE serviceBill');
    var result;
    try {
        result = await (service.serviceBillsService.deleteServiceBill(request.params.id));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function updateServiceBills(request, response) {
    console.log('UPDATE serviceBill');
    var result;
    try {
        result = await (service.serviceBillsService.updateServiceBill(request.body.serviceBill));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function postServiceBills(request, response) {
    console.log('POST serviceBill');
    var result;
    try {
        result = await (service.serviceBillsService.postServiceBill(request.body.serviceBill));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        if(error.code === 11000){
            return handlers.validationErrorHandler(response, error);
        }
        return handlers.errorResponseHandler(response, error);
    }
}

routes.get('/:id', async(getServiceBills));
routes.get('/', async(getServiceBills));
routes.delete('/:id', async(deleteServiceBills));
routes.put('/:id', async(updateServiceBills));
routes.post('/', async(postServiceBills));

module.exports = routes;