'use strict';
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var UsersRsrc = require(__base + 'server/infrastructure/resources').user;

function getUser(id) {
    var result;
    console.log('get User by ' + id);
    try {
        if(id){
            result = await (UsersRsrc.getUser(id));
        } else {
            result = await (UsersRsrc.getUsers());
        }
        console.log('result length ' + result.length);    
    } catch(error) {
        throw error;
    }
    return { user: result };
}

function getUserCedula(cedula,clave) {
    var result;
    console.log('get User by cedula ' + cedula);
    try {
        result = await (UsersRsrc.getUserCedula(cedula,clave));
    } catch(error) {
        throw error;
    }
    return { user: result };
}

function updateUser(user) {
    var result;
    console.log('update User by ' + user._id);
    try {
        result = await (UsersRsrc.updateUser(user));
        console.log('result length ' + result.length);    
    } catch(error) {
        throw error;
    }
    return { user: result };
}

function deleteUser(id) {
    var result;
    console.log('delete User by ' + id);
    try {
        result = await (UsersRsrc.deleteUser(id));
        console.log('result length ' + result.length);    
    } catch(error) {
        throw error;
    }
    return { user: result };
}

function postUser(user) {
    var result;
    console.log('post User service',user);
    try {
        result = await (UsersRsrc.addUser(user));
        console.log('result length ' + result.length);    
    } catch(error) {
        throw error;
    }
    return { user: result };
}

module.exports.getUser = async(getUser);
module.exports.getUserCedula = async(getUserCedula);
module.exports.updateUser = async(updateUser);
module.exports.deleteUser = async(deleteUser);
module.exports.postUser = async(postUser);