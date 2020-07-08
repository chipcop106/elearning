import React from 'react'
import ReactDOM from 'react-dom'

import { randomId } from '~src/utils'
import RatingLessonModal from '~components/StudentDashBoard/RatingLessonModal'
import RequireLessonModal from '~components/StudentDashboard/RequireLessonModal'
import LessonHistoryCard from "~components/StudentDashBoard/LessonHistoryCard"
import LessonUpcomingCard from "~components/StudentDashBoard/LessonUpcomingCard"
import CancelBookingLessonModal from "~components/CancelBookingLessonModal"
import SkeletonLessonCard from "~components/common/Skeleton/SkeletonLessonCard"
import { getLessons } from "../../api/studentAPI"
import { convertDateFromTo } from "../../utils.js"
import Pagination from "react-js-pagination";

import styles from '~components/BookedLesson/bookedLesson.module.scss'

let initialState = {}

const initialCancelLesson = {
  id: "",
  LessionName: "",
  date: "",
  start: "",
  end: "",
}
const initialRatingLesson = {
  id: "",
  TeacherName: "",
}
const initialRequireLesson = {
  id: "",
  avatar: "",
  TeacherName: "",
  LessionName: "",
  note: "",
  date: "",
  start: "",
  end: "",
  DocumentName: "",
  SkypeID: "",
}

