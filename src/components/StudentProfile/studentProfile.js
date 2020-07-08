import React from 'react';
import ReactDOM from 'react-dom';
import FormikForm from './StudentForm';
import PurchasedCourseList from './PurchasedCourseList';
import PaymentHistory from './PaymentHistory';

import styles from '~components/StudentProfile/StudentProfile.module.scss';

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
                    <FormikForm />
                    </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="slide-tab-content">
                <div className="purchased-tab pd-x-15">
                  <PurchasedCourseList />
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="slide-tab-content">
              <div className="payment-tab">
                <PaymentHistory />
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