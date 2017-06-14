import { Component, Input, AfterContentInit, Output } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import { ComponentBase } from "./app.component.base";

declare var componentHandler,swal;
@Component({
  selector: 'app-components-loginPanel'.toLowerCase(),
  templateUrl: 'application/templates/app-components-loginPanel.html'
})
export class LoginPanelComponent extends ComponentBase {
    /**
     * 使用者帳號
     */
    public user:string = "";

    /**
     * 使用者密碼
     */
    public password:string = "";
    public panelTitle:string="組織內部問卷系統";
    public isAdmin:boolean = false;
    public loading : boolean = false;
	constructor(){
        super();
        this.data = {};
        
        if(location.search == "?admin"){
            this.panelTitle += " - 管理登入";
            this.isAdmin =true;
        }
        
        (async()=>{
            var user = await QuizForms.User.getCurrentUser();
            if(user){
                location.href = "formList.html" + (user.isAdmin ? "?admin" : "");
            }
        })()
	}
	
	public async login(): Promise<void>{
        this.loading = true;
        try{
            await QuizForms.User.login(this.user,this.password,this.isAdmin);
            if(this.isAdmin){
                location.href="formList.html?admin";
                return;
            }
            location.href = "formList.html";
        }catch(e){
            this.loading = false;
            swal(e.name, e.message, "error")
        }
	}
}