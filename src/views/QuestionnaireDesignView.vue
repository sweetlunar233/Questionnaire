<!-- 问卷设计页面 -->
<template>
  <NavigationBarInQuestionnaire style="position: fixed;"/>
  <div class="back">

    <div class="left">
      <div class="title">题型</div>
      <van-divider  :style="{ color: '#626aef', borderColor: '#626aef', padding: '0 16px' }"></van-divider>

      <!-- 单选题、多选题 -->
      <div>
        <el-button @click="addSingle()" plain>
          <el-icon style="vertical-align: middle">
            <HelpFilled />
          </el-icon>
          &ensp;单选题
        </el-button>
        
        <el-button @click="addMultiple()" plain>
          <el-icon style="vertical-align: middle">
            <Grid/>
          </el-icon>
          &ensp;多选题
        </el-button>
      </div>

      <br/>

      <!-- 评分题、填空题 -->
      <div>
        <el-button v-if="type!=3" @click="addScore()" plain>
          <el-icon style="vertical-align: middle">
            <Finished/>
          </el-icon>
          &ensp;评分题
        </el-button>

        <el-button @click="addFill()" plain>
          <el-icon style="vertical-align: middle">
            <Edit/>
          </el-icon>
          &ensp;填空题
        </el-button>
      </div>

      <!-- 保存、发布、乱序展示、人数限制、时间限制 -->
      <div style="margin-top: 220%;">
        <!-- 对于考试问卷/报名问卷，是否乱序展示/设置人数限制 -->
        <div>
          <div v-if="type==3">
            <el-switch v-model="isDisorder" size="large" style="--el-switch-on-color: #626aef;"/>&nbsp;是否乱序展示
          </div>
          <div v-if="type==3">
            限时&nbsp;<el-input-number v-model="timeLimit" size="small" :min="1" controls-position="right"/>&nbsp;min
          </div>
          <div v-if="type==2">
            <el-input-number v-model="people" size="small" :min="1" controls-position="right"/>&nbsp;报名人数
          </div>
        </div>
        <div class="row"></div>
        <div>
          <el-button plain color="#626aef" size="large" @click="saveQuestionnaire()" round><el-icon><Upload/></el-icon>&nbsp;保存</el-button>
          <el-button plain color="#626aef" size="large" round><el-icon><Position/></el-icon>&nbsp;发布</el-button>
        <!-- <el-button plain color="#626aef" size="large" round @click="conserve"><el-icon><Upload/></el-icon>&nbsp;保存</el-button>
        <el-button plain color="#626aef" size="large" round><el-icon><Position/></el-icon>&nbsp;发布</el-button> -->
        </div>
      </div>


    </div>
    
    <div class="right">
      <div class="title">
        <el-input v-if="ttIsEditing" v-model="title" @blur="finishEditing(-1,0,0)" @keyup.enter="finishEditing(-1,0,0)" clearable/>
        <span v-else @click="startEditing(-1,0,0)">{{ text }}</span>
      </div>
      <div class="row"></div>
      <div>
        <el-input v-if="desIsEditing" v-model="description" @blur="finishEditing(2,0,0)" @keyup.enter="finishEditing(2,0,0)" clearable/>
        <span v-else @click="startEditing(2,0,0)">{{ destext }}</span>
      </div>
      <van-divider  :style="{ color: '#8a2be2', borderColor: '#8a2be2', padding: '0 16px' }"></van-divider>

      <!-- @dragstart: 拖动开始时触发，记录被拖动的题目索引。
           @dragover.prevent: 阻止默认行为，使得元素可以被放置。
           @drop: 放置元素时触发，处理元素放置后的逻辑。
           @dragenter.prevent: 进入另一个可放置元素时触发，这里用来调整元素位置。 -->

      <div v-for="index in questionCnt"
      draggable=true
      @dragstart="dragStart(index-1)"
      @dragover.prevent
      @drop="drop(index-1)"
      @dragenter.prevent="dragEnter(index-1)"
      >

        <!-- TieZhu:questionList说明
        对于单选和多选：
          quetionList有如下属性：
            showToolbar：是否显示题目工具栏，初值false
            type：标识题目类型
            qsIsEditing：题干是否正在修改，初值false
            question：题干
            isNecessary：布尔类型，是否必填，初值true
            optionCnt：选项数量
            text:正在修改的题干填写内容
            isDisabled:是否可以删除选项，初值true
            max:仅针对多选，至多可以选几项
            score:此题分数
            optionList：选项数组。包含以下内容：
              isEditing：是否正在被修改，初值false
              content：选项内容
              text：正在修改的填写内容
              isCorrect:是否为正确答案
        对于填空：
          quetionList有如下属性:
            showToolbar：是否显示题目工具栏，初值false
            type：标识题目类型
            qsIsEditing：题干是否正在修改，初值false
            question：题干
            isNecessary：布尔类型，是否必填，初值true
            text:正在修改的题干填写内容
            score:此题分数
        -->

        <el-icon color="#c45656" style="position: absolute; left: 1%;font-size: 24px;" v-if="questionList[index-1].isNecessary==true"><StarFilled/>&ensp;</el-icon>

        <!-- TieZhu：单选题 -->
        <div v-if="questionList[index-1].type==1" @click="showTB(index-1)" >
          <div>
            <el-input v-if="questionList[index-1].qsIsEditing" v-model="questionList[index-1].question" @blur="finishEditing(0,index-1,0)" @keyup.enter="finishEditing(0,index-1,0)" clearable/>
            <span v-else @click="startEditing(0,index-1,-1)">{{ questionList[index-1].text }}</span>
          </div>
          
          <van-radio-group v-model="radio" v-for="index2 in questionList[index-1].optionCnt" :disabled=true>
            <div>
              <br/>
                <van-radio :name="index2" checked-color="#0283EF" :label-disabled=true>
                  <n-popover trigger="manual" :show="questionList[index-1].optionList[index2-1].isEditing" :show-arrow="false" placement="right">
                    <template #trigger>
                      <el-input 
                      v-if="questionList[index-1].optionList[index2-1].isEditing"
                      v-model="questionList[index-1].optionList[index2-1].content" 
                      @blur="finishEditing(1,index-1,index2-1)" 
                      @keyup.enter="finishEditing(1,index-1,index2-1)"
                      />
                      <span v-else @click="startEditing(1,index-1,index2-1)" >{{ questionList[index-1].optionList[index2-1].text }}</span>
                    </template>
                    <div>
                      <el-button size="small" color="#fef0f0" @click="addOption(index-1,index2-1)" text><el-icon><Plus/></el-icon></el-button>
                      <el-button size="small" color="#ecf5ff" @click="deleteOption(index-1,index2-1)" :disabled="questionList[index-1].isDisabled" text><el-icon><Minus/></el-icon></el-button>
                      &nbsp;
                      <el-switch v-model="questionList[index-1].optionList[index2-1].isCorrect" @change="checkAnswer(0,index-1,index2-1)"/>&nbsp;正确答案
                    </div>
                  </n-popover>
                </van-radio>
              <br/>
            </div>
          </van-radio-group>

          <br/>
        </div>

        <!-- TieZhu：多选题 -->
        <div v-if="questionList[index-1].type==2" @click="showTB(index-1)" >
          <div>
            <el-input v-if="questionList[index-1].qsIsEditing" v-model="questionList[index-1].question" @blur="finishEditing(0,index-1,0)" @keyup.enter="finishEditing(0,index-1,0)" clearable/>
            <span v-else @click="startEditing(0,index-1,-1)">{{ questionList[index-1].text }}</span>
          </div>
          
          <van-checkbox-group v-model="radio" v-for="index2 in questionList[index-1].optionCnt" checked-color="#0283EF" :disabled=true>
            <div>
                <br/>
                <van-checkbox :name="index2" shape="square" :label-disabled=true>
                  <n-popover trigger="manual" :show="questionList[index-1].optionList[index2-1].isEditing" :show-arrow="false" placement="right">
                    <template #trigger>
                      <el-input 
                      v-if="questionList[index-1].optionList[index2-1].isEditing"
                      v-model="questionList[index-1].optionList[index2-1].text" 
                      @blur="finishEditing(1,index-1,index2-1)" 
                      @keyup.enter="finishEditing(1,index-1,index2-1)"
                      />
                      <span v-else @click="startEditing(1,index-1,index2-1)" :class="{ 'correct-answer': questionList[index-1].optionList[index2-1].isCorrect }">{{ questionList[index-1].optionList[index2-1].text }}</span>
                    </template>
                    <el-button size="small" color="#fef0f0" @click="addOption(index-1,index2-1)" text><el-icon><Plus/></el-icon></el-button>
                    <el-button size="small" color="#ecf5ff" @click="deleteOption(index-1,index2-1)" :disabled="questionList[index-1].isDisabled" text><el-icon><Minus/></el-icon></el-button>
                    &nbsp;
                    <el-switch v-model="questionList[index-1].optionList[index2-1].isCorrect" @change="checkAnswer(1,index-1,index2-1)"/>&nbsp;正确答案
                  </n-popover>
                </van-checkbox>
                <br/>
            </div>
          </van-checkbox-group>
        </div>

        <!-- TieZhu:填空题 -->
        <div v-if="questionList[index-1].type==3">
          <el-input v-if="questionList[index-1].qsIsEditing" v-model="questionList[index-1].question" @blur="finishEditing(0,index-1,0)" @keyup.enter="finishEditing(0,index-1,0)" clearable/>
          <span v-else @click="startEditing(0,index-1,0)">{{ questionList[index-1].text }}</span>
          <br/>
          <br/>
          <el-input v-model="fill" size="large" placeholder="" disabled/>
          <br/>
          <br/>
        </div>

        <!-- TieZhu:评分题 -->
        <div v-if="questionList[index-1].type==4">
          <el-input v-if="questionList[index-1].qsIsEditing" v-model="questionList[index-1].question" @blur="finishEditing(0,index-1,0)" @keyup.enter="finishEditing(0,index-1,0)" clearable/>
          <span v-else @click="startEditing(0,index-1,0)">{{ questionList[index-1].text }}</span>
          <br/>
          <el-rate v-model="score" allow-half></el-rate>
          <br/>
          <br/>
        </div>
        <!-- TieZhu:工具栏 -->
        <div v-if="questionList[index-1].showToolbar">
          <el-divider content-position="left" border-style="dashed">
              <el-icon><MagicStick /></el-icon>
          </el-divider>

          <!-- TieZhu:如果用 delete 作为函数名会和系统函数重名 -->
          <el-button @click="deleteQs(index-1)" round>
              <el-icon><Delete/></el-icon>
              &ensp;删除
          </el-button>

          <el-button @click="copy(index-1,questionList[index-1].type)" round>
              <el-icon><DocumentAdd/></el-icon>
              &ensp;复制
          </el-button>

          <el-button @click="necessary(index-1)" round>
              <el-icon><check/></el-icon>
              &ensp;设为必填
          </el-button>

          <el-button @click="unnecessary(index-1)" round>
            <el-icon><CloseBold/></el-icon>
            &ensp;设为非必填
          </el-button>
          
          &nbsp;

          <el-select v-if="questionList[index-1].type==2" v-model="questionList[index-1].max" placeholder="至多选" style="width: 15%">
            <el-option v-for="ind in questionList[index-1].optionList.length" :key="ind" :label="ind" :value="ind"/>
          </el-select>
          
          &nbsp;
          <!-- 设置本题分数 -->
          <el-input-number v-if="type==3" v-model="questionList[index-1].score" :min="0" controls-position="right"/>

          <el-divider border-style="dashed"></el-divider>
        </div>

      </div>

    </div>

  </div>
  
