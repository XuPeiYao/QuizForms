using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Quiz.Models {
    /// <summary>
    /// Api結果之結構
    /// </summary>
    public enum ApiResultStruct {
        /// <summary>
        /// 物件
        /// </summary>
        Object,
        /// <summary>
        /// 陣列
        /// </summary>
        Array,
        /// <summary>
        /// 分頁列舉
        /// </summary>
        Enum
    }
    /// <summary>
    /// Api結果型別
    /// </summary>
    public class ApiResultTypes {
        /// <summary>
        /// 名稱
        /// </summary>
        public string Name { get; set; } = "null";

        /// <summary>
        /// 類型
        /// </summary>
        public ApiResultStruct Struct { get; set; }

        /// <summary>
        /// 結果陣列或列舉長度
        /// </summary>
        public int? Count { get; set; }

        /// <summary>
        /// 列舉起點
        /// </summary>
        public int? Index { get; set; }

        /// <summary>
        /// 列舉長度
        /// </summary>
        public int? Length { get; set; }
    }
}
