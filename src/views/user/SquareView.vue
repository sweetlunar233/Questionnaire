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
        "title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "createTime": "2023-09-03 11:55:30",
        "published": true
    },
    {
        "id": 5,
        "title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "createTime": "2023-09-03 11:55:30",
        "published": true
    },
    {
        "id": 5,
        "title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "createTime": "2023-09-03 11:55:30",
        "published": true
    },
    {
        "id": 5,
        "title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
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


</script>
<template>
    <el-card class="page-container">
        <!-- 问卷列表 -->
        <el-row class="questionnaire-list">
            <el-col :span="8" v-for="(questionnaire, index) in questionnaires" :key="index">
                <el-card class="questionnaire-card">
                    <div class="questionnaire-info">
                        <h3>{{ questionnaire.title }}</h3>
                        <p>{{ questionnaire.content }}</p>
                        <div class="questionnaire-actions">
                            <el-button type="text" icon="el-icon-edit" @click="editQuestionnaire(questionnaire)">编辑</el-button>
                            <el-button type="text" icon="el-icon-delete" @click="deleteQuestionnaire(questionnaire)">删除</el-button>
                            <el-button type="text" icon="el-icon-view" @click="viewQuestionnaire(questionnaire)">查看</el-button>
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
}

.questionnaire-info {
    height: 100%; /* 让信息部分占满整个卡片高度 */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.questionnaire-actions {
    margin-top: 10px;
}

.questionnaire-cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
}



</style>