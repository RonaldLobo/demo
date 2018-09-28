import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductosService } from '../../services/productos.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-producto-display',
  templateUrl: './producto-display.component.html',
  styleUrls: ['./producto-display.component.css']
})
export class ProductoDisplayComponent implements OnInit {
	@Input() producto : Producto;
	@Output() borrarProducto = new EventEmitter<Producto>();
	@Output() editarProducto = new EventEmitter<Producto>();
	@Output() actualizarLista = new EventEmitter<any>();
	public isDeleting = false;
	public copy : Producto;
	public action = "ver";
	modalRef: BsModalRef;

	constructor(private productosService:ProductosService,private modalService: BsModalService) { }

	ngOnInit() {
		this.copy = JSON.parse(JSON.stringify(this.producto));
	}
 
	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}

	ver(template: TemplateRef<any>){
		this.action = "ver";
		this.copy = JSON.parse(JSON.stringify(this.producto));
		this.openModal(template);
	}

	borrar(template: TemplateRef<any>){
		this.action = "borrar";
		this.copy = JSON.parse(JSON.stringify(this.producto));
		this.openModal(template);
	}


	editar(template: TemplateRef<any>){
		this.action = "editar";
		this.copy = JSON.parse(JSON.stringify(this.producto));
		this.openModal(template);
	}

	actualizar(){
		this.actualizarLista.emit();
	}

}
