const path = require('path');
const componentEnrtryPrefix = './src/js/components/';

module.exports = {
  entry: {
    'Header': componentEnrtryPrefix + '/Header.js',
    'Footer': componentEnrtryPrefix + '/Footer.js',
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
    ]
  },
};