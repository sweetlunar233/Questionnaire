import { post,get } from "./api"

export function GetFill(username, questionnaireId, submissionId) {
    return get("/testAnswer/"+username+"/"+questionnaireId+"/"+submissionId);
}