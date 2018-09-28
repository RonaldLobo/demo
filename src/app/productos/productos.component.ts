import { Component, OnInit, AfterViewInit, TemplateRef } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductosService } from '../services/productos.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as _ from 'lodash';

@Component({
	selector: 'app-productos',
	templateUrl: './productos.component.html',
	styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, AfterViewInit {
	public productos : Producto[];
	p: number = 1;
	public selectedProduct : Producto = new Producto;
	public loading : boolean = false;
	public action: string = 'agregar';
	public order : string = 'nombre';
	public reverse : boolean = false;
	modalRef: BsModalRef;
	public buscando: boolean = false;
	public codigo:string = '';
	public nombreProducto:string = '';
	public modeloProducto:string = '';

	constructor(private productosService: ProductosService,private modalService: BsModalService) { }

	ngOnInit() {
		this.obtenerProductos();
	}

	public editarProducto(producto){
		console.log('edit',producto);
		this.selectedProduct = Object.assign({}, producto);
	}

	public editarProductoSave(producto){
		this.productosService.editarProducto(producto.producto)
			.then(data => {
				this.obtenerProductos();
			})
			.catch(error => {
				console.log('error',error);
			});
	}

	public borrarProducto(producto){
		this.productosService.borrarProducto(producto)
			.then(data => {
				this.obtenerProductos();
			})
			.catch(error => {
				console.log('error',error);
			});
	}

	public obtenerProductos(){
		if(this.codigo.length > 2){
			this.productosService.obtenerProductosFiltroCodigo(this.codigo).subscribe((data) => {
				this.buscando = false;
				this.productos = data.product;
			}, fail => {
			});
		} else if(this.nombreProducto.length > 2){
			this.productosService.obtenerProductosFiltroNombre(this.nombreProducto).subscribe((data) => {
				this.buscando = false;
				this.productos = data.product;
			}, fail => {
			});
		} else {
			this.productosService.obtenerProductos().subscribe((data) => {
					this.productos = data.product;
					this.orderBy(this.order);
				},(error)=>{
					console.log('error',error);
				});
		}
	}

	public agregarProducto(producto:any){
		this.loading = true;
		this.productosService.agregarProducto(producto.producto)
			.then(data => {
				console.log('producto agregado');
				producto.form.reset();
				this.loading = false;
				this.obtenerProductos();
			})
			.catch(error => {
				console.log('error',error);
			});
	}

	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}

	agregar(template: TemplateRef<any>){
		this.action = "agregar";
		this.openModal(template);
	}

	actualizarLista(){
		this.obtenerProductos();
	}

	ngAfterViewInit(){
		// console.timeEnd();
	}

	orderBy(by){
		this.order = by;
		console.log(by);
		this.productos = this.sortByKey(this.productos,by);
		if(this.reverse){
			this.productos.reverse();
		}
		this.reverse = !this.reverse;
	}

	sortByKey(array, key) {
		console.log(array);
	    return array.sort(function(a, b) {
	        var x = a[key]; 
	        var y = b[key];
	        if(x < y) return -1;
		    if(x > y) return 1;
		    return 0;
	    });
	}

	changedCodigo = _.debounce(function() {
		if(this.codigo.length > 2){
			this.buscando = true;
			this.nombreProducto = '';
			this.modeloProducto = '';
			this.productosService.obtenerProductosFiltroCodigo(this.codigo).subscribe((data) => {
				this.buscando = false;
				this.productos = data.product;
			}, fail => {
			});
		}
		if(this.codigo.length == 0){
			this.obtenerProductos();
		}
	}, 400);

	changedNombre = _.debounce(function() {
		if(this.nombreProducto.length > 2){
			this.buscando = true;
			this.codigo = '';
			this.modeloProducto = '';
			this.productosService.obtenerProductosFiltroNombre(this.nombreProducto).subscribe((data) => {
				this.buscando = false;
				this.productos = data.product;
			}, fail => {
			});
		}
		if(this.nombreProducto.length == 0){
			this.obtenerProductos();
		}
	}, 400);

	changedModelo = _.debounce(function() {
		if(this.modeloProducto.length > 2){
			this.buscando = true;
			this.codigo = '';
			this.nombreProducto = '';
			this.productosService.obtenerProductosFiltroModelo(this.modeloProducto).subscribe((data) => {
				this.buscando = false;
				this.productos = data.product;
			}, fail => {
			});
		}
		if(this.modeloProducto.length == 0){
			this.obtenerProductos();
		}
	}, 400);
}
