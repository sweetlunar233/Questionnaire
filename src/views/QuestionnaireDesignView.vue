<!-- 问卷设计页面 -->
<template>
  <navigation-bar style="position: fixed;"/>
  <div class="back">

    <div class="left">
      <div class="title">题型</div>
      <van-divider  :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"></van-divider>

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

      <div>
        <el-button @click="addScore()" plain>
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
    </div>

    <!-- TieZhu:问卷预览 -->
    <div class="right">
      <editable-text initial-text="问卷标题" class="title"></editable-text>
      <van-divider  :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"></van-divider>

      <!-- @dragstart: 拖动开始时触发，记录被拖动的题目索引。
           @dragover.prevent: 阻止默认行为，使得元素可以被放置。
           @drop: 放置元素时触发，处理元素放置后的逻辑。
           @dragenter.prevent: 进入另一个可放置元素时触发，这里用来调整元素位置。 -->

      <div v-for="index in questionCnt" 
      @mouseover="questionList[index-1].showToolbar = true" 
      @mouseleave="questionList[index-1].showToolbar = false"
      draggable="true"
      @dragstart="dragStart(index-1)"
      @dragover.prevent
      @drop="drop(index-1)"
      @dragenter.prevent="dragEnter(index-1)"
      >

        <!-- TieZhu:“是否必填”功能 -->
        <el-icon color="#c45656" style="position: absolute; left: 1%;" v-if="questionList[index-1].isNecessary==true"><StarFilled/>&ensp;</el-icon>

        <single-choice v-if="questionList[index-1].type==1"></single-choice>
        <multiple-choice v-if="questionList[index-1].type==2"></multiple-choice>
        <fill-blank v-if="questionList[index-1].type==3"></fill-blank>
        <score v-if="questionList[index-1].type==4"></score>

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
          <el-divider border-style="dashed"></el-divider>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import EditableText from '../components/EditText.vue'
import SingleChoice from '../components/Question/SingleChoice.vue'
import MultipleChoice from '../components/Question/MultipleChoice.vue'
import FillBlank from '../components/Question/FillBlank.vue'
import Score from '../components/Question/Score.vue'
import NavigationBar from "@/components/NavigationBar.vue";
 
 export default({
   data(){
    return{
      input:'',
      questionCnt: 0,
      questionList: [],
      draggedIndex:-1,
    }
   },
   methods: {
    //TieZhu:添加单选题
    addSingle(){
      this.questionCnt++;
      this.questionList.push({"type":1,"showToolbar":false,"isNecessary":true});
    },
    //TieZhu:添加多选题
    addMultiple(){
      this.questionCnt++;
      this.questionList.push({"type":2,"showToolbar":false,"isNecessary":true});
    },
    //TieZhu:添加填空题
    addFill(){
      this.questionCnt++;
      this.questionList.push({"type":3,"showToolbar":false,"isNecessary":true});
    },
    //TieZhu:添加评分题
    addScore(){
      this.questionCnt++;
      this.questionList.push({"type":4,"showToolbar":false,"isNecessary":true});
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
    copy(index,type){
      this.questionList.splice(index+1,0,{"type":type,"showToolbar":false,"isNecessary":this.questionList[index].isNecessary});
      this.questionCnt++;
    },
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
    }
   },
   components:{
    EditableText,
    SingleChoice,
    MultipleChoice,
    FillBlank,
    Score,
    NavigationBar,
   }
 })
</script>

<!-- TieZhu：scoped保证样式只会应用到当前 .vue 文件 -->
<style scoped>

.left{
  position: fixed;
  top: 5%;
  margin: 2%;
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
  width: 73%;
  height: 700px;
  top: 8%;
  left: 20%;
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
  background-position: center; /* 图片居中显示 */
  background-repeat: no-repeat; /* 背景图片不重复 */
  background-attachment: fixed; /* 背景固定，内容滚动 */
}



</style>