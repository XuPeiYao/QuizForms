using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Quiz {
    /// <summary>
    /// 使用者類型
    /// </summary>
    public enum UserTypes {
        /// <summary>
        /// 未登入
        /// </summary>
        Null = -1,
        /// <summary>
        /// 一般使用者
        /// </summary>
        Normal = 0,
        /// <summary>
        /// 管理員
        /// </summary>
        Admin = 1,
        /// <summary>
        /// 超級管理員
        /// </summary>
        TopAdmin = 2,
    }
}
