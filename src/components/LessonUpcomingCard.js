import React from 'react';
import ReactDOM from 'react-dom';

const LessonUpcomingCard = ({
  BookingID,
  avatar = "default-avatar.png",
  TeacherUID,
  TeacherName,
  LessionName,
  LessionMaterial,
  SpecialRequest,
  start,
  end,
  date,
  DocumentName,
  SkypeID,
  onHandleCancelBooking,
  onHandleRequireLesson,
  lock = {
    id:'',
    lock:false
  },
}) => {

  const handleRequireLesson = (BookingID, avatar, TeacherUID, TeacherName, LessionMaterial, LessionName, SpecialRequest, date, start, end, DocumentName, SkypeID) => {
    onHandleRequireLesson(BookingID, avatar, TeacherUID, TeacherName, LessionMaterial, LessionName, SpecialRequest, date, start, end, DocumentName, SkypeID)
  }

  const handleCancelBooking = (e, BookingID, LessionName, date, start, end) => {
    e.preventDefault()
    onHandleCancelBooking(BookingID, LessionName, date, start, end)
  }
  
  return (
    <li className="cr-item upcoming-lesson lesson-info" style={{position:'relvate'}}>
      <div className={`${lock.id === BookingID && lock.lock ? '':'d-none'}`} style={{zIndex:"99",position:"absolute",top:0,left:0,width:"100%",height:"100%"}}></div>
      <div className="media">
        <div className="teacher-information">
          <a className="teacher-avatar" href={`teacherDetail.html?ID=${TeacherUID}`}>
            <img src={`../assets/img/${avatar}`} className="teacher-image" alt="" />
            <p className="course-teacher tx-14 tx-gray-800 tx-normal mg-b-0 tx-center mg-t-5 d-block">
              {TeacherName}</p>
          </a>
        </div>
        <div className="media-body mg-l-20 pos-relative">
          <div>
          <h5 className="mg-b-10 ">
            <span className="badge badge-warning">Incoming</span>{' '}
            <a href={`lessonDetail.html?ID=${BookingID}`} className="course-name tx-bold">{LessionName}</a>
          </h5>
          <div className="course-information tx-14">
            <span className="mg-r-15 tx-gray-600 tx-medium"><i className="fa fa-calendar tx-info mg-r-5"></i>
              {date}</span>
            <span className="mg-r-15 tx-gray-600 tx-medium"><i className="fa fa-clock tx-info mg-r-5"></i>
              {`Start: ${start}`}</span>
            <span className="mg-r-15 tx-gray-600 tx-medium"><i className="fa fa-clock tx-info mg-r-5"></i>
              {`End: ${end}`}</span>
          </div>
          <div className="course-note mg-t-15">
            <h6 className="mg-b-3">Lesson notes:</h6>
            <p className="tx-14 mg-b-0">{SpecialRequest}</p>
          </div>
          <div className="course-docs mg-t-15">
            <h6 className="mg-b-3">Documents:</h6>
            <div /* className="docs-list" */>
              {
               /*  !!DocumentName && Array.isArray(DocumentName) && DocumentName.length > 0 && DocumentName.map((doc, index) =>
                  <a key={index} href={"#"} className="file-doc"><i className="fa fa-file mg-r-3"></i>
                    <span className="file-name">{doc.split('.')[0]}</span>
                    <span className="file-ext">{`.${doc.split('.')[1]}`}</span>
                  </a>
                ) */
                <a href={LessionMaterial} target="_blank">{DocumentName}</a>
              }
            </div>
          </div>
          </div>
          <div className="course-actions mg-t-15">
            <div className="action-left">
              <a href={`https://www.skype.com/${SkypeID}`} className="btn btn-sm btn-info d-flex justify-content-center align-items-center" target="_blank"
                rel="noopener">
                  <div><i className="fab fa-skype mg-r-5"></i> ID: <span className="tx-bold">{SkypeID}</span></div>
              </a>
              <a href={"#"} className="btn btn-sm btn-success" data-toggle="modal" data-target="#js-md-required"
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
                <i className="fas fa-edit mg-r-5"></i> Require teacher </a>
            </div>
            <div className="action-right">
              <a href={"#"} className="btn btn-sm btn-outline-danger d-flex justify-content-center align-items-center"
                rel="noopener" data-toggle="tooltip"
                title="You can only cancel this lesson before start for 30 minutes !!"
                onClick={(e) => handleCancelBooking(e, BookingID, LessionName, date, start, end)}
                data-toggle="modal" data-target="#md-cancel-schedule"
                data-placement="top">
                  <div><i data-feather="x"></i> Cancel lesson</div>
                  </a>
              {/* <span className="tx-danger">Unavailable to cancel</span> */}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default LessonUpcomingCard;