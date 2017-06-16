using Microsoft.AspNetCore.Mvc.ModelBinding;
using QuizForms.Quiz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Models.Binders {
    public class FormModelBinder : IModelBinder {
        public async Task BindModelAsync(ModelBindingContext bindingContext) {
            var ModelValue = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
            if (ModelValue == ValueProviderResult.None) return;


            var database = (QuizDbContext<Guid, Form, Question, Record, Writed>)bindingContext
                .HttpContext
                .RequestServices//透過DI取得本次Request產生之Scoped範圍的DbContext實例
                .GetService(typeof(QuizDbContext<Guid, Form, Question, Record, Writed>));

            try {
                var result = (from t in database.Forms
                              where t.Id == Guid.Parse(ModelValue.FirstValue)
                              select t).First();
                bindingContext.Result = ModelBindingResult.Success(result);
            } catch (Exception e) {
                bindingContext.Result = ModelBindingResult.Failed();
                if (e is InvalidOperationException) {
                    throw new KeyNotFoundException($"找不到指定的{nameof(Form)}實例", e);
                } else {
                    throw e;
                }
            }
        }
    }
}
