import React from 'react';
import ReactDOM from 'react-dom';
import { convertTime, convertDay } from "../../utils.js";

import styles from '~components/StudentDashboard/LessonHistoryCard.module.scss';

const LessonHistoryCard = ({
  onHandleRatingLesson,
  id,
  avatar,
  teacher,
  name,
  note,
  date,
  start,
  end,
  rating }) => {
  const handleRatingLesson = (id, teacher) => {
    onHandleRatingLesson(id, teacher)
  }
  return (
    <React.Fragment>
    <li className="cr-item lesson-info">
      <div className="media">
        <div className="teacher-information">
          <a className="teacher-avatar" href="teacherDetail.html">
            <img src={avatar} className="teacher-image" alt="" />
            <p className="course-teacher tx-14 tx-gray-800 tx-normal mg-b-0 tx-center mg-t-5 d-block">
              {teacher}
            </p>
          </a>
        </div>
        <div className="media-body  mg-l-20 pos-relative">
          <h5 className="mg-b-10">
            <span className="badge badge-success">Finished</span>{' '}
            <a href="lessonDetail.html" className="course-name tx-bold">
              {name}
            </a>
          </h5>
          <div className="course-information tx-14">
            <span className="mg-r-15 tx-gray-600 tx-medium">
              <i className="fa fa-calendar  tx-info mg-r-5"></i>
              {convertDay(date) + ' ' + date}
            </span>
            <span className="mg-r-15 tx-gray-600 tx-medium">
              <i className="fa fa-clock  tx-info mg-r-5"></i>
              {`Start: ${start} ${convertTime(start)}`}</span>
            <span className="mg-r-15 tx-gray-600 tx-medium">
              <i className="fa fa-clock  tx-info mg-r-5"></i>
              {`End: ${end} ${convertTime(end)}`}</span>
          </div>
          <div className="course-note mg-t-15">
            <h6 className="mg-b-3">Teacher note:</h6>
            <p className="tx-14 mg-b-0">{note}</p>
          </div>
          <div className="course-rate mg-t-15">
            <h6 className="mg-b-3">Rating lesson:</h6>
            <div className="rating-wrap ">
              <div className="rating-stars">
                <span className="empty-stars">
                  <i className="star fa fa-star"></i>
                  <i className="star fa fa-star"></i>
                  <i className="star fa fa-star"></i>
                  <i className="star fa fa-star"></i>
                  <i className="star fa fa-star"></i>
                </span>
                <span className="filled-stars" style={{ width: `${rating}%` }}>
                  <i className="star fa fa-star"></i>
                  <i className="star fa fa-star"></i>
                  <i className="star fa fa-star"></i>
                  <i className="star fa fa-star"></i>
                  <i className="star fa fa-star"></i>
                </span>
              </div>
              <a href={"#"}
                className="rate-now"
                data-toggle="modal"
                data-target="#js-md-rate"
                onClick={()=>handleRatingLesson(id, teacher)}>Rating now!</a>
            </div>
          </div>
          <div className="course-actions">
            <div className="action-left">
              <a href="lessonDetail.html" className="btn btn-sm btn-warning mg-r-10" target="_blank"
                rel="noopener">
                <i className="fas fa-vote-yea mg-r-5"></i> <span>Detail lesson</span></a>
            </div>
          </div>
        </div>
      </div>
    </li>
    </React.Fragment>
  )
}

export default LessonHistoryCard;