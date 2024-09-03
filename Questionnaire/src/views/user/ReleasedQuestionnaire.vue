<script setup>
import {
    Edit,
    Delete,
    Link,
    Odometer,
    Open,
    View,
    Printer,
    Share,
} from '@element-plus/icons-vue'

import { ref } from 'vue'
import store from '../../store';
import {ElMessageBox, ElMessage} from 'element-plus'
import {GetReleasedQs, UpdateOrDelete} from '../../api/questionnaire.js'

const value1 = ref(true)
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
const categoryId = ref('请选择')

//文章列表数据模型
const questionnaires = ref([
    {
        "SurveyID": 5,
        "Title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "PublishDate": "2023-09-03 11:55:30",
        "IsOpening": true
    },
    {
        "SurveyID": 5,
        "Title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "PublishDate": "2023-09-03 11:55:30",
        "IsOpening": true
    },
    {
        "SurveyID": 5,
        "Title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "PublishDate": "2023-09-03 11:55:30",
        "IsOpening": true
    },
    
])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(4)//每页条数

total.value = questionnaires.value.length

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size;
    initCreated(username.value);
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num;
    initCreated(username.value);
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
const goToQuestionnaireDesignCopy = (questionnaireId, questionnaireType, flag) => {
  r.push({
    path: '/questionnaireDesign',
    query: {
      questionnaireId: questionnaireId,
      questionnaireType: questionnaireType,
      flag: flag,
    }
  });
}
const goToQuestionnaireFill = (questionnaireId, flag) => {
  r.push({
    name: 'questionnaireFill',
    params: {
      questionnaireId: questionnaireId,
      submissionId:-2,
      flag: flag,
    }
  });
}
const goToQuestionnaireData = (questionnaireId, FilledPeople) => {
    if(FilledPeople == 0) {
        ElMessage({
            type: "error",
            message: "暂时还没有人填问卷~",
        })
        return;
    }
    console.log("goToQuestionnaireData")
    console.log(questionnaireId)
    r.push({
        name: 'dataPreFlag',
        params: {
            questionnaireId: questionnaireId
        }
    });
}




import { getCurrentInstance } from 'vue'

const username = ref("")
 
// 创建可以访问内部组件实例的实例
const internalInstance = getCurrentInstance()
const internalData = internalInstance.appContext.config.globalProperties
username.value = internalData.$cookies.get('username') // 后面的为之前设置的cookies的名字








const flag = ref(true);

