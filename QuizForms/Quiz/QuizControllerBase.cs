using EzCoreKit.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuizForms.Quiz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace QuizForms.Quiz {
    [Route("api/[controller]")]
    public class QuizControllerBase<IdType, FormType, QuestionType, RecordType,WritedType>
        : EzAuthorityController<UserTypes>
        where IdType : struct
        where FormType : class, IForm<IdType>, new()
        where QuestionType : class, IQuestion<IdType>, new()
        where RecordType : class, IRecord<IdType>, new()
        where WritedType : class, IWrited<IdType>, new() {

        #region Session相關參數
        public const string SessionKeys_UserId = "UserId";
        public const string SessionKeys_Type = "Type";
        #endregion

        public QuizDbContext<IdType, FormType, QuestionType, RecordType,WritedType> Database { get; set; }

        public new LoginUser User {
            get {
                if (HttpContext.Session.Keys.Contains(SessionKeys_UserId)) {
                    return new LoginUser() {
                        Id = HttpContext.Session.GetString(SessionKeys_UserId),
                        Type = (UserTypes)Enum.Parse(typeof(UserTypes), HttpContext.Session.GetString(SessionKeys_Type))
                    };
                } else {
                    return null;
                }
            }
            set {
                if (value == null) {
                    HttpContext.Session.Clear();
                    return;
                }
                HttpContext.Session.SetString(SessionKeys_UserId, value.Id);
                HttpContext.Session.SetString(SessionKeys_Type, value.Type.ToString());
            }
        }

        public bool IsLogin {
            get {
                return User != null;
            }
        }

        public override UserTypes UserAuthority => User == null ? UserTypes.Null : User.Type;

        public QuizControllerBase(
                QuizDbContext<IdType, FormType, QuestionType, RecordType,WritedType> dbContext) : base() {
            this.Database = dbContext;
        }

        public override void OnException(ActionExecutingContext executingContext, ActionExecutedContext executedContext, Exception exception) {
            if (executingContext != null) {
                executingContext.Result = (JsonResult)new ApiResult() { Result = exception };
            } else {
                executedContext.Result = (JsonResult)new ApiResult() { Result = exception };
                executedContext.ExceptionHandled = true;
            }

            base.OnException(executingContext, executedContext, exception);
        }
    }
}
