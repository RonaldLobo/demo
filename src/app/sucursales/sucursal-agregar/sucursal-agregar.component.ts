import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Sucursal } from '../../models/sucursal';
import { Telefono } from '../../models/telefono';
import { SucursalService } from '../../services/sucursal.service';
 
@Component({
	selector: 'app-sucursal-agregar',
	templateUrl: './sucursal-agregar.component.html',
	styleUrls: ['./sucursal-agregar.component.css']
})
export class SucursalAgregarComponent implements OnInit, OnChanges {
	@Output() agregarSucursal = new EventEmitter<any>();
	@Output() editarSucursal = new EventEmitter<any>();
	@Output() close = new EventEmitter<any>();
	@Input() canAdd : boolean = true;
	@Input() action : string = "ver";
	@Input('selectedProduct') sucursal : Sucursal = new Sucursal();
	@ViewChild('phone')
	phone: NgModel;
	submitted = false;
	requiredText : string = 'sucursal';
	isEditing = false;
	newPhone = '';
	noPhones = true;
	errorDisplay = '';


	constructor(private sucursalService:SucursalService) { }

	ngOnInit() {
	}


	onSubmit(sucursalForm) {
		console.log('sucursal');
		console.log(this.sucursal);
		if(this.action === "agregar"){
			this.sucursalService.agregarSucursal(this.sucursal)
			.then(success =>{
				console.log('agregado',success);
				this.close.emit();
			}, fail => {
				var body = JSON.parse(fail._body);
				console.log(body);
				if(body.code == "11000"){
					this.errorDisplay = "Por favor seleccione otra cedula";
				}
				console.log('fallo',fail);
			});
		}
		if(this.action === "editar"){
			this.sucursalService.editarSucursal(this.sucursal)
			.then(success =>{
				console.log('editado',success);
				this.close.emit();
			}, fail => {
				var body = JSON.parse(fail._body);
				console.log(body);
				if(body.code == "11000"){
					this.errorDisplay = "Por favor seleccione otra cedula";
				}
				console.log('fallo',fail);
			});
		}
	}

	ngOnChanges(changes){
		// console.log('changes',changes)
		// if(changes.usuario && changes.usuario.currentValue._id){
		// 	console.log('is editing');
		// 	this.isEditing = true;
		// }
	}

	newSucursal(){
		this.submitted = false; 
		this.isEditing = false;
		this.sucursal = new Sucursal();
	}

	eliminar(){
		this.sucursalService.borrarSucursal(this.sucursal)
			.then(success =>{
				console.log('borrado',success);
				this.close.emit();
			}, fail => {
				console.log('fallo',fail);
			});
	}

	addPhone(){
		if(this.sucursal.telefonos.length < 3){
			var phone = new Telefono();
			phone.telefono = this.newPhone + '';
			this.sucursal.telefonos.push(phone);
			this.newPhone = '';
			this.phone.reset();
		} else {
			alert('Ya tiene el maximo de 3 telefonos para este sucursal');
		}
	}

	quitarTelefono(phone){
		this.sucursal.telefonos = this.sucursal.telefonos.filter(tel => tel.telefono != phone.telefono);
	}

}
