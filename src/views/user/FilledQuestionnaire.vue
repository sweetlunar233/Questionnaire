<script setup>
import {
    Edit,
    Delete,
    Link,
    Odometer,
    Check
} from '@element-plus/icons-vue'

import { ref } from 'vue'
import store from '../../store';

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
const questionnaires = ref([
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

total.value = questionnaires.value.length

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size;
    initCreated(store.state.nowuser.username);
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num;
    initCreated(store.state.nowuser.username);
}


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










import {ElMessageBox, ElMessage} from 'element-plus'
import {GetFilledQs, DeleteFilledQs} from '../../api/questionnaire.js'

const initFilled = (username) =>{
    var promise = GetFilledQs(username);
    promise.then((result)=>{
        var categoryName = "";
        if(categoryId.value != ""){
            categorys.value.forEach(category => {
                if (category.id === categoryId) {
                    categoryName = category.categoryName;
                }
            });
        }
        var count = 0;
        var i = 1;
        result.data.forEach(element => {
            if(i > pageSize.value * (pageNum.value - 1))
            {
                if(i <= pageSize.value * pageNum.value){
                    if(categoryName != "" && element.Category != categoryName) return;
                    questionnaires.value.push(element);
                }
            }
            count++;
            i++;
        });
        total.value = count;
    })
}
initFilled(store.state.nowuser.username);


const deleteQs = (id) =>{
    ElMessageBox.confirm(
        '你确认删除该问卷吗？',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            //用户点击了确认
            var promise = DeleteFilledQs(id);
            promise.then((result)=>{
                if(result.message === "True"){
                    ElMessage({
                        type: 'success',
                        message: '删除成功',
                    })
                }
                else{
                    ElMessage({
                        type: 'error',
                        message: result.content,
                    })
                }
                initFilled(store.state.nowuser.username);
            })
        })
        .catch(() => {
            //用户点击了取消
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}






</script>
<template>
    <el-card class="page-container">
            <div class="header">
                <span>已填写问卷</span>
                <!-- <div class="extra">
                    <el-button type="primary">添加文章</el-button>
                </div> -->
            </div>
        <!-- 搜索表单 -->
        <el-form inline class="searchform">
            <div style="margin-right: auto"></div>
            <el-form-item label="问卷分类：">
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
                <el-button type="primary" class="searchbutton" @click="initCreated(store.state.nowuser.username)" style="background-color: rgb(80, 134, 233);border: 0;">搜索</el-button>
                <el-button >重置</el-button>
            </el-form-item>
        </el-form>
        <div class="card-container">
            <div class="card" v-for="(questionnaire, index) in questionnaires" :key="index">
                <div class="bg">
                    <div>
                        <!-- 上部分 -->
                        <div class="card-header">
                            <span style="margin-left: 5px">{{ questionnaire.Title }}</span>
                            <span style="float: right" class="right">填写日期: {{ questionnaire.PublishDate }}</span>
                            <span style="float: right" class="right">ID: {{questionnaire.SurveyID}}</span>
                        </div>

                        <!-- 下部分 -->
                        <div class="card-footer">
                            <el-button type="text" :icon="Edit" @click="goToQuestionnaireFill(questionnaire.SurveyID)" class="textbutton">查看填写</el-button>
                            <el-button type="danger" :icon="Delete" style="float: right" circle @click="deleteQs(questionnaire.SurveyID)" class="deletebutton"></el-button>
                        </div>
                    </div>
                </div>
                <div class="blob"></div>
            </div>

        </div>
        <!-- 分页条 -->
        <el-pagination :page-sizes="[3, 5, 10, 15]"
        layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
        @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
    </el-card>
</template>
<style scoped>
.card {
  position: relative;
  width: 1200px;
  height: 120px;
  border-radius: 14px;
  z-index: 1111;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 3px #bebebe, -1px -1px 3px #ffffff;

  margin-left: 30px;
  margin-bottom: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: scale(1.01); /* 鼠标悬停时放大 */
  box-shadow: 3px 3px 9px #bebebe, -3px -3px 9px #ffffff; /* 鼠标悬停时阴影加深 */
}


.bg {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 1190px;
  height: 110px;
  z-index: 2;
  background: rgba(255, 244, 244, 0.95);
  backdrop-filter: blur(24px);
  border-radius: 10px;
  overflow: hidden;
  outline: 1px solid white;
}

.blob {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ec4217;
  opacity: 1;
  filter: blur(12px);
  animation: blob-bounce 5s infinite ease;
}

@keyframes blob-bounce {
  0% {
    transform: translate(-100%, -100%) translate3d(-595px, 0, 0);
  }

  40% {
    transform: translate(-100%, -100%) translate3d(595px, 0, 0);
  }

  50% {
    transform: translate(-100%, -100%) translate3d(595px, 110px, 0);
  }

  90% {
    transform: translate(-100%, -100%) translate3d(-595px, 110px, 0);
  }

  100% {
    transform: translate(-100%, -100%) translate3d(-595px, 0, 0);
  }
}












.page-container {
    min-height: 100%;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0);
    border: 0;
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
  margin-top: 15px;
}

.card-footer {
  padding-top: 15px;
  border-top: 1px solid #ebeef5;
}

.right{
    font-size: 13px;
    padding-left: 7px;
    padding-right: 20px;
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

.textbutton{
    margin-left: 20px;
}

.deletebutton{
    margin-right: 20px;
}

</style>