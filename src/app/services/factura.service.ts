import { Injectable } from '@angular/core';
import { Factura } from '../models/factura';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class FacturaService {
	
	constructor(private dataService:DataService, private authService:AuthService) { }

	public obtenerFacturas(){
		var url = '/api/productbill';
		if(this.authService.loggedUser.rol != 1){
			url = url + '?idSucursal='+this.authService.loggedUser.idSucursal;
		}
		return this.dataService.get(url);
	}

	public obtenerFacturasId(id){
		return this.dataService.get('/api/productbill/'+id);
	}

	public obtenerFacturasFiltroCodigo(filtro){
		var url = '/api/productbill?';
		if(this.authService.loggedUser.rol != 1){
			url = url.substring(0, url.length - 1) + '?idSucursal='+this.authService.loggedUser.idSucursal+'&';
		}
		return this.dataService.get(url+'codigo='+filtro);
	}

	public obtenerFacturasFiltroNombre(filtro){
		var url = '/api/productbill?';
		if(this.authService.loggedUser.rol != 1){
			url = url.substring(0, url.length - 1) + '?idSucursal='+this.authService.loggedUser.idSucursal+'&';
		}
		return this.dataService.get(url+'nombre='+filtro);
	}

	public obtenerFacturasFiltroNombreVendedor(filtro){
		var url = '/api/productbill?';
		if(this.authService.loggedUser.rol != 1){
			url = url.substring(0, url.length - 1) + '?idSucursal='+this.authService.loggedUser.idSucursal+'&';
		}
		return this.dataService.get(url+'nombreven='+filtro);
	}

	public agregarFactura(factura:Factura){
		return this.dataService.post('/api/productbill',{'productBill':factura});
	}

	public borrarFactura(factura:Factura){
		return this.dataService.delete('/api/productbill/'+factura._id);
	}

	public editarFactura(factura:Factura){
		return this.dataService.put('/api/productbill/'+factura._id,{'productBill':factura});
	}
	public getCountBillMonth(){
		return this.dataService.get('/api/productbill?nomreporte=ReportCountBillMonth');
		//return this.dataService.get('/api/productbill');
	}
}
