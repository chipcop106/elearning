const path = require('path');
const componentEnrtryPrefix = './src/js/components/';

module.exports = {
  entry: {
    'Header': componentEnrtryPrefix + '/Header.js',
    'teacherProfile': componentEnrtryPrefix + 'TeacherProfile/teacherProfile.js',
    'custom': './src/scss/custom.scss',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
    ]
  },
};