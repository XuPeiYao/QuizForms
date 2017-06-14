import { Component, Input, AfterContentInit, Output } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import { ComponentBase } from "./app.component.base";

declare var componentHandler,swal;
@Component({
  selector: 'app-components-logoutButton'.toLowerCase(),
  templateUrl: 'application/templates/app-components-logoutButton.html'
})
export class LogoutButtonComponent extends ComponentBase {
	public async logout(): Promise<void>{
        if(await QuizForms.User.getCurrentUser()==null){
            location.href="login.html" + location.search;
            return;
        }
        try{
            await QuizForms.User.logout();
            location.href = "login.html" + location.search
        }catch(e){
            swal(e.name, e.message, "error")
        }
	}
}