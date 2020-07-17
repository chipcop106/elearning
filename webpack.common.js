const path = require('path');
const componentEnrtryPrefix = './src/components/';
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const appPaths = {
  src:path.join(__dirname, 'src'),
  dist:path.join(__dirname, 'dist')
}
module.exports = {
  entry: {
    "polyfill": "@babel/polyfill",
    'Header': componentEnrtryPrefix + '/Header.js',
    'Footer': componentEnrtryPrefix + '/Footer.js',
    'login': componentEnrtryPrefix + 'Login/Login.js',
    'signup': componentEnrtryPrefix + 'Signup/Signup.js',
    'app': ['./src/scss/custom.scss', './src/assets/js/custom.js'],
    'teacherHome': componentEnrtryPrefix + 'TeacherHome/teacherHome.js',
    // 'teacherClassRooms': componentEnrtryPrefix + 'TeacherClassRooms/teacherClassRooms.js',
    // 'teacherBooking': componentEnrtryPrefix + 'TeacherBooking/teacherBooking.js',
    // 'teacherLibrary': componentEnrtryPrefix + 'TeacherLibrary/teacherLibrary.js',
    // 'teacherSupport': componentEnrtryPrefix + 'TeacherSupport/teacherSupport.js',
    // 'teacherReport': componentEnrtryPrefix + 'TeacherReport/teacherReport.js',
    // 'teacherPayment': componentEnrtryPrefix + 'TeacherPayment/teacherPayment.js',
    // 'teacherFeedback': componentEnrtryPrefix + 'TeacherFeedback/teacherFeedback.js',
    // 'studentDashboard': componentEnrtryPrefix + 'StudentDashboard/studentDashboard.js',
    // // 'DocumentSlider': componentEnrtryPrefix + 'TeacherLibrary/DocumentSlider.js',
    // 'ProfileSidebar': componentEnrtryPrefix + '/ProfileSidebar.js',
    // 'teacherProfile': componentEnrtryPrefix + 'TeacherProfile/teacherProfile.js',
    // 'teacherLessonDetail': componentEnrtryPrefix + 'TeacherLessonDetail/teacherLessonDetail.js',
    // 'studentDashboard': componentEnrtryPrefix + 'StudentDashboard/StudentDashboard.js',
    // 'bookingLesson': componentEnrtryPrefix + 'StudentBooking/BookingLesson.js',
    // 'studentProfile': componentEnrtryPrefix + 'StudentProfile/StudentProfile.js',
    // 'lessonHistory': componentEnrtryPrefix + 'LessonHistory/LessonHistory.js',
    // 'bookedLesson': componentEnrtryPrefix + 'BookedLesson/BookedLesson.js',
    // 'teacherDetail': componentEnrtryPrefix + 'TeacherDetail/TeacherDetail.js',
    // 'blogDetail': componentEnrtryPrefix + 'BlogDetail/BlogDetail.js',
    // 'faq': componentEnrtryPrefix + 'Faq/Faq.js',
    // 'feedback': componentEnrtryPrefix + 'Feedback/Feedback.js',
    // 'lessonDetail': componentEnrtryPrefix + 'LessonDetail/LessonDetail.js',
    // 'notification': componentEnrtryPrefix + 'Notification/Notification.js',

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
  plugins:[
    new HtmlWebpackTagsPlugin({   
      useHash:true, 
      addHash: (assetPath, hash) => {
        return assetPath + '?' + hash;
      },
      scripts: ['../js/Header.js','../js/Footer.js','../js/ProfileSidebar.js', '../js/app.js'], 
      links:['../css/app.css'],
      append: true,  
      usePublicPath: false }),
  ]
};