<!-- 填空题 -->

<template>
    <div>
        <editable-text initialText="请填空"></editable-text>
        <br/>
        <el-input v-model="fill" size="large" placeholder="填写者内容输入区"/>
        <br/>
        <br/>
    </div>
</template>
  
<script>
import EditableText from '../EditText.vue'

export default ({
    data() {
      return {

      };
    },
    methods: {

    },
    components: {
        EditableText
    }
})
</script>
  
<style scoped>

</style>