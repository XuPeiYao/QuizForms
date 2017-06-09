using EzCoreKit.Extensions;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using QuizForms.Quiz.Factories;
using QuizForms.Quiz.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Quiz {
    public partial class QuizRecordControllerBase<IdType, FormType, QuestionType, RecordType> {
        public async Task<FileStreamResult> DownloadExcel(
            FormType form,
            long start = 0,
            long end = -1) {
            DateTime startDateTime = DateTimeFactory.ConvertFromJsTime(start);
            
            if (end == -1) end = Database.Records.Where(x=>x.FormId.Equals(form.Id)).Max(x => x.Time) + 1;
            
            DateTime endDateTime = DateTimeFactory.ConvertFromJsTime(end);

            return this.File(
                await GetExcel(form, start, end),
                "text/csv",
                $"新生問卷紀錄 - {form.Name}({startDateTime.AddHours(8).ToString("yyyy-MM-dd HHmmss")}至{endDateTime.AddHours(8).ToString("yyyy-MM-dd HHmmss")}).xlsx");
        }

        public async Task<Stream> GetExcel(
            FormType form,
            long start,
            long end = -1) {
            ExcelPackage excelPackage = new ExcelPackage();
            ExcelWorkbook workbook = excelPackage.Workbook;
            int qIndex = 1;

            //寫過這張問卷的使用者
            string[] writedUsers = Database.Records
                .Where(x => x.FormId.Equals(form.Id) && x.Time >= start && x.Time < end)
                .Select(x => x.UserId)
                .Distinct()
                .ToArray();

            foreach (var question in Database
                .Questions
                .Where(x => x.FormId.Equals(form.Id) && x.ParentId == null && x.IsQuestion())
                .OrderBy(x => x.Order).ToArray()) {
                //以題目名稱作為工作表名稱
                ExcelWorksheet worksheet = workbook.Worksheets.Add($"問題{qIndex++}");

                worksheet.Cells[1, 1].Value = "題目內容:";
                worksheet.Cells[1, 2].Value = question.Text;
                worksheet.Cells[2, 1].Value = "題目類型:";
                worksheet.Cells[2, 2].Value = question.Type;
                worksheet.Column(1).Width = 14;

                List<IQuestion<IdType>> twoLevelAfterOptions = new List<IQuestion<IdType>>();
                void ListOptions(IQuestion<IdType> q, string id, ref int rowPosition){
                    for (int i = 0; i < q.Children.Length; i++) {
                        var temp = "";
                        if (id == null) {
                            worksheet.Cells[rowPosition, 1].Value = temp = (i + 1).ToString();
                        } else {
                            worksheet.Cells[rowPosition, 1].Value = temp = id + "_" + (i + 1);
                            twoLevelAfterOptions.Add(q.Children[i]);
                        }
                        worksheet.Cells[rowPosition, 2].Value = q.Children[i].Type;
                        worksheet.Cells[rowPosition, 3].Value = q.Children[i].Text;
                        rowPosition++;
                        if (q.Children[i].Children?.Length > 0) {
                            ListOptions(q.Children[i], temp, ref rowPosition);
                        }
                    }
                }

                List<IQuestion<IdType>> GetAllOptions(IQuestion<IdType> q){
                    List<IQuestion<IdType>> result = new List<IQuestion<IdType>>();
                    for (int i = 0; i < q.Children.Length; i++) {
                        result.Add(q.Children[i]);
                        if (q.Children[i].Children?.Length > 0) {
                            result.AddRange(GetAllOptions(q.Children[i]));
                        }
                    }
                    return result;
                }

                int row = 3;
                if (question.Type == QuestionTypes.RadioGroup ||
                    question.Type == QuestionTypes.Dropdown
                    /*question.QuestionType == QuestionTypes.BooleanGroup*/) {
                    worksheet.Cells[row, 1].Value = "選項編號";
                    worksheet.Cells[row, 2].Value = "選項型別";
                    worksheet.Cells[row, 3].Value = "選項內容";
                    row++;

                    ListOptions(question, null, ref row);
                }

                var allOptions = GetAllOptions(question);

                worksheet.Cells[row, 1].Value = "帳號";
                if (question.Type != QuestionTypes.CheckboxGroup) {
                    worksheet.Cells[row, 2].Value = "值";
                    for (int col = 0; col < twoLevelAfterOptions.Count; col++) {
                        worksheet.Cells[row, col + 3].Value = twoLevelAfterOptions[col].Text;
                    }
                } else {
                    for (int col = 0; col < allOptions.Count; col++) {
                        worksheet.Cells[row, col + 2].Value = allOptions[col].Text;
                    }
                }
                row++;

                worksheet.View.FreezePanes(row, 1);



                if (question.Type == QuestionTypes.CheckboxGroup) {
                    for (int userIndex = 0; userIndex < writedUsers.Length; userIndex++) {
                        worksheet.Cells[row, 1].Value = writedUsers[userIndex];
                        for (int col = 0; col < allOptions.Count; col++) {
                            var record = (from t in Database.Records
                                          where t.QuestionId.Equals(allOptions[col].Id) &&
                                               t.UserId == writedUsers[userIndex]
                                          select t).FirstOrDefault();

                            if (record == null) {
                                if (allOptions[col].Type == QuestionTypes.Checkbox) {
                                    worksheet.Cells[row, col + 2].Value = "0";
                                }
                            } else {
                                if (allOptions[col].Type == QuestionTypes.Checkbox) {
                                    worksheet.Cells[row, col + 2].Value = "1";
                                } else {
                                    worksheet.Cells[row, col + 2].Value = record.Value;
                                }
                            }
                        }
                        row++;
                    }
                } else {
                    for (int userIndex = 0; userIndex < writedUsers.Length; userIndex++) {
                        worksheet.Cells[row, 1].Value = writedUsers[userIndex];

                        if (question.Type == QuestionTypes.RadioGroup ||
                            question.Type == QuestionTypes.Dropdown) {
                            for (int optIndex = 0; optIndex < question.Children.Length; optIndex++) {
                                var record = (from t in Database.Records
                                              where t.QuestionId.Equals(question.Children[optIndex].Id) &&
                                                    t.UserId == writedUsers[userIndex]
                                              select t).FirstOrDefault();
                                if (record == null) continue;
                                worksheet.Cells[row, 2].Value = optIndex + 1;
                            }

                            for (int optIndex = 0; optIndex < twoLevelAfterOptions.Count; optIndex++) {
                                var record = (from t in Database.Records
                                              where t.QuestionId.Equals(twoLevelAfterOptions[optIndex].Id) &&
                                                    t.UserId == writedUsers[userIndex]
                                              select t).FirstOrDefault();
                                if (record == null) continue;
                                worksheet.Cells[row, 3 + optIndex].Value = record.Value;
                            }

                        } else {//input
                            var record = (from t in Database.Records
                                          where t.QuestionId.Equals(question.Id) &&
                                                t.UserId == writedUsers[userIndex]
                                          select t).FirstOrDefault();
                            worksheet.Cells[row, 2].Value = record?.Value;
                        }

                        row++;
                    }
                }

            }

            return new MemoryStream(excelPackage.GetAsByteArray());
        }
    }
}
