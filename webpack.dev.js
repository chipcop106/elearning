const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
function generateHtmlPlugins(templateDir, sub) {
  // Read files in template directory
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles.map(item => {
    // Split names and extension
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]
    // Create new HTMLWebpackPlugin with options
    return new HtmlWebPackPlugin({
      filename: `${sub && `${sub}/`}/${name}.html`,
      hash:true,
      inject: true,
      chunks:[`${name}`],
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      // scripts: ['../js/components/Header.js','../jscomponents/Footer.js'],
      title: `${name} template`,
      mobile: true,
    })
  })
}

const teacherHTML = generateHtmlPlugins('./src/teacher', 'teacher');
const accountHTML = generateHtmlPlugins('./src/account', 'account');

module.exports = merge(common,{
  mode: "development",
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [{
            loader: 'style-loader',
        }, {
            loader: 'css-loader'
        }, {
            loader: 'sass-loader'
        }]
    }
    ]
  },
  watch: true,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackTagsPlugin({ tags: ['../js/Header.js','../js/Footer.js'], append: true,  usePublicPath: false }),
  ].concat(teacherHTML).concat(accountHTML)
});