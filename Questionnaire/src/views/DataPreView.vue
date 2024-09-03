<!-- 数据展示页面 -->
<template>
  <!-- 图表的容器，一定要有宽高 -->
  <!-- <div class="chartBox">
    <div id="pillarsChart" :style="{ width: '100%', height: '100%' }"></div>
  </div> -->
  

    <div class="back">
      <el-container>
        <el-header>
          <navigation-bar v-if="username != null" style="position: fixed;"/>
        </el-header>
        <el-main class="main_container">
          <div class="right">
            <n-card :title="title">
              <n-tabs type="line" size="medium" @update:value="changeBar(value)" animated>
                <n-tab-pane name="dataAnalysis" tab="数据分析">
                  <div  id="dataAnalysis">
                  <div v-for="index in questionList.length"  style="margin-left: 2%;">
      
                    <!-- TieZhu:
                    对于单选/多选/评分：
                      quetionList有如下属性。
                        type：标识题目类型
                        question：题干
                        optionCnt：一个数组。选择对应选项的人数。
                        optionContent：选项内容数组。对于评分题为：[0,1,2,3,4,5]
                        hasChart:是否有图表显示
                    对于填空：
                      quetionList有如下属性:
                        type：标识题目类型
                        question：题干
                        hasChart:是否有图表显示
                        fill:一个数组，填写者所填内容（仅对填空题有效）
                        cnt:对应填写的人数
                    -->

                    <!-- TieZhu：单选题 -->
                    <div v-if="questionList[index-1].type==1">
                      <div>
                        {{ questionList[index-1].question }}
                      </div>
                      <div class="qstype">[单选题]</div>
                      <div class="row"></div>
                      <el-button @click="toggleChart(index-1,'bar')" style="color: #409EFF;" plain>柱状图</el-button>
                      <el-button @click="toggleChart(index-1,'pie')" style="color: #409EFF;" plain>饼状图</el-button>
                      <el-button @click="toggleChart(index-1,'line')" style="color: #409EFF;" plain>折线图</el-button>
                      <br/>
                      <br/>
                      <div v-if="questionList[index-1].hasChart">
                        <div class="chartBox">
                          <div :id="index-1" :style="{ width: '100%', height: '100%' }"></div>
                        </div>
                      </div>
                      <br/>
                    </div>

                    <!-- TieZhu：多选题 -->
                    <div v-if="questionList[index-1].type==2">
                      <div>
                          {{ questionList[index-1].question }}
                      </div>
                      <div class="qstype">[多选题]</div>
                      <br/><div class="row"></div>
                      <el-button @click="toggleChart(index-1,'bar')" style="color: #409EFF;" plain>柱状图</el-button>
                      <el-button @click="toggleChart(index-1,'pie')" style="color: #409EFF;" plain>饼状图</el-button>
                      <el-button @click="toggleChart(index-1,'line')" style="color: #409EFF;" plain>折线图</el-button>
                      <br/>
                      <br/>
                      <div v-if="questionList[index-1].hasChart">
                        <div class="chartBox">
                          <div :id="index-1" :style="{ width: '100%', height: '100%' }"></div>
                        </div>
                      </div>
                      <br/>
                    </div>

                    <!-- TieZhu:填空题 -->
                    <div v-if="questionList[index-1].type==3">
                      {{ questionList[index-1].question }}
                      <div class="qstype">[填空题]</div>
                      <div class="row"></div>
                      <el-button @click="toggleChart(index-1,'wordcloud')" style="color: #409EFF;" plain>词云图</el-button>
                      <br/>
                      <br/>
                      <div v-if="questionList[index-1].hasChart">
                        <div class="chartBox">
                          <div :id="index-1" :style="{ width: '100%', height: '100%' }"></div>
                        </div>
                      </div>
                      <br/>
                    </div>
                    
                    <!-- TieZhu:评分题 -->
                    <div v-if="questionList[index-1].type==4">
                      {{ questionList[index-1].question }}
                      <div class="qstype">[评分题]</div>
                      <div class="row"></div>
                      <el-button @click="toggleChart(index-1,'bar')" style="color: #409EFF;" plain>柱状图</el-button>
                      <el-button @click="toggleChart(index-1,'pie')" style="color: #409EFF;" plain>饼状图</el-button>
                      <el-button @click="toggleChart(index-1,'line')" style="color: #409EFF;" plain>折线图</el-button>
                      <div class="row"></div>
                      <div v-if="questionList[index-1].hasChart">
                        <div class="chartBox">
                          <div :id="index-1" :style="{ width: '100%', height: '100%' }"></div>
                        </div>
                      </div>
                      <br/>
                    </div>
                  </div>
                  </div>
                </n-tab-pane>
                <n-tab-pane v-if="!flag" name="crossData" tab="交叉分析">
                  <div id="crossData">
                    <div style=" margin-left: 2%; margin-right: 2%;">自变量X</div>
                    <div class="row"></div>
                    <div>
                      <el-select v-model="cross1" placeholder="添加自变量" size="large" style="width: 240px; margin-left: 2%; margin-right: 2%;">
                        <el-option v-for="item in cross" :key="item.value" :label="item.label" :value="item.value" :model="cross1"/>
                      </el-select>
                    </div>
                    <br/>
                    <div style=" margin-left: 2%; margin-right: 2%;">因变量Y</div>
                    <!-- TieZhu:空一半行 -->
                    <div class="row"></div>
                    <div>
                      <el-select v-model="cross2" placeholder="添加因变量" size="large" style="width: 240px; margin-left: 2%; margin-right: 2%;">
                        <el-option v-for="item in cross" :key="item.value" :label="item.label" :value="item.value" :model="cross1"/>
                      </el-select>
                    </div>

                    <n-collapse-transition :show="(cross1!=undefined)&&(cross2!=undefined)">
                      <br/>
                      <div style="margin-left: 2%; margin-right: 2%;">
                        <el-button @click="toggleChart(-1,'bar')" style="color: #409EFF;" plain>柱状图</el-button>
                        <el-button @click="toggleChart(-1,'pie')" style="color: #409EFF;" plain>饼状图</el-button>
                        <el-button @click="toggleChart(-1,'line')" style="color: #409EFF;" plain>折线图</el-button>
                      </div>
                    </n-collapse-transition>
                    <div v-if="crossHasChart">
                      <div class="chartBox">
                        <div :id="-1" :style="{ width: '100%', height: '100%' }"></div>
                      </div>
                    </div>
                  </div>
                </n-tab-pane>
              </n-tabs>
            </n-card>
          </div>
          <div v-if="!flag" class="bar">
            <el-tooltip content="下载数据" placement="right">
              <el-button size="large" @click="dialog=true" text circle><el-icon color="#337ecc" :size="30"><Download /></el-icon></el-button>
            </el-tooltip>
            <div v-if="isShare==0" class="row"></div>
            <div v-if="isShare==0" class="row"></div>
            <el-tooltip v-if="isShare==0" content="分享" placement="right">
              <n-popover trigger="click" placement="bottom">
                <template #trigger>
                  <el-button size="large" text circle><el-icon color="#337ecc" :size="30" ><Share /></el-icon></el-button>
                </template>
                <!-- TieZhu：分享链接弹出框 -->
                <span><n-qr-code :value="url+'/1'" error-correction-level="H"/></span>
              </n-popover>
            </el-tooltip>
          </div>
        </el-main>
      </el-container>
      
      
      <el-dialog v-model="dialog" width="800" title="下载数据">
        <el-button size="large" v-print="printObj" type="primary">下载图表</el-button>
        <el-button size="large" @click="excel()" type="primary">下载Excel表</el-button>
      </el-dialog>
    </div>
