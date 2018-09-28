import { Injectable } from '@angular/core';
import { Sucursal } from '../models/sucursal';
import { DataService } from '../services/data.service';

@Injectable()
export class SucursalService {	
	constructor(private dataService:DataService) { }

	public obtenerSucursales(){
		return this.dataService.get('/api/sucursal');
	}

	public agregarSucursal(sucursal:Sucursal){
		console.log('sucursal');
		return this.dataService.post('/api/sucursal',{'sucursal':sucursal});
	}

	public borrarSucursal(sucursal:Sucursal){
		return this.dataService.delete('/api/sucursal/'+sucursal._id);
	}

	public editarSucursal(sucursal:Sucursal){
		return this.dataService.put('/api/sucursal/'+sucursal._id,{'sucursal':sucursal});
	}
}
