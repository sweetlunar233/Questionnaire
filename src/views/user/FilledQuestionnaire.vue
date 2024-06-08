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

//引入cookie
import { getCurrentInstance } from 'vue'

const username = ref("")
 
// 创建可以访问内部组件实例的实例
const internalInstance = getCurrentInstance()
const internalData = internalInstance.appContext.config.globalProperties
username.value = internalData.$cookies.get('username') // 后面的为之前设置的cookies的名字

//文章分类数据模型
const categorys = ref([
    {
        "id": 0,
        "categoryName": "普通问卷"
    },
    {
        "id": 1,
        "categoryName": "投票问卷"
    },
    {
        "id": 2,
        "categoryName": "报名问卷"
    },
    {
        "id": 3,
        "categoryName": "考试问卷"
    }
])

//用户搜索时选中的分类id
const categoryId = ref('')

//文章列表数据模型
const questionnaires = ref([
    
])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(3)//每页条数

total.value = questionnaires.value.length

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size;
    initFilled(username.value);
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num;
    initFilled(username.value);
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

const flag = ref(true);

const initFilled = (username) =>{
    questionnaires.value = [];  
    var promise = GetFilledQs(username);
    promise.then((result)=>{
        console.log(result.data[0]);
        // var categoryName = "";
        // if(categoryId.value != ""){
        //     categorys.value.forEach(category => {
        //         if (category.id === categoryId) {
        //             categoryName = category.categoryName;
        //         }
        //     });
        // }
        var count = 0;
        var i = 1;
        result.data.forEach(element => {
            if(i > pageSize.value * (pageNum.value - 1))
            {
                if(i <= pageSize.value * pageNum.value){
                    if(categoryId.value != "" && element.Category != categoryId.value){
                        console.log("oh no!")
                    }
                    else{
                        questionnaires.value.push(element);
                    }
                }
            }
            count++;
            i++;
        });
        if(flag.value)
        {
            total.value = count;
            flag.value = false;
        }
        
    })
}
initFilled(username.value);


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
                initFilled(username.value);
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
                <span style="font-size: 30px;">已填写问卷</span>
                <!-- <div class="extra">
                    <el-button type="primary">添加文章</el-button>
                </div> -->
            </div>
        <!-- 搜索表单 -->
        <el-form inline class="searchform">
            <div style="margin-right: auto"></div>
            <el-form-item>
                <template #label>
                    <span style="color: white;font-size: 15px;">问卷分类：</span>
                </template>
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
                <el-button class="bottone5" type="primary" @click="initFilled(username)" style="background-color: black;border: 0;color: white;">搜索</el-button>
                <el-button class="bottone5" @click="categoryId=''" style="color: rgba(0, 0, 0, 0.753);">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="card-container">
            <div class="card" v-for="(questionnaire, index) in questionnaires" :key="index">
                <div class="bg">
                    <div>
                        <!-- 上部分 -->
                        <div class="card-header">
                            <span class="textbutton">{{ questionnaire.Title }}</span>
                            <span style="float: right" class="right">填写日期: {{ questionnaire.PublishDate }}</span>
                            <span style="float: right" class="right">ID: {{questionnaire.SurveyID}}</span>
                        </div>

                        <!-- 下部分 -->
                        <div class="card-footer">
                            <el-button type="text" :icon="Edit" @click="goToQuestionnaireFill(questionnaire.SurveyID)" class="thebutton">查看填写</el-button>
                            <el-button type="danger" :icon="Delete" style="float: right" circle @click="deleteQs(questionnaire.SurveyID)" class="deletebutton"></el-button>
                        </div>
                    </div>
                </div>
                <div class="blob"></div>
            </div>

        </div>
        <!-- 分页条 -->
        <el-pagination :page-sizes="[3, 5, 10]"
        layout="sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
        @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
    </el-card>
</template>
<style scoped>

.bottone5 {
 align-items: center;
 background-color: #FFFFFF;
 border: 2px solid rgba(0, 0, 0, 0.1);
 border-radius: .25rem;
 box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
 box-sizing: border-box;
 color: rgba(0, 0, 0, 0.85);
 cursor: pointer;
 display: inline-flex;
 font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
 font-size: 15px;
 font-weight: 600;
 justify-content: center;
 line-height: 1.25;
 min-height: 2.2rem;
 padding: calc(.875rem - 1px) calc(1.5rem - 1px);
 text-decoration: none;
 transition: all 250ms;
 user-select: none;
 -webkit-user-select: none;
 touch-action: manipulation;
 vertical-align: baseline;
 width: 4rem;
}

.bottone5:hover,
.bottone5:focus {
 border-color: rgba(0, 0, 0, 0.15);
 box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
 color: rgba(0, 0, 0, 0.65);
}

.bottone5:hover {
 transform: translateY(-1px);
}

.bottone5:active {
 background-color: #F0F0F1;
 border-color: rgba(0, 0, 0, 0.15);
 box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
 color: rgba(0, 0, 0, 0.65);
 transform: translateY(0);
}












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
  transform: scale(1.001); /* 鼠标悬停时放大 */
  box-shadow: 3px 3px 9px #bebebe, -1px -1px 3px #ffffff; /* 鼠标悬停时阴影加深 */
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
  background-color: #e63a3a;
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
    background-color: rgba(0, 0, 0, 0.05);
    border: 0;
}

.page-container .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    color: white;
    font-weight: bold;
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

.textbutton{
    margin-left: 20px;
    font-size: 20px;
}

.deletebutton{
    margin-right: 20px;
}

.header{
    margin-top: 5px;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px white solid;
}

.thebutton{
    margin-left: 20px;
    font-size: 15px;
}
</style>