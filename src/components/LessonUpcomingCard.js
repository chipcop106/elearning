import React from 'react';
import ReactDOM from 'react-dom';

import styles from "~components/LessonUpcomingCard.module.scss";

const LessonUpcomingCard = ({
  BookingID,
  avatar = "default-avatar.png",
  TeacherUID,
  TeacherName,
  LessionName,
  LessionMaterial,
  SpecialRequest = null,
  start,
  end,
  date,
  DocumentName = null,
  SkypeID,
  onHandleCancelBooking,
  onHandleRequireLesson,
  lock = {
    id: '',
    lock: false
  },
  cancelable = false,
}) => {

  const handleRequireLesson = (BookingID, avatar, TeacherUID, TeacherName, LessionMaterial, LessionName, SpecialRequest, date, start, end, DocumentName, SkypeID) => {
    onHandleRequireLesson(BookingID, avatar, TeacherUID, TeacherName, LessionMaterial, LessionName, SpecialRequest, date, start, end, DocumentName, SkypeID)
  }

  const handleCancelBooking = (e, BookingID, LessionName, date, start, end) => {
    e.preventDefault()
    onHandleCancelBooking(BookingID, LessionName, date, start, end)
  }

  React.useEffect(() => {
    feather.replace();
  }, [])

  return (
    <li className="cr-item upcoming-lesson lesson-info" style={{ position: 'relvate' }}>
      <div className={`${lock.id === BookingID && lock.lock ? '' : 'd-none'}`} style={{ zIndex: "99", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}></div>
      <div className="media">
        <div className="teacher-information">
          <a className="teacher-avatar" href={`/ElearnStudent/teacherDetail?ID=${TeacherUID}`}>
            <img src={avatar === "default-avatar.png" ?
              `../assets/img/${avatar}` : avatar}
              className="teacher-image" alt=""
              onError={(e) => { e.target.onerror = null; e.target.src = "../assets/img/default-avatar.png" }} />
            <p className="course-teacher tx-14 tx-gray-800 tx-normal mg-b-0 tx-center mg-t-5 d-block">
              {TeacherName}</p>
          </a>
        </div>
        <div className="media-body mg-l-20 pos-relative">
          <div>
            <h5 className="mg-b-10 mg-t-10 mg-sm-t-0">
              <span className="badge badge-warning">Incoming</span>{' '}
              <span className="no-hl course-name tx-bold">{LessionName}</span>
            </h5>
            <div className="course-information tx-14">
              <span className="mg-r-15 tx-gray-600 tx-medium d-inline-block">
                <i className="feather-16 mg-r-5" data-feather="calendar"></i>
                {date}</span>
              <span className="mg-r-15 tx-gray-600 tx-medium d-inline-block">
                <i className="feather-16 mg-r-5" data-feather="clock"></i>
                {`Bắt đầu: ${start}`}</span>
              <span className="mg-r-15 tx-gray-600 tx-medium d-inline-block">
                <i className="feather-16 mg-r-5" data-feather="clock"></i>
                {`Kết thúc: ${end}`}</span>
            </div>
            {
              SpecialRequest && <div className="course-note mg-t-15">
                <h6 className="mg-b-3 tx-bold">Ghi chú cho giáo viên:</h6>
                <p className="tx-14 mg-b-0" style={{ wordBreak: "break-all" }}>{SpecialRequest}</p>
              </div>
            }
            {
              !!DocumentName && <div className="course-docs mg-t-15">
                <h6 className="mg-b-3 tx-bold">Tài liệu:</h6>
                <div> <a href={LessionMaterial} target="_blank">{DocumentName}</a></div>
              </div>
            }
          </div>
          <div className="course-actions mg-t-15">
            <div className="action-left">
              <a href={`skype:${SkypeID}?chat`}
                className="btn btn-sm btn-info d-flex justify-content-center align-items-center tx-medium"
                rel="noopener">
                <div><i className="fab fa-skype mg-r-5"></i>VÀO HỌC</div>
              </a>
              <a href={"#"} className="btn btn-sm btn-light tx-medium" data-toggle="modal" data-target="#js-md-required"
                onClick={() => handleRequireLesson(
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
                  SkypeID)}>
                <i className="fas fa-edit mg-r-5"></i>GHI CHÚ</a>
            </div>
            <div className="action-right">
              {
                cancelable && <a href={"#"} className="btn btn-sm btn-outline-danger d-flex justify-content-center align-items-center tx-medium"
                  rel="noopener" data-toggle="tooltip"
                  title="You can only cancel this lesson before start for 30 minutes !!"
                  onClick={(e) => handleCancelBooking(e, BookingID, LessionName, date, start, end)}
                  data-toggle="modal" data-target="#md-cancel-schedule"
                  data-placement="top">
                  <div><i className="fas fa-times-circle"></i> HỦY LỚP</div>
                </a>
              }
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default LessonUpcomingCard;