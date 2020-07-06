import React from 'react';
import ReactDOM from 'react-dom';

import SkeletonLessonCard from "../common/Skeleton/SkeletonLessonCard"

const TeacherInformation = ({ introduce, experience, certificate }) => {
  return <React.Fragment>
      <div className="content-block">
        <h5 className="main-title">Introduce</h5>
        <div className="introduce-content">{introduce}</div>
      </div>
      <div className="content-block">
        <h5 className="main-title">CURRICULUM VITAE</h5>
        <div className="introduce-content">
          <h5 className="sub-title"><i className="fas fa-user-clock"></i>
            Experience</h5>
          <div className="table-responsive mg-b-30">
            <table className="table table-borderless table-exp">
              <tbody>
                {
                  !!experience && experience.length > 0 && experience.map((item, index) =>
                    <tr key={index}>
                        <td className="col-time">
                          <span className="from-time">{item.fromTime}</span>
                          <span className="icon mg-x-5"><i
                            className="fas fa-long-arrow-alt-right"></i></span>
                          <span className="to-time">{item.toTime}</span>
                        </td>
                        <td className="col-info">
                          <p className="role">{item.position}</p>
                          <p className="description">{item.desc}</p>
                        </td>
                      </tr>
                    )
                }
              </tbody>
            </table>
          </div>
          <h5 className="sub-title"><i className="fas fa-certificate"></i>Certificate</h5>
          <div className="table-responsive mg-b-30">
            <table className="table table-borderless table-exp">
              <tbody>
                {
                  !!certificate && certificate.length > 0 && certificate.map((item, index) =>
                      <tr key={index}>
                        <td className="col-time">
                          <span className="from-time">{item.time}</span>
                        </td>
                        <td className="col-info">
                          <p className="role">{item.course}
                          </p>
                          <p className="description">{item.desc}</p>
                        </td>
                      </tr>
                    )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
}

export default TeacherInformation;