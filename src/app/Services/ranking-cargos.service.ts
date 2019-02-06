import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_API } from '../sociis.api';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
//services
import { TokenService } from '../Services/token.service';
// Interfaces
import { CadastroHttpResponse } from '../interfaces/cadastroHttpResponse';

@Injectable({
  providedIn: 'root'
})
export class RankingCargosService {

  constructor(
    private http: HttpClient,
    private Token: TokenService
  ) { }


  /**
   * Busca no banco de dados o ranking de cargos(se existir) da empresa selecionada.
   * @author Adão Dias
   * @param {number} empresa_id - Id da empresa
   */
  buscarRanking(empresa_id: number)
  {
    return this.http.get<CadastroHttpResponse>(`${BASE_API}/empresa/ranking/${empresa_id}?token=${this.Token.get()}`);
  }

  /**
   * Salva o ranking de cargos no banco de dados.
   * @author Adão Dias
   * @param {NgForm} ranking - formulário com os dados do ranking
   *  @param {number} empresa_id - formulário com os dados do ranking
   */
  salvar(ranking: NgForm, empresa_id: number)
  {
    return this.http.post<CadastroHttpResponse>(`${BASE_API}/empresa/ranking/salvar?token=${this.Token.get()}`, {'empresa_id': empresa_id, 'ranking': ranking.value});
  }

  /**
   * Atualiza o rank toda vez que ele alterar o grau de um fator
   * @author Adão Dias
   * @param {Object} rank - formulário com os dados do ranking
   */
  atualizaRanking(rank)
  {
    return this.http.post<CadastroHttpResponse>(`${BASE_API}/empresa/ranking/atualizar?token=${this.Token.get()}`, rank);
  }

  /**
   * Salva o ranking toda vez que ele não existir
   * @author Adão Dias
   * @param {Object} rank - formulário com os dados do ranking
   */
  salvarRanking(rank)
  {
    return this.http.post<CadastroHttpResponse>(`${BASE_API}/empresa/ranking/registrar?token=${this.Token.get()}`, rank);

  }
}
