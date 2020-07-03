import React from 'react';
import ReactDOM from 'react-dom';
import SkeletonFeedback from "../common/Skeleton/SkeletonFeedback";

const Feedback = () => {
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <React.Fragment>
      <div className="d-xl-flex align-items-center justify-content-between mg-b-30">
        <h4 className="mg-b-0 gradient-heading"><i className="fas fa-comment-dots"></i> FEEDBACK</h4>
      </div>
      <div className="mg-t-30 feedback-container">
        <div className="fb-summary-container">
          <p className="tx-16">Last 100 Parent Feedback Average: <span className="tx-warning tx-20 tx-bold">4.5</span></p>
          <p className="tx-gray-500 tx-14">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus iure doloremque aperiam neque, tenetur harum soluta non pariatur explicabo sed ab vero assumenda dolore molestias, dicta voluptates officiis error tempora?</p>
          <div className="fb-summary">
            <div className="fb-type">
              <div className="fb-radio">
                <label>
                  <input type="radio" name="fbType" group="feedback" defaultChecked />
                  <span>All comments <span className="number">882</span></span>
                </label>
              </div>
            </div>
            <div className="fb-type">
              <div className="fb-radio">
                <label>
                  <input type="radio" name="fbType" group="feedback" />
                  <span>Excellent <span className="number">882</span></span>
                </label>
              </div>
            </div>
            <div className="fb-type">
              <div className="fb-radio">
                <label>
                  <input type="radio" name="fbType" group="feedback" />
                  <span>Good <span className="number">10</span></span>
                </label>
              </div>
            </div>
            <div className="fb-type">
              <div className="fb-radio">
                <label>
                  <input type="radio" name="fbType" group="feedback" />
                  <span>Unsatosfactory <span className="number">2</span></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        {
          loading?<SkeletonFeedback/>:(
            <div className="fb-list">
          <div className="fb-item">
            <div className="fb-avatar">
              <img src="../../assets/img/teacher.jpg" alt="avatar" className="avatar" />
            </div>
            <div className="fb-info">
              <div className="name-rating">
                <p className="name">Đạt Anh Khoa</p>
                <div className="rating-wrap">
                  <div className="rating">
                    <i className="fas fa-star-half-alt"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <div className="feedback-comment">
                <p className="">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum officiis praesentium iusto eius fugit ullam animi quam. Quidem ipsum consectetur exercitationem doloribus dolor aut dolorum quas ipsa quibusdam, voluptates quod.</p>
              </div>
              <div className="metas">
                <div className="meta">
                  className Time: <span>12/06/2020 10:30AM (Vietnam Time)</span>
                </div>
                <div className="meta">
                  Unit 1: <span>Make web app with Mona Media</span>
                </div>
              </div>
              <div className="reply-box">
                <div className="form-group cmt-box">
                  <textarea rows="5" className="form-control"></textarea>
                </div>
                <div className="cmt-action">
                  <a href={"#"} className="btn btn-primary mg-r-10">Submit</a>
                  <a href={"#"} className="btn btn-light btn-cancel-form">Cancel</a>
                </div>
              </div>
              <div className="actions">
                <a href={"#"} className="btn btn-sm btn-outline-twitter btn-icon btn-reply"><i className="fas fa-reply"></i> Reply</a>
              </div>
              <div className="tc-comment-wrap hidden">
                <h6 className="mg-b-15">The teacher had commented on this feedback:</h6>
                <div className="tc-comment">
                  <img src="../../assets/img/bg-status2.jpg" alt="avatar " className="avatar avatar rounded-circle" />
                  <div className="tc-content">
                    <div className="box">
                      <p className="teacher-name">Kelly Clarkson</p>
                      <p className="mg-b-0">Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br />Error earum molestias consequatur, iusto accusantium minima est saepe porro id odit nam, numquam voluptates quis repudiandae veniam. Provident illum et voluptate. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat aliquam magni impedit vitae sit expedita totam labore neque, dolores eos veritatis? Qui nisi, ipsa nostrum nulla labore esse dicta. Aspernatur.</p>
                    </div>
                    <div className="meta">
                      <div className="date">Comment at 10:30 AM | 20/10/2020</div>
                    </div>
                    <a href={"#"} className="edit-box"><i className="fa fa-edit"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fb-item">
            <div className="fb-avatar">
              <img src="../../assets/img/teacher.jpg" alt="avatar" className="avatar" />
            </div>
            <div className="fb-info">
              <div className="name-rating">
                <p className="name">Đạt Anh Khoa</p>
                <div className="rating-wrap">
                  <div className="rating">
                    <i className="fas fa-star-half-alt"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <div className="feedback-comment">
                <p className="">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum officiis praesentium iusto eius fugit ullam animi quam. Quidem ipsum consectetur exercitationem doloribus dolor aut dolorum quas ipsa quibusdam, voluptates quod.</p>
              </div>
              <div className="metas">
                <div className="meta">
                  className Time: <span>12/06/2020 10:30AM (Vietnam Time)</span>
                </div>
                <div className="meta">
                  Unit 1: <span>Make web app with Mona Media</span>
                </div>
              </div>
              <div className="reply-box">
                <div className="form-group cmt-box">
                  <textarea rows="5" className="form-control"></textarea>
                </div>
                <div className="cmt-action">
                  <a href={"#"} className="btn btn-primary mg-r-10">Submit</a>
                  <a href={"#"} className="btn btn-light btn-cancel-form">Cancel</a>
                </div>
              </div>
              <div className="actions">
                <a href={"#"} className="btn btn-sm btn-outline-twitter btn-icon btn-reply"><i className="fas fa-reply"></i> Reply</a>
              </div>
              <div className="tc-comment-wrap">
                <h6 className="mg-b-15">The teacher had commented on this feedback:</h6>
                <div className="tc-comment">
                  <img src="../../assets/img/bg-status2.jpg" alt="avatar " className="avatar avatar rounded-circle" />
                  <div className="tc-content">
                    <div className="box">
                      <p className="teacher-name">Kelly Clarkson</p>
                      <p className="mg-b-0">Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br />Error earum molestias consequatur, iusto accusantium minima est saepe porro id odit nam, numquam voluptates quis repudiandae veniam. Provident illum et voluptate. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat aliquam magni impedit vitae sit expedita totam labore neque, dolores eos veritatis? Qui nisi, ipsa nostrum nulla labore esse dicta. Aspernatur.</p>
                    </div>
                    <div className="meta">
                      <div className="date">Comment at 10:30 AM | 20/10/2020</div>
                    </div>
                    <a href={"#"} className="edit-box"><i className="fa fa-edit"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fb-item">
            <div className="fb-avatar">
              <img src="../../assets/img/teacher.jpg" alt="avatar" className="avatar" />
            </div>
            <div className="fb-info">
              <div className="name-rating">
                <p className="name">Đạt Anh Khoa</p>
                <div className="rating-wrap">
                  <div className="rating">
                    <i className="fas fa-star-half-alt"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <div className="feedback-comment">
                <p className="tx-gray-500 tx-bold">The student didn't leave any feedback for this className</p>
              </div>
              <div className="metas">
                <div className="meta">
                  className Time: <span>12/06/2020 10:30AM (Vietnam Time)</span>
                </div>
                <div className="meta">
                  Unit 1: <span>Make web app with Mona Media</span>
                </div>
              </div>
              <div className="reply-box">
                <div className="form-group cmt-box">
                  <textarea rows="5" className="form-control"></textarea>
                </div>
                <div className="cmt-action">
                  <a href={"#"} className="btn btn-primary mg-r-10">Submit</a>
                  <a href={"#"} className="btn btn-light btn-cancel-form">Cancel</a>
                </div>
              </div>
              <div className="actions">
                <a href={"#"} className="btn btn-sm btn-outline-twitter btn-icon btn-reply"><i className="fas fa-reply"></i> Reply</a>
              </div>
              <div className="tc-comment-wrap">
                <h6 className="mg-b-15">The teacher had commented on this feedback:</h6>
                <div className="tc-comment">
                  <img src="../../assets/img/bg-status2.jpg" alt="avatar " className="avatar avatar rounded-circle" />
                  <div className="tc-content">

                    <div className="box">
                      <p className="teacher-name">Kelly Clarkson</p>
                      <p className="mg-b-0">Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br />Error earum molestias consequatur, iusto accusantium minima est saepe porro id odit nam, numquam voluptates quis repudiandae veniam. Provident illum et voluptate. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat aliquam magni impedit vitae sit expedita totam labore neque, dolores eos veritatis? Qui nisi, ipsa nostrum nulla labore esse dicta. Aspernatur.</p>
                    </div>
                    <div className="meta">
                      <div className="date">Comment at 10:30 AM | 20/10/2020</div>
                    </div>
                    <a href={"#"} className="edit-box"><i className="fa fa-edit"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          )
        }
      </div>
      <nav aria-label="Page navigation" className="mg-t-10">
        <ul className="pagination mg-b-0 justify-content-end">
          <li className="page-item disabled"><a className="page-link page-link-icon" href={"#"}><i
            data-feather="chevron-left"></i></a></li>
          <li className="page-item active"><a className="page-link" href={"#"}>1</a></li>
          <li className="page-item"><a className="page-link" href={"#"}>2</a></li>
          <li className="page-item"><a className="page-link" href={"#"}>3</a></li>
          <li className="page-item"><a className="page-link page-link-icon" href={"#"}><i
            data-feather="chevron-right"></i></a></li>
        </ul>
      </nav>
    </React.Fragment>
  )
}

ReactDOM.render(<Feedback />, document.getElementById('react-feedback'));