<script setup>
import {
    Management,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen,
    SwitchButton,
    CaretBottom,
    ChatDotRound,
    Share
} from '@element-plus/icons-vue'
import { ref } from "vue";
import NavigationBar from '../components/NavigationBar.vue';
import store from '../store';
import {ElMessage} from 'element-plus'
import { useRouter } from 'vue-router';
const router = useRouter();
const navigation = ref(NavigationBar);

// const loginCheck = () => {
//     if(store.state.nowuser.username === ""){
//         ElMessage.error("请先登录");
//         router.push("/");
//     }
// }
// loginCheck();

const gotoDraft = () => {
    router.push("/userManage/unreleased");
}

const gotoReleased = () => {
    router.push("/userManage/released");
}

const gotoFilled = () => {
    router.push("/userManage/filled");
}

const gotoSquare = () => {
    router.push("/userManage/square");
}

</script>

<template>
    <!-- element-plus中的容器 -->
    <el-container class="layout-container">
        <el-header><navigation/></el-header>
        <el-container>
            <!-- 左侧菜单 -->
            <el-aside width="250px" style="margin-top: 20px;">
                <button class="option" @click="gotoDraft"><span>草稿箱</span></button>
                <button class="option" @click="gotoReleased"><span>已发布问卷</span></button>
                <button class="option" @click="gotoFilled"><span>已填写问卷</span></button>
                <button class="option" @click="gotoSquare"><span>问卷广场</span></button>
            </el-aside>
            <el-container>
                <!-- 中间区域 -->
                <el-main>
                    <!-- <div style="width: 1290px; height: 570px;border: 1px solid red;">
                        内容展示区
                    </div> -->
                    <router-view/>
                </el-main>
                <!-- 底部区域 -->
                <el-footer style="color: white;">问卷星球 ©2024 Created by 咱是什么组名啊来着</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<style scoped lang="scss">
.option {
    width: 70%;
    height: 10%;
    // padding: 1em 2em;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    letter-spacing: 5px;
    text-transform: uppercase;
    cursor: pointer;
    color: white;
    transition: all 1000ms;
    font-size: 25px;
    position: relative;
    overflow: hidden;
    outline: 2px solid white;
    margin: 20px 0 20px 0;
    background-color: rgba(0, 0, 0, 0);
    justify-content: center;
    align-items: center;
    display: flex;

    span {
        margin-left: 10px;
    }
}

.option:hover {
    color: #000;
    transform: scale(1.1);
    outline: 2px solid #fff;
    box-shadow: 4px 5px 17px -4px #fff;
}

.option::before {
    content: "";
    position: absolute;
    left: -50px;
    top: 0;
    width: 0;
    height: 100%;
    background-color: #fff;
    transform: skewX(45deg);
    z-index: -1;
    transition: width 1000ms;
}

.option:hover::before {
    width: 250%;
}








.layout-container {
    height: 100vh;
    background: url("../assets/bg3.png");
    background-size: cover;
    
}

.layout-container .el-aside {
    height: 80%;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 7px;
    margin-bottom: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0); /* 鼠标悬停时阴影加深 */

    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
}


.with-background-color {
    background-color: rgba(255, 255, 255, 0); /* 设置背景颜色，可以根据需求自行调整 */
}

.with-background-color:hover {
    background-color: rgba(0,0,0,0);
}

.layout-container .el-footer {
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
}
 </style>

