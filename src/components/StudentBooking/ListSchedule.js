import React from 'react';
import ReactDOM from 'react-dom';
import { getScheduleByTeacherUID } from "~src/api/studentAPI";

const ListSchedule = ({
  learnTime,
  TeacherUID,
  TeacherIMG,
  TeacherName,
  Rate,
  date,
  handleBooking,
  onBookId,
  onBookStudentName
}) => {
  const [scheduleList, setSchedule] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const onHandleBooking = (StudyTimeID, LessionName, TeacherUID,  TeacherIMG, TeacherName, Rate, date, start, end) => {
    handleBooking(StudyTimeID, LessionName, TeacherUID,  TeacherIMG, TeacherName, Rate, date, start, end)
  }

  const getAPI = async (params) => {
    setLoading(true);
    const res = await getScheduleByTeacherUID(params);
    if(res.Code === 1) {
      setSchedule(res.Data);
    }
    
    setLoading(false);
  }
  React.useEffect(() => {
    getAPI({
      TeacherUID,
      Date: date,
    })
  }, [])

  React.useEffect(() => {
    let newSchedule = [...scheduleList]
    let index = newSchedule.findIndex(i => i.StudyTimeID == onBookId);
    if (index !== -1) {
      newSchedule[index].bookStatus = true;
      newSchedule[index].bookInfo.name = onBookStudentName;
      setSchedule(newSchedule);
    }
  }, [onBookId, onBookStudentName])

  return <React.Fragment>
    {
      !!scheduleList && !!learnTime && learnTime.length > 0 && learnTime.map((item, index) => {
        let bookedFilter = scheduleList.filter(item => item.bookStatus)
        let availableFilter = scheduleList.filter(item => !item.bookStatus && item.available)

        let status = "";
        let StudyTimeID = "";
        let LessionName = "";
        let start = "";
        let end = "";
        bookedFilter.map(x => {
          if (new Date(x.Start).getHours() === parseInt(item.split(":")[0]) &&
            new Date(x.Start).getMinutes() === parseInt(item.split(":")[1]))
            status = "registed"
        })
        availableFilter.map(x => {
          if (new Date(x.Start).getHours() === parseInt(item.split(":")[0]) &&
            new Date(x.Start).getMinutes() === parseInt(item.split(":")[1])) {
            start = new Date(x.Start)
            end = new Date(x.End)
            StudyTimeID = x.StudyTimeID;
            LessionName = x.title;
            status = "available"
          }

        })
        return <li className={status} key={index}>
          <span className="time">{item}</span>
          <span className="status">
            {
              status == "available" ? <button
                className="open-lessionwish"
                data-toggle="modal"
                data-target="#md-book-schedule"
                onClick={() => onHandleBooking(
                  StudyTimeID,
                  LessionName,
                  TeacherUID,
                  TeacherIMG,
                  TeacherName,
                  Rate,
                  moment(start).format('DD/MM/YYYY'),
                  moment(start).format('HH:mm A'),
                  moment(end).format('HH:mm A'))
                } >Book now</button> : (status == "registed" ? "Booked" : "")
            }
          </span>
        </li>
      })
    }
  </React.Fragment>
}

export default ListSchedule;