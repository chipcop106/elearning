import React from 'react';
import ReactDOM from 'react-dom';

const LessonItem = ({
  CoursesID,
  DocumentID,
  DocumentName,
  DocumentDetailID,
  LessionName,
  start,
  end,
  date,
  TeacherID,
  Teacher,
  Status,
  StatusString,
}) => {
  return <tr>
    <td>{DocumentName}</td>
    <td>{date}</td>
    <td className="tx-nowrap">
      {/* <span>{start}</span>
      <i className="fas fa-long-arrow-alt-right mg-x-2"></i>
      <span>{end}</span> */}
      {LessionName}
    </td>
    <td><a href={`teacherDetail.html?ID=${TeacherID}`}>{Teacher}</a></td>
    <td><span className="tx-success">{StatusString}</span></td>
    <td><a href="lessonDetail.html" className="btn btn-primary">Detail</a></td>
  </tr>
}

export default LessonItem;