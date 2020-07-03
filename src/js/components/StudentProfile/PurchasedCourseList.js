import React from 'react';
import ReactDOM from 'react-dom';
import PurchasedCourseCard from "./PurchasedCourseCard";
import SkeletonLessonCard from "../common/Skeleton/SkeletonLessonCard";

const initialState = [{
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
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  
  return (
    <React.Fragment>
      <div className="course-horizental mg-t-20">
        <ul className="list-wrap">
          {
            state.map((item, index) => {
              return loading?<SkeletonLessonCard key={index}/>:<PurchasedCourseCard
                key={index}
                avatar={item.avatar}
                name={item.courseName}
                total={item.total}
                completed={item.completed}
                incoming={item.incoming}
                canceled={item.canceled}
                status={item.status}
                start={item.start}
                end={item.end}
                material={item.courseMaterial} />
            })
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
  )
}
export default PurchasedCourseList;