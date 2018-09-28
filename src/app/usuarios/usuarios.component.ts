import { Component, OnInit, AfterViewInit, TemplateRef } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuariosService } from '../services/usuarios.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {
	public usuarios : Usuario[];
	public selectedProduct : Usuario = new Usuario;
	public loading : boolean = false;
	public action: string = 'agregar';
	modalRef: BsModalRef;

	constructor(private usuariosService: UsuariosService,private modalService: BsModalService) { }

	ngOnInit() {
		this.obtenerUsuarios();
	}

	public editarUsuario(usuario){
		console.log('edit',usuario);
		this.selectedProduct = Object.assign({}, usuario);
	}

	public editarUsuarioSave(usuario){
		this.usuariosService.editarUsuario(usuario.usuario)
			.then(data => {
				this.obtenerUsuarios();
			})
			.catch(error => {
				console.log('error',error);
			});
	}

	public borrarUsuario(usuario){
		this.usuariosService.borrarUsuario(usuario)
			.then(data => {
				this.obtenerUsuarios();
			})
			.catch(error => {
				console.log('error',error);
			});
	}

	public obtenerUsuarios(){
		this.usuariosService.obtenerUsuarios().subscribe((data) => {
				this.usuarios = data.user;
			},(error)=>{
				console.log('error',error);
			});
	}

	public agregarUsuario(usuario:any){
		this.loading = true;
		this.usuariosService.agregarUsuario(usuario.usuario)
			.then(data => {
				console.log('usuario agregado');
				usuario.form.reset();
				this.loading = false;
				this.obtenerUsuarios();
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
		this.obtenerUsuarios();
	}

	ngAfterViewInit(){
		console.timeEnd();
	}
}
