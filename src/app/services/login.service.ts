import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { DataService } from '../services/data.service';

@Injectable()
export class LoginService {

  constructor(private dataService:DataService) { }

	public loggearUsuario(usuario:Usuario){
		return this.dataService.post('/api/login',{'user':usuario});
	}

}
