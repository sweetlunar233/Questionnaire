import { post,get } from "./api"

export function getUserMessage(username){
    let data = {};
    data.username = username;
    return get("/login",data);
}

export function postUserMessage(username,password, email){
    let data = {};
    data.username = username;
    data.password = password;
    data.email = email;
    return post("/login",data);
<<<<<<< HEAD
=======
}

export function getUserMessagePersonal(username){
    let data = {};
    data.username = username;
    return get("/userManage/personal",data);
>>>>>>> 4cecf9a98b667b24b8ab78a43f7b212313cc6505
}

export function updateUserInfo(username, email){
    let data = {};
    data.username = username;
    data.email = email;
    return post("/userManage/personal",data);
}

export function updateUserPassword(username, password){
    let data = {};
    data.username = username;
    data.password = password;
    return post("/userManage/personal",data);
}