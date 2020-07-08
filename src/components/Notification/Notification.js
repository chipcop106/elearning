import React from 'react';
import ReactDOM from 'react-dom';
import NotificationItem from './NotificationItem';
import SkeletonNotification from "../common/Skeleton/SkeletonNotification";
import { randomId } from "../../utils"
import Pagination from "react-js-pagination";

const initialState = [{
  id: randomId(),
  title: "Chương Trình “Giúp Bạn Học Ngay, Nhận Quà Liền Tay",
  thumnail: "https://www.campusfrance.org/sites/default/files/parrainage.jpg",
  author: "Trường Minh",
  time: "20/04/2019 10:30AM",
  content: `Activate a modal without writing JavaScript. Set data-toggle="modal" on a controller element, like a button...`
},{
  id: randomId(),
  title: "Chương Trình “Giúp Bạn Học Ngay, Nhận Quà Liền Tay",
  thumnail: "https://www.campusfrance.org/sites/default/files/parrainage.jpg",
  author: "Trường Minh",
  time: "20/04/2019 10:30AM",
  content: `Activate a modal without writing JavaScript. Set data-toggle="modal" on a controller element, like a button...`
},{
  id: randomId(),
  title: "Chương Trình “Giúp Bạn Học Ngay, Nhận Quà Liền Tay",
  thumnail: "https://www.campusfrance.org/sites/default/files/parrainage.jpg",
  author: "Trường Minh",
  time: "20/04/2019 10:30AM",
  content: `Activate a modal without writing JavaScript. Set data-toggle="modal" on a controller element, like a button...`
},{
  id: randomId(),
  title: "Chương Trình “Giúp Bạn Học Ngay, Nhận Quà Liền Tay",
  thumnail: "https://www.campusfrance.org/sites/default/files/parrainage.jpg",
  author: "Trường Minh",
  time: "20/04/2019 10:30AM",
  content: `Activate a modal without writing JavaScript. Set data-toggle="modal" on a controller element, like a button...`
}]

const Notification = () => {
  const [page, setPage] = React.useState(1)
  const [state, setState] = React.useState(initialState)
  const [loading, setLoading] = React.useState(false)

  const handlePageChange = (pageNumber) =>  {
    setPage(pageNumber);
  }

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);


  return <React.Fragment>
      <div className="d-xl-flex align-items-center justify-content-between mg-b-30">
        <h4 className="mg-b-0 gradient-heading"><i className="fas fa-bell" /> NOTIFICATION</h4>
      </div>
      <div className="blog__wrapper">
        <div className="row row-sm mg-b-25 blog-list">
            {
              !!state && Array.isArray(state) && state.length>0 && state.map(item => 
                  <div className="col-md-6 col-lg-4 mg-t-20" key={item.id}>
                    {
                      loading ? <SkeletonNotification/> :
                      <NotificationItem
                          title={item.title}
                          thumnail={item.thumnail}
                          author={item.author}
                          time={item.time}
                          content={item.content}/>
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