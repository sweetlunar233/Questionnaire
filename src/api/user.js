import { post,get } from "./api"

export function Login(email,password){
    let data = {};
    data.email = email;
    data.password = password;
    return post("/user/login",data);
}