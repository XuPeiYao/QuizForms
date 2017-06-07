using QuizForms.Quiz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Models {
    public class Question : IQuestion<Guid> {
        public Guid Id { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public Guid FormId { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public Guid ParentId { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public int Order { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public QuestionTypes Type { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public bool Required { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string Text { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    }
}
