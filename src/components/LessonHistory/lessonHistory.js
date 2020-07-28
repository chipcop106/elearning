import React from 'react'
import ReactDOM from 'react-dom'
import LessonItem from './LessonItem'
import Pagination from "react-js-pagination";
import { getLessonHistory } from "~src/api/studentAPI";
import { convertDateFromTo } from "~src/utils.js"
import SkeletonLessonHistoryCard from "~components/common/Skeleton/SkeletonLessonHistoryCard";
import Flatpickr from 'react-flatpickr';
import styles from "~components/LessonHistory/lessonHistory.module.scss"
import { NOT_DATA_FOUND } from "~components/common/Constant/message"

const initialState = {
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
  const [data, setData] = React.useState({});

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(0);
  const [totalResult, setTotalResult] = React.useState(0);

  const [loading, setLoading] = React.useState(false);

  const getAPI = async (params) => {
    setLoading(true);
    const res = await getLessonHistory(params);
    if (res.Code === 1) {
      setData(res.Data)
      setPageSize(res.PageSize);
      setTotalResult(res.TotalResult)
    }
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
      getAPI({
        FromDate: searchInput.fromDate,
        ToDate: searchInput.toDate,
        Page: pageNumber,
      })
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getAPI({
      FromDate: searchInput.fromDate,
      ToDate: searchInput.toDate,
      Page: 1,
    })
    setPage(1);
  }

  React.useEffect(() => {
    getAPI({
      FromDate: searchInput.fromDate,
      ToDate: searchInput.toDate,
      Page: 1,
    })
  }, []);

  return <React.Fragment>
    <div className="fb-summary-container pd-x-20-f pd-b-0-f pd-t-20-f ">
      <form action="" method="get" className="st-date metronic-form" onSubmit={onSubmit}>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 form-group">
            <Flatpickr
              placeholder="From date"
              options={{
                dateFormat: "d/m/Y",
                static: true,
              }}
              className="form-control"
              onChange={(selectedDates, dateStr, instance) => {
                dispatch({ type: "STATE_CHANGE", payload: { key: "fromDate", value: dateStr } })
              }} />
          </div>
          <div className="col-12 col-sm-6 col-md-4 form-group">
            <Flatpickr
              placeholder="To date"
              options={{
                dateFormat: "d/m/Y",
                static: true,
              }}
              className="form-control"
              onChange={(selectedDates, dateStr, instance) => {
                dispatch({ type: "STATE_CHANGE", payload: { key: "toDate", value: dateStr } })
              }} />
          </div>
          <div className="form-group col-md-4">
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
              !!data && Array.isArray(data) && data.length > 0 ?
                data.map(item => <LessonItem
                  key={item.CoursesID}
                  BookingID={item.BookingID}
                  DocumentID={item.DocumentID}
                  DocumentName={item.DocumentName}
                  DocumentDetailID={item.DocumentDetailID}
                  LessionName={item.LessionName}
                  start={convertDateFromTo(item.Schedule).fromTime}
                  end={convertDateFromTo(item.Schedule).endTime}
                  date={convertDateFromTo(item.Schedule).date}
                  TeacherUID={item.TeacherUID}
                  TeacherName={item.TeacherName}
                  Status={item.Status}
                  StatusString={item.StatusString} />) :
                <tr>
                  <td>
                    <NOT_DATA_FOUND />
                  </td>
                </tr>
          }
        </tbody>
      </table>
    </div>
    {
      pageSize < totalResult && <Pagination
        innerClass="pagination justify-content-end mt-3"
        activePage={page}
        itemsCountPerPage={pageSize}
        totalItemsCount={totalResult}
        pageRangeDisplayed={3}
        itemClass="page-item"
        linkClass="page-link"
        onChange={handlePageChange.bind(this)} />
    }
  </React.Fragment>
}

ReactDOM.render(<LessonHistory />, document.getElementById('react-lesson-history'));