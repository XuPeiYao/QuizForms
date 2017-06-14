using EzCoreKit.Extensions;
using Microsoft.AspNetCore.Mvc;
using QuizForms.Quiz.Factories;
using QuizForms.Quiz.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuizForms.Quiz {
    public partial class QuizRecordControllerBase<IdType, FormType, QuestionType, RecordType> {
        public async Task<FileStreamResult> DownloadCSV(
            FormType form,
            long start = 0,
            long end = -1) {
            DateTime startDateTime = DateTimeFactory.ConvertFromJsTime(start);

            if (end == -1) end = Database.Records.Where(x => x.FormId.Equals(form.Id)).Max(x => x.Time) + 1;

            DateTime endDateTime = DateTimeFactory.ConvertFromJsTime(end);

            return this.File(
                await GetCSV(form, start, end),
                "text/csv",
                $"新生問卷紀錄 - {form.Name}({startDateTime.AddHours(8).ToString("yyyy-MM-dd HHmmss")}至{endDateTime.AddHours(8).ToString("yyyy-MM-dd HHmmss")}).csv");
        }

        public async Task<Stream> GetCSV(
            FormType form,
            long start = 0,
            long end = -1) {
            //寫過這張問卷的使用者
            string[] writedUsers = Database.Records
                .Where(x => x.FormId.Equals(form.Id) && x.Time >= start && x.Time < end)
                .Select(x => x.UserId)
                .Distinct()
                .ToArray();

            var questions = Database
                .Questions
                .Where(x => x.FormId.Equals(form.Id) && x.ParentId == null && x.IsQuestion())
                .OrderBy(x => x.Order).ToArray();

            List<IQuestion<IdType>> GetAllOptions(IQuestion<IdType> q)
            {
                List<IQuestion<IdType>> result_ = new List<IQuestion<IdType>>();
                switch (q.Type) {
                    case QuestionTypes.Radio:
                        if (q.Children.Length == 0) break;
                        foreach (var c in q.Children) {
                            result_.AddRange(GetAllOptions(c));
                        }
                        break;
                    case QuestionTypes.Checkbox:
                        result_.Add(q);
                        foreach (var c in q.Children) {
                            result_.AddRange(GetAllOptions(c));
                        }
                        break;
                    case QuestionTypes.InputText:
                    case QuestionTypes.InputNumber:
                    case QuestionTypes.Level://直接數值
                        result_.Add(q);
                        break;
                    case QuestionTypes.Dropdown://單選
                    case QuestionTypes.RadioGroup:
                        result_.Add(q);
                        #region 檢查展開項目
                        foreach (var c in q.Children) {
                            result_.AddRange(GetAllOptions(c));
                        }
                        #endregion
                        break;
                    case QuestionTypes.CheckboxGroup:
                        #region 檢查展開項目
                        foreach (var c in q.Children) {
                            result_.AddRange(GetAllOptions(c));
                        }
                        #endregion
                        break;
                }
                return result_;
            }

            var fullOptions = questions.SelectMany(x => GetAllOptions(x));

            MemoryStream result = new MemoryStream();
            StreamWriter writer = new StreamWriter(result, Encoding.UTF8);

            writer.WriteLine("\"帳號\"," + string.Join(",", fullOptions.Select(x => '"' + x.Text.Replace("\"", "\"\"") + '"')));

            writer.Flush();

            var records = Database.Records.Where(x => x.FormId.Equals(form.Id)).ToArray();
            foreach (var user in writedUsers) {//一個使用者一行
                writer.Write(user);//userid

                foreach (var question in fullOptions) {//列舉
                    var record = records.FirstOrDefault(x => x.UserId == user && x.QuestionId.Equals(question.Id));
                    string value = string.Empty;
                    switch (question.Type) {
                        case QuestionTypes.Checkbox:
                            bool @checked = record != null;
                            value = @checked ? "1" : "0";
                            break;
                        case QuestionTypes.InputText:
                        case QuestionTypes.InputNumber:
                        case QuestionTypes.Level://直接數值
                            value = record?.Value ?? "";
                            break;
                        case QuestionTypes.Dropdown://單選
                        case QuestionTypes.RadioGroup:
                            var selected = question
                                .Children
                                .Select((x, i) => new { index = i, obj = x })
                                .FirstOrDefault(x => records.Any(y => y.QuestionId.Equals(x.obj.Id) && y.UserId == user));

                            value = (selected.index + 1).ToString();
                            break;
                    }
                    writer.Write(",\"" + value.Replace("\"", "\"\"") + '"');
                }

                writer.WriteLine();
                writer.Flush();
            }


            result.Position = 0;
            return result;
        }
    }
}
