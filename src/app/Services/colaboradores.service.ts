import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_API } from '../sociis.api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


//services
import { TokenService } from '../Services/token.service';

import { CadastroHttpResponse } from '../interfaces/cadastroHttpResponse';
import { NgForm } from '@angular/forms';
@Injectable({
	providedIn: 'root'
})
export class ColaboradoresService {

	constructor(private http: HttpClient, private Token: TokenService) { }


	/**
	* Salva a imagem do usuário no servidor.
	*
	* @author Adão Dias
	*
	**/
	salvarImagem(imagem)
	{
		return this.http.post(`${BASE_API}/colaborador/salvaImagem?token=${this.Token.get()}`, imagem);
	}

	/**
	* Salva um novo colaborador no banco de dados.
	*
	* @author Adão Dias
	*
	**/
	salvarColaborador( colaborador )
	{
		return this.http.post<CadastroHttpResponse>(`${BASE_API}/colaborador/novo?token=${this.Token.get()}`, colaborador)
	}

	/**
	* Realiza controle de erro nas requisições.
	*
	* @author Adão Dias
	*
	**/
	handleError(erro)
	{
		console.log(erro);
	}

	/**
	* Busca a lista de todos os colaboradores no banco de dados
	*
	* @author Adão Dias
	*
	**/
	buscaColaboradores()
	{
		return this.http.get(`${BASE_API}/colaborador/lista?token=${this.Token.get()}`);
	}

	/**
	* Busca colaboradores por id da empresa
	*
	* @author Adão Dias
	* @param {number} empresaId : id da empresa
	*
	**/
	buscaColaboradoresPorEmpresaId(empresaId: number)
	{
		return this.http.get<CadastroHttpResponse>(`${BASE_API}/colaborador/empresa/${empresaId}lista?token=${this.Token.get()}`)
	}

	/**
	* Remove uma em
	* @author Adão Dias
	* @param {number} empresaId - recebe o id da empresa
	*
	**/
	remover(id: number)
	{
		return this.http.get<CadastroHttpResponse>(`${BASE_API}/colaborador/remover/${id}?token=${this.Token.get()}` );
	}

	/**
	* Busca Informações do colaborador pelo seu ID
	* @author Adão Dias
	* @param {number} colaborador_id - ID DO COLABORADOR
	*
	**/
	buscarColaboradorPorId(colaborador_id: number)
	{
		return this.http.get<CadastroHttpResponse>(`${BASE_API}/colaborador/buscar/${colaborador_id}?token=${this.Token.get()}` );
	}

	/**
	* Busca todas as informações relevantes para montar o formulário de avaliação de desempenho.
	* @author Adão Dias
	* @param { number } cargo_id - id do cargo do colaborador
	* @param { number } empresa_id - id da empresa do colaborador.
	**/
	buscaDadosParaAvaliacao(cargo_id, empresa_id)
	{
		return this.http.post<CadastroHttpResponse>(`${BASE_API}/dadosParaAvaliacao?token=${this.Token.get()}`, {empresa_id: empresa_id, cargo_id: cargo_id})
	}

	/**
	* Busca as avaliações pendentes para aquele colaborador.
	* @author Adão Dias
	* @param { number } cargo_id - id do colaborador 
	**/
	buscarAvaliacoesPendentes(avaliador_id: number)
	{
		return this.http.get<CadastroHttpResponse>(`${BASE_API}/colaborador/avaliacoesPendentes/${avaliador_id}?token=${this.Token.get()}`);
	}

	/**
	* Busca as avaliações pendentes para aquele colaborador baseado no GUID.
	* @author Adão Dias
	* @param { string } guid - guid da avaliação pendente
	**/
	buscaAvaliacoesPendentesPorGUID(guid: string)
	{
		return this.http.get<CadastroHttpResponse>(`${BASE_API}/colaborador/avaliacoesPendentesPorGUID/${guid}?token=${this.Token.get()}` );
	}

	/**
	* Busca as competencias do colaborador
	* @author Adão Dias
	* @param { number } cargo_id - Id do cargo do colaborador.
	* @param { number } empresa_id - id da empresa que o colaborador trabalha.
	**/
	buscaCompetenciaColaborador(cargo_id, empresa_id)
	{
		return this.http.post<CadastroHttpResponse>(`${BASE_API}/colaborador/competencias?token=${this.Token.get()}`, {empresa_id: empresa_id, cargo_id: cargo_id});
	}

	/**	
	 * Envia para o banco a resposta do seu exame de Avaliação de desempenho
	 * @param { NgForm } resposta - respostas que o usuário preencheu no formulário
	 * @param { Object } user - dados do usuário.
	 */
	enviaRespostaExame(resposta: NgForm, user)
	{
		return this.http.post<CadastroHttpResponse>(`${BASE_API}/colaborador/responderAvaliacao?token=${this.Token.get()}`, { respostas: resposta.value, user: user });
	}

	/**	
	 * Envia para o banco a resposta do seu exame de Avaliação de desempenho
	 * @param { number } avaliador_id - id do colaborador que avaliou o exame.
	 */
	buscarAvaliacoesRealizadas(avaliador_id: number)
	{
		return this.http.get<CadastroHttpResponse>(`${BASE_API}/colaborador/avaliacoesRealisadas/${avaliador_id}?token=${this.Token.get()}`);
	}
}
