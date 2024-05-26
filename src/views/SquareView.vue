<script setup>
    import { ref } from 'vue';
    
</script>

<template>
    <!-- element-plus中的容器 -->
    <el-container class="layout-container">
        <!-- 头部区域 -->
        <el-header>
            <div class="customerName"><strong>用户名！！！</strong></div>
            <!-- 下拉菜单 -->
            <!-- command: 条目被点击后会触发,在事件函数上可以声明一个参数,接收条目对应的指令 -->
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
        </el-header>
        <el-main>
            <el-row>
                <!-- 循环遍历问卷数据，展示每一个问卷卡片 -->
                <el-col :span="8" v-for="questionnaire in questionnaires" :key="questionnaire.id">
                <el-card class="questionnaire-card" shadow="hover">
                    <!-- 问卷卡片的内容 -->
                    <div class="questionnaire-info">
                    <h3>{{ questionnaire.title }}</h3>
                    <!-- 其他问卷信息 -->
                    </div>
                    <!-- 编辑问卷按钮 -->
                    <div class="edit-button">
                    <el-button type="primary" @click="editQuestionnaire(questionnaire.id)">编辑问卷</el-button>
                    </div>
                </el-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<style scoped>
.layout-container {
    height: 100vh;
    background: url("../assets/stacked-peaks-haikei.png");
}

.layout-container .el-header .customerName {
    font-size: 20px;
    font-weight: 700;
    color: #333;
    margin-left: 30px;
}

.layout-container .el-header .el-dropdown__box {
    display: flex;
    align-items: center;
    margin-right: 20px;
}

.layout-container .el-header .el-dropdown__box:active,
.layout-container .el-header .el-dropdown__box:focus {
    outline: none;
}
 </style>

