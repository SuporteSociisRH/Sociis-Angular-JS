import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ColaboradoresService } from '../../../Services/colaboradores.service';
import { MailsService } from '../../../Services/mails.service';
import { ActivatedRoute } from '@angular/router';
import { DialogAvaliacaoColaborador } from '../../../modais/AvaliacaoDesempenho/avaliacaoColaborador/dialog-avaliacao-colaborador';
import { STORAGE_API } from '../../../sociis.api';

@Component({
	selector: 'sc-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

	public colaboradorId: number = null;

	public colaboradorInfo = null;

	public dadosAvaliacao = null;
	public avaliacoes_do_colaborador = null;

	public respostas = null;

	public listaAvaliacoesPendentes = null;

	public baseStorageUrl = STORAGE_API;

	constructor(private mail: MailsService, private dialog: MatDialog, private route: ActivatedRoute, private colaboradorService: ColaboradoresService) {

		this.route.params.subscribe( params => this.colaboradorId = params['id'] );

		this.colaboradorService.buscarColaboradorPorId( this.colaboradorId ).subscribe( response => {

			if (response.success == true) 
			{
				this.colaboradorInfo = response.text.colaborador;
				this.respostas = response.text.colaborador.respostas;
				this.dadosAvaliacao = response.text.dados[0];
			}
		});


		this.buscarAvaliacoesPendentes();
		this.buscarAvaliacoesRealisadas();
	}

	ngOnInit()  {}



	buscarAvaliacoesRealisadas()
	{
		this.colaboradorService.buscarAvaliacoesRealizadas(this.colaboradorId).subscribe( response => {
			this.avaliacoes_do_colaborador = response.text;
		});
	}

	buscarAvaliacoesPendentes()
	{
		this.colaboradorService.buscarAvaliacoesPendentes( this.colaboradorId ).subscribe(
			response => {
				if(response.success == true)
				{
					this.listaAvaliacoesPendentes = response.text;
				}
			}
		);
	}


	/** Abre modal com a avaliação do colaborador */
	abrirAvaliacaoRecebidaPor(avaliacao_id: number) 
	{
		let avaliacoes = this.colaboradorInfo.avaliacao;

		let auto_avaliacao = avaliacoes.filter(aval => aval.colaborador_id == aval.realizado_por);

		const dialogAvaliacao = this.dialog.open(DialogAvaliacaoColaborador, {
			width:'90%',
			// height:'500px',
			data: {
				  colaboradorInfo: avaliacoes.filter(aval => aval.id == avaliacao_id)
				, gabarito: this.respostas.filter(resp => resp.avaliacoes_id == avaliacao_id)
				, dadosAvaliacao: this.dadosAvaliacao
				, auto_avaliacao: auto_avaliacao
				, auto_avaliacao_respostas: this.respostas.filter(resp => resp.avaliacoes_id == auto_avaliacao[0].id)
			}
		});

		dialogAvaliacao.afterClosed().subscribe(d => {

		});

	}

	enviarAvaliacao(colaborador_id: number) : void
	{
		this.mail.enviaEmailAvaliacaoDesempenho(colaborador_id).subscribe(
			response => {
				console.log(response);
			}
		)
	}
}