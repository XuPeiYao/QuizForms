using EzCoreKit.AspNetCore.Http;
using Newtonsoft.Json;
using QuizForms.Quiz.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Models {
    [Table("Question")]
    public class Question : IQuestion<Guid> {
        public Guid Id { get; set; }
        public Guid FormId { get; set; }
        public Guid? ParentId { get; set; }
        public int Order { get; set; }

        [NotMapped]
        public QuestionTypes Type {
            get {
                return (QuestionTypes)Enum.Parse(typeof(QuestionTypes), TypeString);
            }
            set {
                TypeString = value.ToString();
            }
        }

        [Column(name:"type")]
        public string TypeString { get;set; }

        public bool Required { get; set; }
        public string Text { get; set; }
        public Question() {
            Id = Guid.NewGuid();
        }

        [NotMapped]
        [JsonIgnore]
        public IQuestion<Guid> Parent {
            get {
                if (!ParentId.HasValue) return null;
                var db = GetCurrentDbContext();
                return db.Questions.First(x => x.Id.Equals(ParentId));
            }
        }

        [NotMapped]
        private IQuestion<Guid>[] _children = null;

        [NotMapped]
        public IQuestion<Guid>[] Children {
            get {
                if (_children == null) {
                    _children = GetCurrentDbContext().Questions
                        .Where(x => x.ParentId == Id)
                        .OrderBy(x => x.Order).ToArray();
                }
                return _children;
            }
        }

        private static QuizDbContext<Guid, Form, Question, Record, Writed> GetCurrentDbContext() {
            return (QuizDbContext<Guid, Form, Question, Record,Writed>)
                HttpContextFactory.CurrentHttpContext
                .RequestServices.GetService(typeof(QuizDbContext<Guid, Form, Question, Record,Writed>));
        }
    }
}
