import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { RegistraClienteForm } from '../Interfaces/registra-form';
import { TokenService } from '../Services/token.service';

import { LoginForm } from '../Interfaces/login-form';
import { Router} from '@angular/router';

@Component({
	selector: 'sc-registrar-cliente',
	templateUrl: './registrar-cliente.component.html',
	styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit {

	public registerError = {name:"", email:"", password:""};

	public submitted = false;

	public correctly = false;
	
	public loading = false;

	public user: RegistraClienteForm = { name : '', email: '', password: '', password_confirmation: '' };

	constructor(
		private Auth: AuthService,
		private Token: TokenService,
		private route:  Router) { }

	ngOnInit() {}

	handleError( error ) 
	{
		this.registerError = error.error.errors;
	}

	handleResponse( data ) {
		
		this.correctly = true;
	
		this.Token.handle(data.access_token);
	}

	onSubmit() 
	{
		this.loading = true;

		this.submitted = true;

		return this.Auth.signUp(this.user).subscribe(
			data  => {
				this.loading = false;

				this.handleResponse( data )
			},
			error => {

				this.loading = false;

				this.handleError( error )
			}
		);
	}

}
