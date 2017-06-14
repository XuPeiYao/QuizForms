import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRootComponent } from './app.component.root';
import { LoginPanelComponent } from "./app.components.loginPanel";
import { HttpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';
import { LogoutButtonComponent } from "./app.components.logoutButton";
import { FormListComponent } from "./app.components.formList";
import { FormBodyComponent } from "./app.components.formBody";
import { InputText } from "./app.forms.inputText";
import { InputNumber } from "./app.forms.inputNumber";
import { Level } from "./app.forms.level";
import { RadioGroup } from "./app.forms.radioGroup";
import { Radio } from "./app.forms.radio";
import { CheckboxGroup } from "./app.forms.checkboxGroup";
import { Checkbox } from "./app.forms.checkbox";
import { Dropdown } from "./app.forms.dropdown";

@NgModule({
  imports:      [ BrowserModule,
                  HttpModule  ,
                  FormsModule
                ],
  declarations: [ 
    AppRootComponent,
    LoginPanelComponent,
    LogoutButtonComponent,
    FormListComponent,
    FormBodyComponent,
    InputText,InputNumber,Level,RadioGroup,Radio,
    Checkbox,CheckboxGroup,Dropdown
  ],
  bootstrap:    [ AppRootComponent ]
})
export class AppModule { }