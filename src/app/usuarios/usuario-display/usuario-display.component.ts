import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-usuario-display',
  templateUrl: './usuario-display.component.html',
  styleUrls: ['./usuario-display.component.css']
})
export class UsuarioDisplayComponent implements OnInit {
	@Input() usuario : Usuario;
	@Output() borrarUsuario = new EventEmitter<Usuario>();
	@Output() editarUsuario = new EventEmitter<Usuario>();
	@Output() actualizarLista = new EventEmitter<any>();
	public isDeleting = false;
	public copy : Usuario;
	public action = "ver";
	modalRef: BsModalRef;

	constructor(private usuariosService:UsuariosService,private modalService: BsModalService) { }

	ngOnInit() {
		this.copy = JSON.parse(JSON.stringify(this.usuario));
	}
 
	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}

	ver(template: TemplateRef<any>){
		this.action = "ver";
		this.copy = JSON.parse(JSON.stringify(this.usuario));
		this.openModal(template);
	}

	borrar(template: TemplateRef<any>){
		this.action = "borrar";
		this.copy = JSON.parse(JSON.stringify(this.usuario));
		this.openModal(template);
	}


	editar(template: TemplateRef<any>){
		this.action = "editar";
		this.copy = JSON.parse(JSON.stringify(this.usuario));
		this.openModal(template);
	}

	actualizar(){
		this.actualizarLista.emit();
	}

}
