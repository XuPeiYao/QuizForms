System.register(["@angular/core", "./app.component.base"], function (exports_1, context_1) {
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
    var core_1, app_component_base_1, FormListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_component_base_1_1) {
                app_component_base_1 = app_component_base_1_1;
            }
        ],
        execute: function () {
            FormListComponent = (function (_super) {
                __extends(FormListComponent, _super);
                function FormListComponent() {
                    var _this = _super.call(this) || this;
                    (function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    this.startDate = new Date();
                                    this.endDate = new Date();
                                    this.isAdmin = location.search == "?admin";
                                    _a = this;
                                    return [4 /*yield*/, QuizForms.Form.getList()];
                                case 1:
                                    _a.forms = _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })();
                    return _this;
                }
                Object.defineProperty(FormListComponent.prototype, "isIE", {
                    get: function () {
                        return window['isIE'];
                    },
                    enumerable: true,
                    configurable: true
                });
                FormListComponent.prototype.gotoForm = function (form) {
                    return __awaiter(this, void 0, void 0, function () {
                        var writed, currentUser;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, form.isWrited()];
                                case 1:
                                    writed = _a.sent();
                                    return [4 /*yield*/, QuizForms.User.getCurrentUser()];
                                case 2:
                                    currentUser = _a.sent();
                                    if (currentUser.type != form.userType) {
                                        swal("不具有填寫權限", "此問卷有限定填寫身分，您無法填寫!", "error");
                                        return [2 /*return*/];
                                    }
                                    if (!form.rewriteable) {
                                        swal("此問卷您已經填寫過", "您已經填寫過這份問卷，本問卷無法重新填寫!", "error");
                                        return [2 /*return*/];
                                    }
                                    //檢查有沒有寫過的問卷
                                    if (writed && form.rewriteable) {
                                        swal({
                                            title: "此問卷您已經填寫過",
                                            text: "您已經填寫過這份問卷，您是否要刪除過去的紀錄以利進行填寫?",
                                            type: "warning",
                                            showCancelButton: true,
                                            confirmButtonText: "是",
                                            cancelButtonText: "否"
                                        }, function (isConfirm) {
                                            return __awaiter(this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!isConfirm) return [3 /*break*/, 2];
                                                            return [4 /*yield*/, form.clearSubmit()];
                                                        case 1:
                                                            _a.sent();
                                                            swal({
                                                                title: "已刪除",
                                                                text: "您之前所填寫的紀錄已經刪除，您可以重新填寫",
                                                                type: "success",
                                                                confirmButtonText: "是",
                                                            }, function () { return location.href = "form.html?id=" + form.id; });
                                                            _a.label = 2;
                                                        case 2: return [2 /*return*/];
                                                    }
                                                });
                                            });
                                        });
                                        return [2 /*return*/];
                                    }
                                    location.href = "form.html?id=" + form.id;
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                FormListComponent.prototype.downloadFormExcel = function (form) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.downloadForm = form;
                            this.downloadExt = "excel";
                            dialog.showModal();
                            return [2 /*return*/];
                        });
                    });
                };
                FormListComponent.prototype.downloadFormCSV = function (form) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.downloadForm = form;
                            this.downloadExt = "csv";
                            dialog.showModal();
                            return [2 /*return*/];
                        });
                    });
                };
                FormListComponent.prototype.close = function () {
                    dialog.close();
                };
                FormListComponent.prototype.download = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var start, end, filename, THIS, x, _a, _b, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    dialog.close();
                                    return [4 /*yield*/, QuizForms.User.getCurrentUser()];
                                case 1:
                                    if ((_d.sent()) == null) {
                                        location.href = "login.html" + location.search;
                                        return [2 /*return*/];
                                    }
                                    start = this.startDate, end = this.endDate;
                                    if (typeof this.startDate == "string") {
                                        start = new Date(this.startDate + "+0800");
                                    }
                                    if (typeof this.endDate == "string") {
                                        end = new Date(this.endDate + "+0800");
                                    }
                                    filename = "\u65B0\u751F\u554F\u5377\u7D00\u9304-" + this.downloadForm.name + "(" + start.format("yyyy-mm-dd HHMMss") + "\u81F3" + end.format("yyyy-mm-dd HHMMss") + ")";
                                    THIS = this;
                                    x = new XMLHttpRequest();
                                    x.withCredentials = true;
                                    _b = (_a = x).open;
                                    _c = ["GET"];
                                    return [4 /*yield*/, this.downloadForm.getDownloadUrl(this.downloadExt, start, end)];
                                case 2:
                                    _b.apply(_a, _c.concat([_d.sent(), true]));
                                    x.responseType = 'blob';
                                    x.onload = function (e) {
                                        if (THIS.downloadExt == "excel") {
                                            download(x.response, filename + ".xlsx", "application/vnd.ms-excel");
                                        }
                                        else {
                                            download(x.response, filename + ".csv", "text/csv");
                                        }
                                        swal.close();
                                    };
                                    x.send();
                                    swal({
                                        title: "問卷紀錄輸出中",
                                        text: "系統正在導出指定格式的問卷紀錄，可能需要幾分鐘的時間，請勿關閉本視窗，完成後將自動開始下載",
                                        showConfirmButton: false
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                return FormListComponent;
            }(app_component_base_1.ComponentBase));
            FormListComponent = __decorate([
                core_1.Component({
                    selector: 'app-components-formList'.toLowerCase(),
                    templateUrl: 'application/templates/app-components-formList.html'
                }),
                __metadata("design:paramtypes", [])
            ], FormListComponent);
            exports_1("FormListComponent", FormListComponent);
        }
    };
});
//# sourceMappingURL=app.components.formList.js.map