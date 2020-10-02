import React, { useState, useEffect } from 'react'
let page

const SideMenu = () => {
	const [activePage, setActivePage] = useState('')
	useEffect(() => {
		let pathUrl = window.location.pathname
		setActivePage(pathUrl.toUpperCase())
		console.log(pathUrl)
	}, [])

	return (
		<ul className="list-unstyled profile-info-list course mg-b-0">
			<li
				className={
					activePage.indexOf('/ElearnStudent/DashBoard'.toUpperCase()) !== -1
						? 'active'
						: ''
				}
			>
				<a href="/ElearnStudent/DashBoard">
					<i className="fas fa-home icon"></i> Trang Chủ
				</a>
			</li>
			<li
				className={
					activePage.indexOf('/ElearnStudent/ProfileUser'.toUpperCase()) !== -1
						? 'active'
						: ''
				}
			>
				<a href="/ElearnStudent/ProfileUser">
					<i className="fas fa-user-graduate icon"></i> Thông Tin Cá Nhân
				</a>
			</li>
			<li
				className={
					activePage.indexOf('/ElearnStudent/BookedLesson'.toUpperCase()) !== -1
						? 'active'
						: ''
				}
			>
				<a href="/ElearnStudent/BookedLesson">
					<i className="fas fa-calendar icon"></i> Lịch Học
				</a>
			</li>
			<li
				className={
					activePage.indexOf('/ElearnStudent/LessonHistory'.toUpperCase()) !==
					-1
						? 'active'
						: ''
				}
			>
				<a href="/ElearnStudent/LessonHistory">
					<i className="fas fa-list icon"></i> Lộ Trình Đã Học
				</a>
			</li>
			<li
				className={
					activePage.indexOf('/ElearnStudent/FeedBack'.toUpperCase()) !== -1
						? 'active'
						: ''
				}
			>
				<a href="/ElearnStudent/FeedBack">
					<i className="fas fa-comment icon"></i> Nhận Xét Của Giáo Viên
				</a>
			</li>
			<li
				className={
					activePage.indexOf('/ElearnStudent/Announcements'.toUpperCase()) !==
					-1
						? 'active'
						: ''
				}
			>
				<a href="/ElearnStudent/Announcements">
					<i className="fas fa-bell icon"></i> Thông Báo
				</a>
			</li>
			<li
				className={
					activePage.indexOf('/ElearnStudent/FAQ'.toUpperCase()) !== -1
						? 'active'
						: ''
				}
			>
				<a href="/ElearnStudent/FAQ">
					<i className="fas fa-question-circle icon"></i> Câu Hỏi Thường Gặp
				</a>
			</li>
		</ul>
	)
}

export default SideMenu
