/*=========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
// let cookie;

module.exports = {
  publicPath: '/',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  devServer: {

    disableHostCheck: true,   // That solved it

  }
  // devServer: {
  //   host: process.env.VUE_APP_PROXY_LOCAL_URL,
  //   proxy: {
  //     '/api/': {
  //       target: process.env.VUE_APP_PROXY_REMOTE_URL,
  //       pathRewrite: {
  //         '^/api/': ''
  //       },
        // onProxyReq: (proxyReq) => {
        //   if (cookie) {
        //     proxyReq.setHeader('Cookie', cookie);
        //   }
        // },
        // onProxyRes: (proxyRes) => {
        //   Object.keys(proxyRes.headers).forEach((key) => {
        //     if (key === 'set-cookie' && proxyRes.headers[key]) {
        //       console.log(proxyRes.headers[key]);
        //       const cookieTokens = proxyRes.headers[key][0].split(';');
        //       cookie = cookieTokens.filter(element => element.includes('JSESSIONID')).join('');
        //     }
        //   });
        // },
  //     }
  //   }
  // }
}

