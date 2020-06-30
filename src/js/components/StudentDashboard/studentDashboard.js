import LessonHistory from "./LessonHistory";
import RatingLessonModal from "./RatingLessonModal";
import RequireLessonModal from "./RequireLessonModal";

import { convertTime } from "../../utils.js";
import { convertDay } from "../../utils.js";

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
        selectedRequire: [],
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
        if (target.type === 'checkbox') {
            value = state.upcomingLesson.selectedRequire;
            if (target.checked) {
                value.push(target.value)
            }
            else {
                const index = state.upcomingLesson.require.indexOf(target.value);
                value.splice(index, 1);
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
            <RequireLessonModal state={state} handleChange={onHandleChangeRequire} />
        </React.Fragment>
    )
}
ReactDOM.render(<Dashboard />, document.getElementById('react-account-dashboard'));