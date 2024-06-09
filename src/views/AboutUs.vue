<script setup>
    import { ref } from 'vue'
    import {useRouter} from 'vue-router'
    const router = useRouter()
    import NavigationBar from '../components/NavigationBarInQuestionnaire.vue';
    const navigation = ref(NavigationBar);
</script>

<template>
    <!-- element-plus中的容器 -->
    <div style="background-color: rgb(243, 252, 255);">
        <el-header class="layout-container"><navigation/></el-header>
        <div class="main-content">
            <span class="title">关于我们</span>
            <img src="../assets/aboutus/d.jpg">
            <span class="text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欢迎来到我们的问卷设计与填写网站！我们致力于为用户提供简单、直观且功能强大的问卷设计和填写体验。无论您是想要创建一个市场调查、学术研究还是社会调查，我们都有您所需的工具和功能。</span>
            <span class="title">我们的使命</span>
            <img src="../assets/aboutus/c.jpg">
            <span class="text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们的使命是通过提供易于使用的工具和资源，帮助个人和组织更轻松地收集、分析和应用调查数据。我们相信有效的调查和反馈是改进和发展的关键，因此我们不断努力为用户提供最佳的问卷设计和填写解决方案。</span>
            <span class="title">我们的功能</span>
            <img src="../assets/aboutus/e.jpg">
            <span class="little-title">灵活的问卷设计:</span>
            <span class="text">我们提供了丰富的题型选项和定制功能，使用户能够根据自己的需求创建各种类型的问卷。</span>
            <span class="little-title">简单的填写体验:</span>
            <span class="text">用户可以通过电脑、平板电脑或手机轻松填写问卷，无论身处何地都能方便地参与调查。</span>
            <span class="little-title">实时数据分析:</span>
            <span class="text">我们的平台提供实时数据分析和报告功能，帮助用户快速了解调查结果并采取相应的行动。</span>
            <span class="little-title">安全和隐私保护: </span>
            <span class="text">我们严格遵守数据保护法规，保护用户的个人信息和调查数据安全。</span>
            <span class="title">联系我们</span>
            <img src="../assets/aboutus/g.jpg">
            <span class="text">如果您有任何疑问、建议或反馈，请随时联系我们。您可以通过以下方式与我们取得联系：</span>
            <span class="special-text">电子邮件：<a href="#">contact@yourwebsite.com</a></span>
            <span class="special-text">社交媒体：<a href="#">Twitter</a> | <a href="#">Facebook</a></span>
            <span class="text">感谢您选择我们的服务！我们期待着与您一起创建和分享有意义的调查项目。</span>
        </div>
        <el-footer class="layout-container">
            <span style="color: white;">Copyright © 2024 问卷星球 Created by 咱是什么组名啊来着. All Rights Reserved</span>
        </el-footer>
    </div>
</template>



<style scoped>
    .layout-container{
        background: url("../assets/aboutus/a.jpg") no-repeat;
        height: 100px;

        display: flex; 
        flex-direction: column;
        justify-content: center; 
        align-items: center;
    }

    .main-content {
        display: flex; 
        flex-direction: column;
        justify-content: center; 
        align-items: center;

        width: 80%;
        margin: 0 auto;
        
    }

    img{
        width: 500px;
        margin: 20px 0;
    }

    span{
        margin: 20px 0;
    }

    .title{
        font-size: 40px;
        font-weight: bold;
    }

    .text{
        font-size: 20px;
    }

    .little-title{
        /* margin-left: -700px; */
        font-size: 25px;
        font-weight: bold;
    }

    .special-text{
        font-size: 20px;
        font-weight: bold;
    }
</style>