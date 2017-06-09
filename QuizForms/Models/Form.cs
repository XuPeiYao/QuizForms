﻿using QuizForms.Quiz.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

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

        public Form() {
            Id = Guid.NewGuid();
        }

    }
}
