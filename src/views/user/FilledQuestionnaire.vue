<script setup>
import {
    Edit,
    Delete,
    Link,
    Odometer,
    Check,
    GoldMedal,
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

import {ElMessageBox, ElMessage} from 'element-plus'
import {GetFilledQs, DeleteFilledQs, checkFilled} from '../../api/questionnaire.js'

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
const categoryId = ref("请选择")

//文章列表数据模型
const questionnaires = ref([
    
])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(4)//每页条数

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

const print = (x) => {
    console.log(x);
}


//编辑问卷传输问卷id的函数
import { useRouter } from 'vue-router';
const r = useRouter();
const goToQuestionnaireDesign = (questionnaireId, questionnaireType) => {
  r.push({
    path: '/questionnaireDesign',
    query: {
      questionnaireId: questionnaireId,
      questionnaireType: questionnaireType
    }
  });
}
const goToQuestionnaireFill = (questionnaireId, submissionId, Status, type, score) => {
  let url = '';
//   console.log("start0");
  if(Status === "未提交"){
    console.log("start")
    console.log(questionnaireId)
    console.log(submissionId)
    // var promise = checkFilled(questionnaireId);
    // promise.then((result)=>{
    //     if(result.message === "True"){
            url = '/questionnaireFill';
            r.push({
                path: url,
                query: {
                    questionnaireId: questionnaireId,
                    submissionId: submissionId
                }
            });
        }
//         else{
//             ElMessage.error(result.content);
//         }
//     })
//   }
  else if(Status === "已删除"){
    ElMessage.error("该问卷已被发布者删除");
  }
  else{
    if(type == 0){
        r.push({
            path: "/normalAnswer",
            query: {
                questionnaireId: questionnaireId,
                submissionId: submissionId
            }
        });
    }
    else if(type == 1){
        r.push({
            path: "/dataPre",
            query: {
                questionnaireId: questionnaireId,
                submissionId: submissionId,
                flag: true
            }
        });
    }
    else if(type == 2){
        ElMessageBox.confirm(
            '恭喜您，已经报名成功！',
            '温馨提示',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
                icon: 'GoldMedal',
            }
        )
        .then(() => {
            //用户点击了确认
            
        })
        .catch(() => {
            //用户点击了取消
            
        })
    }
    else if(type == 3){
        r.push({
            path: "/testAnswer",
            query: {
                questionnaireId: questionnaireId,
                submissionId: submissionId,
                score: score,
            }
        });
    }
  }
  
}












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
            if(categoryId.value != "请选择" && element.Category != categoryId.value){
                console.log("oh no!")
            }
            else{
                if(i > pageSize.value * (pageNum.value - 1))
                {
                    if(i <= pageSize.value * pageNum.value){
                        questionnaires.value.push(element);   
                    }
                }
                count++;
                i++;
            }
        });
        total.value = count;
        
    })
}
initFilled(username.value);


