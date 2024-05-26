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
        <!-- 头部区域 -->
        <!-- <el-header>
            <div class="customerName"><strong>用户名！！！</strong></div>
            <el-dropdown placement="bottom-end">
                <span class="el-dropdown__box">
                    <el-avatar :src=avatar />
                    <el-icon>
                        <CaretBottom />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item :icon="User">基本资料</el-dropdown-item>
                        <el-dropdown-item :icon="Crop">更换头像</el-dropdown-item>
                        <el-dropdown-item :icon="EditPen">重置密码</el-dropdown-item>
                        <el-dropdown-item :icon="SwitchButton">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-header> -->
        <el-header><navigation/></el-header>
        <el-container>
            <!-- 左侧菜单 -->
            <el-aside width="250px" style="margin-top: 20px;">
                <div class="el-aside__logo"></div>
                <!-- element-plus的菜单标签 -->
                <el-menu active-text-color="#ffd04b" background-color="#fff"  text-color="rgb(80, 134, 233)"  router>
                    <el-sub-menu style="margin-top: 20px">
                        <template #title>
                            <el-icon>
                                <Promotion />
                            </el-icon>
                            <span>已创建问卷</span>
                        </template>
                        <el-menu-item index="/userManage/unreleased">
                            <el-icon>
                                <EditPen />
                            </el-icon>
                            <span>草稿箱</span>
                        </el-menu-item>
                        <el-menu-item index="/userManage/released">
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
                    <el-menu-item index="/personal">
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
    background-color: #fff;
    border: #666 solid 1px;
    border-radius: 7px;
}

.layout-container .el-aside__logo {
    height: 160px;
    background: url('@/assets/mylogo.gif') no-repeat center / 120px auto;
    margin-top: 20px;
}

.layout-container .el-aside .el-menu {
    border-right: none;
}

// .layout-container .el-header {
    // background-color: #fff;
    // display: flex;
    // align-items: center;
    // justify-content: space-between;
    // border-radius: 7px;
// }

// .layout-container .el-header .el-dropdown__box {
//     display: flex;
//     align-items: center;
//     margin-right: 20px;
// }

// .layout-container .el-header .el-dropdown__box .el-icon {
//     color: #999;
//     margin-left: 10px;
// }

// .layout-container .el-header .el-dropdown__box:active,
// .layout-container .el-header .el-dropdown__box:focus {
//     outline: none;
// }

.layout-container .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
}
 </style>

