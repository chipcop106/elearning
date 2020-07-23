import React from 'react';
import ReactDOM from 'react-dom';
import StudentCommnetItem from "~components/common/StudentComment/StudentCommentItem";
import SkeletonFeedback from "~components/common/Skeleton/SkeletonFeedback";
import Pagination from "react-js-pagination";
import styles from "~components/Feedback/Feedback.module.scss"

const initialState = {
  averageRate: 4.5,
  feedbacks: [
    {
      id: randomId(),
      StudentUID: randomId(),
      StudentName: 'Truong Van Lam',
      StudentIMG: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
      Evaluation: 'This course is so great',
      CreatedDate: new Date(),
      LessionName: 'Lesson 6: ReactJS application',
      LessionID: randomId(),
      Rate: 3.5,
    },
    {
      id: randomId(),
      StudentUID: randomId(),
      StudentName: 'Truong Van Lam',
      StudentIMG: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
      Evaluation: 'This course is so great',
      CreatedDate: new Date(),
      LessionName: 'Lesson 6: ReactJS application',
      LessionID: randomId(),
      Rate: 5,
    },
    {
      id: randomId(),
      StudentUID: randomId(),
      StudentName: 'Hoang Van Thai',
      StudentIMG: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
      Evaluation: 'This course is so great',
      CreatedDate: new Date(),
      LessionName: 'Lesson 6: ReactJS application',
      LessionID: randomId(),
      Rate: 4,
    },
    {
      id: randomId(),
      StudentUID: randomId(),
      StudentName: 'Truong Van Lam',
      StudentIMG: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
      Evaluation: 'Hello world',
      CreatedDate: new Date(),
      LessionName: 'Lesson 6: ReactJS application',
      LessionID: randomId(),
      Rate: 1,
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
    else if(filter === 1) return item.Rate === 5;
    else if(filter === 2) return item.Rate >= 3 && item.Rate < 5;
    else return item.Rate <3
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
                <label>
                  <input type="radio" name="fbType" group="feedback" defaultChecked />
                  <span>All feedbacks</span>
                </label>
              </div>
            </div>
            <div className="fb-type">
              <div className="fb-radio">
                <label>
                  <input type="radio" name="fbType" group="feedback" />
                  <span><span className="number">5</span> <i className="star fa fa-star"></i></span>
                </label>
              </div>
            </div>
            <div className="fb-type">
              <div className="fb-radio">
                <label>
                  <input type="radio" name="fbType" group="feedback" />
                  <span><span className="number">4</span> <i className="star fa fa-star"></i></span>
                </label>
              </div>
            </div>
            <div className="fb-type">
              <div className="fb-radio">
                <label>
                  <input type="radio" name="fbType" group="feedback" />
                  <span><span className="number">3</span> <i className="star fa fa-star"></i></span>
                </label>
              </div>
            </div>
            <div className="fb-type">
              <div className="fb-radio">
                <label>
                  <input type="radio" name="fbType" group="feedback" />
                  <span><span className="number">2</span> <i className="star fa fa-star"></i></span>
                </label>
              </div>
            </div>
            <div className="fb-type">
              <div className="fb-radio">
                <label>
                  <input type="radio" name="fbType" group="feedback" />
                  <span><span className="number">1</span> <i className="star fa fa-star"></i></span>
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
                  <StudentCommnetItem
                  key={item.id}
                  StudentUID={item.StudentUID}
                  CreatedDate={item.CreatedDate}
                  StudentName={item.StudentName}
                  StudentIMG={item.StudentIMG}
                  Evaluation={item.Evaluation}
                  Rate={item.Rate}
                  LessionName={item.LessionName}
                  LessionID={item.LessionID}/>)
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
