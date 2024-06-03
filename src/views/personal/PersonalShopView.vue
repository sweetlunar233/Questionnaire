<template>
    <div class="all-container">
        <div class="item">
            <img src="../../assets/photos/星空.jpg" alt="" class="image">
            <div class="text">100纸币</div>
        </div>
        <div class="item">
            <img src="../../assets/photos/星空.jpg" alt="" class="image">
            <div class="text">100纸币</div>
        </div>
        <div class="item">
            <img src="../../assets/photos/星空.jpg" alt="" class="image">
            <div class="text">100纸币</div>
        </div>
        <div class="item">
            <img src="../../assets/photos/星空.jpg" alt="" class="image">
            <div class="text">100纸币</div>
        </div>
        <div class="item">
            <img src="../../assets/photos/星空.jpg" alt="" class="image">
            <div class="text">100纸币</div>
        </div>
        <div class="item">
            <img src="../../assets/photos/星空.jpg" alt="" class="image">
            <div class="text">100纸币</div>
        </div>
        <div class="item">
            <img src="../../assets/photos/星空.jpg" alt="" class="image">
            <div class="text">100纸币</div>
        </div>
        <div class="item">
            <img src="../../assets/photos/星空.jpg" alt="" class="image">
            <div class="text">100纸币</div>
        </div>
        <div class="item">
            <img src="../../assets/photos/星空.jpg" alt="" class="image">
            <div class="text">100纸币</div>
        </div>
        <div class="item">
            <img src="../../assets/photos/星空.jpg" alt="" class="image">
            <div class="text">100纸币</div>
        </div>
        <div class="item">
            <img src="../../assets/photos/星空.jpg" alt="" class="image">
            <div class="text">100纸币</div>
        </div>
        <div class="item">
            <img src="../../assets/photos/星空.jpg" alt="" class="image">
            <div class="text">100纸币</div>
        </div>
        <div class="item">
            <img src="../../assets/photos/星空.jpg" alt="" class="image">
            <div class="text">100纸币</div>
        </div>
        <div class="item">
            <img src="../../assets/photos/星空.jpg" alt="" class="image">
            <div class="text">100纸币</div>
        </div>
        <div class="item">
            <img src="../../assets/photos/星空.jpg" alt="" class="image">
            <div class="text">100纸币</div>
        </div>
        <div class="item">
            <img src="../../assets/photos/星空.jpg" alt="" class="image">
            <div class="text">100纸币</div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss">
    .all-container {
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
            }

            .text {
                position: absolute; // 绝对定位
                top: 50%; // 垂直居中
                left: 50%; // 水平居中
                transform: translate(-50%, -50%); // 通过偏移实现居中
                opacity: 0; // 初始时隐藏
                color: white;
                font-size: 20px;
                text-align: center;
                transition: opacity 0.3s ease; // 添加过渡效果
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
