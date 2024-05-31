import { post,get } from "./api"

export function getUserMessage(username){
    let data = {};
    data.username = username;
    return get("/user/getUserMessage",data);
}

export function postUserMessage(username,password, email){
    let data = {};
    data.username = username;
    data.password = password;
    data.email = email;
    return post("/user/postUserMessage",data);
}

export function updateUserInfo(username, email){
    let data = {};
    data.username = username;
    data.email = email;
    return post("/user/updateUserInfo",data);
}

export function updateUserPassword(password){
    let data = {};
    data.password = password;
    return post("/user/updateUserPassword",data);
}