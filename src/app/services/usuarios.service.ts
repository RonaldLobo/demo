import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { DataService } from '../services/data.service';

@Injectable()
export class UsuariosService {	
	constructor(private dataService:DataService) { }

	public obtenerUsuarios(){
		return this.dataService.get('/api/users');
	}

	public agregarUsuario(usuario:Usuario){
		console.log('usuario');
		return this.dataService.post('/api/users',{'user':usuario});
	}

	public borrarUsuario(usuario:Usuario){
		return this.dataService.delete('/api/users/'+usuario._id);
	}

	public editarUsuario(usuario:Usuario){
		return this.dataService.put('/api/users/'+usuario._id,{'user':usuario});
	}
}
