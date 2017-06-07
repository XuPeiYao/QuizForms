using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Quiz.Models.Attributes {
    [AttributeUsage(AttributeTargets.Field)]
    public class NotQuestionAttribute : Attribute {
    }
}
