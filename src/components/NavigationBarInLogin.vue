<!-- 导航栏 -->
<!-- 请作为组件引入到首页，即 HomeView.vue -->
<script setup>
    import { ref, watchEffect} from 'vue';
    import { useRouter } from 'vue-router';
    import store from '../store';

    const router = useRouter();

    const gotoLogin = () => {
        router.push('/login');
    };

    const gotoHome = () => {
        router.push('/');
    }

    function logoIn(elementId) {
        document.getElementById(elementId).classList.add("zoom-btn");
    }

    function logoOut(elementId) {
        document.getElementById(elementId).classList.remove("zoom-btn");
    }

    const currentUrl = ref(window.location.href);
    const isHomePage = ref(false);
    watchEffect(() => { // 在组件挂载时检查当前页面 URL，判断是否为根目录页面
        isHomePage.value = currentUrl.value === window.location.origin;
    });

    window.addEventListener('popstate', () => {
        currentUrl.value = window.location.href;
    });

</script>

<template>
    <el-header class = "navigationBar">
        <div @click = "gotoHome" @mouseover="logoIn('logo')" @mouseout="logoOut('logo')">
            <img id="logo" src="../assets/logo.png" alt="Element logo"/>
        </div>
        <div class="title">
            <span>纸翼</span>传问
        </div>
        <div class="flex-grow"></div>
    </el-header>
</template>

<style lang = "scss" scoped>
    .navigationBar {
        display: flex;
        align-items: center;
        height: 90px;
        // position: fixed; /* 将导航栏固定在页面上 */
        top: 0; /* 从页面顶部开始定位 */
        left: 0; /* 从页面左侧开始定位 */
        width: 100%; /* 宽度占据整个页面 */
        height: 60px; /* 设置导航栏高度 */
        z-index: 1000; /* 设置层叠顺序，确保导航栏位于其他内容之上 */
        margin: 5px 0 0 7px;

        img {
            width: 60px;
            cursor: pointer;
            margin-top: 5px;
            // border: red solid 1px;
        }

        .title {
            font-size: 26px;
            margin-left: 9px;
            color: white;
            span {
                color: rgb(243,156,181);
                font-weight: bold;
            }
        }

        .zoom-btn {
            transform: scale(1.2); /* 缩放图片到 1.2 倍大小 */
            transition: transform 0.3s ease-in-out; /* 添加过渡效果 */
        }

        .flex-grow {
            flex-grow: 1;
        }
    }

    
</style>
  