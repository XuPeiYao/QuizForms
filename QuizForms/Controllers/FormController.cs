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
    public class FormController : QuizQuestionControllerBase<Guid, Form, Question,Record> {
        public FormController(
            QuizDbContext<Guid, Form, Question, Record> dbContext )
            : base(dbContext) {
        }
    }
}
