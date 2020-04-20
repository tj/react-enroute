const Babel = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env'],
    plugins: [
      '@babel/plugin-transform-react-jsx',
    ],
  },
}

module.exports = {
  mode: 'development',
  entry: './example/index.js',
  module: {
    rules: [Babel],
  },
  devServer: {
    contentBase: './example',
    historyApiFallback: true,
  },
}
