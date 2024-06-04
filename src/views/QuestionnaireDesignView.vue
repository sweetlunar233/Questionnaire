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
    
    <div class="right">
      <div class="title">
        <el-input v-if="ttIsEditing" v-model="title" @blur="finishEditing(-1,0,0)" @keyup.enter="finishEditing(-1,0,0)" clearable/>
        <span v-else @click="startEditing(-1,0,0)">{{ text }}</span>
      </div>
      <van-divider  :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"></van-divider>

      <!-- @dragstart: 拖动开始时触发，记录被拖动的题目索引。
           @dragover.prevent: 阻止默认行为，使得元素可以被放置。
           @drop: 放置元素时触发，处理元素放置后的逻辑。
           @dragenter.prevent: 进入另一个可放置元素时触发，这里用来调整元素位置。 -->

      <div v-for="index in questionCnt"
      @mouseover="questionList[index-1].showToolbar = true" 
      @mouseleave="questionList[index-1].showToolbar = false"
      draggable=true
      @dragstart="dragStart(index-1)"
      @dragover.prevent
      @drop="drop(index-1)"
      @dragenter.prevent="dragEnter(index-1)"
      >

        <!-- TieZhu:
        对于单选和多选：
          quetionList有如下属性。
            showToolbar：是否显示题目工具栏，初值false
            type：标识题目类型
            qsIsEditing：题干是否正在修改，初值false
            question：题干
            isNecessary：布尔类型，是否必填，初值true
            optionCnt：选项数量
            text:正在修改的题干填写内容
            isDisabled:是否可以删除选项，初值true
            optionList：选项数组。包含以下内容：
              showBar：是否展示工具栏，初值false
              isEditing：是否正在被修改，初值false
              content：选项内容
              text：正在修改的填写内容
        对于填空：
          quetionList有如下属性:
            showToolbar：是否显示题目工具栏，初值false
            type：标识题目类型
            qsIsEditing：题干是否正在修改，初值false
            question：题干
            isNecessary：布尔类型，是否必填，初值true
            text:正在修改的题干填写内容
        -->

        <el-icon color="#c45656" style="position: absolute; left: 1%;" v-if="questionList[index-1].isNecessary==true"><StarFilled/>&ensp;</el-icon>

        <!-- TieZhu：单选题 -->
        <div v-if="questionList[index-1].type==1">
          <div>
            <el-input v-if="questionList[index-1].qsIsEditing" v-model="questionList[index-1].question" @blur="finishEditing(0,index-1,0)" @keyup.enter="finishEditing(0,index-1,0)" clearable/>
            <span v-else @click="startEditing(0,index-1,0)">{{ questionList[index-1].text }}</span>
          </div>
          
          <van-radio-group v-model="radio" v-for="index2 in questionList[index-1].optionCnt" :disabled=true>
              <div @mouseover="questionList[index-1].optionList[index2-1].showBar=true" @mouseleave="questionList[index-1].optionList[index2-1].showBar=false">
                  <br/>
                  <van-radio :name="index2" checked-color="#0283EF" :label-disabled=true>
                    <div>
                      <el-input v-if="questionList[index-1].optionList[index2-1].isEditing" v-model="questionList[index-1].optionList[index2-1].content" @blur="finishEditing(1,index-1,index2-1)" @keyup.enter="finishEditing(1,index-1,index2-1)" clearable/>
                      <span v-else @click="startEditing(1,index-1,index2-1)">{{ questionList[index-1].optionList[index2-1].text }}</span>
                    </div>
                  </van-radio>
                  <br/>
                  <el-button-group v-if="questionList[index-1].optionList[index2-1].showBar">
                      <el-button size="small" color="#fef0f0" @click="addOption(index-1,index2-1)"><el-icon><Plus/></el-icon></el-button>
                      <el-button size="small" color="#ecf5ff" @click="deleteOption(index-1,index2-1)" :disabled="questionList[index-1].isDisabled"><el-icon><Minus/></el-icon></el-button>
                  </el-button-group>
              </div>
          </van-radio-group>

          <br/>
        </div>

        <!-- TieZhu：多选题 -->
        <div v-if="questionList[index-1].type==2">
          <div>
            <el-input v-if="questionList[index-1].qsIsEditing" v-model="questionList[index-1].question" @blur="finishEditing(0,index-1,0)" @keyup.enter="finishEditing(0,index-1,0)" clearable/>
            <span v-else @click="startEditing(0,index-1,0)">{{ questionList[index-1].text }}</span>
          </div>
          
          <van-checkbox-group v-model="radio" v-for="index2 in questionList[index-1].optionCnt"  checked-color="#0283EF" :disabled=true>
              <div @mouseover="questionList[index-1].optionList[index2-1].showBar=true" @mouseleave="questionList[index-1].optionList[index2-1].showBar=false">
                  <br/>
                  <van-checkbox :name="index2" shape="square" :label-disabled=true>
                    <div>
                      <el-input v-if="questionList[index-1].optionList[index2-1].isEditing" v-model="questionList[index-1].optionList[index2-1].content" @blur="finishEditing(1,index-1,index2-1)" @keyup.enter="finishEditing(1,index-1,index2-1)" clearable/>
                      <span v-else @click="startEditing(1,index-1,index2-1)">{{ questionList[index-1].optionList[index2-1].text }}</span>
                    </div>
                  </van-checkbox>
                  <br/>
                  <el-button-group v-if="questionList[index-1].optionList[index2-1].showBar">
                      <el-button size="small" color="#fef0f0" @click="addOption(index-1,index2-1)"><el-icon><Plus/></el-icon></el-button>
                      <el-button size="small" color="#ecf5ff" @click="deleteOption(index-1,index2-1)" :disabled="questionList[index-1].isDisabled"><el-icon><Minus/></el-icon></el-button>
                  </el-button-group>
              </div>
          </van-checkbox-group>

          <br/>
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
          <el-rate v-model="score"></el-rate>
          <br/>
          <br/>
        </div>

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
import NavigationBar from "@/components/NavigationBar.vue"
import { ElMessage } from 'element-plus'
 
 export default({
   data(){
    return{
      input:'',
      questionCnt: 0,
      questionList: [],
      draggedIndex:-1,
      title:'问题标题',
      text:'问卷标题',
      ttIsEditing:false,
    }
   },
   methods: {
    //TieZhu:添加单选题
    addSingle(){
      this.questionCnt++;
      this.questionList.push({"type":1,"showToolbar":false,"isNecessary":true,"qsIsEditing":false,"question":"请选择一个选项","text":"请选择一个选项",
      "optionCnt":1,"isDisabled":true,"optionList":[{"showBar":false,"isEditing":false,"content":"选项","text":"选项"}]});
    },
    //TieZhu:添加多选题
    addMultiple(){
      this.questionCnt++;
      this.questionList.push({"type":2,"showToolbar":false,"isNecessary":true,"qsIsEditing":false,"question":"请选择以下选项（多选）","text":"请选择以下选项（多选）",
      "optionCnt":1,"isDisabled":true,"optionList":[{"showBar":false,"isEditing":false,"content":"选项","text":"选项"}]});
    },
    //TieZhu:添加填空题
    addFill(){
      this.questionCnt++;
      this.questionList.push({"type":3,"showToolbar":false,"isNecessary":true,"qsIsEditing":false,"question":"请填空","text":"请填空"});
    },
    //TieZhu:添加评分题
    addScore(){
      this.questionCnt++;
      this.questionList.push({"type":4,"showToolbar":false,"isNecessary":true,"qsIsEditing":false,"question":"请评分","text":"请评分"});
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
      this.questionList[index].optionList.splice(index2,0,{"showBar":false,"isEditing":false,"content":"选项","text":"选项"});
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
      if(type == 0){
        this.questionList[index].qsIsEditing = true;
      }
      else if(type == 1){
        this.questionList[index].optionList[index2].isEditing = true;
      }
      else{
        this.ttIsEditing = true;
      }
    },
    finishEditing(type,index,index2) {
      if(type == 0){
        this.questionList[index].qsIsEditing = false;
        if(this.questionList[index].question.length == 0){
          this.questionList[index].question = this.questionList[index].text;
          this.warning();
        }
        else{
          this.questionList[index].text = this.questionList[index].question;
        }
      }
      else if(type == 1){
        this.questionList[index].optionList[index2].isEditing = false;
        if(this.questionList[index].optionList[index2].content.length == 0){
          this.questionList[index].optionList[index2].content = this.questionList[index].optionList[index2].text;
          this.warning();
        }
        else{
          this.questionList[index].optionList[index2].text = this.questionList[index].optionList[index2].content;
        }
      }
      else{
        this.ttIsEditing = false;
        if(this.title.length == 0){
          this.title = this.text;
          this.warning();
        }
        else{
          this.text = this.title;
        }
      }
    },
    warning(){
      ElMessage({
        message:'长度不能为空',
        type:'warning',
      });
    },
   },
   components:{
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
  height: 700px;
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
  background-position: center; 
  background-repeat: repeat-y; /* 背景图片不重复 */
  background-attachment: fixed; 
}
</style>