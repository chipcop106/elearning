import React from 'react';
import ReactDOM from 'react-dom';
import StudentComment from "./StudentComment"
import BookingSchedule from "./BookingSchedule"
import TeacherInformation from "./TeacherInformation"
import CancelBookingLessonModal from "~components/CancelBookingLessonModal"
import BookingLessonModal from "~components/BookingLessonModal"
import SkeletonLessonCard from "~components/common/Skeleton/SkeletonLessonCard"

import { nationMapToFlag, randomId } from '~src/utils'
import { getTeacherInfo } from "~src/api/studentAPI"

const initialState = {}

const schedule = [{
    id: randomId(),
    day: "23/7/2020",
    courseName: "English For Today",
    timeStart: "12:30",
    timeEnd: "13:00",
    status: "available",
  }, {
    id: randomId(),
    day: "23/7/2020",
    courseName: "English For Today",
    timeStart: "13:30",
    timeEnd: "14:00",
    status: "available",
  }, {
    id: randomId(),
    day: "23/7/2020",
    courseName: "English For Today",
    timeStart: "08:00",
    timeEnd: "08:30",
    status: "available",
  }, {
    id: randomId(),
    day: "23/7/2020",
    courseName: "English For Today",
    timeStart: "20:30",
    timeEnd: "21:00",
    status: "available",
  }, {
    id: randomId(),
    day: "24/7/2020",
    courseName: "TOEIC Basic",
    timeStart: "01:30",
    timeEnd: "02:00",
    status: "booked",
    student: "Hoàng Văn Thái"
  }, {
    id: randomId(),
    day: "24/7/2020",
    courseName: "Grammar",
    timeStart: "12:30",
    timeEnd: "13:00",
    status: "available",
  }, {
    id: randomId(),
    day: "24/7/2020",
    courseName: "TOEIC Advanced",
    timeStart: "15:30",
    timeEnd: "16:00",
    status: "available",
  }, {
    id: randomId(),
    day: "23/7/2020",
    courseName: "IELTS 6.0",
    timeStart: "09:30",
    timeEnd: "10:00",
    status: "booked",
    student: "Hoàng Văn Thái"
  }, {
    id: randomId(),
    day: "08/7/2020",
    courseName: "IELTS 6.0",
    timeStart: "15:30",
    timeEnd: "16:00",
    status: "booked",
    student: "Hoàng Văn Thái"
  }]


const initialCancelLesson = {
  id: "",
  LessionName: "",
  date: "",
  start: "",
  end: "",
}

const initialBookLesson = {
  id: "",
  LessionName: "",
  date: "",
  start: "",
  end: "",
}

const TeacherDetail = () => {
  const [state, setState] = React.useState(initialState)
  const [stateCancelLesson, setStateCancelLesson] = React.useState(initialCancelLesson);
  const [stateBookLesson, setStateBookLesson] = React.useState(initialBookLesson);

  const [loading, setLoading] = React.useState(false);


  const getAPI = async () => {
    setLoading(true);
    const teacher = await getTeacherInfo({
      TeacherUID: 1,
    });
    setState(teacher.Data)
    console.log(teacher.Data)
    setLoading(false);
    $('#js-video-modal iframe').attr('src',teacher.Data.LinkVideoIntroduce);
  }

  const onHandleBookLesson = (id, LessionName, date, start, end) => {
    setStateBookLesson({
      ...stateBookLesson,
      id,
      LessionName,
      date,
      start,
      end
    })
  }

  const onHandleCancelLesson = (id, LessionName, date, start, end) => {
    setStateCancelLesson({
      ...stateCancelLesson,
      id,
      LessionName,
      date,
      start,
      end
    })
  }

  React.useEffect(()=>{
    getAPI()
  },[])

  return (
    <div className="teacher__detail__wrap card-box">
      <div className="teacher__detail">
        {
          loading ? <SkeletonLessonCard /> :
            <div className="teacher-header">
              <div className="teacher-avatar">
                <img src={state.TeacherIMG} alt="avatar" />
              </div>
              <div className="teacher-info">
                <div className="teacher-name">
                  <h5 className="name">{state.TeacherName}</h5>
                  <div className="nation">
                    <span className={`flag-icon flag-icon-${nationMapToFlag(state.nation)} flag-icon-squared mg-r-5`}></span>
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
        }
        <div className="teacher-body">
          <div className="tab-navigation">
            <ul className="list-tab" id="js-list-tab">
              <li className="tab-item">
                <a href={"#"} className="tab-link active" data-index="0">TEACHER INFORMATION</a>
              </li>
              <li className="tab-item">
                <a href={"#"} className="tab-link " data-index="1">BOOKING SCHEDULE</a>
              </li>
              <li className="tab-item">
                <a href={"#"} className="tab-link " data-index="2">STUDENT COMMENT</a>
              </li>
            </ul>
          </div>
          <div className="tab-navigation-content">
            <div className="swiper-container" id="js-teacher__info">
              <div className="teacher__info-wrap swiper-wrapper">
                <div className="swiper-slide">
                  <div className="slide-tab-content">
                    <TeacherInformation
                      IntroduceContent={state.IntroduceContent}
                      Experience={state.Experience}
                      Certificate={state.Certificate} />
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="slide-tab-content">
                    <BookingSchedule
                      /* schedule={state.schedule} */
                      schedule={schedule}
                      handleBookLesson={onHandleBookLesson}
                      handleCancelLesson={onHandleCancelLesson} />
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="slide-tab-content">
                    <StudentComment />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CancelBookingLessonModal
        id={stateCancelLesson.id}
        LessionName={stateCancelLesson.LessionName}
        date={stateCancelLesson.date}
        start={stateCancelLesson.start}
        end={stateCancelLesson.end} />

      <BookingLessonModal
        id={stateBookLesson.id}
        LessionName={stateBookLesson.LessionName}
        date={stateBookLesson.date}
        start={stateBookLesson.start}
        end={stateBookLesson.end} />
    </div>
  )
}

ReactDOM.render(<TeacherDetail />, document.getElementById("react-teacher-detail"));
