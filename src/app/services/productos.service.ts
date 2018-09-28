import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ProductosService {
	
	constructor(private dataService:DataService,private authService:AuthService) { }

	public obtenerProductos(){
		var url = '/api/products';
		if(this.authService.loggedUser.rol != 1){
			url = url + '?idSucursal='+this.authService.loggedUser.idSucursal;
		}
		return this.dataService.get(url);
	}

	public obtenerProductosFiltroCodigo(filtro){
		var url = '/api/products?';
		if(this.authService.loggedUser.rol != 1){
			url = url.substring(0, url.length - 1) + '?idSucursal='+this.authService.loggedUser.idSucursal+'&';
		}
		return this.dataService.get(url+'codigo='+filtro);
	}

	public obtenerProductosFiltroNombre(filtro){
		var url = '/api/products?';
		if(this.authService.loggedUser.rol != 1){
			url = url.substring(0, url.length - 1) + '?idSucursal='+this.authService.loggedUser.idSucursal+'&';
		}
		return this.dataService.get(url+'nombre='+filtro);
	}

	public obtenerProductosFiltroModelo(filtro){
		var url = '/api/products?';
		if(this.authService.loggedUser.rol != 1){
			url = url.substring(0, url.length - 1) + '?idSucursal='+this.authService.loggedUser.idSucursal+'&';
		}
		return this.dataService.get(url+'modelo='+filtro);
	}

	public agregarProducto(producto:Producto){
		return this.dataService.post('/api/products',{'product':producto});
	}

	public borrarProducto(producto:Producto){
		return this.dataService.delete('/api/products/'+producto._id);
	}

	public editarProducto(producto:Producto){
		return this.dataService.put('/api/products/'+producto._id,{'product':producto});
	}
}
