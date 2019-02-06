import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

// Interfaces
import { AreaAtuacao } from '../../../Interfaces/area-atuacao';

// Services
import { TokenService } from '../../../Services/token.service';
import { AreaAtuacaoService } from '../../../Services/area-atuacao.service';


@Component({
	selector: 'sc-criar-area-atuacao',
	templateUrl: './criar-area-atuacao.component.html',
	styleUrls: ['./criar-area-atuacao.component.css']
})
export class CriarAreaAtuacaoComponent implements OnInit {

	loading = false;

	submitted : boolean = false;

	resultado : boolean = null;

	public areaAtuacaoForm = this.builder.group({
		area : ['', Validators.required]
	});

	constructor(
		 private http: HttpClient
		,private Token: TokenService
		,private builder : FormBuilder
		,private areaAtuacaoService: AreaAtuacaoService) { }

	ngOnInit() {}

	cadastrarAreaAtuacao() 
	{
		this.submitted = true;

		this.loading = true;

		this.areaAtuacaoService.cadastrar( this.areaAtuacaoForm ).subscribe(
			
			response => {
				this.loading = false;

				this.resultado = response.success;

				this.areaAtuacaoForm.reset();
			}
			,error => {

				this.resultado = false;
				
				this.loading = false;
			}
		);
	}

	handlerError(error) {
		console.log(error);
	}

}
