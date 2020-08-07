import React from 'react';
import ReactDOM from 'react-dom';
import SkeletonLessonDetail from "~components/common/Skeleton/SkeletonLessonDetail";
import RatingLessonModal from "~components/RatingLessonModal";
import { getEvaluation } from "~src/api/studentAPI";
import { ToastContainer } from 'react-toastify';

import styles from '~components/LessonDetail/LessonDetail.module.scss';


const renderRatingStars = (rate) => {
  return rate == 5 ?
    <span className="badge badge-light text-white bg-success mg-l-5">
      <i className="fa fa-check-circle mg-r-3"></i>Very Good </span> :
    rate == 4 ?
      <span className="badge badge-light text-white bg-success mg-l-5">
        <i className="fa fa-check-circle mg-r-3"></i>Good</span> :
      rate == 3 ?
        <span className="badge badge-light text-white bg-info mg-l-5">
          <i className="fa fa-check-circle mg-r-3"></i>OK</span> :
        rate == 2 ?
          <span className="badge badge-light text-white bg-warning mg-l-5">
            <i className="fa fa-check-circle mg-r-3"></i>Bad</span> :
          rate == 1 ?
            <span className="badge badge-light text-white bg-danger mg-l-5">
              <i className="fa fa-check-circle mg-r-3"></i>Very Bad</span> :
            <span className="badge badge-light text-white bg-black-4 mg-l-5">Not Rated</span>
}

