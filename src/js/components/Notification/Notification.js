import React from 'react';
import ReactDOM from 'react-dom';
import NotificationItem from './NotificationItem';
import SkeletonNotification from "../common/Skeleton/SkeletonNotification";
import { randomId } from "../../utils"

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
  const [state, setState] = React.useState(initialState)
  const [loading, setLoading] = React.useState(false)
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
        <nav aria-label="Page navigation" className="mg-t-15">
          <ul className="pagination mg-b-0 justify-content-center">
            <li className="page-item disabled"><a className="page-link page-link-icon" href="#"><i data-feather="chevron-left" /></a></li>
            <li className="page-item active"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item"><a className="page-link page-link-icon" href="#"><i data-feather="chevron-right" /></a></li>
          </ul>
        </nav>
      </div>
      </React.Fragment>
}

ReactDOM.render(<Notification />, document.getElementById('react-notification'));