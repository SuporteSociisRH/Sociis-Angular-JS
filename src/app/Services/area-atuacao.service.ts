import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_API } from '../sociis.api';
import { Observable } from 'rxjs';

//services
import { TokenService } from '../Services/token.service';
// Interfaces
import { CadastroHttpResponse } from '../interfaces/cadastroHttpResponse';
@Injectable({
	providedIn: 'root'
})
export class AreaAtuacaoService {

	constructor(
		private http: HttpClient
		,private Token: TokenService
		) { }


	/**
	* Cadastra a área de atuação no banco de dados.
	*
	* @author Adão Dias
	* @param { ngModel } area - Dados de cadastro para área de atuação.
	* @return
	*
	**/
	cadastrar( area )
	{
		return this.http.post<CadastroHttpResponse>(`${BASE_API}/area-atuacao/novo?token=${this.Token.get()}`, area.value);
	}


	/**
	* Callback quando o registro for adicionado
	*
	* @author Adão Dias
	* @param { FormBuilder } area - Dados de cadastro para área de atuação.
	*
	**/
	registroAdicionado() {}

	/**
	* Busca a lista de todos as Áreas de atuação cadastradas no banco.
	*
	* @author Adão Dias
	*
	**/
	buscaTodosAreaAtuacao()
	{
		return this.http.get<CadastroHttpResponse>(`${BASE_API}/area-atuacao/lista?token=${this.Token.get()}`);
	}

	/**
	* Remove a area de atuação
	*
	* @author Adão Dias
	*
	**/
	remover(id:number)
	{
		return this.http.get<CadastroHttpResponse>(`${BASE_API}/area-atuacao/remover/${id}?token=${this.Token.get()}`);
	}

}
