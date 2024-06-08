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
}

export function modifyUserInfo(username, email, password, zhibi){
    let data = {};
    data.username = username;
    data.email = email;
    data.password = password;
    data.zhibi = zhibi;
    return post("/personal/message", data);
}

export function updateUserphotoInMassage(username, photonumber, status){
    let data = {};
    data.username = username;
    data.photonumber = photonumber;
    data.status = status;
    return post("/personal/message", data);
}

export function updateUserphotoInShop(username, photonumber, status){
    let data = {};
    data.username = username;
    data.photonumber = photonumber;
    data.status = status;
    return post("/personal/shop", data);
}

export function modifyUserMoney(username, email, password, zhibi){
    let data = {};
    data.username = username;
    data.email = email;
    data.password = password;
    data.zhibi = zhibi;
    return post("/personal/shop", data);
}

// export function updateUserInfo(username, email){
//     let data = {};
//     data.username = username;
//     data.email = email;
//     return post("/userManage/personal",data);
// }

// export function updateUserPassword(username, password){
//     let data = {};
//     data.username = username;
//     data.password = password;
//     return post("/userManage/personal",data);
// }