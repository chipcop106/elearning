import React from 'react';
import ReactDOM from 'react-dom';

const TeacherInformation = ({ IntroduceContent, Experience, Certificate }) => {
  return <React.Fragment>
      <div className="content-block mg-b-15-f">
        <h5 className="main-title">Introduce</h5>
        <div className="introduce-content">{IntroduceContent}</div>
      </div>
      <div className="content-block mg-b-15-f">
        <h5 className="main-title">CURRICULUM VITAE</h5>
        <div className="introduce-content">
          <h5 className="sub-title"><i className="fas fa-user-clock"></i>
            Experience</h5>
          <div className="table-responsive mg-b-15">
            <table className="table table-borderless table-exp">
              <tbody>
                {
                  !!Experience && Experience.length > 0 && Experience.map((item, index) =>
                    <tr key={index}>
                        <td className="col-time">
                          <span className="from-time">{item.Date.split(" - ")[0]}</span>
                          <span className="icon mg-x-5"><i
                            className="fas fa-long-arrow-alt-right"></i></span>
                          <span className="to-time">{item.Date.split(" - ")[1]}</span>
                        </td>
                        <td className="col-info">
                          <p className="role">{item.ExperienceName}</p>
                          <p className="description">{item.ExperienceContent}</p>
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
                  !!Certificate && Certificate.length > 0 && Certificate.map((item, index) =>
                      <tr key={index}>
                        <td className="col-time">
                          <span className="from-time">{item.Date}</span>
                        </td>
                        <td className="col-info">
                          <p className="role">{item.CertificateName}
                          </p>
                          <p className="description">{item.CertificateContent}</p>
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