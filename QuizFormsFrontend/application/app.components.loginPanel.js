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
    var core_1, app_component_base_1, LoginPanelComponent;
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
            LoginPanelComponent = (function (_super) {
                __extends(LoginPanelComponent, _super);
                function LoginPanelComponent() {
                    var _this = _super.call(this) || this;
                    /**
                     * 使用者帳號
                     */
                    _this.user = "";
                    /**
                     * 使用者密碼
                     */
                    _this.password = "";
                    _this.panelTitle = "新生問卷系統";
                    _this.isAdmin = false;
                    _this.loading = false;
                    _this.data = {};
                    if (location.search == "?admin") {
                        _this.panelTitle += " - 管理登入";
                        _this.isAdmin = true;
                    }
                    (function () { return __awaiter(_this, void 0, void 0, function () {
                        var user;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, studentQuestion.User.getStatus()];
                                case 1:
                                    user = _a.sent();
                                    if (user) {
                                        location.href = "formList.html" + (user.isAdmin ? "?admin" : "");
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })();
                    return _this;
                }
                LoginPanelComponent.prototype.login = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.loading = true;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, studentQuestion.User.login(this.user, this.password, this.isAdmin)];
                                case 2:
                                    _a.sent();
                                    if (this.isAdmin) {
                                        location.href = "formList.html?admin";
                                        return [2 /*return*/];
                                    }
                                    location.href = "formList.html";
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_1 = _a.sent();
                                    this.loading = false;
                                    swal(e_1.name, e_1.message, "error");
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    });
                };
                return LoginPanelComponent;
            }(app_component_base_1.ComponentBase));
            LoginPanelComponent = __decorate([
                core_1.Component({
                    selector: 'app-components-loginPanel'.toLowerCase(),
                    templateUrl: 'application/templates/app-components-loginPanel.html'
                }),
                __metadata("design:paramtypes", [])
            ], LoginPanelComponent);
            exports_1("LoginPanelComponent", LoginPanelComponent);
        }
    };
});
//# sourceMappingURL=app.components.loginPanel.js.map