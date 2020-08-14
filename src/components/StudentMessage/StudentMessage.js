import React from 'react';
import ReactDOM from 'react-dom';
import { randomId } from "~src/utils"
import Skeleton from "react-loading-skeleton";
import Pagination from "react-js-pagination";

import styles from '~components/StudentMessage/StudentMessage.module.scss';

let initialState = [{
  id: randomId(),
  time: new Date(),
  content: "Lorem isum favor Lorem isum favor Lorem isum favor Lorem isum favor ",
}, {
  id: randomId(),
  time: "2020-08-14T11:01:22",
  content: "Lorem isum favor Lorem isum favor Lorem isum favor Lorem isum favor ",
}, {
  id: randomId(),
  time: "2020-08-14T10:01:22",
  content: "Lorem isum favor Lorem isum favor Lorem isum favor Lorem isum favor ",
}, {
  id: randomId(),
  time: "2020-08-13T11:01:22",
  content: "Lorem isum favor Lorem isum favor Lorem isum favor Lorem isum favor ",
}, {
  id: randomId(),
  time: "2020-07-29T16:34:22",
  content: "Lorem isum favor Lorem isum favor Lorem isum favor Lorem isum favor ",
}, {
  id: randomId(),
  time: "2020-05-29T16:34:22",
  content: "Lorem isum favor Lorem isum favor Lorem isum favor Lorem isum favor ",
}, {
  id: randomId(),
  time: "2020-01-29T16:34:22",
  content: "Lorem isum favor Lorem isum favor Lorem isum favor Lorem isum favor ",
}]
const StudentMessage = () => {
  const [state, setState] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(0);
  const [totalResult, setTotalResult] = React.useState(0);

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const handlePageChange = (pageNumber) => {
    if (page !== pageNumber) {
      setPage(pageNumber);
      getAPI();
    }
  }

  const getAPI = async () => {
    setLoading(true);
    await delay(2000);
    //initialState = [];
    setState(initialState);
    setPageSize(5);
    setTotalResult(initialState.length);
    setLoading(false);
  }
  React.useEffect(() => {
    getAPI();
  }, [])
  return <>
    <div className="card card-custom shadow">
      <div className="card-body">
        <div className="notification-wrap">
          {
            loading ? <>
              <Skeleton className="d-block mg-b-5" height={12} width={66} />
              <Skeleton className="mg-b-10" height={20} width={`80%`} />
              <Skeleton className="mg-b-10" height={1} width={`100%`} />
              <Skeleton className="d-block mg-b-5" height={12} width={66} />
              <Skeleton className="mg-b-10" height={20} width={`80%`} />
              <Skeleton className="mg-b-10" height={1} width={`100%`} />
              <Skeleton className="d-block mg-b-5" height={12} width={66} />
              <Skeleton className="mg-b-10" height={20} width={`80%`} />
              <Skeleton className="mg-b-10" height={1} width={`100%`} />
              <Skeleton className="d-block mg-b-5" height={12} width={66} />
              <Skeleton className="mg-b-10" height={20} width={`80%`} />
              <Skeleton className="mg-b-10" height={1} width={`100%`} />
              <Skeleton className="d-block mg-b-5" height={12} width={66} />
              <Skeleton className="mg-b-10" height={20} width={`80%`} />
            </> :
              !!state && state.length > 0 ? state.map(item =>
                <div className="notification-item d-flex flex-wrap" key={item.id}>
                  <div className="avatar avatar-md avatar-online"><img src="../assets/img/teacher.jpg" className="rounded-circle" alt="" /></div>
                  <div className="right mg-l-10">
                    <span className="notification-time tx-gray-500 font-italic" style={{ fontSize: '12px' }}>
                      {moment(item.time).startOf("minute").fromNow()}
                    </span>
                    <p className="notification-content mg-0 position-relative">{item.content}</p>
                  </div>
                </div>) : <div className="text-center">
                  <span className="d-block tx-danger tx-medium">Bạn không có thông báo nào</span>
                  <img src="../assets/img/no-booking.svg" alt="image" className="wd-200 mg-b-15" />
                </div>
          }
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
        </div>
      </div>
    </div>
  </>
}
ReactDOM.render(<StudentMessage />, document.getElementById('react-message'));