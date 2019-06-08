import HtmlWebPackPlugin from 'html-webpack-plugin';

export default [
  new HtmlWebPackPlugin({
    title: 'Codejobs',
    template: './src/index.html',
    filename: 'index.html'
  })
];