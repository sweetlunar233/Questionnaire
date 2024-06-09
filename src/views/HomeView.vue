<!-- 首页 -->
<script setup>
    import NavigationBarWithoutUser from '../components/NavigationBarInLogin.vue';
    import { ref } from "vue";
    import { useRouter } from 'vue-router';
    
    const navigation2 = ref(NavigationBarWithoutUser);

    const router = useRouter();
    const gotoLogin = () => {
        //-1代表正常登录
        router.push({path:'/login',query:{questionnaireId:-1}});
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
        <el-main class="aside">
            <div class="title">纸翼<span>传问</span></div>
            <div class="subtitle">欢迎来到纸翼传问欢迎来到纸翼传问欢迎来到纸翼传问欢迎来到纸翼传问欢迎来到纸翼传问</div>
            <el-button id="start_btn" @click = "gotoLogin" @mouseover="btnIn" @mouseout="btnOut" class="button" >开始</el-button>

        </el-main>
      </el-container>
    </div>
</template>

<!-- dcx：scoped保证样式只会应用到当前 .vue 文件 -->
<style lang="scss">
    .all-container {
        height: 100vh;
        background: url("../assets/bg6.png");
        background-size: cover;
        // border: red solid 2px;

        .aside {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            // width: 600px;
            // height: 700px;
            // margin: 100px 20px 50px 200px;
            // border: red solid 1px;
            min-height: 100vh;

            .title {
                font-size: 56px;
                margin-bottom: 20px;
                color: white;
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
                color: white;
                font-weight: bold;
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
    .button {
            display: inline-block;
            position: relative;
            z-index: 1;
            overflow: hidden; 
            text-decoration: none;
            font-family: sans-serif;
            font-weight: 600;
            font-size: 50px;
            /* padding: 0.75em 1em; */
            padding-bottom: 70px;
            width:15%;
            color: rgb(255, 92, 228);
            /* border: 0.15em solid blue; */
            border-radius: 1em;
            transition: 3s;
            background-color: rgb(238, 188, 235);
            border: 4px rgb(255, 92, 228) solid;
        }

        .button:before,
        .button:after {
            content: "";
            position: absolute;
            top: -1.5em;
            z-index: -1;
            width: 200%;
            aspect-ratio: 1;
            border: none;
            border-radius: 40%;
            background-color: rgba(183, 0, 255, 0.25);
            transition: 4s;
        }

        .button:before {
            left: -80%;
            transform: translate3d(0, 5em, 0) rotate(-340deg);
        }

        .button:after {
            right: -80%;
            transform: translate3d(0, 5em, 0) rotate(390deg);
        }

        .button:hover,
        .button:focus {
            color: white;
            border: 4px white solid;
        }

        .button:hover:before,
        .button:hover:after,
        .button:focus:before,
        .button:focus:after {
            transform: none;
            background-color: rgba(255, 150, 185, 0.75);
        }
</style>