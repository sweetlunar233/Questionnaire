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
    ChatDotRound
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { ref } from "vue";
import NavigationBar from '../components/NavigationBar.vue';
const navigation = ref(NavigationBar);

</script>

<template>
    <!-- element-plus中的容器 -->
    <el-container class="layout-container">
        <el-header><navigation/></el-header>
        <el-container>
            <!-- 左侧菜单 -->
            <el-aside width="250px" style="margin-top: 20px;">
                <div class="el-aside__logo"></div>
                <!-- element-plus的菜单标签 -->
                <el-menu active-text-color="rgb(243,156,181)" background-color="#fff"  text-color="rgb(80, 134, 233)"  router>
                    <el-sub-menu style="margin-top: 20px">
                        <template #title>
                            <el-icon>
                                <Promotion />
                            </el-icon>
                            <span>已创建问卷</span>
                        </template>
                        <el-menu-item index="/userManage/unreleased" class = "item">
                            <el-icon>
                                <EditPen />
                            </el-icon>
                            <span>草稿箱</span>
                        </el-menu-item>
                        <el-menu-item index="/userManage/released" class = "item">
                            <el-icon>
                                <CaretBottom />
                            </el-icon>
                            <span>已发布</span>
                        </el-menu-item>
                    </el-sub-menu>
                    <el-menu-item index="/userManage/filled">
                        <el-icon>
                            <Management />
                        </el-icon>
                        <span>已填写问卷</span>
                    </el-menu-item>
                    <el-menu-item index="/userManage/personal">
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>个人中心</span>
                    </el-menu-item>
                    <el-menu-item index="/userManage/square">
                        <el-icon>
                            <ChatDotRound />
                        </el-icon>
                        <span>问卷广场</span>
                    </el-menu-item>
                </el-menu>
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
                <el-footer>问卷星球 ©2024 Created by 咱是什么组名啊来着</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<style scoped lang="scss">
.layout-container {
    height: 100vh;
    background: url("../assets/bg.png");
    background-size: cover;
}

.layout-container .el-aside {
    height: 70%;
    background-color: rgba(255,255,255,0.5);
    border-radius: 7px;
    margin-bottom: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); /* 鼠标悬停时阴影加深 */
}

.layout-container .el-aside__logo {
    height: 160px;
    background: url('@/assets/mylogo.gif') no-repeat center / 120px auto;
    margin-top: 20px;
}

.layout-container .el-aside .el-menu {
    border-right: none;
    background-color: rgba(255,255,255,0.5);
}

.layout-container .el-aside .el-menu .el-sub-menu .item {
    background-color: rgba(255,255,255,0.5) ;
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

