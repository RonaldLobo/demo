import { Injectable } from '@angular/core';
import { Aceptacion } from '../models/aceptacion';
import { DataService } from '../services/data.service';

@Injectable()
export class AceptacionService {	
	constructor(private dataService:DataService) { }

	public obtenerAceptacion(){
		return this.dataService.get('/api/aceptaciones');
	}

	public obtenerAceptacionVendedor(id){
		return this.dataService.get('/api/aceptaciones');
	}

	public obtenerAceptacionId(id){
		return this.dataService.get('/api/aceptaciones/'+id);
	}

	public agregarAceptacion(aceptacion){
		console.log('aceptacion');
		return this.dataService.post('/api/aceptaciones',{'aceptacion':aceptacion});
	}

	public borrarAceptacion(aceptacion:Aceptacion){
		return this.dataService.delete('/api/aceptaciones/'+aceptacion._id);
	}

	public editarAceptacion(aceptacion:Aceptacion){
		return this.dataService.put('/api/aceptaciones/'+aceptacion._id,{'aceptacion':aceptacion});
	}
}
