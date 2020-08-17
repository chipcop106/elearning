const path = require('path');
const componentEnrtryPrefix = './src/components/';
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const appPaths = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
}
module.exports = {
  entry: {
    "polyfill": "@babel/polyfill",
    'Footer': componentEnrtryPrefix + '/Footer.js',
    'app': ['./src/scss/custom.scss', './src/assets/js/custom.js'],
    'ProfileSidebar': componentEnrtryPrefix + '/ProfileSidebar.js',
    'Header': componentEnrtryPrefix + '/Header.js',
    'teacherBooking': componentEnrtryPrefix + 'TeacherBooking/teacherBooking.js',
    'teacherHome': componentEnrtryPrefix + 'TeacherHome/teacherHome.js',
    'teacherClassRooms': componentEnrtryPrefix + 'TeacherClassRooms/teacherClassRooms.js',
    'teacherReport': componentEnrtryPrefix + 'TeacherReport/teacherReport.js',
    'teacherFeedbackDetail': componentEnrtryPrefix + 'TeacherFeedbackDetail/teacherFeedbackDetail.js',
    
    'teacherLibrary': componentEnrtryPrefix + 'TeacherLibrary/teacherLibrary.js',
    'teacherSupport': componentEnrtryPrefix + 'TeacherSupport/teacherSupport.js',
    'teacherPayment': componentEnrtryPrefix + 'TeacherPayment/teacherPayment.js',
    'teacherFeedback': componentEnrtryPrefix + 'TeacherFeedback/teacherFeedback.js',
    'teacherProfile': componentEnrtryPrefix + 'TeacherProfile/teacherProfile.js', 
    'teacherLessonDetail': componentEnrtryPrefix + 'TeacherLessonDetail/teacherLessonDetail.js',
    'feedback': componentEnrtryPrefix + 'Feedback/Feedback.js',
    'studentMessage': componentEnrtryPrefix + 'StudentMessage/StudentMessage.js',
    'faq': componentEnrtryPrefix + 'Faq/Faq.js', 
    'blogDetail': componentEnrtryPrefix + 'BlogDetail/BlogDetail.js',
    'notification': componentEnrtryPrefix + 'Notification/Notification.js',
    'lessonDetail': componentEnrtryPrefix + 'LessonDetail/LessonDetail.js',
    'studentProfile': componentEnrtryPrefix + 'StudentProfile/StudentProfile.js',
    'bookingLesson': componentEnrtryPrefix + 'StudentBooking/BookingLesson.js',
    'lessonHistory': componentEnrtryPrefix + 'LessonHistory/LessonHistory.js',
    
    'bookedLesson': componentEnrtryPrefix + 'BookedLesson/BookedLesson.js',
    'teacherDetail': componentEnrtryPrefix + 'TeacherDetail/TeacherDetail.js',
    'studentDashboard': componentEnrtryPrefix + 'StudentDashboard/StudentDashboard.js',
  },
  output: {
    path: appPaths.dist,
    filename: 'js/[name].js?[hash]',
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
      {
        test: /\.(ttf|otf|eot|woff2?)$/,
        loader: "file-loader",
        options: {
          name: 'fonts/[name].[ext]',
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackTagsPlugin({
      useHash: true,
      addHash: (assetPath, hash) => {
        return assetPath + '?' + hash;
      },
      scripts: ['../js/Header.js', '../js/Footer.js', '../js/ProfileSidebar.js', '../js/app.js'],
      links: ['../css/app.css'],
      append: true,
      usePublicPath: false
    }),
  ]
};