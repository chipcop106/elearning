import React from 'react';
import ReactDOM from 'react-dom';
import LessonItem from './LessonItem'

const LessonList = () => {
    return (
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