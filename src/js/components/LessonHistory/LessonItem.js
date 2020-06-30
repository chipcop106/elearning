import { convertTime } from "../../utils.js";
import { convertDay } from "../../utils.js";

const initialState = [{
  courseId: "1",
  teacher: "Hoàng Thị Uyên Phương",
  images: "https://image.engoo.com/teacher/15867/p2872.jpg",
  courseName: "IELST - Professional",
  date: "24/06/2020",
  startTime: "10:30",
  endTime: "11:00",
  note: "Student have a good speaking skill",
  ratingCourse: "90",
}, {
  courseId: "2",
  teacher: "Hoàng Văn Thái",
  images: "https://images.unsplash.com/photo-1593087989983-e887d642a19c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  courseName: "IELST - Beginner",
  date: "15/06/2020",
  startTime: "10:00",
  endTime: "14:00",
  note: "Student have a good speaking skill",
  ratingCourse: "75",
}]
const LessonItem = () => {
  const [state, setState] = React.useState(initialState);
  return (<React.Fragment>
    {
      state.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.courseName}</td>
            <td>{item.date}</td>
            <td className="tx-nowrap">
              <span>{item.startTime} {convertTime(item.startTime)}</span>
              <i className="fas fa-long-arrow-alt-right mg-x-2"></i>
              <span>{item.endTime} {convertTime(item.endTime)}</span>
            </td>
            <td><a href="teacher-detail.html">{item.teacher}</a></td>
            <td><span className="tx-success">Checked</span></td>
            <td><a href="lesson-detail.html" className="btn btn-primary">Detail</a></td>
          </tr>
        )
      })
    }
  </React.Fragment>)
}

export default LessonItem;