'use strict';
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var ServiceBillsRsrc = require(__base + 'server/infrastructure/resources').serviceBill;

function getServiceBill(id) {
    var result;
    console.log('get serviceBill by ' + id);
    try {
    	if(id){
        	result = await (ServiceBillsRsrc.getServiceBill(id));
        } else {
        	result = await (ServiceBillsRsrc.getServiceBills());
        }   
    } catch(error) {
        throw error;
    }
    return { serviceBill: result };
}

function updateServiceBill(serviceBill) {
    var result;
    console.log('update serviceBill by ' + serviceBill._id);
    try {
        result = await (ServiceBillsRsrc.updateServiceBill(serviceBill));
    } catch(error) {
        throw error;
    }
    return { serviceBill: result };
}

function deleteServiceBill(id) {
    var result;
    console.log('delete serviceBill by ' + id);
    try {
        result = await (ServiceBillsRsrc.deleteServiceBill(id));
    } catch(error) {
        throw error;
    }
    return { serviceBill: result };
}

function postServiceBill(serviceBill) {
    var result;
    console.log('post serviceBill');
    try {
        result = await (ServiceBillsRsrc.addServiceBill(serviceBill));
    } catch(error) {
        throw error;
    }
    return { serviceBill: result };
}

module.exports.getServiceBill = async(getServiceBill);
module.exports.updateServiceBill = async(updateServiceBill);
module.exports.deleteServiceBill = async(deleteServiceBill);
module.exports.postServiceBill = async(postServiceBill);