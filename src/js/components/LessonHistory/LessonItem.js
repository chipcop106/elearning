import React from 'react';
import ReactDOM from 'react-dom';

const LessonItem = ({ name, date, start, end, teacher }) => {
  return <tr>
      <td>{name}</td>
      <td>{date}</td>
      <td className="tx-nowrap">
        <span>{start}</span>
        <i className="fas fa-long-arrow-alt-right mg-x-2"></i>
        <span>{end}</span>
      </td>
      <td><a href="teacherDetail.html">{teacher}</a></td>
      <td><span className="tx-success">Checked</span></td>
      <td><a href="lessonDetail.html" className="btn btn-primary">Detail</a></td>
      </tr>
}

export default LessonItem;