</template>

<script>
import 'echarts-wordcloud';//引用云词
import NavigationBar from "@/components/NavigationBarInQuestionnaire.vue"
import { NCard, dialogDark } from 'naive-ui';
import { NTabs } from 'naive-ui';
import { NTabPane } from 'naive-ui';
import { getCurrentInstance, ref } from 'vue';
import { NCollapseTransition } from 'naive-ui';
import { NSpace } from 'naive-ui';
import { NPopover } from 'naive-ui';
import { NQrCode } from 'naive-ui';
import Print from 'vue3-print-nb';
import { GetCrossData, GetExcel, GetOtherData } from '@/api/question';
import { ElMessage } from 'element-plus'
import axios from 'axios';

export default {
  data() {
    return {
      username:undefined,
      dialog:false,
      input:'',
      questionnaireId:2,
      questionCnt: 0,
      questionList: [],
      title:'',
      description:'',
      //用于交叉分析
      cross:[], //可以用于交叉分析的题目
      cross1:undefined, //自变量的问题ID
      cross2:undefined, //因变量的问题ID
      crossHasChart:false,
      crossContent:[],
      crossCnt:[],
      //print
      printObj: {
        id: 'dataAnalysis', // 这里是要打印元素的ID
        popTitle:"纸翼传问",
		    preview:false,  // 是否开启预览
        beforeOpenCallback:()=>{
		      console.log('开始打印之前的callback')
		    }
      },
      url:'',
      flag:false,//是否是为了展示投票结果而存在的页面
      isShare:0,//是否为别人分享的数据（此时不应该允许此人继续分享）
    };
  },
  
  methods: {
    toggleChart(index,kind) {
      if(index != -1){
        this.questionList[index].hasChart = true;
        this.$nextTick(() => {
          this.createCharts(index, this.questionList[index].optionContent, this.questionList[index].optionCnt,kind);
        });
      }
      else{
        if(this.cross1 == this.cross2){
          this.warning("题目不能重复");
          return;
        }
        this.crossHasChart = true;

        var promise = GetCrossData(this.cross1,this.cross2);
        promise
        .then((result) => {
          this.crossContent = result.crossText;
          this.crossCnt = result.crossCount;
        })
        .finally(() => {
          this.$nextTick(() => {
            this.createCharts(index,this.crossContent,this.crossCnt,kind);
          })
        })
      }
    },
    createCharts(id,xData,yData,chartType){
      //获取id并初始化图表
      if(!this.$echarts.isDisposed){
        this.$echarts.dispose(document.getElementById(id));
      }
      var myChart = this.$echarts.init(document.getElementById(id));
      let option=[],i=0;
      //配置项
      if(chartType == 'line' || chartType == 'bar'){
        option = {
          xAxis: {
              data: xData
          },
          yAxis: {},
          series: [
            {
              type: chartType,
              data: yData
            }
          ]
        };
      }
      else if(chartType == 'pie'){
        let pieData = [];
        if(id != -1){
          for(i=0;i<this.questionList[id].optionContent.length;i++){
            pieData.push({"value":this.questionList[id].optionCnt[i],"name":this.questionList[id].optionContent[i]});
          }
        }
        else{
          for(i=0;i<this.crossContent.length;i++){
            pieData.push({"value":this.crossCnt[i],"name":this.crossContent[i]});
          }
        }
        option = {
          series:[
            {
              type:'pie',
              data:pieData,
            }
          ]
        };
      }
      else{
        let wordData = [];
        for(i=0;i<this.questionList[id].optionContent.length;i++){
          wordData.push({"value":this.questionList[id].optionCnt[i],"name":this.questionList[id].optionContent[i]});
        }
        
        option = {
          tooltip: {
            show: true,
          },
          series: [
            {
              type: "wordCloud",
              //maskImage: maskImage,
              gridSize: 1,
              sizeRange: [12, 55],
              rotationRange: [-45, 0, 45, 90],
              width: "100%",
              height: "100%",
              textStyle: {
                  color: function () {
                    return (
                      "rgb(" +
                      Math.round(Math.random() * 255) +
                      ", " +
                      Math.round(Math.random() * 255) +
                      ", " +
                      Math.round(Math.random() * 255) +
                      ")"
                    )
                },
                emphasis: {
                  shadowBlur: 10,
                  shadowColor: "#333",
                },
              },
              data:wordData,
            }
          ]
        }
      }
      myChart.setOption(option); //通过setOption()方法生成图表
      window.addEventListener("resize", function () {
        myChart.resize(); //图表自适应的一个方法
      });
    },

    // //TieZhu:添加单选题
    // addSingle(){
    //     this.questionCnt++;
    //     this.questionList.push({"type":1,"question":"os难吗","hasChart":false,"optionCnt":[5,2,3,4],"optionContent":["11","22","33","44"]});
    // },
    // //TieZhu:添加多选题
    // addMultiple(){
    //     this.questionCnt++;
    //     this.questionList.push({"type":2,"question":"请选择以下选项（多选）","hasChart":false,"optionCnt":[5,2,6,4],"optionContent":["11","22","33","44"]});
    // },
    // //TieZhu:添加填空题
    // addFill(){
    //     this.questionCnt++;
    //     this.questionList.push({"type":3,"question":"请填空","hasChart":false,"fill":["铁柱","翠花","大壮","二狗"],"cnt":[1,2,1,1]});
    // },
    // //TieZhu:添加评分题
    // addScore(){
    //     this.questionCnt++;
    //     this.questionList.push({"type":4,"question":"给os打个分吧","hasChart":false,"optionCnt":[0,2,6,4,5],"optionContent":[1,2,3,4,5]});
    // },
    //当页面切换时，更换下载和分享的内容
    changeBar(value){
      this.isCross = !this.isCross;
      if(this.isCross){
        this.printObj.id = 'crossData';
      }
      else{
        this.printObj.id = 'dataAnalysis';
        // 在每次进入数据分析标签页时，默认展示柱状图
        let i = 0;
        for(i = 0;i < this.questionList.length;i++){
          if(this.questionList[i].type != 3){
            this.toggleChart(i,'bar');
          }
          else{
            this.toggleChart(i,'wordcloud');
          }
        }
      }
    },
    //下载excel表格
    excel(){
      const surveyID = this.questionnaireId;  // 请根据实际情况替换此值
      
      axios({
        method: 'get',
        url: `http://8.140.247.134:8001/dataPre/download/${surveyID}`,  // 确保URL正确指向你的后端方法
        responseType: 'blob',  // 重要：设置响应类型为 blob，以便处理二进制文件
      })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;

        let filename = this.title + "填写记录统计_" + (new Date().toLocaleString()) + ".xlsx";
        link.setAttribute('download', filename); // 设置下载的文件名

        document.body.appendChild(link);
        link.click();  // 触发下载
        document.body.removeChild(link); // 清理DOM
        window.URL.revokeObjectURL(url);  // 释放URL对象
      })
      .catch(error => {
        console.error('下载失败:', error);
      });
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
    NCard,
    NTabs,
    NTabPane,
    NCollapseTransition,
    NSpace,
    Print,
    NPopover,
    NQrCode,
    ElMessage,
  },
  mounted(){

    this.questionnaireId = parseInt(this.$route.params.questionnaireId);
    const internalInstance = getCurrentInstance()
    const internalData = internalInstance.appContext.config.globalProperties
    this.username = internalData.$cookies.get('username');
    this.flag = this.$route.params.flag;

    if(this.$route.params.isShare === undefined){
      this.isShare = 0;
    }
    else{
      this.isShare = parseInt(this.$route.params.isShare);
    }

    var promise = GetOtherData(this.questionnaireId);
    promise.then((result) => {
      this.questionList = result.questionList;
      this.title = result.title;
      let i = 0;
      for(i = 0;i < this.questionList.length;i++){
        this.questionList[i].hasChart = ref(false);
        this.questionList[i].question = this.questionList[i].Content;
        this.questionList[i].optionContent = this.questionList[i].Text;
        this.questionList[i].optionCnt = this.questionList[i].Count;
        if(this.questionList[i].type <= 2){
          this.cross.push({"label":String(i + 1) + "." + this.questionList[i].Content,"value":this.questionList[i].questionId})
        }
        if(this.questionList[i].type == 3){
          this.toggleChart(i,'wordcloud');
        }
        else{
          this.toggleChart(i,'bar');
        }
      }
      console.log(this.questionList);
      this.url = window.location.href;
    })
  },
};
</script>

