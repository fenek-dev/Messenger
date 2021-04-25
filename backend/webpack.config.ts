import path from 'path'
import webpack from 'webpack'
import {CleanWebpackPlugin} from 'clean-webpack-plugin'
const nodeExternals = require('webpack-node-externals')
module.exports = {
  target: 'node',
  entry: './server.ts',
  externals: [nodeExternals()],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.m?ts$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [new CleanWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
}
