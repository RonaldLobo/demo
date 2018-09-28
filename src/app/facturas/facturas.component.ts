import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../models/producto';
import { Factura } from '../models/factura';
import { Cliente } from '../models/cliente';

import { Productofacturaitem } from '../models/productofacturaitem';
import { ProductosService } from '../services/productos.service';
import { FacturadorService } from '../services/facturador.service';
import { FacturaService } from '../services/factura.service';
import { ClientesService } from '../services/clientes.service';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DecimalPipe } from '@angular/common';
import { DatePipe } from '@angular/common';

import * as _ from 'lodash';

// import * as jsPDF from 'jspdf'

declare var window;


@Component({
	selector: 'app-facturas',
	templateUrl: './facturas.component.html',
	styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
	public clientes : Cliente[];
	public codigo:string = '';
	public copy: Producto = new Producto();
	public nombreProducto:string = '';
	public nombreCliente: string = '';
	public cedulaCliente: number;
	public productos : Producto[] = [];
	public agotados = [];
	public buscando: boolean = false;
	public factura: Factura = new Factura();
	public total = 0;
	modalRef: BsModalRef;
	modalRefAgregar: BsModalRef;
	modalRefCompletar: BsModalRef;
	printRefCompletar: BsModalRef;
	agotadosRefCompletar: BsModalRef;
	id: string = '';
	errorDisplay: string = '';
	provincia: string = '';
	canton: string = '';
	private sub: any;
	public guardado : boolean = false;
	public enviandoMH: boolean = false;

	constructor(private productosService:ProductosService, 
		private facturaService:FacturaService, 
		private modalService: BsModalService,
		private clientesService:ClientesService,
		private route: ActivatedRoute,
		private decimalPipe:DecimalPipe,
		private authService:AuthService,
		private router:Router,
		private facturadorService:FacturadorService,
		private sharedService:SharedService,
		private datePipe: DatePipe) { }

	ngOnInit() {
		document.getElementById("buscarPorCodigo").focus();
		this.sub = this.route.params.subscribe(params => {
	       this.id = params['id'];
	       console.log(this.id);
	       if(this.id != undefined){
		       this.facturaService.obtenerFacturasId(this.id).subscribe((data) => {
					console.log(data);
					this.factura = data.productBill;
					// this.actualizaTotal();
				}, fail => {
				});
		    }
	    });
	    this.sharedService.get('/api/ubicacion').then((data) => {
	        this.provincia = data.ubicacion[Number(this.authService.loggedEmpresa.provincia) - 1].nombre;
	        this.canton = data.ubicacion[Number(this.authService.loggedEmpresa.provincia) - 1].cantones[Number(this.authService.loggedEmpresa.canton) - 1].nombre;
		},(error)=>{
		console.log('error',error);
		});
	}

	changedCodigo = _.debounce(function() {
		if(this.codigo.length > 2){
			this.buscando = true;
			this.productosService.obtenerProductosFiltroCodigo(this.codigo).subscribe((data) => {
				if(data.product.length > 1){
					this.productos = data.product;
				} else if(data.product.length == 1) {
					this.seleccionarProd(data.product[0])
				} else {

				}
			}, fail => {
			});
		}
	}, 400);

	changedNombre = _.debounce(function() {
		if(this.nombreProducto.length > 2){
			this.buscando = true;
			this.productosService.obtenerProductosFiltroNombre(this.nombreProducto).subscribe((data) => {
				this.productos = data.product;
			}, fail => {
			});
		}
	}, 400);

	seleccionarProd(prod){
		if(prod.cantidad >= 1){
			var pfi = new Productofacturaitem();
			pfi.producto = prod;
			pfi.cantidad = 1;
			pfi.descuento = prod.descuento;
			pfi.descuento_tipo = prod.descuento_tipo;
			this.factura.productos.unshift(pfi);
			// this.actualizaTotal();
			this.productos = [];
			this.nombreProducto = '';
			this.codigo = '';
			document.getElementById("buscarPorCodigo").focus();
		} else {
			alert('El producto se encuentra agotado.');
		}
	}

	fueraDescuento(){
	    if(this.factura.descuento == null || isNaN(this.factura.descuento)){
	    	this.factura.descuento = 0;
	    }
	    // this.actualizaTotal();
	}

	confirmar(template){
		console.log(this.factura);
		this.openModalCompletar(template);
	}

	guardar(estado = 'pendiente',template){
		if(this.factura.vendedor.nombre == ''){
			this.factura.vendedor = this.authService.loggedUser;
		}
		var that = this;
		if(this.totalComprobante() > 0){
			this.factura.total = this.totalComprobante();
			this.factura.idSucursal = this.authService.loggedUser.idSucursal;
			if(this.id == undefined){
				this.factura.estado = estado;
				var that = this;
				this.facturaService.agregarFactura(this.factura)
				.then((data) => {
					console.log('success');
					console.log(data);
					if(data.productBill.error){
						// alert(data.productBill.error);
						that.agotados = data.productBill.productos;
						that.openModalAgotados(template);
					} else {
						that.guardado = true;
						setTimeout(function(argument) {
							that.guardado = false;
						}, 2000);
						that.router.navigate(['/vender/'+data.productBill._id]);
					}
				}, fail => {
					console.log('fail');
					console.log(fail);
				});
			} else {
				this.factura.estado = estado;
				this.facturaService.editarFactura(this.factura)
				.then((data) => {
					console.log(data);
					if(data.productBill.error){
						this.factura.estado = 'pendiente';
						// alert(data.productBill.error);
						that.agotados = data.productBill.productos;
						that.openModalAgotados(template);
					} else {
						that.guardado = true;
						setTimeout(function(argument) {
							that.guardado = false;
						}, 2000);
					}
				}, fail => {
					console.log('fail');
					console.log(fail);
				});
			}
		}
	}

	seleccionarCliente(template: TemplateRef<any>){
		this.obtenerClientes();
		this.openModal(template);
	}

	public obtenerClientes(){
		this.clientesService.obtenerClientes().subscribe((data) => {
				console.log('clientes',this.clientes);
				this.clientes = data.client;
			},(error)=>{
				console.log('error',error);
			});
	}


	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}

	openModalAgregar(template: TemplateRef<any>) {
		this.modalRefAgregar = this.modalService.show(template);
	}

	openModalCompletar(template: TemplateRef<any>) {
		this.modalRefCompletar = this.modalService.show(template);
	}

	openModalPrint(template: TemplateRef<any>) {
		this.printRefCompletar = this.modalService.show(template);
	}

	openModalAgotados(template: TemplateRef<any>) {
		this.agotadosRefCompletar = this.modalService.show(template);
	}

	seleccionarClient(client){
		this.factura.comprador = client;
		this.nombreCliente = '';
		this.cedulaCliente = 0;
		if(this.modalRef){
			this.modalRef.hide();
		}
		if(this.modalRefAgregar){
			this.modalRefAgregar.hide();
		}
	}

	changedNombreCliente = _.debounce(function() {
		if(this.nombreCliente.length > 2){
			this.buscando = true;
			this.clientesService.obtenerClientesFiltroNombre(this.nombreCliente).subscribe((data) => {
				this.clientes = data.client;
			}, fail => {
			});
		}
	}, 400);

	changedCedula = _.debounce(function() {
		if(this.cedulaCliente.length > 2){
			this.buscando = true;
			this.clientesService.obtenerClientesFiltroCedula(this.cedulaCliente).subscribe((data) => {
				this.clientes = data.client;
			}, fail => {
			});
		}
	}, 400);

	actualizarListaClientes(){
		this.obtenerClientes();
		this.clientesService.obtenerClientes().subscribe((data) => {
			console.log('clientes',this.clientes);
			this.clientes = data.client;
			this.nombreCliente = '';
			this.cedulaCliente = 0;
			if(this.clientes.length > 0){
				this.seleccionarClient(this.clientes[this.clientes.length -1])
			}
		},(error)=>{
			console.log('error',error);
		});
	}

	// completarFactura(temp){
	// 	// this.factura.estado = 'completa';
	// 	this.guardar('completa',temp);
	// 	this.modalRefCompletar.hide();
	// }

	completarFactura(temp){
		this.enviandoMH = true;
		this.enviarHacienda(temp);
	}

	editarFactura(param){
	}

	eliminarProd(index){
		this.factura.productos.splice(index,1);
	}

	paseDate(date){
		var dd = date.getDate();
		var mm = date.getMonth()+1; //January is 0!

		var yyyy = date.getFullYear();
		if(dd<10){
		    dd='0'+dd;
		} 
		if(mm<10){
		    mm='0'+mm;
		} 
		var parsed = dd+'/'+mm+'/'+yyyy;
		return parsed;
	}

	truncate(str, limit) {
	    var bits, i;
	    bits = str.split('');
	    if (bits.length > limit) {
	        for (i = bits.length - 1; i > -1; --i) {
	            if (i > limit) {
	                bits.length = i;
	            }
	            else if (' ' === bits[i]) {
	                bits.length = i;
	                break;
	            }
	        }
	        bits.push('...');
	    }
	    return bits.join('');
	}

	descuentoPorProducto(productoItem){
		var totalDescuento = 0;
		if(productoItem.descuento_tipo == 1) {
			totalDescuento += productoItem.descuento * productoItem.cantidad;
		} else {
			totalDescuento += (productoItem.producto.precio * productoItem.cantidad) *  (productoItem.descuento * 0.01);
		}
		return totalDescuento;
	}

	dottedLine(doc, xFrom, yFrom, xTo, yTo, segmentLength)
	{
	    // Calculate line length (c)
	    var a = Math.abs(xTo - xFrom);
	    var b = Math.abs(yTo - yFrom);
	    var c = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));

	    // Make sure we have an odd number of line segments (drawn or blank)
	    // to fit it nicely
	    var fractions = c / segmentLength;
	    var adjustedSegmentLength = (Math.floor(fractions) % 2 === 0) ? (c / Math.ceil(fractions)) : (c / Math.floor(fractions));

	    // Calculate x, y deltas per segment
	    var deltaX = adjustedSegmentLength * (a / c);
	    var deltaY = adjustedSegmentLength * (b / c);

	    var curX = xFrom, curY = yFrom;
	    while (curX <= xTo && curY <= yTo)
	    {
	        doc.line(curX, curY, curX + deltaX, curY + deltaY);
	        curX += 2*deltaX;
	        curY += 2*deltaY;
	    }
	}

	toDecimals(num){
		return this.decimalPipe.transform(num,'1.2-2');
	}

	totalServiciosGravados(){
		var total = 0;
		for (var i = this.factura.productos.length - 1; i >= 0; i--) {
			if(this.factura.productos[i].producto.unidad == 'Sp' && this.factura.productos[i].producto.impuestos){
				total += this.factura.productos[i].cantidad * this.factura.productos[i].producto.precio;
			}
		}
		return total;
	}

	totalServiciosExcentos(){
		var total = 0;
		for (var i = this.factura.productos.length - 1; i >= 0; i--) {
			if(this.factura.productos[i].producto.unidad == 'Sp' && this.factura.productos[i].producto.impuestos == 0){
				total += this.factura.productos[i].cantidad * this.factura.productos[i].producto.precio;
			}
		}
		return total;
	}

	totalMercaderiaGravada(){
		var total = 0;
		for (var i = this.factura.productos.length - 1; i >= 0; i--) {
			if(this.factura.productos[i].producto.unidad != 'Sp' && this.factura.productos[i].producto.impuestos){
				total += this.factura.productos[i].cantidad * this.factura.productos[i].producto.precio;
			}
		}
		return total;
	}

	totalMercaderiaExcenta(){
		var total = 0;
		for (var i = this.factura.productos.length - 1; i >= 0; i--) {
			if(this.factura.productos[i].producto.unidad != 'Sp' && this.factura.productos[i].producto.impuestos == 0){
				total += this.factura.productos[i].cantidad * this.factura.productos[i].producto.precio;
			}
		}
		return total;
	}

	public totalImpuestos(){
		var tot = 0;
		for (var i = this.factura.productos.length - 1; i >= 0; i--) {
			tot += (this.factura.productos[i].producto.precio * this.factura.productos[i].cantidad - this.descuentoPorProducto(this.factura.productos[i])) * this.factura.productos[i].producto.impuestos / 100;
		}
		return tot;
	}

	public totalDescuentos(){
		var tot = 0;
		for (var i = this.factura.productos.length - 1; i >= 0; i--) {
			tot += this.descuentoPorProducto(this.factura.productos[i]);
		}
		return tot;
	}


	totalComprobante(){
		return this.totalVentasNeto() + this.totalImpuestos();
	}

	totalVentas(){
		return this.totalMercaderiaGravada() + this.totalServiciosGravados() + this.totalServiciosExcentos() + this.totalMercaderiaExcenta()
	}

	totalVentasNeto(){
		return this.totalVentas() - this.totalDescuentos();
	}

	enviarFactura(temp) {
		var that = this;
		var fact = this.createFact();
		console.log(fact);
		fact.conrealizada = true;
		that.genLetter(function(doc){
			var blob = doc.output("blob");
	    	that.blobToBase64(blob,function(base){
				fact.facturabase = {
					base: base
				};
				that.facturadorService.post('',fact)
				.then(res => {
					that.enviandoMH = false;
					console.log('res',res);
					if(res.respuesta == "aceptado"){
						that.factura.estado = 'completa';
						that.guardar('completa',temp);
						that.modalRefCompletar.hide();
					} else if(res.error == "recibido"){
						alert('Su factura fue enviada pero el Ministerio de Hacienda esta tardando mucho tiempo en responder, por favor reintente el envío desde "Facturas"')
						that.factura.estado = 'enviada';
						that.factura.refresh = res.refreshToken
						that.guardar('enviada',temp);
						that.modalRefCompletar.hide();
					} else {
						alert('Lo sentimos pero su factura no fue aceptada por el Ministerio de Hacienda, por favor intentelo de nuevo.');
						that.modalRefCompletar.hide();
					}
				}, err =>{
					console.log('error',err);
					that.enviandoMH = false;
					that.modalRefCompletar.hide();
				})
			});
	    });
	}

	createFact(){
		var that = this;
		var fact : any = {};
		fact.factura = {
				fecha : that.formatDate(new Date()),
				nombreComercial: that.authService.loggedEmpresa.nombreComercial,
				situacion: "normal",
				emisor: {
					nombre: that.authService.loggedEmpresa.nombreComercial,
					tipoId: that.authService.loggedEmpresa.tipoId,
					id: that.authService.loggedEmpresa.cedula,
					provincia: that.authService.loggedEmpresa.provincia,
					canton: that.authService.loggedEmpresa.canton,
					distrito: that.authService.loggedEmpresa.distrito,
					barrio: that.authService.loggedEmpresa.barrio,
					senas: that.authService.loggedEmpresa.senas,
					codigoPaisTel: '506',
					tel: that.authService.loggedEmpresa.telefonos[0].telefono,
					codigoPaisFax:"",
					fax:"",
					email: that.authService.loggedEmpresa.correo.correo
				},
				condicionVenta:"01",
				plazoCredito:"0",
				medioPago:"01",
				codMoneda:"CRC",
				tipoCambio:"1",
				totalServGravados: Number(that.totalServiciosGravados().toFixed(2)),
				totalServExentos: Number(that.totalServiciosExcentos().toFixed(2)),
				totalMercGravada: Number(that.totalMercaderiaGravada().toFixed(2)),
				totalMercExenta: Number(that.totalMercaderiaExcenta().toFixed(2)),
				totalGravados: Number((that.totalMercaderiaGravada() + that.totalServiciosGravados()).toFixed(2)),
				totalExentos: Number((that.totalServiciosExcentos() + that.totalMercaderiaExcenta()).toFixed(2)),
				totalVentas: Number(that.totalVentas().toFixed(2)),
				totalDescuentos: Number(that.totalDescuentos().toFixed(2)),
				totalVentasNeta: Number(that.totalVentasNeto().toFixed(2)),
				totalImpuestos: Number(that.totalImpuestos().toFixed(2)),
				totalComprobante: Number(that.totalComprobante().toFixed(2)),
				otros:"Gracias.",
				detalles: {}
			};
		fact.cliente = {
				id: that.authService.loggedEmpresa.clienteAPI
			}
		for (var i = 0; i < that.factura.productos.length; i++) {
			var num = i + 1;
			if(that.factura.productos[i].producto.impuestos){
				fact.factura.detalles[num]= {
					cantidad: that.factura.productos[i].cantidad,
					unidadMedida: that.factura.productos[i].producto.unidad,
					detalle: that.factura.productos[i].producto.descripcion,
					precioUnitario: Number(that.factura.productos[i].producto.precio.toFixed(2)),
					montoTotal: that.factura.productos[i].cantidad * Number(that.factura.productos[i].producto.precio.toFixed(2)),
					subtotal: that.factura.productos[i].cantidad * Number(that.factura.productos[i].producto.precio.toFixed(2)) - that.descuentoPorProducto(that.factura.productos[i]),
					montoTotalLinea: Number(((that.factura.productos[i].cantidad * that.factura.productos[i].producto.precio - that.descuentoPorProducto(that.factura.productos[i]) + ((that.factura.productos[i].cantidad * that.factura.productos[i].producto.precio - that.descuentoPorProducto(that.factura.productos[i])) * that.factura.productos[i].producto.impuestos / 100))).toFixed(2)),
					montoDescuento: that.descuentoPorProducto(that.factura.productos[i]),
					naturalezaDescuento: (that.descuentoPorProducto(that.factura.productos[i]))? 'usuario':'',
					impuesto:{
						"1":{
							codigo: '01',
							tarifa: that.factura.productos[i].producto.impuestos,
							monto: Number((((that.factura.productos[i].cantidad * that.factura.productos[i].producto.precio - that.descuentoPorProducto(that.factura.productos[i]) ) * that.factura.productos[i].producto.impuestos / 100)).toFixed(2))
						}
					}
				}
			} else {
				fact.factura.detalles[num]= {
					cantidad: that.factura.productos[i].cantidad,
					unidadMedida: that.factura.productos[i].producto.unidad,
					detalle: that.factura.productos[i].producto.descripcion,
					precioUnitario: that.factura.productos[i].producto.precio,
					montoTotal: that.factura.productos[i].cantidad * that.factura.productos[i].producto.precio,
					subtotal: that.factura.productos[i].cantidad * that.factura.productos[i].producto.precio - that.descuentoPorProducto(that.factura.productos[i]),
					montoTotalLinea: that.factura.productos[i].cantidad * that.factura.productos[i].producto.precio - that.descuentoPorProducto(that.factura.productos[i]),
					montoDescuento: that.descuentoPorProducto(that.factura.productos[i]),
					naturalezaDescuento: (that.descuentoPorProducto(that.factura.productos[i]))? 'usuario':''
				}
			}
		}
		// console.log(this.factura);
		console.log('com',that.factura.comprador.cedula);
		if(that.factura.comprador.cedula == 0){
			fact.factura.omitirReceptor = "true";
		} else {
			fact.factura.omitirReceptor = "false";
		}
		fact.factura.receptor = {
			nombre:that.factura.comprador.nombre + ' ' + that.factura.comprador.apellido1 + ' '+ that.factura.comprador.apellido2,
			tipoId:that.factura.comprador.tipoId,
			id:that.factura.comprador.cedula,
			provincia:that.factura.comprador.provincia,
			canton:that.factura.comprador.canton,
			distrito:that.factura.comprador.distrito,
			barrio:"01",
			senas:"senas",
			codigoPaisTel:"506",
			tel:(that.factura.comprador.telefonos.length > 0 ) ? that.factura.comprador.telefonos[0].telefono : '',
			codigoPaisFax:"",
			fax:"",
			email:that.factura.comprador.correo.correo
		}
		fact.factura.refreshToken = that.factura.refresh || '';
		fact.factura.clave = that.factura.clave || '';
		return fact;
	}

	enviarHacienda(temp){
		var that = this;
		var fact = this.createFact();
		console.log(fact);
		fact.con = true;
		that.facturadorService.post('',fact)
		.then(res => {
			console.log('res',res);
			fact.con = false;
			that.factura.consecutivo = res.resp.consecutivo;
			that.factura.clave = res.resp.clave;
			that.genLetter(function(doc){
				var blob = doc.output("blob");
		    	that.blobToBase64(blob,function(base){
					fact.facturabase = {
						base: base
					};
					that.facturadorService.post('',fact)
					.then(res => {
						that.enviandoMH = false;
						console.log('res',res);
						if(res.respuesta == "aceptado"){
							that.factura.estado = 'completa';
							that.guardar('completa',temp);
							that.modalRefCompletar.hide();
						} else if(res.error == "recibido"){
							alert('Su factura fue enviada pero el Ministerio de Hacienda esta tardando mucho tiempo en responder, por favor reintente el envío desde "Facturas"')
							that.factura.estado = 'enviada';
							that.factura.refresh = res.refreshToken
							that.guardar('enviada',temp);
							that.modalRefCompletar.hide();
						} else if(res.respuesta == "rechazado"){
							alert('Su factura fue rechazada pero el Ministerio de Hacienda, por favor revisé la información y cree una nueva.')
							that.factura.estado = 'rechazada';
							that.guardar('rechazada',temp);
							that.modalRefCompletar.hide();
						} else {
							alert('Lo sentimos pero su factura no fue aceptada por el Ministerio de Hacienda, por favor intentelo de nuevo.');
							that.modalRefCompletar.hide();
						}
					}, err =>{
						console.log('error',err);
						that.enviandoMH = false;
						that.modalRefCompletar.hide();
					})
				});
		    });
		}, err =>{
			console.log('error',err);
			that.modalRefCompletar.hide();
			that.enviandoMH = false;
		});
	}

	reenviarMH(temp){
		var that = this;
		var fact = this.createFact();
		console.log(fact);
		that.enviandoMH = true;
		fact.conrealizada = true;
		that.genLetter(function(doc){
			var blob = doc.output("blob");
	    	that.blobToBase64(blob,function(base){
				fact.facturabase = {
					base: base
				};
				that.facturadorService.post('',fact)
				.then(res => {
					that.enviandoMH = false;
					console.log('res',res);
					if(res.respuesta == "aceptado"){
						that.factura.estado = 'completa';
						that.guardar('completa',temp);
						// that.modalRefCompletar.hide();
					} else if(res.error == "recibido"){
						alert('Su factura fue enviada pero el Ministerio de Hacienda esta tardando mucho tiempo en responder, por favor reintente el envío desde "Facturas"')
						that.factura.estado = 'enviada';
						that.factura.refresh = res.refreshToken
						that.guardar('enviada',temp);
						// that.modalRefCompletar.hide();
					} else if(res.respuesta == "rechazado"){
							alert('Su factura fue rechazada pero el Ministerio de Hacienda, por favor revisé la información y cree una nueva.')
							that.factura.estado = 'rechazada';
							that.guardar('rechazada',temp);
							that.modalRefCompletar.hide();
					} else if(res.estado == "error en hacienda"){
						alert('Parece que hay un problema con el sistema del Ministerio de Hacienda puede intentarlo de nuevo en unos minutos, si no funciona, por favor comunicarlo al administrador del sistema.');
					} else {
						alert('Lo sentimos pero su factura no fue aceptada por el Ministerio de Hacienda, por favor intentelo de nuevo.');
						// that.modalRefCompletar.hide();
					}
				}, err =>{
					console.log('error',err);
					that.enviandoMH = false;
					// that.modalRefCompletar.hide();
				})
			});
	    });
	}

	genLetter(cb){
		var that = this;
		var doc;
		var img = new Image();
		img.addEventListener('load', function() {
			// header
			var pags = Math.ceil(that.factura.productos.length / 32);
			console.log(window.jsPDF);
			doc = new window.jsPDF('p','pt','letter');
			// var i = 0;
			// console.log('j',j,pags);
			var j = 0;
			var temparray: Productofacturaitem[] = [];
			var o,f,chunk = 32;
			for (o=0,f=that.factura.productos.length; o<f; o+=chunk) {
				temparray = that.factura.productos.slice(o,o+chunk);
				console.log(temparray);
			// for (var j = 0 ; j < pags; j++) {
				console.log('looped',i,pags);
				doc.setFont("helvetica");
				doc.setFontType("bold");
				doc.setFontSize("12");
				doc.text(that.authService.loggedEmpresa.nombreComercial, 130, 30);
				doc.setFont("helvetica");
				doc.setFontType("normal");
				doc.setFontSize("8");
				doc.text(that.authService.loggedEmpresa.cedula, 130, 45);
				doc.text(that.canton +', '+that.provincia, 130, 55);
				doc.text('Tel. '+that.authService.loggedEmpresa.telefonos[0].telefono, 130, 65);
				doc.text(that.authService.loggedEmpresa.correo.correo, 130, 75);
				if(that.authService.loggedEmpresa.paginaWeb){
					doc.text(that.authService.loggedEmpresa.paginaWeb, 130, 85);
				}
				img.width = 120;
				img.height = 80;
			    doc.addImage(img, 'png', 25, 20);
			    // fin header
			    // numero factura
			    doc.setFont("helvetica");
				doc.setFontType("bold");
				doc.setFontSize("12");
			    doc.text('Factura No', 25, 120);
			    var con = that.factura.consecutivo || 'Sin consecutivo';
			    doc.text(con, 100, 120);
			    doc.text('Fecha', 25, 140);
			    // doc.text(that.paseDate(new Date(that.factura.fecha_modificada)), 100, 140);
			    doc.text(that.datePipe.transform(new Date(that.factura.fecha_modificada), 'dd/MM/yyyy hh:mm:ss aa'), 100, 140);
			    // fin numero factura
			    // cliente 
			    // doc.setFillColor(191,191,191);
				doc.rect(300, 100, 250, 58);
				doc.text('Cliente', 310, 115);
			    doc.setFont("helvetica");
				doc.setFontType("normal");
				doc.setFontSize("10");
			    doc.text('Nombre', 310, 130);
			    if(that.factura.comprador.nombre != ''){
			    	doc.text(that.factura.comprador.nombre + ' ' +
			    			that.factura.comprador.apellido1 + ' ' +
			    			that.factura.comprador.apellido2, 380, 130);
			    	doc.text('Cedula', 310, 145);
			    	doc.text(''+that.factura.comprador.cedula, 380, 145);
			    } else {
			    	doc.text('Factura sin cliente', 380, 130);
			    }
			    // fin cliente
			    // tabla productos
			    doc.rect(25, 200, 560, 430);
			    doc.setFillColor(191,191,191);
			    doc.rect(26, 201, 558, 13, 'F');
			    var x = 26, y = 214;
			    for(var i=0; i<32;i++){
			    	if(i % 2 == 0){
			    		doc.setFillColor(204,217,255);
			    	} else {
			    		doc.setFillColor(255,255,255);
			    	}
			    	doc.rect(x, y, 558, 13, 'F');
			    	y += 13;
			    }
			    doc.setDrawColor(255,255,255);
			    doc.setLineWidth(1.5);
				doc.line(100, 200, 100, 700);
				doc.line(280, 200, 280, 700);
				doc.line(330, 200, 330, 700);
				doc.line(400, 200, 400, 700);
				doc.line(480, 200, 480, 700);
			    doc.setFontSize("8");
			    doc.text('Código', 47, 210);
			    doc.text('Producto', 200, 210);
			    doc.text('Cantidad', 290, 210);
			    doc.text('Descuento', 345, 210);
			    doc.text('Precio und', 420, 210);
			    doc.text('Precio', 520, 210);
			    // fin tabla productos
			    // agregar productos
			    y = 223;
				for (var i = temparray.length - 1; i >= 0; i--) {
					doc.text(''+temparray[i].producto.codigo, 70, y, 'right');
					if(temparray[i].producto.codigo != '0000'){
						var text = ''+temparray[i].producto.nombre+' '+temparray[i].producto.marca;
						doc.text(that.truncate(text,36), 110, y);
					} else {
						doc.text(''+temparray[i].producto.nombre, 110, y);
					}
					doc.text(''+temparray[i].cantidad, 310, y, 'right');
					doc.text(that.toDecimals(that.descuentoPorProducto(temparray[i])), 380, y, 'right');
					doc.text(that.toDecimals(temparray[i].producto.precio.toFixed(2)), 460, y, 'right');
					doc.text(that.toDecimals(Number(temparray[i].producto.precio.toFixed(2)) * temparray[i].cantidad), 550, y, 'right');
					y += 13;
				}
			    // fin agregar productos
			    // total
			    if(that.authService.loggedEmpresa.pieFactura){
				    var splitTitle = doc.splitTextToSize(that.authService.loggedEmpresa.pieFactura, 200);
					doc.text(splitTitle, 35, 670);
				}
			    doc.setFontSize("10");
				doc.setFontType("bold");
			    doc.text('Total Bruto', 400, 670);
			    doc.setFontType("normal");
			    doc.text(that.toDecimals(that.totalVentas()), 560, 670, 'right');
			    doc.text('Descuento', 400, 690);
			    doc.text(that.toDecimals(that.totalDescuentos()), 560, 690, 'right');
			    doc.text('Total Neto', 400, 710);
			    doc.text(that.toDecimals(that.totalVentasNeto()), 560, 710, 'right');
			    doc.text('Impuestos', 400, 730);
			    doc.text(that.toDecimals(that.totalImpuestos()), 560, 730, 'right');
			    doc.setFontSize("11");
				doc.setFontType("bold");
			    doc.text('Total Factura', 400, 750);
			    doc.text(that.toDecimals(that.totalComprobante()), 560, 750, 'right');
			    doc.text('Pag. '+(j+1)+' de '+ pags, 540, 15);
			    if(j < pags - 1){
			    	doc.addPage();
			    }
			    j++;
			}
		    // fin total
		    cb(doc);
		});
		var imgName = that.authService.loggedEmpresa.logoName || 'kyr.jpg';
		img.src = 'assets/' + imgName;
	}

	imprimir(tipo){
		console.log('imprimir',tipo,this.factura.productos.length);
		var doc;
		var that = this;
		if(tipo == 'A4'){
			this.genLetter(that.printDoc);
		} else {
			var height = 60;
			height += that.factura.productos.length * 4;
			doc = new window.jsPDF('p','mm',[60,height]);
			doc.setFontSize("10");
			doc.setFontType("bold");
			doc.text(that.authService.loggedEmpresa.nombreComercial, 30, 8,"center");
			doc.setFontSize("7");
			doc.setFontType("normal");
			doc.text(that.factura.consecutivo, 30, 12,"center");
			doc.text(that.canton +', '+that.provincia, 30, 16,"center");
			doc.text('Tel. '+that.factura.vendedor.telefonos[0].telefono, 30, 20,"center");
			doc.text(that.factura.vendedor.correo.correo, 30, 24,"center");
			if(that.authService.loggedEmpresa.paginaWeb){
				doc.text(that.authService.loggedEmpresa.paginaWeb, 30, 28,"center");
			}
			doc.text(that.factura.vendedor.cedula, 30, 32,"center");
			doc.text('Vendedor:', 7, 36,"left");
			doc.text(that.factura.vendedor.nombre, 30, 36,"left");
			//display products

			var y = 43;
			for (var i = that.factura.productos.length - 1; i >= 0; i--) {
				if(that.factura.productos[i].producto.codigo != '0000'){
					var text = ''+that.factura.productos[i].producto.nombre+' '+that.factura.productos[i].producto.marca;
					doc.text(that.truncate(text,14), 7, y,'left');
				} else {
					doc.text(''+that.factura.productos[i].producto.nombre, 7, y,'left');
				}
				doc.text(that.toDecimals(that.factura.productos[i].producto.precio * that.factura.productos[i].cantidad), 50, y, 'right');
				y += 4;
			}
			// end display
			// total
			doc.text('-------------------------------------------------------------', 30, y,"center");
			doc.text('Total Neto: ', 35, y+4,"right");
			doc.text(that.toDecimals(that.totalVentasNeto()), 50, y+4,"right");
			doc.text('Total Impuestos: ', 35, y+8,"right");
			doc.text(that.toDecimals(that.totalImpuestos()), 50, y+8,"right");
			doc.text('Total: ', 35,y+12,"right");
			doc.text(that.toDecimals(that.totalComprobante()), 50, y+12,"right");
			// fin total
			doc.setFontSize("8");
			doc.text('Muchas Gracias', 30,y+19,"center");
			that.printDoc(doc);
		}
	}

	printDoc(doc){
		var blob = doc.output("blob");
    	window.open(URL.createObjectURL(blob));
	}

	blobToBase64(blob, cb) {
	    var reader = new FileReader();
	    reader.onload = function() {
		    var dataUrl = reader.result;
		    var base64 = dataUrl.split(',')[1];
		    cb(base64);
	    };
	    reader.readAsDataURL(blob);
	}

	public calculaTotalItem(fi:Productofacturaitem){
		return fi.producto.precio * fi.cantidad - this.descuentoPorProducto(fi) + ((fi.producto.precio * fi.cantidad - this.descuentoPorProducto(fi) )* fi.producto.impuestos / 100);
	}

	formatDate(date:Date){
		return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss-06:00')
	}


}
