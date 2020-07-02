const path = require('path');
const componentEnrtryPrefix = './src/js/components/';

module.exports = {
  entry: {
    'Header': componentEnrtryPrefix + '/Header.js',
    'Footer': componentEnrtryPrefix + '/Footer.js',
    'teacherProfile': componentEnrtryPrefix + 'TeacherProfile/teacherProfile.js',
    'teacherHome': componentEnrtryPrefix + 'TeacherHome/teacherHome.js',
    'teacherClassRooms': componentEnrtryPrefix + 'TeacherClassRooms/teacherClassRooms.js',
    'teacherBooking': componentEnrtryPrefix + 'TeacherBooking/teacherBooking.js',
    'teacherLibrary': componentEnrtryPrefix + 'TeacherLibrary/teacherLibrary.js',
    'teacherSupport': componentEnrtryPrefix + 'TeacherSupport/teacherSupport.js',
    'teacherReport': componentEnrtryPrefix + 'TeacherReport/teacherReport.js',
    'teacherPayment': componentEnrtryPrefix + 'TeacherPayment/teacherPayment.js',
    'studentDashboard': componentEnrtryPrefix + 'StudentDashboard/studentDashboard.js',
    // 'DocumentSlider': componentEnrtryPrefix + 'TeacherLibrary/DocumentSlider.js',
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
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000' 
      },
    ],
  },
};