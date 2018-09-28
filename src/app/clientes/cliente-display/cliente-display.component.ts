import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClientesService } from '../../services/clientes.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-cliente-display',
  templateUrl: './cliente-display.component.html',
  styleUrls: ['./cliente-display.component.css']
})
export class ClienteDisplayComponent implements OnInit {
	@Input() cliente : Cliente;
	@Output() borrarCliente = new EventEmitter<Cliente>();
	@Output() editarCliente = new EventEmitter<Cliente>();
	@Output() actualizarLista = new EventEmitter<any>();
	public isDeleting = false;
	public copy : Cliente;
	public action = "ver";
	modalRef: BsModalRef;

	constructor(private clientesService:ClientesService,private modalService: BsModalService) { }

	ngOnInit() {
		this.copy = JSON.parse(JSON.stringify(this.cliente));
	}
 
	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}

	ver(template: TemplateRef<any>){
		this.action = "ver";
		this.copy = JSON.parse(JSON.stringify(this.cliente));
		this.openModal(template);
	}

	borrar(template: TemplateRef<any>){
		this.action = "borrar";
		this.copy = JSON.parse(JSON.stringify(this.cliente));
		this.openModal(template);
	}


	editar(template: TemplateRef<any>){
		this.action = "editar";
		this.copy = JSON.parse(JSON.stringify(this.cliente));
		this.openModal(template);
	}

	actualizar(){
		this.actualizarLista.emit();
	}

}
