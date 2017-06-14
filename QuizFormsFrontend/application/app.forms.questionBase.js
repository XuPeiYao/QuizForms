System.register(["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, QuestionBase;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            QuestionBase = (function () {
                function QuestionBase() {
                    this.resultChange = new core_1.EventEmitter();
                    this.questionChange = new core_1.EventEmitter();
                    this.nameChange = new core_1.EventEmitter();
                }
                Object.defineProperty(QuestionBase.prototype, "result", {
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
                QuestionBase.prototype.test = function () {
                    console.log(this._result);
                    console.log(this.createAnsObject(this.question));
                };
                QuestionBase.prototype.createAnsObject = function (q) {
                    return QuestionBase.createAnsObject(q, this.result);
                };
                QuestionBase.createAnsObject = function (q, resultObj) {
                    var result = {};
                    switch (q.type) {
                        case "InputText":
                        case "InputNumber":
                        case "Level":
                        case "Dropdown":
                            result[q.id.toString()] = resultObj[q.id];
                            break;
                        case "Checkbox":
                            if (q.children.length) {
                                var tempAry = [];
                                for (var i = 0; i < q.children.length; i++) {
                                    if (resultObj[q.children[i].id.toString()]) {
                                        tempAry.push(QuestionBase.createAnsObject(q.children[i], resultObj));
                                    }
                                }
                                result[q.id.toString()] = tempAry;
                            }
                            else {
                                return q.id.toString();
                            }
                            break;
                        case "Radio":
                            if (q.children.length) {
                                var tempObj = {};
                                for (var i = 0; i < q.children.length; i++) {
                                    var temp = QuestionBase.createAnsObject(q.children[i], resultObj);
                                    for (var key in temp)
                                        tempObj[key] = temp[key];
                                }
                                result[q.id.toString()] = tempObj;
                            }
                            else {
                                return q.id.toString();
                            }
                            break;
                        case "CheckboxGroup":
                            var checked = q.children.filter(function (x) { return resultObj[x.id.toString()]; });
                            var tempAry = [];
                            for (var i = 0; i < checked.length; i++) {
                                tempAry.push(QuestionBase.createAnsObject(checked[i], resultObj));
                            }
                            result[q.id.toString()] = tempAry;
                            break;
                        case "RadioGroup":
                            var selected = q.children.filter(function (x) { return x.id == resultObj[q.id.toString()]; })[0];
                            if (selected) {
                                result[q.id.toString()] = QuestionBase.createAnsObject(selected, resultObj);
                            }
                            else {
                                result[q.id.toString()] = null;
                            }
                            break;
                    }
                    return result;
                };
                Object.defineProperty(QuestionBase.prototype, "ansObject", {
                    //#endregion
                    get: function () {
                        return this.createAnsObject(this.question);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(QuestionBase.prototype, "question", {
                    get: function () {
                        return this._question;
                    },
                    set: function (value) {
                        this._question = value;
                        this.questionChange.emit(value);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(QuestionBase.prototype, "name", {
                    get: function () {
                        return this._name || this.id;
                    },
                    set: function (value) {
                        this._name = value;
                        this.nameChange.emit(value);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(QuestionBase.prototype, "id", {
                    /**
                     * 取得唯一識別號
                     */
                    get: function () {
                        return "q_" + this.question.id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(QuestionBase.prototype, "text", {
                    /**
                     * 取得題目標題
                     */
                    get: function () {
                        return this.question.text;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(QuestionBase.prototype, "children", {
                    /**
                     * 取得子題目
                     */
                    get: function () {
                        return this.question.children;
                    },
                    enumerable: true,
                    configurable: true
                });
                return QuestionBase;
            }());
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], QuestionBase.prototype, "resultChange", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object),
                __metadata("design:paramtypes", [Object])
            ], QuestionBase.prototype, "result", null);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], QuestionBase.prototype, "questionChange", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", QuizForms.Question),
                __metadata("design:paramtypes", [QuizForms.Question])
            ], QuestionBase.prototype, "question", null);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], QuestionBase.prototype, "nameChange", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", String),
                __metadata("design:paramtypes", [String])
            ], QuestionBase.prototype, "name", null);
            exports_1("QuestionBase", QuestionBase);
        }
    };
});
//# sourceMappingURL=app.forms.questionBase.js.map