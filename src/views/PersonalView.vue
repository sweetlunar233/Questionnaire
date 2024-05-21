<script setup>

</script>


<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activeMenu" mode="horizontal">
        <el-menu-item index="1">个人资料</el-menu-item>
        <el-menu-item index="2">账号设置</el-menu-item>
        <el-menu-item index="3">安全设置</el-menu-item>
        <el-menu-item index="4">退出登录</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <div v-if="activeMenu === '1'">
        <!-- 个人资料组件 -->
        <el-form :model="formData" label-width="120px">
            <el-form-item label="姓名">
            <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item label="头像">
            <el-upload
                action="https://example.com/upload"
                :show-file-list="false"
                @on-success="handleUploadSuccess"
            >
                <el-button type="primary">上传头像</el-button>
            </el-upload>
            </el-form-item>
            <el-form-item label="邮箱">
            <el-input v-model="formData.email" />
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="submitForm">保存</el-button>
            </el-form-item>
        </el-form>
      </div>
      <div v-if="activeMenu === '2'">
        <!-- 账号设置组件 -->
        <el-form :model="formData" label-width="120px">
            <el-form-item label="用户名">
            <el-input v-model="formData.username" />
            </el-form-item>
            <el-form-item label="密码">
            <el-input type="password" v-model="formData.password" />
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="submitForm">保存</el-button>
            </el-form-item>
        </el-form>
      </div>
      <div v-if="activeMenu === '3'">
        <!-- 安全设置组件 -->
        <el-form :model="formData" label-width="120px">
            <el-form-item label="两步验证">
            <el-switch v-model="formData.twoFactorAuth" />
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="submitForm">保存</el-button>
            </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>



<style scoped>
/* 自定义样式 */
</style>