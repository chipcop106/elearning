import React from 'react';
import ReactDOM from 'react-dom';

const StudentCommentItem = ({ name, avatar, content, date, time }) => {
  const [comment, setComment] = React.useState(content)
  const [showEditCommet, setShowEditComment] = React.useState(false)
  const [editedComment, setEdittedComment] = React.useState(content)
  const [commentTooShort, setCommentTooShort] = React.useState(null)

  const _onChange = (e) => {
    setEdittedComment(e.target.value);
  }

  const _saveEditComment = () => {
    if (editedComment.length < 10) {
      setCommentTooShort("Your comment at least 10 characters")
    }
    else {
      setCommentTooShort(null);
      setComment(editedComment);
      setShowEditComment(false);
      /* Call API */
    }
  }

  const _hideEditBox = () => {
    setShowEditComment(false);
    setCommentTooShort(null);
  }

  const _showEditBox = (e) => {
    e.preventDefault();
    setShowEditComment(true);
  }

  React.useEffect(() => {
  }, [showEditCommet, editedComment])

  return (
    <div className="tc-comment">
      <img src={`../assets/img/${avatar}`} alt="avatar"
        className="avatar avatar rounded-circle" />
      <div className="tc-content">
        <div className="box">
          <p className="teacher-name">{name}</p>
          <p className="mg-b-0">{comment}</p>
        </div>
        <div className="meta">
          <div className="date">Comment at {time} | {date}</div>
        </div>
        <a href={"#"} className="edit-box" onClick={_showEditBox}><i
          className="fa fa-edit"></i></a>
        <div className={`${!showEditCommet ? 'd-none' : 'd-block'} edit-form flex-grow-1 mg-l-10 rounded-10 bd-1 bd-primary`}>
          <textarea className="form-control" rows="5" onChange={_onChange} value={editedComment} />
          {
            commentTooShort && <p className="tx-danger">{commentTooShort}</p>
          }
          <div className="mg-t-10">
            <button type="button" className="btn btn-primary mg-r-10 btn-sm" onClick={_saveEditComment}><i className="fa fa-save mg-r-5"></i> Save</button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={_hideEditBox} ><i className="fa fa-times mg-r-5"></i> Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentCommentItem;