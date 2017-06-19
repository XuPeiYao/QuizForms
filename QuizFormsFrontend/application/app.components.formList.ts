import { Component, Input, AfterContentInit, Output } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import { ComponentBase } from "./app.component.base";

declare global {
  interface Date {
    format(format: string):string;
  }
}

declare var componentHandler,swal,dialog,download;
@Component({
  selector: 'app-components-formList'.toLowerCase(),
  templateUrl: 'application/templates/app-components-formList.html'
})
export class FormListComponent extends ComponentBase {
    public isAdmin:boolean;
    public forms: QuizForms.Form[];
    public downloadForm:QuizForms.Form;
    public downloadExt:("excel"|"csv");
    public startDate:Date;
    public endDate:Date;

    public get isIE(){
        return window['isIE'];
    }

    constructor(){        
        super();
        (async()=>{
            this.startDate = new Date();
            this.endDate = new Date();
            this.isAdmin = location.search == "?admin";
            this.forms = await QuizForms.Form.getList();
        })();
    }

    public async gotoForm(form:QuizForms.Form): Promise<void>{
        var writed = await form.isWrited();

        var currentUser = await QuizForms.User.getCurrentUser();

        if(currentUser.type != form.userType){
            swal("不具有填寫權限","此問卷有限定填寫身分，您無法填寫!","error");
            return;
        }

        if(!form.rewriteable){
            swal("此問卷您已經填寫過", "您已經填寫過這份問卷，本問卷無法重新填寫!", "error")
            return;
        }

        //檢查有沒有寫過的問卷
        if(writed && form.rewriteable){
            swal({
                title: "此問卷您已經填寫過",
                text: "您已經填寫過這份問卷，您是否要刪除過去的紀錄以利進行填寫?",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "是",
                cancelButtonText: "否"
            },
            async function(isConfirm){
                if (isConfirm) {
                    await form.clearSubmit();
                    swal({
                        title: "已刪除",
                        text:"您之前所填寫的紀錄已經刪除，您可以重新填寫",
                        type: "success",
                        confirmButtonText: "是",
                    },()=>location.href="form.html?id=" + form.id);
                }
            });
            return;
        }

        location.href = "form.html?id=" + form.id;
    }


    public async downloadFormExcel(form:QuizForms.Form):Promise<void>{
        this.downloadForm = form;
         this.downloadExt = "excel";
        dialog.showModal();
    }

    public async downloadFormCSV(form:QuizForms.Form):Promise<void>{
        this.downloadForm = form; 
        this.downloadExt = "csv";       
        dialog.showModal();
    }

    public close() : void{
        dialog.close();
    }
    public async download():Promise<void>{
        dialog.close();
        if(await QuizForms.User.getCurrentUser()==null){
            location.href="login.html" + location.search;
            return;
        }
        var start = this.startDate,end = this.endDate;
        if(typeof this.startDate == "string"){
            start = new Date(this.startDate + "+0800");
        }
        if(typeof this.endDate == "string"){
            end = new Date(this.endDate + "+0800");
        }
        
        var filename = `新生問卷紀錄-${this.downloadForm.name}(${start.format("yyyy-mm-dd HHMMss")}至${end.format("yyyy-mm-dd HHMMss")})`;
        var THIS = this;
        var x = new XMLHttpRequest();
        x.withCredentials=true;
        x.open("GET",await this.downloadForm.getDownloadUrl(this.downloadExt,start,end), true);
        x.responseType = 'blob';
        x.onload = function(e){
            if(THIS.downloadExt == "excel"){
                download(x.response,filename + ".xlsx","application/vnd.ms-excel");
            }else{//csv
                download(x.response,filename + ".csv","text/csv");
            }
            swal.close();
        }
        x.send();
        swal({
            title: "問卷紀錄輸出中",
            text: "系統正在導出指定格式的問卷紀錄，可能需要幾分鐘的時間，請勿關閉本視窗，完成後將自動開始下載",
            showConfirmButton: false
        });
        
    }
}