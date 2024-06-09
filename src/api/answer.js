import { post,get } from "./api"

export function GetFillInTestAnswer(username, questionnaireId, submissionId) {
    return get("/testAnswer/"+username+"/"+questionnaireId+"/"+submissionId);
}

export function GetFillInNormalAnswer(username, questionnaireId, submissionId) {
    return get("/normalAnswer/"+username+"/"+questionnaireId+"/"+submissionId);
}