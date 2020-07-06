import React from 'react';
import ReactDOM from 'react-dom';

const StudentCommentItem = ({ name, avatar, content, date, time }) => {
  return (
    <div className="tc-comment">
      <img src={`../assets/img/${avatar}`} alt="avatar"
        className="avatar avatar rounded-circle" />
      <div className="tc-content">
        <div className="box">
          <p className="teacher-name">{name}</p>
          <p className="mg-b-0">{content}</p>
        </div>
        <div className="meta">
          <div className="date">Comment at {time} | {date}</div>
        </div>
        <a href={"#"} className="edit-box"><i
          className="fa fa-edit"></i></a>
      </div>
    </div>
  )
}

export default StudentCommentItem;