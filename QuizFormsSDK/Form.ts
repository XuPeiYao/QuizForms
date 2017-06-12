ï»¿module QuizForms {
    /**
     * åè¡¨éæ¿¾
     */
    export enum ListFilters {
        /**
         * ææåå·
         */
        All,
        /**
         * åç¨çåå·
         */
        Enable,
        /**
         * ééçåå·
         */
        Disable
    }
    /**
     * åå·
     */
    export class Form {
        /**
         * å¯ä¸è­å¥è
         */
        public id: any;

        /**
         * åç¨±
         */
        public name: string;

        /**
         * æ¯å¦åç¨
         */
        public enable: boolean;

        /**
         * å¯å¦éæ°å¡«å¯«
         */
        public rewriteable: boolean;

        /**
         * é¡¯ç¤ºé åº
         */
        public order: number;

        /**
         * åå·é¡ç®
         */
        public questions: Question[];

        /**
         * æ¯å¦å·²ç¶å¯«é
         */
        public writed: boolean = null;

        /**
         * åå¾åå·åé¡
         */
        public async getQuestions() : Promise<Question[]> {
            if (!this.questions) {
                this.questions = await Form.getQuestions(this);
            }
            return this.questions;
        }

        /**
         * æ¯å¦å·²ç¶å¯«é
         */
        public async isWrited(): Promise<boolean> {
            if (this.writed == undefined || this.writed == null) {
                this.writed = await Form.isWrited(this);
            }
            return this.writed;
        }

        /**
         * è®åå®æ´åå·å§å®¹(å¦:åé¡)
         */
        public async load(): Promise<void> {
            await this.getQuestions();
            await this.isWrited();
        }

        /**
         * æ´æ°
         */
        public async update(): Promise<void> {
            await Form.update(this);
        }

        /**
         * åå¾åå·åè¡¨
         * @param filter ç¯©é¸æ¹å¼
         */
        public static async getList(filter: ListFilters = ListFilters.All): Promise<Form[]> {
            var response = (await createHttpClient().getAsync(SystemVars.apiUrl + "form/list", null, {
                filter: ListFilters[filter]
            })).toJSON();

            var result = [];
            for (var i = 0; i < response.length; i++) {
                result.push(Form, response[i]);
            }

            return result;
        }

        /**
         * åå¾æå®åå·ææåé¡
         * @param form åå·
         */
        public static async getQuestions(form: Form): Promise<Question[]> {
            var response = (await createHttpClient().getAsync(SystemVars.apiUrl + "question/list/" + form.id)).toJSON();

            var result = [];
            for (var i = 0; i < response.length; i++) {
                result.push(Question, response[i]);
            }

            return result;
        }

        /**
         * åå¾åå·æ¯å¦å·²ç¶å¯«é
         * @param form åå·
         */
        public static async isWrited(form: Form): Promise<boolean> {
            var response = (await createHttpClient().getAsync(SystemVars.apiUrl + "form/" + form.id + "/isWrited")).toJSON();

            return response.result;
        }

}
