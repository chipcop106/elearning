const SideMenu = () =>{
    return (
        <ul className="list-unstyled profile-info-list course mg-b-10">
            <li><i data-feather="user" /><a href="profile.html">My Page</a></li>
            <li><i data-feather="aperture" /><a href="index.html">DashBoard</a></li>
            <li><i data-feather="bell" /><a href="notification.html">Notification</a></li>
            <li><i data-feather="calendar" /><a href="booked-lesson.html">Booked Lessons</a></li>
            <li><i data-feather="calendar" /><a href="lesson-history.html">Lesson History</a></li>
            <li><i data-feather="message-circle" /><a href="feedback.html">FeedBack</a></li>
            <li><i data-feather="message-square" /><a href="faq.html">FAQ</a></li>
            <li><i data-feather="message-square" /><a href="faq.html">FAQ</a></li>
        </ul>

    )
}

const domContainer = document.getElementById('js-component-sidemenu');
ReactDOM.render(<Header />, domContainer);