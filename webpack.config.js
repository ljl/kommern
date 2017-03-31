module.exports = {
  entry: ['./main.js'],
  output: {
    filename: 'dist/pwa.bundle.js'
  },
  devtool: 'cheap-eval-source-map',
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
        enforce: 'pre',
        test: /\.js?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.vue?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
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
