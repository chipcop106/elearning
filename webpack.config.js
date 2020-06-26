const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

const devMode = true;

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry : {
    "StudentProfile":"./src/components/StudentProfile/index.js",
    "TeacherProfile":"./src/components/TeacherProfile/index.js"
  },
  output: {
    path: path.resolve(__dirname, './components/'),
    filename: 'index.bundle.js',
    chunkFilename: '**/*.jsx',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: "html-loader"
      //     }
      //   ]
      // },
      // {
      //   test: /\.css$/i,
      //   use: ['style-loader', 'css-loader'],
      // },
      // { test: /\.s[ac]ss$/i, use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }] },
      // { test: /\.(png|gif|jpg|cur)$/i, loader: 'url-loader', options: { limit: 8192 } },
      // { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff2' } },
      // { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } },
      // { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'file-loader' }
    ]
  },
  // plugins: [
  //   new HtmlWebPackPlugin({
  //     template: "./src/index.html",
  //     filename: "./index.html"
  //   })
  // ]
};