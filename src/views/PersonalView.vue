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
            <div class = "aside"> 
                <button class = "option">
                    <img src="@/assets/personalMessageIcon.png" style="width: 50px; height: 50px;"/>
                    <span>个人信息</span>
                </button>
                <button class = "option">
                    <img src="@/assets/shopIcon.png" style="width: 50px; height: 50px;"/>
                    <span>商城</span>
                </button>
            </div>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
        
    </el-container>

</template>

<style lang="scss">
    .container {
        height: 100vh;
        background:  url("@/assets/bg2.png");
        background-size: cover;

        .aside {
            width: 400px;
            height: 98%;
            display: flex;
            flex-direction: column;
            
            // border: blue solid 2px;
            align-items: center;
            margin-top: 60px;
            
            .option {
                width: 60%;
                height: 10%;
                // padding: 1em 2em;
                border: none;
                border-radius: 5px;
                font-weight: bold;
                letter-spacing: 5px;
                text-transform: uppercase;
                cursor: pointer;
                color: #2c9caf;
                transition: all 1000ms;
                font-size: 25px;
                position: relative;
                overflow: hidden;
                outline: 2px solid #2c9caf;
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
                color: #ffffff;
                transform: scale(1.1);
                outline: 2px solid #70bdca;
                box-shadow: 4px 5px 17px -4px #268391;
            }

            .option::before {
                content: "";
                position: absolute;
                left: -50px;
                top: 0;
                width: 0;
                height: 100%;
                background-color: #2c9caf;
                transform: skewX(45deg);
                z-index: -1;
                transition: width 1000ms;
            }

            .option:hover::before {
                width: 250%;
            }

        }
    }

</style>