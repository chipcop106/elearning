import React from 'react';
import ReactDOM from 'react-dom';
import SkeletonFeedback from "~components/common/Skeleton/SkeletonFeedback";
import Pagination from "react-js-pagination";
import styles from "~components/Feedback/Feedback.module.scss"

const initialState = {
  averageRate: 4.5,
  feedbacks: [
    {
      id: randomId(),
      stName: 'Truong Van Lam',
      stAvatar: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
      stFeedback: 'This course is so great',
      lessonTime: '12/06/2020 10:30AM',
      lessonName: 'Lesson 6: ReactJS application',
      rating: 3.5,
      teacherComments: []
    },
    {
      id: randomId(),
      stName: 'Truong Van Lam',
      stAvatar: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
      stFeedback: 'This course is so great',
      lessonTime: '12/06/2020 10:30AM',
      lessonName: 'Lesson 6: ReactJS application',
      rating: 5,
      teacherComments: [],
    },
    {
      id: randomId(),
      stName: 'Hoang Van Thai',
      stAvatar: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
      stFeedback: 'This course is so great',
      lessonTime: '12/06/2020 10:30AM',
      lessonName: 'Lesson 6: ReactJS application',
      rating: 4,
      teacherComments: [],
    },
    {
      id: randomId(),
      stName: 'Truong Van Lam',
      stAvatar: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
      stFeedback: 'Hello world',
      lessonTime: '12/06/2020 10:30AM',
      lessonName: 'Lesson 6: ReactJS application',
      rating: 1,
      teacherComments: []
    }
  ]
}

const Feedback = () => {
  const [state, setState] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1)
  const [filter, setFilter] = React.useState(0);

  let filteredState = [...state.feedbacks]

  filteredState = filteredState.filter(item=>{
    if(filter === 0) return true;
    else if(filter === 1) return item.rating === 5;
    else if(filter === 2) return item.rating >= 3 && item.rating < 5;
    else return item.rating <3
  })

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  }

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <React.Fragment>
      <div className="d-xl-flex align-items-center justify-content-between mg-b-30">
        <h4 className="mg-b-0 gradient-heading"><i className="fas fa-comment-dots"></i> FEEDBACK</h4>
      </div>
      <div className="mg-t-30 feedback-container">
        <div className="fb-summary-container">
          <p className="tx-16">Last 100 Parent Feedback Average: <span className="tx-warning tx-20 tx-bold">{state.averageRate}</span></p>
          <p className="tx-gray-500 tx-14">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus iure doloremque aperiam neque, tenetur harum soluta non pariatur explicabo sed ab vero assumenda dolore molestias, dicta voluptates officiis error tempora?</p>
          <div className="fb-summary">
            <div className="fb-type">
              <div className="fb-radio">
                <label onClick={()=>setFilter(0)}>
                  <input type="radio" name="fbType" group="feedback" defaultChecked />
                  <span>All comments <span className="number">{state.feedbacks.length}</span></span>
                </label>
              </div>
            </div>
            <div className="fb-type">
              <div className="fb-radio">
                <label onClick={()=>setFilter(1)}>
                  <input type="radio" name="fbType" group="feedback" />
                  <span>Excellent <span className="number">
                    {state.feedbacks.filter(item=>item.rating == 5).length}
                    </span></span>
                </label>
              </div>
            </div>
            <div className="fb-type">
              <div className="fb-radio">
                <label onClick={()=>setFilter(2)}>
                  <input type="radio" name="fbType" group="feedback" />
                  <span>Good <span className="number">
                    {state.feedbacks.filter(item=>item.rating >= 3 && item.rating < 5).length}
                  </span></span>
                </label>
              </div>
            </div>
            <div className="fb-type">
              <div className="fb-radio">
                <label onClick={()=>setFilter(3)}>
                  <input type="radio" name="fbType" group="feedback" />
                  <span>Unsatosfactory <span className="number">
                  {state.feedbacks.filter(item=>item.rating < 3).length}
                  </span></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        {
          loading ? <SkeletonFeedback /> :
            <div className="fb-list">
              {
                !!filteredState && filteredState.length > 0 && filteredState.map(item =>
                  <div className="fb-item" key={item.id}>
                    <div className="fb-avatar">
                      <img src={item.stAvatar} alt="avatar" className="avatar" />
                    </div>
                    <div className="fb-info">
                      <div className="name-rating">
                        <p className="name">{item.stName}</p>
                        <div className="rating-wrap">
                          <div className="rating-stars">
                            <span className="empty-stars">
                              <i className="star fa fa-star"></i>
                              <i className="star fa fa-star"></i>
                              <i className="star fa fa-star"></i>
                              <i className="star fa fa-star"></i>
                              <i className="star fa fa-star"></i>
                            </span>
                            <span className="filled-stars" style={{ width: `${item.rating * 20}%` }}>
                              <i className="star fa fa-star"></i>
                              <i className="star fa fa-star"></i>
                              <i className="star fa fa-star"></i>
                              <i className="star fa fa-star"></i>
                              <i className="star fa fa-star"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="feedback-comment">
                        <p className="">{item.stFeedback}</p>
                      </div>
                      <div className="metas">
                        <div className="meta">Time: <span>{item.lessonTime}</span>
                        </div>
                        <div className="meta">
                          {item.lessonName}
                        </div>
                      </div>
                      <div className="readmore">
                          <a href="lessonDetail.html">See Detail <i className="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                  </div>
                )
              }
            </div>
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
    </React.Fragment>
  )
}

ReactDOM.render(<Feedback />, document.getElementById('react-feedback'));
