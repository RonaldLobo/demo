import { Component, OnInit, AfterViewInit, TemplateRef } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClientesService } from '../services/clientes.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AuthService } from '../services/auth.service'; 
import { Router } from '@angular/router'; 

@Component({
	selector: 'app-clientes',
	templateUrl: './clientes.component.html',
	styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit, AfterViewInit {
	public clientes : Cliente[];
	public p: number = 1;
	public order = 'nombre'; 
	public reverse = false;
	public selectedProduct : Cliente = new Cliente;
	public loading : boolean = false;
	public action: string = 'agregar';
	modalRef: BsModalRef;

	constructor(private clientesService: ClientesService,private modalService: BsModalService, 
		private authService:AuthService, private router:Router) { }

	ngOnInit() {
		if(this.authService.isLogged == false){
	      this.router.navigate(['/'])
	    }
		this.obtenerClientes();
	}

	orderBy(by){
		this.order = by;
		this.clientes = this.sortByKey(this.clientes,by);
		if(this.reverse){
			this.clientes.reverse();
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

	public editarCliente(cliente){
		console.log('edit',cliente);
		this.selectedProduct = Object.assign({}, cliente);
	}

	public editarClienteSave(cliente){
		this.clientesService.editarCliente(cliente.cliente)
			.then(data => {
				this.obtenerClientes();
			})
			.catch(error => {
				console.log('error',error);
			});
	}

	public borrarCliente(cliente){
		this.clientesService.borrarCliente(cliente)
			.then(data => {
				this.obtenerClientes();
			})
			.catch(error => {
				console.log('error',error);
			});
	}

	public obtenerClientes(){
		this.clientesService.obtenerClientes().subscribe((data) => {
				this.clientes = data.client;
			},(error)=>{
				console.log('error',error);
			});
	}

	public agregarCliente(cliente:any){
		this.loading = true;
		this.clientesService.agregarCliente(cliente.cliente)
			.then(data => {
				console.log('cliente agregado');
				cliente.form.reset();
				this.loading = false;
				this.obtenerClientes();
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
		this.obtenerClientes();
	}

	ngAfterViewInit(){
		console.timeEnd();
	}
}
