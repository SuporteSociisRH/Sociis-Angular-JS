import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

// Interfaces
import { Empresa } from '../../../Interfaces/empresa';
import { UsuarioDoSistema } from '../../../Interfaces/usuario-acesso';
import { Diretriz } from '../../../Interfaces/diretriz';

// Services
import { TokenService } from '../../../Services/token.service';
import { EmpresasService } from '../../../Services/empresas.service';
import { AreaAtuacaoService } from '../../../Services/area-atuacao.service';
import { CargoService } from '../../../Services/cargo.service';
import { ModeloAvaliacaoService } from '../../../Services/modelo-avaliacao.service';
//modais
import { DialogNovoUsuarioParaAcessarSistema } from '../../../modais/CriarEmpresa/NovoUsuarioEmpresaSistema/dialog-cria-usuario-acesso-empresa';
import { DialogNovaDiretriz } from '../../../modais/CriarEmpresa/NovaDiretrizEmpresa/modal-nova-diretriz-empresa';


@Component({
	selector: 'sc-criar-empresa',
	templateUrl: './criar-empresa.component.html',
	styleUrls: ['./criar-empresa.component.css'],
})
export class CriarEmpresaComponent implements OnInit {



	public empresaForm = this.formBuilder.group({
		cnpj: ['', Validators.required]
		, nome_fantasia: ['', [Validators.required, Validators.minLength]]
		, razao_social: ['', Validators.required]
		, area_atuacao: ['', Validators.required]
		, tipoAvaliacao: ['']
	});

	public areaOptions: any;

	public loading = false;

	public resultado: boolean = null;

	public UsuarioDoSistema: UsuarioDoSistema[] = [];

	public diretrizes: Diretriz[] = [];

	public sect = {
		nome: 'Criar Empresa'
		, sect: ''
	};

	// Armazena a lista de cargos da empresa.
	public listaCargosEmpresas = [];

	// Armazena a lista com todos os cargos registrados.
	public listaCargos: any[];

	// Armazena lista de tipos de avaliações
	public tiposAvaliacao: any[];

	constructor(
		private http: HttpClient
		, private dialog: MatDialog
		, private Token: TokenService
		, private formBuilder: FormBuilder
		, private empresasService: EmpresasService
		, private areaAtuacaoService: AreaAtuacaoService
		, private cargoService: CargoService
		, private modeloAvaliacao: ModeloAvaliacaoService
	) { }

	ngOnInit() {
		/*
		* Buscamos todos as areas de atuação para preencher o formulário
		*/
		this.areaAtuacaoService.buscaTodosAreaAtuacao().subscribe(

			response => {
				this.areaOptions = response.text;
			}
		);

		// Buscamos a lista de cargos
		this.cargoService.buscaCargos().subscribe(
			response => {
				this.listaCargos = response.text;
			}
		);


		// Busca lista de modelos de avaliação
		this.modeloAvaliacao.buscaModelosAvaliacao().subscribe(
			response => {
				this.tiposAvaliacao = response.text;
			}
		);

	}

	/**
	* Faz a requisição para salvar a empresa no banco.
	*
	* @author Adão Dias
	*
	**/
	cadastraEmpresa() {
		this.loading = true;

		this.empresasService.cadastraEmpresa(this.empresaForm, this.listaCargosEmpresas, this.UsuarioDoSistema, this.diretrizes).subscribe(

			response => {
				this.loading = false;

				this.resultado = response.success;

				this.empresaForm.reset();

				this.empresasService.registroAdicionado();
			}
			, error => {

				this.loading = false;

				this.resultado = false;

				this.empresasService.handlerError(error)
			}
		);
	}

	/**
	* Cria a lista de Diretrizes que a empresa levará como configuração
	*
	* @author Adão Dias
	*
	**/
	adicionarDiretrizes() {
		const dialogCriaDiretiva = this.dialog.open(DialogNovaDiretriz, {
			data: { nome: '', legenda: '', pontos: '', minimo: '', maximo: '' }
		});

		dialogCriaDiretiva.afterClosed().subscribe(d => {

			this.diretrizes.push(d);

			console.log(this.diretrizes);
		});
	}

	/**
	* Cria a lista de usuários que terão acesso ao sistema associado a aquela empresa
	*
	* @author Adão Dias
	*
	**/
	adicionarUsuarioAssociadoEmpresa() {
		const dialogCriaUser = this.dialog.open(DialogNovoUsuarioParaAcessarSistema, {
			data: { nome: '', email: '', senha: '' }
		});

		dialogCriaUser.afterClosed().subscribe(usuario => {
			this.UsuarioDoSistema.push(usuario);
		});
	}

	addToList(event: CdkDragDrop<string[]>) {

		if (event.previousContainer === event.container) {

			moveItemInArray(
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		}
		else {

			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		}
	}


}
