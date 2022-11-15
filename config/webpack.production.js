const TerserPlugin = require('terser-webpack-plugin');
const os = require('os');
const { join, resolve } = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  output: {
    path: join(__dirname, '../dist'),
    publicPath: './',
    filename: 'scripts/[name].[contenthash:5].bundule.js',
    assetModuleFilename: 'images/[name].[hash:5][ext]',
  },
  performance: {
    maxAssetSize: 250000, // 最大资源大小250KB
    maxEntrypointSize: 250000, // 最大入口资源大小250KB
    hints: 'warning', // 超出限制时只给出警告
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: os.cpus().length - 1,
        terserOptions: {
          compress: {
            drop_console: false,
            drop_debugger: true,
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: os.cpus().length - 1,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'cutefcc-react-generator',
      filename: 'index.html',
      template: resolve(__dirname, '../src/web/index-prod.html'),
    }),
  ],
};
