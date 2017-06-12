module QuizForms {
    /**
     * 題目類型
     */
    export enum QuestionTypes {
        /**
         * 多選一
         */
        RadioGroup,
        /**
         * 多選一的選項
         */
        Radio,
        /**
         * 行內多選一(下拉式清單) 以{options}標記
         */
        Dropdown,
        /**
         * 多選勾選框群組
         */
        CheckboxGroup,
        /**
         * 多選勾選框
         */
        Checkbox,
        /** 
         * 五等級多選一
         */
        Level,
        /**
         * 文字輸入框
         */
        InputText,
        /** <summary>
         * 數字輸入框
         */
        InputNumber,
        /** <summary>
         * 標題字
         */
        Title,
        /** <summary>
         * 普通內文
         */
        Text,
    }

    /**
     * 題目
     */
    export class Question {
        /**
         * 唯一識別號
         */
        public id: any;

        /**
         * 所屬問卷唯一識別號
         */
        public formId: any;

        /**
         * 問題父節點
         */
        public parentId: any;

        /**
         * 顯示順序
         */
        public order: number;

        /**
         * 類型
         */
        public type: string;

        /**
         * 是否為必填
         */
        public required: boolean;

        /**
         * 內容
         */
        public text: string;

        /**
         * 父節點
         */
        public parent: Question;

        /**
         * 子題目
         */
        public children: Question[];

        /**
         * 取得子題目
         */
        public async getChildren(): Promise<Question[]> {
            if (!this.children) {
                this.children = await Question.getChildren(this);
            }
            return this.children;
        }

        /**
         * 新增子題目
         * @param question 子題目
         */
        public async addChildren(question: Question): Promise<void> {
            await Question.add(this, question);
        }
        
        /**
         * 取得題目的子題目
         * @param question 題目
         */
        public static async getChildren(question: Question): Promise<Question[]> {
            var response = (await createHttpClient().getAsync(SystemVars.apiUrl + "question/list/" + (question.id || question))).toJSON().result;

            var result = [];
            for (var i = 0; i < response.length; i++) {
                result.push(Question, response[i]);
            }

            return result;
        }
        
        /**
         * 建立子問題至指定的問題下
         * @param form 問卷
         * @param parent 父問題
         * @param type 類型
         * @param text 文字
         * @param order 顯示順序
         */
        public static async create(
            form: Form,
            parent: Question,
            type: QuestionTypes,
            text: string,
            order: number = null): Promise<Question> {
            var postData = {
                text: text,
                type: QuestionTypes[type]
            }
            if (order != null) postData['order'] = order;

            var response;
            if (parent) {
                response = await createHttpClient().postAsync(SystemVars.apiUrl + "question/" + (form.id || form) + "/" + (parent.id || parent), null, postData);
            } else {
                response = await createHttpClient().postAsync(SystemVars.apiUrl + "question/" + (form.id || form), null, postData);
            }
            response = response.result;
            return loadFromJSON(Question, response);
        }

        /**
         * 建立子問題至指定的問題下
         * @param parent 父問題
         * @param newInstance 新問題
         */
        public static async add(parent: Question, newInstance: Question): Promise<void> {
            await parent.getChildren();
            parent.children.push(await Question.create(parent.formId, parent, QuestionTypes[newInstance.type], newInstance.text, newInstance.order));
        }

        /**
         * 刪除指定的問題
         * @param question 問題
         */
        public static async remove(question: Question): Promise<void> {
            await createHttpClient().deleteAsync(SystemVars.apiUrl + "question/" + question.id);
        }
    }
}