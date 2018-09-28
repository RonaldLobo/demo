'use strict';
var await = require('asyncawait/await');
var async = require('asyncawait/async');
var handlers = require(__base + 'server/routes/router-handlers');
var service = require(__base + 'server/services');
var routes = require('express').Router();


function getProductBills(request, response) {
    console.log('GET productBill',request.params.id);
    console.log('GET productBill - nomReporte',request.query.nomreporte);
    console.log('GET idSucursal',request.query.idSucursal);
    var result;
    try {
        if (request.query.nomreporte=="ReportCountBillMonth"){
            result = await (service.productBillsService.getCountBillMonth());
            console.log('result',result);
        }else if (request.query.nombreven){
            result = await (service.productBillsService.getProductBillNombreVen(request.query.nombreven,request.query.idSucursal));
        } else if (request.query.nombre){
            result = await (service.productBillsService.getProductBillNombre(request.query.nombre,request.query.idSucursal));
        } else {
            result = await (service.productBillsService.getProductBill(request.params.id,request.query.idSucursal));
        }
        return handlers.successResponseHandler(response, result);
    } catch (error) {
    	console.log('error',error);
        return handlers.errorResponseHandler(response, error);
    }
}




function deleteProductBills(request, response) {
    console.log('DELETE productBill');
    var result;
    try {
        result = await (service.productBillsService.deleteProductBill(request.params.id));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function updateProductBills(request, response) {
    console.log('UPDATE productBill');
    var result;
    try {
        result = await (service.productBillsService.updateProductBill(request.body.productBill));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function postProductBills(request, response) {
    console.log('POST productBill');
    var result;
    try {
        console.log('service post productBill',request.body.productBill.productos[0]);
        result = await (service.productBillsService.postProductBill(request.body.productBill));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        if(error.code === 11000){
            return handlers.validationErrorHandler(response, error);
        }
        return handlers.errorResponseHandler(response, error);
    }
}




routes.get('/:id', async(getProductBills));
routes.get('/', async(getProductBills));
routes.delete('/:id', async(deleteProductBills));
routes.put('/:id', async(updateProductBills));
routes.post('/', async(postProductBills));

module.exports = routes;