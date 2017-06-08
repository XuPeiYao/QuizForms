using EzCoreKit.AspNetCore.Http;
using Newtonsoft.Json;
using QuizForms.Quiz.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Models {
    public class Question : IQuestion<Guid> {
        public Guid Id { get; set; }
        public Guid FormId { get; set; }
        public Guid ParentId { get; set; }
        public int Order { get; set; }
        public QuestionTypes Type { get; set; }
        public bool Required { get; set; }
        public string Text { get; set; }
        public Question() {
            Id = Guid.NewGuid();
        }

        [NotMapped]
        [JsonIgnore]
        public IQuestion<Guid> Parent {
            get {
                var db = GetCurrentDbContext();
                return db.Questions.First(x => x.Id.Equals(FormId));
            }
        }

        [NotMapped]
        public ICollection<IQuestion<Guid>> Children {
            get {
                return GetCurrentDbContext().Questions.Where(x => x.ParentId == FormId).ToArray();
            }
        }

        private static QuizDbContext<Guid, Form, Question, Record> GetCurrentDbContext() {
            return (QuizDbContext<Guid, Form, Question, Record>)
                HttpContextFactory.CurrentHttpContext
                .RequestServices.GetService(typeof(QuizDbContext<Guid, Form, Question, Record>));
        }
    }
}
