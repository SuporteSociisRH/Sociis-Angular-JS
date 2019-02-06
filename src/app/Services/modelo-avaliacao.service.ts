import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_API } from '../sociis.api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//services
import { TokenService } from '../Services/token.service';
// Interfaces
import { CadastroHttpResponse } from '../interfaces/cadastroHttpResponse';
@Injectable({
  providedIn: 'root'
})
export class ModeloAvaliacaoService {

  constructor(
    private http: HttpClient,
    private Token: TokenService
  ) { }

    /**
    * Busca todos os tipos de modelos de avaliação (90? 180? 360?)
    *
    * @author Adão Dias
    *
    **/
    buscaModelosAvaliacao()
    {
      return this.http.get<CadastroHttpResponse>(`${BASE_API}/modelos-avaliacao?token=${this.Token.get()}`);
    }

 }


