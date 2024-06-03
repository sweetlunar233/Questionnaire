<script setup>
    import store from '@/store';
    import {ref} from 'vue';

    const userNameText = ref("");
    // userNameText.value = store.state.nowuser.username;
    userNameText.value = "用户名";

    const userEmailText = ref("");
    // userEmailText.value = store.state.nowuser.email;
    userEmailText.value = "1969024607@qq.com";

    const userPasswordText = ref("");
    // userPasswordText.value = store.state.nowuser.password;
    userPasswordText.value = "password";

    const changeNameText_in = () => {
        userNameText.value = "真是个好名字";
    }
    const changeNameText_out = () => {
        userNameText.value = "用户名";
        // userNameText.value = store.state.nowuser.username;
    }

    const changeEmailText_in = () => {
        userEmailText.value = "修改邮箱";
    }
    const changeEmailText_out = () => {
        userEmailText.value = "1969024607@qq.com";
        // userEmailText.value = store.state.nowuser.email;
    }

    const changePasswordText_in = () => {
        userPasswordText.value = "修改密码";
        // showpassword.value = false;
    }
    const changePasswordText_out = () => {
        userPasswordText.value = "password";
        // showpassword.value = true;
    }


</script>

<template>
    <div class="all_container">
        <div class="photo">
        </div>

        <button class="box" @mouseover="changeNameText_in" @mouseout="changeNameText_out">
            <span class="text">{{userNameText}}</span>
        </button>

        <button class="box" @mouseover="changePasswordText_in" @mouseout="changePasswordText_out">
            <span class="text">{{userPasswordText}}</span>
            <!-- <span class="text_before">{{userPasswordText}}</span> -->
            <!-- <span class="text_after">修改密码</span> -->
        </button>

        <button class="box" @mouseover="changeEmailText_in" @mouseout="changeEmailText_out">
            <span class="text">{{userEmailText}}</span>
        </button>

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

        .photo {
            width: 200px;
            height: 200px;
            border-radius: 1000px;
            border: white solid 3px;
            background: url("@/assets/photos/星空.jpg");
            background-size: cover;
            margin-bottom: 5%;
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
</style>