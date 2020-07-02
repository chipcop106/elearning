import React from 'react';
import ReactDOM from 'react-dom';
import { convertTime, convertDay } from "../../utils.js";

const LessonUpcomingCard = ({ onHandleChooseRequireCourse, onHandleCancelBooking, item }) => {

  const handleChooseRequireCourse = (item) => {
    onHandleChooseRequireCourse(item)
  }

  const handleCancelBooking = (e, item) => {
    e.preventDefault()
    onHandleCancelBooking(item)
  }
  return (
    <li className="cr-item lesson-info">
      <div className="media">
        <div className="teacher-information">
          <a className="teacher-avatar" href="teacherDetail.html">
            <img src={item.images} className="teacher-image" alt="" />
            <p className="course-teacher tx-14 tx-gray-800 tx-normal mg-b-0 tx-center mg-t-5 d-block">
              {item.teacher}</p>
          </a>
        </div>
        <div className="media-body  mg-l-20 pos-relative">
          <h5 className="mg-b-10 ">
            <span className="badge badge-warning">Incoming</span>{' '}
            <a href="lessonDetail.html" className="course-name tx-bold">{item.courseName}</a>
          </h5>
          <div className="course-information tx-14">
            <span className="mg-r-15 tx-gray-600 tx-medium"><i className="fa fa-calendar  tx-info mg-r-5"></i>
              {convertDay(item.date) + ' ' + item.date}</span>
            <span className="mg-r-15 tx-gray-600 tx-medium"><i className="fa fa-clock  tx-info mg-r-5"></i>
              {`Start: ${item.startTime} ${convertTime(item.startTime)}`}</span>
            <span className="mg-r-15 tx-gray-600 tx-medium"><i className="fa fa-clock  tx-info mg-r-5"></i>
              {`End: ${item.endTime} ${convertTime(item.endTime)}`}</span>
          </div>
          <div className="course-note mg-t-15">
            <h6 className="mg-b-3">Lesson notes:</h6>
            <p className="tx-14 mg-b-0">{item.note}</p>
          </div>
          <div className="course-docs mg-t-15">
            <h6 className="mg-b-3">Documents:</h6>
            <div className="docs-lists">
              {
                item.document.map((doc, index) => {
                  return <a key={index} href={"#"} className="file-doc"><i className="fa fa-file mg-r-3"></i>
                    <span className="file-name">{doc.split('.')[0]}</span>
                    <span className="file-ext">{`.${doc.split('.')[1]}`}</span>
                  </a>
                })
              }
            </div>
          </div>
          <div className="course-actions">
            <div className="action-left">
              <a href={item.skype} className="btn btn-sm btn-info mg-r-10" target="_blank"
                rel="noopener"><i className="fab fa-skype mg-r-5"></i> ID: <span
                  className="tx-bold">mona.media</span></a>
              <a href="#js-md-required" className="btn btn-sm btn-success" data-toggle="modal" onClick={() => handleChooseRequireCourse(item)}>
                <i className="fas fa-edit mg-r-5"></i> Checking lesson booking </a>
            </div>
            <div className="action-right">
              <a href={"#"} className="btn btn-sm btn-outline-danger"
                rel="noopener" data-toggle="tooltip"
                title="You can only cancel this lesson before start for 30 minutes !!"
                onClick={(e)=>handleCancelBooking(e, item)}
                data-placement="top"><i data-feather="x"></i> Cancel lesson</a>
              {/* <span className="tx-danger">Unavailable to cancel</span> */}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default LessonUpcomingCard;