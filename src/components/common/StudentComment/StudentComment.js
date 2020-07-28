import React from 'react';
import ReactDOM from 'react-dom';
import StudentCommentItem from "./StudentCommentItem"
import Pagination from "react-js-pagination";
import { getAllStudentReviewAPI } from "~src/api/studentAPI";
/* import { isTouchCapable } from 'react-select/src/utils'; */

const StudentComment = ({ TeacherUID }) => {
  const [state, setState] = React.useState([]);
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(0);
  const [totalResult, setTotalResult] = React.useState(0);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    getCommentAPI({
      TeacherUID,
      Page: pageNumber,
    })
  }

  const getCommentAPI = async (params) => {
    const res = await getAllStudentReviewAPI(params);
    if (res.Code === 1) {
      setState(res.Data)
      setPageSize(res.PageSize);
      setTotalResult(res.TotalResult)
    }
  }

  React.useEffect(() => {
    getCommentAPI({
      TeacherUID,
      Page: page,
    })
  }, [])
  return (
    <div className="tc-comment-wrap bd-t-0-f mg-t-0-f pd-t-0-f">
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
        itemsCountPerPage={pageSize}
        totalItemsCount={totalResult}
        pageRangeDisplayed={3}
        itemClass="page-item"
        linkClass="page-link"
        onChange={handlePageChange.bind(this)} />
    </div>
  )
}
export default StudentComment;