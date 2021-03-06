const path = require('path');

module.exports = {
  entry: './client/src/app.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './client/dist'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
}