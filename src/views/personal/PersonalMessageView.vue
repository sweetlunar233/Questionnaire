<script setup>
    import { modifyUserInfo, updateUserphotoInMassage } from '@/api/user';
    import store from '@/store';
    import { ElMessage } from 'element-plus';
    import { ref, computed } from 'vue';

    const userNameText = ref("");
    userNameText.value = store.state.nowuser.username;
    // userNameText.value = "用户名";

    const userEmailText = ref("");
    userEmailText.value = store.state.nowuser.email;
    // userEmailText.value = "1969024607@qq.com";

    const userPasswordText = ref("");
    userPasswordText.value = "password";

    const changeNameText_in = () => {
        userNameText.value = "真是个好名字";
    }
    const changeNameText_out = () => {
        // userNameText.value = "用户名";
        userNameText.value = store.state.nowuser.username;
    }

    const changeEmailText_in = () => {
        userEmailText.value = "修改邮箱";
    }
    const changeEmailText_out = () => {
        // userEmailText.value = "1969024607@qq.com";
        userEmailText.value = store.state.nowuser.email;
    }

    const changePasswordText_in = () => {
        userPasswordText.value = "修改密码";
    }
    const changePasswordText_out = () => {
        userPasswordText.value = "password";
    }

    const nowuserPhotonumber = ref(store.state.nowuser.own_photos[0]);
    const photoUrl = computed(() => {
        return require(`@/assets/photos/photo${nowuserPhotonumber.value}.jpg`);
    })
    


    const showChangePhotoCard = ref(false);
    const showPasswordCard = ref(false);
    const showEmailCard = ref(false);
    const openCard = (cardname) => {
        if (cardname == "ChangePhotoCard")
            showChangePhotoCard.value = true;
        else if (cardname == "PasswordCard")
            showPasswordCard.value = true;
        else if (cardname == "EmailCard")
            showEmailCard.value = true;

        var elements = document.querySelectorAll('.box, .photo_container');
        elements.forEach(function(element) {
            element.style.zIndex = -1;
        })

    }

    //username的头像全部状态
    const photos = ref([]);
    photos.value = store.state.nowuser.own_photos;

    //更新已购买头像
    const photoBought = ref([]);
    const updatePhotoBought = () => {
        for(let i=1; i<photos.value.length; i++) {
            if (photos.value[i] == 0) { //应该改成1
                photoBought.value.push(i);
            }
        }
    }
    updatePhotoBought();

    //×按钮（quit）
    const X_quit = (cardname) => {
        if (cardname == "ChangePhotoCard")
            showChangePhotoCard.value = false;
        else if (cardname == "PasswordCard")
            showPasswordCard.value = false;
        else if (cardname == "EmailCard")
            showEmailCard.value = false;

        var elements = document.querySelectorAll('.box, .photo_container');
        elements.forEach(function(element) {
            element.style.zIndex = 1;
        })
    }

    //更换头像
    const changePhoto = (photonumber) => {
        store.state.nowuser.own_photos[0] = photonumber;
        nowuserPhotonumber.value = photonumber;
        // updateUserphotoInMassage(store.state.nowuser.username, 0, photonumber);
        ElMessage.success("修改头像成功!");
        X_quit("ChangePhotoCard");
    }

    //修改密码
    const changePasswordData = ref({
        password: "",
        repassword1: "",
        repassword2: ""
    })
    const changePassword = () => {
        if (!/^.{5,25}$/.test(changePasswordData.value.password)) {
            ElMessage.error('原密码必须为5到25位非空字符');
            return;
        }
        if (!/^.{5,25}$/.test(changePasswordData.value.repassword1)) {
            ElMessage.error('修改密码必须为5到25位非空字符');
            return;
        }
        if (!/^.{5,25}$/.test(changePasswordData.value.repassword2)) {
            ElMessage.error('确认密码必须为5到25位非空字符');
            return;
        }

        if(changePasswordData.value.password != store.state.nowuser.password) {
            ElMessage.error("原密码错误");
            return;
        }

        if(changePasswordData.value.repassword1 != changePasswordData.repassword2) {
            ElMessage.error("两次密码输入不一致");
            return;
        }

        store.state.nowuser.password = changePasswordData.value.repassword1;
        modifyUserInfo(store.state.nowuser.username, false, changePasswordData.value.repassword1, false);
        ElMessage.success("修改密码成功！");
        X_quit("PasswordCard");
    }

    //修改邮箱
    const changeEmailData = ref({
        password: "",
        email: ""
    })
    const changeEmail = () => {
        if (!/^.{5,25}$/.test(changeEmailData.value.password)) {
            ElMessage.error('原密码必须为5到25位非空字符');
            return;
        }
        if (!/^.+@.+\..+$/.test(changeEmailData.value.email)) {
            ElMessage.error('邮箱格式不正确');
            return;
        }

        if(changeEmailData.value.password != store.state.nowuser.password) {
            ElMessage.error("密码错误");
            return;
        }

        store.state.nowuser.email = changeEmailData.value.email;
        modifyUserInfo(store.state.nowuser.username, changeEmailData.value.email, false, false);
        ElMessage.success("修改邮箱成功！");
        X_quit("EmailCard");
    }

