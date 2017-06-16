using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Quiz.Models {
    /// <summary>
    /// 問卷作答過的紀錄(用以時間匿名)
    /// </summary>
    /// <typeparam name="IdType">主鍵類型</typeparam>
    public interface IWrited<IdType> {
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
        /// 使用者唯一識別號
        /// </summary>
        string UserId { get; set; }
    }
}
