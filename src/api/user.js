import { post,get } from "./api"

export function Login(username,password){
    let data = {};
    data.username = username;
    data.password = password;
    return post("/user/login",data);
}

export function Register(username,email,password){
    let data = {};
    data.username = username;
    data.email = email;
    data.password = password;
    return post("/user/register",data);
}