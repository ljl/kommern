var path = require('path');

module.exports = {
  entry: ['./main.js'],
  output: {
    filename: path.join(path.resolve(__dirname), 'dist/pwa.bundle.js')
  },
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://reisapi.ruter.no',
        pathRewrite: {'^/api' : ''},
        secure: false,
        changeOrigin: true
      }
    },
    port: process.env.PORT || 3000
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'style-loader!css-loader!sass-loader'
          }
        }
      }
    ]
  },
}
