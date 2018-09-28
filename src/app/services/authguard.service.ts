import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isLogged) {
    	if(this.authService.loggedUser.rol == 1 || (state.url != '/empleados' && 
    		state.url != '/reportes' &&
    		state.url != '/contabilidad' &&
    		state.url != '/sucursales')) {
        	return true;
    	}
    }
    this.router.navigate(['/']);
    return false;
  }
}