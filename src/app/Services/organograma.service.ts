import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { BASE_API } from '../sociis.api';
import { Observable } from 'rxjs';
/** 
	services 
**/
import { TokenService } from '../Services/token.service';
import { CadastroHttpResponse } from '../interfaces/cadastroHttpResponse';

@Injectable({
	providedIn: 'root'
})
export class OrganogramaService {

	constructor(private builder: FormBuilder, private http: HttpClient, private Token: TokenService) { }

	/**
	* Busca o organograma da empresa com id passado por parametro.
	*
	* @author Adão Dias
	* @param {number} empresaId - id da empresa
	* @return {Observable} Organograma da empresa se existir.
	**/
	buscaOrganogramaPorEmpresaId(empresaId) {
		return this.http.get<CadastroHttpResponse>(`${BASE_API}/buscaOrganogramaPorId/${empresaId}?token=${this.Token.get()}`);
	}

	/**
	* Remove um colaborador do organograma
	*
	* @author Adão Dias
	*
	**/
	removerColaborador(colaboradorForm: FormGroup, i: number) {
		var parent = colaboradorForm.parent.parent.get('subordinados') as FormArray;

		parent.removeAt(i);
	}

	/**
	* Adiciona um colaborador no organograma
	*
	* @author Adão Dias
	*
	**/
	adicionarColaborador(colaborador: FormGroup) {

		const arrColaborador = new FormArray([]);

		var subordinados = colaborador.get('subordinados') as FormArray;

		const sub = this.builder.group({
			id: [null, Validators.required],
			nome: ['Novo Colaborador', Validators.required],
			cargo: ['Cargo', Validators.required],
			empresa: [null, Validators.required],
			cargo_id: [null, Validators.required],
			empresa_id: [null, Validators.required],
			imagem: new FormControl('user-image-default'),
			subordinados: new FormArray([])
		});

		subordinados.push(sub);
	}

	/**
	* Salva o organograma ao banco de dados.
	*
	* @author Adão Dias
	* @param {number} - empresaId - id da empresa a qual será associada ao organograma.
	* @param {JSON} organograma - a estrutura do organograma em formato json.
	**/
	salvarOrganograma(empresaId: number, organograma: Object) {
		return this.http.post<CadastroHttpResponse>(`${BASE_API}/salvarOrganograma?token=${this.Token.get()}`, { 'empresa_id': empresaId, 'organograma': organograma });
	}
}
