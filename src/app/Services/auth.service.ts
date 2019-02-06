import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API } from '../sociis.api';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor( private http: HttpClient ) { }


	/**
	* Envia ao servidor uma requisição para login.
	*
	* @author Adão Dias
	*
	**/
	login( data ) {
		return this.http.post(`${BASE_API}/login`, data);
	}


	/**
	* Envia a requisição para cadastrar no banco um novo usuário.
	*
	* @author Adão Dias
	*
	**/
	signUp( data ) {
		return this.http.post(`${BASE_API}/signup`, data);
	}
}
