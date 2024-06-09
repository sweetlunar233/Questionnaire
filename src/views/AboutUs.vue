<script setup>
    import { ref } from 'vue'
    import {useRouter} from 'vue-router'
    const router = useRouter()
    import NavigationBar from '../components/NavigationBarInQuestionnaire.vue';
    const navigation = ref(NavigationBar);
</script>

<template>
    <!-- element-plus中的容器 -->
    <div class="layout-container">
        <el-header><navigation/></el-header>
        <div class="main-content">

        </div>
    </div>
</template>



<style scoped>
    .layout-container{
        background: url("../assets/bg.png") no-repeat;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        width: 100%;
        height: 100vh;
    }

    .main-content {
        background: url("../assets/bg.png") no-repeat;
    }
</style>