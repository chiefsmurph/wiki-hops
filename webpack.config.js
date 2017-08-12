module.exports = {
  entry: "./index.js",
  output: {
    filename: "./dist/bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(scss|sass)$/,
        loader: "style-loader!css-loader!sass-loader"
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff&name=./dist/fonts/[hash].[ext]" },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
        options: {
          name: './dist/fonts/[name].[ext]',
          publicPath: '../'
        }
      }
    ]
  }
}
