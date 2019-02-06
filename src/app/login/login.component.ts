import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { TokenService } from '../Services/token.service';
import { AuthHandleService } from '../Services/auth-handle.service';
import { UserService } from '../Services/user.service';
import { LoginForm } from '../Interfaces/login-form';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'sc-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public authError = null;

	public loading = false;

	public user: LoginForm = { email: '', password: '' };

	public redirect = null;

	constructor(
		private Auth: AuthService,
		private Token: TokenService,
		private route:  Router,
		private authHandler: AuthHandleService,
		private userService: UserService,
		private router: ActivatedRoute 
	) { 


		this.redirect = this.router.snapshot.queryParamMap.get("redirect");
	}

	ngOnInit() {}


	handleError(error) {
		this.authError = error.error.error;
	}

	handleResponse( data ) : void
	{
	
		this.Token.handle(data.access_token);

		this.userService.setUserInfo(data.user.original);

		this.authHandler.changeAuthStatus(true);

		this.userService.user(data.user.original);

		// Até aqui o login está ok!. verificamos se existe o parametro redirect que seja válido para fazer o redirect diretamente.

		if( this.redirect != null)
			this.route.navigateByUrl( this.redirect );
		else
			this.route.navigateByUrl('/dashboard');

	}

	onSubmit() : void
	{

		this.loading = true;

		this.Auth.login( this.user ).subscribe(
			data  => {

				this.loading = false;

				this.handleResponse(data);
			},
			error =>
			{
				this.loading = false;

				this.handleError( error )
			}
		);
	}

}
