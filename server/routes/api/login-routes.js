'use strict';
var await = require('asyncawait/await');
var async = require('asyncawait/async');
var handlers = require(__base + 'server/routes/router-handlers');
var service = require(__base + 'server/services');
var routes = require('express').Router();

var jwt = require('jsonwebtoken');


function getUsers(request, response) {
    console.log('GET User');
    var result;
    try {
        result = await (service.usersService.getUser(request.params.id));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        console.log('error',error);
        return handlers.errorResponseHandler(response, error);
    }
}

function deleteUser(request, response) {
    console.log('DELETE User');
    var result;
    try {
        result = await (service.usersService.deleteUser(request.params.id));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function updateUser(request, response) {
    console.log('UPDATE User');
    var result;
    try {
        result = await (service.usersService.updateUser(request.body.user));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function postLogin(request, response) {
    console.log('POST User',request.body);
    var result;
    try {
        result = await (service.usersService.getUserCedula(request.body.user.cedula, request.body.user.clave));
        var sucursal = await (service.sucursalService.getSucursal(result.user.idSucursal));
        var empresa = await (service.empresasService.getEmpresa(sucursal.sucursal.idEmpresa));
        console.log(result);
        var token = '';
        if(result.user){ 
        	token = jwt.sign({
							  result
							}, 'secret', { expiresIn: '365 days'});
        }
        return handlers.successResponseHandler(response, {
        	'token': token,
            'user': result.user,
            'empresa': empresa.empresa
        });
    } catch (error) {
    	console.log(error);
        if(error.code === 11000){
            return handlers.validationErrorHandler(response, error);
        }
        return handlers.errorResponseHandler(response, error);
    }
}

routes.post('/', async(postLogin));

module.exports = routes;