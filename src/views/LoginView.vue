<script setup>
    import { ref } from "vue";
    import NavigationBarWithoutUser from "@/components/NavigationBarWithoutUser.vue";
    import { useRouter } from 'vue-router';
    import store from "@/store";

    const navigation2 = ref(NavigationBarWithoutUser);
    const isLogin = ref(1);
    const router = useRouter();

    const gotoUserManage = () => {
        router.push('/userManage');
    };

    function btnIn(elementId) {
        document.getElementById(elementId).classList.add("zoom-btn");
    }
    function btnOut(elementId) {
        document.getElementById(elementId).classList.remove("zoom-btn");
    }

    function updateNowuser(result) {
        store.state.nowuser.username = result.username;
        store.state.nowuser.password = result.password;
        store.state.nowuser.email = result.email;
        store.state.nowuser.money = result.money;
        store.state.nowuser.own_photos = result.own_photos;
    }

    import { getUserMessage, postUserMessage } from "@/api/user";
    import { ElMessage } from "element-plus";

    const registerData = ref({
        username: "",
        password: "",
        password2: "",
        email: ""
    })

    const register = () => {
        //格式校验
        if (!/^\S{1,20}$/.test(registerData.value.username)) {
            ElMessage.error('用户名必须为1到20个非空字符');
            return;
        }
        if (!/^.+@.+\..+$/.test(registerData.value.email)) {
            ElMessage.error('邮箱格式不正确');
            return;
        }
        if (!/^.{5,25}$/.test(registerData.value.password)) {
            ElMessage.error('密码必须为5到25位非空字符');
            return;
        }
        if (registerData.value.password != registerData.value.password2) {
            ElMessage.error("两次密码不一致");
            return;
        }
        //传给后端
        var promise = postUserMessage(registerData.value.username, registerData.value.password, registerData.value.email);
        promise.then((result)=>{
            //跳转到登陆界面，等待用户登陆邮箱验证，注册成功在邮箱中显示
            ElMessage.success("请前往邮箱验证后登录");
            isLogin.value = 1;
        })
    }

    const loginData = ref({
        username: "",
        password: ""
    })

    const login = () => {
        if (!/^\S{1,20}$/.test(loginData.value.username)) {
            ElMessage.error('用户名必须为1到20个非空字符');
            return;
        }
        if (!/^.{5,25}$/.test(loginData.value.password)) {
            ElMessage.error('密码必须为5到25位非空字符');
            return;
        }

        var promise = postUserMessage(loginData.value.username, loginData.value.password, false);
        promise.then((result)=>{
            if (result.message == "1") {
                ElMessage.error("用户名不存在,请先注册");
                
            }else if(result.message == "2"){
                ElMessage.error("该账户的密码不正确");
            }
            else { //result.message == 0, 登录成功
                //全局用户修改为当前注册用户
                updateNowuser(result);
                gotoUserManage();
            }
        })
        .catch ( (error) => {
            console.log("catch");
        })
    }
</script>

<template>
    <div class="all_container">
        <el-container>
            <el-header>
                <navigation2/>
            </el-header>
            <el-container class="login-container">
                <div class="slider">
                <!-- 登录界面 -->
                <div :class = "isLogin === 1 ? 'form' : 'form hidden'" :model="loginData" >
                    <div class="title"><span>欢迎</span>回来</div>
                    <div class="subtitle">登录你的账号</div>
                    <div class="inputf">
                        <input type="text" placeholder="请输入用户名" v-model="loginData.username"/>
                        <span class="label">用户名</span>
                    </div>
                    <div class="inputf">
                        <input type="password" placeholder="请输入密码" v-model="loginData.password"/>
                        <span class="label">密码</span>
                    </div>
                    <button id="login_btn" @mouseover="btnIn('login_btn')" @mouseout="btnOut('login_btn')" @click="login">登录</button>
                </div>
                <!-- 注册界面 -->
                <div :class = "isLogin === 0 ? 'form' : 'form hidden'" :model="registerData" >
                    <div class="title">开始</div>
                    <div class="subtitle">创建你的账号</div>
                    <div class="inputf">
                        <input type="text" placeholder="请输入用户名" v-model="registerData.username" />
                        <span class="label">用户名</span>
                    </div>
                    <div class="inputf">
                        <input type="text" placeholder="请输入验证邮箱" v-model="registerData.email" />
                        <span class="label">邮箱</span>
                    </div>
                    <div class="inputf">
                        <input type="password" placeholder="请输入密码" v-model="registerData.password" />
                        <span class="label">密码</span>
                    </div>
                    <div class="inputf">
                        <input type="password" placeholder="请再次输入密码" v-model="registerData.password2" />
                        <span class="label">确认密码</span>
                    </div>
                    <button id="register_btn" @mouseover="btnIn('register_btn')" @mouseout="btnOut('register_btn')" @click = "register">注册</button>
                </div>
                <!-- card介绍界面 -->
                <div :class = "isLogin === 1 ? 'card' : 'card active'">
                    <div class="head">
                        <div class="name">纸翼<span>传问</span></div>
                    </div>
                    <div class="desc">一款简洁高效的问卷管理工具一款简洁高效的问卷管理工具一款简洁高效的问卷管理工具一款简洁高效的问卷管理工具一款简洁高效的问卷管理工具一款简洁高效的问卷管理工具一款简洁高效的问卷管理工具一款简洁高效的问卷管理工具一款简洁高效的问卷管理工具一款简洁高效的问卷管理工具一款简洁高效的问卷管理工具一款简洁高效的问卷管理工具一款简洁高效的问卷管理工具</div>
                    <div class="btn">
                        {{ isLogin === 1 ? "新用户 ?" : "已有账号 ？"}}
                        <button @click="isLogin = (isLogin === 1) ? 0 : 1"
                        id="tologin_btn" @mouseover="btnIn('tologin_btn')" @mouseout="btnOut('tologin_btn')">
                            {{ isLogin === 1 ? "去注册" : "去登录"}}
                        </button>
                    </div>
                </div>
                </div>
            </el-container>
        </el-container>
    </div>
