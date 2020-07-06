import React from 'react';
import ReactDOM from 'react-dom';
import PurchasedCourseCard from "./PurchasedCourseCard";
import SkeletonLessonCard from "../common/Skeleton/SkeletonLessonCard";
import { randomId } from "../../utils.js"

const initialState = [{
  id:randomId(),
  teacher: "Hoàng Thị Quyên",
  avatar: "interface-2.jpg",
  courseName: "IELST - Professional",
  total: 20,
  completed: 30,
  incoming: 20,
  canceled: 15,
  status: "ongoing",
  start: "20/04/2020",
  end: "20/12/2020",
  courseMaterial: "ITLEST 8.0 EASY",
}, {
  id:randomId(),
  teacher: "Hoàng Văn Thái",
  avatar: "interface-2.jpg",
  courseName: "IELST - Professional",
  total: 20,
  completed: 30,
  incoming: 20,
  canceled: 15,
  status: "finished",
  start: "20/04/2020",
  end: "20/12/2020",
  courseMaterial: "ITLEST 8.0 EASY",
}]
const PurchasedCourseList = () => {
  const [state, setState] = React.useState(initialState);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  
  return <React.Fragment>
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
      <div className="course-horizental mg-t-20">
        <ul className="list-wrap">
          {
            !!state && Array.isArray(state) && state.length > 0 && state.map(item =>
              loading ? <SkeletonLessonCard key={item.id}/> :
              <PurchasedCourseCard
                key={item.id}
                id={item.id}
                avatar={item.avatar}
                name={item.courseName}
                total={item.total}
                completed={item.completed}
                incoming={item.incoming}
                canceled={item.canceled}
                status={item.status}
                start={item.start}
                end={item.end}
                material={item.courseMaterial} />)
          }
        </ul>
      </div>
      <nav aria-label="Page navigation" className="mg-t-15">
        <ul className="pagination mg-b-0 justify-content-end">
          <li className="page-item disabled"><a className="page-link page-link-icon" href="#"><i
            data-feather="chevron-left"></i></a></li>
          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item"><a className="page-link page-link-icon" href="#"><i
            data-feather="chevron-right"></i></a></li>
        </ul>
      </nav>
    </React.Fragment>
}
export default PurchasedCourseList;