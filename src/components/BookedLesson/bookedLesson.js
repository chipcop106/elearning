import React from 'react'
import ReactDOM from 'react-dom'

import { randomId } from '~src/utils'
import RatingLessonModal from '~components/StudentDashBoard/RatingLessonModal'
import RequireLessonModal from '~components/StudentDashboard/RequireLessonModal'
import LessonHistoryCard from "~components/StudentDashBoard/LessonHistoryCard"
import LessonUpcomingCard from "~components/StudentDashBoard/LessonUpcomingCard"
import CancelBookingLessonModal from "~components/CancelBookingLessonModal"
import SkeletonLessonCard from "~components/common/Skeleton/SkeletonLessonCard"

import styles from '~components/BookedLesson/bookedLesson.module.scss'

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

const BookedLesson = () => {
    const [state, setState] = React.useState(initialState);
  const [stateCancelLesson, setStateCancelLesson] = React.useState(initialCancelLesson);
  const [stateRatingLesson, setStateRatingLesson] = React.useState(initialRatingLesson);
  const [stateRequireLesson, setStateRequireLesson] = React.useState(initialRequireLesson);

  const [loading, setLoading] = React.useState(false);

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
    return () => clearTimeout(timer);
  }, []);

  return <React.Fragment>
     <ul className="list-wrap">
        {
          state.upcomingLesson.map(item => loading?<SkeletonLessonCard key={item.id}/>:
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
        {
          state.lessonHistory.map(item => loading?<SkeletonLessonCard key={item.id}/>:
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
      <RatingLessonModal
        id={stateRatingLesson.id}
        teacher={stateRatingLesson.teacher} />
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
  </React.Fragment>
}

ReactDOM.render(<BookedLesson />, document.getElementById('react-booked-lesson'));