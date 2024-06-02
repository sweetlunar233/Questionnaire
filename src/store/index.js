import { createStore } from 'vuex'

export default createStore({
  state: {
    qs:[],
  },
  getters: {
  },
  mutations: {
    setQs(state,qs){
      state.qs = qs;
    },
    addQs(state,ele){
      state.qs.push(ele);
    },
    deleteQs(state,index){
      state.qs.splice(index,1);
    },
    copyQs(state,index){
      state.qs.splice(index+1,0,state.qs[index]);
    },
    addQsOn(state,index,ele){
      state.qs.splice(index,0,ele);
    },
    updateQsQuestion(state,index,question){
      state.qs[index].question = question;
    },
    //添加选项
    addOption(state,index,index2){
      state.qs[index].optionList.splice(index2+1,0,"选项");
    },
    //删除选项
    deleteOption(state,index,index2){
      state.qs[index].optionList.splice(index2,1);
    },
    //更新选项文本
    updateOption(state,index,index2,option){
      state.qs[index].optionList[index2] = option;
    },
  },
  actions: {
  },
  modules: {
  }
})
