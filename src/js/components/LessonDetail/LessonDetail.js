import StudentComment from "../TeacherDetail/StudentComment"

const LessonDetail = () => {
  return (
    <div className="media-body mg-t-30 mg-lg-t-0 pd-lg-x-10 body__content">
      <div className="row">
        <div className="col-md-6 col-sm-12">
          {/* <!--thông tin buổi học--> */}
          <div className="st-thontinbuoihoc">
            <h5 className="main-title">
              Lesson information</h5>
            <div className="infomation__wrap">
              <div className="st-time">
                <p className="st-teacher-text">
                  <i className="fa fa-book st-icon wd-20 mg-r-5"></i>
                  <span>Course name: <a href={"#"}>IELST 8.0 Professional</a></span>
                </p>
              </div>
              <div className="st-time">
                <p className="st-time-text">
                  <i className="fa fa-user-clock st-icon wd-20 mg-r-5"></i>
                  <span className="tx-black tx-normal">Expired:</span>
                  <span> 16:00 09/04/2020 - 16:50 09/04/2020</span>
                </p>
              </div>
              <div className="st-time">
                <p className="st-teacher-text">
                  <i className="fa fa-user-graduate st-icon wd-20 mg-r-5"></i>
                  <span>Teacher:</span> <span className="st-tengv">Hoàng Thị Uyên Phương</span>
                </p>
              </div>
              <div className="st-time">
                <p className="st-teacher-text">
                  <i className="fa fa-book-open st-icon wd-20 mg-r-5"></i>
                  <span>Material: <a href={"#"}>Solutions - Grade 6 - UNIT 6J [PART 1] - REVIEW
                        3</a> </span>
                </p>
              </div>
            </div>
          </div>
          {/* <!--/thông tin buổi học--> */}
        </div>
        <div className="col-md-6 col-sm-12">
          {/* <!--thang danh gia--> */}
          <div className="st-thangdanhgia">
            <h5 className="main-title">
              Rating</h5>
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
        </div>
        {/* <!--Đánh giá phát âm--> */}
        <div className="st-danhgianguphap  mg-b-30">
          <div className="st-title-danhgia mg-b-15">
            <h5 className="sub-title">Pronounce</h5>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="st-item-danhgia">
                <p>larger /lɑːdʒər/</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="st-item-danhgia">
                <p>languages /ˈlæŋ.ɡwɪdʒəz/</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="st-item-danhgia">
                <p>lived /lɪvd/</p>
              </div>
            </div>
          </div>
        </div>
        {/* <!--/Đánh giá phát âm-->
                      <!--Từ cần ghi nhớ--> */}
        <div className="st-danhgianguphap  mg-b-30">
          <div className="st-title-danhgia mg-b-15">
            <h5 className="sub-title">Memorize</h5>
          </div>
          <div className="st-item-danhgia">
            <p>arrangements /əˈreɪndʒ.məntz/ - plans or preparations for a future event</p>
          </div>
        </div>
        {/* <!--/Từ cần ghi nhớ-->
                      <!--Đánh giá chung--> */}
        <div className="st-danhgianguphap  mg-b-30">
          <div className="st-title-danhgia mg-b-15">
            <h5 className="sub-title">General assessment</h5>
          </div>
          <div className="st-item-danhgia">
            <p>Kiet, you always try to speak up and take part in the discussion actively. With grammar, very minor slips are noticed.~ Teacher Rylie💖 (Solutions - Grade 6 - UNIT 6J [PART 1] page 100, page 103, page 108 )</p>
          </div>
          {/* <!--/Đánh giá chung--> */}
        </div>{/* <!-- media-body --> */}
      </div>
      <StudentComment/>
    </div>
  )
}

ReactDOM.render(<LessonDetail />, document.getElementById('react-lesson-detail'));