<!-- dcx：scoped保证样式只会应用到当前 .vue 文件 -->
<style scoped>
.chartBox {
  /* width: 80%; */
  height: 50vh;
}

.right{
  /* position: relative; */
  height: 780px;
  width: 70%;
  background-color: rgb(255, 255, 255);
  top: 8%;
  left: 20%;
  border-radius: 5px;
  border: 2px;
  box-shadow: 6px 6px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.title{
  text-align: center;
  font-size: larger;
  color: #409EFF;
  font-weight: bold;
}

.back{
  /* position: relative; */
  
  height: 100vh;
  background-image: url('../assets/bg.png'); /* 设置背景图片 */
  background-size: cover; /* 确保背景图片完全覆盖容器，可能会被裁切 */
  background-position: center; 
  background-repeat: repeat-y; /* 背景图片不重复 */
  background-attachment: fixed; 
}

.el-main {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.qstype{
  color: darkgray;
}

.bar{
  /* position: relative; */
  width: 2.2%;
  height: 12%;
  bottom: 70%;
  background-color: rgb(255, 255, 255);
  left: 72%;
  border-radius: 5px;
  border: 2px;
  padding: 20px;
  box-shadow: 6px 6px 8px rgba(0, 0, 0, 0.1);
  margin-left: 1%;
}
/* TieZhu:用于空行 */
.row{
  padding-bottom: 10px;
}
</style>