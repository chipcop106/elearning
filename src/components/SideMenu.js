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
        <a href="/ElearnStudent/ProfileUser">Thông Tin Cá Nhân</a>
      </li>
      <li className={activePage.indexOf("/ElearnStudent/DashBoard".toUpperCase()) !== -1 ? "active" : ""}>
        <a href="/ElearnStudent/DashBoard">Trang Chủ</a>
      </li>
        <li className="active">
        <a href="/ElearnStudent/bookingLesson">Đặt Lịch Học</a>
      </li>
      <li className={activePage.indexOf("/ElearnStudent/Announcements".toUpperCase()) !== -1 ? "active" : ""}>
        <a href="/ElearnStudent/Announcements">Thông Báo</a>
      </li>
      <li className={activePage.indexOf("/ElearnStudent/BookedLesson".toUpperCase()) !== -1 ? "active" : ""}>
        <a href="/ElearnStudent/BookedLesson">Lịch Học Đã Đăng Ký</a>
      </li>
      <li className={activePage.indexOf("/ElearnStudent/LessonHistory".toUpperCase()) !== -1 ? "active" : ""}>
        <a href="/ElearnStudent/LessonHistory">Lịch Sử Đã Học</a>
      </li>
      <li className={activePage.indexOf("/ElearnStudent/FeedBack".toUpperCase()) !== -1 ? "active" : ""}>
        <a href="/ElearnStudent/FeedBack">Đánh Giá</a>
      </li>
      <li className={activePage.indexOf("/ElearnStudent/FAQ".toUpperCase()) !== -1 ? "active" : ""}>
        <a href="/ElearnStudent/FAQ">Câu Hỏi Thường Gặp</a>
      </li>
    </ul>
  )
}

export default SideMenu;

