var async = require('asyncawait/async');
var await = require('asyncawait/await');
var userModel = require(__base + 'server/model/user');

function getUsers() {
    var users = await(userModel.find({}));
    return users;
}

function getUser(id) {
    var user = await(userModel.findOne({_id:id}));
    return user;
}

function getUserCedula(cedula,clave) {
    var user = await(userModel.findOne({cedula:cedula , clave:clave}));
    return user;
}

function deleteUser(id) {
    var user = await(userModel.remove({_id:id}));
    return user;
}

function updateUser(userParam) {
    var user = await(userModel.update({_id:userParam._id},userParam));
    return user;
}

function addUser(userParam) {
    var user = await(userModel.create(userParam));
    return user;
}

module.exports = {
    getUsers: async(getUsers),
    getUserCedula: async(getUserCedula),
    getUser: async(getUser),
    deleteUser: async(deleteUser),
    updateUser: async(updateUser),
    addUser: async(addUser)
};