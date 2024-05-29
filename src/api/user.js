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