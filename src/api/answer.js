import { post,get } from "./api"

export function GetFill(questionnaireId) {
    return get("/testAnswer/"+questionnaireId)
}

export function GetDesign(questionnaireId) {
    return get("/testAnswer/"+questionnaireId)
}