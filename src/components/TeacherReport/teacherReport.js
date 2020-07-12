import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../TeacherReport/teacherReport.module.scss';
import {getMonthReport} from '~src/api/teacherAPI';
import Skeleton from 'react-loading-skeleton';
const TeacherReport = () => {
  const [isLoading, setIsloading] = React.useState(true);
  const [state, setState] = React.useState(null);

  const getMonthReport = async () => {
    const res = await getMonthReport();
    if(res.Code === 1 && !!res.Data) setState(res.Data);
    setIsloading(false);
  }

  React.useEffect(() => {
    getMonthReport();
  },[]);
    return (
        <div>
  <div className="d-md-flex align-items-center justify-content-between mg-b-30">
    <h4 className="mg-b-0 gradient-heading"><i className="fas fa-address-card" /> MONTHLY STATISTIC</h4>
    <div className="select-wrap mg-t-15 mg-md-t-0 ">
      <select className="form-control">
        <option value="1">30 days ago</option>
        <option value="2">Last month</option>
        <option value="3">Last 3 month</option>
      </select>
    </div>
  </div>
  <div className="report__container">
    <div className="row price-table-wrapper">
      <div className="col-12 col-xs-6 col-md-6 col-lg-4 col-xl-4">
        <div className="table-card bg-1">
          <div className="card">
            <div className="card-body">
              <p className="name bg-1">Time slots</p>
              <ul className="feather">
                <li className="rp-info">
                  <span className="label">Opened Slots</span>
                  <span className="value">{isLoading ? <Skeleton width={25} /> : state.OpenedSlots}</span>
                </li>
                <li className="rp-info">
                  <span className="label">Finished Classes</span>
                  <span className="value">{isLoading ? <Skeleton width={25} /> : state.FinishedSlots}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-xs-6 col-md-6 col-lg-4 col-xl-4">
        <div className="table-card bg-2">
          <div className="card ">
            <div className="card-body">
              <p className="name bg-2">Participation</p>
              <ul className="feather">
                <li className="rp-info">
                  <span className="label">Teacher cancellation slots </span>
                  <span className="value">{isLoading ? <Skeleton width={25} /> : state.TeacherCancellationSlots}</span>
                </li>
                <li className="rp-info">
                  <span className="label">Teacher noshow slots </span>
                  <span className="value">{isLoading ? <Skeleton width={25} /> : state.TeacherNoshowSlots}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-xs-6 col-md-6 col-lg-4 col-xl-4">
        <div className="table-card bg-3">
          <div className="card">
            <div className="card-body">
              <p className="name bg-3">Parent feedback</p>
              <ul className="feather">
                <li className="rp-info">
                  <span className="label">5 stars feedback rate </span>
                  <span className="value">{isLoading ? <Skeleton width={25} /> : state.FiveStartFeedbackRate}</span>
                </li>
                <li className="rp-info">
                  <span className="label">Feedback submission rate </span>
                  <span className="value">{isLoading ? <Skeleton width={25} /> : state.FeedbackSubmissionRate}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h4 className="sub-title"><i className="fas fa-flag-checkered" /> Indicator Explanation</h4>
    <div className="table-responsive mg-t-15">
      <table className="table table-bordered table-vcenter table-explane" style={{borderCollapse: 'separate'}}>
        <tbody>
          <tr>
            <td rowSpan={2} className="valign-middle tx-center"><h5 className="tx-primary">TIME SLOTS</h5></td>
            <td>
              <h5>Opened Slots</h5>
              <p className="tx-gray-500 mg-b-0">Number of slots you opened that expired or finished within the selected period</p>
            </td>
          </tr>
          <tr>
            <td>
              <h5>Finished Classes</h5>
              <p className="tx-gray-500 mg-b-0">Number of classes that you completed with the Finish Type “As Schedule” or “Student No Show” </p>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td rowSpan={2} className="valign-middle tx-center"><h5 className="tx-primary">PARTICIPATION</h5></td>
            <td>
              <h5>Class Finished Rate</h5>
              <p className="tx-gray-500 mg-b-0">The percentage of classes that you completed with the Finish Type “As Schedule” or “Student No Show” and were not “Teacher Cancellations” or “Teacher No Show”.</p>
            </td>
          </tr>
          <tr>
            <td>
              <h5>Teacher Cancellations</h5>
              <p className="tx-gray-500 mg-b-0">Number of classes you canceled that expired or finished within the selected period</p>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td rowSpan={2} className="valign-middle tx-center"><h5 className="tx-primary">PARENT FEEDBACK</h5></td>
            <td>
              <h5>5 Stars Student Feedback Rate</h5>
              <p className="tx-gray-500 mg-b-0">The percentage of 5 stars feedback from students given within the selected period</p>
            </td>
          </tr>
          <tr>
            <td>
              <h5>Teacher Feedback Timely Submission Rate</h5>
              <p className="tx-gray-500 mg-b-0">The percentage of teacher feedback submission that you submit within 12 hours of every class.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>


    )
}

const domContainer = document.getElementById('react-teacher-report');
ReactDOM.render(<TeacherReport />, domContainer);