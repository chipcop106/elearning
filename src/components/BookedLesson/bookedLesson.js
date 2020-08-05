import React from 'react'
import ReactDOM from 'react-dom'

import RequireLessonModal from '~components/RequireLessonModal'
import LessonUpcomingCard from "~components/LessonUpcomingCard"
import CancelBookingLessonModal from "~components/CancelBookingLessonModal"
import SkeletonLessonCard from "~components/common/Skeleton/SkeletonLessonCard"
import { getUpcomingLessons } from "~src/api/studentAPI"
import { convertDateFromTo, checkCancelTime } from "~src/utils.js"
import Pagination from "react-js-pagination";
import { ToastContainer } from 'react-toastify'
import { FETCH_ERRORS } from "~components/common/Constant/message"
import { toast } from 'react-toastify';
import 'react-toastify/scss/main.scss'
import { toastInit } from "~src/utils"
import { CANCEL_BOOKING_SUCCESS, FETCH_ERROR } from '~components/common/Constant/toast';

import styles from '~components/BookedLesson/bookedLesson.module.scss'

const initialCancelLesson = {
  BookingID: "",
  LessionName: "",
  date: "",
  start: "",
  end: "",
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
  const [state, setState] = React.useState(null);
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(0);
  const [totalResult, setTotalResult] = React.useState(0);
  const cancelToastSuccess = () => toast.success(CANCEL_BOOKING_SUCCESS, toastInit);
  const cancelToastFail = () => toast.error(FETCH_ERROR, toastInit);

  const [lock, setLock] = React.useState({
    id: "",
    lock: false,
  })
  const [stateCancelLesson, setStateCancelLesson] = React.useState(initialCancelLesson);
  const [stateRequireLesson, setStateRequireLesson] = React.useState(initialRequireLesson);

  const [loading, setLoading] = React.useState(true);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    getAPI({
      Page: pageNumber,
    })
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
      if (result === 1) { // cancel lesson success
        cancelToastSuccess();
        if (pageSize < totalResult) {
          getAPI({
            Page: 1,
          })
        }
        else {
          let newUpcomingLessions = [...state];
          newUpcomingLessions = newUpcomingLessions.filter(item => item.BookingID !== id)
          setState(newUpcomingLessions)
        }
      }
      else cancelToastFail(); //Cancel Lesson Fail
    }
  }
  const cbRequireLesson = (SpecialRequest, BookingID, TeacherUID) => {
    let newState = [...state]
    const index = newState.findIndex
      (item => item.BookingID === BookingID && item.TeacherUID === TeacherUID);
    newState[index].SpecialRequest = SpecialRequest;
    setState(newState)
  }
  const getAPI = async (params) => {
    setLoading(true);
    const res = await getUpcomingLessons(params);
    if (res.Code === 1) {
      setState(res.Data)
      setPageSize(res.PageSize);
      setTotalResult(res.TotalResult)
    }
    setLoading(false);
  }

  React.useEffect(() => {
    getAPI({
      Page: 1,
    })
  }, []);

  return <>
    <h4 className="mg-b-30 gradient-heading"><i className="fas fa-calendar-check" />BOOKED LESSON</h4>
    {
      !!state ? <>
        <div className="feedback-container">
          <div className="course-horizental animated fadeInUp am-animation-delay-1">
            {
              !!state && !!state &&
                state.length + state.length === 0 ? (
                  <div className="empty-error tx-center mg-y-30 cr-item bg-white pd-15 rounded-5 shadow">
                    <img src="../assets/img/no-booking.svg" alt="image" className="wd-200 mg-b-15" />
                    <p className=" tx-danger tx-medium">You don't have any lesson.</p>
                    <a href="ElearnStudent/bookingLesson" className="btn btn-primary">Book a lesson</a>
                  </div>) : ""
            }
            <ul className="list-wrap">
              {
                !!state && state.length > 0 &&
                state.map(item => loading ? <SkeletonLessonCard key={item.BookingID} /> :
                  <LessonUpcomingCard
                    key={item.BookingID}
                    BookingID={item.BookingID}
                    TeacherUID={item.TeacherUID}
                    avatar={item.TeacherIMG}
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
                    lock={lock}
                    cancelable={checkCancelTime(convertDateFromTo(item.ScheduleTimeVN).dateObject)} />)
              }
            </ul>
          </div>
        </div>
        {
          pageSize < totalResult && <Pagination
            innerClass="pagination justify-content-end mt-3"
            activePage={page}
            itemsCountPerPage={pageSize}
            totalItemsCount={totalResult}
            pageRangeDisplayed={3}
            itemClass="page-item"
            linkClass="page-link"
            onChange={handlePageChange.bind(this)} />
        }
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
          SkypeID={stateRequireLesson.SkypeID}
          callback={cbRequireLesson} />

        <CancelBookingLessonModal
          BookingID={stateCancelLesson.BookingID}
          LessionName={stateCancelLesson.LessionName}
          date={stateCancelLesson.date}
          start={stateCancelLesson.start}
          end={stateCancelLesson.end}
          callback={cbCancelBooking} />

        <ToastContainer />
      </> : (!loading && <FETCH_ERRORS />)
    }
  </>
}

ReactDOM.render(<BookedLesson />, document.getElementById('react-booked-lesson'));