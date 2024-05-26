<!-- 导航栏 -->
<!-- 请作为组件引入到首页，即 HomeView.vue -->
<script setup>
    import { ref, watchEffect} from 'vue';
    import { useRouter } from 'vue-router';
    import { ArrowDown } from '@element-plus/icons-vue'

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
        <div class="flex-grow"></div>
        <!-- <button id="login" class="btn" @click = "gotoLogin" v-if="!isHomePage"
        @mouseover="logoIn('login')" @mouseout="logoOut('login')">
            登录 / 注册
        </button> -->
        <el-dropdown>
            <span class="el-dropdown-link">
                账号名
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </el-header>
</template>

<style lang = "scss">
    .navigationBar {

        display: flex;
        // align-items: center;
        border: red,1px solid;
        height: 90px;
        // position: fixed; /* 将导航栏固定在页面上 */
        top: 0; /* 从页面顶部开始定位 */
        left: 0; /* 从页面左侧开始定位 */
        width: 100%; /* 宽度占据整个页面 */
        height: 90px; /* 设置导航栏高度 */
        z-index: 1000; /* 设置层叠顺序，确保导航栏位于其他内容之上 */
        // margin: 20px 0 0 7px;

        img {
            width: 100px;
            cursor: pointer;
        }

        .zoom-btn {
            transform: scale(1.2); /* 缩放图片到 1.2 倍大小 */
            transition: transform 0.3s ease-in-out; /* 添加过渡效果 */
        }

        .btn {
            // width: 5%;
            height: 40px;
            background: rgb(97, 187, 252);
            color:white;
            border: none;
            outline: none;
            border-radius: 5px;
            // letter-spacing: 10px;
            font-size: 18px;
            cursor: pointer;
            margin: 5px 10px 0 0px;
        }

        .el-dropdown-link {
            cursor: pointer;
            // color: var(--el-color-primary);
            // display: flex;
        }
    }

    .flex-grow {
        flex-grow: 1;
    }
</style>
  