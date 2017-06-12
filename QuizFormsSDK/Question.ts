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
    export class Question{
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
         * 子節點
         */
        public children: Question[];



    }
}