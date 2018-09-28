import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { DataService } from '../services/data.service';

@Injectable()
export class ClientesService {

  constructor(private dataService:DataService) { }

	public obtenerClientes(){
		return this.dataService.get('/api/clients');
	}

	public obtenerClientesFiltroNombre(filtro){
		return this.dataService.get('/api/clients?nombre='+filtro);
	}

	public obtenerClientesFiltroCedula(filtro){
		return this.dataService.get('/api/clients?cedula='+filtro);
	}

	public agregarCliente(cliente:Cliente){
		return this.dataService.post('/api/clients',{'client':cliente});
	}

	public borrarCliente(cliente:Cliente){
		return this.dataService.delete('/api/clients/'+cliente._id);
	}

	public editarCliente(cliente:Cliente){
		return this.dataService.put('/api/clients/'+cliente._id,{'client':cliente});
	}

}
