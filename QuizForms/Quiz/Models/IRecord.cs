using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Quiz.Models {
    /// <summary>
    /// 問卷紀錄
    /// </summary>
    /// <typeparam name="IdType">主鍵類型</typeparam>
    public interface IRecord<IdType> {
        /// <summary>
        /// 唯一識別號
        /// </summary>
        [Key]
        IdType Id { get; set; }

        /// <summary>
        /// 所屬問卷唯一識別號
        /// </summary>
        IdType FormId { get; set; }

        /// <summary>
        /// 父題目唯一識別號
        /// </summary>
        IdType QuestionId { get; set; }
        
        /// <summary>
        /// 使用者唯一識別號
        /// </summary>
        string UserId { get; set; }

        /// <summary>
        /// 值
        /// </summary>
        string Value { get; set; }

        /// <summary>
        /// 時間
        /// </summary>
        DateTime Time { get; set; }
    }
}
