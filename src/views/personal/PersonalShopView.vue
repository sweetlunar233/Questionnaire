<script setup>
    import store from '@/store';
    import {ref} from "vue";
    import { ElMessage } from 'element-plus';

    const photos = ref([]);
    photos.value = store.state.nowuser.own_photos;

    const photoNotBuy = ref([]);

    for (let i=1; i<photos.value.length; i++) {
        if (photos.value[i] == 0) {
            photoNotBuy.value.push(i);
            console.log("not buy:", i);
        }
    }

    //购买头像
    const buyPhoto = (index) => {
        if (store.state.nowuser.money >= 100) {
            store.state.nowuser.money -= 100;
            store.state.nowuser.own_photos[index] = 1;
            photos.value[index] = 1;
            photoBought.value.push(index);
            
            updateUserphotoInMassage(store.state.nowuser.username, index, 1);
            ElMessage.success("购买成功!");
        }
        else {
            ElMessage.error("余额不足,快去填写问卷赚取纸币吧！");
        }
    }

</script>

<template>
    <!-- <div class="title"></div> -->
    <div class="item-container">
        <div class="item" v-for="(photonumber, index) in photoNotBuy" :key="index">
            <img :src="require(`@/assets/photos/photo${photonumber}.jpg`)" alt="" class="image">
            <div class="text">100纸币</div>
        </div>
    </div>
</template>

<style lang="scss">
    .title {
        font-size: 30px;
        color: white;
        padding-top: 3%;
        margin-bottom: 4%;
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
