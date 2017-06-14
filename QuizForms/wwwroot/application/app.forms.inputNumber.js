System.register(["./app.forms.questionBase", "@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var app_forms_questionBase_1, core_1, InputNumber;
    return {
        setters: [
            function (app_forms_questionBase_1_1) {
                app_forms_questionBase_1 = app_forms_questionBase_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            InputNumber = (function (_super) {
                __extends(InputNumber, _super);
                function InputNumber() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return InputNumber;
            }(app_forms_questionBase_1.QuestionBase));
            InputNumber = __decorate([
                core_1.Component({
                    selector: 'app-forms-inputNumber'.toLowerCase(),
                    templateUrl: 'application/templates/app.forms.inputNumber.html'
                })
            ], InputNumber);
            exports_1("InputNumber", InputNumber);
        }
    };
});
//# sourceMappingURL=app.forms.inputNumber.js.map