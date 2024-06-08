<!-- 问卷设计页面 -->
<template>
    <navigation-bar style="position: fixed;"/>
    <div class="back">
      
      <div class="right">
        <div class="title">{{ title }}</div>
        <van-divider  :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"></van-divider>
  
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
  
          <el-icon color="#c45656" style="position: absolute; left: 1%;" v-if="questionList[index-1].isNecessary==true"><StarFilled/>&ensp;</el-icon>
  
          <!-- TieZhu：单选题 -->
          <div v-if="questionList[index-1].type==1">
            <div style="margin-left: 0.5%">
              {{ questionList[index-1].question }}
            </div>
            <br/>
            <van-radio-group v-model=" questionList[index-1].radio" v-for="index2 in questionList[index-1].optionCnt" >
                <van-radio :name="index2" checked-color="#0283EF" :label-disabled=true >
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
            
            <van-checkbox-group v-model=" questionList[index-1].radio" v-for="index2 in questionList[index-1].optionCnt"  checked-color="#0283EF">
                <br/>
                <van-checkbox :name="index2" shape="square" :label-disabled=true>
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
            <el-input v-model="questionList[index-1].fill" size="large" placeholder="请填空"/>
            <br/>
            <br/>
          </div>
          
          <!-- TieZhu:评分题 -->
          <div v-if="questionList[index-1].type==4">
            <div style="margin-left: 0.5%">
              {{ questionList[index-1].question }}
            </div>
            <br/>
            <el-rate v-model="questionList[index-1].grade" allow-half></el-rate>
            <br/>
            <br/>
          </div>
  
        </div>
        
      </div>
  
    </div>
    
  </template>
  
  <script>
  import NavigationBar from "@/components/NavigationBar.vue"
  import { ref } from 'vue'
   
   export default({
     data(){
      return{
        input:'',
        questionnaireId: 0,
        questionCnt: 0,
        questionList: [],
        title:'问题标题',
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
            this.questionList.push({"type":1,"isNecessary":true,"question":"请选择一个选项","radio":ref(),
            "optionCnt":4,"optionList":[{"content":"选项"},{"content":"选项"},{"content":"选项"},{"content":"选项"}]});
        },
        //TieZhu:添加多选题
        addMultiple(){
            this.questionCnt++;
            this.questionList.push({"type":2,"isNecessary":true,"question":"请选择以下选项（多选）","radio":ref(),
            "optionCnt":4,"optionList":[{"content":"选项"},{"content":"选项"},{"content":"选项"},{"content":"选项"}]});
        },
        //TieZhu:添加填空题
        addFill(){
            this.questionCnt++;
            this.questionList.push({"type":3,"isNecessary":true,"question":"请填空","fill":ref('')});
        },
        //TieZhu:添加评分题
        addScore(){
            this.questionCnt++;
            this.questionList.push({"type":4,"isNecessary":true,"question":"请评分","grade":ref('')});
        },
     },
     components:{
      NavigationBar,
     },
     mounted(){
      this.addSingle();
      this.addMultiple();
      this.addFill();
      this.addScore();
     },
     components:{
      NavigationBar,
     },
     created(){
      this.questionnaireId = this.$route.query.questionnaireId;
      // 创建可以访问内部组件实例的实例
      const internalInstance = getCurrentInstance()
      const internalData = internalInstance.appContext.config.globalProperties
      this.username = internalData.$cookies.get('username') // 后面的为之前设置的cookies的名字
     }
   })
  </script>
  
  <!-- TieZhu：scoped保证样式只会应用到当前 .vue 文件 -->
  <style scoped>
  
  .right{
    position: relative;
    height: 700px;
    width: 90%;
    height: 700px;
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
    color: #409EFF;
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
  </style>