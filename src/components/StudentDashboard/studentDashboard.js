import React from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components'

import { BookOpen } from '@styled-icons/boxicons-regular/BookOpen'
import { OpenBook } from '@styled-icons/entypo/OpenBook'
import { CancelCircle } from '@styled-icons/icomoon/CancelCircle'
import { TextDocument } from '@styled-icons/entypo/TextDocument'

import LessonHistoryCard from "~components/LessonHistoryCard"
import LessonUpcomingCard from "~components/LessonUpcomingCard"

import RatingLessonModal from "~components/RatingLessonModal"
import RequireLessonModal from "~components/RequireLessonModal"
import CancelBookingLessonModal from "~components/CancelBookingLessonModal"
import PopUpCancelLesson from "~components/PopUpCancelLesson"
import SkeletonLessonCard from '~components/common/Skeleton/SkeletonLessonCard';
import { NOT_DATA_FOUND } from '~components/common/Constant/message';

import { convertDateFromTo, checkCancelTime } from "~src/utils.js"
import { getLessons, getCoursesInfoAPI } from "~src/api/studentAPI";
import { ToastContainer } from 'react-toastify';

import { toast } from 'react-toastify';
import 'react-toastify/scss/main.scss'
import { toastInit } from "~src/utils"
import { CANCEL_BOOKING_SUCCESS, FETCH_ERROR } from '~components/common/Constant/toast';

import styles from "~components/StudentDashboard/StudentDashboard.module.scss";


const styledIcon = `
  color: #fd7e14;
  width: 30px;
  height: 30px;
`
const BookOpenIcon = styled(BookOpen)`${styledIcon}`
const OpenBookIcon = styled(OpenBook)`${styledIcon}`
const CancelCircleIcon = styled(CancelCircle)`${styledIcon}`
const TextDocumentIcon = styled(TextDocument)`${styledIcon}`

