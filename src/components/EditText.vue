<!-- TieZhu：点击文字变为输入框 -->

<template>
    <div>
        <el-input v-if="isEditing" v-model="editableText" @blur="finishEditing" @keyup.enter="finishEditing" clearable/>
        <span v-else @click="startEditing">{{ text }}</span>
    </div>
</template>
  
<script>
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
        this.text = this.editableText;
      }
    }
  }
</script>

<style>

</style>
  