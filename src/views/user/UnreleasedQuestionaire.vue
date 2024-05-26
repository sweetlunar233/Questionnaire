<script setup>
import {
    Edit,
    Delete,
    Link,
    Odometer,
    Check
} from '@element-plus/icons-vue'

import { ref } from 'vue'

//文章分类数据模型
const categorys = ref([
    {
        "id": 1,
        "categoryName": "生活"
    },
    {
        "id": 2,
        "categoryName": "娱乐"
    },
    {
        "id": 3,
        "categoryName": "学习"
    }
])

//用户搜索时选中的分类id
const categoryId = ref('')

//文章列表数据模型
const articles = ref([
    {
        "id": 5,
        "title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
    },
    {
        "id": 5,
        "title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
    },
    {
        "id": 5,
        "title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
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

//编辑问卷传输问卷id的函数
import { useRouter } from 'vue-router';
const r = useRouter();
const goToQuestionnaireDesign = (questionnaireId) => {
  r.push({
    path: '/questionnaireDesign',
    query: {
      questionnaireId: questionnaireId
    }
  });
}

</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>问卷管理</span>
                <div class="extra">
                    <el-button type="primary">创建问卷</el-button>
                </div>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline class="searchform">
            <div style="margin-right: auto"></div>
            <el-form-item label="文章分类：">
                <el-select placeholder="请选择" style="width: 150px" v-model="categoryId">
                    <el-option v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="c.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="发布状态：">
                <el-select placeholder="请选择">
                    <el-option label="已发布" value="已发布"></el-option>
                    <el-option label="草稿" value="草稿"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" class="searchbutton">搜索</el-button>
                <el-button >重置</el-button>
            </el-form-item>
        </el-form>
        <div class="card-container">
            <el-card v-for="(article, index) in articles" :key="index" class="article-card" style="margin-bottom: 20px;">
                <div>
                    <!-- 上部分 -->
                    <div class="card-header">
                        <span style="margin-left: 5px">标题</span>
                        <span style="float: right" class="right">创建日期: YYYY-MM-DD</span>
                        <!-- <span style="float: right" class="right">答卷数量: XX</span>
                        <span style="float: right" class="right">是否发布: 是/否</span> -->
                        <span style="float: right" class="right">ID: XXX</span>
                    </div>

                    <!-- 下部分 -->
                    <div class="card-footer">
                        <!-- 编辑按钮、发送按钮、分析按钮 -->
                        <el-button type="text" :icon="Edit" @click="goToQuestionnaireDesign(123)">编辑问卷</el-button>
                        <el-button type="text" :icon="Link">发送问卷</el-button>
                        <!-- <el-button type="text" :icon="Odometer">分析数据</el-button> -->
                        <!-- 发布按钮、删除按钮 -->
                        <!-- <el-button type="primary" :icon="Check" style="float: right" circle></el-button> -->
                        <el-button type="danger" :icon="Delete" style="float: right" circle></el-button>
                    </div>
                </div>
                
                <!-- <div slot="header" class="clearfix">
                <span>{{ article.title }}</span>
                <el-button :icon="Edit" type="primary" circle class="edit-button"></el-button>
                <el-button :icon="Delete" type="danger" circle class="delete-button"></el-button>
                </div>
                <div>{{ article.categoryName }}</div>
                <div>{{ article.createTime }}</div>
                <div>{{ article.state }}</div> -->
            </el-card>
            <!-- <template #empty>
                <el-empty description="没有数据" />
            </template> -->
        </div>
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

.page-container .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
}

.article-card {
  /* 其他样式 */
  transition: box-shadow 0.3s ease; /* 添加过渡效果 */
  
}

.article-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); /* 鼠标悬停时阴影加深 */
}

.card-header {
  padding-bottom: 10px;
}

.card-footer {
  padding-top: 15px;
  border-top: 1px solid #ebeef5;
}

.right{
    font-size: 13px;
    padding-left: 7px;
    padding-right: 7px;
    border-right: 1px solid #ebeef5;
}

.right:first-child{
    border-right: 0px;
}

.searchform{
    display: flex;
    justify-content: flex-end;
}

.searchform .searchbutton{
    margin-right: 5px;
}

</style>