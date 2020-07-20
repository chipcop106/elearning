import React from 'react';
import ReactDOM from 'react-dom';
import SkeletonLessonDetail from "~components/common/Skeleton/SkeletonLessonDetail";
import RatingLessonModal from "~components/RatingLessonModal";
import { getEvaluation } from "~src/api/studentAPI";
import { ToastContainer } from 'react-toastify';

import styles from '~components/LessonDetail/LessonDetail.module.scss';

const LessonDetail = () => {
  const [state, setState] = React.useState({})
  const [loading, setLoading] = React.useState(false)

  const getAPI = async (params) => {
    setLoading(true);
    const res = await getEvaluation(params);
    if(res.Code === 1) {
      setState(res.Data)
    }
    setLoading(false);
  }

  const onCallbackRating = (result, message) => {
    if (result === 1) {
      setState({
        ...state,
        StudentFeedback: message,
      })
    }
  }

  React.useEffect(() => {
    getAPI({
      ElearnBookingID: 9,
    })
  }, []);

  return <React.Fragment>
    {
      loading ? <SkeletonLessonDetail /> :
      <React.Fragment>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              {/* <!--thông tin buổi học--> */}
              <div className="st-thontinbuoihoc">
                <h5 className="main-title">Lesson information</h5>
                <div className="infomation__wrap">
                  <div className="st-time">
                    <p className="st-teacher-text">
                      <i className="fa fa-book st-icon wd-20 mg-r-5"></i>
                      <span>Course name: <span>{state.DocumentName}</span></span>
                    </p>
                  </div>
                  <div className="st-time">
                    <p className="st-time-text">
                      <i className="fa fa-user-clock st-icon wd-20 mg-r-5"></i>
                      <span className="tx-black tx-normal">Expired: </span>
                      <span>{state.ScheduleTimeVN}</span>
                    </p>
                  </div>
                  <div className="st-time">
                    <p className="st-teacher-text">
                      <i className="fa fa-user-graduate st-icon wd-20 mg-r-5"></i>
                      <span>Teacher:</span> <span className="st-tengv">{state.TeacherName}</span>
                    </p>
                  </div>
                  <div className="st-time">
                    <p className="st-teacher-text">
                      <i className="fa fa-book-open st-icon wd-20 mg-r-5"></i>
                      <span>Material: <a href={state.MaterialLink} target="_blank">{state.Material}</a> </span>
                    </p>
                  </div>
                </div>
              </div>
              {/* <!--/thông tin buổi học--> */}
            </div>
            <div className="col-md-6 col-sm-12">
              {/* <!--thang danh gia--> */}
              <div className="st-thangdanhgia">
                <h5 className="main-title">Rating</h5>
                {
                  state.Rate==0 || state.Rate ? (<div className="st-rating">
                  <div className="cell text-left">
                    <p className="st-noidung-rating">
                      <div className="rating-stars">
                        <span className="empty-stars">
                          <i className="star fa fa-star"></i>
                          <i className="star fa fa-star"></i>
                          <i className="star fa fa-star"></i>
                          <i className="star fa fa-star"></i>
                          <i className="star fa fa-star"></i>
                        </span>
                        <span className="filled-stars" style={{ width: `${state.Rate * 20}%` }}>
                          <i className="star fa fa-star"></i>
                          <i className="star fa fa-star"></i>
                          <i className="star fa fa-star"></i>
                          <i className="star fa fa-star"></i>
                          <i className="star fa fa-star"></i>
                        </span>
                      </div>
                      {state.Rate >= 4.5 &&
                      <span className="badge badge-light tx-success mg-l-5"><i
                        className="fa fa-check-circle"></i> Very Good</span>}
                    </p>
                  </div>
                </div>):<p>Buổi học này chưa có đánh giá</p>
                }
              </div>
            </div>
          </div>
          <div className="review__wrap sec">
            <h5 className="main-title">Review</h5>
            <div className="st-danhgianguphap  mg-b-30">
              <div className="st-title-danhgia mg-b-15">
                <h5 className="sub-title">Grammar:</h5>
              </div>
              {
                state.Grammar && Array.isArray(state.Grammar) && state.Grammar.length > 0 &&
                state.Grammar.map(item =>
                  <React.Fragment>
                    <div className="st-item-danhgia">
                      <div className="row">
                        <div className="col-6">
                          <p><b>You said</b> </p>
                        </div>
                        <div className="col-6">
                          <p><b>You should said</b></p>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="st-item-danhgia">
                      <div className="row">
                        <div className="col-6">
                          <p>This evening we went to the cinema </p>
                        </div>
                        <div className="col-6">
                          <p>This evening we are going to the cinema </p>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </React.Fragment>
                )
              }
            </div>
            {/* <!--Đánh giá phát âm--> */}
            <div className="st-danhgianguphap  mg-b-30">
              <div className="st-title-danhgia mg-b-15">
                <h5 className="sub-title">Pronounce</h5>
              </div>
              <div className="row">
                {
                  state.Pronunciation ? (<div className="col-12">
                    <div className="st-item-danhgia">
                      <p>{state.Pronunciation}</p>
                    </div></div>) : ""
                }
              </div>
            </div>
            {/* <!--/Đánh giá phát âm-->
                      <!--Từ cần ghi nhớ--> */}
            <div className="st-danhgianguphap  mg-b-30">
              <div className="st-title-danhgia mg-b-15">
                <h5 className="sub-title">Memorize</h5>
              </div>
              {
                state.Vacabulary ? (
                  <div className="st-item-danhgia">
                    <p>{state.Vacabulary}</p>
                  </div>
                ) : ""
              }
            </div>
            {/* <!--/Từ cần ghi nhớ-->
                      <!--Đánh giá giáo viên--> */}
            <div className="st-danhgianguphap  mg-b-30">
              <div className="st-title-danhgia mg-b-15">
                <h5 className="sub-title">General assessment</h5>
              </div>
              {
                state.Note ? (
                  <div className="st-item-danhgia">
                    <p>{state.Note}</p>
                  </div>
                ) : ""
              }
            </div>
            {/* <!--/Đánh giá giáo viên-->
                      <!--Đánh giá học viên--> */}
            <div className="st-danhgianguphap  mg-b-30">
              <div className="st-title-danhgia mg-b-15">
                <h5 className="sub-title">Student Feedback</h5>
              </div>
              {
                state.StudentFeedback ? (
                  <div className="st-item-danhgia">
                    <p>{state.StudentFeedback}</p>
                  </div>
                ) : (<><p>You are not leave feedback for this lesson</p>
                  <button className="btn btn-primary mg-r-10"
                    data-toggle="modal"
                    data-target="#js-md-rate"
                  >Leave Feedback</button></>)
              }
            </div>
          </div>
          <RatingLessonModal
            BookingID={state.ElearnBookingID}
            TeacherName={state.TeacherName}
            callback={onCallbackRating} />
        </React.Fragment>
    }
    <ToastContainer />
  </React.Fragment >
}

ReactDOM.render(<LessonDetail />, document.getElementById('react-lesson-detail'));