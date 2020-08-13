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
      <li className={activePage.indexOf("/ElearnStudent/ProfileUser".toUpperCase()) !== -1 ? "active" : ""}>
        <a href="/ElearnStudent/ProfileUser">Profile Overview</a>
      </li>
      <li className={activePage.indexOf("/ElearnStudent/DashBoard".toUpperCase()) !== -1 ? "active" : ""}>
        <a href="/ElearnStudent/DashBoard">Dashboard</a>
      </li>
      <li className={activePage.indexOf("/ElearnStudent/bookingLesson".toUpperCase()) !== -1 ? "active hard-active" : "hard-active"}>
        <a href="/ElearnStudent/bookingLesson">Book a lesson</a>
      </li>
      <li className={activePage.indexOf("/ElearnStudent/Announcements".toUpperCase()) !== -1 ? "active" : ""}>
        <a href="/ElearnStudent/Announcements">Notification</a>
      </li>
      <li className={activePage.indexOf("/ElearnStudent/BookedLesson".toUpperCase()) !== -1 ? "active" : ""}>
        <a href="/ElearnStudent/BookedLesson">Booked Lessons</a>
      </li>
      <li className={activePage.indexOf("/ElearnStudent/LessonHistory".toUpperCase()) !== -1 ? "active" : ""}>
        <a href="/ElearnStudent/LessonHistory">Lesson History</a>
      </li>
      <li className={activePage.indexOf("/ElearnStudent/FeedBack".toUpperCase()) !== -1 ? "active" : ""}>
        <a href="/ElearnStudent/FeedBack">FeedBack</a>
      </li>
      <li className={activePage.indexOf("/ElearnStudent/FAQ".toUpperCase()) !== -1 ? "active" : ""}>
        <a href="/ElearnStudent/FAQ">FAQ</a>
      </li>
    </ul>
  )
}

export default SideMenu;

