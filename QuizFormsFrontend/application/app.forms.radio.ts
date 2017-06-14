import { QuestionBase } from "./app.forms.questionBase";
import { Component, Output, EventEmitter, Input } from "@angular/core";

/**
 * 標題帶單選框的問題
 */
@Component({
  selector: 'app-forms-radio'.toLowerCase(),
  templateUrl: 'application/templates/app.forms.radio.html'
})
export class Radio extends QuestionBase {
    
}