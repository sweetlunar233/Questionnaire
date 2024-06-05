<script setup>
    import store from '@/store';
    import {ref} from 'vue';

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

    const photoUrl = require(`@/assets/photos/photo${store.state.nowuser.own_photos[0]}.jpg`);

    const showPasswordCard = ref(true); // Set this variable based on your logic

    const photos = ref([]);
    photos.value = store.state.nowuser.own_photos;

    const photoNotBuy = ref([]);

    for (let i=1; i<photos.value.length; i++) {
        if (photos.value[i] == 0) {
            photoNotBuy.value.push(i);
            console.log("not buy:", i);
        }
    }

</script>

<template>
    <div class="all_container">
        <div class = "photo_container">
            <img class="photo" :src="photoUrl" alt="图片加载异常">
            <div class="text">更换头像</div>
        </div>
        <!-- <div class="photo"> -->
        <!-- </div> -->

        <button class="box" @mouseover="changeNameText_in" @mouseout="changeNameText_out">
            <span >{{userNameText}}</span>
        </button>

        <button class="box" @mouseover="changePasswordText_in" @mouseout="changePasswordText_out">
            <span >{{userPasswordText}}</span>
        </button>

        <button class="box" @mouseover="changeEmailText_in" @mouseout="changeEmailText_out">
            <span >{{userEmailText}}</span>
        </button>

        <!-- 修改头像 -->
        <div class="card_container">
            <div class="card" style="">
                <div class="item-container">
                    <div class="item" v-for="(photonumber, index) in photoNotBuy" :key="index">
                        <img :src="require(`@/assets/photos/photo${photonumber}.jpg`)" alt="" class="image">
                        <div class="text">100纸币</div>
                    </div>
                </div>
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
            cursor: pointer;
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

                .image {
                    opacity: 0.2; // 悬停时图片变暗
                }
            }
        }
    }



</style>