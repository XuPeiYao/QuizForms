using QuizForms.Quiz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Models
{
    public class Form : IForm<Guid> {
        public Guid Id { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string Name { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string OwnerId { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public bool Enable { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public bool Anonymous { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public bool Rewriteable { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public int Order { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    }
}
