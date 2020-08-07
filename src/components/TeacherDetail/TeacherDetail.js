import React from 'react';
import ReactDOM from 'react-dom';
import StudentComment from "../common/StudentComment/StudentComment"
import BookingSchedule from "./BookingSchedule"
import BookingScheduleMobile from "./BookingScheduleMobile"
import TeacherInformation from "./TeacherInformation"
import CancelBookingLessonModal from "~components/CancelBookingLessonModal"
import BookingLessonModal from "~components/BookingLessonModal"
import SkeletonLessonCard from "~components/common/Skeleton/SkeletonLessonCard"

import { nationMapToFlag, randomId } from '~src/utils'
import { getTeacherInfo } from "~src/api/studentAPI"

import { ToastContainer } from 'react-toastify'
import styles from '~components/TeacherDetail/TeacherDetail.module.scss';

const width = window?.innerWidth;

const initialCancelLesson = {
  BookingID: "",
  LessionName: "",
  date: "",
  start: "",
  end: "",
}

const initialBookLesson = {
  StudyTimeID: "",
  LessionName: "",
  TeacherUID: "",
  TeacherIMG: "",
  TeacherName: "",
  Rate: null,
  date: "",
  start: "",
  end: "",
}

const initialOnBookState = {
  id: null,
}

const initialOnCancelState = {
  id: null,
}

