<!-- 单选题 -->

<template>
    <div>
        <editable-text :initialText="text" :kind="'question'" :message="message" :index="-1"></editable-text>
        
        <van-radio-group v-model="radio" v-for="index in optionCnt">
            <div @mouseover="optionList[index-1].showBar=true" @mouseleave="optionList[index-1].showBar=false">
                <br/>
                <van-radio :name="index" checked-color="#0283EF" :label-disabled="true">
                    <editable-text :initialText="optionList[index-1].content" :kind="'option'" :message="message" :index="index-1"></editable-text>
                </van-radio>
                <br/>
                <el-button-group v-if="optionList[index-1].showBar">
                    <el-button size="small" color="#fef0f0" @click="addOption(index-1)"><el-icon><Plus/></el-icon></el-button>
                    <el-button size="small" color="#ecf5ff" @click="deleteOption(index-1)" :disabled="isDistabled"><el-icon><Minus/></el-icon></el-button>
                </el-button-group>
            </div>
        </van-radio-group>

        <!-- TieZhu:空行好看捏 -->
        <br/>
    </div>
</template>
  
<script>
import { watch } from 'vue';
import EditableText from '../EditText.vue'
import store from '@/store';

export default ({
    data() {
      return {
        radio:'',
        optionList:[],
        optionCnt:0,
        isDistabled:true,
        text:store.state.qs[this.message].question,
      };
    },
    methods: {
        addOption(index){
            this.optionCnt++;
            this.optionList.splice(index+1,0,{"showBar":false,"content":"选项"});
            store.commit("addOption",{"index":this.message,"index2":index});
            store.commit("updateOptionCnt",{"index":this.message,"updateCnt":1});
            if(this.optionCnt==2){
                this.isDistabled = false;
            }
        },
        deleteOption(index){
            this.optionCnt--;
            this.optionList.splice(index,1);
            store.commit("deleteOption",{"index":this.message,"index2":index});
            store.commit("updateOptionCnt",{"index":this.message,"updateCnt":-1});
            if(this.optionCnt==1){
                this.isDistabled = true;
            }
        },
    },
    components: {
        EditableText
    },
    props:{
        message:Number,
    },
    mounted(){
        for(let i=0;i<store.state.qs[this.message].optionCnt;i++){
            this.optionList.push({"showBar":false,"content":store.state.qs[this.message].optionList[i]});
        }
        this.text = store.state.qs[this.message].question;
        this.optionCnt = store.state.qs[this.message].optionCnt;

        watch(() => store.state.qs[this.message], () => {
            this.text = store.state.qs[this.message].question;
            this.optionList = [];
            for(let i=0;i<store.state.qs[this.message].optionCnt;i++){
                this.optionList.push({"showBar":false,"content":store.state.qs[this.message].optionList[i]});
            }
            this.optionCnt = store.state.qs[this.message].optionCnt;
        })
    }
})
</script>
  
<style scoped>

</style>