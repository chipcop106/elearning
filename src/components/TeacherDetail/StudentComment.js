import React from 'react';
import ReactDOM from 'react-dom';
import StudentCommentItem from "./StudentCommentItem"
import Pagination from "react-js-pagination";

const initialState = {
  list: [{
    name: "Henry",
    avatar: "bg-status2.jpg",
    content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    Error earum molestias consequatur, iusto accusantium minima est saepe
    porro id odit nam, numquam voluptates quis repudiandae veniam. Provident
    illum et voluptate. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    Quaerat aliquam magni impedit vitae sit expedita totam labore neque, dolores
    eos veritatis? Qui nisi, ipsa nostrum nulla labore esse dicta. Aspernatur.`,
    time: "10:30",
    date: "20/09/2019",
  }, {
    name: "John",
    avatar: "bg-status2.jpg",
    content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    Error earum molestias consequatur, iusto accusantium minima est saepe
    porro id odit nam, numquam voluptates quis repudiandae veniam. Provident
    illum et voluptate. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    Quaerat aliquam magni impedit vitae sit expedita totam labore neque, dolores
    eos veritatis? Qui nisi, ipsa nostrum nulla labore esse dicta. Aspernatur.`,
    time: "10:30",
    date: "20/09/2019",
  }, {
    name: "Steven",
    avatar: "bg-status2.jpg",
    content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    Error earum molestias consequatur, iusto accusantium minima est saepe
    porro id odit nam, numquam voluptates quis repudiandae veniam. Provident
    illum et voluptate. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    Quaerat aliquam magni impedit vitae sit expedita totam labore neque, dolores
    eos veritatis? Qui nisi, ipsa nostrum nulla labore esse dicta. Aspernatur.`,
    time: "10:30",
    date: "20/09/2019",
  }, {
    name: "Kim",
    avatar: "bg-status2.jpg",
    content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    Error earum molestias consequatur, iusto accusantium minima est saepe
    porro id odit nam, numquam voluptates quis repudiandae veniam. Provident
    illum et voluptate. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    Quaerat aliquam magni impedit vitae sit expedita totam labore neque, dolores
    eos veritatis? Qui nisi, ipsa nostrum nulla labore esse dicta. Aspernatur.`,
    time: "10:30",
    date: "20/09/2019",
  }],
  comment: "",
}
const StudentComment = () => {
  const [state, setState] = React.useState(initialState);
  const [page, setPage] = React.useState(1)

  const handlePageChange = (pageNumber) =>  {
    setPage(pageNumber);
  }

  const handleChange = (e) => {
    setState({...state, comment:e.target.value})
  }
  const onSubmit = (e) => {
    e.preventDefault()
    console.log(state)
  }
  return (
    <div className="tc-comment-wrap bd-t-0-f mg-t-0-f pd-t-0-f">
      <h5>Leave comment for this teacher:</h5>
      <div className="leave-comment mg-b-30">
        <div className="form-group cmt-box">
          <textarea rows="5" className="form-control" onChange={handleChange}></textarea>
        </div>
        <div className="cmt-action">
          <a href={"#"}
            className="btn btn-primary mg-r-10" onClick={onSubmit}>Submit</a>
          <a href={"#"}
            className="btn btn-light btn-cancel-form">Cancel</a>
        </div>
      </div>
      <h6 className="mg-b-15">{state.list.length} student has comment for this teacher:</h6>
      <div className="comment__wrapper">
        {
          !!state.list && state.list.length > 0 && state.list.map((item, index)=>
            <StudentCommentItem
                    key={index}
                    name={item.name}
                    avatar={item.avatar}
                    content={item.content}
                    date={item.date}
                    time={item.time} />)
        }
      </div>
       <Pagination
          innerClass="pagination justify-content-end mt-3"
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          itemClass="page-item"
          linkClass="page-link"
          onChange={handlePageChange.bind(this)}
            />
    </div>
  )
}
export default StudentComment;