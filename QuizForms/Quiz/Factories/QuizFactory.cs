using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuizForms.Quiz.Models;
using EzCoreKit.Extensions;
using QuizForms.Quiz.Models.Attributes;

namespace QuizForms.Quiz.Factories {
    /// <summary>
    /// 問卷系統工廠方法
    /// </summary>
    public static class QuizFactory {
        /// <summary>
        /// 檢查指定的問卷題目實體是否為可作答題目
        /// </summary>
        /// <typeparam name="IdType">主鍵類型</typeparam>
        /// <param name="question">問卷題目實體</param>
        /// <returns>是否可作答</returns>
        public static bool IsQuestion<IdType>(this IQuestion<IdType> question) {
            var attr = EnumFactory.GetCustomAttribute<NotQuestionAttribute>(question.Type);
            return attr == null;
        }
    }
}
