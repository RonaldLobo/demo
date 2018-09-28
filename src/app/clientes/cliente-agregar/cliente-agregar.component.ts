import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { Telefono } from '../../models/telefono';
import { ClientesService } from '../../services/clientes.service';
import { SharedService } from '../../services/shared.service';
 
@Component({
	selector: 'app-cliente-agregar',
	templateUrl: './cliente-agregar.component.html',
	styleUrls: ['./cliente-agregar.component.css']
})
export class ClienteAgregarComponent implements OnInit, OnChanges {
	@Output() agregarCliente = new EventEmitter<any>();
	@Output() editarCliente = new EventEmitter<any>();
	@Output() close = new EventEmitter<any>();
	@Input() canAdd : boolean = true;
	@Input() action : string = "ver";
	@Input('selectedProduct') cliente : Cliente = new Cliente();
	@ViewChild('phone')
	phone: NgModel;
	submitted = false;
	requiredText : string = 'cliente';
	isEditing = false;
	newPhone = '';
	noPhones = true;
	errorDisplay = '';
	posiblesClientes = [];
	buscando = false;


	constructor(private clientesService:ClientesService, private sharedService:SharedService) { }

	ngOnInit() {
	}


	onSubmit(clienteForm) {
		console.log('cliente');
		console.log(this.cliente);
		if(this.action === "agregar"){
			this.clientesService.agregarCliente(this.cliente)
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
			this.clientesService.editarCliente(this.cliente)
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
		// if(changes.cliente && changes.cliente.currentValue._id){
		// 	console.log('is editing');
		// 	this.isEditing = true;
		// }
	}

	newCliente(){
		this.submitted = false; 
		this.isEditing = false;
		this.cliente = new Cliente();
	}

	eliminar(){
		this.clientesService.borrarCliente(this.cliente)
			.then(success =>{
				console.log('borrado',success);
				this.close.emit();
			}, fail => {
				console.log('fallo',fail);
			});
	}

	addPhone(){
		if(this.cliente.telefonos.length < 3){
			var phone = new Telefono();
			phone.telefono = this.newPhone + '';
			this.cliente.telefonos.push(phone);
			this.newPhone = '';
			this.phone.reset();
		} else {
			alert('Ya tiene el maximo de 3 telefonos para este cliente');
		}
	}

	quitarTelefono(phone){
		this.cliente.telefonos = this.cliente.telefonos.filter(tel => tel.telefono != phone.telefono);
	}

	buscarPorNombre(){
		this.posiblesClientes = [];
		this.buscando = true;
		this.sharedService.get('/api/personas?tipo=nombre&nombre='+this.cliente.nombre+'&apellido1='+this.cliente.apellido1+'&apellido2='+this.cliente.apellido2).then(res =>{
			console.log(res);
			this.buscando = false;
			if(res.persona.length == 1){
				this.cliente.cedula = res.persona[0].cedula;
				this.cliente.nombre = this.toTitleCase(res.persona[0].nombre);
				this.cliente.apellido1 = this.toTitleCase(res.persona[0].apellido1);
				this.cliente.apellido2 = this.toTitleCase(res.persona[0].apellido2);
				this.cliente.tipoId = '01';
				var cod = ''+res.persona[0].codigoelec;
				this.cliente.provincia = cod.substr(0,1);
				this.cliente.canton = cod.substr(1,2);
				this.cliente.distrito = cod.substr(4,2);
				console.log(this.cliente);
			} else{
				this.posiblesClientes = res.persona;
			}
		}, err =>{
			console.log(err);
		})
	}

	toTitleCase(str) {
	    return str.replace(/\w\S*/g, function(txt){
	        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	    });
	}

	buscarPorCedula(){
		this.buscando = true;
		this.sharedService.get('/api/personas?tipo=cedula&filter='+this.cliente.cedula).then(res =>{
			this.buscando = false;
			if(res.persona.length == 1){
				this.cliente.cedula = res.persona[0].cedula;
				this.cliente.nombre = this.toTitleCase(res.persona[0].nombre);
				this.cliente.apellido1 = this.toTitleCase(res.persona[0].apellido1);
				this.cliente.apellido2 = this.toTitleCase(res.persona[0].apellido2);
				this.cliente.tipoId = '01';
				var cod = ''+res.persona[0].codigoelec;
				this.cliente.provincia = cod.substr(0,1);
				this.cliente.canton = cod.substr(1,2);
				this.cliente.distrito = cod.substr(4,2);
				console.log(this.cliente);
			}
		}, err =>{
			console.log(err);
		})
	}

	selectCliente(cli){
		this.cliente.cedula = cli.cedula;
		this.cliente.tipoId = '01';
		var cod = ''+cli.codigoelec;
		this.cliente.provincia = cod.substr(0,1);
		this.cliente.canton = cod.substr(1,2);
		this.cliente.distrito = cod.substr(4,2);
	}

}
