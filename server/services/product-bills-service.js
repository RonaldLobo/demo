'use strict';
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var ProductBillsRsrc = require(__base + 'server/infrastructure/resources').productbill;

function getProductBill(id,idSucursal) {
    var result;
    console.log('get productBill by ' + id);
    try {
    	if(id){
        	result = await (ProductBillsRsrc.getProductBill(id));
        } else {
        	result = await (ProductBillsRsrc.getProductBills(idSucursal));
        }   
        for (var i = result.length - 1; i >= 0; i--) {
            result[i].fecha_modificada.setHours(result[i].fecha_modificada.getHours() - 6);
        }
    } catch(error) {
        throw error;
    }
    return { productBill: result };
}

function getProductBillNombre(nombre,idSucursal) {
    var result;
    console.log('get productBill by ' + nombre);
    try {
        result = await (ProductBillsRsrc.getProductBillNombre(nombre,idSucursal));  
        for (var i = result.length - 1; i >= 0; i--) {
            result[i].fecha_modificada.setHours(result[i].fecha_modificada.getHours() - 6);
        }
    } catch(error) {
        throw error;
    }
    return { productBill: result };
}

function getProductBillNombreVen(nombre,idSucursal) {
    var result;
    console.log('get productBill by ' + nombre);
    try {
        result = await (ProductBillsRsrc.getProductBillNombreVen(nombre,idSucursal));  
        for (var i = result.length - 1; i >= 0; i--) {
            result[i].fecha_modificada.setHours(result[i].fecha_modificada.getHours() - 6);
        }
    } catch(error) {
        throw error;
    }
    return { productBill: result };
}

function updateProductBill(productBill) {
    var result;
    console.log('update productBill by ' + productBill._id);
    try {
    //     var date = new Date();
    //     console.log(date);
        if(productBill.estado != 'enviada'){
            productBill.fecha_modificada = new Date;
        }
        result = await (ProductBillsRsrc.updateProductBill(productBill));
    } catch(error) {
        console.log(error);
        throw error;
    }
    return { productBill: result };
}

function deleteProductBill(id) {
    var result;
    console.log('delete productBill by ' + id);
    try {
        result = await (ProductBillsRsrc.deleteProductBill(id));
    } catch(error) {
        throw error;
    }
    return { productBill: result };
}

function postProductBill(productBill) {
    var result;
    console.log('service post productBill',productBill.productos[0]);
    try {
        // var date = new Date();
        // console.log(date);
        productBill.fecha_modificada = new Date;
        result = await (ProductBillsRsrc.addProductBill(productBill));
    } catch(error) {
        console.log(error);
        throw error;
    }
    return { productBill: result };
}

function getCountBillMonth() {
    var result;
    try {
        result = await (ProductBillsRsrc.getCountBillMonth());        
 
    } catch(error) {
        throw error;
    }
    return { productBill: result };
}

module.exports.getProductBill = async(getProductBill);
module.exports.getProductBillNombreVen = async(getProductBillNombreVen);
module.exports.getProductBillNombre = async(getProductBillNombre);
module.exports.updateProductBill = async(updateProductBill);
module.exports.deleteProductBill = async(deleteProductBill);
module.exports.postProductBill = async(postProductBill);
module.exports.getCountBillMonth = async(getCountBillMonth);