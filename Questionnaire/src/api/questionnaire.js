import { post,get } from "./api"

export function GetUnreleasedQs(username){
    let data = {};
    data.username = username;
    return get("/userManage/unreleased/"+username);
}

export function GetReleasedQs(username){
    let data = {};
    data.username = username;
    return get("/userManage/released/"+username);
}

export function GetFilledQs(username){
    let data = {};
    data.username = username;
    return get("/userManage/filled/"+username);
}

export function GetAllReleasedQs(){
    return get("/userManage/square");
}

export function DeleteUnreleasedQs(id){
    let data = {};
    data.id = id;
    return post("/userManage/unreleased", id);
}

export function DeleteFilledQs(id){
    let data = {};
    data.id = id;
    return post("/userManage/filled", id);
}

//update:0
//delete:1
export function UpdateOrDelete(id, flag){
    let data = {};
    data.id = id;
    data.flag = flag;
    return post("/userManage/released",data);
}

export function check(username, questionnaireId, type){
    return get("/userManage/square/"+username+"/"+questionnaireId+"/"+type);
}

export function checkFilled(questionnaireId){
    return get("/userManage/filled/"+questionnaireId);
}