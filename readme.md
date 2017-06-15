QuizForms(組織內部問卷系統)
=====
本問卷系統可針對使用組織/單位在原有系統上使用自訂的使用者驗證，不用變更原有系統，可設定多個問卷管理者、頂級管理者。

支援無限子問題，可於線上匯出Excel與CSV格式之問卷統計資料。

## 方案結構
```
QuizForms: 後端主程式(.net Core)
QuizFormsSDK: JavaScript/TypeScript SDK
QuizFormsFrontend: 前端主程式(TypeScript & Angular2)，編譯後必須複製至QuizForms/wwwroot目錄內
```