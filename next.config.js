const withCSS = require('@zeit/next-css')
const cssLoaderGetLocalIdent = require('css')

module.exports = withCSS({
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]___[hash:base64:5]",
      }
})