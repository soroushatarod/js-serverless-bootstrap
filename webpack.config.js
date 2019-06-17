const nodeExternals = require('webpack-node-externals')
const path = require('path')
const slsw = require('serverless-webpack')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },
  mode: process.env.NODE_ENV || 'production',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  }
}
