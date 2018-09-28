var async = require('asyncawait/async');
var await = require('asyncawait/await');
var productModel = require(__base + 'server/model/product');

function getProducts(idSucursal) {
    var products;
    if(idSucursal){
        products = await(productModel.find({idSucursal:idSucursal}));
    } else {
        products = await(productModel.find({}));
    }
    return products;
}

function getProductsNombre(nombre,idSucursal) {
    var products;
    if(idSucursal){
        products = await(productModel.find({nombre:new RegExp(nombre, 'i'),idSucursal:idSucursal}));
    } else {
        products = await(productModel.find({nombre:new RegExp(nombre, 'i')}));
    }
    return products;
}

function getProductsCodigo(codigo,idSucursal) {
    var products;
    if(idSucursal){
        products = await(productModel.find({codigo:new RegExp(codigo, 'i'),idSucursal:idSucursal}));
    } else {
        products = await(productModel.find({codigo:new RegExp(codigo, 'i')}));
    }
    return products;
}

function getProductsModelo(modelo,idSucursal) {
    var products;
    if(idSucursal){
        products = await(productModel.find({modelo:new RegExp(modelo, 'i'),idSucursal:idSucursal}));
    } else {
        products = await(productModel.find({modelo:new RegExp(modelo, 'i')}));
    }
    return products;
}

function getProduct(id) {
    var product = await(productModel.findOne({_id:id}));
    return product;
}

function deleteProduct(id) {
    var product = await(productModel.remove({_id:id}));
    return product;
}

function updateProduct(productParam) {
    var existe = await(productModel.findOne({codigo:new RegExp(productParam.codigo, 'i'), idSucursal:productParam.idSucursal}));
    var product;
    if(existe && existe._id != productParam._id){
        productParam._id = existe._id;
        product = await(productModel.create(productParam));
    } else {
        product = await(productModel.update({_id:productParam._id},productParam));
    }
    return product;
}

function addProduct(productParam) {
    var existe = await(productModel.findOne({codigo:new RegExp(productParam.codigo, 'i'), idSucursal:productParam.idSucursal}));
    if(existe){
        productParam._id = existe._id;
    }
    var product = await(productModel.create(productParam));
    return product;
}

module.exports = {
    getProducts: async(getProducts),
    getProduct: async(getProduct),
    getProductsNombre: async(getProductsNombre),
    getProductsCodigo: async(getProductsCodigo),
    getProductsModelo: async(getProductsModelo),
    deleteProduct: async(deleteProduct),
    updateProduct: async(updateProduct),
    addProduct: async(addProduct)
};