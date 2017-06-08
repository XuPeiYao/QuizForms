using QuizForms.Quiz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Models
{
    public class Form : IForm<Guid> {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string OwnerId { get; set; }
        public bool Enable { get; set; }
        public bool Anonymous { get; set; }
        public bool Rewriteable { get; set; }
        public int Order { get; set; }
    }
}
