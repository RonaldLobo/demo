import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { DataService } from './data.service';
import { UsuariosService } from './usuarios.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Usuario } from '../models/usuario';
import { Empresa } from '../models/empresa';

@Injectable()
export class AuthService {

	public loggedUser : Usuario = new Usuario();
	public loggedEmpresa : Empresa = new Empresa();
	public isLogged : boolean = false;
	public token : string = '';
	public loggedSub = new Subject<any>();

	constructor(
		public requestOptions:RequestOptions, 
		public dataService:DataService,
		public usuariosService: UsuariosService,
		public loginService:LoginService,
		private router:Router){
		requestOptions.headers.set('Content-type', 'application/json');
		this.readFromStore();
	}

	login(usuario){
		this.loginService.loggearUsuario(usuario)
		.then(success => {
			console.log(success);
			if(success.token != ''){
				this.loggedUser = success.user;
				this.loggedEmpresa = success.empresa;
				this.token = success.token;
				this.isLogged = true;
				this.requestOptions.headers.set('authorization', 'Bearer '+success.token);
				this.store();
				this.router.navigate(['/ventas']);
				this.loggedSub.next();
			}
		}, fail => {

		})
	}

	logout(){
		this.isLogged = false;
		localStorage.removeItem('userLogged');
		localStorage.removeItem('userEmpresa');
		localStorage.removeItem('token');
	}

	store(){
		localStorage.setItem('userLogged', JSON.stringify(this.loggedUser));
		localStorage.setItem('userEmpresa', JSON.stringify(this.loggedEmpresa));
		localStorage.setItem('token', this.token);
	}

	readFromStore(){
		this.token = localStorage.getItem('token');
		if(this.token && this.token != '' && this.token != undefined){
			this.requestOptions.headers.set('authorization', 'Bearer '+this.token);
			this.loggedUser = JSON.parse(localStorage.getItem('userLogged'));
			this.loggedEmpresa = JSON.parse(localStorage.getItem('userEmpresa'));
			this.isLogged = true;
		}
	}

}