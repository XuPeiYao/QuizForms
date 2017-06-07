using EzCoreKit.Extensions;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizForms.Quiz.Models {
    /// <summary>
    /// Api執行結果
    /// </summary>
    public class ApiResult {
        /// <summary>
        /// 是否成功操作成功
        /// </summary>
        public bool Success { get; set; } = true;

        /// <summary>
        /// 操作結果類型
        /// </summary>
        public ApiResultTypes Type { get; set; } = new ApiResultTypes();

        private object _Result;
        /// <summary>
        /// 操作結果
        /// </summary>
        public object Result {
            get => _Result;
            set {
                _Result = value;
                Success = value == null || !(value is Exception);
                if (value != null) {
                    Type.Name = value.GetType().Name;
                    try {
                        if (value is IList list) {
                            Type.Name = list.GetType().GenericTypeArguments.First().Name + "List";
                            Type.Length = list.Count;
                        }
                    } catch { }
                }
            }
        }

        /// <summary>
        /// 操作完成時間
        /// </summary>
        public long Time { get; set; } = DateTime.Now.ToJsTime();


        public static JsonSerializerSettings GetJsonSerializerSettings() {
            var SerializerSettings = new JsonSerializerSettings() {
                Formatting = Formatting.None,
                ContractResolver = new CamelCasePropertyNamesContractResolver(),//屬性首字轉小寫
                NullValueHandling = NullValueHandling.Ignore,//忽略值為null的項目
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };
            SerializerSettings.Converters.Add(new StringEnumConverter());
            return SerializerSettings;
        }
        /// <summary>
        /// 隱含轉換為JsonResult
        /// </summary>
        public static implicit operator JsonResult(ApiResult result) {
            return new JsonResult(result, GetJsonSerializerSettings());
        }

        public override string ToString() {
            return JsonConvert.SerializeObject(this, GetJsonSerializerSettings());
        }
    }
}
