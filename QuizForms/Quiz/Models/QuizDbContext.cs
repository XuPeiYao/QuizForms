using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Quiz.Models {
    /// <summary>
    /// 問卷系統DbContext
    /// </summary>
    /// <typeparam name="IdType">主鍵類別</typeparam>
    /// <typeparam name="FormType">問卷類別</typeparam>
    /// <typeparam name="QuestionType">問卷題目類別</typeparam>
    /// <typeparam name="RecordType">問卷記錄類別</typeparam>
    public class QuizDbContext<IdType, FormType,QuestionType,RecordType> : DbContext
        where FormType : IForm<IdType>
        where QuestionType : IQuestion<IdType>
        where RecordType : IRecord<IdType>{

        /// <summary>
        /// 問卷
        /// </summary>
        public ISet<FormType> Forms { get; set; } 

        /// <summary>
        /// 問卷題目
        /// </summary>
        public ISet<QuestionType> Questions { get; set; }

        /// <summary>
        /// 問卷紀錄
        /// </summary>
        public ISet<RecordType> Records { get; set; }
        
        public QuizDbContext(DbContextOptions<QuizDbContext<IdType, FormType, QuestionType, RecordType>> options)
            : base(options) {

        }
    }
}
