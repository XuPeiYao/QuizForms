using Microsoft.AspNetCore.Mvc;
using QuizForms.Quiz.Factories;
using QuizForms.Quiz.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;

namespace QuizForms.Quiz {
    public class QuizUserControllerBase<IdType, FormType, QuestionType, RecordType>
        : QuizControllerBase<IdType, FormType, QuestionType, RecordType>
        where FormType : IForm<IdType>
        where QuestionType : IQuestion<IdType>
        where RecordType : IRecord<IdType> {

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
        /// 登入
        /// </summary>
        /// <param name="id">帳號</param>
        /// <param name="password">密碼</param>
        /// <returns>登入結果</returns>
        [HttpPost("status")]
        public JsonResult Login(
            [Required]string id,
            [Required]string password) {
            var authResult = AuthorizationProvider.Authorize(id, password);
            if (authResult != UserTypes.Null) {
                User = new LoginUser() {
                    Id = id.ToLower(),
                    Type = authResult
                };
            }
            return new ApiResult() {
                Result = User
            };
        }

        public override void OnException(ActionExecutingContext executingContext, ActionExecutedContext executedContext, Exception exception) {
            base.OnException(executingContext, executedContext, exception);
        }
    }
}
