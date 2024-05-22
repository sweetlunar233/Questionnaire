<!-- 评分题 -->

<template>
    <div>
        <editable-text initialText="评分"></editable-text>
        <br/>
        <el-rate v-model="score" allow-half></el-rate>
        <br/>
        <br/>
    </div>
</template>
  
<script>
import EditableText from '../EditText.vue'

export default ({
    data() {
      return {
        score:'',
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