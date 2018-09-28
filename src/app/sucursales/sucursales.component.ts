import { Component, OnInit, AfterViewInit, TemplateRef } from '@angular/core';
import { Sucursal } from '../models/sucursal';
import { SucursalService } from '../services/sucursal.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
	selector: 'app-sucursales',
	templateUrl: './sucursales.component.html',
	styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit, AfterViewInit {
	public sucursales : Sucursal[];
	public selectedProduct : Sucursal = new Sucursal;
	public loading : boolean = false;
	public action: string = 'agregar';
	modalRef: BsModalRef;

	constructor(private sucursalService: SucursalService,private modalService: BsModalService) { }

	ngOnInit() {
		this.obtenerSucursales();
	}

	public editarSucursal(sucursal){
		console.log('edit',sucursal);
		this.selectedProduct = Object.assign({}, sucursal);
	}

	public editarSucursalSave(sucursal){
		this.sucursalService.editarSucursal(sucursal.sucursal)
			.then(data => {
				this.obtenerSucursales();
			})
			.catch(error => {
				console.log('error',error);
			});
	}

	public borrarSucursal(sucursal){
		this.sucursalService.borrarSucursal(sucursal)
			.then(data => {
				this.obtenerSucursales();
			})
			.catch(error => {
				console.log('error',error);
			});
	}

	public obtenerSucursales(){
		this.sucursalService.obtenerSucursales().subscribe((data) => {
				this.sucursales = data.sucursal;
			},(error)=>{
				console.log('error',error);
			});
	}

	public agregarSucursal(sucursal:any){
		this.loading = true;
		this.sucursalService.agregarSucursal(sucursal.sucursal)
			.then(data => {
				console.log('sucursal agregado');
				sucursal.form.reset();
				this.loading = false;
				this.obtenerSucursales();
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
		this.obtenerSucursales();
	}

	ngAfterViewInit(){
		console.timeEnd();
	}
}
