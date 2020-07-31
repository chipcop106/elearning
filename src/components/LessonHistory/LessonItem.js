import React from 'react';
import ReactDOM from 'react-dom';

const LessonItem = ({
  BookingID,
  DocumentID,
  DocumentDetailID,
  DocumentName,
  LessionName,
  LessonDetail,
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
    <td style={{whiteSpace:"pre-line"}}>
      {LessionName}
    </td>
    <td><a href={`ElearnStudent/teacherDetail?ID=${TeacherUID}`}>{TeacherName}</a></td>
    <td><span className="tx-success">{StatusString}</span></td>
    <td>
      {
        LessonDetail.split("ID=")[1] !== "0" && 
        <a href={LessonDetail} className="btn btn-primary">Detail</a>
      }</td>
  </tr>
}

export default LessonItem;