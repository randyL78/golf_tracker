import HtmlWebPackPlugin from 'html-webpack-plugin';

export default [
  new HtmlWebPackPlugin({
    title: 'Golf Tracker',
    template: './src/index.html',
    filename: 'index.html'
  })
];