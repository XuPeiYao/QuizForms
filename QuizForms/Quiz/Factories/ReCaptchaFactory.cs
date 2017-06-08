using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace QuizForms.Quiz.Factories {
    public static class ReCaptchaFactory {
        public static bool Enable = false;
        public static string SiteKey = null;
        public static string SecretKey = null;

        /// <summary>
        /// 驗證ReCAPTCHA
        /// </summary>
        /// <param name="code">驗證碼</param>
        public static async void Vaild(string code) {
            if (!Enable) return;
            HttpClient http = new HttpClient();
            var result = await http.PostAsync("https://www.google.com/recaptcha/api/siteverify",
                new FormUrlEncodedContent(new[]{
                    new KeyValuePair<string, string>("secret", SecretKey),
                    new KeyValuePair<string, string>("response", code)
                }));

            var responseJSON = JObject.Parse(await result.Content.ReadAsStringAsync());

            bool success = responseJSON.Value<bool>("success");

            if (!success) {
                throw new ArgumentException("ReCAPTCHA驗證失敗");
            }
        }
    }
}