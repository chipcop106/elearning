import React from 'react';
import ReactDOM from 'react-dom';
import styles from '~components/common/StudentComment/StudentCommentItem.module.scss';

const StudentCommentItem = ({
  ScheduleTimeVN,
  TeacherName,
  TeacherIMG,
  Note,
  Rate,
  LinkDetail,
  DocumentName,

  CreatedDate,
  Evaluation,
  StudentIMG,
  StudentName,
}) => {
  return (
    <div className="fb-item">
      <div className="fb-avatar">
        <img src={!!TeacherIMG ? TeacherIMG : !!StudentIMG ? StudentIMG : "../assets/img/default-avatar.png"}
        alt="avatar" className="avatar"
        onError={(e)=>{e.target.onerror = null; e.target.src="../assets/img/default-avatar.png"}} />
      </div>
      <div className="fb-info">
        <div className="name-rating">
          <p className="name">{!!TeacherName ? TeacherName : !!StudentName ? StudentName: ""}</p>
          <div className="rating-wrap">
            <div className="rating-stars">
              <span className="empty-stars">
                <i className="star fa fa-star"></i>
                <i className="star fa fa-star"></i>
                <i className="star fa fa-star"></i>
                <i className="star fa fa-star"></i>
                <i className="star fa fa-star"></i>
              </span>
              <span className="filled-stars" style={{ width: `${Rate * 20}%` }}>
                <i className="star fa fa-star"></i>
                <i className="star fa fa-star"></i>
                <i className="star fa fa-star"></i>
                <i className="star fa fa-star"></i>
                <i className="star fa fa-star"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="feedback-comment">
          <p style={{ wordBreak:"break-all" }}>{!!Note ? Note: !!Evaluation ? Evaluation : ""}</p>
        </div>
        <div className="metas">
          {
            ScheduleTimeVN ? <div className="meta">Time: <span>{ScheduleTimeVN} </span>  </div>:
            CreatedDate ? <div className="meta">Time: <span>{moment(CreatedDate).format("LLLL")}</span> </div>: ""
          }
          {
            DocumentName && <div className="meta">{DocumentName}</div>
          }
        </div>
        {
          LinkDetail && <div className="readmore">
          <a href={LinkDetail}>See Detail <i className="fas fa-arrow-right"></i></a>
          </div>
        }
      </div>
    </div>
  )
}

export default StudentCommentItem;