const initCreated = (username) =>{
    questionnaires.value = [];
    var promise = GetReleasedQs(username);
    promise.then((result)=>{
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
initCreated(username.value);


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
            total.value--;
            var promise = UpdateOrDelete(id, 1);
            promise.then((result)=>{
                if(result.message == "True"){
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
                if(total.value % 4 === 0 && pageNum.value == total.value / 4)
                {
                    console.log("222");
                }
                else
                {
                    initCreated(username.value);
                }
                
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

const updateIsOpening = (id) =>{
    var promise = UpdateOrDelete(id, 0);
    promise.then((result)=>{
        
        if(result.message == "False"){
            ElMessage({
                type: 'error',
                message: result.content,
            })
        }
        else{
            console.log("114514")
        }
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

//分享问卷弹窗的变量
const shareDialogVisible = ref(false)
//点击创建问卷按钮时显示弹窗
const showShareDialog = () => {
    shareDialogVisible.value = true;
};
// 处理关闭弹窗事件
const closeShareDialog = () => {
  // 清空数据或其他操作
  shareDialogVisible.value = false
};


//编辑问卷提示新开一个问卷
const reviseQuestionnaire = (id, type) => {
    ElMessageBox.confirm(
        '该问卷已发布，若要编辑，将新建此问卷的副本。您确定要这么做吗？',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
    .then(() => {
        //用户点击了确认
        goToQuestionnaireDesignCopy(id, type, 1);
    })
    .catch(() => {
        //用户点击了取消
        ElMessage({
            type: 'info',
            message: '取消编辑',
        })
    })
}

const formatDate = (date) => {
    return date.split('T')[0]; // 提取日期部分
}


import { NQrCode } from 'naive-ui';

// 定义要显示的网址
var url = ref('https://www.baidu.com');

// 复制到剪贴板的函数
const copyToClipboard = async () => {
//  try {
//   // 使用 Clipboard API 复制内容
//   await navigator.clipboard.writeText(url.value);
//   alert('网址已复制到剪贴板!');
//  } catch (err) {
//   console.error('复制失败:', err);
//   alert('复制失败，请手动复制网址。');
//  }
    // 获取要复制的内容
    const textToCopy = url.value;
    // 辅助函数：使用 document.execCommand 复制文本
    const copyUsingExecCommand = () => {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            alert('网址已复制到剪贴板!');
        } catch (err) {
            console.error('复制失败:', err);
            alert('复制失败，请手动复制网址。');
        }
        document.body.removeChild(textArea);
    };
    // 尝试使用 Clipboard API 复制
    if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
            await navigator.clipboard.writeText(textToCopy);
            alert('网址已复制到剪贴板!');
        } catch (err) {
            console.error('Clipboard API 复制失败:', err);
            copyUsingExecCommand(); // 作为回退方案使用 execCommand
        }
    } else {
    // 如果不支持 Clipboard API，则使用 execCommand
        copyUsingExecCommand();
    }
};

const shareQuestionnaire = (SurveyID) => {
    showShareDialog();
    url.value = "http://49.232.201.229/questionnaireFill/" + SurveyID + "/-1"
}

// 使用 ref 创建响应式数据
const modeDialogVisible = ref(false); // 控制创建问卷弹窗的显示
// 点击创建问卷按钮时显示弹窗
const showModeDialog = () => {
    modeDialogVisible.value = true;
};


</script>
<template>
    <el-card class="page-container">
        <div class="header">
            <span style="font-size: 30px;">已发布问卷</span>
            <div class="extra">
                <button class="nbbutton" @click="showModeDialog" style="margin-right: 30px;">问卷模板</button>
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
            <el-form-item>
                <el-button class="bottone5" type="primary" @click="initCreated(username)" style="background-color: black;border: 0;color: white;">搜索</el-button>
                <el-button class="bottone5" @click="categoryId='请选择';initCreated(username)" style="color: rgba(0, 0, 0, 0.753);">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="card-container">
            <div class="card" v-for="(questionnaire, index) in questionnaires" :key="index">
                <div class="bg">
                    <div>
                        <!-- 上部分 -->
                        <div class="card-header">
                            <span class="textbutton">{{ questionnaire.Title }}</span>
                            <span style="float: right" class="right">发布日期: {{ formatDate(questionnaire.PublishDate) }}</span>
                            <span style="float: right" class="right" v-if="questionnaire.IsOpening">已发布</span>
                            <span style="float: right" class="right" v-else>已关闭</span>
                            <span style="float: right" class="right">回收量 {{questionnaire.FilledPeople}}</span>
                            <span style="float: right" class="right">ID: {{questionnaire.SurveyID}}</span>
                        </div>

                        <!-- 下部分 -->
                        <div class="card-footer">
                            <el-button type="text" :icon="Edit" @click="reviseQuestionnaire(questionnaire.SurveyID, questionnaire.Category)" :disabled="questionnaire.IsOpening" class="thebutton">编辑问卷</el-button>
                            <!-- <el-button type="text" :icon="View" @click="goToQuestionnaireFill(questionnaire.SurveyID, 1)" class="otherbutton">预览</el-button>
                            <el-button type="text" :icon="Link" class="otherbutton">发送问卷</el-button> -->
                            <el-button type="text" :icon="Odometer" class="otherbutton" @click="goToQuestionnaireData(questionnaire.SurveyID, questionnaire.FilledPeople)">分析数据</el-button>
                            <el-button type="text" :icon="Printer" class="otherbutton" @click="goToQuestionnaireFill(questionnaire.SurveyID, 2)">导出问卷</el-button>
                            <el-button type="text" :icon="Share" class="otherbutton" @click="shareQuestionnaire(questionnaire.SurveyID)">分享问卷</el-button>
                            <el-switch v-model="questionnaire.IsOpening" style="float: right; margin-left: 10px;--el-switch-on-color: #626aef;" @change="updateIsOpening(questionnaire.SurveyID)"  class="deletebutton"/>
                            <el-button type="danger" :icon="Delete" style="float: right" circle @click="deleteQs(questionnaire.SurveyID)"></el-button>
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
                            <img src="../../assets/0.png">
                            <div class="cover">
                                <p>普通问卷</p>
                            </div>
                        </div>
                        <div class="book" @click="goToQuestionnaireDesign(-1, 1)">
                            <img src="../../assets/1.png">
                            <div class="cover">
                                <p>投票问卷</p>
                            </div>
                        </div>
                        <div class="book" @click="goToQuestionnaireDesign(-1, 2)">
                            <img src="../../assets/2.png">
                            <div class="cover">
                                <p>报名问卷</p>
                            </div>
                        </div>
                        <div class="book" @click="goToQuestionnaireDesign(-1, 3)">
                            <img src="../../assets/3.png">
                            <div class="cover">
                                <p>考试问卷</p>
                            </div>
                        </div>
                    </div>
                </div>
            </el-dialog>
            <el-dialog width="800px" height="200px" center v-model="shareDialogVisible" @update:visible="val => shareDialogVisible = val" >
                <div class="dialogfather1">
                    <div class="dialogfont1">问卷链接与二维码</div>
                    <div class="dialog1">
                        <span><n-qr-code :value="url" error-correction-level="H"/></span>
                        <!-- 只读输入框 -->
                        <input
                            type="text"
                            :value="url"
                            readonly
                            class="url-input"
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <!-- 复制按钮 -->
                        <button @click="copyToClipboard" class="copy-button">
                            复制网址
                        </button>
                    </div>
                </div>
            </el-dialog>
            <el-dialog width="1050px" height="300px" center v-model="modeDialogVisible" @update:visible="val => modeDialogVisible = val" >
                <div class="dialogfather">
                    <div class="dialogfont">请选择模板</div>
                    <div class="dialog">
                        <div class="book1" @click="goToQuestionnaireDesignCopy(293, 0, 1)">
                            <img src="../../assets/mod/0.png">
                            <div class="cover1">
                                <span>MBTI测试</span>
                            </div>
                        </div>
                        <div class="book1" @click="goToQuestionnaireDesignCopy(292, 0, 1)">
                            <img src="../../assets/mod/1.png">
                            <div class="cover1">
                                <span>动物领养调查问卷</span>
                            </div>
                        </div>
                        <div class="book1" @click="goToQuestionnaireDesignCopy(294, 0, 1)">
                            <img src="../../assets/mod/2.png">
                            <div class="cover1">
                                <span>市场情况调研问卷</span>
                            </div>
                        </div>
                        <div class="book1" @click="goToQuestionnaireDesignCopy(295, 2, 1)">
                            <img src="../../assets/mod/3.png">
                            <div class="cover1">
                                <span>暑期课程学生报名表</span>
                            </div>
                        </div>
                        <div class="book1" @click="goToQuestionnaireDesignCopy(296, 1, 1)">
                            <img src="../../assets/mod/4.png">
                            <div class="cover1">
                                <span>年度社区活动提案投票</span>
                            </div>
                        </div>
                        <div class="book1" @click="goToQuestionnaireDesignCopy(297, 3, 1)">
                            <img src="../../assets/mod/5.png">
                            <div class="cover1">
                                <span>2024年综合知识测试</span>
                            </div>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <!-- 分页条 -->
        <el-pagination :page-size="4"
        layout="total, prev, pager, next" background :total="total" @size-change="onSizeChange"
        @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end;" />
    </el-card>
</template>
<style scoped>

.url-input {
  width: 300px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f5f5f5;
  margin-left: 10px;
  margin-top: 50px;
}

.copy-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-top: 50px;
}

.copy-button:hover {
  background-color: rgb(42, 145, 255);
}

.dialogfather1{
    display: flex; 
    justify-content: center; 
    /* align-items: center; */
    flex-direction: column;
    color: black;
}

.dialogfont1{
    font-size: 30px;
    font-weight: bold;
    margin-left: 20px;
}

.dialog1{
    margin-left: 20px;
    display: flex; 
    /* justify-content: center;  */
    align-items: center;
    margin-top: 10px;
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

.dialog .book1 {
  position: relative;
  border-radius: 10px;
  width: 130px;
  height: 180px;
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

.dialog .cover1 {
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

.dialog .book1:hover .cover1 {
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-transform: rotatey(-80deg);
  -ms-transform: rotatey(-80deg);
  transform: rotatey(-80deg);
}

.dialog span {
  font-size: 20px;
  font-weight: bolder;
  margin-left: 15px;
  margin-right: 10px;
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
  /* margin-left: 20px; */
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
  background-color: #17ec81;
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
    padding-bottom: 10px;
    margin-bottom: 15px;
    border-bottom: 1px white solid;
}

.thebutton{
    margin-left: 20px;
    font-size: 15px;
}

.otherbutton{
    font-size: 15px;
}
</style>