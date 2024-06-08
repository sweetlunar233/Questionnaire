import { post,get } from "./api"

export function getQuestionnaireFill(
    username,
    questionnaireId
){
    return get("/questionnaireFill/" + username + "/" + questionnaireId + "/");
}
