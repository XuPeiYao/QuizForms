using EzCoreKit.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuizForms.Quiz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace QuizForms.Quiz {
    [Route("api/[controller]")]
    public class QuizControllerBase<IdType, FormType, QuestionType, RecordType>
        : EzAuthorityController<UserTypes>
        where FormType : class,IForm<IdType>,new ()
        where QuestionType : class, IQuestion<IdType>, new()
        where RecordType : class, IRecord<IdType>, new() {

        #region Session相關參數
        public const string SessionKeys_UserId = "UserId";
        public const string SessionKeys_Type = "Type";
        #endregion

        public QuizDbContext<IdType, FormType, QuestionType, RecordType> Database { get; set; }

        public new LoginUser User {
            get {
                if (HttpContext.Session.Keys.Contains(SessionKeys_UserId)) {                     return new LoginUser() {
                        Id = HttpContext.Session.GetString(SessionKeys_UserId),
                        Type = (UserTypes)Enum.Parse(typeof(UserTypes),HttpContext.Session.GetString(SessionKeys_Type))
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

        public override UserTypes UserAuthority {
            get {
                if (User == null) return UserTypes.Null;
                return User.Type;
            }
        }

        public QuizControllerBase(
            QuizDbContext<IdType, FormType, QuestionType, RecordType> dbContext):base() {
            this.Database = dbContext;
        }
    }
}
