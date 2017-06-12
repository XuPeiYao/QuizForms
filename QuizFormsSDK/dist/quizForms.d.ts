declare module QuizForms {
    /**
     * 列表過濾
     */
    enum ListFilters {
        /**
         * 所有問卷
         */
        All = 0,
        /**
         * 啟用的問卷
         */
        Enable = 1,
        /**
         * 關閉的問卷
         */
        Disable = 2,
    }
    /**
     * 問卷
     */
    class Form {
        /**
         * 唯一識別號
         */
        id: any;
        /**
         * 名稱
         */
        name: string;
        /**
         * 是否啟用
         */
        enable: boolean;
        /**
         * 可否重新填寫
         */
        rewriteable: boolean;
        /**
         * 顯示順序
         */
        order: number;
        /**
         * 問卷題目
         */
        questions: Question[];
        /**
         * 是否已經寫過
         */
        writed: boolean;
        /**
         * 取得問卷問題
         */
        getQuestions(): Promise<Question[]>;
        /**
         * 是否已經寫過
         */
        isWrited(): Promise<boolean>;
        /**
         * 讀取完整問卷內容(如:問題)
         */
        load(): Promise<void>;
        /**
         * 更新
         */
        update(): Promise<void>;
        /**
         * 取得問卷列表
         * @param filter 篩選方式
         */
        static getList(filter?: ListFilters): Promise<Form[]>;
        /**
         * 取得指定問卷所有問題
         * @param form 問卷
         */
        static getQuestions(form: Form): Promise<Question[]>;
        /**
         * 取得問卷是否已經寫過
         * @param form 問卷
         */
        static isWrited(form: Form): Promise<boolean>;
        /**
         * 建立新的問卷
         * @param name 名稱
         * @param rewriteable 是否可以重寫問卷
         * @param order 顯示順序
         */
        static create(name: string, rewriteable?: boolean, order?: number): Promise<Form>;
        /**
         * 刪除問卷
         * @param form 問卷
         */
        static delete(form: Form): Promise<void>;
        /**
         * 更新問卷
         * @param form 問卷
         */
        static update(form: Form): Promise<void>;
    }
}
declare module QuizForms {
    class HttpClient {
        requestHeader: any;
        withCredentials: boolean;
        progressCallback: (event: ProgressEvent) => any;
        user: string;
        password: string;
        private typeOf(obj);
        private openAndSend(method, url, header?, data?, user?, password?, progressCallback?);
        getAsync(url: string, header?: any, data?: (FormData | String | Object), user?: string, password?: string, progressCallback?: (event: ProgressEvent) => any): Promise<HttpResponse>;
        postAsync(url: string, header?: any, data?: (FormData | String | Object), user?: string, password?: string, progressCallback?: (event: ProgressEvent) => any): Promise<HttpResponse>;
        putAsync(url: string, header?: any, data?: (FormData | String | Object), user?: string, password?: string, progressCallback?: (event: ProgressEvent) => any): Promise<HttpResponse>;
        deleteAsync(url: string, header?: any, data?: (FormData | String | Object), user?: string, password?: string, progressCallback?: (event: ProgressEvent) => any): Promise<HttpResponse>;
    }
    class HttpResponse {
        statusCode: number;
        header: any;
        resultType: string;
        resultText: string;
        resultXML: Document;
        result: any;
        toJSON(): any;
    }
}
declare module QuizForms {
    /**
     * 題目類型
     */
    enum QuestionTypes {
        /**
         * 多選一
         */
        RadioGroup = 0,
        /**
         * 多選一的選項
         */
        Radio = 1,
        /**
         * 行內多選一(下拉式清單) 以{options}標記
         */
        Dropdown = 2,
        /**
         * 多選勾選框群組
         */
        CheckboxGroup = 3,
        /**
         * 多選勾選框
         */
        Checkbox = 4,
        /**
         * 五等級多選一
         */
        Level = 5,
        /**
         * 文字輸入框
         */
        InputText = 6,
        /** <summary>
         * 數字輸入框
         */
        InputNumber = 7,
        /** <summary>
         * 標題字
         */
        Title = 8,
        /** <summary>
         * 普通內文
         */
        Text = 9,
    }
    /**
     * 題目
     */
    class Question {
        /**
         * 唯一識別號
         */
        id: any;
        /**
         * 所屬問卷唯一識別號
         */
        formId: any;
        /**
         * 問題父節點
         */
        parentId: any;
        /**
         * 顯示順序
         */
        order: number;
        /**
         * 類型
         */
        type: string;
        /**
         * 是否為必填
         */
        required: boolean;
        /**
         * 內容
         */
        text: string;
        /**
         * 父節點
         */
        parent: Question;
        /**
         * 子節點
         */
        children: Question[];
    }
}
declare module QuizForms {
    var SystemVars: {
        readonly origin: string;
        readonly apiUrl: string;
        onException: (e: any) => void;
        disableException: boolean;
    };
    function createHttpClient(): HttpClient;
    function loadFromJSON(type: any, json: any): any;
}
declare module QuizForms {
    enum UserTypes {
        /**
         * 未登入
         */
        Null = -1,
        /**
         * 未登入
         */
        Normal = 0,
        /**
         * 管理者
         */
        Admin = 1,
        /**
         * 系統管理者
         */
        TopAdmin = 2,
    }
    /**
     * 使用者資訊
     */
    class User {
        /**
         * 類型
         */
        type: UserTypes;
        /**
         * 唯一識別號
         */
        id: UserTypes;
        /**
         * 登入並取得使用者資訊
         * @param id 唯一識別號
         * @param password 密碼
         * @param isAdmin 是否取得管理權限
         */
        static login(id: string, password: string, isAdmin?: boolean): Promise<User>;
        /**
         * 登出目前使用身分
         */
        static logout(): Promise<void>;
    }
}
