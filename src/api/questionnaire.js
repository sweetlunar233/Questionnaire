import { post,get } from "./api"

export function GetCreatedQs(username,status){
    let data = {};
    data.username = username;
    if(status == 'Draft')
        return get("/questionnaire/GetDraftQs",data);
    else
        return get("questionnaire/GetOtherQs",data);
}

export function GetFilledQs(username){
    let data = {};
    data.username = username;
    return get("questionnaire/GetFilledQs",data);
}

export function DeleteQs(id){
    let data = {};
    data.id = id;
    return post("questionnaire/DeleteQs",id);
}