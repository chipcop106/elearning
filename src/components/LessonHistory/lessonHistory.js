import React from 'react'
import ReactDOM from 'react-dom'
import LessonItem from './LessonItem'
import Pagination from "react-js-pagination";
import { getLessonHistory } from "~src/api/studentAPI";
import { convertDateFromTo } from "~src/utils.js"
import SkeletonLessonHistoryCard from "~components/common/Skeleton/SkeletonLessonHistoryCard";

const initialState = {
  courseName: "",
  fromDate: "",
  toDate: "",
}

const reducer = (prevState, { type, payload }) => {
  switch (type) {
    case "STATE_CHANGE": {
      return {
        ...prevState,
        [payload.key]: payload.value
      }
    }
    default: return prevState;
      break;
  }
}

const LessonHistory = () => {
  const [searchInput, dispatch] = React.useReducer(reducer, initialState);
  const [data, setData] = React.useState({})
  const [page, setPage] = React.useState(1)
  const [loading, setLoading] = React.useState(false);

  const getAPI = async (page, searchInput) => {
    setLoading(true);
    const lessons = await getLessonHistory({
      FromDate: searchInput.fromDate,
      ToDate: searchInput.toDate,
      Page: page,
    });
    setData(lessons.Data)
    setLoading(false);
  }

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const key = target.getAttribute("name");
    dispatch({ type: "STATE_CHANGE", payload: { key, value } })
  }

  const handlePageChange = (pageNumber) => {
    if (page !== pageNumber) {
      setPage(pageNumber);
      getAPI(pageNumber, searchInput)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getAPI(1, searchInput)
  }

  React.useEffect(() => {
    $(".datetimepicker").on('change', handleChange.bind(this));
    getAPI(1, searchInput)
  }, []);

  return <React.Fragment>
    <div className="fb-summary-container pd-x-20-f pd-b-0-f pd-t-20-f ">
      <form action="" method="get" className="st-date" onSubmit={onSubmit}>
        <div className="row">
          <div className="col-12 col-md-3 form-group">
            <select name="courseName" id="" className="form-control" defaultValue="Course name" onChange={handleChange}>
              <option value="">Course name</option>
              <option value="IELTS 8.0 Professional">IELTS 8.0 Professional</option>
            </select>
          </div>
          <div className="col-12 col-sm-6 col-md-3 form-group">
            <input type="text" name="fromDate" className="form-control datetimepicker"
              placeholder="From date" />
          </div>
          <div className="col-12 col-sm-6 col-md-3 form-group">
            <input type="text" name="toDate" className="form-control datetimepicker"
              placeholder="To date" />
          </div>
          <div className="form-group col-md-3">
            <button type="submit" className="btn btn-info btn-block"><i className="fa fa-search mg-r-5"></i>Search</button>
          </div>
        </div>
      </form>
    </div>
    <div className="table-responsive">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Course</th>
            <th>Date</th>
            <th>Lesson</th>
            <th>Teacher</th>
            <th>Checkin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            loading ? <SkeletonLessonHistoryCard /> :
              !!data && Array.isArray(data) && data.length > 0 &&
              data.map(item => <LessonItem
                key={item.CoursesID}
                CoursesID={item.CoursesID}
                CoursesName={item.CoursesName}
                LessionID={item.LessionID}
                LessionName={item.LessionName}
                start={convertDateFromTo(item.SchudeDate).fromTime}
                end={convertDateFromTo(item.SchudeDate).endTime}
                date={convertDateFromTo(item.SchudeDate).date}
                Teacher={item.Teacher}
                Status={item.Status} />)
          }
        </tbody>
      </table>
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
  </React.Fragment>
}

ReactDOM.render(<LessonHistory />, document.getElementById('react-lesson-history'));