﻿module QuizForms {
    /**
     * 列表過濾
     */
    export enum ListFilters {
        /**
         * 所有問卷
         */
        All,
        /**
         * 啟用的問卷
         */
        Enable,
        /**
         * 關閉的問卷
         */
        Disable
    }
    /**
     * 問卷
     */
    export class Form {
        /**
         * 唯一識別號
         */
        public id: any;

        /**
         * 名稱
         */
        public name: string;

        /**
         * 是否啟用
         */
        public enable: boolean;

        /**
         * 填寫身分限制
         */
        public userType: UserTypes = UserTypes.Null;

        /**
         * 可否重新填寫
         */
        public rewriteable: boolean;

        /**
         * 是否為匿名問卷
         */
        public anonymous: boolean;

        /**
         * 顯示順序
         */
        public order: number;

        /**
         * 問卷題目
         */
        public questions: Question[];

        /**
         * 是否已經寫過
         */
        public writed: boolean = null;

        /**
         * 取得問卷問題
         */
        public async getQuestions() : Promise<Question[]> {
            if (!this.questions) {
                this.questions = await Form.getQuestions(this);
            }
            return this.questions;
        }

        /**
         * 是否已經寫過
         */
        public async isWrited(): Promise<boolean> {
            if (this.writed == undefined || this.writed == null) {
                this.writed = await Form.isWrited(this);
            }
            return this.writed;
        }

        /**
         * 讀取完整問卷內容(如:問題)
         */
        public async load(): Promise<void> {
            await this.getQuestions();
            await this.isWrited();
        }

        /**
         * 更新
         */
        public async update(): Promise<void> {
            await Form.update(this);
        }

        /**
         * 新增問題
         * @param question 問題
         */
        public async addQuestion(question: Question): Promise<void> {
            await Question.addToForm(this, question);
        }

        /**
         * 送出問卷
         * @param data 問卷結果
         * @param code 機器人驗證
         */
        public async submit(data: string, code: string): Promise<void> {
            await Form.submit(this, data, code);
        }

        /**
         * 清除目前登入使用者針對本問卷填寫紀錄
         */
        public async clearSubmit(): Promise<void> {
            await Form.clearSubmit(this);
        }

        /**
         * 取得下載網址
         * @param type 檔案類型
         * @param start 起始時間
         * @param end 結束時間
         */
        public async getDownloadUrl(type: "csv" | "excel", start: Date, end: Date = null): Promise<string> {
            return await Form.getDownloadUrl(this, type, start, end);
        }

        /**
         * 取得指定問卷
         * @param id 唯一識別號
         */
        public static async get(id: any): Promise<Form> {
            var response = (await createHttpClient().getAsync(SystemVars.apiUrl + "form/" + id)).toJSON();

            return Form.loadFromJSON(response.result);
        }

        /**
         * 取得問卷列表
         * @param filter 篩選方式
         */
        public static async getList(filter: ListFilters = ListFilters.All): Promise<Form[]> {
            var response = (await createHttpClient().getAsync(SystemVars.apiUrl + "form/list", null, {
                filter: ListFilters[filter]
            })).toJSON().result;

            var result = [];
            for (var i = 0; i < response.length; i++) {
                result.push(Form.loadFromJSON(response[i]));
            }

            return result;
        }

        /**
         * 取得指定問卷所有問題
         * @param form 問卷
         */
        public static async getQuestions(form: Form): Promise<Question[]> {
            var response = (await createHttpClient().getAsync(SystemVars.apiUrl + "question/list/" + form.id)).toJSON().result;

            var result = [];
            for (var i = 0; i < response.length; i++) {
                result.push(Question.loadFromJSON(response[i]));
            }

            return result;
        }

        /**
         * 取得問卷是否已經寫過
         * @param form 問卷
         */
        public static async isWrited(form: Form): Promise<boolean> {
            var response = (await createHttpClient().getAsync(SystemVars.apiUrl + "form/" + form.id + "/isWrited")).toJSON();

            return response.result;
        }

        /**
         * 建立新的問卷
         * @param name 名稱
         * @param rewriteable 是否可以重寫問卷
         * @param order 顯示順序
         */
        public static async create(name: string, anonymous: boolean = true, userType: UserTypes = UserTypes.Null, rewriteable: boolean = false, order: number = null)
            : Promise<Form>{
            var postData = {
                name: name,
                anonymous: anonymous,
                userType: userType,
                rewriteable: rewriteable
            };
            if (order) postData['order'] = order;

            var client = createHttpClient();
            var response = (await client.postAsync(SystemVars.apiUrl + "form", null, postData)).toJSON();

            return Form.loadFromJSON(response.result);
        }

        /**
         * 新增問卷
         * @param form 問卷
         */
        public static async add(form: Form): Promise<void> {
            await Form.create(form.name, form.anonymous, form.userType, form.rewriteable, form.order);
        }

        /**
         * 刪除問卷
         * @param form 問卷
         */
        public static async delete(form: Form): Promise<void> {
            await createHttpClient().deleteAsync(SystemVars.apiUrl + "form/" + form.id);
        }

        /**
         * 更新問卷
         * @param form 問卷
         */
        public static async update(form: Form): Promise<void> {
            await createHttpClient().putAsync(SystemVars.apiUrl + "form/" + form.id, null, {
                enable: form.enable,
                order: form.order,
                rewriteable: form.rewriteable,
                name: form.name
            });
        }

        /**
         * 送出問卷
         * @param form 問卷
         * @param data 填寫資料
         * @param code 機器人驗證
         */
        public static async submit(form: Form, data: any, code : string): Promise<void> {
            await createHttpClient().postAsync(SystemVars.apiUrl + "record/" + form.id, null, {
                formJsonString: JSON.stringify(data),
                code: code
            });
        }

        /**
         * 清除目前登入使用者針對本問卷填寫紀錄
         * @param form 問卷
         */
        public static async clearSubmit(form: Form): Promise<void> {
            await createHttpClient().deleteAsync(SystemVars.apiUrl + "record/" + (form.id || form) + "/self");
        }

        /**
         * 取得下載網址
         * @param form 問卷
         * @param type 檔案類型
         * @param start 起始時間
         * @param end 結束時間
         */
        public static async getDownloadUrl(form: Form, type: "csv" | "excel", start: Date, end: Date = null): Promise<string> {
            var result = SystemVars.apiUrl + "record/download/" + (form.id || form) + "?type=" + type + "&start=" + start.getTime();
            if (end) {
                result += "&end=" + end.getTime();
            }
            return result;
        }
        public static loadFromJSON(json: any): Form {
            var result = <Form>loadFromJSON(Form, json);
            result.userType = <UserTypes><any>UserTypes[result.userType];
            return result;
        }
    }
}