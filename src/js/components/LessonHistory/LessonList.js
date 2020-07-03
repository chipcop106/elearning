import React from 'react';
import ReactDOM from 'react-dom';
import LessonItem from './LessonItem'
import SkeletonLessonHistoryCard from "../common/Skeleton/SkeletonLessonHistoryCard"
const LessonList = () => {
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
          setLoading(false);
        }, 5000);
        return () => clearTimeout(timer);
      }, []);

    return loading? <SkeletonLessonHistoryCard/>:(
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
                    <LessonItem/>
                </tbody>
            </table>
        </div>
    )
}

export default LessonList;