const initialCancelLesson = {
  BookingID: "",
  LessionName: "",
  date: "",
  start: "",
  end: "",
  reason: "",
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
  LessionName: "",
  LessionMaterial: "",
  SpecialRequest: "",
  date: "",
  start: "",
  end: "",
  DocumentName: "",
  SkypeID: "",
}
const Dashboard = () => {
  const [state, setState] = React.useState({});
  const [lock, setLock] = React.useState({
    id: "",
    lock: false,
  })
  const [stateCancelLesson, setStateCancelLesson] = React.useState(initialCancelLesson);
  const [stateRatingLesson, setStateRatingLesson] = React.useState(initialRatingLesson);
  const [stateRequireLesson, setStateRequireLesson] = React.useState(initialRequireLesson);
  const [loading, setLoading] = React.useState(false)

  const [courseInfo, setCourseInfo] = React.useState(null);
  const [loadingCourseInfo, setLoadingCourseInfo] = React.useState(false)

  const cancelToastSuccess = (text) => toast(text, toastInit);
  const cancelToastFail = () => toast.error(FETCH_ERROR, toastInit);

  const handleRatingLesson = (BookingID, TeacherUID, TeacherName) => {
    setStateRatingLesson({
      ...stateRatingLesson,
      BookingID,
      TeacherUID,
      TeacherName
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

  const cbCancelBooking = (id, result, LessionName, date, start, end, reason) => {
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
        setStateCancelLesson({
          ...stateCancelLesson,
          reason,
        })
        $('#md-cancel-schedule-popup').modal("show");
      }
      else cancelToastFail(); //Cancel Lesson Fail
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

  const cbRequireLesson = (SpecialRequest, BookingID, TeacherUID) => {
    let newState = { ...state }
    const index = newState.UpcomingLessions.findIndex
      (item => item.BookingID === BookingID && item.TeacherUID === TeacherUID);
    newState.UpcomingLessions[index].SpecialRequest = SpecialRequest;
    setState(newState)
  }

  const getAPI = async () => {
    setLoading(true);
    const res = await getLessons();
    if (res.Code === 1) {
      setState(res.Data)
    }
    setLoading(false);
  }

  const _getCoursesInfoAPI = async () => {
    setLoadingCourseInfo(true);
    const res = await getCoursesInfoAPI();
    if (res.Code === 1) {
      setCourseInfo({
          ...res.Data,
          Message: "",
        })
    }
    else {
      setCourseInfo({
        Message: res.Message,
      })
    }
    setLoadingCourseInfo(false);
  }

  React.useEffect(() => {
    getAPI();
    _getCoursesInfoAPI();
  }, []);

  return <>
    <div className="overall__summary pd-15">
      {
        !!courseInfo && !courseInfo.Message ? <>
          {
            courseInfo.Message !== undefined ? <div className="overall__summary-info d-flex flex-wrap pd-b-15">
              <div className="course-img">
                <img src="https://preview.keenthemes.com/metronic/theme/html/demo7/dist/assets/media/project-logos/3.png" />
              </div>
              <div className="course-info pd-l-15">
                <a href="#" className="tx-bold no-hl d-block mg-b-10" style={{ width: "fit-content" }}>
                  <span className="course-name">{courseInfo.CoursesName}</span>
                </a>
                <div className="course-progress d-flex flex-wrap">
                  <div className="start-date mg-r-30">
                    <label className="label d-block tx-medium tx-gray">Ngày bắt đầu</label>
                    <label className="date font-weight-bolder">
                      {!!courseInfo.StartDate ?
                        moment(courseInfo.StartDate).format("DD MMM, YYYY").toUpperCase() :
                        "CHƯA BẮT ĐẦU"}
                    </label>
                  </div>
                  <div className="due-date mg-r-30">
                    <label className="label d-block tx-medium tx-gray">Ngày kết thúc</label>
                    <label className="date font-weight-bolder">
                      {!!courseInfo.EndDate ?
                        moment(courseInfo.EndDate).format("DD MMM, YYYY").toUpperCase() :
                        "CHƯA KẾT THÚC"}
                    </label>
                  </div>
                  <div className="progress-wrap">
                    <div className="progress-course-bar position-relative">
                      <label className="label d-block tx-medium tx-gray">Tiến trình học</label>
                      <div className="progress-bar-wrap">
                        <div className="progress-bar-wrap-fill" style={{ width: `${parseInt(courseInfo.Process * 100)}%` }}></div>
                      </div>
                      <span className="progress-number bold">{`${parseInt(courseInfo.Process * 100)}%`}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div> : <div className="overall__summary-summary pd-t-15 d-flex flex-wrap justify-content-between">
                <div className="left d-flex flex-wrap flex-grow-1">
                  <div className="summary-item student-summary-item">
                    <BookOpenIcon />
                    <div className="mg-l-10 title">
                      <label className="d-block label">Số buổi học đã hoàn thành</label>
                      <label className="d-block bold count">
                        {!!state && !!state.StudyProcess && state.StudyProcess.CompleteLessions}</label>
                    </div>
                  </div>
                  <div className="summary-item student-summary-item">
                    <OpenBookIcon />
                    <div className="mg-l-10 title">
                      <label className="d-block label">Số buổi học đã hủy</label>
                      <label className="d-block bold count">
                        {!!state && !!state.StudyProcess && state.StudyProcess.CancelLessions}</label>
                    </div>
                  </div>
                  <div className="summary-item student-summary-item">
                    <CancelCircleIcon />
                    <div className="mg-l-10 title">
                      <label className="d-block label">Số buổi học vắng mặt</label>
                      <label className="d-block bold count">
                        {!!state && !!state.StudyProcess && state.StudyProcess.NumberOfAbsences}</label>
                    </div>
                  </div>
                  <div className="summary-item student-summary-item">
                    <TextDocumentIcon />
                    <div className="mg-l-10 title">
                      <label className="d-block label">Số buổi học còn lại</label>
                      <label className="d-block bold count">
                        {!!state && !!state.StudyProcess && state.StudyProcess.NumberOfLessionsLeft}</label>
                    </div>
                  </div>
                </div>
                {/*  <div className="right">
                  <div className="summary-item">
                    <div>
                      <img src="https://images.unsplash.com/photo-1595534005229-688989c4bf82?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                      <img src="https://images.unsplash.com/photo-1595534005229-688989c4bf82?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                      <img src="https://images.unsplash.com/photo-1595534005229-688989c4bf82?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                      <img src="https://images.unsplash.com/photo-1595534005229-688989c4bf82?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                      <img src="https://images.unsplash.com/photo-1595534005229-688989c4bf82?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                      <span className="other-person bold">5+</span>
                    </div>
                  </div>
                </div> */}
              </div>
          }
        </> : <span className="d-block tx-center tx-danger tx-medium">
            {courseInfo && courseInfo.Message}
          </span>
      }
    </div>
    {
      !state ? <NOT_DATA_FOUND /> : <>
        <div className="lesson mg-t-20 animated fadeInUp am-animation-delay-1">
          <div className="d-xl-flex align-items-center justify-content-between ">
            <h4 className="mg-b-0 gradient-heading"><i className="fas fa-fire"></i>BUỔI HỌC SẮP DIỄN RA</h4>
          </div>
          {
            !!state.UpcomingLessions && !!state.UpcomingLessions &&
              state.UpcomingLessions.length + state.UpcomingLessions.length === 0 ? (
                <div className="empty-error tx-center mg-y-15 cr-item bg-white rounded-5 pd-15 shadow">
                  <img src="../assets/img/no-booking.svg" alt="image" className="wd-200 mg-b-15" />
                  <p className=" tx-danger tx-medium">Bạn không có buổi học nào sắp tới</p>
                  <a href="/ElearnStudent/bookingLesson" className="btn btn-primary">Đặt lịch học</a>
                </div>) : ""
          }
          <div className="course-horizental mg-t-15">
            <ul className="list-wrap">
              {
                loading ? <SkeletonLessonCard /> :
                  !!state.UpcomingLessions && state.UpcomingLessions.length > 0 &&
                  state.UpcomingLessions.map(item =>
                    <LessonUpcomingCard
                      key={item.BookingID}
                      BookingID={item.BookingID}
                      TeacherUID={item.TeacherUID}
                      avatar={item.TeacherIMG}
                      TeacherName={item.TeacherName}
                      LessionName={item.LessionName}
                      LessionMaterial={item.LessionMaterial}
                      SpecialRequest={item.SpecialRequest}
                      start={convertDateFromTo(item.ScheduleTimeVN).fromTime}
                      end={convertDateFromTo(item.ScheduleTimeVN).endTime}
                      date={convertDateFromTo(item.ScheduleTimeVN).date}
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
        <div className="lesson mg-t-20 animated fadeInUp am-animation-delay-2">
          <div className="d-xl-flex align-items-center justify-content-between ">
            <h4 className="mg-b-0 gradient-heading"><i className="fas fa-file"></i>BUỔI HỌC ĐÃ HOÀN THÀNH</h4>
            <a href={"/ElearnStudent/lessonHistory"} className="link">Xem lịch sử học</a>
          </div>
          <div className="course-horizental mg-t-15">
            <ul className="list-wrap">
              {
                loading ? <SkeletonLessonCard /> :
                  !!state.LessionHistory && state.LessionHistory.length > 0 &&
                  state.LessionHistory.map(item =>
                    <LessonHistoryCard
                      key={item.BookingID}
                      BookingID={item.BookingID}
                      TeacherUID={item.TeacherUID}
                      avatar={item.TeacherIMG}
                      TeacherName={item.TeacherName}
                      LessionName={item.LessionName}
                      Status={item.Status}
                      start={convertDateFromTo(item.Schedule).fromTime}
                      end={convertDateFromTo(item.Schedule).endTime}
                      date={convertDateFromTo(item.Schedule).date}
                      Rate={item.Rate}
                      onHandleRatingLesson={handleRatingLesson} />)
              }
            </ul>
          </div>
        </div>
      </>
    }
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
      SkypeID={stateRequireLesson.SkypeID}
      callback={cbRequireLesson} />

    <CancelBookingLessonModal
      BookingID={stateCancelLesson.BookingID}
      LessionName={stateCancelLesson.LessionName}
      date={stateCancelLesson.date}
      start={stateCancelLesson.start}
      end={stateCancelLesson.end}
      callback={cbCancelBooking} />

    <PopUpCancelLesson
      LessionName={stateCancelLesson.LessionName}
      date={stateCancelLesson.date}
      start={stateCancelLesson.start}
      end={stateCancelLesson.end}
      reason={stateCancelLesson.reason} />
    <ToastContainer />
  </>
}
ReactDOM.render(<Dashboard />, document.getElementById('react-account-dashboard'));