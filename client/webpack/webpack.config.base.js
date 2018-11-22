const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

const resolve = dir => path.join(__dirname, '../', dir)

module.exports = {
  target: 'web',
  entry: resolve('src/index.js'),
  output: {
    path: resolve('dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [resolve('src'), resolve('../node_modules')],
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        test: /\.(js|jsx)$/,
        include: resolve('src'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|sass)$/,
        include: resolve('src'),
        exclude: /node_modules/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|ico)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 15000,
              name: 'img/[name].[ext]',
              publicPath: './'
            }
          }
          // {
          //     loader: 'image-webpack-loader',
          //     options: {
          //       mozjpeg: {
          //         progressive: true,
          //         quality: 60
          //       },
          //       pngquant: {
          //         quality: 60,
          //         speed: 4
          //       }
          //     }
          // }
        ]
      }
    ]
  }
}