const BookedLesson = () => {
  const [state, setState] = React.useState(initialState);
  const [page, setPage] = React.useState(1)
  const [filterLesson, setFilterLesson] = React.useState(1);
  const [stateCancelLesson, setStateCancelLesson] = React.useState(initialCancelLesson);
  const [stateRatingLesson, setStateRatingLesson] = React.useState(initialRatingLesson);
  const [stateRequireLesson, setStateRequireLesson] = React.useState(initialRequireLesson);

  const [loading, setLoading] = React.useState(false);

  const handleRatingLesson = (id, TeacherName) => {
    setStateRatingLesson({
      ...stateRatingLesson,
      id,
      TeacherName
    })
  }

  const handlePageChange = (pageNumber) =>  {
    setPage(pageNumber);
  }

  const handleRequireLesson = (id, avatar, TeacherName, LessionName, note, date, start, end, DocumentName, SkypeID) => {
    setStateRequireLesson({
      ...stateRequireLesson,
      id,
      avatar,
      TeacherName,
      LessionName,
      note,
      date,
      start,
      end,
      DocumentName,
      SkypeID
    })
  }

  const handleCancelBooking = (id, LessionName, date, start, end) => {
    setStateCancelLesson({
      ...stateCancelLesson,
      id,
      LessionName,
      date,
      start,
      end
    })
  }

  const getAPI = async () => {
    setLoading(true);
    const lessons = await getLessons();
    setState(lessons.Data)
    console.log(lessons.Data)
    setLoading(false);
  }

  React.useEffect(() => {
    getAPI()
  }, []);

  return <React.Fragment>
      <div className="d-xl-flex align-items-center justify-content-between mg-b-30">
        <h4 className="mg-b-0 gradient-heading"><i className="fas fa-calendar-check" />BOOKED LESSON</h4>
      </div>
      <div className="mg-t-30 feedback-container">
        <div className="fb-summary-container">
          <div className="fb-summary pd-t-0-f bd-t-0-f">
            <div className="fb-type">
              <div className="fb-radio">
                <label>
                  <input type="radio" name="fbType" group="feedback" defaultChecked
                  onClick={()=>setFilterLesson(1)}/>
                  <span>All lesson<span className="number">
                    {!!state.UpcomingLessions && !!state.LessionHistory &&
                    state.UpcomingLessions.length + state.LessionHistory.length}</span>
                    </span>
                </label>
              </div>
            </div>
            <div className="fb-type">
              <div className="fb-radio">
                <label>
                  <input type="radio" name="fbType" group="feedback" onClick={()=>setFilterLesson(2)}/>
                <span>Incoming <span className="number">{!!state.UpcomingLessions && state.UpcomingLessions.length}</span></span>
                </label>
              </div>
            </div>
            <div className="fb-type">
              <div className="fb-radio">
                <label>
                  <input type="radio" name="fbType" group="feedback" onClick={()=>setFilterLesson(3)}/>
                <span>Completed <span className="number">{!!state.LessionHistory && state.LessionHistory.length}</span></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="course-horizental mg-t-20">
          {
            !!state.UpcomingLessions && !!state.LessionHistory &&
            state.UpcomingLessions.length + state.LessionHistory.length === 0 ? (
            <div className="empty-error tx-center mg-y-30 cr-item bg-white">
            <img src="../assets/img/no-booking.svg" alt="image" className="wd-200 mg-b-15" />
            <p className=" tx-danger tx-medium">You don't have any lesson.</p>
            <a href="bookingLesson.html" className="btn btn-primary">Book a lesson</a>
          </div>): ""
          }
          <ul className="list-wrap">
            {
              (filterLesson === 1 || filterLesson === 2) &&
              !!state.UpcomingLessions && state.UpcomingLessions.length > 0 &&
              state.UpcomingLessions.map(item => loading ? <SkeletonLessonCard key={item.BookingID} /> :
                <LessonUpcomingCard
                  key={item.BookingID}
                  id={item.BookingID}
                  teacherUID={item.TeacherUID}
                  TeacherName={item.TeacherName}
                  LessionName={item.LessionName}
                  start={convertDateFromTo(item.ScheduleTimeVN).fromTime}
                  end={convertDateFromTo(item.ScheduleTimeVN).endTime}
                  date={convertDateFromTo(item.ScheduleTimeVN).date}
                  DocumentName={item.DocumentName}
                  SkypeID={item.SkypeID}
                  onHandleCancelBooking={handleCancelBooking}
                  onHandleRequireLesson={handleRequireLesson} />)
            }
            {
               (filterLesson === 1 || filterLesson === 3) &&
              !!state.LessionHistory && state.LessionHistory.length > 0 &&
              state.LessionHistory.map(item => loading ? <SkeletonLessonCard key={item.BookingID} /> :
                <LessonHistoryCard
                  key={item.BookingID}
                  id={item.BookingID}
                  teacherUID={item.TeacherUID}
                  TeacherName={item.TeacherName}
                  LessionName={item.LessionName}
                  start={convertDateFromTo(item.ScheduleTime).fromTime}
                  end={convertDateFromTo(item.ScheduleTime).endTime}
                  date={convertDateFromTo(item.ScheduleTime).date}
                  Rate={item.Rate}
                  onHandleRatingLesson={handleRatingLesson} />)
            }
          </ul>
        </div>
      </div>
      <Pagination
                innerClass="pagination justify-content-end mt-3"
                activePage={page}
                itemsCountPerPage={10}
                totalItemsCount={450}
                pageRangeDisplayed={5}
                itemClass="page-item"
                linkClass="page-link"
                onChange={handlePageChange.bind(this)}
            />
      <RatingLessonModal
        id={stateRatingLesson.id}
        TeacherName={stateRatingLesson.TeacherName} />

      <RequireLessonModal
        id={stateRequireLesson.id}
        avatar={stateRequireLesson.avatar}
        TeacherName={stateRequireLesson.TeacherName}
        LessionName={stateRequireLesson.LessionName}
        note={stateRequireLesson.note}
        date={stateRequireLesson.date}
        start={stateRequireLesson.start}
        end={stateRequireLesson.end}
        DocumentName={stateRequireLesson.DocumentName}
        SkypeID={stateRequireLesson.SkypeID} />

      <CancelBookingLessonModal
        id={stateCancelLesson.id}
        LessionName={stateCancelLesson.LessionName}
        date={stateCancelLesson.date}
        start={stateCancelLesson.start}
        end={stateCancelLesson.end} />
  </React.Fragment>
}

ReactDOM.render(<BookedLesson />, document.getElementById('react-booked-lesson'));