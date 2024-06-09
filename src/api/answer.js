import { post,get } from "./api"

export function GetFill(questionnaireId) {
    return get("/answer/GetAnswer/"+questionnaireId)
}

export function GetDesign(questionnaireId) {
    return get("/answer/GetAnswer/"+questionnaireId)
}