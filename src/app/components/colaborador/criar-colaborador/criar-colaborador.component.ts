import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import {} from "@angular/core";

// Interfaces
import { Colaborador } from '../../../Interfaces/colaborador';


// Services
import { EmpresasService } from '../../../Services/empresas.service';
import { CargoService } from '../../../Services/cargo.service';
import { ColaboradoresService } from '../../../Services/colaboradores.service';

@Component({
	selector: 'sc-criar-colaborador',
	templateUrl: './criar-colaborador.component.html',
	styleUrls: ['./criar-colaborador.component.css']
})




export class CriarColaboradorComponent implements OnInit {

	public path = this._sanitizer.bypassSecurityTrustStyle('url(assets/dist/img/user-image-default.jpg)');
	public imagemFile: File;
	public empresaOptions : any;
	public cargoOptions : any;
	public loading = false;
	public resultado = null;
	public imagemColaboradorFile: File;

	public existeColaborador : boolean = true;

	public colaboradorForm = this.formBuilder.group({
		nome: ['', Validators.required]
		,empresa: ['', Validators.required]
		,cargo: ['', Validators.required]
		,gestor: [{value: '', disabled: this.existeColaborador}]
	});

	// Armazena o id a empresa que foi selecionada no select de empresas
	public empresa_selecionada : number = null;
	// Armazena a lista de funcionários que serão setados como encarregados
	public lista_colaboradores_gestores = [];

	constructor(
		private _sanitizer: DomSanitizer
		,private formBuilder: FormBuilder
		,private empresaService: EmpresasService
		,private cargoService: CargoService
		,private colaboradorService: ColaboradoresService
		) { }

	ngOnInit()
	{
		/** buscamos todas as empresas cadastradas no banco de dados **/
		this.empresaService.buscarEmpresas().subscribe(
			response =>
			{
				this.empresaOptions = response;
			}
			);

		/** buscamos todas os cargos cadastrados no banco de dados **/
		this.cargoService.buscaCargos().subscribe(
			response =>
			{
				this.cargoOptions = response.text;
			}
		);

		this.existeColaborador = this.lista_colaboradores_gestores.length > 0 ?  true : false;
		
		if( this.existeColaborador == true )
			this.colaboradorForm.get('gestor').enable();
		else
			this.colaboradorForm.get('gestor').disable();
	}


	CadastrarColaborador()
	{

		var img = new FormData();

		img.append('imagem', this.imagemFile);

		this.loading = true;

		this.colaboradorService.salvarImagem(img).subscribe(

			response => {
				if( response["success"] == true)
				{

					let imagem = response["name_file"];

					this.colaboradorForm.addControl( "imagem", new FormControl(imagem, []) );

					this.colaboradorService.salvarColaborador(this.colaboradorForm.value).subscribe(
						request =>
						{
							this.loading = false;
							this.resultado = request.success;

							this.colaboradorForm.reset();
							this.colaboradorForm.removeControl('imagem');
						},
						error => {
							this.loading = false;
							this.colaboradorService.handleError(error);
							this.resultado = false;
						}
					);

				}
			});
	}


	carregaColaboradores()
	{
		
		this.colaboradorService.buscaColaboradoresPorEmpresaId(this.empresa_selecionada).subscribe(
			response => {
				this.lista_colaboradores_gestores = response.text;

				this.existeColaborador = this.lista_colaboradores_gestores.length > 0 ?  true : false;
				console.log(this.existeColaborador);

				if( this.existeColaborador == true )
					this.colaboradorForm.get('gestor').enable();
				else
					this.colaboradorForm.get('gestor').disable();
			}
		)
	}

	cadastroAdicionado( data ) {
		console.log( data );
	}


	handlerError(error) {
		console.log( error );
	}

	trocaImagem(file: FileList)
	{

		const reader = new FileReader();

		const imagem = file.item(0);

		this.imagemFile = imagem;

		if ( imagem )
		{

			const img = new FileReader();

			img.onload = (e: any) => {
				this.path = this._sanitizer.bypassSecurityTrustStyle(`url(${e.target.result})`);
			};

			img.readAsDataURL( this.imagemFile );
		}
	}

}
