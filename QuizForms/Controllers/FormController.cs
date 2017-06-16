using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using QuizForms.Quiz;
using QuizForms.Quiz.Factories;
using QuizForms.Quiz.Models;
using QuizForms.Models;

namespace QuizForms.Controllers {
    public class FormController : QuizFormControllerBase<Guid, Form, Question,Record,Writed> {
        public FormController(
            QuizDbContext<Guid, Form, Question, Record,Writed> dbContext )
            : base(dbContext) {
        }
    }
}
