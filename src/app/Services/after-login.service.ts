import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { UserService } from '../Services/user.service';

@Injectable({
	providedIn: 'root'
})
export class AfterLoginService implements CanActivate {

	constructor(private router: Router, private user: UserService, private Token: TokenService) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

		let user = this.user.getUserInfo();

		if ( this.Token.loggedIn() ) {
			
			if ( route.data.role && ( route.data.role.indexOf(user.role_id) === -1 ) ) {
				
				console.warn('Usuário não tem permissão para acessar!');
				// role not authorised so redirect to home page
				this.router.navigate(['/contrato-cliente']);

				return false;
			}

			return true;
		}


		// not logged in so redirect to login page with the return url
		this.router.navigate(['/acesso'], { queryParams: { returnUrl: state.url } });
		return false;
	}
}
