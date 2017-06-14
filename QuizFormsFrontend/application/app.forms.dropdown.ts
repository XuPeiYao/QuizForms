import { QuestionBase } from "./app.forms.questionBase";
import { Component, Output, EventEmitter, Input } from "@angular/core";

/**
 * 標題帶單選框的問題
 */
@Component({
  selector: 'app-forms-dropdown'.toLowerCase(),
  templateUrl: 'application/templates/app.forms.dropdown.html'
})
export class Dropdown extends QuestionBase {
    
}