import React from 'react';
import ReactDOM from 'react-dom';

const SideMenu = () => {
    return (
        <ul className="list-unstyled profile-info-list course mg-b-10">
            <li>{/* <i data-feather="user" /> */}<a href="studentProfile.html">Profile Overview</a></li>
            <li>{/* <i data-feather="user" /> */}<a href="studentDashboard.html">Dashboard</a></li>
            <li>{/* <i data-feather="book" /> */}<a href="bookingLesson.html">Book a lesson</a></li>
            <li>{/* <i data-feather="bell" /> */}<a href="notification.html">Notification</a></li>
            <li>{/* <i data-feather="calendar" /> */}<a href="bookedLesson.html">Booked Lessons</a></li>
            <li>{/* <i data-feather="calendar" /> */}<a href="lessonHistory.html">Lesson History</a></li>
            <li>{/* <i data-feather="message-circle" /> */}<a href="feedback.html">FeedBack</a></li>
            <li>{/* <i data-feather="message-square" /> */}<a href="faq.html">FAQ</a></li>
        </ul>
    )
}

export default SideMenu;