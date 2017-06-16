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
    public class QuizDbContext<IdType, FormType,QuestionType,RecordType,WritedType> : DbContext
        where IdType : struct
        where FormType : class,IForm<IdType>, new()
        where QuestionType : class,IQuestion<IdType>, new()
        where RecordType : class,IRecord<IdType>, new()
        where WritedType: class,IWrited<IdType>, new(){

        /// <summary>
        /// 問卷
        /// </summary>
        public DbSet<FormType> Forms { get; set; } 

        /// <summary>
        /// 問卷題目
        /// </summary>
        public DbSet<QuestionType> Questions { get; set; }

        /// <summary>
        /// 問卷紀錄
        /// </summary>
        public DbSet<RecordType> Records { get; set; }

        /// <summary>
        /// 匿名問卷紀錄
        /// </summary>
        public DbSet<WritedType> Writeds { get; set; }


        public QuizDbContext(DbContextOptions<QuizDbContext<IdType, FormType, QuestionType, RecordType, WritedType>> options)
            : base(options) {

        }
    }
}
