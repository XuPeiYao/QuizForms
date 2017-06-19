using QuizForms.Quiz.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using QuizForms.Quiz;
using Newtonsoft.Json;

namespace QuizForms.Models
{
    [Table("Form")]
    public class Form : IForm<Guid> {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string OwnerId { get; set; }
        public bool Enable { get; set; }
        public bool Rewriteable { get; set; }
        public int Order { get; set; }
        public bool Anonymous { get; set; }

        [NotMapped]
        public UserTypes UserType {
            get {
                return (UserTypes)Enum.Parse(typeof(UserTypes), UserTypeString);
            }
            set {
                UserTypeString = value.ToString();
            }
        }

        [Column(name: "userType")]
        [JsonIgnore]
        public string UserTypeString { get; set; }

        public Form() {
            Id = Guid.NewGuid();
        }
    }
}
