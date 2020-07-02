import { convertTime } from "../../utils.js";
import { convertDay } from "../../utils.js";

import styles from '~components/StudentDashboard/LessonHistoryCard.module.scss';

const LessonHistoryCard = ({ onHandleChooseRatingCourse, item }) => {
  const handleChooseRatingCourse = (item) => {
    onHandleChooseRatingCourse(item)
  }
  return (
    <li className="cr-item lesson-info">
      <div className="media">
        <div className="teacher-information">
          <a className="teacher-avatar" href={"#"}>
            <img src={item.images} className="teacher-image" alt="" />
            <p className="course-teacher tx-14 tx-gray-800 tx-normal mg-b-0 tx-center mg-t-5 d-block">
              {item.teacher}
            </p>
          </a>
        </div>
        <div className="media-body  mg-l-20 pos-relative">
          <h5 className="mg-b-10">
            <span className="badge badge-success">Finished</span>{' '}
            <a href="lesson-detail.html" className="course-name tx-bold">
              {item.courseName}
            </a>
          </h5>
          <div className="course-information tx-14">
            <span className="mg-r-15 tx-gray-600 tx-medium">
              <i className="fa fa-calendar  tx-info mg-r-5"></i>
              {convertDay(item.date) + ' ' + item.date}
            </span>
            <span className="mg-r-15 tx-gray-600 tx-medium">
              <i className="fa fa-clock  tx-info mg-r-5"></i>
              {`Start: ${item.startTime} ${convertTime(item.startTime)}`}</span>
            <span className="mg-r-15 tx-gray-600 tx-medium">
              <i className="fa fa-clock  tx-info mg-r-5"></i>
              {`End: ${item.endTime} ${convertTime(item.endTime)}`}</span>
          </div>
          <div className="course-note mg-t-15">
            <h6 className="mg-b-3">Teacher note:</h6>
            <p className="tx-14 mg-b-0">Student have a good speaking skill.</p>
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
                <span className="filled-stars" style={{ width: `${item.ratingCourse}%`, }}>
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
                onClick={() => handleChooseRatingCourse(item)}
                data-target="#js-md-rate">Rating now!</a>
            </div>
          </div>
          <div className="course-actions">
            <div className="action-left">
              <a href="lesson-detail.html" className="btn btn-sm btn-warning mg-r-10" target="_blank"
                rel="noopener">
                <i className="fas fa-vote-yea mg-r-5"></i> <span>Detail lesson</span></a>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default LessonHistoryCard;