import React from 'react';
import ReactDOM from 'react-dom';
import StudentForm from './StudentForm';
import PurchasedCourseList from './PurchasedCourseList';

const StudentProfile = () => {
    return (
        <div className="teacher__detail__wrap card-box">
  <div className="teacher__detail">
    <div className="teacher-body">
      <div className="tab-navigation">
        <ul className="list-tab" id="js-list-tab">
          <li className="tab-item">
            <a href={"#"} className="tab-link active" data-index={0}>ACCOUNT INFO</a>
          </li>
          <li className="tab-item">
            <a href={"#"} className="tab-link " data-index={1}>PURCHASED COURSE</a>
          </li>
          <li className="tab-item">
            <a href={"#"} className="tab-link " data-index={2}>PAYMENT HISTORY</a>
          </li>
        </ul>
      </div>
      <div className="tab-navigation-content">
        <div className="swiper-container" id="js-teacher__info">
          <div className="teacher__info-wrap swiper-wrapper">
            <div className="swiper-slide">
              <div className="slide-tab-content">
                <div className="content-block">
                  <div className="introduce-content mg-b-30">
                    <h5 className="sub-title"><i className="fas fa-user" /> Account
                    </h5>
                    <StudentForm />
                    </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="slide-tab-content">
                <div className="purchased-tab pd-x-15">
                  <div className="subcription-title lh-base">
                    <h5>Purchased course</h5>
                    <ul className="mg-0">
                      <li>You can make a schedule for the duration of the course</li>
                      <li>You are only allowed to cancel the class schedule 30 minutes in advance</li>
                      <li>After the course expires, you will not be allowed to schedule more classes</li>
                    </ul>
                    <a href="#" className="mg-t-15 d-block tx-primary"><i className="fa fa-info-circle mg-r-5" /> For more information, see our FAQ</a>
                  </div>
                  <div className="fb-summary-container">
                    <div className="fb-summary pd-t-0-f bd-t-0-f">
                      <div className="fb-type">
                        <div className="fb-radio">
                          <label>
                            <input type="radio" name="fbType" group="feedback" defaultChecked />
                            <span>All Course <span className="number">32</span></span>
                          </label>
                        </div>
                      </div>
                      <div className="fb-type">
                        <div className="fb-radio">
                          <label>
                            <input type="radio" name="fbType" group="feedback" />
                            <span>On Going <span className="number">22</span></span>
                          </label>
                        </div>
                      </div>
                      <div className="fb-type">
                        <div className="fb-radio">
                          <label>
                            <input type="radio" name="fbType" group="feedback" />
                            <span>Finished <span className="number">10</span></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <PurchasedCourseList />
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="slide-tab-content">
                <div className="payment-tab">
                  <div className="subcription-title">
                    <div className="d-flex align-items-center justify-content-between mg-b-15">
                      <div className="payment wd-sm-50p wd-100p">
                        <div className="list-subscription">
                          <dl className="subscription-info ">
                            <dt>Payment method</dt>
                            <dd>
                              <span><i className="fa fa-visa" /> VISA</span>
                            </dd>
                          </dl>
                          <dl className="subscription-info ">
                            <dt>Name</dt>
                            <dd>
                              <span>TRUONG VAN LAM </span>
                            </dd>
                          </dl>
                          <dl className="subscription-info ">
                            <dt>Date Expired</dt>
                            <dd>
                              <span>06/2022</span>
                            </dd>
                          </dl>
                          <dl className="subscription-info ">
                            <dt>Card number:</dt>
                            <dd>
                              <span>XXXX-XXXX-XXXX-XXXX</span>
                            </dd>
                          </dl>
                        </div>
                      </div>
                      <div className="code wd-sm-50p wd-100p">
                        <div className="reference-code card pd-15 wd-300 mg-x-auto">
                          <dl className="subscription-info ">
                            <dt>Referrence code:</dt>
                            <dd>
                              <span>MONA08438943</span>
                            </dd>
                          </dl>
                          <dl className="subscription-info ">
                            <dt>Promotion code:</dt>
                            <dd>
                              <span>MONA08438943</span>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <ul style={{margin: 0}}>
                      <li>Long term plans will be expired on next payment
                        date.</li>
                      <li>For recurring plans, you can book a class after the
                        payment date only if payment has been successfully
                        tendered. Recurring payments are made at 12 PM on
                        the payment date. (Lessons booked in advance will
                        not be cancelled.)</li>
                      <li>You can check payment history for the past year
                        only.</li>
                      <li>Please contact <strong>Customer Support
                          (support@mona.media.com)</strong> for more
                        information. </li>
                    </ul>
                    <div className="tx-center mg-y-15">
                      <a href={"#"} className="btn btn-primary rounded-pill"><i className="fas fa-edit mg-r-5" /> Credit card</a>
                    </div>
                  </div>
                  <div className="table-tiket">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Course Name</th>
                            <th>Amount</th>
                            <th>Method</th>
                            <th>Payment Date</th>
                            <th>Expiration Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>IELST 8.0 Professional</td>
                            <td>99.5 USD</td>
                            <td>VISA</td>
                            <td>2020-04-29</td>
                            <td>2020-05-29</td>
                          </tr>
                          <tr>
                            <td>IELST 8.0 Professional</td>
                            <td>99.5 USD</td>
                            <td>VISA</td>
                            <td>2020-04-29</td>
                            <td>2020-05-29</td>
                          </tr>
                          <tr>
                            <td>IELST 8.0 Professional</td>
                            <td>99.5 USD</td>
                            <td>VISA</td>
                            <td>2020-04-29</td>
                            <td>2020-05-29</td>
                          </tr>
                          <tr>
                            <td>IELST 8.0 Professional</td>
                            <td>99.5 USD</td>
                            <td>VISA</td>
                            <td>2020-04-29</td>
                            <td>2020-05-29</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <nav aria-label="Page navigation" className="mg-t-15">
                      <ul className="pagination mg-b-0 justify-content-center">
                        <li className="page-item disabled"><a className="page-link page-link-icon" href="#"><i data-feather="chevron-left" /></a>
                        </li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link page-link-icon" href="#"><i data-feather="chevron-right" /></a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
)
}
ReactDOM.render(<StudentProfile />, document.getElementById('react-student-profile'));