</template>

<script>
import { GetQuestionnaire, PostQuestion } from "@/api/question";
import { ElMessage } from 'element-plus'
import { NPopover } from "naive-ui"
import { ref } from "vue" ;

import { getCurrentInstance } from 'vue'
import { ConserveOrReleaseQuestionnaire, GetQuestionnaireDesign } from '../api/design.js'
//编辑问卷传输问卷id的函数
import { useRouter } from 'vue-router';
import NavigationBarInQuestionnaire from "@/components/NavigationBarInQuestionnaire.vue";
const router = useRouter();
 
 export default({
   data(){
    return{
      input:'',
      username:'',
      questionnaireId:0,
      type:3,
      questionCnt: 0,
      questionList: [],
      draggedIndex:-1,
      title:'问题标题',
      text:'问卷标题',
      ttIsEditing:false,
      lastEditObj:{"type":-2,"index1":-1,"index2":-1},//上一次修改的元素，如果不是选项，那么它的index2为-1.type:-1问卷标题;0问题;1选项
      isDisorder:false,
      people:0,
      description:'',
      timeLimit:0,
      description:'问卷描述',
      desIsEditing:false,
      destext:'问卷描述',
    }
   },
   methods: {
    conserve(){
      var promise = ConserveOrReleaseQuestionnaire(
        this.username,
        this.questionnaireId,
        this.type,
        this.questionList,
        this.people,
        this.isDisorder,
        this.title,
        0
      );
      promise.then((result)=>{
        if(result.message === "True"){
          router.push("/userManage");
          ElMessage({
            message: '保存成功',
            type: 'success',
          });
        }else{
          ElMessage({
            message: '保存失败',
            type: 'error',
          });
        }
      })
    },
    release(){
      var promise = ConserveOrReleaseQuestionnaire(
        this.username,
        this.questionnaireId,
        this.type,
        this.questionList,
        this.people,
        this.isDisorder,
        this.title,
        1
      );
      promise.then((result)=>{
        if(result.message === "True"){
          router.push("/userManage");
          ElMessage({
            message: '发布成功',
            type: 'success',
          });
        }else{
          ElMessage({
            message: '发布失败',
            type: 'error',
          });
        }
      })
    },


    //TieZhu:添加单选题
    addSingle(){
      this.questionCnt++;
      this.questionList.push({"type":1,"showToolbar":false,"isNecessary":true,"qsIsEditing":false,"question":"请选择一个选项","text":"请选择一个选项",
      "optionCnt":1,"isDisabled":true,"score":0,
      "optionList":[{"showBar":false,"isEditing":false,"content":"选项","text":"选项","isCorrect":ref(false)}]});
    },
    //TieZhu:添加多选题
    addMultiple(){
      this.questionCnt++;
      this.questionList.push({"type":2,"showToolbar":false,"isNecessary":true,"qsIsEditing":false,"question":"请选择以下选项（多选）","text":"请选择以下选项（多选）",
      "optionCnt":1,"isDisabled":true,"max":1,"score":0,
      "optionList":[{"showBar":false,"isEditing":false,"content":"选项","text":"选项","isCorrect":false}]});
    },
    //TieZhu:添加填空题
    addFill(){
      this.questionCnt++;
      this.questionList.push({"type":3,"showToolbar":false,"isNecessary":true,"qsIsEditing":false,"question":"请填空","text":"请填空","score":0,"correctAnwser":false});
    },
    //TieZhu:添加评分题
    addScore(){
      this.questionCnt++;
      this.questionList.push({"type":4,"showToolbar":false,"isNecessary":true,"qsIsEditing":false,"question":"请评分","text":"请评分","score":0,"correctAnwser":false});
    },

    //TieZhu:工具栏功能
    necessary(index){
      this.questionList[index].isNecessary=true;
    },
    unnecessary(index){
      this.questionList[index].isNecessary=false;
    },
    deleteQs(index){
      this.questionList.splice(index,1);
      this.questionCnt--;
    },
    copy(index){
      //使用parse进行深拷贝
      const item = JSON.parse(JSON.stringify(this.questionList[index]));
      this.questionList.splice(index+1,0,item);
      this.questionCnt++;
    },

    //拖动改变顺序
    dragStart(index){
      this.draggedIndex = index;
    },
    dragEnter(index){
      if(index != this.draggedIndex){
        const itemToMove = this.questionList[this.draggedIndex];
        this.questionList.splice(this.draggedIndex,1)
        this.questionList.splice(index,0,itemToMove);
        this.draggedIndex = index;
      }
    },
    drop(index){
      this.draggedIndex = -1;
    },

    //选择题
    addOption(index,index2){
      this.questionList[index].optionCnt++;
      this.questionList[index].optionList.splice(index2,0,{"showBar":false,"isEditing":false,"content":"选项","text":"选项","isCorrect":false});
      if(this.questionList[index].optionCnt==2){
          this.questionList[index].isDisabled = false;
      }
    },
    deleteOption(index,index2){
      this.questionList[index].optionCnt--;
      this.questionList[index].optionList.splice(index2,1);
      if(this.questionList[index].optionCnt==1){
        this.questionList[index].isDisabled = true;
      }
    },
      //EditText
    startEditing(type,index,index2) {
      if(this.lastEditObj.type!=-2 && (index != this.lastEditObj.index1 || index2 != this.lastEditObj.index2)){
        this.finishEditing(this.lastEditObj.type,this.lastEditObj.index1,this.lastEditObj.index2);
      }
      this.lastEditObj = {"type":type,"index1":index,"index2":index2};
      if(type == 0){ //题目标题
        this.questionList[index].qsIsEditing = true;
      }
      else if(type == 1){ //选项标题
        this.questionList[index].optionList[index2].isEditing = true;
      }
      else if(type == -1){ //问卷标题
        this.ttIsEditing = true;
      }
      else if(type == 2){ //问卷描述
        this.desIsEditing = true;
      }
    },
    finishEditing(type,index,index2) {
      this.lastEditObj={"type":-2,"index1":-1,"index2":-1};
      if(type == 0){
        this.questionList[index].qsIsEditing = false;
        if(this.questionList[index].question.length == 0){
          this.questionList[index].question = this.questionList[index].text;
          this.warning("长度不能为空");
        }
        else{
          this.questionList[index].text = this.questionList[index].question;
        }
      }
      else if(type == 1){
        this.questionList[index].optionList[index2].isEditing = false;
        if(this.questionList[index].optionList[index2].content.length == 0){
          this.questionList[index].optionList[index2].content = this.questionList[index].optionList[index2].text;
          this.warning("长度不能为空");
        }
        else{
          this.questionList[index].optionList[index2].text = this.questionList[index].optionList[index2].content;
        }
      }
      else if(type == -1){
        this.ttIsEditing = false;
        if(this.title.length == 0){
          this.title = this.text;
          this.warning("长度不能为空");
        }
        else{
          this.text = this.title;
        }
      }
      else if(type == 2){
        this.desIsEditing = false;
        if(this.description.length == 0){
          this.description = this.destext;
          this.warning("长度不能为空");
        }
        else{
          this.destext = this.description;
        }
      }
    },
    warning(content){
      ElMessage({
        message:content,
        type:'warning',
      });
    },
    success(content){
      ElMessage({
        message:content,
        type:'success',
      });
    },
    //出现工具栏，注意，不仅要出现当前问题的工具栏，还要关闭其他问题的工具栏和退出其他问题的编辑状态
    showTB(index){
      this.questionList.forEach(ele => {
        if(ele.showToolbar){
          ele.showToolbar = false;
        }
      });
      this.questionList[index].showToolbar = true;
      if(this.lastEditObj.type!=-1 && index != this.lastEditObj.index1){
        this.finishEditing(this.lastEditObj.type,this.lastEditObj.index1,this.lastEditObj.index2);
      }
    },

    //检查单选题是否只有一个正确选项，多选题是否存在太多正确选项.第一个参数0：单选题；否则多选题
    checkAnswer(type,index,index2){
      let i = 0;
      if(type == 0 && this.questionList[index].optionList[index2].isCorrect){
        for(i=0;i<this.questionList[index].optionCnt;i++){
          if(i != index2){
            this.questionList[index].optionList[i].isCorrect = false;
          }
        }
      }
      else if(type == 1 && this.questionList[index].optionList[index2].isCorrect){
        let cnt = 0;
        for(i=0;i<this.questionList[index].optionCnt;i++){
          if(this.questionList[index].optionList[i].isCorrect){
            cnt++;
          }
        }
        console.log(this.questionList[index].max);
        console.log(cnt);
        if(cnt > this.questionList[index].max){
          this.questionList[index].optionList[index2].isCorrect = false;
          this.warning("正确答案太多")
        }
      }
    },

    //保存问卷
    saveQuestionnaire(){
      console.log(this.username);
      var promise = PostQuestion(this.questionnaireId,this.title,this.type,!this.isDisorder,this.people,this.timeLimit,this.questionList,this.description ,this.username,false);
      this.$router.push({path:'/userManage/filled'});
      this.success("保存成功");
    },
    //发布问卷
    releaseQuestionnaire(){
      console.log(this.username);
      var promise = PostQuestion(this.questionnaireId,this.title,this.type,!this.isDisorder,this.people,this.timeLimit,this.questionList,this.description ,this.username,true);
      this.$router.push({path:'/userManage/filled'});
      this.success("发布成功");
    }
   },
   components:{
    NavigationBarInQuestionnaire,
    NPopover,
   },
   mounted(){
    const internalInstance = getCurrentInstance()
    const internalData = internalInstance.appContext.config.globalProperties
    this.username = internalData.$cookies.get('username') // 后面的为之前设置的cookies的名字
    
    this.questionnaireId = parseInt(this.$route.query.questionnaireId);
    this.type = this.$route.query.questionnaireType;
    if(this.questionnaireId != -1){
      var promise=GetQuestionnaire(this.questionnaireId,"/quetionnaireDesign",true);
      
      promise.then((result) => {
        this.title = result.Title;
        this.text = this.title;
        this.type = result.category;
        this.people = result.people;
        this.timeLimit = result.TimeLimit;
        this.questionList = result.questionList;
        this.description = result.description;
        this.destext = this.description;
        
        let i = 0,j = 0;
        for(i = 0;i < this.questionList.length;i++){
          this.questionList[i].showToolbar = ref(false);
          this.questionList[i].qsIsEditing = ref(false);
          this.questionList[i].isDisabled = ref(true);
          this.questionList[i].max = ref(1);
          this.questionList[i].text = ref(this.questionList[i].question);
          if(this.questionList[i].type <= 2){
            console.log(this.questionList[i]);
            for(j = 0;j < this.questionList[i].optionCnt;j++){
            this.questionList[i].optionList[j].text = ref(this.questionList[i].optionList[j].content);
            this.questionList[i].optionList[j].isEditing = ref(false);
            }
          }
        }
      })
    }
    // 创建可以访问内部组件实例的实例
   }
 })
</script>

<!-- TieZhu：scoped保证样式只会应用到当前 .vue 文件 -->
<style scoped>

.left{
  position: fixed;
  top: 5%;
  margin: 2%;
  margin-left: 15%;
  border-radius: 5px;
  border: 2px;
  padding: 1%;
  width: 12%;
  height: 700px;
  box-shadow: 6px 6px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.right{
  position: relative;
  height: 700px;
  width: 50%;
  height: 700px;
  top: 8%;
  left: 30%;
  border-radius: 5px;
  border: 2px;
  padding: 20px;
  box-shadow: 6px 6px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  overflow-y: auto;
}

.title{
  text-align: center;
  font-size: larger;
  color: #626aef;
  font-weight: bold;
}

.back{
  position: relative;
  height: 100vh;
  background-image: url('../assets/bg.png'); /* 设置背景图片 */
  background-size: cover; /* 确保背景图片完全覆盖容器，可能会被裁切 */
  background-position: center; 
  background-repeat: repeat-y; /* 背景图片不重复 */
  background-attachment: fixed; 
  
}

.row{
  padding-bottom: 10px;
}
.correct-answer{
  color:green
}
</style>