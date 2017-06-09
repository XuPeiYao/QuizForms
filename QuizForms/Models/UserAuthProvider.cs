using QuizForms.Quiz;
using QuizForms.Quiz.Factories;
using QuizForms.Quiz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Models
{
    public class UserAuthProvider : IAuthorizationProvider {
        public UserAuthProvider(QuizDbContext<Guid, Form, Question, Record> dbcontext) {

        }
        public UserTypes Authorize(string userId, string password) {
            if (userId == "admin") {
                return UserTypes.Admin;
            } else if (userId == "student") {
                return UserTypes.Normal;
            } else if (userId == "topAdmin") {
                return UserTypes.TopAdmin;
            } else {
                return UserTypes.Null;
            }
            
        }
    }
}
