<!-- 问卷设计页面 -->
<template>
  <div style="position: fixed;">7</div>
  <div class="left">123</div>
  <div >456</div>

  
</template>

<script>

</script>

<!-- dcx：scoped保证样式只会应用到当前 .vue 文件 -->
<style scoped>
.left{
  position: relative;
  width: 20%;
  height: 2000px;
  top: 100px;
  /* background-color: bisque; */
}

.item{
  position: absolute;
  width: 20%;
  height: 200px;
  top: 0%;
  left: 20%;
  background-color: aqua;
}

</style>