import React from 'react';
import ReactDOM from 'react-dom';
import StudentCommentItem from "~components/common/StudentComment/StudentCommentItem";
import SkeletonFeedback from "~components/common/Skeleton/SkeletonFeedback";
import Pagination from "react-js-pagination";

import { getFeedbackOverviewAPI } from "~src/api/studentAPI";
import { getListEvaluationAPI } from "~src/api/studentAPI";
import { NOT_DATA_FOUND } from "~components/common/Constant/message"

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
  const [loadingListEvaluation, setLoadingListEvaluation] = React.useState(false);
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(0);
  const [totalResult, setTotalResult] = React.useState(0);

  const [feedback, setFeedback] = React.useState([]);
  const [rate, setRate] = React.useState(0);

  const handlePageChange = (pageNumber) => {
    if(page !== pageNumber) {
      setPage(pageNumber);
      _GetListEvaluationAPI({
        Rate: rate,
        Page: pageNumber,
      })
    }
  }

  const getOverViewAPI = async () => {
    setLoading(true);
    const res = await getFeedbackOverviewAPI();
    if (res.Code === 1) {
      setOverview(res.Data)
    }
    setLoading(false);
  }

  const _GetListEvaluationAPI = async (params) => {
    setLoadingListEvaluation(true);
    const res = await getListEvaluationAPI(params);
    if (res.Code === 1) {
      setFeedback(res.Data);
      setPageSize(res.PageSize);
      setTotalResult(res.TotalResult);
    }
    setPage(params.Page);
    setLoadingListEvaluation(false);
  }

  const fetchListEvaluation = (e, rateFilter) => {
    if(rateFilter === rate) return;
    setRate(rateFilter);
    _GetListEvaluationAPI({
      Rate: rateFilter,
      Page: 1,
    })
  }

  React.useEffect(() => {
    getOverViewAPI();
    _GetListEvaluationAPI({
      Rate: 0,
      Page: 1,
    })
  }, []);

  return !loading && (<>
    <div className="d-xl-flex align-items-center justify-content-between mg-b-30">
      <h4 className="mg-b-0 gradient-heading"><i className="fas fa-comment-dots"></i>FEEDBACK</h4>
    </div>
    <div className="feedback-container">
      <div className="fb-summary-container">
        {
          overview && Object.keys(overview).length > 0 ? <>
            <p className="tx-16">Last 100 Parent Feedback Average: <span className="tx-warning tx-20 tx-bold">{overview.Avarage}</span></p>
            <div className="fb-summary">
              <div className="fb-type w-100">
                <div className="fb-radio">
                  <label>
                    <input type="radio" name="fbType" group="feedback" defaultChecked
                      onClick={(e) => fetchListEvaluation(e, 0)} />
                    <span>All feedbacks</span>
                    <span className="number">{overview.AllEvaluation}</span>
                  </label>
                </div>
              </div>
              <div className="fb-type">
                <div className="fb-radio">
                  <label>
                    <input type="radio" name="fbType" group="feedback"
                      onClick={(e) => fetchListEvaluation(e, 5)} />
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
                    <input type="radio" name="fbType" group="feedback"
                      onClick={(e) => fetchListEvaluation(e, 4)} />
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
                    <input type="radio" name="fbType" group="feedback"
                      onClick={(e) => fetchListEvaluation(e, 3)} />
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
                    <input type="radio" name="fbType" group="feedback"
                      onClick={(e) => fetchListEvaluation(e, 2)} />
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
                    <input type="radio" name="fbType" group="feedback"
                      onClick={(e) => fetchListEvaluation(e, 1)} />
                    <span>
                      <i className="star fa fa-star"></i>
                      <span className="number">{overview.EvaluationRate1}</span>
                    </span>
                  </label>
                </div>
              </div>
            </div></> :
            <NOT_DATA_FOUND />
        }
      </div>
      {
        loadingListEvaluation ? <SkeletonFeedback /> :
          <div className="fb-list">
            {
              !!feedback && feedback.length > 0 ? feedback.map(item =>
                <StudentCommentItem
                  key={item.ElearnBookingID}
                  ScheduleTimeVN={item.ScheduleTimeVN}
                  TeacherName={item.TeacherName}
                  TeacherIMG={item.TeacherIMG}
                  Note={item.Note}
                  Rate={item.Rate}
                  LinkDetail={item.LinkDetail}
                  DocumentName={item.DocumentName} />) : <span className="text-danger bold" style={{ fontSize: '16px' }}>It's doesn't have any feedback </span>
            }
          </div>
      }
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
  </>
  )
}

ReactDOM.render(<Feedback />, document.getElementById('react-feedback'));
