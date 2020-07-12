import React from 'react';
import ReactDOM from 'react-dom';
import { getScheduleByTeacherUID } from "~src/api/studentAPI";

const ListSchedule = ({ learnTime, TeacherUID, date, handleBooking }) => {
  const [scheduleList, setSchedule] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const onHandleBooking = (id, LessionName, date, start, end) => {
    handleBooking(id, LessionName, date, start, end)
  }

  const getAPI = async (params) => {
    setLoading(true);
    const schedules = await getScheduleByTeacherUID(params);
    setSchedule(schedules.Data);
    setLoading(false);
  }
  React.useEffect(()=>{
    getAPI({
      TeacherUID,
      Date:date,
    })
  },[])

  return <React.Fragment>
    {
      !!scheduleList && !!learnTime && learnTime.length > 0 && learnTime.map(item=> {
       let bookedFilter = scheduleList.filter(item=>item.bookStatus)
       let availableFilter = scheduleList.filter(item=>!item.bookStatus && item.available)
       
       let status = "";
       let StudyTimeID = "";
       let title = "";
       let start = "";
       let end = "";
       bookedFilter.map(x=>{
         if(new Date(x.Start).getHours()-7 === parseInt(item.split(":")[0]) &&
            new Date(x.Start).getMinutes() === parseInt(item.split(":")[1]))
              status = "registed"
       })
       availableFilter.map(x=>{
        if(new Date(x.Start).getHours()-7 === parseInt(item.split(":")[0]) &&
           new Date(x.Start).getMinutes() === parseInt(item.split(":")[1]))
           {
              start = new Date(x.Start)
              end = new Date(x.End)
              StudyTimeID = x.StudyTimeID;
              title = x.title;
              status = "available"
           }
            
      })
        return <li className={status}>
      <span className="time">{item}</span>
      <span className="status">
        {
          status == "available" ? <button
          className="open-lessionwish"
          data-toggle="modal"
          data-target="#md-book-schedule"
            onClick={() => onHandleBooking(
              StudyTimeID,
              title,
              moment(start).format('DD/MM/YYYY'),
              moment(start).format('HH:mm'),
              moment(end).format('HH:mm'))
            } >Book now</button> : (status == "registed" ? "Booked": "")
        }
      </span>
          </li>
          })
    }
    </React.Fragment>
}

export default ListSchedule;