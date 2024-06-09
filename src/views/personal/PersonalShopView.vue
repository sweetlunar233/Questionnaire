<script setup>
    import store from '@/store';
    import {ref} from "vue";
    import { ElMessage } from 'element-plus';
    import { updateUserphotoInShop } from '@/api/user';

    //导入cookies
    import { getCurrentInstance } from 'vue';
    // 创建可以访问内部组件实例的实例
    const internalInstance = getCurrentInstance();
    const internalData = internalInstance.appContext.config.globalProperties;


    const nowuser_username = ref(internalData.$cookies.get('username'));
    const nowuser_password = ref(internalData.$cookies.get('password'));
    const nowuser_email = ref(internalData.$cookies.get('email'));
    const nowuser_money = ref(internalData.$cookies.get('money'));
    const photos = ref([]);
    // photos.value = store.state.nowuser.own_photos;
    photos.value = internalData.$cookies.get('own_photos');

    

    // const nowuser_money = ref(0);
    // nowuser_money.value = store.state.nowuser.money;
    const photoNotBuy = ref([]);
    for (let i=1; i<photos.value.length; i++) {
        if (photos.value[i] == 0) {
            photoNotBuy.value.push(i);
        }
    }

    const confirmBuy = ref(false);

    const clickPhoto = () => {
        confirmBuy.value = true;
    }
    
    const buyPhoto = (photonumber) => {
        if (nowuser_money.value >= 100) {
            nowuser_money.value -= 100;
            photos.value[photonumber] = 1;
            $cookies.set('money', nowuser_money.value);
            $cookies.set('own_photos', photos.value);

            photoNotBuy.value.splice(photoNotBuy.value.indexOf(photonumber), 1);
            
            updateUserphotoInShop(nowuser_username.value, photonumber, 1, nowuser_money.value);
            ElMessage.success("购买成功!");
        }
        else {
            ElMessage.error("余额不足,快去填写问卷赚取纸币吧！");
        }
    }


</script>

<template>
    <!-- <div class="title"></div> -->
    <div class="all_container">
        <div class="item-container">
            <div class="item" v-for="(photonumber, index) in photoNotBuy" :key="index" @click="clickPhoto" @mouseout="confirmBuy=false">
                <img :src="require(`@/assets/photos/photo${photonumber}.jpg`)" alt="" class="image">
                <div class="text" v-if="!confirmBuy">100纸币</div>
                <div class="text" v-if="confirmBuy" @click="buyPhoto(photonumber)">确认购买</div>
            </div>
        </div>
            <div class="money">
                <img src = "@/assets/money.png" alt="纸币：" class="money_icon">
                <span>{{ nowuser_money }}</span>
            </div>
    </div>

    
    


</template>

<style lang="scss" scoped>
    .all_container {
        // display: flex;
        // flex-direction: column;
        // justify-content: center;
        // align-items: center;
        // height: 100vh;

        .flex_flow {
            flex: 1;
        }
        
        .money {
            position: absolute;
            right: 0;
            bottom: 0;
            font-size: 40px;
            padding: 30px 30px;

            display: flex;
            align-items: center;

            .money_icon {
                height: 40px;
                width: 40px;
                margin-right: 10px;
            }

            span {
                color: #FCBA29;
            }
        }
    }
    .item-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start; // 从左往右排列
        gap: 35px;
        padding-top: 6%;
        max-width: 1200px;
        // border: red solid 1px;

        .item {
            width: 150px;
            height: 150px;
            border-radius: 1000px;
            border: white 2px solid;
            position: relative; // 添加相对定位

            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            // margin: 20px;

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
