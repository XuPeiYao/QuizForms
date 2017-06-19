var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
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
var QuizForms;
(function (QuizForms) {
    /**
     * 列表過濾
     */
    var ListFilters;
    (function (ListFilters) {
        /**
         * 所有問卷
         */
        ListFilters[ListFilters["All"] = 0] = "All";
        /**
         * 啟用的問卷
         */
        ListFilters[ListFilters["Enable"] = 1] = "Enable";
        /**
         * 關閉的問卷
         */
        ListFilters[ListFilters["Disable"] = 2] = "Disable";
    })(ListFilters = QuizForms.ListFilters || (QuizForms.ListFilters = {}));
    /**
     * 問卷
     */
    var Form = (function () {
        function Form() {
            /**
             * 填寫身分限制
             */
            this.userType = QuizForms.UserTypes.Null;
            /**
             * 是否已經寫過
             */
            this.writed = null;
        }
        /**
         * 取得問卷問題
         */
        Form.prototype.getQuestions = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!!this.questions) return [3 /*break*/, 2];
                            _a = this;
                            return [4 /*yield*/, Form.getQuestions(this)];
                        case 1:
                            _a.questions = _b.sent();
                            _b.label = 2;
                        case 2: return [2 /*return*/, this.questions];
                    }
                });
            });
        };
        /**
         * 是否已經寫過
         */
        Form.prototype.isWrited = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(this.writed == undefined || this.writed == null)) return [3 /*break*/, 2];
                            _a = this;
                            return [4 /*yield*/, Form.isWrited(this)];
                        case 1:
                            _a.writed = _b.sent();
                            _b.label = 2;
                        case 2: return [2 /*return*/, this.writed];
                    }
                });
            });
        };
        /**
         * 讀取完整問卷內容(如:問題)
         */
        Form.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getQuestions()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.isWrited()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 更新
         */
        Form.prototype.update = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Form.update(this)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 新增問題
         * @param question 問題
         */
        Form.prototype.addQuestion = function (question) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, QuizForms.Question.addToForm(this, question)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 送出問卷
         * @param data 問卷結果
         * @param code 機器人驗證
         */
        Form.prototype.submit = function (data, code) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Form.submit(this, data, code)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 清除目前登入使用者針對本問卷填寫紀錄
         */
        Form.prototype.clearSubmit = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Form.clearSubmit(this)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 取得下載網址
         * @param type 檔案類型
         * @param start 起始時間
         * @param end 結束時間
         */
        Form.prototype.getDownloadUrl = function (type, start, end) {
            if (end === void 0) { end = null; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Form.getDownloadUrl(this, type, start, end)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * 取得指定問卷
         * @param id 唯一識別號
         */
        Form.get = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, QuizForms.createHttpClient().getAsync(QuizForms.SystemVars.apiUrl + "form/" + id)];
                        case 1:
                            response = (_a.sent()).toJSON();
                            return [2 /*return*/, Form.loadFromJSON(response.result)];
                    }
                });
            });
        };
        /**
         * 取得問卷列表
         * @param filter 篩選方式
         */
        Form.getList = function (filter) {
            if (filter === void 0) { filter = ListFilters.All; }
            return __awaiter(this, void 0, void 0, function () {
                var response, result, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, QuizForms.createHttpClient().getAsync(QuizForms.SystemVars.apiUrl + "form/list", null, {
                                filter: ListFilters[filter]
                            })];
                        case 1:
                            response = (_a.sent()).toJSON().result;
                            result = [];
                            for (i = 0; i < response.length; i++) {
                                result.push(Form.loadFromJSON(response[i]));
                            }
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * 取得指定問卷所有問題
         * @param form 問卷
         */
        Form.getQuestions = function (form) {
            return __awaiter(this, void 0, void 0, function () {
                var response, result, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, QuizForms.createHttpClient().getAsync(QuizForms.SystemVars.apiUrl + "question/list/" + form.id)];
                        case 1:
                            response = (_a.sent()).toJSON().result;
                            result = [];
                            for (i = 0; i < response.length; i++) {
                                result.push(QuizForms.Question.loadFromJSON(response[i]));
                            }
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * 取得問卷是否已經寫過
         * @param form 問卷
         */
        Form.isWrited = function (form) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, QuizForms.createHttpClient().getAsync(QuizForms.SystemVars.apiUrl + "form/" + form.id + "/isWrited")];
                        case 1:
                            response = (_a.sent()).toJSON();
                            return [2 /*return*/, response.result];
                    }
                });
            });
        };
        /**
         * 建立新的問卷
         * @param name 名稱
         * @param rewriteable 是否可以重寫問卷
         * @param order 顯示順序
         */
        Form.create = function (name, anonymous, userType, rewriteable, order) {
            if (anonymous === void 0) { anonymous = true; }
            if (userType === void 0) { userType = QuizForms.UserTypes.Null; }
            if (rewriteable === void 0) { rewriteable = false; }
            if (order === void 0) { order = null; }
            return __awaiter(this, void 0, void 0, function () {
                var postData, client, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            postData = {
                                name: name,
                                anonymous: anonymous,
                                userType: userType,
                                rewriteable: rewriteable
                            };
                            if (order)
                                postData['order'] = order;
                            client = QuizForms.createHttpClient();
                            return [4 /*yield*/, client.postAsync(QuizForms.SystemVars.apiUrl + "form", null, postData)];
                        case 1:
                            response = (_a.sent()).toJSON();
                            return [2 /*return*/, Form.loadFromJSON(response.result)];
                    }
                });
            });
        };
        /**
         * 新增問卷
         * @param form 問卷
         */
        Form.add = function (form) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Form.create(form.name, form.anonymous, form.userType, form.rewriteable, form.order)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 刪除問卷
         * @param form 問卷
         */
        Form.delete = function (form) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, QuizForms.createHttpClient().deleteAsync(QuizForms.SystemVars.apiUrl + "form/" + form.id)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 更新問卷
         * @param form 問卷
         */
        Form.update = function (form) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, QuizForms.createHttpClient().putAsync(QuizForms.SystemVars.apiUrl + "form/" + form.id, null, {
                                enable: form.enable,
                                order: form.order,
                                rewriteable: form.rewriteable,
                                name: form.name
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 送出問卷
         * @param form 問卷
         * @param data 填寫資料
         * @param code 機器人驗證
         */
        Form.submit = function (form, data, code) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, QuizForms.createHttpClient().postAsync(QuizForms.SystemVars.apiUrl + "record/" + form.id, null, {
                                formJsonString: JSON.stringify(data),
                                code: code
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 清除目前登入使用者針對本問卷填寫紀錄
         * @param form 問卷
         */
        Form.clearSubmit = function (form) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, QuizForms.createHttpClient().deleteAsync(QuizForms.SystemVars.apiUrl + "record/" + (form.id || form) + "/self")];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 取得下載網址
         * @param form 問卷
         * @param type 檔案類型
         * @param start 起始時間
         * @param end 結束時間
         */
        Form.getDownloadUrl = function (form, type, start, end) {
            if (end === void 0) { end = null; }
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    result = QuizForms.SystemVars.apiUrl + "record/download/" + (form.id || form) + "?type=" + type + "&start=" + start.getTime();
                    if (end) {
                        result += "&end=" + end.getTime();
                    }
                    return [2 /*return*/, result];
                });
            });
        };
        Form.loadFromJSON = function (json) {
            var result = QuizForms.loadFromJSON(Form, json);
            result.userType = QuizForms.UserTypes[result.userType];
            return result;
        };
        return Form;
    }());
    QuizForms.Form = Form;
})(QuizForms || (QuizForms = {}));
var QuizForms;
(function (QuizForms) {
    var HttpClient = (function () {
        function HttpClient() {
            this.requestHeader = null;
            this.withCredentials = false;
        }
        HttpClient.prototype.typeOf = function (obj) {
            if (!obj)
                return obj;
            return obj.constructor.name;
        };
        HttpClient.prototype.openAndSend = function (method, url, header, data, user, password, progressCallback) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var xhr = new XMLHttpRequest();
                            //#region 事件與屬性
                            xhr.withCredentials = _this.withCredentials;
                            xhr.onprogress = progressCallback || _this.progressCallback;
                            xhr.onreadystatechange = function (event) {
                                if (xhr.readyState !== 4)
                                    return;
                                if (xhr.status >= 200 && xhr.status < 300) {
                                    var result = new HttpResponse();
                                    result.header = xhr.getAllResponseHeaders();
                                    result.statusCode = xhr.status;
                                    result.resultType = xhr.responseType;
                                    result.resultText = xhr.responseText;
                                    result.resultXML = xhr.responseXML;
                                    result.result = xhr.response;
                                    resolve(result);
                                }
                                else {
                                    reject(xhr.statusText);
                                }
                            };
                            //#endregion
                            if (method == "GET" || method == "DELETE") {
                                var params = new Array();
                                for (var key in data)
                                    params.push(key + "=" + encodeURIComponent(data[key]));
                                url += "?" + params.join("&");
                            }
                            xhr.open(method, url, true, user || _this.user, password || _this.password);
                            //#region 設定Header
                            if (_this.requestHeader)
                                for (var key in _this.requestHeader)
                                    xhr.setRequestHeader(key, _this.requestHeader[key]);
                            if (header)
                                for (var key in header)
                                    xhr.setRequestHeader(key, header[key]);
                            //#endregion
                            if (data) {
                                if (data instanceof FormData || _this.typeOf(data) == 'String') {
                                    xhr.send(data);
                                }
                                else {
                                    if (method == "GET" || method == "DELETE") {
                                        xhr.send();
                                    }
                                    else if (new FormData()['fake']) {
                                        var qString = "";
                                        for (var key in data) {
                                            if (data[key] instanceof Function)
                                                continue;
                                            qString += "&" + key + "=" + encodeURIComponent(data[key]);
                                        }
                                        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
                                        xhr.send(qString.substring(1));
                                    }
                                    else {
                                        var formdata = new FormData();
                                        for (var key in data) {
                                            if (data[key] instanceof Function)
                                                continue;
                                            formdata.append(key, data[key]);
                                        }
                                        xhr.send(formdata);
                                    }
                                }
                            }
                            else {
                                xhr.send();
                            }
                        })];
                });
            });
        };
        HttpClient.prototype.getAsync = function (url, header, data, user, password, progressCallback) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.openAndSend('GET', url, header, data, user, password, progressCallback)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        HttpClient.prototype.postAsync = function (url, header, data, user, password, progressCallback) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.openAndSend('POST', url, header, data, user, password, progressCallback)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        HttpClient.prototype.putAsync = function (url, header, data, user, password, progressCallback) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.openAndSend('PUT', url, header, data, user, password, progressCallback)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        HttpClient.prototype.deleteAsync = function (url, header, data, user, password, progressCallback) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.openAndSend('DELETE', url, header, data, user, password, progressCallback)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return HttpClient;
    }());
    QuizForms.HttpClient = HttpClient;
    var HttpResponse = (function () {
        function HttpResponse() {
        }
        HttpResponse.prototype.toJSON = function (handler) {
            var result = JSON.parse(this.resultText);
            console.log(result);
            if (handler) {
                handler(result);
            }
            else if (HttpResponse.defaultJSONHandler) {
                HttpResponse.defaultJSONHandler(result);
            }
            return result;
        };
        return HttpResponse;
    }());
    HttpResponse.defaultJSONHandler = null;
    QuizForms.HttpResponse = HttpResponse;
})(QuizForms || (QuizForms = {}));
var QuizForms;
(function (QuizForms) {
    /**
     * 題目類型
     */
    var QuestionTypes;
    (function (QuestionTypes) {
        /**
         * 多選一
         */
        QuestionTypes[QuestionTypes["RadioGroup"] = 0] = "RadioGroup";
        /**
         * 多選一的選項
         */
        QuestionTypes[QuestionTypes["Radio"] = 1] = "Radio";
        /**
         * 行內多選一(下拉式清單) 以{options}標記
         */
        QuestionTypes[QuestionTypes["Dropdown"] = 2] = "Dropdown";
        /**
         * 多選勾選框群組
         */
        QuestionTypes[QuestionTypes["CheckboxGroup"] = 3] = "CheckboxGroup";
        /**
         * 多選勾選框
         */
        QuestionTypes[QuestionTypes["Checkbox"] = 4] = "Checkbox";
        /**
         * 五等級多選一
         */
        QuestionTypes[QuestionTypes["Level"] = 5] = "Level";
        /**
         * 文字輸入框
         */
        QuestionTypes[QuestionTypes["InputText"] = 6] = "InputText";
        /** <summary>
         * 數字輸入框
         */
        QuestionTypes[QuestionTypes["InputNumber"] = 7] = "InputNumber";
        /** <summary>
         * 標題字
         */
        QuestionTypes[QuestionTypes["Title"] = 8] = "Title";
        /** <summary>
         * 普通內文
         */
        QuestionTypes[QuestionTypes["Text"] = 9] = "Text";
    })(QuestionTypes = QuizForms.QuestionTypes || (QuizForms.QuestionTypes = {}));
    /**
     * 題目
     */
    var Question = (function () {
        function Question() {
        }
        Object.defineProperty(Question.prototype, "typeString", {
            /**
             * 類型字串表示
             */
            get: function () {
                return QuestionTypes[this.type];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 取得子題目
         */
        Question.prototype.getChildren = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!!this.children) return [3 /*break*/, 2];
                            _a = this;
                            return [4 /*yield*/, Question.getChildren(this)];
                        case 1:
                            _a.children = _b.sent();
                            _b.label = 2;
                        case 2: return [2 /*return*/, this.children];
                    }
                });
            });
        };
        /**
         * 新增子題目
         * @param question 子題目
         */
        Question.prototype.addChildren = function (question) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Question.add(this, question)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 取得題目的子題目
         * @param question 題目
         */
        Question.getChildren = function (question) {
            return __awaiter(this, void 0, void 0, function () {
                var response, result, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, QuizForms.createHttpClient().getAsync(QuizForms.SystemVars.apiUrl + "question/list/" + (question.id || question))];
                        case 1:
                            response = (_a.sent()).toJSON().result;
                            result = [];
                            for (i = 0; i < response.length; i++) {
                                result.push(Question.loadFromJSON(response[i]));
                            }
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * 建立子問題至指定的問題下
         * @param form 問卷
         * @param parent 父問題
         * @param type 類型
         * @param text 文字
         * @param order 顯示順序
         */
        Question.create = function (form, parent, type, text, order) {
            if (order === void 0) { order = null; }
            return __awaiter(this, void 0, void 0, function () {
                var postData, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            postData = {
                                text: text,
                                type: QuestionTypes[type]
                            };
                            if (order != null)
                                postData['order'] = order;
                            if (!parent) return [3 /*break*/, 2];
                            return [4 /*yield*/, QuizForms.createHttpClient().postAsync(QuizForms.SystemVars.apiUrl + "question/" + (form.id || form) + "/" + (parent.id || parent), null, postData)];
                        case 1:
                            response = _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, QuizForms.createHttpClient().postAsync(QuizForms.SystemVars.apiUrl + "question/" + (form.id || form), null, postData)];
                        case 3:
                            response = _a.sent();
                            _a.label = 4;
                        case 4:
                            response = response.result;
                            return [2 /*return*/, Question.loadFromJSON(response.result)];
                    }
                });
            });
        };
        /**
         * 建立子問題至指定的問題下
         * @param parent 父問題
         * @param newInstance 新問題
         */
        Question.add = function (parent, question) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, parent.getChildren()];
                        case 1:
                            _d.sent();
                            _b = (_a = parent.children).push;
                            return [4 /*yield*/, Question.create(parent.formId, parent, question.type, question.text, question.order)];
                        case 2:
                            _b.apply(_a, [_d.sent()]);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 加入新問題至問卷
         * @param form 問卷
         * @param question 問題
         */
        Question.addToForm = function (form, question) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, form.getQuestions()];
                        case 1:
                            _d.sent();
                            _b = (_a = form.questions).push;
                            return [4 /*yield*/, Question.create((form.id || form), null, question.type, question.text, question.order)];
                        case 2:
                            _b.apply(_a, [_d.sent()]);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 刪除指定的問題
         * @param question 問題
         */
        Question.remove = function (question) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, QuizForms.createHttpClient().deleteAsync(QuizForms.SystemVars.apiUrl + "question/" + question.id)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Question.loadFromJSON = function (json) {
            var result = QuizForms.loadFromJSON(Question, json);
            result.type = QuestionTypes[result.type];
            return result;
        };
        return Question;
    }());
    QuizForms.Question = Question;
})(QuizForms || (QuizForms = {}));
var QuizForms;
(function (QuizForms) {
    QuizForms.SystemVars = {
        get origin() {
            if (!window.location.origin) {
                (window.location).origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
            }
            return location.origin;
        },
        get apiUrl() {
            return location.origin + "/api/";
        },
        onException: function (e) { },
        disableException: false
    };
    function createHttpClient() {
        var client = new QuizForms.HttpClient();
        client.withCredentials = true;
        return client;
    }
    QuizForms.createHttpClient = createHttpClient;
    function loadFromJSON(type, json) {
        var result = new type;
        for (var key in json) {
            result[key] = json[key];
        }
        return result;
    }
    QuizForms.loadFromJSON = loadFromJSON;
})(QuizForms || (QuizForms = {}));
QuizForms.HttpResponse.defaultJSONHandler = function (json) {
    if (json.success)
        return;
    if (QuizForms.SystemVars.disableException)
        return;
    var exception = {
        name: "錯誤",
        message: json.result
    };
    QuizForms.SystemVars.onException(exception);
    throw exception;
};
var QuizForms;
(function (QuizForms) {
    var UserTypes;
    (function (UserTypes) {
        /**
         * 未登入
         */
        UserTypes[UserTypes["Null"] = -1] = "Null";
        /**
         * 未登入
         */
        UserTypes[UserTypes["Normal"] = 0] = "Normal";
        /**
         * 管理者
         */
        UserTypes[UserTypes["Admin"] = 1] = "Admin";
        /**
         * 系統管理者
         */
        UserTypes[UserTypes["TopAdmin"] = 2] = "TopAdmin";
    })(UserTypes = QuizForms.UserTypes || (QuizForms.UserTypes = {}));
    /**
     * 使用者資訊
     */
    var User = (function () {
        function User() {
        }
        Object.defineProperty(User.prototype, "isAdmin", {
            /**
             * 是否為系統管理員
             */
            get: function () {
                return this.type == UserTypes.Admin || this.type == UserTypes.TopAdmin;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 登入並取得使用者資訊
         * @param id 唯一識別號
         * @param password 密碼
         * @param isAdmin 是否取得管理權限
         */
        User.login = function (id, password, isAdmin) {
            if (isAdmin === void 0) { isAdmin = false; }
            return __awaiter(this, void 0, void 0, function () {
                var client, response, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            client = QuizForms.createHttpClient();
                            return [4 /*yield*/, client.postAsync(QuizForms.SystemVars.apiUrl + "user/status", null, {
                                    id: id,
                                    password: password,
                                    isAdmin: isAdmin
                                })];
                        case 1:
                            response = _a.sent();
                            result = User.loadFromJSON(response.toJSON().result);
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        User.loadFromJSON = function (json) {
            var result = QuizForms.loadFromJSON(User, json);
            result.type = UserTypes[result.type];
            return result;
        };
        /**
         * 取得目前登入的使用者資訊
         */
        User.getCurrentUser = function () {
            return __awaiter(this, void 0, void 0, function () {
                var client, response, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            client = QuizForms.createHttpClient();
                            return [4 /*yield*/, client.getAsync(QuizForms.SystemVars.apiUrl + "user/status")];
                        case 1:
                            response = _a.sent();
                            result = response.toJSON().result;
                            if (result == null)
                                return [2 /*return*/, null];
                            result = User.loadFromJSON(result);
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * 取得目前是否登入中
         */
        User.isLogin = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, User.getCurrentUser()];
                        case 1: return [2 /*return*/, (_a.sent()) != null];
                    }
                });
            });
        };
        /**
         * 登出目前使用身分
         */
        User.logout = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, QuizForms.createHttpClient().deleteAsync(QuizForms.SystemVars.apiUrl + "user/status")];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return User;
    }());
    QuizForms.User = User;
})(QuizForms || (QuizForms = {}));
//# sourceMappingURL=quizForms.js.map