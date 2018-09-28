'use strict';
var await = require('asyncawait/await');
var async = require('asyncawait/async');
var handlers = require(__base + 'server/routes/router-handlers');
var service = require(__base + 'server/services');
var routes = require('express').Router();


function getProducts(request, response) {
    console.log('GET product',request.params.id);
    console.log('GET nombre',request.query.nombre);
    console.log('GET codigo',request.query.codigo);
    console.log('GET idSucursal',request.query.idSucursal);
    var result;
    try {
        if(request.query.codigo){
            result = await (service.productsService.getProductCodigo(request.query.codigo,request.query.idSucursal));
        } else if (request.query.nombre){
            result = await (service.productsService.getProductNombre(request.query.nombre,request.query.idSucursal));
        } else if (request.query.modelo){
            result = await (service.productsService.getProductModelo(request.query.modelo,request.query.idSucursal));
        } else {
            result = await (service.productsService.getProduct(request.params.id,request.query.idSucursal));
        }
        return handlers.successResponseHandler(response, result);
    } catch (error) {
    	console.log('error',error);
        return handlers.errorResponseHandler(response, error);
    }
}

function deleteProducts(request, response) {
    console.log('DELETE product');
    var result;
    try {
        result = await (service.productsService.deleteProduct(request.params.id));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function updateProducts(request, response) {
    console.log('UPDATE product');
    var result;
    try {
        result = await (service.productsService.updateProduct(request.body.product));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function postProducts(request, response) {
    console.log('POST product');
    var result;
    try {
        result = await (service.productsService.postProduct(request.body.product));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        if(error.code === 11000){
            return handlers.validationErrorHandler(response, error);
        }
        return handlers.errorResponseHandler(response, error);
    }
}

routes.get('/:id', async(getProducts));
routes.get('/', async(getProducts));
routes.delete('/:id', async(deleteProducts));
routes.put('/:id', async(updateProducts));
routes.post('/', async(postProducts));

module.exports = routes;