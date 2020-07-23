import React from 'react';
import ReactDOM from 'react-dom';
import NotificationItem from './NotificationItem';
import SkeletonNotification from "~components/common/Skeleton/SkeletonNotification";
import Pagination from "react-js-pagination";
import { getAllNotification } from "~src/api/studentAPI"

const Notification = () => {
  const [page, setPage] = React.useState(1)
  const [state, setState] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    getAPI({
      page: pageNumber,
    });
  }

  const getAPI = async (params) => {
    setLoading(true);
    const res = await getAllNotification(params);
    if (res.Code === 1) {
      setState(res.Data)
    }
    setLoading(false);
  }

  React.useEffect(() => {
    getAPI({
      page,
    });
  }, []);


  return <>
    <div className="d-xl-flex align-items-center justify-content-between mg-b-30">
      <h4 className="mg-b-0 gradient-heading"><i className="fas fa-bell" /> NOTIFICATION</h4>
    </div>
    {
      !!state && Array.isArray(state) && state.length > 0 ?
      <div className="blog__wrapper">
        <div className="row row-sm mg-b-25 blog-list">
          {
            state.map(item =>
              <div className="col-md-6 col-lg-4 mg-t-20" key={item.NotificationID}>
                {
                  loading ? <SkeletonNotification /> :
                    <NotificationItem
                      NotificationID={item.NotificationID}
                      NotificationTitle={item.NotificationTitle}
                      NotifictionIMG={item.NotifictionIMG}
                      CreatedBy={item.CreatedBy}
                      CreatedDate={item.CreatedDate}
                      NotificationContent={item.NotificationContent}
                      URL={item.URL} />
                }
              </div>)
          }
        </div>
        <Pagination
          innerClass="pagination justify-content-center"
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={3}
          itemClass="page-item"
          linkClass="page-link"
          onChange={handlePageChange.bind(this)} />
      </div>:<h2>Không có dữ liệu</h2>
    }
  </>
}

ReactDOM.render(<Notification />, document.getElementById('react-notification'));