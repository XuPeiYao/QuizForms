using Microsoft.AspNetCore.Mvc;
using QuizForms.Quiz.Factories;
using QuizForms.Quiz.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using EzCoreKit.AspNetCore.Mvc;
using System.Security.Authentication;

namespace QuizForms.Quiz {
    public class QuizUserControllerBase<IdType, FormType, QuestionType, RecordType>
        : QuizControllerBase<IdType, FormType, QuestionType, RecordType>
        where IdType : struct
        where FormType : class, IForm<IdType>, new()
        where QuestionType : class, IQuestion<IdType>, new()
        where RecordType : class, IRecord<IdType>, new() {

        /// <summary>
        /// 身分授權提供者
        /// </summary>
        public IAuthorizationProvider AuthorizationProvider {
            get;set;
        }


        public QuizUserControllerBase(
            QuizDbContext<IdType, FormType, QuestionType, RecordType> dbContext,
            IAuthorizationProvider authProvider
            ) : base(dbContext) {
            this.AuthorizationProvider = authProvider;
        }

        /// <summary>
        /// 取得目前登入狀態
        /// </summary>
        /// <returns>操作結果</returns>
        [HttpGet("status")]
        public async Task<JsonResult> GetStatus() {
            return new ApiResult() { Result = User };
        }

        /// <summary>
        /// 登入系統
        /// </summary>
        /// <param name="id">帳號</param>
        /// <param name="password">密碼</param>
        /// <param name="isAdmin">是否為管理登入</param>
        /// <returns>操作結果</returns>
        [HttpPost("status")]
        public async Task<JsonResult> SignIn(string id, string password, bool isAdmin = false) {
            if (IsLogin) User = null;
            if (id == null || password == null) throw new ArgumentException($"{nameof(id)}與{nameof(password)}不該為空白");

            switch (AuthorizationProvider.Authorize(id, password)) {
                case UserTypes.Null:
                    throw new AuthenticationException("帳號或密碼錯誤");
                case UserTypes.Normal:
                    User = new LoginUser() {
                        Id = id,
                        Type = UserTypes.Normal
                    };
                    break;
                case UserTypes.Admin:
                    User = new LoginUser() {
                        Id = id,
                        Type = isAdmin ? UserTypes.Admin : UserTypes.Normal
                    };
                    break;
                case UserTypes.TopAdmin:
                    User = new LoginUser() {
                        Id = id,
                        Type = isAdmin ? UserTypes.TopAdmin : UserTypes.Normal
                    };
                    break;
            }

            return new ApiResult() { Result = User };
        }
        
        /// <summary>
        /// 登出系統
        /// </summary>
        /// <returns>操作結果</returns>
        [HttpDelete("status")]
        [Authority(Minimum = UserTypes.Normal)]
        public async Task<JsonResult> SignOut() {
            User = null;
            return new ApiResult();
        }
    }
}
