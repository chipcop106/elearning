import React from 'react';
import ReactDOM from 'react-dom';
import SkeletonLessonDetail from "../common/Skeleton/SkeletonLessonDetail";

import StudentComment from "../TeacherDetail/StudentComment"

import { getEvaluation } from "../../api/studentAPI"

const initialState = {};

const LessonDetail = () => {
  const [state, setState] = React.useState(initialState)
  const [loading, setLoading] = React.useState(false)

  const getAPI = async () => {
    setLoading(true);
    const evaluation = await getEvaluation({ ElearnBookingID: 1 });
    setState(evaluation.Data)
    console.log(evaluation.Data)
    setLoading(false);
  }

  React.useEffect(() => {
    getAPI()
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
                      <span>Course name: <a href={"#"}>{state.courseName}</a></span>
                    </p>
                  </div>
                  <div className="st-time">
                    <p className="st-time-text">
                      <i className="fa fa-user-clock st-icon wd-20 mg-r-5"></i>
                      <span className="tx-black tx-normal">Expired:</span>
                      <span>{state.ScheduleDay}</span>
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
                <div className="st-rating">
                  <div className="cell">
                    <span className="label">Grammar:</span>
                  </div>
                  <div className="cell">
                    <p className="st-noidung-rating">
                      <i className="fas fa-star st-icon-star"></i>
                      <i className="fas fa-star st-icon-star"></i>
                      <i className="fas fa-star st-icon-star"></i>
                      <i className="fas fa-star st-icon-star"></i>
                      <i className="fas fa-star-half-alt st-icon-star"></i>
                      <span className="badge badge-light tx-success mg-l-5"><i
                        className="fa fa-check-circle"></i> Very Good</span>
                    </p>
                  </div>
                </div>
                <div className="st-rating">
                  <div className="cell">
                    <span className="label">Volcabualary:</span>
                  </div>
                  <div className="cell">
                    <p className="st-noidung-rating">
                      <i className="fas fa-star st-icon-star"></i>
                      <i className="fas fa-star st-icon-star"></i>
                      <i className="fas fa-star st-icon-star"></i>
                      <i className="fas fa-star st-icon-star"></i>
                      <i className="fas fa-star-half-alt st-icon-star"></i>
                      <span className="badge badge-light tx-success mg-l-5"><i
                        className="fa fa-check-circle"></i> Very Good</span>
                    </p>
                  </div>
                </div>
                <div className="st-rating">
                  <div className="cell">
                    <span className="label">Pronunciation:</span>
                  </div>
                  <div className="cell">
                    <p className="st-noidung-rating">
                      <i className="fas fa-star st-icon-star"></i>
                      <i className="fas fa-star st-icon-star"></i>
                      <i className="fas fa-star st-icon-star"></i>
                      <i className="fas fa-star st-icon-star"></i>
                      <i className="fas fa-star-half-alt st-icon-star"></i>
                      <span className="badge badge-light tx-success mg-l-5"><i
                        className="fa fa-check-circle"></i> Very Good</span>
                    </p>
                  </div>
                </div>
                <div className="st-rating">
                  <div className="cell">
                    <span className="label">Fluency/Coherence:</span>
                  </div>
                  <div className="cell">
                    <p className="st-noidung-rating">
                      <i className="fas fa-star st-icon-star"></i>
                      <i className="fas fa-star st-icon-star"></i>
                      <i className="fas fa-star st-icon-star"></i>
                      <i className="fas fa-star st-icon-star"></i>
                      <i className="fas fa-star-half-alt st-icon-star"></i>
                      <span className="badge badge-light tx-success mg-l-5"><i
                        className="fa fa-check-circle"></i> Very Good</span>
                    </p>
                  </div>
                </div>
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
                state.Grammar && state.Grammar.length > 0 && state.Grammar.map(item =>
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
                      <!--Đánh giá chung--> */}
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
          </div>
        </React.Fragment>
    }
    <StudentComment />
  </React.Fragment >
}

ReactDOM.render(<LessonDetail />, document.getElementById('react-lesson-detail'));