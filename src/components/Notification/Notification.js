import React from 'react';
import ReactDOM from 'react-dom';
import NotificationItem from './NotificationItem';
import SkeletonNotification from "~components/common/Skeleton/SkeletonNotification";
import { randomId } from "~src/utils"
import Pagination from "react-js-pagination";
import { getAllNotification } from "~src/api/studentAPI"

const Notification = () => {
  const [page, setPage] = React.useState(1)
  const [state, setState] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  }

  const getAPI = async () => {
    setLoading(true);
    const notifications = await getAllNotification();
    setState(notifications.Data)
    setLoading(false);
  }

  React.useEffect(() => {
    getAPI();
  }, []);


  return <React.Fragment>
    <div className="d-xl-flex align-items-center justify-content-between mg-b-30">
      <h4 className="mg-b-0 gradient-heading"><i className="fas fa-bell" /> NOTIFICATION</h4>
    </div>
    <div className="blog__wrapper">
      <div className="row row-sm mg-b-25 blog-list">
        {
          !!state && Array.isArray(state) && state.length > 0 && state.map(item =>
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
            </div>
          )
        }
      </div>
      <Pagination
        innerClass="pagination justify-content-center"
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={450}
        pageRangeDisplayed={5}
        itemClass="page-item"
        linkClass="page-link"
        onChange={handlePageChange.bind(this)}
      />
    </div>
  </React.Fragment>
}

ReactDOM.render(<Notification />, document.getElementById('react-notification'));