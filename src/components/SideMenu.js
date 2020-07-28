import React from 'react';
let page;

const SideMenu = () => {
    const [activePage, setActivePage] = React.useState('');
    React.useEffect(() => {
        let pathUrl = window.location.pathname;
        setActivePage(pathUrl.toUpperCase());
        console.log(pathUrl);
    }, []);

    return (
        <ul className="list-unstyled profile-info-list course mg-b-10">
            <li>
                <a href="/ElearnStudent/ProfileUser"
                    className={activePage.indexOf("/ElearnStudent/ProfileUser".toUpperCase()) !== -1 ? "active" : ""}>Profile Overview</a>
            </li>
            <li>
                <a href="/ElearnStudent/DashBoard"
                    className={activePage.indexOf("/ElearnStudent/DashBoard".toUpperCase()) !== -1 ? "active" : ""}>Dashboard</a>
            </li>
            <li>
                <a href="/ElearnStudent/bookingLesson"
                    className={activePage.indexOf("/ElearnStudent/bookingLesson".toUpperCase()) !== -1 ? "active" : ""}>Book a lesson</a>
            </li>
            <li>
                <a href="/ElearnStudent/Announcements"
                    className={activePage.indexOf("/ElearnStudent/Announcements".toUpperCase()) !== -1 ? "active" : ""}>Notification</a>
            </li>
            <li>
                <a href="/ElearnStudent/BookedLesson"
                    className={activePage.indexOf("/ElearnStudent/BookedLesson".toUpperCase()) !== -1 ? "active" : ""}>Booked Lessons</a>
            </li>
            <li>
                <a href="/ElearnStudent/LessonHistory"
                    className={activePage.indexOf("/ElearnStudent/LessonHistory".toUpperCase()) !== -1 ? "active" : ""}>Lesson History</a>
            </li>
            <li>
                <a href="/ElearnStudent/FeedBack"
                    className={activePage.indexOf("/ElearnStudent/FeedBack".toUpperCase()) !== -1 ? "active" : ""}>FeedBack</a>
            </li>
            <li>
                <a href="/ElearnStudent/FAQ"
                    className={activePage.indexOf("/ElearnStudent/FAQ".toUpperCase()) !== -1 ? "active" : ""}>FAQ</a>
            </li>
        </ul>
    )
}

export default SideMenu;

