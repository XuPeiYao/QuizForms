﻿using EzCoreKit.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using QuizForms.Quiz.Factories;
using QuizForms.Quiz.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace QuizForms.Quiz {
    public class QuizFormControllerBase<IdType, FormType, QuestionType, RecordType,WritedType>
        : QuizControllerBase<IdType, FormType, QuestionType, RecordType,WritedType>
        where IdType : struct
        where FormType : class, IForm<IdType>,new ()
        where QuestionType : class, IQuestion<IdType>,new ()
        where RecordType : class, IRecord<IdType>,new ()
        where WritedType : class, IWrited<IdType>, new() {

        public QuizFormControllerBase(
            QuizDbContext<IdType, FormType, QuestionType, RecordType,WritedType> dbContext
            ) : base(dbContext) {

        }

        /// <summary>
        /// 問卷列表過濾方式
        /// </summary>
        public enum ListFilters {
            /// <summary>
            /// 所有
            /// </summary>
            All,
            /// <summary>
            /// 啟用的問卷
            /// </summary>
            Enable,
            /// <summary>
            /// 關閉的問卷
            /// </summary>
            Disable
        }

        /// <summary>
        /// 取得指定問卷實體
        /// </summary>
        /// <param name="form">問卷實體</param>
        /// <returns>操作結果</returns>
        [HttpGet("{form}")]
        [Authority(Minimum = UserTypes.Normal)]
        public async Task<JsonResult> Get(
            [Required][FromRoute]FormType form) {
            if (!form.Enable && form.OwnerId != User.Id) throw new UnauthorizedAccessException();
            return new ApiResult() {
                Result = form
            };
        }

        /// <summary>
        /// 取得問卷列表
        /// </summary>
        /// <param name="filter">過濾項目</param>
        /// <returns>問卷結果</returns>
        [HttpGet("list")]
        [Authority(Minimum = UserTypes.Normal)]
        public async Task<JsonResult> List(ListFilters filter = ListFilters.All) {
            IEnumerable<FormType> result = null;
            switch (UserAuthority) {
                case UserTypes.Normal:
                    result = from t in Database.Forms
                             where t.Enable
                             orderby t.Order
                             select t;
                    break;
                case UserTypes.Admin:
                case UserTypes.TopAdmin:
                    result = from t in Database.Forms
                             where t.OwnerId == User.Id
                             orderby t.Order
                             select t;                    
                    break;
            }
            switch (filter) {
                case ListFilters.Enable:
                    result = result.Where(x => x.Enable);
                    break;
                case ListFilters.Disable:
                    result = result.Where(x => !x.Enable);
                    break;
            }

            result = result.Where(x => {
                if (x.UserType == UserTypes.Null) return true;
                return x.UserType == User.Type;
            });

            return new ApiResult() {
                Result = result
            };
        }
        
        /// <summary>
        /// 檢驗指定問卷是否已經作答過
        /// </summary>
        /// <param name="form">問卷實體</param>
        /// <returns>操作結果</returns>
        [HttpGet("{form}/isWrited")]
        public async Task<JsonResult> IsWrited(
            [Required][FromRoute]FormType form) {
            return new ApiResult(){
                Result = Database.Records.Any(x => x.FormId.Equals(form.Id) && x.UserId == User.Id)
                      || Database.Writeds.Any(x=>x.FormId.Equals(form.Id) && x.UserId == User.Id)
            };
        }

        /// <summary>
        /// 取得已經作答過的問卷列表
        /// </summary>
        /// <param name="form">問卷實體</param>
        /// <returns>操作結果</returns>
        [HttpGet("list/isWrited")]
        public async Task<JsonResult> IsWritedList() {
            var FormIds = Database.Records.Where(x => x.UserId == User.Id).Select(x => x.FormId).Distinct();

            var AnonFormIds = Database.Writeds.Where(x => x.UserId == User.Id).Select(x => x.FormId).Distinct();

            return new ApiResult() {
                Result = FormIds.Concat(AnonFormIds).Distinct()
            };
        }

        /// <summary>
        /// 新增問卷
        /// </summary>
        /// <param name="order">顯示順序</param>
        /// <param name="rewriteable">是否重寫</param>
        /// <param name="anonymous">是否匿名</param>
        /// <param name="name">問卷名稱</param>
        /// <returns></returns>
        [HttpPost]
        [Authority(Minimum = UserTypes.Admin)]
        public async Task<JsonResult> Add(
            [FromForm]int? order,
            [FromForm]bool? rewriteable,
            [FromForm]bool? anonymous = true,
            [FromForm]UserTypes userType = UserTypes.Null,
            [FromForm]string name = "未命名問卷") {
            FormType instance = default(FormType);
            Database.Forms.Add(instance = new FormType());
            instance.Name = name;
            instance.OwnerId = User.Id;
            instance.UserType = userType;
            
            if(anonymous.HasValue)instance.Anonymous = anonymous.Value;

            if(anonymous.HasValue && anonymous.Value && rewriteable.HasValue && rewriteable.Value) {
                throw new InvalidOperationException("匿名問卷不可設定為可重新填寫");
            }
                        

            if(rewriteable.HasValue)instance.Rewriteable = rewriteable.Value;
            if (order.HasValue)instance.Order = order.Value;

            await Database.SaveChangesAsync();

            return new ApiResult() {
                Result = instance
            };
        }

        /// <summary>
        /// 移除問卷
        /// </summary>
        /// <param name="form">問卷實體</param>
        /// <returns>操作結果</returns>
        [HttpDelete("{form}")]
        [Authority(Minimum = UserTypes.Admin)]
        public async Task<JsonResult> Remove(
            [Required][FromRoute]FormType form) {
            if (form.OwnerId != User.Id) throw new UnauthorizedAccessException();

            Database.Records.RemoveRange(from t in Database.Records
                                         where t.FormId.Equals(form.Id)
                                         select t);

            Database.Writeds.RemoveRange(from t in Database.Writeds
                                         where t.FormId.Equals(form.Id)
                                         select t);

            void DeepRemove(QuestionType target){
                if (target.Children.Length > 0) {
                    DeepRemove(target);
                } else {
                    Database.Questions.Remove(target);
                }
            }

            foreach (var question in Database.Questions.Where(x => x.FormId.Equals(form.Id))) {
                DeepRemove(question);
            }

            Database.Forms.Remove(form);
            await Database.SaveChangesAsync();

            return new ApiResult();
        }
        
        /// <summary>
        /// 更新問卷屬性
        /// </summary>
        /// <param name="form">問卷實體</param>
        /// <param name="enable">是否啟用</param>
        /// <param name="name">名稱</param>
        /// <returns>操作結果</returns>
        [HttpPut("{form}")]
        [Authority(Minimum = UserTypes.Admin)]
        public async Task<JsonResult> Update(
            [Required][FromRoute]FormType form,
            [FromForm]bool? enable,
            [FromForm]int? order,
            [FromForm]UserTypes? userType,
            [FromForm]bool? rewriteable,
            [FromForm]string name = null) {
            if (form.OwnerId != User.Id) throw new UnauthorizedAccessException();

            if (enable.HasValue) form.Enable = enable.Value;
            if (name != null) form.Name = name;
            if (rewriteable.HasValue) {
                if (form.Anonymous && rewriteable.Value) {
                    throw new InvalidOperationException("匿名問卷不可設定為可重新填寫");
                }

                form.Rewriteable = rewriteable.Value;
            }

            if (userType.HasValue) form.UserType = userType.Value;

            if (order.HasValue) {
                form.Order = order.Value;
            }
            await Database.SaveChangesAsync();

            return new ApiResult() {
                Result = form
            };
        }
    }
}
