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
    /**
     * 使用者資訊
     */
    export class User {
        /**
         * 類型
         */
        public type: UserTypes;

        /**
         * 唯一識別號
         */
        public id: UserTypes;
                
        /**
         * 登入並取得使用者資訊
         * @param id 唯一識別號
         * @param password 密碼
         * @param isAdmin 是否取得管理權限
         */
        public static async login(id: string, password: string, isAdmin: boolean = false): Promise<User> {
            var client = createHttpClient();
            
            var response = await client.postAsync(SystemVars.apiUrl + "user/status", null, {
                id: id,
                password: password,
                isAdmin: isAdmin
            });
            return <User>loadFromJSON(User,response.toJSON().result);
        }

        /**
         * 取得目前登入的使用者資訊
         */
        public static async getCurrentUser(): Promise<User> {
            var client = createHttpClient();

            var response = await client.getAsync(SystemVars.apiUrl + "user/status");

            var result = response.toJSON().result;
            if (result == null) return null;

            return <User>loadFromJSON(User, result);
        }

        /**
         * 取得目前是否登入中
         */
        public static async isLogin(): Promise<boolean> {
            return (await User.getCurrentUser()) != null;
        }

        /**
         * 登出目前使用身分
         */
        public static async logout(): Promise<void> {
            await createHttpClient().deleteAsync(SystemVars.apiUrl + "user/status");
        }
    }
}