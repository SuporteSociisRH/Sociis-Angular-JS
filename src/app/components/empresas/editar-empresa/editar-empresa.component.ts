import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, FormBuilder, Validators, FormArray, NgForm } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import * as cloneDeep from 'lodash/cloneDeep';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MessageService } from 'primeng/api';
// Services
import { AreaAtuacaoService } from '../../../Services/area-atuacao.service';
import { CargosesalariosService } from '../../../Services/cargosesalarios.service';
import { EmpresasService } from '../../../Services/empresas.service';
import { CargoService } from '../../../Services/cargo.service';
import { DiretrizService } from '../../../Services/diretriz.service';
import { RankingCargosService } from '../../../Services/ranking-cargos.service';

import { STORAGE_API } from '../../../sociis.api';

@Component({
  selector: 'sc-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css'],
  providers: [MessageService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class EditarEmpresaComponent implements OnInit {

  // Controle de tela de carregando
  public loading = true;

  public loadingNewFator = false;

  // Storage url
  public baseStorageUrl = STORAGE_API;

  // Armazena o Id da empresa que está em edição
  public empresaId: number;

  // Armazena lista com área de atuação.
  public areaOptions: any;

  // Armazena o id da area de atuação da empresa.
  public areaAtuacaoId: number;

  // Armazena os colaboradores da empresas
  public colaboradores;

  // Boolean que controla abertura de formulário do criador de novos fatores
  public navBarControleNovoFator: boolean = false;

  // Armazena a lista de fatores e graus de cada empresa em particular
  public listaFatoresIndividuais;

  // Recebe a lista de fatores salva no banco
  public listaFatores: string[];

  // Armazena a quantidade maior de graus que existe na lista de fatores. isso auxiliará na montagem da tabela nos detalhamentos de cargo.

  // headers da tabela de fatores
  public displayedColumns: string[] = ['id', 'fator', 'acoes'];

  // Armazena a lista de cargos que a empresa contem
  public listaCargosEmpresa = [];

  // Armazena as diretrizes da empresa
  public diretrizesEmpresa = [];

  // Armazena a lista de ranking da empresa caso ela já tenha uma salva no banco de dados
  public listaRankingCargos = null;

  //Form Group que armazena a lógica de ranking de cargos na empresa
  public RankingCargosSalarios: FormGroup = this.formBuilder.group({
    cargos: new FormArray([])
  });

  // Esboço do corpo de um Fator empresarial
  public fator: FormGroup = this.formBuilder.group({
    fator: ['', Validators.required],
    grau: new FormArray([])
  });


  // Armazena o limite do valor do grau que o usuário vai inserir porque devemos ter controle de
  // A soma dos graus devem ser no máximo 100.
  public valor_limite_do_proximo_grau: number = 0;


  // Esboço da estrutura de um grau
  public grau: FormGroup = this.formBuilder.group({
    identificador: ['', Validators.required],
    valor: ['', [Validators.required, Validators.min(this.valor_limite_do_proximo_grau)]],
    descricao: ['', Validators.required]
  });

  // Armazena a lista de fatores na ordem decrescente
  public fatores_ordenados_decrescente = [];

  // Guarda os fatores da empresas
  public fatores = [];

  // Form para cadastrar novo fator.
  public cadastroFator: FormGroup = this.formBuilder.group({
    fator: new FormControl('', Validators.required)
    , descricao: new FormControl('')
  })

  public fatoresData = [];

  // FormGroup com os dados de informação da empresa
  public empresaInfoGroup: FormGroup = this.formBuilder.group({
    cnpj: ['', Validators.required]
    , nome_fantasia: ['', [Validators.required, Validators.minLength]]
    , razao_social: ['', Validators.required]
    , area_atuacao: ['', Validators.required]
  });

  public navBarControleNovoCompetencia: boolean = false;

  public navBarControleNovoDiretriz: boolean = false;

  public empresa_cargo_id: number = null;

  public listaCargosRankeados = Array();

  public cadastroDiretriz: FormGroup = this.formBuilder.group({
    lista: new FormArray([])
  });

  public cadastroCompetencia: FormGroup = this.formBuilder.group({
    competencia: ['', Validators.required]
  });

  public colunasTabelaCargos: string[] = ['cargo', 'acoes'];

  constructor(
    private cargoServie: CargoService
    , private messageService: MessageService
    , private cargosesalariosService: CargosesalariosService
    , private areaService: AreaAtuacaoService
    , private empresaService: EmpresasService
    , private formBuilder: FormBuilder
    , private route: ActivatedRoute
    , private rankingCargos: RankingCargosService
    , private diretriz: DiretrizService) {

    // Busca lista com áreas de atuação
    this.areaService.buscaTodosAreaAtuacao().subscribe(
      response => {
        this.areaOptions = response.text;
      }
    );

    // Busca todas as listas de Fator salvas no banco de dados
    this.cargosesalariosService.buscaListaFatores().subscribe(
      response => {
        this.listaFatores = response.text;
      }
    );

    // Obtem o id da empresa passado por parametro da URL
    this.route.params.subscribe(params => this.empresaId = params['id']);

    // Buscamos no banco os dados desta empresa, associado com a lista de colaboradores
    this.empresaService.buscaDadosEmpresa(this.empresaId).subscribe(
      response => {

        this.areaAtuacaoId = response.text[0].area_atuacao_id;

        this.colaboradores = response.text[0].colaboradores;

        this.diretrizesEmpresa = response.text[0].diretrizes;

        this.empresaInfoGroup.patchValue(response.text[0], { onlySelf: true });

        this.loading = false;
      }
    );

    // Buscamos os fatores que existem registrados para esta empresa.
    this.buscaFatorPorEmpresaId();

    // Buscamos todos os cargos associados a aquela empresa
    this.empresaService.buscaListaCargosEmpresa(this.empresaId).subscribe(

      response => {

        this.listaCargosEmpresa = response.text;

        let cargos: FormArray = this.RankingCargosSalarios.get("cargos") as FormArray;

        this.listaCargosEmpresa.forEach((v, i, a) => {

          let cargoNome = v.cargo.cargo;

          // let _fatores: FormArray = this.fatores.get('fatores') as FormArray;

          let _cargo = this.formBuilder.group({
            cargo: cargoNome,
            // fatores: _fatores
          });

          cargos.push(_cargo);

        });
      }
    );

    /** busca planos de cargos e salários da empresa */
    this.rankingCargos.buscarRanking(this.empresaId).subscribe(
      response => {
        if (response.success == true)
          this.listaRankingCargos = response.text;
      }
    );
  }

  ngOnInit() { }

	/**
	* Abre aba lateral para criar um novo fator
	*
	* @author Adão Dias
	*
	**/
  criaNovoFator() {
    this.navBarControleNovoFator = true;
  }

	/**
	* Fecha a aba lateral que permite criar novo fator
	*
	* @author Adão Dias
	*
	**/
  cancelarNovoFator() {

    this.navBarControleNovoFator = false;

    this.fator.setControl('grau', new FormArray([]));

    this.fator.reset();
  }

	/**
	* Insere o fator (this.fator : FormGroup) na lista de fatores da empresa (this.fatores :  FormGroup) e em
	* seguida limpa o this.fator.
	*
	* @author Adão Dias
	*
	**/
  adicionaFator() {

    // let fatores = this.fatores.get('fatores') as FormArray;

    // let novoFator = cloneDeep(this.fator);

    // console.log(novoFator);

    // fatores.push(novoFator);

    // this.fatoresData = this.fatores.get('fatores').value;

    this.navBarControleNovoFator = false;

    this.cargosesalariosService.salvarListaFatoresIndividual(this.empresaId, this.fator).subscribe(
      response => {
        this.fator.setControl('grau', new FormArray([]));

        this.fator.reset();

        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Fator criado com sucesso' });

        this.buscaFatorPorEmpresaId();
      }
    );
  }

	/**
	* Toda vez que é removido um grau, um fator ou até mesmo adicionado, atualizamos todas a variaveis usadas no front para
	* mante-lo sempre atualizado em real-time. desta forma o detalhamento de fatores e o ranking de cargos sempre ficarão atualizados em real-time
	  *
	  * @author Adão Dias
	  *
	  **/
  atualizaFatoresParaFrontEnd() {

  }

	/**
	  * Busca a lista de fatores pelo Id da empresa
	  *
	  * @author Adão Dias
	  *
	  **/
  buscaFatorPorEmpresaId() {
    this.cargosesalariosService.buscarFatorPorId(this.empresaId).subscribe(
      response => {
        this.fatores = response.text;

        this.fatores_ordenados_decrescente = this.cargosesalariosService.ordenarFatoresPorQuantidadeGrausDecrescente(this.fatores);

        this.fatores_ordenados_decrescente = this.fatores_ordenados_decrescente[0];

        let valor_limite_do_proximo_grau = 0;

        this.fatores.forEach(function (val, index, arr) {
          if (val.grau.graus.length > 0)
          valor_limite_do_proximo_grau += val.grau.graus[0].valor;
        });

        this.valor_limite_do_proximo_grau = 100 - valor_limite_do_proximo_grau;
      }
    );
  }


	/**
	* Insere o novo grau no fator
	*
	* @author Adão Dias
	*
	**/
  adicionarGrau(fator: FormGroup) {
    this.cargosesalariosService.adicionarGrau(fator);
  }

	/**
	* Remove o grau do fator
	*
	* @author Adão Dias
	* @param { FormControl } grau - o grau em específico que será removido
	* @param { number} i - o indice do grau no array
	**/
  removeGrau(grau: FormControl, i: number) {

  }

	/**
	* Cadastra um novo fator no banco de dados.
	*
	* @author Adão Dias
	*
	**/
  cadastrarFator() {

    this.loadingNewFator = true;

    this.cargosesalariosService.salvarFator(this.cadastroFator).subscribe(
      response => {
        if (response.success == true) {
          // Atualizamos a lista de fatores.
          this.listaFatores = response.text;

          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Fator criado' });

          this.loadingNewFator = false;

          this.cadastroFator.reset();

          this.navBarControleNovoFator = false;
        }
      }
    );
  }

	/**
	* Remove um fator
	*
	* @author Adão Dias
	*
	* @param { FormGroup } f - fator que deverá ser removido
	* @param { number }	i - indice do Fator
	**/
  removeFator(fator, i: number)
  {

    this.fatores.splice(i, 1);

    let valor_limite_do_proximo_grau = 0;

    this.fatores.forEach(function (val, index, arr) {
      if (val.grau.graus.length > 0)
      valor_limite_do_proximo_grau += val.grau.graus[0].valor;
    });

    this.valor_limite_do_proximo_grau = 100 - valor_limite_do_proximo_grau;

    this.cargosesalariosService.removeFator(fator.id, this.empresaId).subscribe(
      response => {
        if(response.success == true)
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Fator removido com sucesso.' });
      }
    );
  }

	/**
	  * Adiciona uma competencia ao cargo
	  *
	  * @author Adão Dias
	  *
	  * @param { number }	empresa_cargo_id - id do cargo associado a empresa_cargo
	  **/
  adicionarCompetencia(empresa_cargo_id: number) {

    this.empresa_cargo_id = empresa_cargo_id;

    this.navBarControleNovoCompetencia = true;

  }

	/**
	  * Adiciona ao banco de dados a nova competencia
	  *
	  * @author Adão Dias
	  *
	  **/
  // cadastrarCompetencia() {
  //   this.cargoServie.salvarCompetencia(this.empresa_cargo_id, this.cadastroCompetencia).subscribe(
  //     response => {

  //       if (response.success == true) {


  //         this.empresaService.buscaListaCargosEmpresa(this.empresaId).subscribe(
  //           response => {
  //             this.listaCargosEmpresa = response.text;

  //             this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Competencia Adicionada' });
  //           });
  //       }

  //       this.navBarControleNovoCompetencia = false;
  //       this.cadastroCompetencia.reset();
  //     }
  //   );
  // }

	/**
	 * Fecha o formulário de criar competencias
	 *
	 * @author Adão Dias
	 *
	 **/
  cancelarNovaCompetencia() {

    this.navBarControleNovoCompetencia = false;

    this.cadastroCompetencia.reset();
  }

	/**
	  * remove a competencia no banco de dados.
	  *
	  *  @author Adão Dias
	  *
	*  @param { number }	id_competencia - id da competencia
	*  @param { number } cargo_indice - indice do cargo no array
	*  @param { number }	 competencia_indice - indice da competencia no array
	  **/
  // removerCompetencia(id_competencia: number, cargo_indice: number, competencia_indice: number) {
  //   this.cargoServie.removerCompetencia(id_competencia).subscribe(
  //     response => {

  //       if (response.success == true) {
  //         let cargo = this.listaCargosEmpresa[cargo_indice].empresas_cargos.splice(competencia_indice, 1);

  //         this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Competencia Removida' });

  //       }
  //       else {
  //         this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Erro ao remover Competencia' });
  //       }
  //     }
  //   );
  // }

  adicionarDiretriz() {
    this.navBarControleNovoDiretriz = true;
  }

  cancelaDiretriz() {
    this.navBarControleNovoDiretriz = false;

    let listaDiretrizes = this.cadastroDiretriz.get('lista') as FormArray;

    while (listaDiretrizes.length !== 0) {
      listaDiretrizes.removeAt(0);
    }

  }

  criaDiretriz() {
    let listaDiretrizes = this.cadastroDiretriz.get('lista') as FormArray;

    let diretriz = new FormGroup({
      'nome': new FormControl('')
    });

    listaDiretrizes.push(diretriz);
  }

  salvarDiretrizes() {
    this.diretriz.adicionarDiretriz(this.cadastroDiretriz, this.empresaId).subscribe(
      response => {
        if (response.success == true) {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Diretriz(es) Criada com sucesso' });

          this.navBarControleNovoDiretriz = false;

          this.cadastroDiretriz.setControl('lista', new FormArray([]));

          this.cadastroDiretriz.reset();

          /**
           * WARNNING : MUDAR ESTA FUNÇÃO PARA ALGUMA QUE BUSQUE APENAS AS DIRETRIZES
           * PARA NÃO GERAR LIXO NAS BUSCAS E NEM TRAZER DADOS DESNECESSÁRIOS
           *
           * atualiza lista de diretrizes
           *
           */
          this.empresaService.buscaDadosEmpresa(this.empresaId).subscribe(
            response => {
              this.diretrizesEmpresa = response.text[0].diretrizes;
            });
        }
      }
    )
  }

	/**
   * Remove diretriz no banco de dados
   *
   * @author Adão Dias
   * @param { number } diretriz_id - id da diretriz
 * @param { number } i - indice da diretriz no array.
   **/
  removeDiretriz(diretriz_id: number, i: number) {
    this.diretriz.removeDiretriz(diretriz_id).subscribe(

      response => {
        if (response.success == true) {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Diretriz(es) removida com sucesso' });

          this.diretrizesEmpresa.splice(i, 1);
        }
      }
    );
  }

  salvarRankingCargos(ranking: NgForm) {

    this.rankingCargos.salvar(ranking, this.empresaId).subscribe(
      response => {
        if (response.success == true) {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Ranking salvo com sucesso' });
        }
      }
    );
  }

  atualizaRanking(event, id) {
    let rank = { name: event.target.name, value: event.target.value, id: id };

    this.rankingCargos.atualizaRanking(rank).subscribe(
      response => {
        if (response.success == true) {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Ranking atualizado com sucesso' });
        }
      }
    );
  }

  salvaRanking(event) {
    let rank = { name: event.target.name, value: event.target.value, empresa_id: this.empresaId };

    this.rankingCargos.salvarRanking(rank).subscribe(
      response => {
        if (response.success == true) {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Ranking atualizado com sucesso' });
        }
      }
    );

  }

}

export interface GrauItem {
  identificador: string;
  valor: number;
}

export interface FatorItem {
  fator: string;
  grau: GrauItem[];
}
