var async = require('asyncawait/async');
var await = require('asyncawait/await');
var productBillModel = require(__base + 'server/model/product-bill');
var productModel = require(__base + 'server/model/product');

function getProductBills(idSucursal) {
    var products;
    if(idSucursal){
        productBills = await(productBillModel.find({idSucursal:idSucursal}));
    } else {
        productBills = await(productBillModel.find({}));
    }
    return productBills;
}

function getProductBill(id) {
    var productBill = await(productBillModel.findOne({_id:id}));
    return productBill;
}

function getProductBillNombre(nombre,idSucursal) {
    var products;
    if(idSucursal){
        productBill = await(productBillModel.aggregate(
            [
                {$addFields: { fullName: { $concat : ['$comprador.nombre', " ",'$comprador.apellido1' ," ",'$comprador.apellido2']}}},
                {$match : { fullName: { $regex : nombre, $options: 'i' },idSucursal:idSucursal}}
            ]
        ));
    } else {
        productBill = await(productBillModel.aggregate(
            [
                {$addFields: { fullName: { $concat : ['$comprador.nombre', " ",'$comprador.apellido1' ," ",'$comprador.apellido2']}}},
                {$match : { fullName: { $regex : nombre, $options: 'i' }}}
            ]
        ));
    }
    return productBill;
}

function getProductBillNombreVen(nombre,idSucursal) {
    var products;
    if(idSucursal){
        productBill = await(productBillModel.aggregate(
            [
                {$addFields: { fullNameVen: { $concat : ['$vendedor.nombre', " ",'$vendedor.apellido1' ," ",'$vendedor.apellido2']}}},
                {$match : { fullNameVen: { $regex : nombre, $options: 'i'}, idSucursal:idSucursal}}
            ]
        ));
    } else {
        productBill = await(productBillModel.aggregate(
            [
                {$addFields: { fullNameVen: { $concat : ['$vendedor.nombre', " ",'$vendedor.apellido1' ," ",'$vendedor.apellido2']}}},
                {$match : { fullNameVen: { $regex : nombre, $options: 'i' }}}
            ]
        ));
    }
    return productBill;
}

function deleteProductBill(id) {
    var productBill = await(productBillModel.remove({_id:id}));
    return productBill;
}

function updateProductBill(productBillParam) {
    //console.log('update',productBillParam);
    var productos = checkCantidad(productBillParam.productos);
    var productBill;
    console.log('after',productos.length)
    if(productos.length == 0){
        productBill = await(productBillModel.update({_id:productBillParam._id},productBillParam));
        if(productBillParam.estado == "completa"){
            updateProductsCantidad(productBillParam.productos);
        }
    } else {
        productBill = {
            'error':'Algunos de los productos ya no se encuentran en inventario',
            'productos': productos
        }
    }
    return productBill;
}

function addProductBill(productBillParam) {
    console.log('add',productBillParam.productos[0].producto);
    var productos = checkCantidad(productBillParam.productos);
    var productBill;
    if(productos.length == 0){
        productBill = await(productBillModel.create(productBillParam));
        if(productBillParam.estado == "completa"){
            updateProductsCantidad(productBillParam.productos);
        }
    } else {
        productBill = {
            'error':'Algunos de los productos ya no se encuentran en inventario',
            'productos': productos
        }
    }
    return productBill;
}

function checkCantidad(prods){
    var productos = [];
    for (var i = prods.length - 1; i >= 0; i--) {
        var prod = await(productModel.findOne({codigo:prods[i].producto.codigo}));
        console.log('------------------',prod.cantidad,prods[i].cantidad);
        if(prod.cantidad < prods[i].cantidad){
            productos.push({producto:prods[i].producto, cantidadDisponible:prod.cantidad})
        }
    }
    return productos;
}

function updateProductsCantidad(prods){
    var productos = [];
    for (var i = prods.length - 1; i >= 0; i--) {
        var prod = await(productModel.findOne({codigo:prods[i].producto.codigo}));
        prod.cantidad = prod.cantidad - prods[i].cantidad;
        var result = await(productModel.update({_id:prod._id},prod));
    }
    return productos;
}


function getCountBillMonth(){
    var productBill = await(
         productBillModel.aggregate([
            { 
            "$group": {
                "_id": { 
                "year":  { "$year": "$fecha_modificada" },
                "month": { "$month": "$fecha_modificada" }
            },
            "count": { "$sum": 1 }
            }}
        ]))
    ;
    return productBill;

}


module.exports = {
    getProductBills: async(getProductBills),
    getProductBillNombre: async(getProductBillNombre),
    getProductBillNombreVen: async(getProductBillNombreVen),
    getProductBill: async(getProductBill),
    deleteProductBill: async(deleteProductBill),
    updateProductBill: async(updateProductBill),
    addProductBill: async(addProductBill),
    getCountBillMonth: async(getCountBillMonth),
};