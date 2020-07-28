import React from 'react';
import ReactDOM from 'react-dom';
let page;

const SideMenu = () => {
    React.useEffect(() => {
        let url = window.location.href;
        page = (url.split("account/")[1]).split(".html")[0];
        console.log(page);
    }, []);

    return (
        <ul className="list-unstyled profile-info-list course mg-b-10">
            <li>
                <a href="studentProfile.html"
                    className={page == "studentProfile" ? "active" : ""}>Profile Overview</a>
            </li>
            <li>
                <a href="studentDashboard.html"
                    className={page == "studentDashboard" ? "active" : ""}>Dashboard</a>
            </li>
            <li>
                <a href="bookingLesson.html"
                    className={page == "bookingLesson" ? "active" : ""}>Book a lesson</a>
            </li>
            <li>
                <a href="notification.html"
                    className={page == "notification" ? "active" : ""}>Notification</a>
            </li>
            <li>
                <a href="bookedLesson.html"
                    className={page == "bookedLesson" ? "active" : ""}>Booked Lessons</a>
            </li>
            <li>
                <a href="lessonHistory.html"
                    className={page == "lessonHistory" ? "active" : ""}>Lesson History</a>
            </li>
            <li>
                <a href="feedback.html"
                    className={page == "feedback" ? "active" : ""}>FeedBack</a>
            </li>
            <li>
                <a href="faq.html"
                    className={page == "faq" ? "active" : ""}>FAQ</a>
            </li>
        </ul>
    )
}

export default SideMenu;