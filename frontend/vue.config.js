module.exports = {
  devServer: {
    proxy: {
      '/api': {
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // remove base path
        },
        target: "http://localhost:3001"
      },
    }
  },
  css: {
    loaderOptions: {
      // pass options to sass-loader,
      // pass Less.js Options to less-loader
      less: {
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        globalVars: {
          primary: '#fff'
        },
        javascriptEnabled: true
      }
    }
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  }
}