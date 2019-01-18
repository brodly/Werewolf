const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '/src/index'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'app.js',
  },
  devServer: {
    contentBase: './dist',
  },
};
