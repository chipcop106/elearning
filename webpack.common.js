const path = require('path');
const componentEnrtryPrefix = './src/js/components/';

module.exports = {
  entry: {
    'Header': componentEnrtryPrefix + '/Header.js',
    'Footer': componentEnrtryPrefix + '/Footer.js',
    'ProfileSidebar': componentEnrtryPrefix + '/ProfileSidebar.js',
    
    'teacherProfile': componentEnrtryPrefix + 'TeacherProfile/teacherProfile.js',
    'studentDashboard': componentEnrtryPrefix + 'StudentDashboard/studentDashboard.js',
    'bookingLesson': componentEnrtryPrefix + 'StudentBooking/bookingLesson.js',
    'studentProfile': componentEnrtryPrefix + 'StudentProfile/studentProfile.js',
    'lessonHistory': componentEnrtryPrefix + 'LessonHistory/lessonHistory.js',
    'bookedLesson': componentEnrtryPrefix + 'BookedLesson/bookedLesson.js',
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