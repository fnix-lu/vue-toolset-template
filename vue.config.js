const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false, // boolean (true = 'warning') | 'warning' | 'default' (= 'error') | 'error'
  productionSourceMap: process.env.NODE_ENV === 'development',

  devServer: {
    proxy: {
      // change `xxx-api/login` to `domain/login`
      [process.env.VUE_APP_BASE_API]: {
        target: 'https://www.easy-mock.com/mock/5f48c7e49279d93141e87028',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: '@import \'@/styles/variables.scss\';'
      }
    }
  },

  chainWebpack (config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