const LessonDetail = () => {
  const [state, setState] = React.useState({})
  const [loading, setLoading] = React.useState(false)

  const getAPI = async (params) => {
    setLoading(true);
    const res = await getEvaluation(params);
    if (res.Code === 1) {
      setState(res.Data)
    }
    setLoading(false);
  }

  const onCallbackRating = (result, message, rating, BookingID, TeacherUID) => {
    if (result === 1) {
      setState({
        ...state,
        StudentEvaluation: message,
        StudentRating: rating,
      })
    }
  }

  React.useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let ID = params.get('ID');
    getAPI({
      ElearnBookingID: ID,
    })
  }, []);

  return <>
    {
      loading ? <SkeletonLessonDetail /> :
        <>
          <div className="media-body-wrap pd-15 shadow">
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
                        <i className="fa fa-book-reader st-icon wd-20 mg-r-5"></i>
                        <span>Student:</span> <span className="st-tengv">{state.StudentName}</span>
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
                    (state.Rate == 0 || state.Rate) && (<div className="d-block mg-b-15 st-rating">
                      <div className="cell text-left">
                        <i className="fa fa-smile st-icon wd-20 mg-r-5"></i>
                        <span className="mg-r-5">Teacher rate:</span>
                        <div className="d-inline-block st-noidung-rating">
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
                         {
                           renderRatingStars(state.Rate)
                         }
                        </div>
                      </div>
                    </div>)
                  }
                  {
                    (state.StudentRate == 0 || state.StudentRate) && (<div className="d-block st-rating">
                      <div className="cell text-left">
                        <i className="fa fa-smile st-icon wd-20 mg-r-5"></i>
                        <span className="mg-r-5">Student rate:</span>
                        <div className="d-inline-block st-noidung-rating">
                          <div className="rating-stars">
                            <span className="empty-stars">
                              <i className="star fa fa-star"></i>
                              <i className="star fa fa-star"></i>
                              <i className="star fa fa-star"></i>
                              <i className="star fa fa-star"></i>
                              <i className="star fa fa-star"></i>
                            </span>
                            <span className="filled-stars" style={{ width: `${state.StudentRate * 20}%` }}>
                              <i className="star fa fa-star"></i>
                              <i className="star fa fa-star"></i>
                              <i className="star fa fa-star"></i>
                              <i className="star fa fa-star"></i>
                              <i className="star fa fa-star"></i>
                            </span>
                          </div>
                          {
                            renderRatingStars(state.StudentRate)
                          }
                        </div>
                      </div>
                    </div>)
                  }
                </div>
              </div>
            </div>
            <div className="review__wrap mg-t-15 sec">
              <h5 className="main-title">Review</h5>
              {/* <!--/Đánh giá ngữ pháp-->*/}
              <div className="st-danhgianguphap">
                <div className="st-title-danhgia mg-b-15">
                  <h5 className="sub-title">Grammar</h5>
                </div>
                <div className="row">
                  {
                    state.Grammar ? (<div className="col-12">
                      <div className="st-item-danhgia">
                        <p dangerouslySetInnerHTML={{ __html: decodeURI(state.Grammar) }} style={{ wordBreak: "break-all" }}></p>
                      </div></div>) : ""
                  }
                </div>
              </div>
              {/* <!--/Đánh giá ngữ pháp-->
                      <!--Đánh giá phát âm--> */}
              <div className="st-danhgianguphap">
                <div className="st-title-danhgia mg-b-15">
                  <h5 className="sub-title">Pronounce</h5>
                </div>
                <div className="row">
                  {
                    state.Pronunciation ? (<div className="col-12">
                      <div className="st-item-danhgia">
                        <p dangerouslySetInnerHTML={{ __html: decodeURI(state.Pronunciation) }} style={{ wordBreak: "break-all" }}></p>
                      </div></div>) : ""
                  }
                </div>
              </div>
              {/* <!--/Đánh giá phát âm-->
                      <!--Đánh giá từ vựng--> */}
              <div className="st-danhgianguphap">
                <div className="st-title-danhgia mg-b-15">
                  <h5 className="sub-title">Vocabulary</h5>
                </div>
                <div className="row">
                  {
                    state.Vocabulary ? (<div className="col-12">
                      <div className="st-item-danhgia">
                        <p dangerouslySetInnerHTML={{ __html: decodeURI(state.Vocabulary) }} style={{ wordBreak: "break-all" }}></p>
                      </div></div>) : ""
                  }
                </div>
              </div>
              {/* <!--/Đánh giá từ vựng-->
                      <!--Từ cần ghi nhớ--> */}
              <div className="st-danhgianguphap">
                <div className="st-title-danhgia mg-b-15">
                  <h5 className="sub-title">Sentence Development And Speak</h5>
                </div>
                {
                  state.SentenceDevelopmentAndSpeak ? (
                    <div className="st-item-danhgia">
                      <p dangerouslySetInnerHTML={{ __html: decodeURI(state.SentenceDevelopmentAndSpeak) }} style={{ wordBreak: "break-all" }}></p>
                    </div>
                  ) : ""
                }
              </div>
              {/* <!--/Từ cần ghi nhớ-->
                      <!--Đánh giá giáo viên--> */}
              <div className="st-danhgianguphap">
                <div className="st-title-danhgia mg-b-15">
                  <h5 className="sub-title">General assessment</h5>
                </div>
                {
                  state.Note ? (
                    <div className="st-item-danhgia">
                      <p dangerouslySetInnerHTML={{ __html: decodeURI(state.Note) }} style={{ wordBreak: "break-all" }}></p>
                    </div>
                  ) : ""
                }
              </div>
              {/* <!--/Đánh giá giáo viên-->
                      <!--Đánh giá học viên--> */}
              <div className="st-danhgianguphap">
                <div className="st-title-danhgia mg-b-15">
                  <h5 className="sub-title">Student Feedback</h5>
                </div>
                {
                  Object.keys(state).length === 0 ? "" : (
                    state.StudentEvaluation ? (
                      <div className="st-item-danhgia">
                        <p dangerouslySetInnerHTML={{ __html: decodeURI(state.StudentEvaluation) }} style={{ wordBreak: "break-all" }}></p>
                      </div>
                    ) : (<><p>You are not leave feedback for this lesson</p>
                      <button className="btn btn-primary mg-r-10"
                        data-toggle="modal"
                        data-target="#js-md-rate"
                      >Leave Feedback</button></>))
                }
              </div>
            </div>
            <RatingLessonModal
              BookingID={state.ElearnBookingID}
              TeacherUID={state.TeacherUID}
              TeacherName={state.TeacherName}
              callback={onCallbackRating} />
          </div>
        </>
    }
    <ToastContainer />
  </>
}

ReactDOM.render(<LessonDetail />, document.getElementById('react-lesson-detail'));