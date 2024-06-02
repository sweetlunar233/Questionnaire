import axios from "axios";

const serveAddress = "http://127.0.0.1:8000";

export function post(url,data){
    return new Promise((resolve,reject) => {
        axios
            .post(serveAddress+url,data)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                // 错误处理
            })
    });
}

export function get(url,param){
    return new Promise((resolve,reject) => {
        axios
            .get(serveAddress+url,{
                params:param
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                // 错误处理
            })
    });
}