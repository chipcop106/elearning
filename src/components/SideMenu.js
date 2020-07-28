import React from 'react';
import ReactDOM from 'react-dom';

const SideMenu = () => {
    return (
        <ul className="list-unstyled profile-info-list course mg-b-10">
            <li>{/* <i data-feather="user" /> */}<a href="/ElearnStudent/ProfileUser">Profile Overview</a></li>
            <li>{/* <i data-feather="user" /> */}<a href="/ElearnStudent/DashBoard">Dashboard</a></li>
            <li>{/* <i data-feather="book" /> */}<a href="/ElearnStudent/bookingLesson">Book a lesson</a></li>
            <li>{/* <i data-feather="bell" /> */}<a href="/ElearnStudent/Announcementsl">Notification</a></li>
            <li>{/* <i data-feather="calendar" /> */}<a href="/ElearnStudent/BookedLesson">Booked Lessons</a></li>
            <li>{/* <i data-feather="calendar" /> */}<a href="/ElearnStudent/LessonHistory">Lesson History</a></li>
            <li>{/* <i data-feather="message-circle" /> */}<a href="/ElearnStudent/FeedBack">FeedBack</a></li>
            <li>{/* <i data-feather="message-square" /> */}<a href="/ElearnStudent/FAQ">FAQ</a></li>
        </ul>
    )
}

export default SideMenu;

