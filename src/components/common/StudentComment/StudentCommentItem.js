import React from 'react';
import ReactDOM from 'react-dom';

const whoami = (localStorage.getItem("user") === null) ? {} :
  JSON.parse(localStorage.getItem('user'));

const StudentCommentItem = ({
  StudentUID,
  CreatedDate,
  StudentName,
  StudentIMG,
  Evaluation,
  Rate,
  LessionName,
  LessionID,
}) => {
  return (
    <div className="fb-item">
      <div className="fb-avatar">
        <img src={StudentIMG} alt="avatar" className="avatar" />
      </div>
      <div className="fb-info">
        <div className="name-rating">
          <p className="name">{StudentName}</p>
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
          <p className="">{Evaluation}</p>
        </div>
        <div className="metas">
          <div className="meta">Time: <span>{moment(CreatedDate).format("LLLL")}</span>
          </div>
          {
            LessionName && <div className="meta">{LessionName}</div>
          }
        </div>
        {
          LessionName && LessionID && <div className="readmore">
          <a href={`lessonDetail.html?ID=${LessionID}`}>See Detail <i className="fas fa-arrow-right"></i></a>
          </div>
        }
      </div>
    </div>
  )
}

export default StudentCommentItem;
