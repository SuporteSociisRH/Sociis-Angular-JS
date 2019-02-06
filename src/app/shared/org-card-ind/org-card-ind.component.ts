import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule  } from '@angular/forms'
@Component({
	selector: 'sc-org-card-ind',
	templateUrl: './org-card-ind.component.html',
	styleUrls: ['./org-card-ind.component.css']
})
export class OrgCardIndComponent implements OnInit {

	constructor() { }

	@Input() group: FormGroup;
	
	@Output() colaboradorGroupSelectedEmitter = new EventEmitter();

	ngOnInit() {}

	caller($event)
	{
		this.colaboradorGroupSelectedEmitter.emit($event);
	}
}
