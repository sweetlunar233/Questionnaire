<script setup>
    import NavigationBar from '@/components/NavigationBar.vue';
    import { ref } from "vue";
    import { useRouter } from 'vue-router';

    const navigation = ref(NavigationBar);

</script>

<template>
    <el-container class="container">
        <el-header><navigation/></el-header>
        <el-container>
            <el-aside class = "aside"> 
                <div class="option">
                    <div class="optionIconContainer"><img src="@/assets/personalMessageIcon.png" class="optionIcon"></div>
                    
                    <span>个人信息</span>
                    <div class="flex-grow"></div>
                </div>
                <div class="option">
                    <div class="optionIconContainer"><img src="@/assets/shopIcon.png" class="optionIcon"></div>
                    
                    <span>商城</span>
                    <div class="flex-grow"></div>
                </div>
            </el-aside>
            <el-main>
                <!-- <router-view/> -->
            </el-main>
        </el-container>
    </el-container>

</template>

<style>
    .container {
        height: 100vh;
        background:  url("@/assets/bg2.png");
        background-size: cover;

        .aside {
            width: 30%;
            height: 80%;

            .option {
                border: red solid 1px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                width: 140px;
                height: 100px;
                background-color: white;
                border-radius: 10px;
                margin: 10px;
                padding: 0, 10px, 0, 10px;
                
                .optionIconContainer {
                    margin: 0, 20px,0, 20px;

                    .optionIcon {
                        width: 50px;
                        /* border: red solid 1px; */
                        
                    }
                }
                

                span {
                    /* border: blue solid 1px; */
                    font-size: 20px;
                    font-weight: bold;
                    margin: 0, 0, 0, 0;
                }

                .flex-grow {
                    flex-grow: 1;
                }
            }
        }
    }
</style>