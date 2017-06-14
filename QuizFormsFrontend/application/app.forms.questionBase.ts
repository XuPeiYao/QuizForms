import { EventEmitter, Output, Input, Component } from "@angular/core";

export class QuestionBase {
        //#region result
    private _result : any;

    @Output()
    public resultChange : EventEmitter<any> = new EventEmitter<any>();
    public get result(){        
        return this._result;
    }

    public test(){
        console.log(this._result);
      console.log(this.createAnsObject(this.question));
    }
    public createAnsObject(q:QuizForms.Question):any{
        return QuestionBase.createAnsObject(q,this.result);
    }
    public static createAnsObject(q:QuizForms.Question,resultObj:any): any{
        var result = {};
        switch(q.type){
            case "InputText":
            case "InputNumber":
            case "Level":
            case "Dropdown"://單一數據集合
                result[q.id.toString()] = resultObj[q.id];
                break;
            case "Checkbox":
                if(q.children.length){
                    var tempAry = [];
                    for(var i = 0 ; i < q.children.length ;i++){
                        if( resultObj[q.children[i].id.toString()]){//子項目有被選擇!
                            tempAry.push(QuestionBase.createAnsObject(q.children[i],resultObj));
                        }
                    }
                    result[q.id.toString()] = tempAry;
                } else {
                    return q.id.toString();
                }
                break;
            case "Radio"://其他允許子項目控制項
                if(q.children.length){
                    var tempObj = {};
                    for(var i = 0 ; i < q.children.length ;i++){
                        var temp = QuestionBase.createAnsObject(q.children[i],resultObj);
                        for(var key in temp)tempObj[key] = temp[key];
                    }
                    result[q.id.toString()] = tempObj;
                } else {
                    return q.id.toString();
                }
                break;
            case "CheckboxGroup":
                var checked = q.children.filter(x=>resultObj[x.id.toString()])
                var tempAry = [];
                for(var i = 0 ; i < checked.length ; i++){
                    tempAry.push(QuestionBase.createAnsObject(checked[i],resultObj));
                }
                result[q.id.toString()] = tempAry;
                break;
            case "RadioGroup"://子系只能有Radio
                var selected = q.children.filter(x=>x.id == resultObj[q.id.toString()])[0];
                if(selected){
                    result[q.id.toString()] = QuestionBase.createAnsObject(selected,resultObj);
                }else{
                    result[q.id.toString()] = null;
                }
                break;
        }
        return result;
    }

    @Input()
    public set result(value: any){
        this._result = value;        
        this.resultChange.emit(value);
    }
    //#endregion

    public get ansObject(){
        return this.createAnsObject(this.question);
    }

    private _question: QuizForms.Question;
    
    @Output()
    public questionChange : EventEmitter<QuizForms.Question> = new EventEmitter<QuizForms.Question>();
    public get question():QuizForms.Question{
        return this._question;
    }

    @Input()
    public set question(value: QuizForms.Question){
        this._question = value;
        this.questionChange.emit(value);
    }

    private _name: string;
    
    @Output()
    public nameChange : EventEmitter<string> = new EventEmitter<string>();
    public get name():string{
        return this._name || this.id;
    }

    @Input()
    public set name(value: string){
        this._name = value;
        this.nameChange.emit(value);
    }


    /**
     * 取得唯一識別號
     */
    public get id():string{
        return "q_" + this.question.id;
    }   

    /**
     * 取得題目標題
     */
    public get text():string{
        return this.question.text;
    }

    /**
     * 取得子題目
     */
    public get children() : QuizForms.Question[]{
        return this.question.children;
    }
}