<!-- 首页 -->
<script setup>
    import NavigationBarWithoutUser from '../components/NavigationBarWithoutUser.vue';
    import { ref } from "vue";
    import { useRouter } from 'vue-router';
    
    const navigation2 = ref(NavigationBarWithoutUser);

    const router = useRouter();
    const gotoLogin = () => {
        router.push('/login');
    };

    function btnIn() {
        document.getElementById("start_btn").classList.add("zoom-btn");
    }
    function btnOut() {
        document.getElementById("start_btn").classList.remove("zoom-btn");
    }
</script>


<template>
    <div class="all-container">
      <el-container>
        <el-header><navigation2/></el-header>
        <el-container>
            <el-aside class="aside">
                <div class="title">纸翼<span>传问</span></div>
                <div class="subtitle">欢迎来到纸翼传问欢迎来到纸翼传问欢迎来到纸翼传问欢迎来到纸翼传问欢迎来到纸翼传问</div>
                <button id="start_btn" @click = "gotoLogin" @mouseover="btnIn" @mouseout="btnOut" class="btn">开始</button>
            </el-aside>
          <el-main class="main"><img src="../assets/封面.png"></el-main>
        </el-container>
      </el-container>
    </div>
</template>

<!-- dcx：scoped保证样式只会应用到当前 .vue 文件 -->
<style lang="scss" scoped>
    .all-container {
        height: 100vh;
        background: url("../assets/bg6.png");
        background-size: cover;

        .aside {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 600px;
            height: 700px;
            margin: 100px 20px 50px 200px;
            // border: red solid 1px;

            .title {
                font-size: 56px;
                margin-bottom: 20px;
                span {
                    color: rgb(243,156,181);
                    font-weight: bold;
                }
            }

            .subtitle {
                font-size: 20px;
                margin-bottom: 50px;
                padding: 40px;
                text-align: justify;
            }

            .btn {
                // font-size:40px;
                // font-weight: normal;
                width: 40%;
                height: 50px;
                background: rgb(243,156,181);
                color:white;
                border: none;
                outline: none;
                border-radius: 5px;
                // font-weight: bold;
                letter-spacing: 10px;
                font-size: 25px;
                cursor: pointer;
                margin-bottom: 80px;
            }
        }

        .main {
            // border: blue solid 1px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin: 40px 0 0 0;
            
            img {
                width: 750px;
                height: auto;
                margin-right: 20px;
            }
        }
    }

    .zoom-btn {
        transform: scale(1.2); /* 缩放图片到 1.2 倍大小 */
        transition: transform 0.3s ease-in-out; /* 添加过渡效果 */
    }
    
</style>