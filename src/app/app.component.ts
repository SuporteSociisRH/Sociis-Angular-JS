import { Component } from '@angular/core';
import { AuthHandleService } from './Services/auth-handle.service';

@Component({
	selector: 'sc-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'SociisRH';
	



	public loggedIn: boolean;

	constructor( private authHandler: AuthHandleService ) { }

	ngOnInit() 
	{
		this.authHandler.authStatus.subscribe(value => this.loggedIn = value);
	}

e
}
