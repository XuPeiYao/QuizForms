module QuizForms {
    export enum UserTypes {
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
    export class User {
        /**
         * 使用者類型
         */
        public type: UserTypes;

        /**
         * 使用者唯一識別號
         */
        public id: UserTypes;

        /**
         * 登入
         * @param id
         * @param password
         */
        public static async login(id: string, password: string): Promise<User> {
            var client = new HttpClient();
            var response = await client.postAsync("");
            
        }
    }
}