const deleteQs = (id) =>{
    ElMessageBox.confirm(
        '你确认删除该填写记录吗？',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            //用户点击了确认
            total.value--;
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


// 使用 ref 创建响应式数据
const createDialogVisible = ref(false); // 控制创建问卷弹窗的显示
const selectedType = ref(""); // 选择的问卷类型

// 点击创建问卷按钮时显示弹窗
const showCreateDialog = () => {
  selectedType.value = "";
  createDialogVisible.value = true;
};

// 处理关闭弹窗事件
const handleCloseDialog = () => {
  // 清空数据或其他操作
  createDialogVisible.value = false
  selectedType.value = "";
};

// 处理创建问卷事件
const handleCreate = () => {
  // 根据选定的问卷类型执行相应的操作
  // 例如：保存选择的类型，跳转到问卷设计页面等
  goToQuestionnaireDesign(-1, selectedType.value);
  // 关闭弹窗
  createDialogVisible.value = false;
};





</script>
<template>
    <el-card class="page-container">
            <div class="header">
                <span style="font-size: 30px;">已填写问卷</span>
                <div class="extra">
                    <button class="nbbutton" @click="showCreateDialog" style="margin-right: 30px;">创建问卷</button>
                </div>
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
                <el-button class="bottone5" @click="categoryId='请选择';initFilled(username)" style="color: rgba(0, 0, 0, 0.753);">重置</el-button>
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
                            <span style="float: right" class="right">{{ questionnaire.Status }}</span>
                            <span style="float: right" class="right">ID: {{questionnaire.SurveyID}}</span>
                        </div>
                        
                        <!-- 下部分 -->
                        <div class="card-footer">
                            <el-button type="text" :icon="Edit" @click="goToQuestionnaireFill(questionnaire.SurveyID, questionnaire.SubmissionID, questionnaire.Status, questionnaire.Category, questionnaire.Score)" class="thebutton">查看填写</el-button>
                            <el-button type="danger" :icon="Delete" style="float: right" circle @click="deleteQs(questionnaire.SurveyID)" class="deletebutton"></el-button>
                        </div>
                    </div>
                </div>
                <div class="blob"></div>
            </div>
            <!-- 创建问卷的弹窗 -->
            <el-dialog width="1050px" :height="auto" center v-model="createDialogVisible" @update:visible="val => createDialogVisible = val" >
                <div class="dialogfather">
                    <div class="dialogfont">请选择问卷类型</div>
                    <div class="dialog">
                        <div class="book" @click="goToQuestionnaireDesign(-1, 0)">
                            <p>普通问卷</p>
                            <div class="cover">
                                <img src="../../assets/0.png">
                            </div>
                        </div>
                        <div class="book" @click="goToQuestionnaireDesign(-1, 1)">
                            <p>投票问卷</p>
                            <div class="cover">
                                <img src="../../assets/1.png">
                            </div>
                        </div>
                        <div class="book" @click="goToQuestionnaireDesign(-1, 2)">
                            <p>报名问卷</p>
                            <div class="cover">
                                <img src="../../assets/2.png">
                            </div>
                        </div>
                        <div class="book" @click="goToQuestionnaireDesign(-1, 3)">
                            <p>考试问卷</p>
                            <div class="cover">
                                <img src="../../assets/3.png">
                            </div>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <!-- 分页条 -->
        <el-pagination :page-size="4" 
        layout="total, prev, pager, next" background :total="total" @size-change="onSizeChange"
        @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
    </el-card>
</template>
<style scoped>

.nbbutton {
 padding: 8px 12px;
 border: unset;
 border-radius: 15px;
 color: #212121;
 z-index: 1;
 background: #e8e8e8;
 position: relative;
 font-weight: 1000;
 font-size: 17px;
 -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
 box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
 transition: all 250ms;
 overflow: hidden;

 border: 5px solid black;
}

.nbbutton::before {
 content: "";
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 width: 0;
 border-radius: 15px;
 background-color: #212121;
 z-index: -1;
 -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
 box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
 transition: all 250ms
}

.nbbutton:hover {
 color: #e8e8e8;
}

.nbbutton:hover::before {
 width: 100%;
}

.dialogfather{
    display: flex; 
    justify-content: center; 
    align-items: center;
    flex-direction: column;
    color: black;
}

.dialogfont{
    font-size: 40px;
    font-weight: bold;
}

.dialog .book {
  position: relative;
  border-radius: 10px;
  width: 200px;
  height: 250px;
  background-color: rgb(255, 255, 255);
  /* -webkit-box-shadow: 1px 1px 12px #000; */
  box-shadow: 1px 1px 3px #000;
  -webkit-transform: preserve-3d;
  -ms-transform: preserve-3d;
  transform: preserve-3d;
  -webkit-perspective: 2000px;
  perspective: 2000px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: #000;

  margin: 40px 20px;
  cursor: pointer;
}

.dialog .cover {
  top: 0;
  position: absolute;
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-transform-origin: 0;
  -ms-transform-origin: 0;
  transform-origin: 0;
  /* -webkit-box-shadow: 1px 1px 12px #000; */
  box-shadow: 1px 1px 3px #000;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.dialog .book:hover .cover {
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-transform: rotatey(-80deg);
  -ms-transform: rotatey(-80deg);
  transform: rotatey(-80deg);
}

.dialog p {
  font-size: 40px;
  font-weight: bolder;
  margin-left: 20px;
}

.dialog{
    display: flex; 
    flex-direction: row;
    justify-content: center; 
    align-items: center;
}

.dialog div{
    width: 20px;
    height: 20px;
}

.dialog img{
    display: inline-block;
    max-width: 100%; 
    height: auto; 
    margin: 0; 
}

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