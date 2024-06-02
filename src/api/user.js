import { post,get } from "./api"

export function getUserMessage(username, url){
    let data = {};
    data.username = username;
    return get(url,data);
}

export function postUserMessage(username,password, email){
    let data = {};
    data.username = username;
    data.password = password;
    data.email = email;
    return post("/login",data);
}

export function updateUserInfo(username, email){
    let data = {};
    data.username = username;
    data.email = email;
    return post("/user/updateUserInfo",data);
}

export function updateUserPassword(username, password){
    let data = {};
    data.username = username;
    data.password = password;
    return post("/user/updateUserPassword",data);
}