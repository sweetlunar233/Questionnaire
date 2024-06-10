<!-- 问卷设计页面 -->
<template>
    <navigation-bar style="position: fixed;"/>
    <div class="back">
      
      <div class="right">
        <div class="title">{{ title }}</div>
        <van-divider  :style="{ color: '#626aef', borderColor: '#626aef', padding: '0 16px' }"></van-divider>
  
        <div v-for="index in questionCnt">
  
          <!-- TieZhu:
          对于单选和多选：
            quetionList有如下属性。
              type：标识题目类型
              question：题干
              isNecessary：布尔类型，是否必填，初值true
              optionCnt：选项数量
              radio:所选择的选项
              optionList：选项数组。包含以下内容：
                content：选项内容
          对于填空/评分：
            quetionList有如下属性:
              type：标识题目类型
              question：题干
              isNecessary：布尔类型，是否必填，初值true
              fill:所填内容（仅对填空题有效）
              grade:所评分数（仅对评分题有效）
          -->
  
          <el-icon color="#c45656" style="position: absolute; left: 1%;" v-if="questionListFill[index-1].isNecessary==true"><StarFilled/>&ensp;</el-icon>
  
          <!-- TieZhu：单选题 -->
          <div v-if="questionListFill[index-1].type==1">
            <div style="margin-left: 0.5%">
              {{ questionListFill[index-1].question }}
            </div>
            <br/>
            <van-radio-group  v-for="index2 in questionListFill[index-1].optionCnt" >
                <van-radio :name="questionListFill[index-1].optionList[index2-1].optionId" disabled=true>
                    <span :style="getTextColor(index-1, index2-1)">
                      {{ questionListFill[index-1].optionList[index2-1].content }}
                    </span>
                </van-radio>
                <br/>
            </van-radio-group>
  
            <br/>
          </div>


          <!-- TieZhu：多选题 -->
          <div v-if="questionListFill[index-1].type==2">
            <div style="margin-left: 0.5%">
                {{ questionListFill[index-1].question }}
            </div>
            
            <van-checkbox-group v-for="index2 in questionListFill[index-1].optionCnt">
                <br/>
                <van-checkbox :name="questionListFill[index-1].optionList[index2-1].optionId" shape="square" disabled=true>
                    <span :style="getTextColor(index-1, index2-1)">
                      {{ questionListFill[index-1].optionList[index2-1].content }}
                    </span>
                </van-checkbox>
                <br/>
            </van-checkbox-group>
  
            <br/>
          </div>
  
          <!-- TieZhu:填空题 -->
          <div v-if="questionListFill[index-1].type == 3">
            <div style="margin-left: 0.5%">
              {{ questionListFill[index-1].question }}
            </div>
            <br/>
            <div>
              <div style="color:blue;">{{ questionListFill[index-1].Answer }}</div>
            </div>
            <br/>
            <br/>
          </div>
  
          <!-- TieZhu:评分题 -->
          <div v-if="questionListFill[index-1].type==4">
            <div style="margin-left: 0.5%">
              {{ questionListFill[index-1].question }}
            </div>
            <br/>
            <el-rate v-model="questionListFill[index-1].Answer" disabled=true></el-rate>
            <br/>
            <br/>
          </div>
  
        </div>
      </div>

      <!-- <div class="bottom">
        <el-button color="#626aef" @click="postFill(1)" size="large"><el-icon><Upload/></el-icon>&nbsp;提交</el-button>
        <el-button color="#626aef" @click="postFill(0)" size="large"><el-icon><House/></el-icon>&nbsp;暂存</el-button>
      </div> -->
  
    </div>
    
  </template>
  
