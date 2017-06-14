System.register(["@angular/core", "./app.component.base", "./app.forms.questionBase"], function (exports_1, context_1) {
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
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (this && this.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [0, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, app_component_base_1, app_forms_questionBase_1, FormBodyComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_component_base_1_1) {
                app_component_base_1 = app_component_base_1_1;
            },
            function (app_forms_questionBase_1_1) {
                app_forms_questionBase_1 = app_forms_questionBase_1_1;
            }
        ],
        execute: function () {
            FormBodyComponent = (function (_super) {
                __extends(FormBodyComponent, _super);
                function FormBodyComponent() {
                    var _this = _super.call(this) || this;
                    _this.grecaptchaObject = null;
                    _this.grecaptchaCode = null;
                    //#region result
                    _this._result = {};
                    _this.resultChange = new core_1.EventEmitter();
                    var THIS = _this;
                    _this.AfterContentInit = function () {
                        THIS.grecaptchaObject = grecaptcha.render(document.getElementById("g-recaptcha"), {
                            'sitekey': '6Le-fiQUAAAAANNi4jQ9oG8dO5suL02nJ_jr1KLE',
                            'callback': function (response) {
                                THIS.grecaptchaCode = response;
                            }
                        });
                    };
                    _this.load();
                    return _this;
                }
                Object.defineProperty(FormBodyComponent.prototype, "result", {
                    get: function () {
                        return this._result;
                    },
                    set: function (value) {
                        this._result = value;
                        this.resultChange.emit(value);
                    },
                    enumerable: true,
                    configurable: true
                });
                FormBodyComponent.prototype.test = function () {
                    console.log(JSON.stringify(this.createAnsObject()));
                };
                FormBodyComponent.prototype.createAnsObject = function () {
                    var result = {};
                    for (var i = 0; i < this.data.questions.length; i++) {
                        var qResult = app_forms_questionBase_1.QuestionBase.createAnsObject(this.data.questions[i], this.result);
                        var value = qResult[this.data.questions[i].id.toString()];
                        if (value) {
                            result[this.data.questions[i].id.toString()] = value;
                        }
                    }
                    return result;
                };
                //#endregion
                FormBodyComponent.prototype.getQueryParams = function () {
                    var temp = location.search.substring(1).split('&').map(function (x) { return x.split("="); });
                    var result = {};
                    for (var i = 0; i < temp.length; i++) {
                        result[temp[i][0]] = temp[i][1];
                    }
                    return result;
                };
                FormBodyComponent.prototype.load = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = this;
                                    return [4 /*yield*/, QuizForms.Form.get(this.getQueryParams()["id"])];
                                case 1:
                                    _a.data = _b.sent();
                                    return [4 /*yield*/, this.data.load()];
                                case 2:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                FormBodyComponent.prototype.sumbitDialog = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var THIS;
                        return __generator(this, function (_a) {
                            if (this.grecaptchaCode == null) {
                                swal("尚未進行機器人驗證", "在您送出此問卷前，您必須勾選「我不是機器人」選項", "error");
                                return [2 /*return*/];
                            }
                            THIS = this;
                            swal({
                                title: "確認送出",
                                text: "您確定要送出此問卷?",
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonText: "是",
                                cancelButtonText: "否",
                                closeOnConfirm: false
                            }, function (isConfirm) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var e_1;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!isConfirm) return [3 /*break*/, 4];
                                                _a.label = 1;
                                            case 1:
                                                _a.trys.push([1, 3, , 4]);
                                                swal({
                                                    title: "問卷送出中",
                                                    text: "系統正在紀錄您所填寫的問卷，請稍後",
                                                    showConfirmButton: false
                                                });
                                                return [4 /*yield*/, QuizForms.Form.submit(THIS.data, THIS.createAnsObject(), THIS.grecaptchaCode)];
                                            case 2:
                                                _a.sent();
                                                swal({
                                                    title: "已送出",
                                                    text: "感謝您的填寫，您的問卷已送出",
                                                    type: "success",
                                                    confirmButtonText: "是",
                                                }, function () { return location.href = "formList.html"; });
                                                return [3 /*break*/, 4];
                                            case 3:
                                                e_1 = _a.sent();
                                                grecaptcha.reset(); //重新驗證機器人
                                                swal(e_1.name, e_1.message, "error");
                                                return [3 /*break*/, 4];
                                            case 4: return [2 /*return*/];
                                        }
                                    });
                                });
                            });
                            return [2 /*return*/];
                        });
                    });
                };
                return FormBodyComponent;
            }(app_component_base_1.ComponentBase));
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], FormBodyComponent.prototype, "resultChange", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object),
                __metadata("design:paramtypes", [Object])
            ], FormBodyComponent.prototype, "result", null);
            FormBodyComponent = __decorate([
                core_1.Component({
                    selector: 'app-components-formBody'.toLowerCase(),
                    templateUrl: 'application/templates/app-components-formBody.html'
                }),
                __metadata("design:paramtypes", [])
            ], FormBodyComponent);
            exports_1("FormBodyComponent", FormBodyComponent);
        }
    };
});
//# sourceMappingURL=app.components.formBody.js.map