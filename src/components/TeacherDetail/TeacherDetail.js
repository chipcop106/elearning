import React from 'react';
import ReactDOM from 'react-dom';
import StudentComment from "./StudentComment"
import BookingSchedule from "./BookingSchedule"
import TeacherInformation from "./TeacherInformation"
import CancelBookingLessonModal from "~components/CancelBookingLessonModal"
import BookingLessonModal from "~components/BookingLessonModal"
import SkeletonLessonCard from "~components/common/Skeleton/SkeletonLessonCard"

import { nationMapToFlag, randomId } from '~src/utils'

const initialState = {
  TeacherUID: 1,
  TeacherName: "Huỳnh Thị Lan Anh",
  TeacherIMG: "https://theamericanschool.edu.vn/wp-content/uploads/2020/01/Ms-Hong-Nguyen-Vietnamese.jpg",
  nation: "U.S.",
  LinkVideoIntroduce: "https://www.youtube.com/embed/mJzpX_YrC10",
  IntroduceContent: "I have been teaching English as a foreign language for almost ten years. I have taught English in Japan, Thailand, India, Mexico, and Italy. Teaching English is my passion, and I love being able to connect with people from all over the world. My hobbies include cooking and anything to do with nature.",
  Experience: [
    {
      Date: "08/2019 - 11/2019",
      ExperienceName: "English Teaching Assisstant",
      ExperienceContent: "Prepared teaching materials and supported the foreign teachers. - Managed the class, helped the students finish their homework and difficulties during the lessons."
    }, {
      Date: "11/2019 - Present",
      ExperienceName: "Tester and Academic supporter",
      ExperienceContent: "Check the teaching ability of teachers and English level of students. - Support the foreign teachers during the class due to technical issues or teaching materials,.. - Prepared the flow of lessons everyday."
    }
  ],
  Certificate: [{
    Date: "2015",
    CertificateName: "Teaching English to Speakers of Other Languages (TESOL)",
    CertificateContent: "Madision School of Professional Development"
}],
  schedule: [{
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
  }],
}

const initialCancelLesson = {
  id: "",
  name: "",
  date: "",
  start: "",
  end: "",
}

const initialBookLesson = {
  id: "",
  name: "",
  date: "",
  start: "",
  end: "",
}

const TeacherDetail = () => {
  const [state, setState] = React.useState(initialState)
  const [stateCancelLesson, setStateCancelLesson] = React.useState(initialCancelLesson);
  const [stateBookLesson, setStateBookLesson] = React.useState(initialBookLesson);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);


  const onHandleBookLesson = (id, name, date, start, end) => {
    setStateBookLesson({
      ...stateBookLesson,
      id,
      name,
      date,
      start,
      end
    })
  }

  const onHandleCancelLesson = (id, name, date, start, end) => {
    setStateCancelLesson({
      ...stateCancelLesson,
      id,
      name,
      date,
      start,
      end
    })
  }

  React.useEffect(()=>{
    $('#js-video-modal iframe').attr('src',state.LinkVideoIntroduce);
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
                      schedule={state.schedule}
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
        LessionName={stateCancelLesson.name}
        date={stateCancelLesson.date}
        start={stateCancelLesson.start}
        end={stateCancelLesson.end} />

      <BookingLessonModal
        id={stateBookLesson.id}
        LessionName={stateBookLesson.name}
        date={stateBookLesson.date}
        start={stateBookLesson.start}
        end={stateBookLesson.end} />
    </div>
  )
}

ReactDOM.render(<TeacherDetail />, document.getElementById("react-teacher-detail"));