const TeacherDetail = () => {
  const [state, setState] = React.useState(null)
  const [stateCancelLesson, setStateCancelLesson] = React.useState(initialCancelLesson);
  const [stateBookLesson, setStateBookLesson] = React.useState(initialBookLesson);
  const [onBookState, setOnBookState] = React.useState(initialOnBookState)
  const [onCancelState, setOnCancelState] = React.useState(initialOnCancelState)
  const [loading, setLoading] = React.useState(false);
  const [showTab, setShowTab] = React.useState(2);

  const getAPI = async (params) => {
    setLoading(true);
    const res = await getTeacherInfo(params);
    if (res.Code === 1) {
      setState(res.Data)
      $('#js-video-modal iframe').attr('src', res.Data.LinkVideoIntroduce);
    }
    setLoading(false);
  }

  const onHandleBookLesson = (StudyTimeID, LessionName, date, start, end) => {
    setStateBookLesson({
      ...stateBookLesson,
      StudyTimeID,
      LessionName,
      TeacherUID: state && state.TeacherUID,
      TeacherIMG: state && state.TeacherIMG,
      TeacherName: state && state.TeacherName,
      date,
      start,
      end,
    })
  }

  const onBook = (TeacherUID, StudyTimeID, date, status) => {
    setOnBookState({
      id: randomId(),
    })
  }

  const onCancel = (id, status) => {
    if (status == 1)
      setOnCancelState({
        id,
      })
    else if (status == 0) {
      setOnCancelState({
        id: "fail",
      })
    }
  }

  const onHandleCancelLesson = (BookingID, LessionName, date, start, end) => {
    setStateCancelLesson({
      ...stateCancelLesson,
      BookingID,
      LessionName,
      date,
      start,
      end
    })
  }

  React.useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let ID = params.get('ID');
    getAPI({
      TeacherUID: ID,
    })
  }, [])

  return loading ? <SkeletonLessonCard /> : <>
    {
      <div className="teacher__detail__wrap shadow card-box">
        <div className="teacher__detail">
          <div className="teacher-header">
            <div className="teacher-avatar">
              <img src={!!state && state.TeacherIMG ? state.TeacherIMG : "../assets/img/default-avatar.png"}
                 onError={(e)=>{e.target.onerror = null; e.target.src="../assets/img/default-avatar.png"}}
                 alt="avatar" />
            </div>
            {
              !!state && <div className="teacher-info">
                <div className="teacher-name">
                  <h5 className="name">{state.TeacherName}</h5>
                  <div className="nation">
                    <span className={`flag-icon flag-icon-${state.TeacherNational ? nationMapToFlag(state.TeacherNational) : "vn"} flag-icon-squared mg-r-5`}></span>
                    <span className="badge badge-light"><span className="tx-success"><i
                      className="fa fa-check-circle"></i> Verified</span></span>
                  </div>
                </div>
                <div className="teacher-summary">
                  <a href="#js-video-modal"
                    data-toggle="modal"
                    data-target="#js-video-modal"
                    data-src={state.LinkVideoIntroduce}
                    className="tx-primary" id="video-teacher"><i className="fas fa-play-circle mg-r-5"></i>Xem video giới thiệu</a>
                  <p className="mg-b-0 mg-t-10">{state.IntroduceContent}</p>
                </div>
              </div>
            }
          </div>
          <div className="teacher-body">
            <div className="tab-navigation">
              <ul className="list-tab align-items-stretch" id="js-list-tab">
                <li className="tab-item h-auto">
                  <a href={"#"} className={`${showTab === 1 ? 'active' : ''} tab-link h-100`}
                    data-index="0"
                    onClick={(e) => { e.preventDefault(); setShowTab(1) }}>
                    <i className="fas fa-user mg-r-5"></i>TEACHER INFORMATION</a>
                </li>
                <li className="tab-item h-auto">
                  <a href={"#"} className={`${showTab === 2 ? 'active' : ''} tab-link h-100`}
                    data-index="1"
                    onClick={(e) => { e.preventDefault(); setShowTab(2) }}>
                    <i className="fas fa-calendar mg-r-5"></i>BOOKING SCHEDULE</a>
                </li>
                <li className="tab-item h-auto">
                  <a href={"#"} className={`${showTab === 3 ? 'active' : ''} tab-link h-100`}
                    data-index="2"
                    onClick={(e) => { e.preventDefault(); setShowTab(3) }}>
                    <i className="fas fa-comment mg-r-5"></i>STUDENT COMMENT</a>
                </li>
              </ul>
            </div>
            <div className="tab-navigation-content">
              <div className="swiper-container" id="js-teacher__info">
                <div className="teacher__info-wrap swiper-wrapper">
                  <div className={`${showTab === 1 ? 'active' : ''} swiper-slide`}>
                    <div className="slide-tab-content">
                      <TeacherInformation
                        IntroduceContent={!!state && state.IntroduceContent}
                        Experience={!!state && state.Experience}
                        Certificate={!!state && state.Certificate} />
                    </div>
                  </div>
                  <div className={`${showTab === 2 ? 'active' : ''} swiper-slide`}>
                    <div className="slide-tab-content">
                      {
                        !!state && state.TeacherUID && (width > 768 ?
                        <BookingSchedule
                          TeacherUID={!!state && state.TeacherUID}
                          onBookingId={onBookState.id}
                          onCancelId={onCancelState.id}
                          handleBookLesson={onHandleBookLesson}
                          handleCancelLesson={onHandleCancelLesson} /> :

                        <BookingScheduleMobile
                          TeacherUID={!!state && state.TeacherUID}
                          onBookingId={onBookState.id}
                          handleBookLesson={onHandleBookLesson} />)
                      }
                      <div className="note mg-t-30">
                        <h5 className="sub-title"><i className="fas fa-sticky-note"></i>Notes:</h5>
                        <div className="introduce-content">
                          <ul className="note-list">
                            <li className="mg-b-10">Each session is 50 minutes</li>
                            <li className="mg-b-10">To book a lesson, simply select the time frame and click the "Book" button</li>
                            <li className="mg-b-10">You can only BOOK a lesson 30 minutes before the lesson starts.</li>
                            <li className="mg-b-10">You can only CANCEL the lesson 30 minutes before the className starts.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`${showTab === 3 ? 'active' : ''} swiper-slide`}>
                    <div className="slide-tab-content">
                      {
                        showTab == 3 && <StudentComment TeacherUID={!!state && state.TeacherUID}/>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CancelBookingLessonModal
          BookingID={stateCancelLesson.BookingID}
          LessionName={stateCancelLesson.LessionName}
          date={stateCancelLesson.date}
          start={stateCancelLesson.start}
          end={stateCancelLesson.end}
          callback={onCancel} />

        <BookingLessonModal
          StudyTimeID={stateBookLesson.StudyTimeID}
          LessionName={stateBookLesson.LessionName}
          TeacherUID={stateBookLesson.TeacherUID}
          TeacherIMG={stateBookLesson.TeacherIMG}
          TeacherName={stateBookLesson.TeacherName}
          Rate={stateBookLesson.Rate}
          date={stateBookLesson.date}
          start={stateBookLesson.start}
          end={stateBookLesson.end}
          onBook={onBook} />
          
        <ToastContainer />
      </div>
    }
  </>
}

ReactDOM.render(<TeacherDetail />, document.getElementById("react-teacher-detail"));
