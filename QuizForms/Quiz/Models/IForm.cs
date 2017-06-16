using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Quiz.Models {
    /// <summary>
    /// 問卷
    /// </summary>
    /// <typeparam name="IdType">主鍵類型</typeparam>
    public interface IForm<IdType> {
        /// <summary>
        /// 唯一識別號
        /// </summary>
        [Key]
        IdType Id { get; set; }

        /// <summary>
        /// 名稱
        /// </summary>
        string Name { get; set; }

        /// <summary>
        /// 擁有使用者唯一識別號
        /// </summary>
        [JsonIgnore]
        string OwnerId { get; set; }

        /// <summary>
        /// 是否啟用
        /// </summary>
        bool Enable { get; set; }

        /*/// <summary>
        /// 是否匿名
        /// </summary>
        bool Anonymous { get; set; }*/
        /// <summary>
        /// 限制使用者類型，Null為不限
        /// </summary>
        UserTypes UserType { get; set; }

        /// <summary>
        /// 是否允許重新填寫
        /// </summary>
        bool Rewriteable { get; set; }
        
        /// <summary>
        /// 顯示順序
        /// </summary>
        int Order { get; set; }
    }
}
