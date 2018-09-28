import { Component, OnInit, TemplateRef } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';

import { Usuario } from '../models/usuario';
import { AuthService } from '../services/auth.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

	public errorDisplay:string = 'Por favor revise la información proporcionada.';
	public cedula : number;
	public clave: string = '';
  public triedLogin : boolean = false;
  public sub:Subscription;
  modalRef: BsModalRef;

  constructor(public authService:AuthService,private modalService: BsModalService) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  salir(){
  	this.authService.logout();
  }

  login(){
  	var user = new Usuario();
  	user.cedula = this.cedula;
  	user.clave = this.clave;
  	this.authService.login(user);
    this.triedLogin = true;
    this.sub = this.authService.loggedSub
                .asObservable()
                .subscribe(logged => { 
                  this.modalRef.hide(); 
                  this.triedLogin = false;

    });
  }

}
