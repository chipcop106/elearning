import React from 'react';
import ReactDOM from 'react-dom';
import StudentCommentItem from "./StudentCommentItem"
import Pagination from "react-js-pagination";
import { getAllStudentReviewAPI } from "~src/api/studentAPI";
import styles from '~components/common/StudentComment/StudentComment.module.scss';
/* import { isTouchCapable } from 'react-select/src/utils'; */

const whoami = (localStorage.getItem("user")===null) ? {} :
  JSON.parse(localStorage.getItem('user'));

const StudentComment = ({ TeacherUID }) => {
  const [state, setState] = React.useState([]);
  const [page, setPage] = React.useState(1)
  const [comment, setComment] = React.useState("");
  const [commentTooShort, setCommentTooShort] = React.useState(null)

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    getCommentAPI({
      TeacherUID,
      Page:pageNumber,
    })
  }

  const getCommentAPI = async (params) => {
    const res = await getAllStudentReviewAPI(params);
    if (res.Code === 1) {
      setState(res.Data)
    }
  }

  const handleChange = (e) => {
    setComment(e.target.value)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (comment.length < 10) {
      setCommentTooShort("Your comment must at least 10 characters")
    }
    else {
      /* Call API */
      console.log(whoami)
       setCommentTooShort(null);
       let newListComment = [...state]
       newListComment.push({
         StudentUID: whoami.UID,
         StudentName: whoami.FullName,
         StudentIMG: whoami.Avatar,
         CreatedDate: new Date(),
         Evaluation: comment,
       })
       setState(newListComment)
    }
  }

  React.useEffect(()=>{
    getCommentAPI({
      TeacherUID,
      Page:page,
    })
  },[])
  return (
    <div className="tc-comment-wrap bd-t-0-f mg-t-0-f pd-t-0-f">
      <h5>Leave comment for this teacher:</h5>
      <div className="leave-comment mg-b-30">
        <div className="form-group cmt-box">
          <textarea rows="5" className="form-control" value={state.comment} onChange={handleChange}></textarea>
        </div>
        {
          commentTooShort && <p className="tx-danger">{commentTooShort}</p>
        }
        <div className="cmt-action">
          <a href={"#"}
            className="btn btn-primary mg-r-10" onClick={onSubmit}>Submit</a>
          <a href={"#"}
            className="btn btn-light btn-cancel-form">Cancel</a>
        </div>
      </div>
      <h6 className="mg-b-15">{state.length} student has comment for this teacher:</h6>
      <div className="comment__wrapper">
        {
          !!state && state.length > 0 && state.map((item, index) =>
            <StudentCommentItem
              key={index}
              StudentUID={item.StudentUID}
              CreatedDate={item.CreatedDate}
              StudentName={item.StudentName}
              StudentIMG={item.StudentIMG}
              Evaluation={item.Evaluation}
              Rate={item.Rate}
              Lession={item.Lession} />)
        }
      </div>
      <Pagination
        innerClass="pagination justify-content-end mt-3"
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={450}
        pageRangeDisplayed={3}
        itemClass="page-item"
        linkClass="page-link"
        onChange={handlePageChange.bind(this)}
      />
    </div>
  )
}
export default StudentComment;