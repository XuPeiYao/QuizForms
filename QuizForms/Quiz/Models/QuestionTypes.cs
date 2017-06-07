using QuizForms.Quiz.Models.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Quiz.Models {
    /// <summary>
    /// 題目類型
    /// </summary>
    public enum QuestionTypes {
        /// <summary>
        /// 多選一
        /// </summary>
        RadioGroup,
        /// <summary>
        /// 多選一的選項
        /// </summary>
        Radio,
        /// <summary>
        /// 行內多選一(下拉式清單) 以{options}標記
        /// </summary>
        Dropdown,
        /// <summary>
        /// 多選勾選框群組
        /// </summary>
        [MultipleAns]
        CheckboxGroup,
        /// <summary>
        /// 多選勾選框
        /// </summary>
        Checkbox,
        /// <summary>
        /// 五等級多選一
        /// </summary>
        Level,
        /// <summary>
        /// 文字輸入框
        /// </summary>
        InputText,
        /// <summary>
        /// 數字輸入框
        /// </summary>
        InputNumber,
        /// <summary>
        /// 標題字
        /// </summary>
        [NotQuestion]
        Title,
        /// <summary>
        /// 普通內文
        /// </summary>
        [NotQuestion]
        Text,
    }
}
