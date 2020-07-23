import React from 'react'
import ReactDOM from 'react-dom'

import RatingLessonModal from '~components/RatingLessonModal'
import RequireLessonModal from '~components/RequireLessonModal'
import LessonHistoryCard from "~components/LessonHistoryCard"
import LessonUpcomingCard from "~components/LessonUpcomingCard"
import CancelBookingLessonModal from "~components/CancelBookingLessonModal"
import SkeletonLessonCard from "~components/common/Skeleton/SkeletonLessonCard"
import { getLessons } from "~src/api/studentAPI"
import { convertDateFromTo } from "~src/utils.js"
import Pagination from "react-js-pagination";
import { ToastContainer } from 'react-toastify'

import styles from '~components/BookedLesson/bookedLesson.module.scss'

const initialCancelLesson = {
  BookingID: "",
  LessionName: "",
  date: "",
  start: "",
  end: "",
}
const initialRatingLesson = {
  BookingID: "",
  TeacherUID: "",
  TeacherName: "",
}
const initialRequireLesson = {
  BookingID: "",
  avatar: "",
  TeacherUID: "",
  TeacherName: "",
  LessionMaterial: "",
  LessionName: "",
  SpecialRequest: "",
  date: "",
  start: "",
  end: "",
  DocumentName: "",
  SkypeID: "",
}

