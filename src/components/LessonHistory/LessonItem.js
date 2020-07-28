import React from 'react';
import ReactDOM from 'react-dom';

const LessonItem = ({
  BookingID,
  DocumentID,
  DocumentDetailID,
  DocumentName,
  LessionName,
  start,
  end,
  date,
  TeacherUID,
  TeacherName,
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
    <td><a href={`teacherDetail.html?ID=${TeacherUID}`}>{TeacherName}</a></td>
    <td><span className="tx-success">{StatusString}</span></td>
    <td><a href={`lessonDetail.html?ID=${BookingID}`} className="btn btn-primary">Detail</a></td>
  </tr>
}

export default LessonItem;