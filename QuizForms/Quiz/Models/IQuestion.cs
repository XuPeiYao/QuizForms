using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Quiz.Models {
    /// <summary>
    /// 問卷題目
    /// </summary>
    /// <typeparam name="IdType">主鍵類型</typeparam>
    public interface IQuestion<IdType> {
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
        IdType ParentId { get; set; }

        /// <summary>
        /// 顯示順序
        /// </summary>
        int Order { get; set; }

        /// <summary>
        /// 類型
        /// </summary>
        QuestionTypes Type { get; set; }

        /// <summary>
        /// 是否為必填
        /// </summary>
        bool Required { get; set; }

        /// <summary>
        /// 內容
        /// </summary>
        string Text { get; set; }
                
        IQuestion<IdType> Parent { get;}

        ICollection<IQuestion<IdType>> Children { get;  }
    }
}
