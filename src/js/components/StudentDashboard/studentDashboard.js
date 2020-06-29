let initialState = {
    upcomingLesson: {
        teacher: "Hoàng Thị Uyên Phương",
        images: "https://images.unsplash.com/photo-1593087989983-e887d642a19c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        courseName: "IELST - Professional",
        date: "03/07/2020",
        startTime: "10:30",
        endTime: "11:00",
        note: "Prepare speaking topic",
        document: ["ReadingSpeaking.doc", "Listening.doc"],
        skype: "http://skype.com/abc",
        require: ["This is require 1", "This is require 2", "This is require 3"],
        selectedRequire:[],
        noteForTeacher: "Note for teacher",
    },
    lessonHistory: [{
        courseId: "1",
        teacher: "Hoàng Thị Uyên Phương",
        images: "https://image.engoo.com/teacher/15867/p2872.jpg",
        courseName: "IELST - Professional",
        date: "24/06/2020",
        startTime: "10:30",
        endTime: "11:00",
        note: "Student have a good speaking skill",
        ratingCourse: "90",
    }, {
        courseId: "2",
        teacher: "Hoàng Văn Thái",
        images: "https://images.unsplash.com/photo-1593087989983-e887d642a19c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        courseName: "IELST - Beginner",
        date: "15/06/2020",
        startTime: "10:00",
        endTime: "14:00",
        note: "Student have a good speaking skill",
        ratingCourse: "75",
    }],
    ratingCourse: {
        course: null,
        ratingStars: 0,
        note: "",
    },
}

const reducer = (prevState, { type, payload }) => {
    switch (type) {
        case "RATING_COURSE": {
            return {
                ...prevState,
                ratingCourse: {
                    ...prevState.ratingCourse,
                    [payload.key]: payload.value,
                }
            }
        }
        case "REQUIRE_COURSE": {
            return {
                ...prevState,
                upcomingLesson: {
                    ...prevState.upcomingLesson,
                    [payload.key]: payload.value,
                }
            }
        }
        default: return prevState;
            break;
    }
}

const convertDay = (date) => {
    let arrayDate = date.split('/')
    date = new Date(`${arrayDate[1]}/${arrayDate[0]}/${arrayDate[2]}`).getDay()
    switch (date) {
        case 0: return "Sunday"; break;
        case 1: return "Monday"; break;
        case 2: return "Tuesday"; break;
        case 3: return "Wednesday"; break;
        case 4: return "Thursday"; break;
        case 5: return "Friday"; break;
        default: return "Saturday"; break;
    }
}

const convertTime = (time) => {
    time = time.split(':')[0]
    return time <= 12 ? "AM" : "PM";
}

