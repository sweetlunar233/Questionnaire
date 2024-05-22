<!-- 多选题 -->

<template>
    <div>
        <editable-text initialText="请选择以下选项（多选）"></editable-text>
        <van-checkbox-group v-model="multiple" v-for="index in optionCnt"  checked-color="#0283EF">
            <div @mouseover="optionList[index-1].showBar=true" @mouseleave="optionList[index-1].showBar=false">
                <br/>
                <van-checkbox :name="index" label-disabled="true" shape="square">
                    <editable-text :initialText="optionList[index-1].content"></editable-text>
                </van-checkbox>

                <br/>
                <el-button-group v-if="optionList[index-1].showBar">
                    <el-button size="small" color="#fef0f0" @click="addOption(index-1)"><el-icon><Plus/></el-icon></el-button>
                    <el-button size="small" color="#ecf5ff" @click="deleteOption(index-1)" :disabled="isDistabled"><el-icon><Minus/></el-icon></el-button>
                </el-button-group>
            </div>
        </van-checkbox-group>

        <!-- TieZhu:空行好看捏 -->
        <br/>
    </div>
</template>
  
<script>
import EditableText from '../EditText.vue'

export default ({
    data() {
      return {
        multiple:['1'],
        optionList:[{"showBar":false,"content":"选项"}],
        optionCnt:1,
        isDistabled:true,
      };
    },
    methods: {
        addOption(index){
            this.optionCnt++;
            this.optionList.splice(index+1,0,{"showBar":false,"content":"选项"});
            this.multiple.splice(index+1,0,index);
            if(this.optionCnt==2){
                this.isDistabled = false;
            }
        },
        deleteOption(index){
            this.optionCnt--;
            this.optionList.splice(index,1);
            this.multiple.splice(index,1);
            if(this.optionCnt==1){
                this.isDistabled = true;
            }
        },
        editOption(index){

        }
    },
    components: {
        EditableText
    }
})
</script>
  
<style scoped>

</style>