var async = require('asyncawait/async');
var await = require('asyncawait/await');
var serviceBillModel = require(__base + 'server/model/service-bill');

function getServiceBills() {
    var serviceBills = await(serviceBillModel.find({}));
    return serviceBills;
}

function getServiceBill(id) {
    var serviceBill = await(serviceBillModel.findOne({_id:id}));
    return serviceBill;
}

function deleteServiceBill(id) {
    var serviceBill = await(serviceBillModel.remove({_id:id}));
    return serviceBill;
}

function updateServiceBill(serviceBillParam) {
    var serviceBill = await(serviceBillModel.update({_id:serviceBillParam._id},serviceBillParam));
    return serviceBill;
}

function addServiceBill(serviceBillParam) {
    var serviceBill = await(serviceBillModel.create(serviceBillParam));
    return serviceBill;
}

module.exports = {
    getServiceBills: async(getServiceBills),
    getServiceBill: async(getServiceBill),
    deleteServiceBill: async(deleteServiceBill),
    updateServiceBill: async(updateServiceBill),
    addServiceBill: async(addServiceBill)
};