import { QuestionBase } from "./app.forms.questionBase";
import { Component } from "@angular/core";

/**
 * 標題不帶核選框的問題
 */
@Component({
  selector: 'app-forms-checkboxgroup'.toLowerCase(),
  templateUrl: 'application/templates/app.forms.checkboxGroup.html'
})
export class CheckboxGroup extends QuestionBase {
    
}