</script>

<template>
    <div class="all_container">
        <div class = "photo_container" @click="openCard('ChangePhotoCard')">
            <img class="photo" :src="photoUrl" alt="图片加载异常">
            <div class="text">更换头像</div>
        </div>
        <!-- <div class="photo"> -->
        <!-- </div> -->

        <button class="box" @mouseover="changeNameText_in" @mouseout="changeNameText_out">
            <span >{{userNameText}}</span>
        </button>

        <button class="box" @mouseover="changePasswordText_in" @mouseout="changePasswordText_out" @click="openCard('PasswordCard')">
            <span >{{userPasswordText}}</span>
        </button>

        <button class="box" @mouseover="changeEmailText_in" @mouseout="changeEmailText_out" @click="openCard('EmailCard')">
            <span >{{userEmailText}}</span>
        </button>

        <!-- 修改头像 -->
        <div class="card_container" v-if="showChangePhotoCard">
            <div class="card" style="">
                <button style="position:absolute; top:0; right:0;" @click="X_quit('ChangePhotoCard')">
                    <img src="@/assets/X.png" class="X_button" >
                </button>
                <div class="item-container">
                    <div class="item" v-for="(photonumber, index) in photoBought" :key="index">
                        <div @click="changePhoto(photonumber)">
                            <img :src="require(`@/assets/photos/photo${photonumber}.jpg`)" alt="" class="image" >
                            <div class="text">更换头像</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 修改密码 -->
        <div class="card_container" v-if="showPasswordCard">
            <div class="card" style="display: flex; flex-direction: column; align-items: center; justify-content: center; width:600px; height:450px;">
                <button style="position:absolute; top:0; right:0;" @click="X_quit('PasswordCard')">
                    <img src="@/assets/X.png" class="X_button" >
                </button>
                <div class="inputf">
                    <input type="password" placeholder="请输入原密码" v-model="changePasswordData.password"/>
                    <span class="label">原密码</span>
                </div>
                <div class="inputf">
                    <input type="password" placeholder="请输入修改后的密码" v-model="changePasswordData.repassword1"/>
                    <span class="label">修改密码</span>
                </div>
                <div class="inputf">
                    <input type="password" placeholder="请确认修改后的密码" v-model="changePasswordData.repassword2"/>
                    <span class="label">确认密码</span>
                </div>
                <button class="commit_btn" @click="changePassword">
                    <span>提交</span>
                </button>
            </div>
        </div>

        <!-- 修改邮箱 -->
        <div class="card_container" v-if="showEmailCard">
            <div class="card" style="display: flex; flex-direction: column; align-items: center; justify-content: center; width:600px; height:450px;">
                <button style="position:absolute; top:0; right:0;" @click="X_quit('EmailCard')">
                    <img src="@/assets/X.png" class="X_button" >
                </button>
                <div class="inputf">
                    <input type="password" placeholder="请验证密码" v-model="changePasswordData.password"/>
                    <span class="label">密码</span>
                </div>
                <div class="inputf">
                    <input type="password" placeholder="请输入新的邮箱" v-model="changePasswordData.password"/>
                    <span class="label">邮箱</span>
                </div>
                <button class="commit_btn" @click="changeEmail">
                    <span>提交</span>
                </button>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
    .all_container {
        /* border: black solid 1px; */
        height: 80vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        .photo_container {
            width: 200px;
            height: 200px;
            border-radius: 1000px;
            border: white 2px solid;
            position: relative; // 添加相对定位

            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            margin-bottom: 5%;

            .photo {
                width: 100%;
                height: 100%;
                object-fit: cover; // 图片等比例缩放填充
                transition: opacity 0.3s ease-in-out;
            }

            .text {
                height: auto;
                width: 100%;
                position: absolute; // 绝对定位
                top: 50%; // 垂直居中
                left: 50%; // 水平居中
                transform: translate(-50%, -50%); // 通过偏移实现居中
                opacity: 0; // 初始时隐藏
                color: white;
                font-size: 30px;
                text-align: center;
                transition: opacity 0.3s ease-in-out; // 添加过渡效果
            }

            &:hover {
                transform: scale(1.1);
                transition: all 0.2s ease;
                cursor: pointer;

                .text {
                    opacity: 1; // 悬停时显示文本
                }

                .photo {
                    opacity: 0.2; // 悬停时图片变暗
                }
            }
        }


        

        


        /* .flex_start_card {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
        } */

        .username {
            margin: 30px 0 20px 0;
            border: white solid 2px;
            padding: 20px;
            border-radius: 1em;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
                font-size: 40px;
                /* font-weight: bold; */
                letter-spacing: 5px;
                color: white;
            }
        }

        .email{
            margin: 0px;
            /* border: white solid 2px; */
            padding: 20px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
                font-size: 40px;
                /* font-weight: bold; */
                letter-spacing: 5px;
                color: white;
            }
        }
    }

    .box {
        width: 500px;
        height: auto;
        float: left;
        transition: .5s linear;
        position: relative;
        display: block;
        overflow: hidden;
        padding: 15px;
        text-align: center;
        margin: 15px 5px;
        background: transparent;
        font-weight: 0;
        font-size: 40px;
        color: white;
        // z-index: -1;
        // font-family: cursive, sans-serif;

    }

    // .text_before {
    //     opacity: 1;
    //     transition: ease-in 0.2s;
    // }
    // .text_after {
    //     opacity: 0;
    //     transition: ease-in 0.2s;
    // }

    .box:before {
        position: absolute;
        content: '';
        left: 0;
        bottom: 0;
        height: 4px;
        width: 100%;
        border-bottom: 4px solid transparent;
        border-left: 4px solid transparent;
        box-sizing: border-box;
        transform: translateX(100%);
    }

    .box:after {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        border-top: 4px solid transparent;
        border-right: 4px solid transparent;
        box-sizing: border-box;
        transform: translateX(-100%);
    }

    .box:hover {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        // .text_before{
        //     opacity: 0;
        // }
        // .text_after {
        //     opacity: 1;
        // }
    }

    .box:hover:before {
        border-color: white;
        height: 100%;
        transform: translateX(0);
        transition: .3s transform linear, .3s height linear .3s;
    }

    .box:hover:after {
        border-color: white;
        height: 100%;
        transform: translateX(0);
        transition: .3s transform linear, .3s height linear .5s;
    }

    button {
        color: black;
        text-decoration: none;
        cursor: pointer;
        outline: none;
        border: none;
        background: transparent;
    }

    .card_container {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        position: fixed; 

        .card {
            box-sizing: border-box;
            width: 800px;
            height: 600px;
            background: rgba(217, 217, 217, 0.58);
            border: 1px solid white;
            box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
            backdrop-filter: blur(6px);
            border-radius: 17px;
            text-align: center;
            
            transition: all 0.5s;
            display: flex;
            align-items: center;
            justify-content: center;
            user-select: none;
            font-weight: bolder;
            color: black;
            z-index: 10;
        }

        .card:hover {
            border: 2px solid white;
            box-shadow: 0px 0px 20px rgba(255,255,255,0.4);
            // transform: scale(1.05);
        }
    }

    .item-container {
        width: 660px;
        height: 521px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start; // 从左往右排列
        align-items: flex-start; // 从上往下排列
        gap: 35px;
        cursor: pointer;
        // padding-top: 6%;
        // max-width: 1200px;
        // border: red solid 1px;

        .item {
            width: 100px;
            height: 100px;
            border-radius: 1000px;
            border: white 2px solid;
            position: relative; // 添加相对定位

            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            // margin-bottom: 35px;

            .image {
                width: 100%;
                height: 100%;
                object-fit: cover; // 图片等比例缩放填充
                transition: opacity 0.3s ease-in-out;
            }

            .text {
                height: auto;
                width: 100%;
                position: absolute; // 绝对定位
                top: 50%; // 垂直居中
                left: 50%; // 水平居中
                transform: translate(-50%, -50%); // 通过偏移实现居中
                opacity: 0; // 初始时隐藏
                color: white;
                font-size: 20px;
                text-align: center;
                transition: opacity 0.3s ease-in-out; // 添加过渡效果
            }

            &:hover {
                transform: scale(1.1);
                transition: all 0.2s ease;
                cursor: pointer;

                .text {
                    opacity: 1; // 悬停时显示文本
                }

                .image {
                    opacity: 0.2; // 悬停时图片变暗
                }
            }
        }
    }

    .X_button {
        width: 40px; 
        height: auto;
        margin: 10px 10px 0 0;
        cursor: pointer;

        &:hover {
            transform: scale(1.05);
        }
    }

    .inputf {
        width: 50%;
        position: relative;
        margin-top: 20px;
        margin-bottom: 20px;
        
        input {
            width: 110%;
            height: 60px;
            border: none;
            outline: 1.5px solid rgb(222, 220, 221);;
            background: transparent;
            border-radius: 8px;
            font-size: 17px;
            padding: 0 15px;
            margin-left: -8%;
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

    .commit_btn {
        border: white 1px solid;
        border-radius: 10px;
        width: 18%;
        height: 12%;
        // padding: 10px, 10px;
        transition: all 0.2s ease-in;
        margin-top: 20px;
        span {
            color: white;
            font-size: 30px;
        }

        &:hover {
            // border: 1px solid white;
            // box-shadow: 0px 0px 20px rgba(255,255,255,0.4);
            transform: scale(1.1);
        }
    }
</style>