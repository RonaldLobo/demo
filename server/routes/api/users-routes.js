'use strict';
var await = require('asyncawait/await');
var async = require('asyncawait/async');
var handlers = require(__base + 'server/routes/router-handlers');
var service = require(__base + 'server/services');
var routes = require('express').Router();


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

function postUser(request, response) {
    console.log('POST User',request.body);
    var result;
    try {
        result = await (service.usersService.postUser(request.body.user));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        if(error.code === 11000){
            return handlers.validationErrorHandler(response, error);
        }
        return handlers.errorResponseHandler(response, error);
    }
}

routes.get('/:id', async(getUsers));
routes.get('/', async(getUsers));
routes.delete('/:id', async(deleteUser));
routes.put('/:id', async(updateUser));
routes.post('/', async(postUser));

module.exports = routes;