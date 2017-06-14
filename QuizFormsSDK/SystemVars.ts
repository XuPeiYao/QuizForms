module QuizForms {
    export var SystemVars = {
        get origin(): string {
            if (!window.location.origin) {
                (<any>(window.location)).origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
            }
            return location.origin;
        },
        get apiUrl(): string {
            return location.origin + "/api/";
        },
        onException: (e: any) => { },
        disableException: false
    };    

    export function createHttpClient(): HttpClient {
        var client = new HttpClient();
        client.withCredentials = true;

        return client;
    }

    export function loadFromJSON(type: any, json: any): any {
        var result = new type;
        for (var key in json) {
            result[key] = json[key];
        }
        return result;
    }
}
QuizForms.HttpResponse.defaultJSONHandler = (json: any) => {
    if (json.success) return;
    if (QuizForms.SystemVars.disableException) return;


    var exception = {
        name: "錯誤",
        message: json.result
    }
    QuizForms.SystemVars.onException(exception);
    throw exception;
}