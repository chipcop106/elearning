import React from 'react';
import ReactDOM from 'react-dom';
import FormikForm from './StudentForm';
import PurchasedCourseList from './PurchasedCourseList';
import PaymentHistory from './PaymentHistory';

import styles from '~components/StudentProfile/StudentProfile.module.scss';

const StudentProfile = () => {
  const [showTab, setShowTab] = React.useState(1);

  return (
    <div className="teacher__detail__wrap card-box">
      <div className="teacher__detail">
        <div className="teacher-body">
          <div className="tab-navigation">
            <ul className="list-tab" id="js-list-tab">
              <li className="tab-item">
                <a href={"#"} className={`${showTab === 1 ? 'active' : ''} tab-link`}
                  data-index={0}
                  onClick={(e) => { e.preventDefault(); setShowTab(1) }}>ACCOUNT INFO</a>
              </li>
              <li className="tab-item">
                <a href={"#"} className={`${showTab === 2 ? 'active' : ''} tab-link`}
                  data-index={1}
                  onClick={(e) => { e.preventDefault(); setShowTab(2) }}>PURCHASED COURSE</a>
              </li>
              <li className="tab-item">
                <a href={"#"} className={`${showTab === 3 ? 'active' : ''} tab-link`}
                  data-index={2}
                  onClick={(e) => { e.preventDefault(); setShowTab(3) }}>PAYMENT HISTORY</a>
              </li>
            </ul>
          </div>
          <div className="tab-navigation-content">
            <div className="swiper-container" id="js-teacher__info">
              <div className="teacher__info-wrap swiper-wrapper">
              <div className={`${showTab===1?'active':''} swiper-slide`}>
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
                <div className={`${showTab===2?'active':''} swiper-slide`}>
                  <div className="slide-tab-content">
                    <div className="purchased-tab pd-x-15">
                      <PurchasedCourseList />
                    </div>
                  </div>
                </div>
                <div className={`${showTab===3?'active':''} swiper-slide`}>
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