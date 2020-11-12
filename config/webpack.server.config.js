const path = require('path')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = {
  entry: path.join(__dirname, '../src/entry-server.js'),
  target: 'node',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    allowlist: /\.css$/
  }),
  optimization: {
    splitChunks: false
  },
  plugins: [
    new VueSSRServerPlugin()
  ]
}
