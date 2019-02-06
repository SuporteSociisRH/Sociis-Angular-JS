import { Component, OnInit, Inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AvalDesempenhoService } from '../../Services/aval-desempenho.service';
import { CargoService } from '../../Services/cargo.service';
import { DialogNovaCompetenciaComponent } from '../../modais/AvaliacaoDesempenho/NovaCompetencia/dialog-cria-nova-competencia';
import { DialogNovaAvaliacaoComponent } from '../../modais/AvaliacaoDesempenho/criar-avaliacao/criar-avaliacao.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EmpresasService } from '../../Services/empresas.service';
import { STORAGE_API } from '../../sociis.api';
import { UserService } from '../../Services/user.service';
import { ColaboradoresService } from '../../Services/colaboradores.service';
@Component({
	selector: 'sc-avaldesempenho',
	templateUrl: './avaldesempenho.component.html',
	styleUrls: ['./avaldesempenho.component.css'],
	providers: [MessageService]
})

export class AvaldesempenhoComponent implements OnInit {


	public listaCompetenciasSelecionada: [] = [];
	public sect = { nome: 'Avaliação de Desempenho', sect: '' };
	public competencia: string = '';
	public cargo_id: number = 0;
	public cargos_empresa: [] = [];

	public MyDataVariable = [
		{
			"name": "concluidas",
			"value": 18
		},
		{
			"name": "Pendentes",
			"value": 30
		}
	];

	view: any[] = [500, 300];
	colorScheme = {
		domain: ['green', 'red']
	};

	public colaboradores = [];
	// Storage url
	public baseStorageUrl = STORAGE_API;
	public autoScale = true;
	public value = 2;
	public tipo_indicador : number = null;

	public usuario = null;

	constructor(private colaboradorService: ColaboradoresService, private empresaService: EmpresasService, private usuarioService: UserService, private messageService: MessageService, private dialog: MatDialog, private cargosService: CargoService, private avalDesempenho: AvalDesempenhoService) {

		this.usuario = this.usuarioService.getUserInfo();

		this.listaCargosDaEmpresa();

		this.buscaColaboradores();

	}

	ngOnInit() {
	}

	/**
	  * Buscar Cargos por empresa
	  *
	  * @author Adão Dias
	  **/
	listaCargosDaEmpresa() {
		this.cargosService.buscarCargosPorEmpresaId(this.usuario.empresa_id).subscribe(
			response => {
				if (response.success === true) {
					this.cargos_empresa = response.text;
				}
			}
		);
	}

	buscaColaboradores() 
	{

		this.colaboradorService.buscaColaboradoresPorEmpresaId(this.usuario.empresa_id).subscribe(
			response => {
				if (response.success == true) 
				{
					console.log(response.text);

					this.colaboradores = response.text;
				}
			}
		);
	}

	novaCompetencia(cargo_id: number): void {
		this.cargo_id = cargo_id;

		const dialogRef = this.dialog.open(DialogNovaCompetenciaComponent, {
			data: { 'cargo_id': this.cargo_id, 'competencia': this.competencia, 'tipo_indicador': this.tipo_indicador  },
			width: '90%',
			height: '400px'
		});

		dialogRef.afterClosed().subscribe(result => {
			this.competencia = result;
			this.tipo_indicador = null;

			this.cargosService.salvarCompetencia(this.cargo_id, this.competencia, this.tipo_indicador).subscribe(

				response => {
					if (response.success == true) {
						let cargo_id = this.cargo_id;
						let compt = result.competencia;

						this.cargos_empresa.forEach(function (value, index, arr) {

							let val: any = value;

							if (val.id == cargo_id) {
								val.competencias.push({ id: response.text, competencia: compt });
							}
						});

						this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Competencia Adicionada' });

						this.competencia = '';
					}
				}
			);
		});
	}

	log(log) {
	
	}

	removerCompetencia(id_competencia: number, cargo_indice: number, competencia_indice: number) {
		this.cargosService.removerCompetencia(this.listaCompetenciasSelecionada).subscribe(
			response => {

				if (response.success == true) {

					this.listaCargosDaEmpresa();

					this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Competencia(s) Removida(s)' });
				}
				else {
					this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Erro ao remover Competencia(s)' });
				}
			}
		);
	}

	abreModalNovaAvaliacao()
	{
		const dialogRef = this.dialog.open(DialogNovaAvaliacaoComponent, {
			data: {'lista_colaboradores': this.colaboradores, 'lista_cargos': this.cargos_empresa} , 
			width: '90%',
			height: '600px'
		});	
	}

}


