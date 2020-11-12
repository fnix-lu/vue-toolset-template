const path = require('path')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = {
  entry: path.join(__dirname, '../src/entry-client.js'),
  optimization: {
    splitChunks: {
      name: 'manifest',
      minChunks: Infinity
    }
  },
  plugins: [
    new VueSSRClientPlugin()
  ]
}
