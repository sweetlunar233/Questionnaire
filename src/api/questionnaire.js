import { post,get } from "./api"

export function GetUnreleasedQs(username){
    let data = {};
    data.username = username;
    return get("/userManage/unreleased",data);
}

export function GetReleasedQs(username){
    let data = {};
    data.username = username;
    return get("/userManage/released",data);
}

export function GetFilledQs(username){
    let data = {};
    data.username = username;
    return get("/userManage/filled",data);
}

export function GetAllReleasedQs(){
    let data = {};
    return get("/userManage/square",data);
}

export function DeleteUnreleasedQs(id){
    let data = {};
    data.id = id;
    return post("/userManage/unreleased", id);
}

export function DeleteReleasedQs(id){
    let data = {};
    data.id = id;
    return post("/userManage/released", id);
}

export function DeleteFilledQs(id){
    let data = {};
    data.id = id;
    return post("/userManage/filled", id);
}

export function UpdateIsOpening(id){
    let data = {};
    data.id = id;
    return post("/userManage/released",id);
}