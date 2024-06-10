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
            <span class="little-title" style="margin-top: 0;">About Us</span>
            <img src="../assets/aboutus/d.jpg">
            <span class="text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欢迎来到我们的问卷设计与填写网站<span style="color: #409EFF; font-size: 30px; font-weight: bold;">纸翼传问</span>！作为一个在线平台，我们的使命是为用户提供简单、直观且功能强大的问卷设计和填写体验。我们致力于让问卷设计变得轻松愉快，让填写过程更加便捷高效。</span>
            <span class="text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在这里，您可以轻松创建各种类型的调查问卷，无论是针对市场、学术还是社会领域。我们的平台提供了丰富的功能和工具，满足您的各种需求。无论您是新手还是经验丰富的研究者，我们都有适合您的解决方案。</span>
            <span class="text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们的目标不仅是让问卷设计变得简单，更重要的是帮助您收集、分享和分析调查数据。我们提供实时数据分析和报告功能，让您可以随时了解调查结果，并据此采取相应的行动。您可以轻松创建统计图表、生成数据报告，以及与团队成员共享分析结果。</span>
            <span class="text"></span>
            <span class="title">我们的使命</span>
            <span class="little-title" style="margin-top: 0;">Our Mission</span>
            <img src="../assets/aboutus/c.jpg">
            <span class="text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们的使命是通过提供易于使用的工具和资源，帮助个人和组织更轻松地收集、分析和应用调查数据。我们相信有效的调查和反馈是改进和发展的关键。因此，我们不仅提供了强大的问卷设计和填写功能，还致力于帮助用户深入理解他们收集的数据，并将其转化为有意义的行动和决策。</span>
            <span class="title">我们的功能</span>
            <span class="little-title" style="margin-top: 0;">Our Function</span>
            <img src="../assets/aboutus/h.jpg">
            <div class="big-title">
                <span class="little-title">灵活的问卷设计:</span>
                <img src="../assets/aboutus/a1.png" style="width: 70px;">
            </div>
            <span class="text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们提供了丰富的题型选项和定制功能，使用户能够根据自己的需求创建各种类型的问卷。无论是单选题、多选题、开放性问题还是评分题，我们都有您需要的工具。此外，我们还提供了丰富的设计模板和样式选择，帮助用户快速创建具有吸引力的问卷。</span>
            <div class="big-title">
                <span class="little-title">简单的填写体验:</span>
                <img src="../assets/aboutus/a2.png" style="width: 70px;">
            </div>
            <span class="text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户可以通过电脑、平板电脑或手机轻松填写问卷，无论身处何地都能方便地参与调查。我们的填写界面简洁直观，用户体验友好，确保参与者能够快速、准确地完成问卷，从而提高数据的质量和可靠性。</span>
            <div class="big-title">
                <span class="little-title">实时数据分析:</span>
                <img src="../assets/aboutus/a3.png" style="width: 70px;">
            </div>
            <span class="text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们的平台提供实时数据分析和报告功能，帮助用户快速了解调查结果并采取相应的行动。用户可以随时查看问卷收集情况、数据统计和图表分析，轻松识别趋势和模式，并及时调整策略和决策。</span>
            <div class="big-title">
                <span class="little-title">安全和隐私保护:</span>
                <img src="../assets/aboutus/a4.png" style="width: 70px;">
            </div>
            <span class="text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们严格遵守数据保护法规，保护用户的个人信息和调查数据安全。我们采取了一系列措施来确保数据的安全性和机密性，包括数据加密、访问控制和备份恢复，以保障用户的隐私权和数据安全。</span>
            <span class="title">联系我们</span>
            <span class="little-title" style="margin-top: 0;">Contact Us</span>
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

    .big-title{
        display: flex; 
        flex-direction: row;
        justify-content: center; 
        align-items: center;
    }

    img{
        width: 500px;
        margin: 20px 0;
        transition: transform 1s;
    }

    img:hover{
        transform: scale(1.1);
    }

    span{
        margin: 20px 0;
    }

    .title{
        font-size: 40px;
        font-weight: bold;
        margin-top: 40px;
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