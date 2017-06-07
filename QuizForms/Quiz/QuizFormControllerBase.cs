using Microsoft.AspNetCore.Mvc;
using QuizForms.Quiz.Factories;
using QuizForms.Quiz.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Quiz {
    public class QuizFormControllerBase<IdType, FormType, QuestionType, RecordType>
        : QuizControllerBase<IdType, FormType, QuestionType, RecordType>
        where FormType : IForm<IdType>
        where QuestionType : IQuestion<IdType>
        where RecordType : IRecord<IdType> {
        
        public QuizFormControllerBase(
            QuizDbContext<IdType, FormType, QuestionType, RecordType> dbContext
            ) : base(dbContext) {
            
        }

        public enum ListFilters {
            All,Enable,Disable
        }
        public JsonResult List(ListFilters filter) {
            return new ApiResult() {
                //Result
            }
        }
    }
}
