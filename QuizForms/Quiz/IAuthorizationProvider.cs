using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Quiz {
    /// <summary>
    /// 授權邏輯提供者
    /// </summary>
    public interface IAuthorizationProvider {
        /// <summary>
        /// 嘗試取得授權結果
        /// </summary>
        /// <param name="userId">使用者帳號</param>
        /// <param name="password">使用者密碼</param>
        /// <returns>
        ///     授權結果，如果為<see cref="null"/>則表示登入失敗，如果為<see cref="true"/>則表示為擁有管理權限者登入，<see cref="false"/>則為一般使用者登入
        /// </returns>
        UserTypes Authorize(string userId, string password);
    }
}
