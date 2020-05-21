// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/prefix/api/user/list': {
        target: 'https://api-remote.xxxx.com',
        pathRewrite: {
          '^/prefix': ''
        }
      }
    },
  }
}