</template>

<style lang="scss" scoped>
    .all_container {
        height: 100vh;
        background: url("../assets/photos/photo10.jpg");
        background-size: cover;

        .login-container{
            width: 100%;
            min-height: 90vh;
            display: flex;
            justify-content: center;
            align-items: center;
            // background: url("../assets/bg.png") no-repeat;
            // background: #9bd3ef;
            // background-size: cover;
            

            .slider {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;

                .form {
                    width: 500px;
                    height: 650px;
                    background: rgba(99,124,172, 0.85);
                    // background: white;
                    backdrop-filter: blur(16px) saturate(0);
                    border-radius: 20px;
                    // border: 1px solid rgba(38, 27, 247, 0.18);
                    padding: 40px 60px;
                    box-shadow: rgba(11, 11, 151, 0.25) 50px 50px 100px -20px,
                                /* rgba(0, 0, 0, 0.5) 30px 30px 60px -30px, */
                                rgba(217, 217, 222, 0.35) 2px -2px 6px 0px inset;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    align-items: flex-start;
                    margin: 0 10px;
                    z-index: 3;
                    transition: 0.25s ease-in-out;

                    &.hidden {
                        height: 395px; //比card小就可以，让form高度变小被card挡住
                        box-shadow: none;
                        z-index: 1;
                    }

                    .title {
                        font-size: 36px;
                        color: white;
                        letter-spacing: 1px;    
                        margin-bottom: 15px;   
                        font-weight: 300;  
                        
                        span {
                            color: rgb(243,156,181);
                            font-weight: bold;
                        }
                    }

                    .subtitle {
                        font-size: 18px;
                        color: white;
                        letter-spacing: 1px;
                        margin-bottom: 50px;
                    }

                    .inputf {
                        width: 100%;
                        position: relative;
                        margin-bottom: 35px;
                        input {
                            width: 100%;
                            height: 45px;
                            border: none;
                            outline: 1.5px solid rgb(243,156,181);;
                            background: transparent;
                            border-radius: 8px;
                            font-size: 17px;
                            padding: 0 15px;
                            color: white;
                            &::placeholder {
                                color: rgb(231, 230, 230);
                            }
                            &:focus {
                                outline: 1.5px solid white;
                                &::placeholder {
                                    opacity: 0;
                                }
                                & + .label {
                                    opacity: 1;
                                    top: -26px;
                                }
                                
                            }
                            &:not(:placeholder-shown) + .label {
                                opacity: 1;
                                top: -26px;
                            }
                        }

                        .label {
                            position: absolute;
                            top: 0;
                            left: 0;
                            font-size: 15px;
                            color: white;
                            font-weight: bold;
                            transition: 0.25s ease-out;
                            opacity: 0;
                        }
                    }
                    button {
                        width: 100%;
                        height: 40px;
                        background: rgb(243,156,181);
                        color:white;
                        border: none;
                        outline: none;
                        border-radius: 5px;
                        // font-weight: bold;
                        letter-spacing: 10px;
                        font-size: 18px;
                        cursor: pointer;
                    }
                }
                .card {
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translate(0, -50%);
                    width: 571px;
                    height: 540px;
                    background: url("../assets/纸飞机右下角.png") white no-repeat;
                    background-size: contain;
                    padding: 40px;
                    border-radius: 0 20px 20px 0;
                    transition: 0.25s ease-in-out;
                    z-index: 2;

                    &.active {
                        right: calc(100% - 650px);
                        border-radius: 20px 0 0 20px;
                    }

                    .head {
                        font-size: 34px;
                        margin-bottom: 35px;
                        text-align: left;

                        .name {
                            font-weight: 300;
                            span {
                                color: rgb(243,156,181);;
                                font-weight: bold;
                            }
                        }
                    }

                    .desc {
                        font-size: 18px;
                        color: gray;
                        text-align: justify;
                        margin-bottom: 50px;
                    }

                    .btn {
                        text-align: left;
                        button {
                            background: rgb(243,156,181);;
                            font-size: 18px;
                            padding: 5px 15px;
                            border: none;
                            outline: none;
                            border-radius: 5px;
                            cursor: pointer;
                            margin-left: 10px;
                        }
                    }
                }
            }


        }
    }

    .zoom-btn {
        transform: scale(1.2); /* 缩放图片到 1.2 倍大小 */
        transition: transform 0.3s ease-in-out; /* 添加过渡效果 */
    }

</style>