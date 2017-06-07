using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuizForms.Quiz.Models;
namespace QuizForms.Models
{
    public class Record : IRecord<Guid> {
        public Guid Id { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public Guid FormId { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public Guid QuestionId { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string UserId { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string Value { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public DateTime Time { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    }
}
