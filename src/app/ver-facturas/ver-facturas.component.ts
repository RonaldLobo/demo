import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Factura } from '../models/factura';

import * as _ from 'lodash';



import { FacturaService } from '../services/factura.service';

@Component({
	selector: 'app-ver-facturas',
	templateUrl: './ver-facturas.component.html',
	styleUrls: ['./ver-facturas.component.css']
})
export class VerFacturasComponent implements OnInit {
	public facturas: Factura[] =[];
	p: number = 1;
	public order: string = 'fecha_modificada';
	public reverse:boolean = true;
	public nombreCliente: string = '';
	public nombreVendedor: string = '';
	public pagConfig : any = {
		autoHide:false,
        previousLabel:'Previo',
        nextLabel:'Siguiente'
	}
	constructor(private router:Router, private facturaService:FacturaService) { }

	ngOnInit() {
		this.obtenerFacturas();
	}

	orderBy(by){
		this.order = by;
		this.facturas = this.sortByKey(this.facturas,by);
		if(this.reverse){
			this.facturas.reverse();
		}
		this.reverse = !this.reverse;
	}

	sortByKey(array, key) {
	    return array.sort(function(a, b) {
	        var x = a[key]; 
	        var y = b[key];
	        if(key.indexOf('.') != -1){	        
	        	x = a[key.split('.')[0]][key.split('.')[1]]; 
	        	y = b[key.split('.')[0]][key.split('.')[1]];
	        }
	        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	    });
	}

	obtenerFacturas(){
		this.facturaService.obtenerFacturas().subscribe((data) => {
			console.log('success',data);
			this.facturas = data.productBill;
			this.reverse = true;
			this.orderBy('fecha_modificada');
		}, fail => {
		});
	}

	agregarFactura(){
		this.router.navigate(['/vender']);
	}

	obtieneTotal(factura){
		var total = 0;
		for (var i = factura.productos.length - 1; i >= 0; i--) {
			var productoPrecio = factura.productos[i].producto.precio;
			if(factura.productos[i].descuento > 0){
				if(factura.productos[i].descuento_tipo == 1){
					productoPrecio -= factura.productos[i].descuento;
				} else {
					productoPrecio -= (productoPrecio * (factura.productos[i].descuento * 0.01));
				}
			}
			total += productoPrecio * factura.productos[i].cantidad;
		}
		if(total > 0){
			if(factura.descuento > 0){
				if(factura.descuento_tipo == 1){
					total -= factura.descuento;
				} else {
					total -= (total * (factura.descuento * 0.01));
				}
			}
		}
		if(total < 0){
			alert('Por favor revise los datos');
		}
		return total;
	}

	seleccionarFactura(factura){
		console.log(factura);
		this.router.navigate(['/vender/'+factura._id]);
	}

	changedNombreCliente = _.debounce(function() {
		console.log('called');
		if(this.nombreCliente.length == 0){
			this.obtenerFacturas()
		}
		if(this.nombreCliente.length > 2){
			this.buscando = true;
			this.facturaService.obtenerFacturasFiltroNombre(this.nombreCliente).subscribe((data) => {
				this.facturas = data.productBill;
			}, fail => {
			});
		}
	}, 400);

	changedNombreVendedor = _.debounce(function() {
		console.log('called');
		if(this.nombreVendedor.length == 0){
			this.obtenerFacturas()
		}
		if(this.nombreVendedor.length > 2){
			this.buscando = true;
			this.facturaService.obtenerFacturasFiltroNombreVendedor(this.nombreVendedor).subscribe((data) => {
				this.facturas = data.productBill;
			}, fail => {
			});
		}
	}, 400);

}
