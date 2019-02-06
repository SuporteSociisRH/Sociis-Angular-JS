import { Component, OnInit } from '@angular/core';
import { AuthHandleService } from '../../Services/auth-handle.service';
import { TokenService } from '../../Services/token.service';
import { UserService } from '../../Services/user.service';
import { Observable } from 'rxjs';

import { Router} from '@angular/router';
@Component({
	selector: 'sc-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	public loggedIn: boolean;

	public user; 

	constructor(
		private authHandler: AuthHandleService,
		private route: Router,
		private Token: TokenService,
		private userService: UserService
	) { }


	ngOnInit() 
	{
		this.userService.authStatus.subscribe(user => {
			this.user = user
		});
	}


	logout(e: MouseEvent) 
	{
		e.preventDefault();

		this.Token.remove();

		this.authHandler.changeAuthStatus(false);

		this.route.navigateByUrl('acesso');
	}

}
