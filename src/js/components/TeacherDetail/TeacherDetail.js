import StudentComment from "./StudentComment"
import BookingSchedule from "./BookingSchedule"
import TeacherInformation from "./TeacherInformation"
import { nationMapToFlag, randomId } from '../../utils'

const initialState = {
  name: "Huỳnh Thị Lan Anh",
  image: "https://theamericanschool.edu.vn/wp-content/uploads/2020/01/Ms-Hong-Nguyen-Vietnamese.jpg",
  nation: "U.S.",
  video: "https://www.youtube.com/embed/mJzpX_YrC10",
  desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus sunt delectus itaque veritatis quidem tempora, nesciunt excepturi dolores impedit consectetur cumque natus! Debitis unde repellat incidunt aut molestiae, possimus accusamus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quisquam debitis dolor veniam non saepe voluptas consectetur culpa sequi illum, doloribus in minima officia ut id deleniti consequuntur ipsum corporis?",
  introduce: `While I have no soccer skills, I once played in a fairly competitive adult soccer league with my then-teenage stepson. I was terrible, but I played because he asked me to. (When your kids get older and ask you to do something with them, the first time you say no might be the last time you get asked.) I was trying to match the drollness of my "Wow" when my stepson stepped in, half-smile on his lips and full twinkle in his eyes, and rescued me by saying, "Come on, we need to get ready." Was Louis cocky? Certainly, but only on the surface. His $400 cleats, carbon fiber shin guards, and "I'm the king of the business world" introduction was an unconscious effort to protect his ego. His introduction said, "Hey, I might not turn out to be good at soccer, but out there in the real world, where it really matters, I am the Man." As we took the field before a game, a guy on the other team strutted over, probably picking me out because I was clearly the oldest player on the field. (There's a delightful sentence to write.)`,
  experience: [
    {
      fromTime: "12/2018",
      toTime: "02/2019",
      position: "Tutor Teacher",
      desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus doloremque voluptatem eius eveniet quae, iste et, harum, commodi ad voluptates blanditiis vero a? Delectus, provident! Quos ea amet aperiam quisquam!`,
    },{
      fromTime: "12/2018",
      toTime: "02/2019",
      position: "Tutor Teacher",
      desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus doloremque voluptatem eius eveniet quae, iste et, harum, commodi ad voluptates blanditiis vero a? Delectus, provident! Quos ea amet aperiam quisquam!`,
    },{
      fromTime: "12/2018",
      toTime: "02/2019",
      position: "Tutor Teacher",
      desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus doloremque voluptatem eius eveniet quae, iste et, harum, commodi ad voluptates blanditiis vero a? Delectus, provident! Quos ea amet aperiam quisquam!`,
    }],
  certificate: [{
    time: "12/2018",
    course: "IELST 8.0 Certificate",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus doloremque voluptatem eius eveniet quae, iste et, harum, commodi ad voluptates blanditiis vero a? Delectus, provident! Quos ea amet aperiam quisquam!`,
  },{
    time: "02/2019",
    course: "Bachelor Certificate Information Of Technologies",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus doloremque voluptatem eius eveniet quae, iste et, harum, commodi ad voluptates blanditiis vero a? Delectus, provident! Quos ea amet aperiam quisquam!`,
  }],
  schedule: [{
    id: randomId(),
    day:"03/7/2020",
    courseName: "English For Today",
    timeStart: "12:30",
    timeEnd: "13:00",
    status: "available",
  } ,{
    id: randomId(),
    day:"03/7/2020",
    courseName: "English For Today",
    timeStart: "13:30",
    timeEnd: "14:00",
    status: "available",
  },{
    id: randomId(),
    day:"03/7/2020",
    courseName: "English For Today",
    timeStart: "08:00",
    timeEnd: "08:30",
    status: "available",
  },{
    id: randomId(),
    day:"03/7/2020",
    courseName: "English For Today",
    timeStart: "20:30",
    timeEnd: "21:00",
    status: "available",
  },{
    id: randomId(),
    day:"03/7/2020",
    courseName: "TOEIC Basic",
    timeStart: "22:30",
    timeEnd: "23:00",
    status: "booked",
    student: "Hoàng Văn Thái"
  },{
    id: randomId(),
    day:"04/7/2020",
    courseName: "Grammar",
    timeStart: "12:30",
    timeEnd: "13:00",
    status: "available",
  },{
    id: randomId(),
    day:"04/7/2020",
    courseName: "TOEIC Advanced",
    timeStart: "15:30",
    timeEnd: "16:00",
    status: "available",
  },{
    id: randomId(),
    day:"03/7/2020",
    courseName: "IELTS 6.0",
    timeStart: "09:30",
    timeEnd: "10:00",
    status: "booked",
    student: "asdasd"
  },{
    id: randomId(),
    day:"02/7/2020",
    courseName: "IELTS 6.0",
    timeStart: "11:00",
    timeEnd: "11:30",
    status: "booked",
    student: "asdasd"
  }],
}

const TeacherDetail = () => {
  const [state, setState] = React.useState(initialState)

  const onHandleBookSchedule = (id, student) => {
    let index = state.schedule.findIndex(x => x.id === id)
    const newSchedule = [...state.schedule]
    
    newSchedule[index].status = "booked";
    newSchedule[index].student = student;

    setState({...state, schedule: newSchedule})
  }

  const onHandleCancelSchedule = (id) => {
    let index = state.schedule.findIndex(x => x.id === id)
    const newSchedule = [...state.schedule]

    newSchedule[index].status = "available";
    delete newSchedule[index]["student"];

    setState({...state, schedule: newSchedule})
  }

  return (
    <div className="teacher__detail__wrap card-box">
      <div className="teacher__detail">
        <div className="teacher-header">
          <div className="teacher-avatar">
            <img src={state.image} alt="avatar"/>
          </div>
          <div className="teacher-info">
            <div className="teacher-name">
                <h5 className="name">{state.name}</h5>
              <div className="nation">
                <span className={`flag-icon flag-icon-${nationMapToFlag(state.nation)} flag-icon-squared mg-r-5`}></span>
                <span className="badge badge-light"><span className="tx-success"><i
                  className="fa fa-check-circle"></i> Verified</span></span>
              </div>
            </div>
            <div className="teacher-summary">
              <a href="#js-video-modal" data-src={state.video}
                className="tx-primary" id="video-teacher"><i className="fas fa-play-circle "></i>
                Xem video giới thiệu</a>
              <p className="mg-b-0 mg-t-10">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus sunt delectus itaque veritatis quidem tempora, nesciunt excepturi dolores impedit consectetur cumque natus! Debitis unde repellat incidunt aut molestiae, possimus accusamus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quisquam debitis dolor veniam non saepe voluptas consectetur culpa sequi illum, doloribus in minima officia ut id deleniti consequuntur ipsum corporis?</p>
            </div>
          </div>
        </div>
        <div className="teacher-body">
          <div className="tab-navigation">
            <ul className="list-tab" id="js-list-tab">
              <li className="tab-item">
                <a href={"#"} className="tab-link active" data-index="0">TEACHER INFORMATION</a>
              </li>
              <li className="tab-item">
                <a href={"#"} className="tab-link " data-index="1">BOOKING SCHEDULE</a>
              </li>
              <li className="tab-item">
                <a href={"#"} className="tab-link " data-index="2">STUDENT COMMENT</a>
              </li>
            </ul>
          </div>
          <div className="tab-navigation-content">
            <div className="swiper-container" id="js-teacher__info">
              <div className="teacher__info-wrap swiper-wrapper">
                <div className="swiper-slide">
                  <div className="slide-tab-content">
                  <TeacherInformation
                      introduce={state.introduce}
                      experience={state.experience}
                      certificate={state.certificate}/>
                   </div>
                </div>
                <div className="swiper-slide">
                  <div className="slide-tab-content">
                    <BookingSchedule 
                        schedule={state.schedule}
                        handleBookSchedule={onHandleBookSchedule}
                        handleCancelSchedule={onHandleCancelSchedule}/>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="slide-tab-content">
                    <StudentComment/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<TeacherDetail />, document.getElementById("react-teacher-detail"));
