export default {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: '/node_modules/',
      use: 'babel-loader'
    },
    {
      test: /\.(png|jpe?g|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {},
        },
      ],
    },
    {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[name]_[local]_[hash:base64]',
          sourceMap: true,
          // minimize: true
        }
      },
      {
        loader: 'sass-loader'
      }
      ]
    }
  ]
};