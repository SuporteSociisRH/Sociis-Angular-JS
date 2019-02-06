import { Component, OnInit } from '@angular/core';
import { ColaboradoresService } from '../../../Services/colaboradores.service';
import { UserService } from '../../../Services/user.service';
import { EmpresasService } from '../../../Services/empresas.service';
import { AvalDesempenhoService } from '../../../Services/aval-desempenho.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { STORAGE_API } from '../../../sociis.api';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
@Component({
	selector: 'sc-realizar-avaliacao',
	templateUrl: './realizar-avaliacao.component.html',
	providers: [MessageService],
	styleUrls: ['./realizar-avaliacao.component.css']
})

export class RealizarAvaliacaoComponent implements OnInit {


	public avaliacoes_perfil = null;
	
	public exame_selecionado: number = null;
	
	public guid = null;
	
	public diretriz = null;
	
	public competencias = null;

	public respostas = null;

	public baseStorageUrl = STORAGE_API;

	public user = null;

	public colaborador_imagem = null;

	public primeiro_acesso = true;

	constructor(private messageService: MessageService, private avalDesempenhoService: AvalDesempenhoService, private empresaService: EmpresasService, private route: ActivatedRoute, private colaboradorService: ColaboradoresService, private userService: UserService) {

		this.guid = this.userService.getUserInfo().guid;

		this.route.params.subscribe( params => {
			
			this.primeiro_acesso = params['userId'] ? false : true;

			this.avalDesempenhoService.setColaboradorId(params['userId']);
		});

		this.colaboradorService.buscaAvaliacoesPendentesPorGUID(this.guid).subscribe(response => {
			this.avaliacoes_perfil = response.text;

			this.avalDesempenhoService.getColaboradorId().subscribe(e => {

				this.exame_selecionado = e;
				
				if(this.exame_selecionado)
					this.buscaDiretrizes( this.exame_selecionado );
			});
		});
	}

	ngOnInit() { }


	/**
	 * Busca as diretrizes da empresa do colaborador
	 * @param user_id 
	 * @author Adão Dias
	 */
	buscaDiretrizes(user_id: number) {
		let avaliacao = this.avaliacoes_perfil;

		let user = avaliacao.filter( user => user.id == user_id );
		
		this.user = user[0];

		console.log(this.user);
		
		let cargo_id = this.user.colaboradors[0].cargo_id;
		let empresa_id = this.user.colaboradors[0].empresa_id;
		this.colaborador_imagem = this.user.colaboradors[0].imagem;

		this.empresaService.buscaDiretrizes( empresa_id ).subscribe( response => {
		
			this.diretriz = response.text;
		});

		this.colaboradorService.buscaCompetenciaColaborador(cargo_id, empresa_id).subscribe( response => {
			this.competencias = response.text[0].competencias;
		});
	}


	finalizarAvaliacao(respostas: NgForm) 
	{
	
		this.colaboradorService.enviaRespostaExame(respostas, this.user).subscribe(response => {

			if(response.success)
				this.messageService.add({ severity: 'success', summary: 'Obrigado', detail: response.text });
		});
	}
}
