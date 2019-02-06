import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { TokenService } from './token.service';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private Token: TokenService) { }


	private loggedIn = new BehaviorSubject<boolean>( this.Token.loggedIn() );

	public authStatus = this.loggedIn.asObservable();


	/**
	* Atribui ao {user} o valor do parametro user
	*
	* @author Adão Dias
	* @param { object } user - valor que recebe do banco de dados quando acaba de fazer login.
	**/
	user(user)
	{
		this.loggedIn.next(user);
	}

	
	setUserInfo(userInfo)
	{
		localStorage.setItem('user', JSON.stringify(userInfo));
	}	

	getUserInfo()
	{
		return JSON.parse( localStorage.getItem('user') );
	}
}
