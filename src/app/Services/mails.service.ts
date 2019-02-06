import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_API } from '../sociis.api';
import { TokenService } from '../Services/token.service';
@Injectable({
	providedIn: 'root'
})
export class MailsService {

	constructor(private http: HttpClient, private Token: TokenService) { }

	/** 
	 * Envia para colaborador o E-mail avisando que está liberado para ele fazer sua Avaliação de Desempenho
	 * @param {number} colaborador_id - id do colaborador que receberá a notícia de liberação de avaliação de desempenho.
	*/
	enviaEmailAvaliacaoDesempenho(colaborador_id: number) {
		return this.http.get(`${BASE_API}/emails/enviaEmailAvaliacaoDesempenho/${colaborador_id}?token=${this.Token.get()}`)
	}
}
