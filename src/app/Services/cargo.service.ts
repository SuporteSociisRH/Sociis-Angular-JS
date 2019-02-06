import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_API } from '../sociis.api';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
//services
import { TokenService } from '../Services/token.service';

import { CadastroHttpResponse } from '../interfaces/cadastroHttpResponse';

@Injectable({
	providedIn: 'root'
})
export class CargoService {

	constructor(
		private http: HttpClient,
		private Token: TokenService
	) { }


	/**
	* Busca no banco todos os cargos cadastrados
	*
	* @author Adão Dias
	*
	**/
	buscaCargos()
	{
		return this.http.get<CadastroHttpResponse>(`${BASE_API}/cargo/lista?token=${this.Token.get()}`);
	}

	/**
	* Salva um novo cargo no banco de dados
	*
	* @author Adão Dias
	* @param {ngModel} cargo - contem o cargo que será adicionado ao banco de dados
	*
	**/
	cadastraCargo(cargo)
	{
		return this.http.post<CadastroHttpResponse>(`${BASE_API}/cargo/novo?token= ${this.Token.get()}`, cargo.value);
	}

	/**
	* Remover cargo pelo id
	*
	* @author Adão Dias
	* @param {ngModel} cargo - contem o cargo que será adicionado ao banco de dados
	*
	**/
	remover( id: number )
	{
		return this.http.get<CadastroHttpResponse>(`${BASE_API}/cargo/remover/${id}?token=${this.Token.get()}`);
	}

  /**
	* Adiciona competência ao cargo.
	*
	* @author Adão Dias
  * @param { number } empresa_cargo_id - id do empresa_cargo
  * @param { string } competência - id da competência
	* @param { number } tipo_indicador - define o tipo de indicador (comportamental / técnico)
	*
	**/
  salvarCompetencia( empresa_cargo_id: number, competencia: string, tipo_indicador: number )
  {
    return this.http.post<CadastroHttpResponse>(`${BASE_API}/cargo/salvarCompetencia?token=${this.Token.get()}`, {'empresa_cargo_id': empresa_cargo_id, 'competencia': competencia, 'tipo_indicador': tipo_indicador});
  }

  /**
	* Remover cargo pelo id
	*
	* @author Adão Dias
  * @param {number} id_competencias - id competencia
	*
	**/
  removerCompetencia(id_competencias: [])
  {
    return this.http.post<CadastroHttpResponse>(`${BASE_API}/competencia/remover?token=${this.Token.get()}`, {'lista_competencias': id_competencias});
  }

  /**
	* Buscar Cargos por empresa
	*
	* @author Adão Dias
  * @param {number} empresa_id - id empresa
	*
	**/
  buscarCargosPorEmpresaId(empresa_id: number)
  {
    return this.http.post<CadastroHttpResponse>(`${BASE_API}/cargo/buscarCargoPorEmpresaId/?token=${this.Token.get()}`, {'empresa_id': empresa_id});
  }

}
