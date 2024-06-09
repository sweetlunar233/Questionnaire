<!-- 问卷设计页面 -->
<template>
    <button v-if="flag==2" v-print="printObj" ref="printButton">打印</button>
    <navigation-bar style="position: fixed;"/>
    <div class="back">
      
      <div class="right" id="print">
        <div class="title">{{ title }}</div>
        <div>{{ description }}</div>
        <van-divider  :style="{ color: '#626aef', borderColor: '#626aef', padding: '0 16px' }"></van-divider>
        <div v-if="type==3" id="time" class="time">
          剩余时间
        </div>
        <div v-if="type==2" class="time">
          剩余人数:{{ people }}
        </div>
        <van-divider v-if="type==2 || type==3"  :style="{ color: '#626aef', borderColor: '#626aef', padding: '0 15px' }"></van-divider>
        <div v-for="index in questionCnt">
  
          <!-- TieZhu:
          对于单选和多选：
            quetionList有如下属性。
              type：标识题目类型
              question：题干
              isNecessary：布尔类型，是否必填，初值true
              optionCnt：选项数量
              Answer:所选择的选项
              optionList：选项数组。包含以下内容：
                content：选项内容
          对于填空/评分：
            quetionList有如下属性:
              type：标识题目类型
              question：题干
              isNecessary：布尔类型，是否必填，初值true
              Answer:所填内容（仅对填空题有效）
              Answer:所评分数（仅对评分题有效）
          -->
  
          <el-icon color="#c45656" style="position: absolute; left: 1%;" v-if="questionList[index-1].isNecessary==true"><StarFilled/>&ensp;</el-icon>
  
          <!-- TieZhu：单选题 -->
          <div v-if="questionList[index-1].type==1">
            <div style="margin-left: 0.5%">
              {{ questionList[index-1].question }}
            </div>
            <br/>
            <van-radio-group v-model=" questionList[index-1].Answer" v-for="index2 in questionList[index-1].optionCnt" :disabled="flag">
                <van-radio :name="questionList[index-1].optionList[index2-1].optionId" checked-color="#0283EF" :label-disabled=true @click="print(questionList[index-1].radio)">
                    <div>
                    {{ questionList[index-1].optionList[index2-1].content }}
                    </div>
                </van-radio>
                <br/>
            </van-radio-group>
  
            <br/>
          </div>
  
          <!-- TieZhu：多选题 -->
          <div v-if="questionList[index-1].type==2">
            <div style="margin-left: 0.5%">
                {{ questionList[index-1].question }}
            </div>
            
            <van-checkbox-group v-model=" questionList[index-1].Answer" v-for="index2 in questionList[index-1].optionCnt"  checked-color="#0283EF" :disabled="flag">
                <br/>
                <van-checkbox :name="questionList[index-1].optionList[index2-1].optionId" shape="square" :label-disabled=true>
                    <div>
                      {{ questionList[index-1].optionList[index2-1].content }}
                    </div>
                </van-checkbox>
                <br/>
            </van-checkbox-group>
  
            <br/>
          </div>
  
          <!-- TieZhu:填空题 -->
          <div v-if="questionList[index-1].type==3">
            <div style="margin-left: 0.5%">
              {{ questionList[index-1].question }}
            </div>
            <br/>
            <br/>
            <el-input v-model="questionList[index-1].Answer" size="large" placeholder="请填空" :disabled="flag"/>
            <br/>
            <br/>
          </div>
          
          <!-- TieZhu:评分题 -->
          <div v-if="questionList[index-1].type==4">
            <div style="margin-left: 0.5%">
              {{ questionList[index-1].question }}
            </div>
            <br/>
            <el-rate v-model="questionList[index-1].Answer" :disabled="flag"></el-rate>
            <br/>
            <br/>
          </div>
  
        </div>
        
      </div>

      <div v-if="flag!=1" class="bottom">
        <el-button color="#626aef" @click="postFill(1)" size="large"><el-icon><Upload/></el-icon>&nbsp;提交</el-button>
        <el-button color="#626aef" @click="postFill(0)" size="large"><el-icon><House/></el-icon>&nbsp;暂存</el-button>
      </div>
  
    </div>
    
  </template>
  
  <script>
  import { GetStoreFill, PostFill } from "@/api/question";
  import NavigationBar from "@/components/NavigationBarInQuestionnaire.vue"
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import {getCurrentInstance} from 'vue'

   export default({
     data(){
      return{
        input:'',
        username:'',
        questionnaireId:0,
        type:3,
        questionCnt: 0,
        questionList: [],
        title:'问题标题',
        isDisorder:false,
        people:0, //剩余人数
        timeLimit:5,
        time:0, //存储在此页面停留的时间
        intervalId:null, //存储定时器的ID
        description:'',
        submissionId:0,
        duration:60,//以秒为单位
        description:'问卷描述',
        submisstionId:0,
        flag:0,//1是预览问卷,2是导出问卷
        printObj:{
          id:'print',
          popTitle:"纸翼传问",
          preview:false,
          beforeOpenCallback:()=>{
            console.log("开始打印前callback");
          }
        }
      }
     },
     methods: {
        print(x){
          console.log(x);
        },

        //增加选项
        addOption(index,ele){
            this.questionList[index].optionCnt++;
            this.questionList[index].optionList.push({"content":ele});
        },
        //TieZhu:添加单选题
        addSingle(){
            this.questionCnt++;
            this.questionList.push({"type":1,"isNecessary":true,"question":"请选择一个选项","Answer":ref(-1),
            "optionCnt":1,"optionList":[{"optionId":0,"content":"选项"}]});
        },
        //TieZhu:添加多选题
        addMultiple(){
            this.questionCnt++;
            this.questionList.push({"type":2,"isNecessary":true,"question":"请选择以下选项（多选）","max":1, "Answer":ref([-1]),
            "optionCnt":1,"optionList":[{"optionId":0,"content":"选项"}]});
        },
        //TieZhu:添加填空题
        addFill(){
            this.questionCnt++;
            this.questionList.push({"type":3,"isNecessary":true,"question":"请填空","Answer":ref('')});
        },
        //TieZhu:添加评分题
        addScore(){
            this.questionCnt++;
            this.questionList.push({"type":4,"isNecessary":true,"question":"请评分","Answer":ref(-1)});
        },
        //暂存/提交,如果status是0，那么是暂存，如果status是1.那么根据问卷类型判断是已批改还是已提交
        postFill(status){
          if(this.time <= this.timeLimit && !this.canSubmit()){
            return;
          }
          var promise;
          if(status == 0){
            promise = PostFill(this.questionnaireId,'Unsubmitted',this.question,this.submissionId,this.username);
          }
          else if(status == 1 && this.type == 3){
            promise = PostFill(this.questionnaireId,'Graded',this.question,this.submissionId,this.username);
            let sum = 0,i = 0;
            for(i=0;i<this.questionList.length;i++){
              if(this.questionList[i].type == 3 && this.questionList[i].fill == this.questionList[i].correctAnswer){
                sum += this.questionList[i].score;
              }
              else if(this.questionList[i].type == 1 && this.questionList[i].optionList[this.questionList[i].Answer].isCorrect){
                sum += this.questionList[i].score;
              }
              else if(this.questionList[i].type == 2){
                let j = 0;
                sum += this.questionList[i].score;
                for(j=0;j<this.questionList[i].optionList.length;j++){
                  if(this.questionList[i].correctAnswer[j] != this.questionList[i].fill[j]){
                    sum -= this.questionList[i].score;
                    break;
                  }
                }
              }
            }
            this.$router.push({path:'/testAnswer',query:{questionnaireID:this.questionnaireId,submissionID:this.submissionId,score:sum}}); 
          }
          else if(status == 1 && this.type == 1){
            this.success("投票成功");
            promise = PostFill(this.questionnaireId,'Submitted',this.question,this.submissionId,this.username);
            this.$router.push({path:'/dataPre',query:{questionnaireID:this.questionnaireId,flag:true}});
          }
          else{
            promise = PostFill(this.questionnaireId,'Submitted',this.question,this.submissionId,this.username);
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
            type:'succes',
          });
        },
        //检测是否能够提交，如果没有把必填的填写完，则不能提交
        canSubmit(){
          let i = 0;
          for(i = 0;i < this.questionList.length;i++){
            if(this.questionList[i].type == 1 && this.questionList[i].isNecessary && this.questionList[i].Answer==-1){
              this.warning("有必填题目没有填写！")
              return false;
            }
            else if(this.questionList[i].type == 2 && this.questionList[i].isNecessary && this.questionList[i].Answer==[-1]){
              this.warning("有必填题目没有填写！")
              return false;
            }
            else if(this.questionList[i].type == 3 && this.questionList[i].isNecessary && this.questionList[i].Answer==''){
              this.warning("有必填题目没有填写！")
              return false;
            }
            else if(this.questionList[i].type == 4 && this.questionList[i].isNecessary && this.questionList[i].Answer==-1){
              this.warning("有必填题目没有填写！")
              return false;
            }
          }
          return true;
        },
     },
     components:{
      NavigationBar,
      ElMessage,
     },
     mounted(){
      this.addSingle();
      this.addMultiple();
      this.addFill();
      this.addScore();
      if(this.type == 3){
        let totalSeconds = this.timeLimit * 60 - this.duration;
        const timeDisplay = document.getElementById('time');
        this.intervalId = setInterval(() => {
          totalSeconds--;
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
          timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

          if (totalSeconds <= 0) {
            this.warning("考试时间到！试卷回收");
            clearInterval(this.intervalId);
            this.postFill(1);
          }
        },1000);
        }
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
      var promise;
      this.questionnaireId = parseInt(this.$route.query.questionnaireId);
      this.type = this.$route.query.questionnaireType;
      this.submissionID = parseInt(this.$route.query.submissionId);
      this.flag = this.$route.query.flag;
      if(this.flag == 2){
        this.$nextTick(()=>{
          this.$refs.printButton.click();   //强行触发打印
          this.$router.push({path:'/userManage/filled'});
          return;
        })
      }
      if(this.$cookies.isKey('username')){
        const internalInstance = getCurrentInstance()
        const internalData = internalInstance.appContext.config.globalProperties
        this.username = internalData.$cookies.get('username') // 后面的为之前设置的cookies的名字
        console.log(this.submissionID)
        promise = GetStoreFill(this.username,this.questionnaireId,this.submissionID);
        promise.then((result) => {
          this.title = result.Titile;
          this.type = result.category;
          this.people = result.people;
          this.timeLimit = result.TimeLimit;
          this.questionList = result.questionList;
          this.duration = result.duration;
          this.description = result.description;
        })
      }
      else{
        this.warning("请先登录！");
        this.$router.push({path:'/login',query:{questionnaireId:this.questionnaireId}});
      }
     }
   })
  </script>
  
  <!-- TieZhu：scoped保证样式只会应用到当前 .vue 文件 -->
  <style scoped>
  
  .right{
    position: relative;
    height: 75%;
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

  .time{
    text-align: center;
    font-size:medium;
    color: #626aef;
    font-weight: bold;
  }
  </style>