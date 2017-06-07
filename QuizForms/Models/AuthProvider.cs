using QuizForms.Quiz;
using QuizForms.Quiz.Factories;
using QuizForms.Quiz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Models
{
    public class AuthProvider : IAuthorizationProvider {
        public AuthProvider(QuizDbContext<Guid, Form, Question, Record> dbcontext) {

        }
        public UserTypes Authorize(string userId, string password) {
            return UserTypes.Admin;
        }
    }
}
