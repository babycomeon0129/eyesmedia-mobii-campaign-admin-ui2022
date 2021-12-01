console.log(`環境：${process.env.NODE_ENV}`);
console.log(`配置API位置：${process.env.VUE_APP_hostUrl}`);

module.exports = {
  productionSourceMap: process.env.NODE_ENV === 'sit',  // 只在sit產生source map
  outputDir: process.env.outputDir,                     // 打包輸出目錄
  chainWebpack: config => {
    config.plugin('html').tap( args => {
      args[0].title = '活動模組後台';  // 網頁title
      return args;
    });
  },
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_SERVER_URL,
        charngOrigin: true,
        ws: false,
        patRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
           @import "@/assets/styles/_global.scss";
        `
      }
    }
  }
}
