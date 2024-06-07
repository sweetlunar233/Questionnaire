<script setup>
import {
    Edit,
    Delete,
    Link,
    Odometer,
    Open,
    View
} from '@element-plus/icons-vue'

import { ref } from 'vue'
import store from '../../store';


//文章列表数据模型
const questionnaires = ref([
    {
        "id": 5,
        "Title": "陕西旅游攻略",
        "Reward": "100",
        "Description": "陕西旅游攻略陕西旅游攻略陕西旅游攻略陕西旅游攻略陕西旅游攻略陕西旅游攻略陕西旅游攻略",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "createTime": "2023-09-03 11:55:30",
        "published": true,
        "PostMan": "lorian"
    },
    {
        "id": 5,
        "Title": "陕西旅游攻略",
        "Reward": "100",
        "Description": "陕西旅游攻略陕西旅游攻略陕西旅游攻略陕西旅游攻略陕西旅游攻略陕西旅游攻略陕西旅游攻略",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "createTime": "2023-09-03 11:55:30",
        "published": true,
        "PostMan": "lorian"
    },
    {
        "id": 5,
        "Title": "陕西旅游攻略",
        "Reward": "100",
        "Description": "陕西旅游攻略陕西旅游攻略陕西旅游攻略陕西旅游攻略陕西旅游攻略陕西旅游攻略陕西旅游攻略",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "createTime": "2023-09-03 11:55:30",
        "published": true,
        "PostMan": "lorian"
    },
    {
        "id": 5,
        "Title": "陕西旅游攻略",
        "Reward": "100",
        "Description": "陕西旅游攻略陕西旅游攻略陕西旅游攻略陕西旅游攻略陕西旅游攻略陕西旅游攻略陕西旅游攻略",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "createTime": "2023-09-03 11:55:30",
        "published": true,
        "PostMan": "lorian"
    },
])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(3)//每页条数

total.value = questionnaires.value.length

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size
    initAllReleased();
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    initAllReleased();
}


//截取Description前四十个字
const truncateDescription = (description) => {
    if (description.length > 38) {
    return description.slice(0, 38) + '……';
    } else {
    return description;
    }
};

//编辑问卷传输问卷id的函数
import { useRouter } from 'vue-router';
const r = useRouter();
const goToQuestionnaireFill = (questionnaireId) => {
  r.push({
    path: '/questionnaireFill',
    query: {
      questionnaireId: questionnaireId
    }
  });
}







import {GetAllReleasedQs} from '../../api/questionnaire.js'

const initAllReleased = () =>{
    questionnaires.value = [];  
    var promise = GetAllReleasedQs();
    promise.then((result)=>{
        var count = 0;
        var i = 1;
        result.data.forEach(element => {
            if(i > pageSize.value * (pageNum.value - 1))
            {
                if(i <= pageSize.value * pageNum.value){
                    questionnaires.value.push(element);
                }
            }
            count++;
            i++;
        });
        total.value = count;
    })
}
initAllReleased();








</script>
<template>
    <el-card class="page-container">
        <!-- 问卷列表 -->
        <el-row class="questionnaire-list">
            <el-col :span="8" v-for="(questionnaire, index) in questionnaires" :key="index">
                <div class="card">
                    <div class="first-content">
                        <span class="firstfirst">{{ questionnaire.Title }}</span>
                        <span class="first">post by： {{ questionnaire.PostMan }}</span>
                    </div>
                    <div class="second-content">
                        <span class="second">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{truncateDescription(questionnaire.Description)}}</span> 
                        <span class="second">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;悬赏奖励： {{ questionnaire.Reward }}纸币</span>
                        
                        <button type="primary" style="float: right;font-size: 17px" size="large" @click="goToQuestionnaireFill(questionnaire.SurveyID)"><span>填写</span></button>
                    </div>
                </div>
            </el-col>
        </el-row>
        <!-- 分页条 -->
        <el-pagination :page-sizes="[6, 8, 10, 12]"
        layout="sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
        @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
    </el-card>
</template>
<style scoped>

button {
  position: relative;
  margin: 0;
  padding: 0.8em 1em;
  outline: none;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  text-transform: uppercase;
  background-color: #333;
  border-radius: 10px;
  color: #fff;
  font-weight: 300;
  font-size: 18px;
  font-family: inherit;
  z-index: 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.02, 0.01, 0.47, 1);

  width: 80px;
  height: 40px;
}

button:hover {
  animation: sh0 0.5s ease-in-out both;
}

@keyframes sh0 {
  0% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }

  25% {
    transform: rotate(7deg) translate3d(0, 0, 0);
  }

  50% {
    transform: rotate(-7deg) translate3d(0, 0, 0);
  }

  75% {
    transform: rotate(1deg) translate3d(0, 0, 0);
  }

  100% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }
}

button:hover span {
  animation: storm 0.7s ease-in-out both;
  animation-delay: 0.06s;
}

button::before,
button::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #fff;
  opacity: 0;
  transition: transform 0.15s cubic-bezier(0.02, 0.01, 0.47, 1), opacity 0.15s cubic-bezier(0.02, 0.01, 0.47, 1);
  z-index: -1;
  transform: translate(100%, -25%) translate3d(0, 0, 0);
}

button:hover::before,
button:hover::after {
  opacity: 0.15;
  transition: transform 0.2s cubic-bezier(0.02, 0.01, 0.47, 1), opacity 0.2s cubic-bezier(0.02, 0.01, 0.47, 1);
}

button:hover::before {
  transform: translate3d(50%, 0, 0) scale(0.9);
}

button:hover::after {
  transform: translate(50%, 0) scale(1.1);
}











.card {
  width: 300px;
  height: 220px;
  background: rgb(253, 243, 243);
  transition: all 0.4s;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 5px  rgba(0, 0, 0, 0.705);
  font-size: 30px;
  font-weight: 900;


  margin: 30px 0 20px 0;
}

.card:hover {
  border-radius: 15px;
  cursor: pointer;
  transform: scale(1.2);
  box-shadow: 0px 0px 10px 5px  rgba(0, 0, 0, 0.705);
  background: rgb(248, 233, 233);
}

.first-content {
  height: 100%;
  width: 100%;
  transition: all 0.4s;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  border-radius: 15px;

  flex-direction: column;
}

.card:hover .first-content {
  height: 0px;
  opacity: 0;
}

.second-content {
  height: 0%;
  width: 100%;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  transition: all 0.4s;
  transform: rotate(90deg) scale(-1);

  flex-direction: column;
}

.card:hover .second-content {
  opacity: 1;
  height: 100%;
  font-size: 1.8rem;
  transform: rotate(0deg);
}

.second{
    font-size: 17px;
    width: 250px;
    margin-bottom: 10px;
}

.first{
    font-size: 17px;
    margin-left: 90px;
    margin-top: 60px;
}

.firstfirst{
    margin-top: 30px;
}









.page-container {
    min-height: 100%;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.05);
    border: 0;
}

.questionnaire-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 40px;
}

.questionnaire-card {
    width: 350px; /* 调整卡片宽度 */
    height: 270px; /* 调整卡片高度，使其近似正方形 */
    margin-bottom: 20px;
    transition: box-shadow 0.3s ease; /* 添加过渡效果 */
}

.questionnaire-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); /* 鼠标悬停时阴影加深 */
}

.questionnaire-info {
    /* height: 100%; 让信息部分占满整个卡片高度 */
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: -10px;
}

.questionnaire-info .info{
    margin-bottom: 3px;
}

.questionnaire-actions {
    margin-top: 15px;
    margin-right: 5px;
}



</style>