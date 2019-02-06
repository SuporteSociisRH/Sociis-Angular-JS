import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Roles } from '../../app.roles';
@Component({
	selector: 'sc-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

	constructor(private userService: UserService) { }
	
	public role = Roles;
	public user;

	ngOnInit() 
	{
		this.userService.authStatus.subscribe(user => {
			this.user = user
		});	
	}

}
