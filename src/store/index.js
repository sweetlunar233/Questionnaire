import { createStore } from 'vuex'

export default createStore({
  state: {
    qs:[],
    nowuser: {
      username: "",
      password: "",
      email: "",
      money: 0,
    },
  },
  getters: {
  },
  mutations: {
    setQs(state,qs){
      state.qs = qs;
    },
    deleteQs(state,index){
      state.qs.splice(index,1);
    },
    copyQs(state,index){
      state.qs.splice(index+1,0,state.qs[index]);
    },
    addQsOn(state,val){
      state.qs.splice(val.index,0,val.ele);
    },
    updateQsQuestion(state,val){
      state.qs[val.index].question = val.question;
    },
    //添加选项
    addOption(state,val){
      state.qs[val.index].optionList.splice(val.index2+1,0,"选项");
    },
    //删除选项
    deleteOption(state,val){
      state.qs[val.index].optionList.splice(val.index2,1);
    },
    //更新选项文本
    updateOption(state,val){
      state.qs[val.index].optionList[val.index2] = val.option;
    },
    //更新选项数量
    updateOptionCnt(state,val){
      state.qs[val.index].optionCnt += val.updateCnt;
    },
    updateIsNecessary(state,val){
      state.qs[val.index].isNecessary = val.isNecessary;
    },
    
    //修改username
    updateUsername(state,username){
      state.nowuser.username = username;
    },
    //修改password
    updatePassword(state,password){
      state.nowuser.password = password;
    },
    //修改email
    updateEmail(state,email){
      state.nowuser.email = email;
    },
    //修改money
    updateMoney(state,money){
      state.nowuser.money = money;
    },
  },
  actions: {
  },
  modules: {
  }
})
