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
        userNameText.value = "好名字";
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
    }
    const changePasswordText_out = () => {
        userPasswordText.value = "password";
        // userPasswordText.value = store.state.nowuser.password;
    }
</script>

<template>
    <div class="all_container">
        <div class="photo">
        </div>
        <a class="fancy"  @mouseover="changeNameText_in" @mouseout="changeNameText_out">
            <!-- <span class="top-key"></span>  -->
            <span class="text">{{userNameText}}</span>
            <!-- <span class="bottom-key-1"></span> -->
            <!-- <span class="bottom-key-2"></span> -->
        </a>

        <a class="fancy"  @mouseover="changePasswordText_in" @mouseout="changePasswordText_out">
            <!-- <span class="top-key"></span>  -->
            <span class="text">{{userPasswordText}}</span>
            <!-- <span class="bottom-key-1"></span> -->
            <!-- <span class="bottom-key-2"></span> -->
        </a>

        <a class="fancy"  @mouseover="changeEmailText_in" @mouseout="changeEmailText_out">
            <!-- <span class="top-key"></span>  -->
            <span class="text">{{userEmailText}}</span>
            <!-- <span class="bottom-key-1"></span> -->
            <!-- <span class="bottom-key-2"></span> -->
        </a>
        

        <div class="money">

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
        justify-content: center;

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


    .fancy {
        background-color: transparent;
        border: 2px solid white;
        border-radius: 1em;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        /* float: right; */
        font-weight: 700;
        letter-spacing: 0.05em;
        margin-bottom: 5%;
        outline: none;
        overflow: visible;
        padding: 0.6em 1.1em;
        position: relative;
        text-align: center;
        text-decoration: none;
        text-transform: none;
        transition: all 0.3s ease-in-out;
        user-select: none;
        font-size: 30px;
        
    }

    .fancy::before {
        content: " ";
        width: 1.5625rem;
        height: 2px;
        background: white;
        top: 50%;
        left: 1.5em;
        position: absolute;
        transform: translateY(-50%);
        transform-origin: center;
        transition: background 0.3s linear, width 0.3s linear;
    }

    .fancy .text {
        font-size: 1.125em;
        line-height: 1.33333em;
        padding-left: 2em;
        display: block;
        text-align: left;
        transition: all 0.3s ease-in-out;
        text-decoration: none;
        color: white;
        
    }

    .fancy .top-key {
        height: 2px;
        width: 5rem;
        top: -2px;
        left: 2rem;
        position: absolute;
        background: black;
        transition: width 0.5s ease-out, left 0.3s ease-out;
    }

    .fancy .bottom-key-1 {
        height: 2px;
        width: 1.5625rem;
        right: 12rem;
        bottom: -2px;
        position: absolute;
        background: black;
        transition: width 0.5s ease-out, right 0.3s ease-out;
    }

    .fancy .bottom-key-2 {
        height: 2px;
        width: 5rem;
        right: 2rem;
        bottom: -2px;
        position: absolute;
        background: black;
        transition: width 0.5s ease-out, right 0.3s ease-out;
    }

    .fancy:hover {
        color: white;
        /* background: #757274; */
    }

    .fancy:hover::before {
        width: 0.9375rem;
        background: white;
    }

    .fancy:hover .text {
        color: white;
        padding-left: 1.5em;
    }

    .fancy:hover .top-key {
        left: -2px;
        width: 0px;
    }

    .fancy:hover .bottom-key-1,
    .fancy:hover .bottom-key-2 {
        right: 0;
        width: 0;
    }
</style>