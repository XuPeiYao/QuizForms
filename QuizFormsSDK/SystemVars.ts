module QuizForms {
    export var SystemVars = {
        apiUrl: location.origin + "/api/",
        onException: (e) => { },
        disableException: false
    };

    export function loadFromJSON(type: any, json: any): any {
        var result = new type;
        for (var key in json) {
            result[key] = json[key];
        }
        return result;
    }
}