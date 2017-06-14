System.register(["@angular/core", "@angular/platform-browser", "./app.component.root", "./app.components.loginPanel", "@angular/http", "@angular/forms", "./app.components.logoutButton", "./app.components.formList", "./app.components.formBody", "./app.forms.inputText", "./app.forms.inputNumber", "./app.forms.level", "./app.forms.radioGroup", "./app.forms.radio", "./app.forms.checkboxGroup", "./app.forms.checkbox", "./app.forms.dropdown"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, platform_browser_1, app_component_root_1, app_components_loginPanel_1, http_1, forms_1, app_components_logoutButton_1, app_components_formList_1, app_components_formBody_1, app_forms_inputText_1, app_forms_inputNumber_1, app_forms_level_1, app_forms_radioGroup_1, app_forms_radio_1, app_forms_checkboxGroup_1, app_forms_checkbox_1, app_forms_dropdown_1, AppModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (app_component_root_1_1) {
                app_component_root_1 = app_component_root_1_1;
            },
            function (app_components_loginPanel_1_1) {
                app_components_loginPanel_1 = app_components_loginPanel_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (app_components_logoutButton_1_1) {
                app_components_logoutButton_1 = app_components_logoutButton_1_1;
            },
            function (app_components_formList_1_1) {
                app_components_formList_1 = app_components_formList_1_1;
            },
            function (app_components_formBody_1_1) {
                app_components_formBody_1 = app_components_formBody_1_1;
            },
            function (app_forms_inputText_1_1) {
                app_forms_inputText_1 = app_forms_inputText_1_1;
            },
            function (app_forms_inputNumber_1_1) {
                app_forms_inputNumber_1 = app_forms_inputNumber_1_1;
            },
            function (app_forms_level_1_1) {
                app_forms_level_1 = app_forms_level_1_1;
            },
            function (app_forms_radioGroup_1_1) {
                app_forms_radioGroup_1 = app_forms_radioGroup_1_1;
            },
            function (app_forms_radio_1_1) {
                app_forms_radio_1 = app_forms_radio_1_1;
            },
            function (app_forms_checkboxGroup_1_1) {
                app_forms_checkboxGroup_1 = app_forms_checkboxGroup_1_1;
            },
            function (app_forms_checkbox_1_1) {
                app_forms_checkbox_1 = app_forms_checkbox_1_1;
            },
            function (app_forms_dropdown_1_1) {
                app_forms_dropdown_1 = app_forms_dropdown_1_1;
            }
        ],
        execute: function () {
            AppModule = (function () {
                function AppModule() {
                }
                return AppModule;
            }());
            AppModule = __decorate([
                core_1.NgModule({
                    imports: [platform_browser_1.BrowserModule,
                        http_1.HttpModule,
                        forms_1.FormsModule
                    ],
                    declarations: [
                        app_component_root_1.AppRootComponent,
                        app_components_loginPanel_1.LoginPanelComponent,
                        app_components_logoutButton_1.LogoutButtonComponent,
                        app_components_formList_1.FormListComponent,
                        app_components_formBody_1.FormBodyComponent,
                        app_forms_inputText_1.InputText, app_forms_inputNumber_1.InputNumber, app_forms_level_1.Level, app_forms_radioGroup_1.RadioGroup, app_forms_radio_1.Radio,
                        app_forms_checkbox_1.Checkbox, app_forms_checkboxGroup_1.CheckboxGroup, app_forms_dropdown_1.Dropdown
                    ],
                    bootstrap: [app_component_root_1.AppRootComponent]
                })
            ], AppModule);
            exports_1("AppModule", AppModule);
        }
    };
});
//# sourceMappingURL=app.module.js.map