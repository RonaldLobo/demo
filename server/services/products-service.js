'use strict';
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var ProductsRsrc = require(__base + 'server/infrastructure/resources').product;

function getProduct(id,idSucursal) {
    var result;
    console.log('get product by ' + id);
    try {
    	if(id){
        	result = await (ProductsRsrc.getProduct(id,idSucursal));
        } else {
        	result = await (ProductsRsrc.getProducts(idSucursal));
        }   
    } catch(error) {
        throw error;
    }
    return { product: result };
}

function getProductNombre(nombre,idSucursal) {
    var result;
    console.log('get product by ' + nombre);
    try {
        result = await (ProductsRsrc.getProductsNombre(nombre,idSucursal));
    } catch(error) {
        throw error;
    }
    return { product: result };
}

function getProductCodigo(codigo,idSucursal) {
    var result;
    console.log('get product by ' + codigo);
    try {
        result = await (ProductsRsrc.getProductsCodigo(codigo,idSucursal));
    } catch(error) {
        throw error;
    }
    return { product: result };
}

function getProductModelo(modelo,idSucursal) {
    var result;
    console.log('get product by ' + modelo);
    try {
        result = await (ProductsRsrc.getProductsModelo(modelo,idSucursal));
    } catch(error) {
        throw error;
    }
    return { product: result };
}

function updateProduct(product) {
    var result;
    console.log('update product by ' + product._id);
    try {
        result = await (ProductsRsrc.updateProduct(product));
    } catch(error) {
        throw error;
    }
    return { product: result };
}

function deleteProduct(id) {
    var result;
    console.log('delete product by ' + id);
    try {
        result = await (ProductsRsrc.deleteProduct(id));
    } catch(error) {
        throw error;
    }
    return { product: result };
}

function postProduct(product) {
    var result;
    console.log('post product');
    try {
        result = await (ProductsRsrc.addProduct(product));
    } catch(error) {
        throw error;
    }
    return { product: result };
}

module.exports.getProduct = async(getProduct);
module.exports.getProductCodigo = async(getProductCodigo);
module.exports.getProductNombre = async(getProductNombre);
module.exports.getProductModelo = async(getProductModelo);
module.exports.updateProduct = async(updateProduct);
module.exports.deleteProduct = async(deleteProduct);
module.exports.postProduct = async(postProduct);