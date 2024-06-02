<!-- TieZhu：点击文字变为输入框 -->

<template>
    <div>
        <el-input v-if="isEditing" v-model="editableText" @blur="finishEditing" @keyup.enter="finishEditing" clearable/>
        <span v-else @click="startEditing">{{ text }}</span>
    </div>
</template>
  
<script>
import store from '@/store';
import { ElMessage } from 'element-plus';

  export default {
    props: {
      initialText: {
        type: String,
        default: '问题描述'
      }
    },
    data() {
      return {
        text: this.initialText,
        isEditing: false,
        editableText: this.initialText
      };
    },
    methods: {
      startEditing() {
        this.isEditing = true;
      },
      finishEditing() {
        this.isEditing = false;
        if(this.editableText.length == 0){
          this.editableText = this.text;
          this.warning();
        }
        else{
          this.text = this.editableText;
          if(this.type=="question"){
            console.log("23232323");
            store.commit("updateQsQuestion",this.message,this.text);
          }
          else{
            store.commit("updateOption",this.message,this.index,this.text);
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
    props:{
      type:String,
      message:Number,
      index:Number,
    }
  }
</script>

<style>

</style>
  