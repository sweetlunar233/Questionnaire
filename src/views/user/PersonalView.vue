
<script setup>
// import { ref } from 'vue'
// import { ElMessage } from 'element-plus'
// import store from '../../store';


// // 校验确认密码是否与新密码一致的函数
// const checkPassword = (rule, value, callback) => {
//     if (value !== newPassword.value) {
//         callback(new Error('两次输入的密码不一致'))
//     } else {
//         callback()
//     }
// }

// // 定义变量和规则
// const rules = {
//     email: [
//         { required: true, message: '请输入用户邮箱', trigger: 'blur' },
//         { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
//     ],
//     newPassword: [
//         { required: true, message: '请输入新密码', trigger: 'blur' },
//         {
//             pattern: /^\S{5,25}$/,
//             message: '密码必须为5到25位非空字符',
//             trigger: 'blur'
//         }
//     ],
//     confirmPassword: [
//         { required: true, message: '请确认密码', trigger: 'blur' },
//         { validator: checkPassword, trigger: 'blur' }
//     ]
// }

// // 定义用户信息和密码相关变量
// const userInfo = ref({
//     // 初始化用户信息
//     username: "",
//     email: "",
//     money: ""
// })
// const newPassword = ref('')
// const confirmPassword = ref('')

// // 修改密码弹窗的显示状态
// const changePasswordVisible = ref(false)




// import {getUserMessagePersonal, updateUserInfo, updateUserPassword} from "../../api/user.js"

// const GetUserMessage = (username) => {
//     var promise = getUserMessagePersonal(username);
//     promise.then((result)=>{
//         userInfo.value.username = result.username;
//         userInfo.value.email = result.email;
//         userInfo.value.money = result.money;
//     })
// }
// GetUserMessage(store.state.nowuser.username);

// const UpdateUserInfo = (username, useremail) => {
//     store.state.nowuser.email = useremail;
//     var promise = updateUserInfo(username, useremail);
//     promise.then((result)=>{
//         if(result.message === "True")
//         {
//             GetUserMessage(store.state.nowuser.username);
//             ElMessage.success("修改成功")
//         }
//         else
//         {
//             ElMessage.error(result.content);
//         }
        
//     })
// }

// // 提交修改密码的函数
// const submitPassword = (username, password) => {
//     store.state.nowuser.password = password;
//     var promise = updateUserPassword(username, password);
//     promise.then((result)=>{
//         if(result.message === "True")
//         {
//             ElMessage.success("修改成功")
//         }
//         else
//         {
//             ElMessage.error(result.content);
//         }
//         // 清空表单数据
//         newPassword.value = '';
//         confirmPassword.value = '';
//         // 关闭弹窗
//         changePasswordVisible.value = false;
//     })
// }

// const cancelPassword = () => {
//     ElMessage.info('取消修改')

//     newPassword.value = ''
//     confirmPassword.value = ''

//     changePasswordVisible.value = false;

// }



</script>

<template>
    <el-card class="page-container">
        <div class="shell">
        <div class="box">
            <div class="ball"></div>
            <div class="shadow"></div>
        </div>

        <div class="box">
            <div class="ball"></div>
            <div class="shadow"></div>
        </div>

        <div class="box">
            <div class="ball"></div>
        </div>
    </div> 
    </el-card>
</template>

<style scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;
}



.box {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 500px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        .ball {
            animation: float 3.5s ease-in-out infinite;
            height: 200px;
            width: 200px;
            border-radius: 50%;
            position: relative;
            /* 为球的背景添加径向渐变，渐变中心在 77% 水平、30% 垂直位置 */
            background: radial-gradient(circle at 77% 30%,
                    /* 渐变起点颜色为白色，半径为 5 像素 */
                    white 5px,
                    /* 渐变颜色从白色平滑过渡到淡蓝色，半径为 8% */
                    aqua 8%,
                    /* 渐变颜色从淡蓝色平滑过渡到深蓝色，半径为 60% */
                    darkblue 60%,
                    /* 渐变颜色从深蓝色平滑过渡到淡蓝色，半径为 100% */
                    aqua 100%);
            /* 为球添加多重内阴影效果 */
            /* 内部白色阴影，宽度 20 像素 */
            box-shadow: inset 0 0 20px #fff,
                /* 内部淡蓝色阴影，位置偏右 10 像素，宽度 46 像素 */
                inset 10px 0 46px #eaf5fc,
                /* 内部浅蓝色阴影，位置偏右 88 像素，宽度 60 像素 */
                inset 88px 0px 60px #c2d8fe,
                /* 内部淡橙色阴影，位置偏左上方，宽度 100 像素 */
                inset -20px -60px 100px #fde9ea,
                /* 内部淡橙色阴影，位置偏下方，宽度 140 像素 */
                inset 0 50px 140px #fde9ea,
                /* 外部白色阴影，宽度 90 像素 */
                0 0 90px #fff;
        }

        .box:nth-child(2) {
            z-index: -999;
        }

        .box:nth-child(2) .ball {
            left: -80px;
            top: 35px;
            width: 100px;
            height: 100px;
            z-index: -999;
            opacity: .5;
        }

        .box:nth-child(3) .ball {
            left: 80px;
            top: -80px;
            width: 20px;
            height: 20px;
            opacity: .1;
        }

        .shadow {
            background: #b490b27c;
            width: 150px;
            height: 40px;
            top: 70%;
            animation: expand 4s infinite;
            position: absolute;
            border-radius: 50%;
        }

        .box:nth-child(2) .shadow {
            width: 90px;
            height: 20px;
            top: 72.5%;
            left: -75px;
            opacity: .4;
        }

        /* 添加漂浮动画 */
        @keyframes float {
            0% {
                transform: translatey(0px) rotate(-10deg);
            }

            50% {
                transform: translatey(-80px) rotate(10deg);
            }

            100% {
                transform: translatey(0px) rotate(-10deg);
            }
        }

        @keyframes expand {

            0%,
            100% {
                transform: scale(0.5);
            }

            50% {
                transform: scale(1);
            }
        } 
</style>