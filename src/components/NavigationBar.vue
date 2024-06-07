<!-- 导航栏 -->
<!-- 请作为组件引入到首页，即 HomeView.vue -->
<script setup>
    import { ref, watchEffect, computed} from 'vue';
    import { useRouter } from 'vue-router';
    import { ArrowDown } from '@element-plus/icons-vue'
    import store from '../store';

    const router = useRouter();

    const gotoLogin = () => {
        router.push('/login');
    };

    const gotoHome = () => {
        // store.state.nowuser.username = "";
        router.push('/');
    }

    const gotoPersonal = () => {
        router.push('/personal');
    }

    const goBack = () => {
        router.go(-1); // 返回上一页
    };

    // const showBackButton = () => {
    //     // 根据当前路由判断是否显示返回按钮
    //     return router.currentRoute.value.path !== '/userManage';
    // };

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


    const nowuserPhotonumber = ref(store.state.nowuser.own_photos[0]);
    console.log(nowuserPhotonumber.value);
    const photoUrl = computed(() => {
        return require(`@/assets/photos/photo${nowuserPhotonumber.value}.jpg`);
    })

</script>

<template>
    <el-header class = "navigationBar">
        <div @mouseover="logoIn('logo')" @mouseout="logoOut('logo')">
            <img id="logo" src="../assets/logo.png" alt="Element logo"/>
        </div>
        <div class="title">
            <span>纸翼</span>传问
        </div>
        <div class="flex-grow"></div>
        <el-dropdown>
            <div class="name_photo">
                <div >
                    <img :src="photoUrl" class="photo"/>
                </div>
                <span class="username">
                    <!-- username -->
                    {{ store.state.nowuser.username }}
                </span>
                
            </div>
            
            <template #dropdown>
            <el-dropdown-menu class="dropdown_menu">
                <el-dropdown-item @click="gotoPersonal">个人中心</el-dropdown-item>
                <el-dropdown-item @click="gotoHome">退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </template>
        </el-dropdown>
    </el-header>
</template>

<style lang = "scss">
    .navigationBar {
        display: flex;
        align-items: center;
        // justify-content: center;
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

        .name_photo {
            display: flex;
            outline: none;
        }

        .username {
            color: white;
            cursor: pointer;
            display: flex;
            border: none;
            font-size: 24px;
            align-items: center;
            // margin: 5px 15px 10px 0;
            outline: none;
        }

        .photo {
            width: 55px;
            height: 55px;
            border-radius: 1000px;
            border: white solid 1.4px;
            background-size: cover;
            margin-top: 0px;
            margin-right: 10px;
        }

        .dropdown_menu {
            position: absolute; /* 设置子元素为绝对定位 */
            top: 100%; /* 设置子元素距离父元素底部的距离 */
            left: 0; /* 设置子元素左侧与父元素左侧对齐 */
            z-index: 999; /* 设置子元素的层级 */
            // justify-content: center;
        }
    }

    .flex-grow {
        flex-grow: 1;
    }
</style>
  