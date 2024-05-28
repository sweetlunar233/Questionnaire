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
        "published": true
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
        "published": true
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
        "published": true
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
        "published": true
    },
])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(3)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
}


//截取Description前四十个字
const truncateDescription = (description) => {
    if (description.length > 40) {
    return description.slice(0, 40) + '……';
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

const initAllReleased = (username) =>{
    var promise = GetAllReleasedQs();
    promise.then((result)=>{
        var count=0;
        result.data.forEach(element => {
            questionnaires.value.push(element);
            count++;
        });
        total.value = count;
    })
}
initAllReleased("胡彦喆");








</script>
<template>
    <el-card class="page-container">
        <!-- 问卷列表 -->
        <el-row class="questionnaire-list">
            <el-col :span="8" v-for="(questionnaire, index) in questionnaires" :key="index">
                <el-card class="questionnaire-card">
                    <div class="questionnaire-info">
                        <h2 class="info">{{ questionnaire.Title }}</h2>
                        <p class="info">{{ truncateDescription(questionnaire.Description) }}</p>
                        <h3 class="info">悬赏奖励： {{ questionnaire.Reward }}纸币</h3>
                        <div class="questionnaire-actions">
                            <el-button type="primary" style="float: right;font-size: 17px" size="large" @click="goToQuestionnaireFill(questionnaire.SurveyID)">填写</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!-- 分页条 -->
        <el-pagination :page-sizes="[3, 5, 10, 15]"
        layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
        @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
    </el-card>
</template>
<style scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;
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