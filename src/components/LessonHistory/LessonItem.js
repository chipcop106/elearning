import React from 'react';
import ReactDOM from 'react-dom';

const LessonItem = ({
  CoursesID,
  CoursesName,
  LessionID,
  LessionName,
  start,
  end,
  date,
  Teacher,
  Status,
}) => {
  return <tr>
    <td>{CoursesName}</td>
    <td>{date}</td>
    <td className="tx-nowrap">
      <span>{start}</span>
      <i className="fas fa-long-arrow-alt-right mg-x-2"></i>
      <span>{end}</span>
    </td>
    <td><a href="teacherDetail.html">{Teacher}</a></td>
    <td><span className="tx-success">{Status}</span></td>
    <td><a href="lessonDetail.html" className="btn btn-primary">Detail</a></td>
  </tr>
}

export default LessonItem;