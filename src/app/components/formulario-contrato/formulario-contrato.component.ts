import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export interface enderecoCorreiros {
	bairro: string
	cep: string
	complemento:string
	gia: string
	ibge: string
	localidade: string
	logradouro: string
	uf: string
	unidade: string
	erro
}


@Injectable({
	providedIn: 'root'
})
@Component({
	selector: 'sc-formulario-contrato',
	templateUrl: './formulario-contrato.component.html',
	styleUrls: ['./formulario-contrato.component.css']
})
export class FormularioContratoComponent implements OnInit {

	public isLinear = false;
	public cepEmpresa : any;

	public dadosDoResponsavelLegal = new FormGroup({
		nomeCompleto : new FormControl('', Validators.required)
		,dataAniversario: new FormControl('', Validators.required)
		,cargo: new FormControl('', Validators.required)
	});

	public responsavelFormulario = new FormGroup({
		responsavelPeloPreenchimentoDoFormulario: new FormControl('', Validators.required)
		,cargoDoResponsavel : new FormControl('', Validators.required)
	});

	public dadosDaEmpresa =  new FormGroup({
		 cnpj: new FormControl('', Validators.required)
		, inscricaoEstadual: new FormControl('')
		, inscricaoMunicipal: new FormControl('')
		, razaoSocial: new FormControl('', Validators.required)
		, nomeFantasia: new FormControl('', Validators.required)
		, telefoneFixo: new FormControl('', Validators.required)
		, emailContato: new FormControl('', [Validators.required, Validators.email])
		, enderecoEmpresa: new FormControl('', Validators.required)
		, bairro: new FormControl('', Validators.required)
		, cidade: new FormControl('', Validators.required)
		, estado: new FormControl('', Validators.required)
		, cep: new FormControl('', Validators.required)
	})

	public dadosFiscais = new FormGroup({
		 emailNotaFiscal: new FormControl('', [Validators.required, Validators.email])
		, ISS: new FormControl('', Validators.required)
		, simplesNacional: new FormControl('', Validators.required)
	});

	public dadosResponsavelLegal =  new FormGroup({
		  nomeCompleto: new FormControl('', Validators.required)
		, dataNascimento: new FormControl('')
		, cargo: new FormControl('', Validators.required)
	})

	constructor(private http: HttpClient, private fb: FormBuilder) {}

	ngOnInit() {}

	buscaEndereco()
	{
		this.http.get<enderecoCorreiros>(`http://viacep.com.br/ws/${this.cepEmpresa}/json/`).subscribe(
			endereco => {
				this.dadosDaEmpresa.patchValue({
					enderecoEmpresa: endereco.logradouro,
					bairro: endereco.bairro,
					cidade: endereco.localidade,
					estado: endereco.uf
				})
			}
		);

	}
}


