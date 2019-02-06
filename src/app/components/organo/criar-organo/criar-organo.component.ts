import { ViewEncapsulation, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { from } from 'rxjs';
import { STORAGE_API } from '../../../sociis.api';
import { MessageService } from 'primeng/api';
/**
interfaces
**/
import { Empresa } from '../../../Interfaces/empresa';
import { Colaborador } from '../../../Interfaces/colaborador';

/**
services
**/
import { TokenService } from '../../../Services/token.service';
import { OrganogramaService } from '../../../Services/organograma.service';
import { ColaboradoresService } from '../../../Services/colaboradores.service';
import { EmpresasService } from '../../../Services/empresas.service';
import { CargoService } from '../../../Services/cargo.service';

@Component({
	encapsulation: ViewEncapsulation.None,
	selector: 'sc-criar-organo',
	templateUrl: './criar-organo.component.html',
	styleUrls: ['./criar-organo.component.css'],
	providers: [MessageService]
})

export class CriarOrganoComponent implements OnInit {

	public baseStorageUrl = STORAGE_API;

	public empresaId: number;

	/** armazena os dados que vem do FormGroup **/
	public colaborador = {id: null, nome: "Novo Colaborador", empresa: null, cargo:"Cargo", cargo_id: null, empresa_id: null, imagem: 'user-image-default', subordinados:[] };

	// Armazena a imagem padrão de upload de foto
	public path = this._sanitizer.bypassSecurityTrustStyle('url(assets/dist/img/user-image-default.jpg)');

	// Faz controle do navBar de edição do colaborador.
	public navBarControleColaboradorEditor : boolean = false;

	// Armazena toda a estrutura hierárquica da empresa em formsGroup aninhados.
	public colaboradorForm = this.formBuilder.group({
		id : [null, Validators.required],
		nome: [null, Validators.required],
		cargo: [null, Validators.required],
		empresa: [null, Validators.required],
		cargo_id: [null, Validators.required],
		empresa_id: [null, Validators.required],
		imagem: new FormControl('user-image-default'),
		subordinados: new FormArray([])
	});

	// Armazena os subordinados do colaborador em edição.
	public subordinadosColaboradorEdicao : FormArray;

	// Armazena a estrutura hierárquica da empresa em Object JSON
	public orgChart = [];

	// Armazena a lista de colaboradores da empresa associado ao organograma.
	public colaboradores = null

	// Armazena o Id do colaborador selecionado no select <colaborador> no painel de edição de colaborador
	public idColaboradorSelecionado : number;

	// Armazena a lista de cargos cadastrados no banco.
	public cargos = null;

	//dados da empresa
	public empresa;

	/** é molde do formGroup que vem do card-template para fazer o formulário de edição **/
	public colaboradorEdicao = this.formBuilder.group({
		id : [null, Validators.required],
		nome: [null, Validators.required],
		cargo: [null, Validators.required],
		empresa: [null, Validators.required],
		cargo_id: [null, Validators.required],
		empresa_id: [null, Validators.required],
		imagem: new FormControl(),
		subordinados: new FormArray([])
	});

	// Armazena a foto upload do usuário
	public imagemFile;

	// Section Header info
	public sect = { nome: 'Organograma', sect: ''};

	constructor(private messageService: MessageService, private cargoService: CargoService, private _sanitizer: DomSanitizer, private formBuilder: FormBuilder, private route: ActivatedRoute, private organogramaService: OrganogramaService, private empresaService: EmpresasService, private colaboradorService: ColaboradoresService)
	{

		// Obtem o id da empresa passado por parametro da URL
		this.route.params.subscribe( params => this.empresaId = params['id'] );

		// Obtem dados da empresa
		this.empresaService.buscaDadosEmpresa(this.empresaId).subscribe(
			response => {
				this.empresa = response.text[0].nome_fantasia;
			},
			error => console.log(error)
			);


		this.organogramaService.buscaOrganogramaPorEmpresaId(this.empresaId).subscribe(
			response => {

				if( response.success == true )
				{

					this.orgChart.push( response.text[0].organograma.colabs[0] );

					this.constroiOrganograma();
				}
				else
				{
					//Cria um esboço base para desenvolver o organograma.
					this.orgChart.push( this.colaborador );

					this.constroiOrganograma();
				}
			},
			error => {
				console.log(error);
			}
			);

		// Busca os cargos cadastrados.
		this.cargoService.buscaCargos().subscribe(
			response =>
			{
				if(response.success == true)
				{
					this.cargos = response.text;
				}
			}
			);
		// Buscamos os colaboradores da empresa associado com cargo e empresa
		this.colaboradorService.buscaColaboradoresPorEmpresaId(this.empresaId).subscribe(
			request =>
			{
				if(request.success == true)
					this.colaboradores = request.text;
			},
			error => console.log(error)
			);
	}

	ngOnInit() {}

	/**
	* Cria a lista dinamica de FormArray aninhado. necessário para interligar um formulário a outro.
	*
	* @author Adão Dias
	*
	**/
	private iniciaOrganograma(organograma): FormArray
	{
		const arrColaborador = new FormArray([]);

		organograma.forEach( o => {

			const colabs = this.formBuilder.group({
				id: [o.id, Validators.required],
				nome: [o.nome, Validators.required],
				cargo: [o.cargo, Validators.required],
				empresa: [o.empresa, Validators.required],
				cargo_id: [o.cargo, Validators.required],
				empresa_id: [o.empresa_id, Validators.required],
				imagem: [o.imagem, Validators.required],
				subordinados: this.iniciaOrganograma( o.subordinados )
			})
			arrColaborador.push( colabs );
		});

		return arrColaborador;
	}

	/**
	*
	* gera a estrutura de arvore dos colaboradores para o organograma
	*
	* @author Adão Dias
	*
	**/
	private constroiOrganograma()
	{
		this.colaboradorForm = this.formBuilder.group({
			colabs: this.iniciaOrganograma( this.orgChart )
		});
	}


	confirmaEdicaoColaborador(colaborador: FormGroup)
	{
		this.navBarControleColaboradorEditor = false;
	}

	modificaFormularioColaborador(e: FormGroup)
	{
		let imagemColaborador = e.get('imagem').value;

		this.navBarControleColaboradorEditor = true;
		this.colaboradorEdicao = e;

		this.path = this._sanitizer.bypassSecurityTrustStyle(`url(${STORAGE_API}/colaboradores/${imagemColaborador}.jpg)`);


		this.subordinadosColaboradorEdicao = e.get('subordinados') as FormArray;

		this.navBarControleColaboradorEditor = true;
	}

	removeColaborador(colaborador: FormGroup, i: number)
	{
		this.messageService.add({severity:'success', summary: '', detail: 'removido'});

		this.organogramaService.removerColaborador(colaborador, i);
	}

	adicionarColaborador(colaborador: FormGroup)
	{
		this.organogramaService.adicionarColaborador(colaborador);
	}

	trocaImagem(file: FileList)
	{
		const imagem = file.item(0);

		this.imagemFile = imagem;

		if ( imagem ) {
			const img = new FileReader();

			img.onload = (e: any) => {
				this.path = this._sanitizer.bypassSecurityTrustStyle(`url(${e.target.result})`);
			};

			img.readAsDataURL( this.imagemFile );
		}
	}

	recuperaCargoColaborador(colaboradorFormEditor: FormGroup)
	{

		let colaboradorNome = colaboradorFormEditor.get('nome').value;

		// //busco o  colaborador pelo id
		const source = from( this.colaboradores );

		const obj = source.pipe(filter(colaborador => colaborador['nome'] == colaboradorNome ));


		const colab = obj.subscribe(
			colaborador =>
			{

				colaboradorFormEditor.patchValue({
					id: colaborador["id"],
					nome: colaborador["nome"],
					empresa_id: colaborador["empresa_id"],
					empresa: colaborador["empresa"],
					cargo_id: colaborador["cargo_id"],
					cargo: colaborador["cargo"]["cargo"],
					imagem: colaborador["imagem"],
				});

				this.path = this._sanitizer.bypassSecurityTrustStyle(`url(${STORAGE_API}/colaboradores/${colaborador['imagem']}.jpg)`);
			}
			);
	}

	/**
	*
	* Salva organograma no banco de dados.
	*
	* @author Adão Dias
	*
	**/
	salvaOrnanograma()
	{
		this.organogramaService.salvarOrganograma( this.empresaId, this.colaboradorForm.value ).subscribe(
			response => {
			this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Organograma salvo com sucesso.'});
			},
			error => {
				this.messageService.add({severity:'error', summary: 'Oops.', detail: 'Ocorreu um erro. tente novamente'});
			}
			);
	}

}
