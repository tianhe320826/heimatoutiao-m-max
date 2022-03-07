module.exports = {
    plugins: {

    //   'autoprefixer': {
    //     browsers: ['Android >= 4.0', 'iOS >= 8']
    //   },

    // 配置使用 postcss-pxtorem 插件
      'postcss-pxtorem': {
        //   此处给file进行解构了
        rootValue ({ file }) {
            return file.indexOf('vant') !== -1 ? 37.5 : 75
        },
        propList: ['*']
      }
    }
  }
  