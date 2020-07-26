import React from 'react';
import ReactDOM from 'react-dom';
import StudentForm from './StudentForm';
import PurchasedCourseList from './PurchasedCourseList';
import PaymentHistory from './PaymentHistory';
import { ToastContainer } from 'react-toastify';

import styles from '~components/StudentProfile/StudentProfile.module.scss';

const StudentProfile = () => {
  const [showTab, setShowTab] = React.useState(1);
  const [showSubTab, setShowSubTab] = React.useState(1);

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
                        <h5 className="sub-title profile-tab-nav">
                          <a href={"#"} className={`${showSubTab===1?'active':''}`}
                          onClick={(e) => { e.preventDefault(); setShowSubTab(1)}}>
                            <i className="fas fa-user"></i>Account
                            </a>
                          <a href={"#"} className={`${showSubTab===2?'active':''}`}
                           onClick={(e) => { e.preventDefault(); setShowSubTab(2)}}>
                            <i className="fas fa-lock"></i>Change password
                            </a>
                          </h5>
                          <StudentForm tabDisplay={showSubTab}/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${showTab===2?'active':''} swiper-slide`}>
                  <div className="slide-tab-content">
                    <div className="purchased-tab">
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
      <ToastContainer />
    </div>
  )
}
ReactDOM.render(<StudentProfile />, document.getElementById('react-student-profile'));