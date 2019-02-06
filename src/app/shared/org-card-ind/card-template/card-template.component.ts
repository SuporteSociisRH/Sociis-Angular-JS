import { Component, OnInit, Input, ContentChild, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { animate, state, transition, trigger, style, keyframes } from '@angular/animations';
import { STORAGE_API } from '../../../sociis.api';
//services
import { ColaboradoresService } from '../../../Services/colaboradores.service';
import { OrganogramaService } from '../../../Services/organograma.service';

@Component({
	selector: 'sc-card-template',
	templateUrl: './card-template.component.html',
	styleUrls: ['./card-template.component.css'],
	animations:[
	trigger('cardAnimate', [

		//efeito ao adicionar novo colaborador no organograma
		transition(':enter', [
			style({opacity:0}),
			animate(250, style({ opacity: 1 }))
			]),
		//efeito ao remover colaborador do organograma
		transition(':leave', [
			style({opacity: 1}),
			animate(350, style({opacity:0}))
			])
		])
	]
})
export class CardTemplateComponent implements OnInit {

	constructor(private builder : FormBuilder, private colaboradorService: ColaboradoresService, private organogramaService: OrganogramaService) { }

	ngOnInit() {}

	@Input() nome: string;
	@Input() cargo: string;
	@Input() indexOf: number;
	@Input() group: FormGroup;

	@Input() colaborador : any;

	public baseStorageUrl = STORAGE_API;

	public cardColaboradorEdit : FormGroup;

	@Output() colaboradorGroupSelectedEmitter = new EventEmitter();

	/**
	* Adiciona um colaborador no organograma
	*
	* @author Adão Dias
	*
	**/
	adicionarColaborador(colaborador: FormGroup)
	{
		this.organogramaService.adicionarColaborador(colaborador);
	}

	/**
	* Remove um colaborador no organograma
	*
	* @author Adão Dias
	*
	**/
	removerColaborador(colaborador: FormGroup, i: number)
	{
		this.organogramaService.removerColaborador(colaborador, i);
	}

	/**
	* Mostra a quantidade de subordinados que o colaborador controla
	*
	* @author Adão Dias
	*
	**/
	qtdaSubordinados(colaboradorForm: FormGroup)
	{
		var filhos =  colaboradorForm.get('subordinados') as FormArray;

	}

	/**
	* Determina qual é o colaborador(FormControl) será foco de edição. implica na mudança dos dados para serem
	* Apresentados no formulário de edição.
	*
	* @author Adão Dias
	*
	**/
	determinaColaborador(colaboradorForm: FormGroup)
	{
		
		this.cardColaboradorEdit = colaboradorForm;
		this.colaboradorGroupSelectedEmitter.emit(colaboradorForm);
	}

	log(colaborador)
	{
		console.log(colaborador);
	}
}
