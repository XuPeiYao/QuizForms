using System;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using QuizForms.Models.Binders;

namespace QuizForms.Models {
    public class AppModelBinderProvider : IModelBinderProvider {
        public IModelBinder GetBinder(ModelBinderProviderContext context) {
            if (context?.Metadata?.UnderlyingOrModelType == null) return null;

            if (context.Metadata.UnderlyingOrModelType == typeof(Form)) {
                return new FormModelBinder();
            } else if (context.Metadata.UnderlyingOrModelType == typeof(Question)) {
                return new QuestionModelBinder();
            } else if (context.Metadata.UnderlyingOrModelType == typeof(Record)) {
                return new RecordModelBinder();
            } else {
                return null;
            }
        }
    }
}