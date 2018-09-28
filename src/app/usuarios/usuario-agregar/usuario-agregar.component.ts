import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { Sucursal } from '../../models/sucursal';
import { Telefono } from '../../models/telefono';
import { UsuariosService } from '../../services/usuarios.service';
import { SucursalService } from '../../services/sucursal.service';
 
@Component({
	selector: 'app-usuario-agregar',
	templateUrl: './usuario-agregar.component.html',
	styleUrls: ['./usuario-agregar.component.css']
})
export class UsuarioAgregarComponent implements OnInit, OnChanges {
	@Output() agregarUsuario = new EventEmitter<any>();
	@Output() editarUsuario = new EventEmitter<any>();
	@Output() close = new EventEmitter<any>();
	@Input() canAdd : boolean = true;
	@Input() action : string = "ver";
	@Input('selectedProduct') usuario : Usuario = new Usuario();
	@ViewChild('phone')
	phone: NgModel;
	submitted = false;
	requiredText : string = 'usuario';
	isEditing = false;
	newPhone = '';
	noPhones = true;
	errorDisplay = '';
	sucursales : Sucursal[] = [];


	constructor(private usuariosService:UsuariosService, private sucursalService:SucursalService) { 
		this.sucursalService.obtenerSucursales().subscribe((data) => {
				this.sucursales = data.sucursal;
			},(error)=>{
				console.log('error',error);
			});
	}

	ngOnInit() {
	}


	onSubmit(usuarioForm) {
		console.log('usuario');
		console.log(this.usuario);
		if(this.action === "agregar"){
			this.usuariosService.agregarUsuario(this.usuario)
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
			this.usuariosService.editarUsuario(this.usuario)
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

	newUsuario(){
		this.submitted = false; 
		this.isEditing = false;
		this.usuario = new Usuario();
	}

	eliminar(){
		this.usuariosService.borrarUsuario(this.usuario)
			.then(success =>{
				console.log('borrado',success);
				this.close.emit();
			}, fail => {
				console.log('fallo',fail);
			});
	}

	addPhone(){
		if(this.usuario.telefonos.length < 3){
			var phone = new Telefono();
			phone.telefono = this.newPhone + '';
			this.usuario.telefonos.push(phone);
			this.newPhone = '';
			this.phone.reset();
		} else {
			alert('Ya tiene el maximo de 3 telefonos para este usuario');
		}
	}

	quitarTelefono(phone){
		this.usuario.telefonos = this.usuario.telefonos.filter(tel => tel.telefono != phone.telefono);
	}

}
