import React from 'react';
import ReactDOM from 'react-dom';

import LessonHistoryCard from "./LessonHistoryCard"
import LessonUpcomingCard from "./LessonUpcomingCard"

import RatingLessonModal from "./RatingLessonModal"
import RequireLessonModal from "./RequireLessonModal"
import CancelBookingLessonModal from "../CancelBookingLessonModal"

import SkeletonLessonCard from '../common/Skeleton/SkeletonLessonCard';

import { randomId } from "../../utils.js"

import {getLessons} from '~src/api/studentAPI'

let initialState = {
  upcomingLesson: [{
    id: randomId(),
    teacher: "Hoàng Thị Uyên Phương",
    images: "https://image.engoo.com/teacher/15867/p2872.jpg",
    courseName: "IELST - Professional",
    date: "03/07/2020",
    startTime: "12:30",
    endTime: "13:00",
    note: "Prepare speaking topic",
    documents: ["ReadingSpeaking.doc", "Listening.doc"],
    skype: "http://skype.com/abc",
  }, {
    id: randomId(),
    teacher: "Hoàng Văn Thái",
    images: "https://images.unsplash.com/photo-1593087989983-e887d642a19c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    courseName: "IELST - Beginner",
    date: "11/07/2020",
    startTime: "10:30",
    endTime: "11:00",
    note: "Prepare speaking topic",
    documents: ["ReadingSpeaking.doc", "Listening.doc"],
    skype: "http://skype.com/abc",
  }],
  lessonHistory: [{
    id: randomId(),
    teacher: "Hoàng Thị Uyên Phương",
    images: "https://image.engoo.com/teacher/15867/p2872.jpg",
    courseName: "IELST - Professional",
    date: "24/06/2020",
    startTime: "10:30",
    endTime: "11:00",
    note: "Student have a good speaking skill",
    ratingCourse: "90",
  }, {
    id: randomId(),
    teacher: "Hoàng Văn Thái",
    images: "https://images.unsplash.com/photo-1593087989983-e887d642a19c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    courseName: "IELST - Beginner",
    date: "15/06/2020",
    startTime: "10:00",
    endTime: "14:00",
    note: "Student have a good speaking skill",
    ratingCourse: "75",
  }],
}

const initialCancelLesson = {
  id:"",
  name:"",
  date: "",
  start: "",
  end: "",
}

const initialRatingLesson = {
  id:"",
  teacher: "",
}

const initialRequireLesson = {
  id:"",
 avatar:"",
 teacher:"",
 name:"",
 note:"",
 date:"",
 start:"",
 end:"",
 documents:"",
 skype:"",
}

const Dashboard = () => {
  const [state, setState] = React.useState(initialState);
   const [stateCancelLesson, setStateCancelLesson] = React.useState(initialCancelLesson);
    const [stateRatingLesson, setStateRatingLesson] = React.useState(initialRatingLesson);
    const [stateRequireLesson, setStateRequireLesson] = React.useState(initialRequireLesson);
   const [loading, setLoading] = React.useState(false)

   const handleRatingLesson = (id, teacher) => {
    setStateRatingLesson({...stateRatingLesson,
      id,
      teacher})
  }

  const handleRequireLesson = (id, avatar, teacher, name, note, date, start, end, documents, skype) => {
   setStateRequireLesson({...stateRequireLesson,
    id,
   avatar,
   teacher,
   name,
   note,
   date,
   start,
   end,
   documents,
   skype })
  }

  const handleCancelBooking = (id, name, date, start, end) => {
    setStateCancelLesson({...stateCancelLesson,
      id,
      name,
      date,
      start,
      end})
  }

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    const lessons = getLessons();
    console.log(lessons);
    return () => clearTimeout(timer);
  }, []);

  return <React.Fragment>
      <div className="content content-fixed">
        <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0 dashboard-page">
          <div className="media d-block d-lg-flex">
          <div id="js-component-profilesidebar"></div>
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
                  <h4 className="mg-b-0 gradient-heading"><i className="fas fa-fire"></i>UPCOMING LESSON</h4>
                </div>
                <div className="course-horizental mg-t-20">
                  <ul className="list-wrap">
                    {
                      loading ? <SkeletonLessonCard/> :
                      !!state.upcomingLesson && state.upcomingLesson.length > 0 &&
                      state.upcomingLesson.map(item =>
                        <LessonUpcomingCard
                          key={item.id}
                          id={item.id}
                          avatar={item.images}
                          teacher={item.teacher}
                          name={item.courseName}
                          note={item.note}
                          date={item.date}
                          start={item.startTime}
                          end={item.endTime}
                          documents={item.documents}
                          skype={item.skype}
                          onHandleCancelBooking={handleCancelBooking}
                          onHandleRequireLesson={handleRequireLesson} />)
                    }
                  </ul>
                </div>
              </div>
              <div className="lesson mg-t-45 animated fadeInUp am-animation-delay-2">
                <div className="d-xl-flex align-items-center justify-content-between ">
                  <h4 className="mg-b-0 gradient-heading"><i className="fas fa-file"></i>LESSON HISTORY</h4>
                  <a href={"#"} className="link">View all history</a>
                </div>
                <div className="course-horizental mg-t-20">
                  <ul className="list-wrap">
                    {
                      loading ? <SkeletonLessonCard/> :
                      !!state.lessonHistory && state.lessonHistory.length > 0 &&
                      state.lessonHistory.map(item =>
                        <LessonHistoryCard
                          key={item.id}
                          id={item.id}
                          avatar={item.images}
                          teacher={item.teacher}
                          name={item.courseName}
                          date={item.date}
                          note={item.note}
                          start={item.startTime}
                          end={item.endTime}
                          rating={item.ratingCourse}
                          onHandleRatingLesson={handleRatingLesson} />)
                    }
                  </ul>
                </div>
              </div>
                     <RatingLessonModal
                      id={stateRatingLesson.id}
                      teacher={stateRatingLesson.teacher}/>
                 <RequireLessonModal
                      id={stateRequireLesson.id}
                     avatar={stateRequireLesson.avatar}
                     teacher={stateRequireLesson.teacher}
                     name={stateRequireLesson.name}
                     note={stateRequireLesson.note}
                     date={stateRequireLesson.date}
                     start={stateRequireLesson.start}
                     end={stateRequireLesson.end}
                     documents={stateRequireLesson.documents}
                     skype={stateRequireLesson.skype}/>
                <CancelBookingLessonModal
                  id={stateCancelLesson.id}
                  name={stateCancelLesson.name}
                  date={stateCancelLesson.date}
                  start={stateCancelLesson.start}
                  end={stateCancelLesson.end} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
}
ReactDOM.render(<Dashboard />, document.getElementById('react-account-dashboard'));