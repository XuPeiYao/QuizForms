using Microsoft.AspNetCore.Mvc;
using QuizForms.Quiz.Factories;
using QuizForms.Quiz.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Quiz {
    public class QuizRecordControllerBase<IdType, FormType, QuestionType, RecordType>
        : QuizControllerBase<IdType, FormType, QuestionType, RecordType>
        where FormType : IForm<IdType>
        where QuestionType : IQuestion<IdType>
        where RecordType : IRecord<IdType> {

        /// <summary>
        /// 身分授權提供者
        /// </summary>
        public IAuthorizationProvider AuthorizationProvider {
            get; set;
        }
        
        public QuizRecordControllerBase(
            QuizDbContext<IdType, FormType, QuestionType, RecordType> dbContext,
            IAuthorizationProvider authProvider
            ) : base(dbContext) {
            this.AuthorizationProvider = authProvider;
        }
    }
}
