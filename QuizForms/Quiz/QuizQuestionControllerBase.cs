using EzCoreKit.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using QuizForms.Quiz.Factories;
using QuizForms.Quiz.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Quiz {
    public class QuizQuestionControllerBase<IdType, FormType, QuestionType, RecordType>
        : QuizControllerBase<IdType, FormType, QuestionType, RecordType>
        where IdType : struct
        where FormType : class, IForm<IdType>, new()
        where QuestionType : class, IQuestion<IdType>, new()
        where RecordType : class, IRecord<IdType>, new() {

        public QuizQuestionControllerBase(
            QuizDbContext<IdType, FormType, QuestionType, RecordType> dbContext
            ) : base(dbContext) {
        }

        /// <summary>
        /// 取得問卷題目實體
        /// </summary>
        /// <param name="question">問卷題目實體</param>
        /// <returns>操作結果</returns>
        [HttpGet("{question}")]
        [Authority(Minimum = UserTypes.Normal)]
        public async Task<JsonResult> Get(
            [Required][FromRoute]QuestionType question) {
            FormType form = Database.Forms.Where(x => x.Id.Equals(question.FormId)).First();

            if (!form.Enable && form.OwnerId != User.Id) throw new UnauthorizedAccessException();

            return new ApiResult() {
                Result = question
            };
        }

        /// <summary>
        /// 取得問卷題目列表
        /// </summary>
        /// <param name="form">問卷實體</param>
        /// <returns>操作結果</returns>
        [HttpGet("list/{form}")]
        [Authority(Minimum = UserTypes.Normal)]
        public async Task<JsonResult> List(
            [Required][FromRoute]FormType form) {
            if (!form.Enable && form.OwnerId != User.Id)throw new UnauthorizedAccessException();

            return new ApiResult() {
                Result = from t in Database.Questions
                         where t.ParentId == null && t.FormId.Equals(form.Id)
                         orderby t.Order
                         select t
            };
        }

        /// <summary>
        /// 加入新題目
        /// </summary>
        /// <param name="form">所屬問卷實體</param>
        /// <param name="text">題目內容</param>
        /// <param name="order">顯示順序</param>
        /// <param name="type">類型</param>
        /// <returns>操作結果</returns>
        [HttpPost("{form}")]
        [HttpPost("{form}/{question}")]
        [Authority(Minimum = UserTypes.Admin)]
        public async Task<JsonResult> Add(
            [Required][FromRoute]FormType form,
            [FromRoute]QuestionType question,
            [FromForm]string text,
            [FromForm]int? order,
            [FromForm]QuestionTypes type = QuestionTypes.Text) {
            if (form.OwnerId != User.Id) throw new UnauthorizedAccessException();

            QuestionType instance = null;
            Database.Questions.Add(instance = new QuestionType());
            instance.FormId = form.Id;
            instance.Type = type;
            instance.Text = text;

            if(question != null) {
                instance.ParentId = question.Id;
            }
            
            if (order.HasValue) {
                instance.Order = order.Value;
            } else {
                if (instance.ParentId.HasValue) {
                    instance.Order = instance.Parent.Children.Count();
                } else {
                    instance.Order = Database.Questions.Count(x => x.FormId.Equals(form.Id));
                }
            }

            await Database.SaveChangesAsync();

            return new ApiResult() {
                Result = instance
            };
        }

        /// <summary>
        /// 刪除指定題目
        /// </summary>
        /// <param name="question">題目實體</param>
        /// <returns>操作結果</returns>
        [HttpDelete("{question}")]
        [Authority(Minimum = UserTypes.Admin)]
        public async Task<JsonResult> Remove(
            [Required][FromRoute]QuestionType question) {
            var form = Database.Forms.First(x => x.Id.Equals(question.FormId));
            if (form.OwnerId != User.Id) throw new UnauthorizedAccessException();

            void DeepRemove(QuestionType target){
                if(target.Children.Length > 0) {
                    DeepRemove(target);
                } else {
                    Database.Questions.Remove(target);
                }
            }
            
            await Database.SaveChangesAsync();

            return new ApiResult();
        }

        /// <summary>
        /// 更新題目屬性
        /// </summary>
        /// <param name="question">問卷題目實體</param>
        /// <param name="type">類型</param>
        /// <param name="text">內容</param>
        /// <param name="order">顯示順序</param>
        /// <returns></returns>
        [HttpPut("{form}")]
        [Authority(Minimum = UserTypes.Admin)]
        public async Task<JsonResult> Update(
            [Required][FromRoute]QuestionType question,
            [FromForm]QuestionTypes? type,
            [FromForm]string text,
            [FromForm]int? order) {
            var form = Database.Forms.First(x => x.Id.Equals(question.FormId));
            if (form.OwnerId != User.Id) throw new UnauthorizedAccessException();

            if (type.HasValue) question.Type = type.Value;
            if (text != null) question.Text = text;
            if (order.HasValue) question.Order = order.Value;

            await Database.SaveChangesAsync();
            return new ApiResult() {
                Result = question
            };
        }
    }
}
