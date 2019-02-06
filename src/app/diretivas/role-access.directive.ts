import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Roles } from '../app.roles';
import { UserService } from '../Services/user.service';
@Directive({
	selector: '[roleAccess]'
})
export class RoleAccessDirective {

	private hasView = true;
	private user;

	constructor( private userInfo : UserService, private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {
		this.user = this.userInfo.getUserInfo();
	}

	@Input() set roleAccess(role: Roles) 
	{
		if ( ( role == this.user.role_id ) && this.hasView)
		 {
			this.viewContainer.createEmbeddedView(this.templateRef);
			this.hasView = true;
		} else if ( (role != this.user.role_id )  && !this.hasView) {
			this.viewContainer.clear();
			this.hasView = false;
		}
	}

}
