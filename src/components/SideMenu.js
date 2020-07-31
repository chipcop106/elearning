import React from 'react';
import ReactDOM from 'react-dom';
let page;

const SideMenu = () => {
    React.useEffect(() => {
        let url = window.location.href;
        page = (url.split("account/")[1]).split(".html")[0];
    }, []);

    return (
        <ul className="list-unstyled profile-info-list course mg-0 mg-t-30">
            <li className={page == "studentProfile" ? "active" : ""}>
                <a href="ElearnStudent/studentProfile">Profile Overview</a>
            </li>
            <li className={page == "studentDashboard" ? "active" : ""}>
                <a href="ElearnStudent/studentDashboard">Dashboard</a>
            </li>
            <li className={page == "bookingLesson" ? "active" : ""}>
                <a href="ElearnStudent/bookingLesson">Book a lesson</a>
            </li>
            <li className={page == "notification" ? "active" : ""}>
                <a href="ElearnStudent/notification">Notification</a>
            </li>
            <li className={page == "bookedLesson" ? "active" : ""}>
                <a href="ElearnStudent/bookedLesson">Booked Lessons</a>
            </li>
            <li className={page == "lessonHistory" ? "active" : ""}>
                <a href="ElearnStudent/lessonHistory">Lesson History</a>
            </li>
            <li className={page == "feedback" ? "active" : ""}>
                <a href="ElearnStudent/feedback">FeedBack</a>
            </li>
            <li className={page == "faq" ? "active" : ""}>
                <a href="ElearnStudent/faq">FAQ</a>
            </li>
        </ul>
    )
}

export default SideMenu;