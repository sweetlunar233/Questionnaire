<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import store from '../../store';


// 校验确认密码是否与新密码一致的函数
const checkPassword = (rule, value, callback) => {
    if (value !== newPassword.value) {
        callback(new Error('两次输入的密码不一致'))
    } else {
        callback()
    }
}

// 定义变量和规则
const rules = {
    email: [
        { required: true, message: '请输入用户邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ],
    newPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        {
            pattern: /^\S{5,25}$/,
            message: '密码必须为5到25位非空字符',
            trigger: 'blur'
        }
    ],
    confirmPassword: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        { validator: checkPassword, trigger: 'blur' }
    ]
}

// 定义用户信息和密码相关变量
const userInfo = ref({
    // 初始化用户信息
    username: "",
    email: "",
    money: ""
})
const newPassword = ref('')
const confirmPassword = ref('')

// 修改密码弹窗的显示状态
const changePasswordVisible = ref(false)




import {getUserMessage, updateUserInfo, updateUserPassword} from "../../api/user.js"

const GetUserMessage = (username) => {
    var promise = getUserMessage(username);
    promise.then((result)=>{
        userInfo.value.userid = result.data.userid;
        userInfo.value.username = result.data.username;
        userInfo.value.email = result.data.email;
        userInfo.value.money = result.data.money;
    })
}
GetUserMessage(store.state.nowuser.username);

const UpdateUserInfo = (username, useremail) => {
    store.state.nowuser.email = useremail;
    var promise = updateUserInfo(username, useremail);
    promise.then((result)=>{
        GetUserMessage(store.state.nowuser.username);
        ElMessage.success("修改成功")
    })
}

// 提交修改密码的函数
const submitPassword = (username, password) => {
    store.state.nowuser.password = password;
    var promise = updateUserPassword(username, password);
    promise.then((result)=>{
        ElMessage.success('密码修改成功！');
        // 清空表单数据
        newPassword.value = '';
        confirmPassword.value = '';
        // 关闭弹窗
        changePasswordVisible.value = false;
    })
}

const cancelPassword = () => {
    ElMessage.info('取消修改')

    newPassword.value = ''
    confirmPassword.value = ''

    changePasswordVisible.value = false;

}






</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>基本资料</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="userInfo" :rules="rules" label-width="100px" size="large">
                    <!-- 每一个都要加上v-model -->
                    <el-form-item label="用户名" disabled>
                        <el-input v-model="userInfo.username"></el-input>
                    </el-form-item>
                    <el-form-item label="用户邮箱" prop="email">
                        <el-input v-model="userInfo.email"></el-input>
                    </el-form-item>
                    <el-form-item label="拥有纸币">
                        <el-input v-model="userInfo.money" disabled></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="UpdateUserInfo(userInfo.username, userInfo.email)">提交修改</el-button>
                        <el-button type="primary" @click="changePasswordVisible = true"  class="changePassword">修改密码</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <!-- 修改密码弹窗 -->
        <el-dialog title="修改密码" v-model="changePasswordVisible" @update:visible="val => changePasswordVisible = val">
            <el-form :model="{ newPassword, confirmPassword }" :rules="rules" label-width="100px" class="password">
                <el-form-item label="新密码" prop="newPassword">
                    <el-input type="password" v-model="newPassword"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input type="password" v-model="confirmPassword"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelPassword">取消</el-button>
                <el-button type="primary" @click="submitPassword(userInfo.username, newPassword)">提交</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<style scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;
}

.page-container .header{
    font-size: 20px;
}

.page-container .el-form-item{
    margin-top: 20px;
    margin-bottom: 40px;
}
.page-container .changePassword{
    margin-left: 30px;
}

.password{
    margin-right: 50px;
}
</style>