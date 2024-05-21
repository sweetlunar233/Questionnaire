<!-- 单选题 -->

<template>
    <editable-text initialText="请选择一个选项"></editable-text>
    
    <van-radio-group v-model="radio">
        <br/>
        <van-radio name="1" checked-color="#0283EF">单选框 1</van-radio>
        <br/>
        <van-radio name="2" checked-color="#0283EF">单选框 2</van-radio>
    </van-radio-group>
    <br/>
    <el-button-group>
        <el-button size="small" color="#fef0f0"><el-icon><Plus/></el-icon></el-button>
        <el-button size="small" color="#ecf5ff"><el-icon><Minus/></el-icon></el-button>
    </el-button-group>

    <!-- TieZhu:空行好看捏 -->
    <br/>
    <br/>
</template>
  
<script>
import EditableText from '../EditText.vue'

export default ({
    data() {
      return {
        radio:'',
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