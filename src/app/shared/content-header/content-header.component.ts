import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'sc-content-header',
	templateUrl: './content-header.component.html',
	styleUrls: ['./content-header.component.css']
})
export class ContentHeaderComponent implements OnInit {

	constructor() { }

	@Input() section = {
		nome: '',
		sect: ''
	};

	ngOnInit() {
	}
}
