const path = require('path');
const componentEnrtryPrefix = './src/js/components/';

module.exports = {
  entry: {
    'Header': componentEnrtryPrefix + '/Header.js',
    'Footer': componentEnrtryPrefix + '/Footer.js',
    'teacherHome': componentEnrtryPrefix + 'TeacherHome/teacherHome.js',
    'teacherClassRooms': componentEnrtryPrefix + 'TeacherClassRooms/teacherClassRooms.js',
    'teacherBooking': componentEnrtryPrefix + 'TeacherBooking/teacherBooking.js',
    'teacherLibrary': componentEnrtryPrefix + 'TeacherLibrary/teacherLibrary.js',
    'teacherSupport': componentEnrtryPrefix + 'TeacherSupport/teacherSupport.js',
    'teacherReport': componentEnrtryPrefix + 'TeacherReport/teacherReport.js',
    'teacherPayment': componentEnrtryPrefix + 'TeacherPayment/teacherPayment.js',
    'teacherFeedback': componentEnrtryPrefix + 'TeacherFeedback/teacherFeedback.js',
    'studentDashboard': componentEnrtryPrefix + 'StudentDashboard/studentDashboard.js',
    // 'DocumentSlider': componentEnrtryPrefix + 'TeacherLibrary/DocumentSlider.js',
    'ProfileSidebar': componentEnrtryPrefix + '/ProfileSidebar.js',
    
    'teacherProfile': componentEnrtryPrefix + 'TeacherProfile/teacherProfile.js',
    'studentDashboard': componentEnrtryPrefix + 'StudentDashboard/StudentDashboard.js',
    'bookingLesson': componentEnrtryPrefix + 'StudentBooking/BookingLesson.js',
    'studentProfile': componentEnrtryPrefix + 'StudentProfile/StudentProfile.js',
    'lessonHistory': componentEnrtryPrefix + 'LessonHistory/LessonHistory.js',
    'bookedLesson': componentEnrtryPrefix + 'BookedLesson/BookedLesson.js',
    'teacherDetail': componentEnrtryPrefix + 'TeacherDetail/TeacherDetail.js',
    'blogDetail': componentEnrtryPrefix + 'BlogDetail/BlogDetail.js',
    'faq': componentEnrtryPrefix + 'Faq/Faq.js',
    'feedback': componentEnrtryPrefix + 'Feedback/Feedback.js',
    'lessonDetail': componentEnrtryPrefix + 'LessonDetail/LessonDetail.js',
    'notification': componentEnrtryPrefix + 'Notification/Notification.js',
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