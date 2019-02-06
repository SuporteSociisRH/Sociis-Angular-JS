import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_API } from '../sociis.api';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
//services
import { TokenService } from '../Services/token.service';
import { CadastroHttpResponse } from '../interfaces/cadastroHttpResponse';
@Injectable({
  providedIn: 'root'
})
export class DiretrizService {

  constructor(
    private http: HttpClient,
    private Token: TokenService
  ) { }


	/**
	* Adiciona Diretriz no banco de dados.
  *
  * @param { FormGroup } listaDiretrizes -  Dados de cadastro da diretriz.
  * @param { number } number -  id da empresa
	* @author Adão Dias
	*
	**/
  adicionarDiretriz(listaDiretrizes: FormGroup, empresa_id: number)
  {
    return this.http.post<CadastroHttpResponse>(`${BASE_API}/diretriz/adicionar?token=${this.Token.get()}`, {'lista_diretrizes': listaDiretrizes.value, 'empresa_id': empresa_id} );
  }

	/**
	 * Busca de cargos associados a empresa
	 *
	 * @author Adão Dias
	 * @param { number } diretriz_id - id da diretriz
	 **/
  removeDiretriz(diretriz_id: number)
  {
    return this.http.get<CadastroHttpResponse>(`${BASE_API}/diretriz/remover/${diretriz_id}?token=${this.Token.get()}`);
  }
}
