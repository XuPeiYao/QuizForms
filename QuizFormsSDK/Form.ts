module QuizForms {
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
         * 可否重新填寫
         */
        public rewriteable: boolean;

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
         * 取得指定問卷
         * @param id 唯一識別號
         */
        public static async get(id: any): Promise<Form> {
            var response = (await createHttpClient().getAsync(SystemVars.apiUrl + "form/" + id)).toJSON();

            return loadFromJSON(Form, response.result);
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
                result.push(Form, response[i]);
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
                result.push(Question, response[i]);
            }

            return result;
        }

        /**
         * 取得問卷是否已經寫過
         * @param form 問卷
         */
        public static async isWrited(form: Form): Promise<boolean> {
            var response = (await createHttpClient().getAsync(SystemVars.apiUrl + "form/" + form.id + "/isWrited")).toJSON().result;

            return response.result;
        }

        /**
         * 建立新的問卷
         * @param name 名稱
         * @param rewriteable 是否可以重寫問卷
         * @param order 顯示順序
         */
        public static async create(name: string, rewriteable: boolean = false, order: number = null)
            : Promise<Form>{
            var postData = {
                name: name,
                rewriteable: rewriteable
            };
            if (order) postData['order'] = order;

            var client = createHttpClient();
            var response = (await client.postAsync(SystemVars.apiUrl + "form", null, postData)).toJSON();

            return loadFromJSON(Form, response.result);
        }

        /**
         * 新增問卷
         * @param form 問卷
         */
        public static async add(form: Form): Promise<void> {
            await Form.create(form.name, form.rewriteable, form.order);
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
    }
}