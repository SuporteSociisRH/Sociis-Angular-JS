import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
// Interfaces
import { Cargos } from '../../../Interfaces/cargos';

// Services
import { TokenService } from '../../../Services/token.service';
import { CargoService } from '../../../Services/cargo.service';
@Component({
	selector: 'sc-criar-cargo',
	templateUrl: './criar-cargo.component.html',
	styleUrls: ['./criar-cargo.component.css']
})
export class CriarCargoComponent implements OnInit {

	loading = false;

	resultado = null;

    public cargoForm = this.formBuilder.group({
		nome : ["", Validators.required],
		cbo  : ["", Validators.required]
    });



	constructor(
		 private formBuilder: FormBuilder
		,private http: HttpClient
		,private Token: TokenService
		,private cargoService: CargoService
	) { }


	ngOnInit() {
	}

	cadastrarCargos() 
	{

		this.loading = true;

		this.cargoService.cadastraCargo(this.cargoForm).subscribe(
			response => {

				this.loading = false;

				this.resultado = response.success;

				this.cargoForm.reset();
			},
			error =>
			{
				this.loading = false;

				this.resultado = false;
			}
		);
	}

	registroAdicionado(data) {
		alert('adicionado com sucesso!');
	}

	handlerError(error) {
		console.log(error);
	}

}
