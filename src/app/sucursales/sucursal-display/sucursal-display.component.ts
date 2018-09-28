import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Sucursal } from '../../models/sucursal';
import { SucursalService } from '../../services/sucursal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-sucursal-display',
  templateUrl: './sucursal-display.component.html',
  styleUrls: ['./sucursal-display.component.css']
})
export class SucursalDisplayComponent implements OnInit {
	@Input() sucursal : Sucursal;
	@Output() borrarSucursal = new EventEmitter<Sucursal>();
	@Output() editarSucursal = new EventEmitter<Sucursal>();
	@Output() actualizarLista = new EventEmitter<any>();
	public isDeleting = false;
	public copy : Sucursal;
	public action = "ver";
	modalRef: BsModalRef;

	constructor(private sucursalService:SucursalService,private modalService: BsModalService) { }

	ngOnInit() {
		this.copy = JSON.parse(JSON.stringify(this.sucursal));
	}
 
	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}

	ver(template: TemplateRef<any>){
		this.action = "ver";
		this.copy = JSON.parse(JSON.stringify(this.sucursal));
		this.openModal(template);
	}

	borrar(template: TemplateRef<any>){
		this.action = "borrar";
		this.copy = JSON.parse(JSON.stringify(this.sucursal));
		this.openModal(template);
	}


	editar(template: TemplateRef<any>){
		this.action = "editar";
		this.copy = JSON.parse(JSON.stringify(this.sucursal));
		this.openModal(template);
	}

	actualizar(){
		this.actualizarLista.emit();
	}

}
