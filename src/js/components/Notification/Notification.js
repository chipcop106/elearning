import React from 'react';
import ReactDOM from 'react-dom';
import NotificationItem from './NotificationItem';

const initialState = [{
  title: "Chương Trình “Giúp Bạn Học Ngay, Nhận Quà Liền Tay",
  thumnail: "https://www.campusfrance.org/sites/default/files/parrainage.jpg",
  author: "Trường Minh",
  time: "20/04/2019 10:30AM",
  content: `Activate a modal without writing JavaScript. Set data-toggle="modal" on a controller element, like a button...`
},{
  title: "Chương Trình “Giúp Bạn Học Ngay, Nhận Quà Liền Tay",
  thumnail: "https://www.campusfrance.org/sites/default/files/parrainage.jpg",
  author: "Trường Minh",
  time: "20/04/2019 10:30AM",
  content: `Activate a modal without writing JavaScript. Set data-toggle="modal" on a controller element, like a button...`
},{
  title: "Chương Trình “Giúp Bạn Học Ngay, Nhận Quà Liền Tay",
  thumnail: "https://www.campusfrance.org/sites/default/files/parrainage.jpg",
  author: "Trường Minh",
  time: "20/04/2019 10:30AM",
  content: `Activate a modal without writing JavaScript. Set data-toggle="modal" on a controller element, like a button...`
},{
  title: "Chương Trình “Giúp Bạn Học Ngay, Nhận Quà Liền Tay",
  thumnail: "https://www.campusfrance.org/sites/default/files/parrainage.jpg",
  author: "Trường Minh",
  time: "20/04/2019 10:30AM",
  content: `Activate a modal without writing JavaScript. Set data-toggle="modal" on a controller element, like a button...`
}]

const Notification = () => {
  const [state, setState] = React.useState(initialState)
  return (
    <div className="media-body mg-t-30 mg-lg-t-0 pd-lg-x-10">
      <div className="d-xl-flex align-items-center justify-content-between mg-b-30">
        <h4 className="mg-b-0 gradient-heading"><i className="fas fa-bell" /> NOTIFICATION</h4>
      </div>
      <div className="blog__wrapper">
        <div className="row row-sm mg-b-25 blog-list">
            {
              state.map((item, index)=>{
                return (
                  <div className="col-md-6 col-lg-4 mg-t-20" key={index}>
                    <NotificationItem
                      title={item.title}
                      thumnail={item.thumnail}
                      author={item.author}
                      time={item.time}
                      content={item.content}/>
                    </div>
                )
              })
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
    </div>
  )
}

ReactDOM.render(<Notification />, document.getElementById('react-notification'));