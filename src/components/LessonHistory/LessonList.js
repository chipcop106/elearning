import React from 'react';
import ReactDOM from 'react-dom';
import LessonItem from './LessonItem'
import SkeletonLessonHistoryCard from "../common/Skeleton/SkeletonLessonHistoryCard";
import { randomId } from "../../utils"

const initialState = [{
  id: randomId(),
  teacher: "Hoàng Thị Uyên Phương",
  images: "https://image.engoo.com/teacher/15867/p2872.jpg",
  courseName: "IELST - Professional",
  date: "24/06/2020",
  start: "10:30",
  end: "11:00",
  note: "Student have a good speaking skill",
  ratingCourse: "90",
}, {
  id: randomId(),
  teacher: "Hoàng Văn Thái",
  images: "https://images.unsplash.com/photo-1593087989983-e887d642a19c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  courseName: "IELST - Beginner",
  date: "15/06/2020",
  start: "10:00",
  end: "14:00",
  note: "Student have a good speaking skill",
  ratingCourse: "75",
}]

const LessonList = () => {
    const [state, setState] = React.useState(initialState);
    const [loading, setLoading] = React.useState(false);
    
    React.useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
          setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
      }, []);

    return loading ? <SkeletonLessonHistoryCard/> :
    <div className="table-responsive">
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th>Course</th>
                    <th>Date</th>
                    <th>Lesson</th>
                    <th>Teacher</th>
                    <th>Checkin</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {
                !!state && Array.isArray(state) && state.length > 0 &&
                state.map(item => <LessonItem
                    key={item.id}
                    name={item.courseName}
                    date={item.date}
                    start={item.start}
                    end={item.end}
                    teacher={item.teacher} />)
            }
            </tbody>
        </table>
    </div>
}

export default LessonList;