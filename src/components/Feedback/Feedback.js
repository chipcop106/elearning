import React from 'react';
import ReactDOM from 'react-dom';
import StudentCommnetItem from "~components/common/StudentComment/StudentCommentItem";
import SkeletonFeedback from "~components/common/Skeleton/SkeletonFeedback";
import Pagination from "react-js-pagination";

import { getFeedbackOverviewAPI } from "~src/api/studentAPI";
import { getListEvaluationAPI } from "~src/api/studentAPI";

import styles from "~components/Feedback/Feedback.module.scss"

const initialState = [
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

const Feedback = () => {
  const [overview, setOverview] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1)
  const [feedback, setFeedback] = React.useState(initialState);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  }

  const getOverViewAPI = async () => {
    setLoading(true);
    const res = await getFeedbackOverviewAPI();
    if (res.Code === 1) {
      setOverview(res.Data)
    }
    setLoading(false);
  }

  React.useEffect(() => {
    getOverViewAPI();
  }, []);

  return !loading && (
    <>
      <div className="d-xl-flex align-items-center justify-content-between mg-b-30">
        <h4 className="mg-b-0 gradient-heading"><i className="fas fa-comment-dots"></i>FEEDBACK</h4>
      </div>
      <div className="mg-t-30 feedback-container">
        <div className="fb-summary-container">
          <p className="tx-16">Last 100 Parent Feedback Average: <span className="tx-warning tx-20 tx-bold">{overview.Avarage}</span></p>
          {/* <p className="tx-gray-500 tx-14">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus iure doloremque aperiam neque, tenetur harum soluta non pariatur explicabo sed ab vero assumenda dolore molestias, dicta voluptates officiis error tempora?</p> */}
          <div className="fb-summary">
            <div className="fb-type w-100">
              <div className="fb-radio">
                <label>
                  <input type="radio" name="fbType" group="feedback" defaultChecked />
                  <span>All feedbacks</span>
                  <span className="number">{overview.AllEvaluation}</span>
                </label>
              </div>
            </div>
            <div className="fb-type">
              <div className="fb-radio">
                <label>
                  <input type="radio" name="fbType" group="feedback" />
                  <span>
                    <i className="star fa fa-star"></i>
                    <i className="star fa fa-star"></i>
                    <i className="star fa fa-star"></i>
                    <i className="star fa fa-star"></i>
                    <i className="star fa fa-star"></i>
                    <span className="number">{overview.EvaluationRate5}</span>
                  </span>
                </label>
              </div>
            </div>
            <div className="fb-type">
              <div className="fb-radio">
                <label>
                  <input type="radio" name="fbType" group="feedback" />
                  <span>
                    <i className="star fa fa-star"></i>
                    <i className="star fa fa-star"></i>
                    <i className="star fa fa-star"></i>
                    <i className="star fa fa-star"></i>
                    <span className="number">{overview.EvaluationRate4}</span>
                  </span>
                </label>
              </div>
            </div>
            <div className="fb-type">
              <div className="fb-radio">
                <label>
                  <input type="radio" name="fbType" group="feedback" />
                  <span>
                    <i className="star fa fa-star"></i>
                    <i className="star fa fa-star"></i>
                    <i className="star fa fa-star"></i>
                    <span className="number">{overview.EvaluationRate3}</span>
                  </span>
                </label>
              </div>
            </div>
            <div className="fb-type">
              <div className="fb-radio">
                <label>
                  <input type="radio" name="fbType" group="feedback" />
                  <span>
                    <i className="star fa fa-star"></i>
                    <i className="star fa fa-star"></i>
                    <span className="number">{overview.EvaluationRate2}</span>
                  </span>
                </label>
              </div>
            </div>
            <div className="fb-type">
              <div className="fb-radio">
                <label>
                  <input type="radio" name="fbType" group="feedback" />
                  <span>
                    <i className="star fa fa-star"></i>
                    <span className="number">{overview.EvaluationRate1}</span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        {
          loading ? <SkeletonFeedback /> :
            <div className="fb-list">
              {
                !!feedback && feedback.length > 0 && feedback.map(item =>
                  <StudentCommnetItem
                    key={item.id}
                    StudentUID={item.StudentUID}
                    CreatedDate={item.CreatedDate}
                    StudentName={item.StudentName}
                    StudentIMG={item.StudentIMG}
                    Evaluation={item.Evaluation}
                    Rate={item.Rate}
                    LessionName={item.LessionName}
                    LessionID={item.LessionID} />)
              }
            </div>
        }
      </div>
      <Pagination
        innerClass="pagination justify-content-end mt-3"
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={450}
        pageRangeDisplayed={3}
        itemClass="page-item"
        linkClass="page-link"
        onChange={handlePageChange.bind(this)}
      />
    </>
  )
}

ReactDOM.render(<Feedback />, document.getElementById('react-feedback'));
