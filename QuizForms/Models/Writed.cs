using QuizForms.Quiz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Models{
    public class Writed : IWrited<Guid> {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid FormId { get; set; }
        public string UserId { get; set; }
    }
}