<script>
  import { GetStoreFill, PostFill } from "@/api/question";
  import NavigationBar from "@/components/NavigationBarInQuestionnaire.vue"
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { GetFillInNormalAnswer, getFill } from "@/api/answer.js"
  import { getCurrentInstance } from "vue";

  
  export default({
    data(){
      return{
        input:'',
        username:'',
        questionnaireId:0,
        type:0,
        questionCnt: 0,
        questionListFill: [],
        title:'',
        description:'',
        isDisorder:false,
        people:0, //剩余人数
        timeLimit:0,
        time:0, //存储在此页面停留的时间
        intervalId:null, //存储定时器的ID
        question:[],
      }
    },
    methods: {
      print(x){
        console.log(x);
      },

      // 我是否选了
      isSelected(index, index2) {
        //单选
        if(this.questionListFill[index].type == 1) {
          if(this.questionListFill[index].Answer == index2)
            return true;
          else return false;
        }
        //多选
        if(this.questionListFill[index].type == 2) {
          if(this.questionListFill[index].Answer.includes(index2))
            return true;
          else return false;
        }

      },
      getTextColor(index, index2) {
        //判断是否做了，如果没做，Answer is -1
        if(this.questionListFill[index].type == 1) {
          if(this.questionListFill[index].Answer == -1)
            return {color: 'black'};
        }
        if(this.questionListFill[index].type == 2) {
          if(this.questionListFill[index].Answer[0] == -1)
            return {color: 'black'};
        }

        if(this.isSelected(index, index2)) {
          return {color: 'blue'};
        }
        else return {color: 'black'};
      },

      //增加选项
      addOption(index,ele){
        this.questionList[index].optionCnt++;
        this.questionList[index].optionList.push({"content":ele});
      },
      //TieZhu:添加单选题
      addSingle(){
        this.questionCnt++;
        this.questionListFill.push({"type":1,"isNecessary":true,"question":"请选择一个选项",
        "optionCnt":4,"optionList":[{"optionId":0,"content":"选项", "isCorrect":true},{"optionId":1,"content":"选项","isCorrect":false},{"optionId":2,"content":"选项","isCorrect":false},{"optionId":3,"content":"选项","isCorrect":false}],
        "Answer":1});
      },
      //TieZhu:添加多选题
      addMultiple(){
        this.questionCnt++;
        this.questionListFill.push({"type":2,"isNecessary":true,"question":"请选择以下选项（多选）",
        "optionCnt":4,"optionList":[{"optionId":0,"content":"选项","isCorrect":true},{"optionId":0,"content":"选项","isCorrect":true},{"optionId":0,"content":"选项","isCorrect":false},{"optionId":0,"content":"选项","isCorrect":false}],
        "Answer":[1,2]});
      },
      //TieZhu:添加填空题
      addFill(){
        this.questionCnt++;
        this.questionListFill.push({"type":3,"isNecessary":true,"question":"请填空","fill":ref(''), "Answer":"我的答案", "correctAnswer":"正确答案"});
      },
      //TieZhu:添加评分题
      addScore(){
        this.questionCnt++;
        this.questionListFill.push({"type":4,"isNecessary":true,"question":"请评分","Answer":ref(4)});
      },

      getFill(){
        var promise = GetFillInNormalAnswer(this.username, this.questionnaireId, this.submissionId);
        promise.then((result)=>{
          this.questionListFill = result.questionList;
          this.title = result.title;
          this.description = result.description;
          this.questionCnt = this.questionListFill.length;
        })
        
      },
      warning(content){
        ElMessage({
          message:content,
          type:'warning',
        });
      },
    },
    components:{
    NavigationBar,
    },
    mounted(){
      // this.addSingle();
      // this.addMultiple();
      // this.addFill();
      // this.addScore();
      // this.intervalId = setInterval(() => {
      //   this.time++;
      // },1000);
    },
    beforeUnmount(){
    if(this.intervalId){
      clearInterval(this.intervalId);
    }
    },
    components:{
    NavigationBar,
    ElMessage,
    },
    created(){
    this.questionnaireId = this.$route.query.questionnaireID;
    this.submissionId = this.$route.query.submissionID;
    
    const internalInstance = getCurrentInstance();
    const internalData = internalInstance.appContext.config.globalProperties;
    this.username = internalData.$cookies.get('username'); // 后面的为之前设置的cookies的名字
    this.getFill();
  }
  })
</script>
  
  <!-- TieZhu：scoped保证样式只会应用到当前 .vue 文件 -->
<style scoped>
  
  .right{
    position: relative;
    height: 83%;
    width: 90%;
    top: 8%;
    left: 4%;
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

  .bottom{
    text-align: center;
    position: relative;
    width: 15%;
    background-color: white;
    left: 42%;
    right: 50%;
    border-radius: 5px;
    border: 2px;
    padding: 10px;
    box-shadow: 6px 6px 8px rgba(0, 0, 0, 0.1);
    top: 10%;
  }
</style>