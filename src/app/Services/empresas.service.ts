import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_API } from '../sociis.api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//services
import { TokenService } from '../Services/token.service';
// Interfaces
import { Empresa } from '../interfaces/empresa';
import { Diretriz } from '../Interfaces/diretriz';

import { CadastroHttpResponse } from '../interfaces/cadastroHttpResponse';

@Injectable({
	providedIn: 'root'
})
export class EmpresasService {

	constructor(
		private http: HttpClient,
		private Token: TokenService
	) { }

	/**
	* Busca a lista completa de todas as empresas
	*
	* @author Adão Dias
	*
	**/
	buscarEmpresas(): Observable<any> {
		return this.http.get<any>(`${BASE_API}/empresa/lista?token=${this.Token.get()}`)
	}

	/**
	* Cadastra a empresa
	*
	* @author Adão Dias
	* @param { FormControl } empresa - Dados da empresa para cadastrar
	* @param { Object } cargos - lista de cargos associados a empresa.
	* @param { UsuarioDoSistema }  usuarios - lista de usuários que serão associados a empresa e terão acesso ao sistema.
	* @return { Observable } resultado do cadastro.
	* @return { Diretriz } diretrizes - as Diretrizes que serão cadastradas no banco.
	*
	**/
	cadastraEmpresa(empresa, cargos, UsuarioDoSistema, diretrizes) {
		return this.http.post<CadastroHttpResponse>(`${BASE_API}/empresa/novo?token=${this.Token.get()}`, { empresa: empresa.value, cargos: cargos, usuarios: UsuarioDoSistema, diretrizes: diretrizes });
	}

	/**
	* Identifica e trata os erros de requisição Ajax.
	*
	* @author Adão Dias
	*
	**/
	handlerError(error) {
		console.log(error);
	}

	/**
	* Registro de empresa foi adicionado ao banco com sucesso.
	*
	* @author Adão Dias
	*
	**/
	registroAdicionado() { }

	/**
	* Faz uma busca relacional pelo ORM do laravel e retorna dados da empresa com associação
	* dos colaboradores / Área de atuação / Organograma
	* @author Adão Dias
	* @param {number} empresaId - recebe o id da empresa
	*
	**/
	buscaDadosEmpresa(empresaId: number) {
		return this.http.get<CadastroHttpResponse>(`${BASE_API}/empresa/${empresaId}?token=${this.Token.get()}`);
	}

	/**
	* Remove uma empresa
	* @author Adão Dias
	* @param {number} empresaId - recebe o id da empresa
	*
	**/
	remover(id: number) {
		return this.http.get<CadastroHttpResponse>(`${BASE_API}/empresa/remover/${id}?token=${this.Token.get()}`);
	}

	/**
	 * Busca de cargos associados a empresa
	 *
	 * @author Adão Dias
	 * @param { number } idEmpresa - id da empresa
	 **/
	buscaListaCargosEmpresa(idEmpresa: number) {
		return this.http.get<CadastroHttpResponse>(`${BASE_API}/empresa/lista/${idEmpresa}?token=${this.Token.get()}`);
	}

	/**
	 * Busca as diretrizes a empresa
	 *
	 * @author Adão Dias
	 * @param { number } idEmpresa - id da empresa
	 **/
	buscaDiretrizes(idEmpresa: number)
	{
		return this.http.get<CadastroHttpResponse>(`${BASE_API}/empresa/diretrizes/${idEmpresa}?token=${this.Token.get()}`);
	}

	/**
	 * Busca colaboradores da empresa
	 *
	 * @author Adão Dias
	 * @param { number } idEmpresa - id da empresa
	 **/
	buscarColaboradores(idEmpresa : number)
	{
		return this.http.post<CadastroHttpResponse>(`${BASE_API}/empresa/buscarColaboradores?token=${this.Token.get()}`, {'empresa_id': idEmpresa});
	}

}
