const path = require('path');

module.exports = {
  entry: './client/src/index.js',
  output: {
    path: path.resolve(__dirname, 'client/build'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /client\/.*\.js/,
        use: 'babel-loader'
      }
    ]
  }
}