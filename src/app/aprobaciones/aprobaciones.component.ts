import { Component, OnInit, AfterViewInit, TemplateRef } from '@angular/core';
import { Aceptacion } from '../models/aceptacion';
import { AceptacionService } from '../services/aceptacion.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AuthService } from '../services/auth.service'; 
import { ActivatedRoute, Router } from '@angular/router'; 

@Component({
	selector: 'app-aprobaciones',
	templateUrl: './aprobaciones.component.html',
	styleUrls: ['./aprobaciones.component.css']
})
export class AprobacionesComponent implements OnInit {
	public aceptaciones : Aceptacion[];
	public p: number = 1;
	public order = 'fecha'; 
	public id: string = '';
	public reverse = true;
	public selectedAceptacion : Aceptacion = new Aceptacion();
	public loading : boolean = false;
	public action: string = 'agregar';
	modalRef: BsModalRef;

	constructor(private aceptacionService: AceptacionService,private modalService: BsModalService, 
		private authService:AuthService, private router:Router, 
		private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.obtenerAceptaciones();
	}

	orderBy(by){
		this.order = by;
		this.aceptaciones = this.sortByKey(this.aceptaciones,by);
		if(this.reverse){
			this.aceptaciones.reverse();
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

	// public editarFactura(factura){
	// 	console.log('edit',factura);
	// 	this.selectedProduct = Object.assign({}, factura);
	// }

	// public editarFacturaSave(cliente){
	// 	this.facturasService.editarFactura(cliente.cliente)
	// 		.then(data => {
	// 			this.obtenerFacturas();
	// 		})
	// 		.catch(error => {
	// 			console.log('error',error);
	// 		});
	// }

	// public borrarCliente(factura){
	// 	this.facturasService.borrarFactura(factura)
	// 		.then(data => {
	// 			this.obtenerFacturas();
	// 		})
	// 		.catch(error => {
	// 			console.log('error',error);
	// 		});
	// }

	public obtenerAceptaciones(){
		this.aceptacionService.obtenerAceptacionVendedor(this.authService.loggedUser._id).subscribe((data) => {
				this.aceptaciones = data.acceptacion;
				this.orderBy(this.order);
			},(error)=>{
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
		this.obtenerAceptaciones();
	}

	ngAfterViewInit(){
		console.timeEnd();
	}

	verAceptacion(id){
		this.goTo('/aprobar/'+id);
	}

	goTo(url){
		this.router.navigate([url]);
	}
}
