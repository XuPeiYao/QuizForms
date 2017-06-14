import { QuestionBase } from "./app.forms.questionBase";
import { Component } from "@angular/core";

/**
 * 標題不帶單選框的問題
 */
@Component({
  selector: 'app-forms-radioGroup'.toLowerCase(),
  templateUrl: 'application/templates/app.forms.radioGroup.html'
})
export class RadioGroup extends QuestionBase {
    
}