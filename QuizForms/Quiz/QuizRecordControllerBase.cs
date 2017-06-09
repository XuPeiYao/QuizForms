using EzCoreKit.AspNetCore.Mvc;
using EzCoreKit.Extensions;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using QuizForms.Quiz.Factories;
using QuizForms.Quiz.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace QuizForms.Quiz {
    public partial class QuizRecordControllerBase<IdType, FormType, QuestionType, RecordType>
        : QuizControllerBase<IdType, FormType, QuestionType, RecordType>
        where IdType : struct
        where FormType : class, IForm<IdType>, new()
        where QuestionType : class, IQuestion<IdType>, new()
        where RecordType : class, IRecord<IdType>, new() {

        public QuizRecordControllerBase(
            QuizDbContext<IdType, FormType, QuestionType, RecordType> dbContext
            ) : base(dbContext) {
        }

        /// <summary>
        /// 送出問卷
        /// </summary>
        /// <param name="form">目標問卷實體</param>
        /// <param name="formJsonString">作答內容</param>
        /// <param name="code">reCAPTCHA Code</param>
        /// <returns>操作結果</returns>
        [HttpPost("{form}")]
        [Authority(Minimum = UserTypes.Normal)]
        public async Task<JsonResult> Submit(
            [Required][FromRoute]FormType form,
            [Required][FromForm]string formJsonString,
            [FromForm]string code) {
            if (!form.Enable) throw new UnauthorizedAccessException("該問卷已關閉");
            if (Database.Records.Any(x => x.FormId.Equals(form.Id) && x.UserId==User.Id)) {
                throw new InvalidOperationException("您已經作答過此問卷");
            }
            
            ReCaptchaFactory.Vaild(code);

            var questions = (from t in Database.Questions
                             //過濾出可回答問題
                             where t.FormId.Equals(form.Id) && t.ParentId == null
                             select t).ToArray().Where(x => QuizFactory.IsQuestion(x));

            var rawRecord = JObject.Parse(formJsonString);
            var keys = rawRecord.Properties().Select(x => x.Name);

            /*
             *  {
             *      "QuestionID" : value,
             *      "1" : [Boolean],//是否勾選  如  我同意
             *      "2" : ["3","4",{"5":["6","7"]}] //多重布林值勾選
             *      "3" : ["8","9",{"10":"TEST VALUE"}] //多重布林值勾選+文字輸入
             *      "4" : {"11":"TEST VALUE2"}//單選一+文字輸入
             *      "5" : {"12":["13","14"]}
             *  }
             */
            
            #region 檢查該有的題目都有資料
            foreach (var question in questions) {
                if (keys.Contains(question.Id.ToString())) continue;
                if (!question.Required) continue;//非強制回答內容
                throw new InvalidOperationException("您有題目忘記作答，請再檢查一次");
            }
            #endregion
            
            DateTime now = DateTime.Now;
            
            List<RecordType> DeepRecord(IQuestion<IdType> q, JToken ans){
                List<RecordType> result = new List<RecordType>();
                switch (q.Type) {
                    #region 樹狀題目
                    case QuestionTypes.Checkbox:
                    case QuestionTypes.CheckboxGroup:
                        if (q.Type == QuestionTypes.Checkbox) {
                            result.Add(new RecordType() {
                                QuestionId = q.Id
                            });
                        }

                        var ary = (JArray)ans;
                        foreach (var item in ary) {
                            if (item.Type == JTokenType.String) {//普通選項
                                result.Add(new RecordType() {
                                    QuestionId = q.Children.First(x => x.Id.Equals(QuizFactory.ParseId<IdType>(item.Value<string>()))).Id,
                                });
                            } else if (item.Type == JTokenType.Object) { //複合選項
                                var obj_Temp = item.Value<JObject>();
                                foreach (var qid in obj_Temp.Properties().Select(x => x.Name)) {
                                    result.AddRange(DeepRecord(q.Children.First(x => x.Id.Equals(QuizFactory.ParseId<IdType>(qid))), obj_Temp[qid]));
                                }
                            }
                        }
                        break;
                    case QuestionTypes.Radio:
                    case QuestionTypes.RadioGroup:
                        if (q.Type == QuestionTypes.Radio) {
                            result.Add(new RecordType() {
                                QuestionId = q.Id
                            });
                        }

                        if (ans.Type == JTokenType.String) {//普通選項
                            result.Add(new RecordType() {
                                QuestionId = q.Children.First(x => x.Id.Equals(QuizFactory.ParseId<IdType>(ans.Value<string>()))).Id
                            });
                        } else if (ans.Type == JTokenType.Object) { //複合選項
                            var obj_Temp2 = ans.Value<JObject>();
                            foreach (var qid in obj_Temp2.Properties().Select(x => x.Name)) {
                                result.AddRange(DeepRecord(q.Children.First(x => x.Id.Equals(QuizFactory.ParseId<IdType>(qid))), obj_Temp2[qid]));
                            }
                        }
                        break;
                    #endregion

                    #region 單純資料
                    case QuestionTypes.Dropdown://簡易多選一
                        result.Add(new RecordType() {
                            QuestionId = q.Children.First(x => x.Id.Equals(QuizFactory.ParseId<IdType>(ans.Value<string>()))).Id,
                        });
                        break;
                    case QuestionTypes.InputNumber:
                        result.Add(new RecordType() {
                            QuestionId = q.Id,
                            Value = ans.Value<string>()
                        });
                        break;
                    case QuestionTypes.InputText:
                        result.Add(new RecordType() {
                            QuestionId = q.Id,
                            Value = ans.Value<string>()
                        });
                        break;
                    case QuestionTypes.Level:
                        result.Add(new RecordType() {
                            QuestionId = q.Id,
                            Value = ans.Value<string>()
                        });
                        break;
                        #endregion
                }
                return result;
            }

            List<RecordType> record = new List<RecordType>();
            foreach (var question in questions) {
                var userAns = rawRecord[question.Id.ToString()];
                record.AddRange(DeepRecord(question, userAns));
            }
            foreach (var item in record) {
                item.FormId = form.Id;
                item.Time = now.ToJsTime();
                item.UserId = User.Id;
            }
            
            Database.Records.AddRange(record);
            await Database.SaveChangesAsync();

            return new ApiResult();
        }

        /// <summary>
        /// 清除目前登入使用者所填寫的指定問卷
        /// </summary>
        /// <param name="form">問卷實體</param>
        /// <returns>操作結果</returns>
        [HttpDelete("{form}/self")]
        [Authority(Minimum = UserTypes.Normal)]
        public async Task<JsonResult> ClearSelf(
            [Required][FromRoute]FormType form) {
            if (!form.Rewriteable) throw new UnauthorizedAccessException("此問卷送出後不允許清除");
            Database.Records.RemoveRange(Database.Records.Where(x => x.UserId == User.Id && x.FormId.Equals(form.Id)));
            await Database.SaveChangesAsync();
            return new ApiResult();

        }

        /// <summary>
        /// 清除指定問卷
        /// </summary>
        /// <param name="form">問卷實體</param>
        /// <returns>操作結果</returns>
        [HttpDelete("{form}")]
        [Authority(Minimum = UserTypes.Admin)]
        public async Task<JsonResult> Clear(
            [Required][FromRoute]FormType form) {
            if (form.OwnerId != User.Id) throw new UnauthorizedAccessException("並非問卷擁有者");
            Database.Records.RemoveRange(Database.Records.Where(x => x.FormId.Equals(form.Id)));
            await Database.SaveChangesAsync();
            return new ApiResult();

        }



        public enum DownloadTypes { Excel, CSV }
        [HttpGet("download/{form}")]
        public async Task<FileStreamResult> Download(
            [Required][FromRoute]FormType form,
            [FromQuery]DownloadTypes type = DownloadTypes.Excel,
            [FromQuery]long start = 0,
            [FromQuery]long end = -1) {
            switch (type) {
                case DownloadTypes.Excel:
                    return await DownloadExcel(form, start, end);
                case DownloadTypes.CSV:
                    return await DownloadCSV(form, start, end);
            }

            return null;//error
        }
    }
}