const BookedLesson = () => {
  const [state, setState] = React.useState({});
  const [page, setPage] = React.useState(1)
  const [lock, setLock] = React.useState({
    id: "",
    lock: false,
  })
  const [filterLesson, setFilterLesson] = React.useState(1);
  const [stateCancelLesson, setStateCancelLesson] = React.useState(initialCancelLesson);
  const [stateRatingLesson, setStateRatingLesson] = React.useState(initialRatingLesson);
  const [stateRequireLesson, setStateRequireLesson] = React.useState(initialRequireLesson);

  const [loading, setLoading] = React.useState(false);

  const handleRatingLesson = (BookingID, TeacherUID, TeacherName) => {
    setStateRatingLesson({
      ...stateRatingLesson,
      BookingID,
      TeacherUID,
      TeacherName
    })
  }

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  }

  const handleRequireLesson = (BookingID, avatar, TeacherUID, TeacherName, LessionMaterial, LessionName, SpecialRequest, date, start, end, DocumentName, SkypeID) => {
    setStateRequireLesson({
      ...stateRequireLesson,
      BookingID,
      avatar,
      TeacherUID,
      TeacherName,
      LessionMaterial,
      LessionName,
      SpecialRequest,
      date,
      start,
      end,
      DocumentName,
      SkypeID
    })
  }

  const handleCancelBooking = (BookingID, LessionName, date, start, end) => {
    setStateCancelLesson({
      ...stateCancelLesson,
      BookingID,
      LessionName,
      date,
      start,
      end
    })
  }

  const cbCancelBooking = (id, result) => {
    if (result === -1) //Start Call API, lock the card
    {
      setLock({
        id,
        lock: true
      })
    }
    else { //After call API, unlock the card
      setLock({
        id,
        lock: false
      })
      if (result === 1) { //If cancel lesson success
        let newUpcomingLessions = [...state.UpcomingLessions].filter(item => item.BookingID !== id)
        setState({
          ...state,
          UpcomingLessions: newUpcomingLessions,
        })
      }
    }
  }

  const cbRatingLesson = (result, message, rating, BookingID, TeacherUID) => {
    if (result === 1) { //Rating Success
      let newState = { ...state }
      const index = newState.LessionHistory.findIndex
        (item => item.BookingID === BookingID && item.TeacherUID === TeacherUID);
      newState.LessionHistory[index].Rate = rating;
      setState(newState)
    }
  }

  const getAPI = async () => {
    setLoading(true);
    const res = await getLessons();
    if (res.Code === 1) {
      setState(res.Data)
    }
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
      <div className="fb-summary-container animated fadeInUp">
        <div className="fb-summary pd-t-0-f bd-t-0-f">
          <div className="fb-type">
            <div className="fb-radio">
              <label>
                <input type="radio" name="fbType" group="feedback" defaultChecked
                  onClick={() => setFilterLesson(1)} />
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
                <input type="radio" name="fbType" group="feedback" onClick={() => setFilterLesson(2)} />
                <span>Incoming <span className="number">{!!state.UpcomingLessions && state.UpcomingLessions.length}</span></span>
              </label>
            </div>
          </div>
          <div className="fb-type">
            <div className="fb-radio">
              <label>
                <input type="radio" name="fbType" group="feedback" onClick={() => setFilterLesson(3)} />
                <span>Completed <span className="number">{!!state.LessionHistory && state.LessionHistory.length}</span></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="course-horizental mg-t-20 animated fadeInUp am-animation-delay-1">
        {
          !!state.UpcomingLessions && !!state.LessionHistory &&
            state.UpcomingLessions.length + state.LessionHistory.length === 0 ? (
              <div className="empty-error tx-center mg-y-30 cr-item bg-white">
                <img src="../assets/img/no-booking.svg" alt="image" className="wd-200 mg-b-15" />
                <p className=" tx-danger tx-medium">You don't have any lesson.</p>
                <a href="bookingLesson.html" className="btn btn-primary">Book a lesson</a>
              </div>) : ""
        }
        <ul className="list-wrap">
          {
            (filterLesson === 1 || filterLesson === 2) &&
            !!state.UpcomingLessions && state.UpcomingLessions.length > 0 &&
            state.UpcomingLessions.map(item => loading ? <SkeletonLessonCard key={item.BookingID} /> :
              <LessonUpcomingCard
                key={item.BookingID}
                BookingID={item.BookingID}
                TeacherUID={item.TeacherUID}
                TeacherName={item.TeacherName}
                LessionName={item.LessionName}
                LessionMaterial={item.LessionMaterial}
                start={convertDateFromTo(item.ScheduleTimeVN).fromTime}
                end={convertDateFromTo(item.ScheduleTimeVN).endTime}
                date={convertDateFromTo(item.ScheduleTimeVN).date}
                SpecialRequest={item.SpecialRequest}
                DocumentName={item.DocumentName}
                SkypeID={item.SkypeID}
                onHandleCancelBooking={handleCancelBooking}
                onHandleRequireLesson={handleRequireLesson}
                lock={lock} />)
          }
          {
            (filterLesson === 1 || filterLesson === 3) &&
            !!state.LessionHistory && state.LessionHistory.length > 0 &&
            state.LessionHistory.map(item => loading ? <SkeletonLessonCard key={item.BookingID} /> :
              <LessonHistoryCard
                key={item.BookingID}
                BookingID={item.BookingID}
                TeacherUID={item.TeacherUID}
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
      onChange={handlePageChange.bind(this)} />

    <RatingLessonModal
      BookingID={stateRatingLesson.BookingID}
      TeacherUID={stateRatingLesson.TeacherUID}
      TeacherName={stateRatingLesson.TeacherName}
      callback={cbRatingLesson} />

    <RequireLessonModal
      BookingID={stateRequireLesson.BookingID}
      avatar={stateRequireLesson.avatar}
      TeacherUID={stateRequireLesson.TeacherUID}
      TeacherName={stateRequireLesson.TeacherName}
      LessionName={stateRequireLesson.LessionName}
      LessionMaterial={stateRequireLesson.LessionMaterial}
      SpecialRequest={stateRequireLesson.SpecialRequest}
      date={stateRequireLesson.date}
      start={stateRequireLesson.start}
      end={stateRequireLesson.end}
      DocumentName={stateRequireLesson.DocumentName}
      SkypeID={stateRequireLesson.SkypeID} />

    <CancelBookingLessonModal
      BookingID={stateCancelLesson.BookingID}
      LessionName={stateCancelLesson.LessionName}
      date={stateCancelLesson.date}
      start={stateCancelLesson.start}
      end={stateCancelLesson.end}
      callback={cbCancelBooking} />

    <ToastContainer />
  </React.Fragment>
}

ReactDOM.render(<BookedLesson />, document.getElementById('react-booked-lesson'));