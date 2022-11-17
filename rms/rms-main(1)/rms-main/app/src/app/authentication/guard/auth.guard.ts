import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Clase que contiene los metodos para gestionar el login de usuario.
 *
 * @author J. Alvaro Mamani <jmamani@aps.gob.bo>
 */
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router,
        private authenticationService: AuthenticationService,
        private authorizationService: AuthorizationService/*,
        private notifier: NotifierService*/) {}

    //canActivate() {
    //    if (this.authenticationService.isLoggedIn()) {
    //        // console.log('en teoria esta logueado');
    //        console.log("Roles",this.authenticationService.GetRoles);
    //        return true;
    //    }
    //    console.log('error', 'Ingrese su nombre de usuario y password');
    //    this.router.navigate(['authentication/login']);
    //    return false;
    //}


 canActivate() {
  if (this.authenticationService.isLoggedIn()) {
      // console.log('en teoria esta logueado');
      console.log("Roles asignados");
      let roles=this.authenticationService.GetRoles();
      console.log(roles);

      return true;
  }

  console.log('error', 'Ingrese su nombre de usuario y password');
  this.router.navigate(['authentication/login']);
  return false;
}
//https://jasonwatmore.com/post/2020/09/09/angular-10-role-based-authorization-tutorial-with-example
/*     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('inside canActivate');
        if (this.authenticationService.isLoggedIn()) {
            // check if route is restricted by role
            let roles = this.authenticationService.GetRoles();

            console.log('roles', roles);
            console.log('route.data.roles', route.data.roles);

            //if (route.data.roles && route.data.roles.indexOf(roles) === -1) {
            //let x = route.data.roles.some(ai => roles.includes(ai));
            //console.log('x', x);
            if (route.data.roles && roles && !route.data.roles.some(ai => roles.includes(ai))) {
                console.log('role not authorised so redirect to home page');
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
 */
    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const allowedRoles = next.data.allowedRoles;
        const isAuthorized = this.authorizationService.isAuthorized(allowedRoles);

        if (!isAuthorized) {
            //this.notifier.notify('error', 'No tiene permisos en la anterior página');
            console.log('error', 'No tiene permisos en la anterior página');
            this.router.navigate(['authentication/login']);
        }

        return isAuthorized;
    }
}