const LessonHistory = ({ ratingCourse, state }) => {
    const onRatingCourse = (course) => {
        ratingCourse(course)
    }
    return (
        <div className="course-horizental mg-t-20">
            <ul className="list-wrap">
                {
                    state.lessonHistory.map((item, index) => {
                        return (
                            <li key={index} className="cr-item lesson-info">
                                <div className="media">
                                    <div className="teacher-information">
                                        <a className="teacher-avatar" href="#">
                                            <img src={item.images} className="teacher-image" alt="" />
                                            <p className="course-teacher tx-14 tx-gray-800 tx-normal mg-b-0 tx-center mg-t-5 d-block">
                                                {item.teacher}
                                            </p>
                                        </a>
                                    </div>
                                    <div className="media-body  mg-l-20 pos-relative">
                                        <h5 className="mg-b-10">
                                            <span className="badge badge-success">Finished</span>{' '}
                                            <a href="lesson-detail.html" className="course-name tx-bold">
                                                {item.courseName}
                                            </a>
                                        </h5>
                                        <div className="course-information tx-14">
                                            <span className="mg-r-15 tx-gray-600 tx-medium">
                                                <i className="fa fa-calendar  tx-info mg-r-5"></i>
                                                {convertDay(item.date) + ' ' + item.date}
                                            </span>
                                            <span className="mg-r-15 tx-gray-600 tx-medium">
                                                <i className="fa fa-clock  tx-info mg-r-5"></i>
            {`Start: ${item.startTime} ${convertTime(item.startTime)}`}</span>
                                            <span className="mg-r-15 tx-gray-600 tx-medium">
                                                <i className="fa fa-clock  tx-info mg-r-5"></i>
            {`End: ${item.endTime} ${convertTime(item.endTime)}`}</span>
                                        </div>
                                        <div className="course-note mg-t-15">
                                            <h6 className="mg-b-3">Teacher note:</h6>
                                            <p className="tx-14 mg-b-0">Student have a good speaking skill.</p>
                                        </div>
                                        <div className="course-rate mg-t-15">
                                            <h6 className="mg-b-3">Rating lesson:</h6>
                                            <div className="rating-stars">
                                                <span className="empty-stars">
                                                    <i className="star fa fa-star"></i>
                                                    <i className="star fa fa-star"></i>
                                                    <i className="star fa fa-star"></i>
                                                    <i className="star fa fa-star"></i>
                                                    <i className="star fa fa-star"></i>
                                                </span>
                                                <span className="filled-stars" style={{ width: `${item.ratingCourse}%`, }}>
                                                    <i className="star fa fa-star"></i>
                                                    <i className="star fa fa-star"></i>
                                                    <i className="star fa fa-star"></i>
                                                    <i className="star fa fa-star"></i>
                                                    <i className="star fa fa-star"></i>
                                                </span>
                                            </div>
                                            <a href="#"
                                                className="rate-now"
                                                data-toggle="modal"
                                                onClick={() => onRatingCourse(item)}
                                                data-target="#js-md-rate">Rating now!</a>
                                        </div>
                                        <div className="course-actions">
                                            <div className="action-left">
                                                <a href="lesson-detail.html" className="btn btn-sm btn-warning mg-r-10" target="_blank"
                                                    rel="noopener">
                                                    <i className="fas fa-vote-yea mg-r-5"></i> <span>Detail lesson</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
const RatingLessonModal = ({ handleChange, course, state }) => {
    const onHandleChange = (e) => {
        handleChange(e)
    }
    const onSubmitRating = () => {
        console.log(state.ratingCourse);
    }
    return (
        <div className="modal effect-scale" tabIndex="-1" role="dialog" id="js-md-rate">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <form action="" className="">
                        <div className="modal-body">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="tx-danger">Đánh giá buổi học</h4>
                            <div className="image-fb tx-center pd-y-30">
                                <img src="../../assets/img/feedback-image.svg" alt="" className="wd-150" />
                            </div>
                            <p className="mg-b-0 tx-center title">
                                Buổi học của bạn với giáo viên {course.course && course.course.teacher} như thế nào ?</p>
                            <div className="rating">
                                <input type="radio" name="rating" id="rating-5" />
                                <label name="ratingStars" htmlFor="rating-5" onClick={onHandleChange}></label>
                                <input type="radio" name="rating" id="rating-4" />
                                <label name="ratingStars" htmlFor="rating-4" onClick={onHandleChange}></label>
                                <input type="radio" name="rating" id="rating-3" />
                                <label name="ratingStars" htmlFor="rating-3" onClick={onHandleChange}></label>
                                <input type="radio" name="rating" id="rating-2" />
                                <label name="ratingStars" htmlFor="rating-2" onClick={onHandleChange}></label>
                                <input type="radio" name="rating" id="rating-1" />
                                <label name="ratingStars" htmlFor="rating-1" onClick={onHandleChange}></label>
                                <div className="emoji-wrapper">
                                    <div className="emoji">
                                        <svg className="rating-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <circle cx="256" cy="256" r="256" fill="#ffd93b" />
                                            <path
                                                d="M512 256c0 141.44-114.64 256-256 256-80.48 0-152.32-37.12-199.28-95.28 43.92 35.52 99.84 56.72 160.72 56.72 141.36 0 256-114.56 256-256 0-60.88-21.2-116.8-56.72-160.72C474.8 103.68 512 175.52 512 256z"
                                                fill="#f4c534" />
                                            <ellipse transform="scale(-1) rotate(31.21 715.433 -595.455)" cx="166.318" cy="199.829" rx="56.146"
                                                ry="56.13" fill="#fff" />
                                            <ellipse transform="rotate(-148.804 180.87 175.82)" cx="180.871" cy="175.822" rx="28.048" ry="28.08"
                                                fill="#3e4347" />
                                            <ellipse transform="rotate(-113.778 194.434 165.995)" cx="194.433" cy="165.993" rx="8.016"
                                                ry="5.296" fill="#5a5f63" />
                                            <ellipse transform="scale(-1) rotate(31.21 715.397 -1237.664)" cx="345.695" cy="199.819" rx="56.146"
                                                ry="56.13" fill="#fff" />
                                            <ellipse transform="rotate(-148.804 360.25 175.837)" cx="360.252" cy="175.84" rx="28.048" ry="28.08"
                                                fill="#3e4347" />
                                            <ellipse transform="scale(-1) rotate(66.227 254.508 -573.138)" cx="373.794" cy="165.987" rx="8.016"
                                                ry="5.296" fill="#5a5f63" />
                                            <path
                                                d="M370.56 344.4c0 7.696-6.224 13.92-13.92 13.92H155.36c-7.616 0-13.92-6.224-13.92-13.92s6.304-13.92 13.92-13.92h201.296c7.696.016 13.904 6.224 13.904 13.92z"
                                                fill="#3e4347" />
                                        </svg>
                                        <svg className="rating-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <circle cx="256" cy="256" r="256" fill="#ffd93b" />
                                            <path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z"
                                                fill="#f4c534" />
                                            <path
                                                d="M328.4 428a92.8 92.8 0 0 0-145-.1 6.8 6.8 0 0 1-12-5.8 86.6 86.6 0 0 1 84.5-69 86.6 86.6 0 0 1 84.7 69.8c1.3 6.9-7.7 10.6-12.2 5.1z"
                                                fill="#3e4347" />
                                            <path
                                                d="M269.2 222.3c5.3 62.8 52 113.9 104.8 113.9 52.3 0 90.8-51.1 85.6-113.9-2-25-10.8-47.9-23.7-66.7-4.1-6.1-12.2-8-18.5-4.2a111.8 111.8 0 0 1-60.1 16.2c-22.8 0-42.1-5.6-57.8-14.8-6.8-4-15.4-1.5-18.9 5.4-9 18.2-13.2 40.3-11.4 64.1z"
                                                fill="#f4c534" />
                                            <path
                                                d="M357 189.5c25.8 0 47-7.1 63.7-18.7 10 14.6 17 32.1 18.7 51.6 4 49.6-26.1 89.7-67.5 89.7-41.6 0-78.4-40.1-82.5-89.7A95 95 0 0 1 298 174c16 9.7 35.6 15.5 59 15.5z"
                                                fill="#fff" />
                                            <path d="M396.2 246.1a38.5 38.5 0 0 1-38.7 38.6 38.5 38.5 0 0 1-38.6-38.6 38.6 38.6 0 1 1 77.3 0z"
                                                fill="#3e4347" />
                                            <path
                                                d="M380.4 241.1c-3.2 3.2-9.9 1.7-14.9-3.2-4.8-4.8-6.2-11.5-3-14.7 3.3-3.4 10-2 14.9 2.9 4.9 5 6.4 11.7 3 15z"
                                                fill="#fff" />
                                            <path
                                                d="M242.8 222.3c-5.3 62.8-52 113.9-104.8 113.9-52.3 0-90.8-51.1-85.6-113.9 2-25 10.8-47.9 23.7-66.7 4.1-6.1 12.2-8 18.5-4.2 16.2 10.1 36.2 16.2 60.1 16.2 22.8 0 42.1-5.6 57.8-14.8 6.8-4 15.4-1.5 18.9 5.4 9 18.2 13.2 40.3 11.4 64.1z"
                                                fill="#f4c534" />
                                            <path
                                                d="M155 189.5c-25.8 0-47-7.1-63.7-18.7-10 14.6-17 32.1-18.7 51.6-4 49.6 26.1 89.7 67.5 89.7 41.6 0 78.4-40.1 82.5-89.7A95 95 0 0 0 214 174c-16 9.7-35.6 15.5-59 15.5z"
                                                fill="#fff" />
                                            <path d="M115.8 246.1a38.5 38.5 0 0 0 38.7 38.6 38.5 38.5 0 0 0 38.6-38.6 38.6 38.6 0 1 0-77.3 0z"
                                                fill="#3e4347" />
                                            <path
                                                d="M131.6 241.1c3.2 3.2 9.9 1.7 14.9-3.2 4.8-4.8 6.2-11.5 3-14.7-3.3-3.4-10-2-14.9 2.9-4.9 5-6.4 11.7-3 15z"
                                                fill="#fff" />
                                        </svg>
                                        <svg className="rating-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <circle cx="256" cy="256" r="256" fill="#ffd93b" />
                                            <path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z"
                                                fill="#f4c534" />
                                            <path
                                                d="M336.6 403.2c-6.5 8-16 10-25.5 5.2a117.6 117.6 0 0 0-110.2 0c-9.4 4.9-19 3.3-25.6-4.6-6.5-7.7-4.7-21.1 8.4-28 45.1-24 99.5-24 144.6 0 13 7 14.8 19.7 8.3 27.4z"
                                                fill="#3e4347" />
                                            <path d="M276.6 244.3a79.3 79.3 0 1 1 158.8 0 79.5 79.5 0 1 1-158.8 0z" fill="#fff" />
                                            <circle cx="340" cy="260.4" r="36.2" fill="#3e4347" />
                                            <g fill="#fff">
                                                <ellipse transform="rotate(-135 326.4 246.6)" cx="326.4" cy="246.6" rx="6.5" ry="10" />
                                                <path d="M231.9 244.3a79.3 79.3 0 1 0-158.8 0 79.5 79.5 0 1 0 158.8 0z" />
                                            </g>
                                            <circle cx="168.5" cy="260.4" r="36.2" fill="#3e4347" />
                                            <ellipse transform="rotate(-135 182.1 246.7)" cx="182.1" cy="246.7" rx="10" ry="6.5" fill="#fff" />
                                        </svg>
                                        <svg className="rating-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <circle cx="256" cy="256" r="256" fill="#ffd93b" />
                                            <path
                                                d="M407.7 352.8a163.9 163.9 0 0 1-303.5 0c-2.3-5.5 1.5-12 7.5-13.2a780.8 780.8 0 0 1 288.4 0c6 1.2 9.9 7.7 7.6 13.2z"
                                                fill="#3e4347" />
                                            <path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z"
                                                fill="#f4c534" />
                                            <g fill="#fff">
                                                <path
                                                    d="M115.3 339c18.2 29.6 75.1 32.8 143.1 32.8 67.1 0 124.2-3.2 143.2-31.6l-1.5-.6a780.6 780.6 0 0 0-284.8-.6z" />
                                                <ellipse cx="356.4" cy="205.3" rx="81.1" ry="81" />
                                            </g>
                                            <ellipse cx="356.4" cy="205.3" rx="44.2" ry="44.2" fill="#3e4347" />
                                            <g fill="#fff">
                                                <ellipse transform="scale(-1) rotate(45 454 -906)" cx="375.3" cy="188.1" rx="12" ry="8.1" />
                                                <ellipse cx="155.6" cy="205.3" rx="81.1" ry="81" />
                                            </g>
                                            <ellipse cx="155.6" cy="205.3" rx="44.2" ry="44.2" fill="#3e4347" />
                                            <ellipse transform="scale(-1) rotate(45 454 -421.3)" cx="174.5" cy="188" rx="12" ry="8.1"
                                                fill="#fff" />
                                        </svg>
                                        <svg className="rating-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <circle cx="256" cy="256" r="256" fill="#ffd93b" />
                                            <path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z"
                                                fill="#f4c534" />
                                            <path
                                                d="M232.3 201.3c0 49.2-74.3 94.2-74.3 94.2s-74.4-45-74.4-94.2a38 38 0 0 1 74.4-11.1 38 38 0 0 1 74.3 11.1z"
                                                fill="#e24b4b" />
                                            <path
                                                d="M96.1 173.3a37.7 37.7 0 0 0-12.4 28c0 49.2 74.3 94.2 74.3 94.2C80.2 229.8 95.6 175.2 96 173.3z"
                                                fill="#d03f3f" />
                                            <path
                                                d="M215.2 200c-3.6 3-9.8 1-13.8-4.1-4.2-5.2-4.6-11.5-1.2-14.1 3.6-2.8 9.7-.7 13.9 4.4 4 5.2 4.6 11.4 1.1 13.8z"
                                                fill="#fff" />
                                            <path
                                                d="M428.4 201.3c0 49.2-74.4 94.2-74.4 94.2s-74.3-45-74.3-94.2a38 38 0 0 1 74.4-11.1 38 38 0 0 1 74.3 11.1z"
                                                fill="#e24b4b" />
                                            <path
                                                d="M292.2 173.3a37.7 37.7 0 0 0-12.4 28c0 49.2 74.3 94.2 74.3 94.2-77.8-65.7-62.4-120.3-61.9-122.2z"
                                                fill="#d03f3f" />
                                            <path
                                                d="M411.3 200c-3.6 3-9.8 1-13.8-4.1-4.2-5.2-4.6-11.5-1.2-14.1 3.6-2.8 9.7-.7 13.9 4.4 4 5.2 4.6 11.4 1.1 13.8z"
                                                fill="#fff" />
                                            <path
                                                d="M381.7 374.1c-30.2 35.9-75.3 64.4-125.7 64.4s-95.4-28.5-125.8-64.2a17.6 17.6 0 0 1 16.5-28.7 627.7 627.7 0 0 0 218.7-.1c16.2-2.7 27 16.1 16.3 28.6z"
                                                fill="#3e4347" />
                                            <path
                                                d="M256 438.5c25.7 0 50-7.5 71.7-19.5-9-33.7-40.7-43.3-62.6-31.7-29.7 15.8-62.8-4.7-75.6 34.3 20.3 10.4 42.8 17 66.5 17z"
                                                fill="#e24b4b" />
                                        </svg>
                                        <svg className="rating-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <g fill="#ffd93b">
                                                <circle cx="256" cy="256" r="256" />
                                                <path d="M512 256A256 256 0 0 1 56.8 416.7a256 256 0 0 0 360-360c58 47 95.2 118.8 95.2 199.3z" />
                                            </g>
                                            <path
                                                d="M512 99.4v165.1c0 11-8.9 19.9-19.7 19.9h-187c-13 0-23.5-10.5-23.5-23.5v-21.3c0-12.9-8.9-24.8-21.6-26.7-16.2-2.5-30 10-30 25.5V261c0 13-10.5 23.5-23.5 23.5h-187A19.7 19.7 0 0 1 0 264.7V99.4c0-10.9 8.8-19.7 19.7-19.7h472.6c10.8 0 19.7 8.7 19.7 19.7z"
                                                fill="#e9eff4" />
                                            <path
                                                d="M204.6 138v88.2a23 23 0 0 1-23 23H58.2a23 23 0 0 1-23-23v-88.3a23 23 0 0 1 23-23h123.4a23 23 0 0 1 23 23z"
                                                fill="#45cbea" />
                                            <path
                                                d="M476.9 138v88.2a23 23 0 0 1-23 23H330.3a23 23 0 0 1-23-23v-88.3a23 23 0 0 1 23-23h123.4a23 23 0 0 1 23 23z"
                                                fill="#e84d88" />
                                            <g fill="#38c0dc">
                                                <path
                                                    d="M95.2 114.9l-60 60v15.2l75.2-75.2zM123.3 114.9L35.1 203v23.2c0 1.8.3 3.7.7 5.4l116.8-116.7h-29.3z" />
                                            </g>
                                            <g fill="#d23f77">
                                                <path
                                                    d="M373.3 114.9l-66 66V196l81.3-81.2zM401.5 114.9l-94.1 94v17.3c0 3.5.8 6.8 2.2 9.8l121.1-121.1h-29.2z" />
                                            </g>
                                            <path
                                                d="M329.5 395.2c0 44.7-33 81-73.4 81-40.7 0-73.5-36.3-73.5-81s32.8-81 73.5-81c40.5 0 73.4 36.3 73.4 81z"
                                                fill="#3e4347" />
                                            <path
                                                d="M256 476.2a70 70 0 0 0 53.3-25.5 34.6 34.6 0 0 0-58-25 34.4 34.4 0 0 0-47.8 26 69.9 69.9 0 0 0 52.6 24.5z"
                                                fill="#e24b4b" />
                                            <path
                                                d="M290.3 434.8c-1 3.4-5.8 5.2-11 3.9s-8.4-5.1-7.4-8.7c.8-3.3 5.7-5 10.7-3.8 5.1 1.4 8.5 5.3 7.7 8.6z"
                                                fill="#fff" opacity=".2" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <label>Ý kiến của bạn:</label>
                                    <textarea name="note" rows="5" className="form-control" onChange={onHandleChange}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={onSubmitRating}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
const RequireLessonModal = ({ handleChange, state }) => {
    const onHandleChange = (e) => {
        handleChange(e);
    }
    const onSubmitRequire = () => {
        console.log(state.upcomingLesson)
    }
    return (
        <div className="modal effect-scale" tabIndex="-1" role="dialog" id="js-md-required">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <form action="" className="">
                        <div className="modal-body">
                            <div className="cr-item lesson-info">
                                <div className="media">
                                    <div className="teacher-information">
                                        <a className="teacher-avatar" href="#">
                                            <img src={state.upcomingLesson.images} className="teacher-image" alt="" />
                                            <p className="course-teacher tx-14 tx-gray-800 tx-normal mg-b-0 tx-center mg-t-5 d-block">
                                                {state.upcomingLesson.teacher}</p>
                                        </a>
                                    </div>
                                    <div className="media-body  mg-l-20 pos-relative pd-b-0-f">
                                        <h5 className="mg-b-10">
                                            <span className="badge badge-warning">Incoming</span>
                                            <a href="lesson-detail.html" className="course-name tx-bold">{state.upcomingLesson.courseName}</a>
                                        </h5>
                                        <div className="course-information tx-14">
                                            <span className="mg-r-15 tx-gray-600 tx-medium"><i className="fa fa-calendar  tx-info mg-r-5"></i>
                                            {convertDay(state.upcomingLesson.date) + ' ' + state.upcomingLesson.date}</span>
                                            <span className="mg-r-15 tx-gray-600 tx-medium"><i className="fa fa-clock  tx-info mg-r-5"></i>
                                            {`Start: ${state.upcomingLesson.startTime} ${convertTime(state.upcomingLesson.startTime)}`}</span>
                                            <span className="mg-r-15 tx-gray-600 tx-medium"><i className="fa fa-clock  tx-info mg-r-5"></i>
                                            {`End: ${state.upcomingLesson.endTime} ${convertTime(state.upcomingLesson.endTime)}`}</span>
                                        </div>
                                        <div className="course-note mg-t-15">
                                            <h6 className="mg-b-3">Lesson notes:</h6>
                                            <p className="tx-14 mg-b-0"> {state.upcomingLesson.note} </p>
                                        </div>
                                        <div className="course-docs mg-t-15">
                                            <h6 className="mg-b-3">Documents:</h6>
                                            <div className="docs-lists">
                                                {
                                                    state.upcomingLesson.document.map((doc, index) => {
                                                        return <a key={index} href="#" className="file-doc"><i className="fa fa-file mg-r-3"></i>
                                                            <span className="file-name">{doc.split('.')[0]}</span>
                                                            <span className="file-ext">{`.${doc.split('.')[1]}`}</span>
                                                        </a>
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="required-list mg-t-15 bd-t pd-t-15">
                                            <ul className="list list-unstyled pd-l-0">
                                                {
                                                    state.upcomingLesson.require.map((item,index)=>{
                                                        return (
                                                            <li key={index}>
                                                                <div className="custom-control custom-checkbox">
                                                                    <input type="checkbox" id={`requied ${index}`} name="selectedRequire" className="custom-control-input" onChange={onHandleChange} value={item}/>
                                                                    <label className="custom-control-label" htmlFor={`requied ${index}`}>{item}</label>
                                                                </div>
                                                            </li> 
                                                        )
                                                    })
                                                }
                                            </ul>
                                            <div className="required-text-box mg-t-15">
                                                <label className="tx-medium">Note for teachers:</label>
                                                <div className="form-group">
                                                    <textarea name="noteForTeacher" id="" rows="4" className="form-control" defaultValue={state.upcomingLesson.noteForTeacher} onChange={onHandleChange}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={onSubmitRequire}>Request</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
const Dashboard = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const onRatingCourse = (course) => {
        let key = 'course'
        let value = course
        dispatch({ type: "RATING_COURSE", payload: { key, value } })
    }

    const onHandleChangeRating = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ?
            target.checked :
            (target.getAttribute("name") === 'ratingStars' ?
                parseInt(target.getAttribute('for').split('-')[1]) :
                target.value);

        const key = target.getAttribute("name");
        dispatch({ type: "RATING_COURSE", payload: { key, value } })
    }

    const onHandleChangeRequire = (e) => {
        const target = e.target;
        let value;
        if(target.type === 'checkbox') {
            value = state.upcomingLesson.selectedRequire;
            if (target.checked) {
                value.push(target.value)
            }
            else {
                const index = state.upcomingLesson.require.indexOf(target.value);
                value.splice(index,1);
            }
        }
        else value = target.value;
        const key = target.getAttribute("name");
        dispatch({ type: "REQUIRE_COURSE", payload: { key, value } })
    }

    return (
        <React.Fragment>
            <div className="content content-fixed">
                <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0 dashboard-page">
                    <div className="media d-block d-lg-flex">
                        <div className="profile-sidebar pd-lg-r-25">
                            <div className="user__infomation d-flex d-lg-block flex-wrap">
                                <div className="col-sm-12 col-md-6 col-lg-12 mg-b-20">
                                    <div className="avatar avatar-xxl avatar-online"><img src="../../assets/img/teacher.jpg"
                                        className="rounded-circle" alt="" /></div>
                                    <h5 className="mg-b-2 tx-spacing--1 mg-t-15">Trần Lê Phương Quyên</h5>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-12  ">
                                    <label className="tx-sans tx-10 tx-semibold tx-uppercase tx-color-01 tx-spacing-1 mg-b-15">Contact Information</label>
                                    <ul className="list-unstyled profile-info-list mg-b-10">
                                        <li><i data-feather="home"></i><span className="">Gia Lai</span></li>
                                        <li><i data-feather="phone"></i><a href="tel:0987654321">0987654321</a></li>
                                        <li><i data-feather="mail"></i><a href="mailto:example@gmail.com">example@gmail.com</a></li>
                                    </ul>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-12 mg-t-20 mg-sm-t-0 mg-lg-t-25">
                                    <div className="d-flex mg-b-25">
                                        <a className="btn btn-xs btn-primary flex-fill mg-r-2 bg-orange tx-white" href="book-lesson.html">Book a Lesson</a>
                                    </div>
                                </div>
                            </div>
                            <div className="user__navigation">
                                <div className="col-sm-6 col-md-5 col-lg-12 mg-t-20">
                                    <label className="tx-sans tx-10 tx-semibold tx-uppercase tx-color-01 tx-spacing-1 mg-b-15">Navigation</label>
                                    <ul className="list-unstyled profile-info-list course mg-b-10">
                                        <li><i data-feather="user"></i><a href="profile.html">My Page</a></li>
                                        <li><i data-feather="aperture"></i><a href="index.html">DashBoard</a></li>
                                        <li><i data-feather="bell"></i><a href="notification.html">Notification</a></li>
                                        <li><i data-feather="calendar"></i><a href="booked-lesson.html">Booked Lessons</a></li>
                                        <li><i data-feather="calendar"></i><a href="lesson-history.html">Lesson History</a></li>
                                        <li><i data-feather="message-circle"></i><a href="feedback.html">FeedBack</a></li>
                                        <li><i data-feather="message-square"></i><a href="faq.html">FAQ</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="media-body mg-t-30 mg-lg-t-0 pd-lg-x-10">
                            <div className="overall__summary">
                                <ul className="top-step animated fadeInDown">
                                    <li className="top-step-item "><span className="item-count">10</span>
                                        <div className="item-title">Booked Lessons</div>
                                    </li>
                                    <li className="top-step-item "><span className="item-count">2</span>
                                        <div className="item-title">Canceled Lessons</div>
                                    </li>
                                    <li className="top-step-item "><span className="item-count">2</span>
                                        <div className="item-title">Truant Lessons</div>
                                    </li>
                                    <li className="top-step-item "><span className="item-count">2</span>
                                        <div className="item-title">Remaining Lessons</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="lesson mg-t-45 animated fadeInUp am-animation-delay-1">
                                <div className="d-xl-flex align-items-center justify-content-between ">
                                    <h4 className="mg-b-0 gradient-heading"><i className="fas fa-fire"></i> UPCOMING LESSON</h4>
                                </div>
                                <div className="course-horizental mg-t-20">
                                    <ul className="list-wrap">
                                        <li className="cr-item lesson-info">
                                            <div className="media">
                                                <div className="teacher-information">
                                                    <a className="teacher-avatar" href="#">
                                                        <img src={state.upcomingLesson.images} className="teacher-image" alt="" />
                                                        <p className="course-teacher tx-14 tx-gray-800 tx-normal mg-b-0 tx-center mg-t-5 d-block">
                                                            {state.upcomingLesson.teacher}
                                                        </p>
                                                    </a>
                                                </div>
                                                <div className="media-body  mg-l-20 pos-relative">
                                                    <h5 className="mg-b-10">
                                                        <span className="badge badge-warning">Incoming</span>{' '}
                                                        <a href="lesson-detail.html" className="course-name tx-bold">{state.upcomingLesson.courseName}</a>
                                                    </h5>
                                                    <div className="course-information tx-14">
                                                        <span className="mg-r-15 tx-gray-600 tx-medium"><i className="fa fa-calendar  tx-info mg-r-5"></i>
                                                            {convertDay(state.upcomingLesson.date) + ' ' + state.upcomingLesson.date}</span>
                                                        <span className="mg-r-15 tx-gray-600 tx-medium"><i className="fa fa-clock  tx-info mg-r-5"></i> {`Start: ${state.upcomingLesson.startTime} ${convertTime(state.upcomingLesson.startTime)}`}</span>
                                                        <span className="mg-r-15 tx-gray-600 tx-medium"><i className="fa fa-clock  tx-info mg-r-5"></i> {`End: ${state.upcomingLesson.endTime} ${convertTime(state.upcomingLesson.endTime)}`}</span>
                                                    </div>
                                                    <div className="course-note mg-t-15">
                                                        <h6 className="mg-b-3">Lesson notes:</h6>
                                                        <p className="tx-14 mg-b-0">{state.upcomingLesson.note}</p>
                                                    </div>
                                                    <div className="course-docs mg-t-15">
                                                        <h6 className="mg-b-3">Documents:</h6>
                                                        <div className="docs-lists">
                                                            {
                                                                state.upcomingLesson.document.map((doc, index) => {
                                                                    return <a key={index} href="#" className="file-doc"><i className="fa fa-file mg-r-3"></i>
                                                                        <span className="file-name">{doc.split('.')[0]}</span>
                                                                        <span className="file-ext">{`.${doc.split('.')[1]}`}</span>
                                                                    </a>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="course-actions">
                                                        <div className="action-left">
                                                            <a href={state.upcomingLesson.skype} className="btn btn-sm btn-info mg-r-10" target="_blank"
                                                                rel="noopener"><i className="fab fa-skype mg-r-5"></i> ID: <span
                                                                    className="tx-bold">mona.media</span></a>
                                                            <a href="#js-md-required" className="btn btn-sm btn-success" data-toggle="modal"><i
                                                                className="fas fa-edit mg-r-5"></i> Checking lesson booking </a>
                                                        </div>
                                                        <div className="action-right">
                                                            <a href="https://skype.com" className="btn btn-sm btn-outline-danger" target="_blank"
                                                                rel="noopener" data-toggle="tooltip"
                                                                title="You can only cancel this lesson before start for 30 minutes !!"
                                                                data-placement="top"><i data-feather="x"></i> Cancel lesson</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="lesson mg-t-45 animated fadeInUp am-animation-delay-2">
                                <div className="d-xl-flex align-items-center justify-content-between ">
                                    <h4 className="mg-b-0 gradient-heading"><i className="fas fa-file"></i>LESSON HISTORY</h4>
                                    <a href="#" className="link">View all history</a>
                                </div>
                                <LessonHistory ratingCourse={onRatingCourse} state={state} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RatingLessonModal course={state.ratingCourse} state={state} handleChange={onHandleChangeRating} />
            <RequireLessonModal state={state} handleChange={onHandleChangeRequire}/>
        </React.Fragment>
    )
}

ReactDOM.render(<Dashboard />, document.getElementById('react-account-dashboard'));