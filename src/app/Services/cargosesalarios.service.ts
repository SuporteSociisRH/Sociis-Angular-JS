import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BASE_API } from '../sociis.api';

// Services
import { TokenService } from '../Services/token.service';
// Interface
import { CadastroHttpResponse } from '../interfaces/cadastroHttpResponse';

@Injectable({
  providedIn: 'root'
})
export class CargosesalariosService {

  constructor(private Token: TokenService, private formBuilder: FormBuilder, private http: HttpClient) { }

	/**
  * Salva um novo Fator no banco de dados
  *
	* @author Adão Dias
  * @param <FormGroup> fator - Fator a ser salvo para empresa.
	**/
  salvarFator(fator: FormGroup) {
    return this.http.post<CadastroHttpResponse>(`${BASE_API}/fator/novo?token=${this.Token.get()}`, fator.value);
  }


	/**
	* Adiciona um novo grau ao array de graus de um determinado fator.
    * Sempre que adicionado, ele verifica o ultimo item da lista. recalcula toda a lista para ficar sempre
    * dinâmico e correto os valores.
    *
	* @author Adão Dias
	*
	**/
  adicionarGrau(fator: FormGroup) {

    // Busca o array de graus deste fator.
    var listaGraus = fator.get('grau') as FormArray;

    // Resetamos o ultimo Grau pois está entrando um novo grau na lista.
    let resetaValorUltimoGrau = listaGraus.length >= 1 ? true : false;

    let valorGrau = resetaValorUltimoGrau === true ? listaGraus.at(0).get('valor').value * 10 : 0;

    // Valida apenas o primeiro Grau como editavel. todos os demais serão bloqueados por padrão.
    let desativarGrau = listaGraus.length > 0 ? true : false;

    let novoGrau: FormGroup = this.formBuilder.group({
      identificador: ['', Validators.required],
      valor: [{ value: valorGrau, disabled: false }, Validators.required],
      descricao: ['', Validators.required]
    });

    /**
      * Por padrão, todas as vezes que o cliente mudar o valor do primeiro grau, então automaticamente teremos que
      * fazer os calculos para apresentar novos dados a ele. portanto faremos uma escuta apenas no primeiro grau
      * uma vez que é o único a ser modificado pelo usuário.
    **/
    if (desativarGrau == false) {
      novoGrau.get('valor').valueChanges.subscribe(valorGrau => {
        this.preencheValorUltimoGrau(fator, valorGrau);
      });
    }

    listaGraus.push(novoGrau);

    this.resetaValorUltimoGrau(listaGraus);
  }

	/**
	* Remove o grau do fator
	*
	* @author Adão Dias
	* @param { FormControl } grau - o grau em específico que será removido
	* @param { number} i  - o indice do grau no array
	**/
  removerGrau(grau: FormControl, i: number) {

    var parent = grau.parent.parent.get('grau') as FormArray;

    parent.removeAt(i);

    // Caso ele remove o ultimo grau do fator, então não há porque fazer cáculo de grau.
    if (parent.length > 1)
      this.calculaGrausMedianos(parent);
  }

	/**
	* Após usuário preencher o primeiro grau, automáticamente todos os outros são preenchidos
	*
    * @author Adão Dias
	**/
  preencheValorUltimoGrau(fator: FormGroup, valor: number) {

    let listaGraus = fator.get('grau') as FormArray;

    let qtdaListaGraus = listaGraus.length - 1;

    if (qtdaListaGraus >= 1) {

      this.calculaGrausMedianos(listaGraus);

      listaGraus.at(qtdaListaGraus).patchValue({
        valor: valor * 10
      });

    }
  }

	/**
	* Reseta o ultimo grau e adiciona um novo grau já com o valor atualizado baseando-se no primeiro grau.
	*
	* @author Adão Dias
    **/
  resetaValorUltimoGrau(listaGraus: FormArray) {
    listaGraus.at(listaGraus.length - 1).patchValue({ valor: 0 });

    this.calculaGrausMedianos(listaGraus);
  }

  /**
   * Graus Medianos são aqueles que ficam entre o primeiro grau e o ultimo.
   * Graus medianos são compostos por uma equação onde se subtrai o ultimo grau pelo primeiro dividindo o
   * resultado pela quantidade de graus - 1. sendo assim a fórmula final seria:
   * grau = (grauFinal - grauInicial) / qtdaGrau - 1
   */
  calculaGrausMedianos(listaGraus: FormArray) {

    let valorPrimeiroItem = listaGraus.at(0).get('valor').value;

    let valorUltimoItem = valorPrimeiroItem * 10;

    let valorGrauMediano = (valorUltimoItem - valorPrimeiroItem) / (listaGraus.length - 1);

    let indice = 0;

    listaGraus.value.forEach(element => {

      if (indice > 0 && indice <= listaGraus.length - 1) {
        let i = indice - 1;

        let valorGrauAnterior = listaGraus.at(i).get('valor').value;

        listaGraus.at(indice).patchValue({ valor: valorGrauAnterior + valorGrauMediano });

      }

      indice++;

    });
  }

	/**
	* Busca no banco de dados todos os fatores salvos no banco
	*
	* @author Adão Dias
    **/
  buscaListaFatores() {
    return this.http.get<CadastroHttpResponse>(`${BASE_API}/fator/lista?token=${this.Token.get()}`);
  }

	/**
	* Remove o fator
	*
	* @author Adão Dias
	* @param { number } fatorId - o fator em específico que será removido
	* @param { number } empresaId  - Id da empresa a qual está associada ao id do fator.
	**/
  removeFator(fatorId: number, empresaId: number) {
    return this.http.post<CadastroHttpResponse>(`${BASE_API}/fator/removerFatorDaEmpresa?token=${this.Token.get()}`, { 'empresa_id': empresaId, 'fator_id': fatorId });
  }

	/**
	* salva o fator no banco de dados
	*
	* @author Adão Dias
	* @param { number } empresaId - id da empresa associada ao fator
	* @param { FormGroup } f  - o fator
	**/
  salvarListaFatoresIndividual(empresaId: number, f)
  {
    return this.http.post<CadastroHttpResponse>(`${BASE_API}/fator/salvarFatoresIndividual?token=${this.Token.get()}`, { 'empresa_id': empresaId, 'fatores': f.value });
  }

  /**
* Busca os fatores registrados para essa empresa caso exista algum.
*
* @author Adão Dias
* @param { number } empresaId - id da empresa associada ao fator
**/
  buscarFatorPorId(idEmpresa: number) {
    return this.http.get<CadastroHttpResponse>(`${BASE_API}/fator/buscaFatorById/${idEmpresa}?token=${this.Token.get()}`);
  }

  /**
* Ordena a lista de fatores pela quantidade de graus de cada fator. Ordem decrescente
*
* @author Adão Dias
* @param { array } fatores - lista de fatores da empresa
  **/
  ordenarFatoresPorQuantidadeGrausDecrescente( fatores ) {


    let fatoresOrdenados = fatores.sort((a, b) => {
      return b.grau.graus.length - a.grau.graus.length;
    });

    return fatoresOrdenados;
  }



}
