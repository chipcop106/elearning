import React from 'react';
import ReactDOM from 'react-dom';
import StudentComment from "../common/StudentComment/StudentComment"
import BookingSchedule from "./BookingSchedule"
import TeacherInformation from "./TeacherInformation"
import CancelBookingLessonModal from "~components/CancelBookingLessonModal"
import BookingLessonModal from "~components/BookingLessonModal"
import SkeletonLessonCard from "~components/common/Skeleton/SkeletonLessonCard"

import { nationMapToFlag } from '~src/utils'
import { getTeacherInfo } from "~src/api/studentAPI"

import { ToastContainer } from 'react-toastify'
import styles from '~components/TeacherDetail/TeacherDetail.module.scss';

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
  id: "",
  studentName: "",
}

const initialOnCancelState = {
  id: "",
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
      TeacherUID: state.TeacherUID,
      TeacherIMG: state.TeacherIMG,
      TeacherName: state.TeacherName,
      date,
      start,
      end,
    })
  }

  const onBook = (id, studentName) => {
    setOnBookState({
      ...onBookState,
      id,
      studentName
    })
  }

  const onCancel = (id, result) => {
    if (result === 1) {
      setOnCancelState({
        id,
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
    getAPI({
      TeacherUID: 1,
    })
  }, [])

  return loading ? <SkeletonLessonCard /> : <>
    {
      !!state && <div className="teacher__detail__wrap card-box">
        <div className="teacher__detail">
          <div className="teacher-header">
            <div className="teacher-avatar">
              <img src={state.TeacherIMG} alt="avatar" />
            </div>
            <div className="teacher-info">
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
                  className="tx-primary" id="video-teacher"><i className="fas fa-play-circle "></i>Xem video giới thiệu</a>
                <p className="mg-b-0 mg-t-10">{state.IntroduceContent}</p>
              </div>
            </div>
          </div>
          <div className="teacher-body">
            <div className="tab-navigation">
              <ul className="list-tab" id="js-list-tab">
                <li className="tab-item">
                  <a href={"#"} className={`${showTab === 1 ? 'active' : ''} tab-link`}
                    data-index="0"
                    onClick={(e) => { e.preventDefault(); setShowTab(1) }}>TEACHER INFORMATION</a>
                </li>
                <li className="tab-item">
                  <a href={"#"} className={`${showTab === 2 ? 'active' : ''} tab-link`}
                    data-index="1"
                    onClick={(e) => { e.preventDefault(); setShowTab(2) }}>BOOKING SCHEDULE</a>
                </li>
                <li className="tab-item">
                  <a href={"#"} className={`${showTab === 3 ? 'active' : ''} tab-link`}
                    data-index="2"
                    onClick={(e) => { e.preventDefault(); setShowTab(3) }}>STUDENT COMMENT</a>
                </li>
              </ul>
            </div>
            <div className="tab-navigation-content">
              <div className="swiper-container" id="js-teacher__info">
                <div className="teacher__info-wrap swiper-wrapper">
                  <div className={`${showTab === 1 ? 'active' : ''} swiper-slide`}>
                    <div className="slide-tab-content">
                      <TeacherInformation
                        IntroduceContent={state.IntroduceContent}
                        Experience={state.Experience}
                        Certificate={state.Certificate} />
                    </div>
                  </div>
                  <div className={`${showTab === 2 ? 'active' : ''} swiper-slide`}>
                    <div className="slide-tab-content">
                      <BookingSchedule
                        onBookId={onBookState.id}
                        onBookStudentName={onBookState.studentName}
                        onCancelId={onCancelState.id}
                        handleBookLesson={onHandleBookLesson}
                        handleCancelLesson={onHandleCancelLesson} />
                    </div>
                  </div>
                  <div className={`${showTab === 3 ? 'active' : ''} swiper-slide`}>
                    <div className="slide-tab-content">
                      <StudentComment TeacherUID={state.TeacherUID}/>
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
