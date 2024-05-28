import { post,get } from "./api"

export function GetUser(username,password){
    let data = {};
    data.username = username;
    data.password = password;
    return get("/user/login",data);
}

export function postUser(username,password){
    let data = {};
    data.username = username;
    data.password = password;
    return post("/user/login",data);
}