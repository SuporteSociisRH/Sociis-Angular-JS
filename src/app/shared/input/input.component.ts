import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

@Component({
	selector: 'sc-input-container',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {



	@Input() label : string;
	@Input() errorMessage : string;

	input: any;

	@ContentChild(FormControlName) model : FormControlName;

	constructor(  ) { }

	ngOnInit() {
	}

	/**
	* Feedback visual de sucesso do input.
	*
	* @author Adão Dias
	* @return boolean
	*
	**/
	hasSuccess() : boolean
	{
		return this.input.valid && (this.input.dirty || this.input.touched);
	}

	/**
	* Feedback visual de erro do campo.
	*
	* @author Adão Dias
	* @return boolean
	*
	**/
	hasError() : boolean
	{
		return this.input.invalid && (this.input.dirty || this.input.touched);
	}

	ngAfterContentInit()
	{
 		this.input = this.model;

 		if(this.input === undefined)
 			throw new Error('Este componente precisa ser usado com uma diretiva FormControlName');
	}

}
