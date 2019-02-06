import { Component, OnInit } from '@angular/core';


@Component({
	selector: 'sc-organo',
	templateUrl: './organo.component.html',
	styleUrls: ['./organo.component.css']
})
export class OrganoComponent implements OnInit {


	public sect = {
		nome: 'Organograma',
		sect: ''
	};
	
	constructor(){}

	ngOnInit() {
	}

}
