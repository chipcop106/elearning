import React from 'react'
import ReactDOM from 'react-dom'

import { randomId } from '../../utils'
import RatingLessonModal from '../StudentDashBoard/RatingLessonModal'
import RequireLessonModal from '../StudentDashboard/RequireLessonModal'
import LessonHistoryCard from "../StudentDashBoard/LessonHistoryCard"
import LessonUpcomingCard from "../StudentDashBoard/LessonUpcomingCard"

import styles from '~components/BookedLesson/bookedLesson.module.scss'

let initialState = {
  upcomingLesson: [{
    courseId: randomId(),
    teacher: "Hoàng Thị Uyên Phương",
    images: "https://image.engoo.com/teacher/15867/p2872.jpg",
    courseName: "IELST - Professional",
    date: "03/07/2020",
    startTime: "10:30",
    endTime: "11:00",
    note: "Prepare speaking topic",
    document: ["ReadingSpeaking.doc", "Listening.doc"],
    skype: "http://skype.com/abc",
  }, {
    courseId: randomId(),
    teacher: "Hoàng Văn Thái",
    images: "https://images.unsplash.com/photo-1593087989983-e887d642a19c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    courseName: "IELST - Beginner",
    date: "11/07/2020",
    startTime: "10:30",
    endTime: "11:00",
    note: "Prepare speaking topic",
    document: ["ReadingSpeaking.doc", "Listening.doc"],
    skype: "http://skype.com/abc",
  }],
  lessonHistory: [{
    courseId: randomId(),
    teacher: "Hoàng Thị Uyên Phương",
    images: "https://image.engoo.com/teacher/15867/p2872.jpg",
    courseName: "IELST - Professional",
    date: "24/06/2020",
    startTime: "10:30",
    endTime: "11:00",
    note: "Student have a good speaking skill",
    ratingCourse: "90",
  }, {
    courseId: randomId(),
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
  requireCourse: {
    course: null,
    require: ["This is require 1", "This is require 2", "This is require 3"],
    selectedRequire: [],
    note: "Note for teacher",
  }
}

const reducer = (prevState, { type, payload }) => {
  switch (type) {
    case "CHOOSE_RATING_COURSE": {
      return {
        ...prevState,
        ratingCourse: {
          ...prevState.ratingCourse,
          [payload.key]: payload.value,
        }
      }
    }
    case "CHOOSE_REQUIRE_COURSE": {
      return {
        ...prevState,
        requireCourse: {
          ...prevState.requireCourse,
          [payload.key]: payload.value,
        }
      }
    }
    default: return prevState;
      break;
  }
}

const BookedLesson = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleChooseRatingCourse = (item) => {
    let key = "course"
    let value = item
    dispatch({ type: "CHOOSE_RATING_COURSE", payload: { key, value } })
  }
  const handleChooseRequireCourse = (item) => {
    let key = "course"
    let value = item
    dispatch({ type: "CHOOSE_REQUIRE_COURSE", payload: { key, value } })
  }
  return (
    <React.Fragment>
      <ul className="list-wrap">
        {
          state.upcomingLesson.map((item, index) => {
            return <LessonUpcomingCard
                    key={index}
                    onHandleChooseRequireCourse={handleChooseRequireCourse}
                    item={item} />
          })
        }
        {
          state.lessonHistory.map((item, index) => {
            return <LessonHistoryCard
                    key={index}
                    onHandleChooseRatingCourse={handleChooseRatingCourse}
                    item={item} />
          })
        }
      </ul>
      <RatingLessonModal course={state.ratingCourse} />
      <RequireLessonModal course={state.requireCourse} />
    </React.Fragment>
  )
}

ReactDOM.render(<BookedLesson />, document.getElementById('react-booked-lesson'));