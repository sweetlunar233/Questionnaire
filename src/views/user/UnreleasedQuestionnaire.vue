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
    {
        "SurveyID": 5,
        "Title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "PublishDate": "2023-09-03 11:55:30"
    },
    {
        "SurveyID": 5,
        "Title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "PublishDate": "2023-09-03 11:55:30"
    },
    {
        "SurveyID": 5,
        "Title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "PublishDate": "2023-09-03 11:55:30"
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
    initDraft(username.value);
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num;
    initDraft(username.value);
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





import { getCurrentInstance } from 'vue'

const username = ref("")
 
// 创建可以访问内部组件实例的实例
const internalInstance = getCurrentInstance()
const internalData = internalInstance.appContext.config.globalProperties
username.value = internalData.$cookies.get('username') // 后面的为之前设置的cookies的名字










import {GetUnreleasedQs, DeleteUnreleasedQs} from '../../api/questionnaire.js'

const initDraft = (username) =>{
    var promise = GetUnreleasedQs(username);
    promise.then((result)=>{
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
                    if(categoryName != "" && element.Category != categoryId.value){
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
        total.value = count;
    })
}
initDraft(username.value);

import {ElMessageBox, ElMessage} from 'element-plus'
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
            var promise = DeleteUnreleasedQs(id);
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
                initDraft(username.value);
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
            <span style="font-size: 30px;">草稿箱</span>
            <div class="extra">
                <el-button type="primary" @click="showCreateDialog" style="background-color: #171aec;border: 0;">创建问卷</el-button>
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
                <el-button type="primary" class="searchbutton" @click="initDraft(username)" style="background-color: #171aec;border: 0;">搜索</el-button>
                <el-button @click="categoryId=''" style="color: grey;">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="card-container">
            <!-- <el-card v-for="(questionnaire, index) in questionnaires" :key="index" class="article-card" style="margin-bottom: 20px;">
                <div>
                    <div class="card-header">
                        <span style="margin-left: 5px">{{questionnaire.Title}}</span>
                        <span style="float: right" class="right">创建日期: {{questionnaire.PublishDate}}</span>
                        <span style="float: right" class="right">ID: {{questionnaire.SurveyID}}</span>
                    </div>
                    <div class="card-footer">
                        <el-button type="text" :icon="Edit" @click="goToQuestionnaireDesign(questionnaire.SurveyID)">编辑问卷</el-button>
                        <el-button type="text" :icon="Link">发送问卷</el-button>
                        <el-button type="danger" :icon="Delete" style="float: right" circle @click="deleteQs(questionnaire.SurveyID)"></el-button>
                    </div>
                </div>
            </el-card> -->
            <div class="card" v-for="(questionnaire, index) in questionnaires" :key="index">
                <div class="bg">
                    <div>
                        <!-- 上部分 -->
                        <div class="card-header">
                            <span class="textbutton">{{ questionnaire.Title }}</span>
                            <span style="float: right" class="right">创建日期: {{ questionnaire.PublishDate }}</span>
                            <span style="float: right" class="right">ID: {{questionnaire.SurveyID}}</span>
                        </div>

                        <!-- 下部分 -->
                        <div class="card-footer">
                            <el-button type="text" :icon="Edit" @click="goToQuestionnaireDesign(questionnaire.SurveyID, -1)" class="thebutton">编辑问卷</el-button>
                            <el-button type="text" :icon="Link" class="otherbutton">发送问卷</el-button>
                            <el-button type="danger" :icon="Delete" style="float: right" circle @click="deleteQs(questionnaire.SurveyID)" class="deletebutton"></el-button>
                        </div>
                    </div>
                </div>
                <div class="blob"></div>
            </div>
            <el-dialog title="选择问卷类型" v-model="createDialogVisible" @update:visible="val => createDialogVisible = val">
                <!-- 在这里放置选择问卷类型的表单或组件 -->
                <!-- 例如： -->
                <el-form>
                    <el-form-item label="问卷类型">
                    <el-select v-model="selectedType" placeholder="请选择">
                        <el-option label="普通问卷" value=0></el-option>
                        <el-option label="投票问卷" value=1></el-option>
                        <el-option label="报名问卷" value=2></el-option>
                        <el-option label="考试问卷" value=3></el-option>
                        <!-- 其他类型选项 -->
                    </el-select>
                    </el-form-item>
                    <!-- 其他表单项 -->
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="handleCloseDialog">取消</el-button>
                    <el-button type="primary" @click="handleCreate">确定</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 分页条 -->
        <el-pagination :page-sizes="[3, 5, 10]"
        layout="sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
        @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end;" />
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
  background-color: #171aec;
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

.searchform .searchbutton{
    margin-right: 5px;
}

.textbutton{
    margin-left: 20px;
    font-size: 20px;
}

.deletebutton{
    margin-right: 20px;
}

.header{
    margin-bottom: 20px;
}

.thebutton{
    margin-left: 20px;
    font-size: 15px;
}

.otherbutton{
    font-size: 15px;
}

</style>