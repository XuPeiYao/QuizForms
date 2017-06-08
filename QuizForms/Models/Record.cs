using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuizForms.Quiz.Models;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using EzCoreKit.Extensions;

namespace QuizForms.Models
{
    public class Record : IRecord<Guid> {
        public Guid Id { get; set; }
        public Guid FormId { get; set; }
        public Guid QuestionId { get; set; }
        public string UserId { get; set; }
        public string Value { get; set; }

        [NotMapped]
        [JsonIgnore]
        public DateTime Time {
            get {
                return DateTimeFactory.ConvertFromJsTime(JsTime);
            }
            set {
                JsTime = DateTimeFactory.ConvertToJsTime(value);
            }
        }

        [Column("time")]
        public long JsTime { get; set; }
    }
}
