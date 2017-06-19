import { Component, Input, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import { ComponentBase } from "./app.component.base";
import { QuestionBase } from "./app.forms.questionBase";
declare var componentHandler,swal,grecaptcha;
@Component({
  selector: 'app-components-formBody'.toLowerCase(),
  templateUrl: 'application/templates/app-components-formBody.html'
})
export class FormBodyComponent extends ComponentBase {
    constructor(){
      super();
      var THIS = this;
      this.AfterContentInit = function(){
            THIS.grecaptchaObject = grecaptcha.render(document.getElementById("g-recaptcha"), {
                'sitekey' : 'KEY',
                'callback' : function(response) {
                    THIS.grecaptchaCode = response;
                }
            });
      }
      this.load();
    }
    private grecaptchaObject  = null;
    private grecaptchaCode : string = null;
    //#region result
    private _result : any = {};

    @Output()
    public resultChange : EventEmitter<any> = new EventEmitter<any>();
    public get result(){        
        return this._result;
    }

    public test() : any{
        console.log(JSON.stringify(this.createAnsObject()));
    }
    public createAnsObject(): any{
        var result = {};
        for(var i = 0 ; i < this.data.questions.length ; i++){
           var qResult = QuestionBase.createAnsObject(this.data.questions[i],this.result);
           var value = qResult[this.data.questions[i].id.toString()];
           if(value){
              result[this.data.questions[i].id.toString()] = value;
           }
        }
        return result;
    }

    
    @Input()
    public set result(value: any){
        this._result = value;        
        this.resultChange.emit(value);
    }
    //#endregion

    public getQueryParams():any{
      var temp = location.search.substring(1).split('&').map(x=>x.split("="));
      var result = {};
      for(var i = 0 ;i < temp.length ; i++){
        result[temp[i][0]] = temp[i][1];
      }
      return result;
    }
    public async load():Promise<void>{
      this.data = await QuizForms.Form.get(this.getQueryParams()["id"]);
      await this.data.load();
    }

    public async sumbitDialog(){
        /*if(this.grecaptchaCode == null){
            swal("尚未進行機器人驗證", "在您送出此問卷前，您必須勾選「我不是機器人」選項", "error");
            return;
        }*/
        var THIS = this;
        swal({
           title: "確認送出",
           text: "您確定要送出此問卷?",
           type: "warning",
           showCancelButton: true,
           confirmButtonText: "是",
           cancelButtonText: "否",
           closeOnConfirm: false
        },
        async function(isConfirm){
           if (isConfirm) {
               try{
                   swal({
                        title: "問卷送出中",
                        text: "系統正在紀錄您所填寫的問卷，請稍後",
                        showConfirmButton: false
                   });
                   await QuizForms.Form.submit(THIS.data, THIS.createAnsObject(),THIS.grecaptchaCode);
                   swal({
                            title: "已送出",
                            text:"感謝您的填寫，您的問卷已送出",
                            type: "success",
                            confirmButtonText: "是",
                   },()=>location.href="formList.html");
               }catch(e){
                   grecaptcha.reset();//重新驗證機器人
                   swal(e.name, e.message, "error")
               }
            }
         });
    }
}