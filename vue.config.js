const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
   devServer: {
     proxy: {
       '/user': {
         target: 'http://localhost:8000', // Django服务器的地址
         changeOrigin: true,

       },
     },
   },
})