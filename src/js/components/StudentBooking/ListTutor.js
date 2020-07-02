import React from 'react';
import ReactDOM from 'react-dom';
import BookingLessonModal from "../BookingLessonModal";
import { nationMapToFlag } from '../../utils'
import styles from '~components/StudentBooking/ListTutor.module.scss';

const initialState = [{
	name: "Cherrylen",
	gender: "0",
	image: "https://image.engoo.com/teacher/7144/m2037.jpg",
	rating: 90,
	nation: "U.S.",
	schedule: [{
    id: randomId(),
    day:"03/07/2020",
    courseName: "English For Today",
    timeStart: "12:30",
    timeEnd: "13:00",
    status: "available",
  } ,{
    id: randomId(),
    day:"03/07/2020",
    courseName: "English For Today",
    timeStart: "13:30",
    timeEnd: "14:00",
    status: "available",
  },{
    id: randomId(),
    day:"03/07/2020",
    courseName: "English For Today",
    timeStart: "08:00",
    timeEnd: "08:30",
    status: "available",
  },{
    id: randomId(),
    day:"03/07/2020",
    courseName: "English For Today",
    timeStart: "20:30",
    timeEnd: "21:00",
    status: "available",
  },{
    id: randomId(),
    day:"03/07/2020",
    courseName: "TOEIC Basic",
    timeStart: "22:30",
    timeEnd: "23:00",
    status: "booked",
    student: "Hoàng Văn Thái"
  },{
    id: randomId(),
    day:"04/07/2020",
    courseName: "Grammar",
    timeStart: "12:30",
    timeEnd: "13:00",
    status: "available",
  },{
    id: randomId(),
    day:"04/07/2020",
    courseName: "TOEIC Advanced",
    timeStart: "15:30",
    timeEnd: "16:00",
    status: "available",
  },{
    id: randomId(),
    day:"03/07/2020",
    courseName: "IELTS 6.0",
    timeStart: "09:30",
    timeEnd: "10:00",
    status: "booked",
    student: "Hoàng Văn Thái"
  },{
    id: randomId(),
    day:"02/07/2020",
    courseName: "IELTS 6.0",
    timeStart: "11:00",
    timeEnd: "11:30",
    status: "booked",
    student: "Hoàng Văn Thái"
  }],
},{
	name: "Karen",
	gender: "1",
	image: "https://image.engoo.com/teacher/7144/m2037.jpg",
	rating: 90,
	nation: "Canada",
	schedule: [{
    id: randomId(),
    day:"03/07/2020",
    courseName: "English For Today",
    timeStart: "12:30",
    timeEnd: "13:00",
    status: "available",
  } ,{
    id: randomId(),
    day:"03/07/2020",
    courseName: "English For Today",
    timeStart: "13:30",
    timeEnd: "14:00",
    status: "available",
  },{
    id: randomId(),
    day:"03/07/2020",
    courseName: "English For Today",
    timeStart: "08:00",
    timeEnd: "08:30",
    status: "available",
  },{
    id: randomId(),
    day:"03/07/2020",
    courseName: "English For Today",
    timeStart: "20:30",
    timeEnd: "21:00",
    status: "available",
  },{
    id: randomId(),
    day:"03/07/2020",
    courseName: "TOEIC Basic",
    timeStart: "22:30",
    timeEnd: "23:00",
    status: "booked",
    student: "Hoàng Văn Thái"
  },{
    id: randomId(),
    day:"04/07/2020",
    courseName: "Grammar",
    timeStart: "12:30",
    timeEnd: "13:00",
    status: "available",
  },{
    id: randomId(),
    day:"04/07/2020",
    courseName: "TOEIC Advanced",
    timeStart: "15:30",
    timeEnd: "16:00",
    status: "available",
  },{
    id: randomId(),
    day:"03/07/2020",
    courseName: "IELTS 6.0",
    timeStart: "09:30",
    timeEnd: "10:00",
    status: "booked",
    student: "Hoàng Văn Thái"
  },{
    id: randomId(),
    day:"02/07/2020",
    courseName: "IELTS 6.0",
    timeStart: "11:00",
    timeEnd: "11:30",
    status: "booked",
    student: "Hoàng Văn Thái"
  }],
},{
	name: "Kim",
	gender: "1",
	image: "https://image.engoo.com/teacher/7144/m2037.jpg",
	rating: 90,
	nation: "Vietnam",
	schedule: [{
    id: randomId(),
    day:"03/07/2020",
    courseName: "English For Today",
    timeStart: "12:30",
    timeEnd: "13:00",
    status: "available",
  } ,{
    id: randomId(),
    day:"03/07/2020",
    courseName: "English For Today",
    timeStart: "13:30",
    timeEnd: "14:00",
    status: "available",
  },{
    id: randomId(),
    day:"03/07/2020",
    courseName: "English For Today",
    timeStart: "08:00",
    timeEnd: "08:30",
    status: "available",
  },{
    id: randomId(),
    day:"03/07/2020",
    courseName: "English For Today",
    timeStart: "20:30",
    timeEnd: "21:00",
    status: "available",
  },{
    id: randomId(),
    day:"03/07/2020",
    courseName: "TOEIC Basic",
    timeStart: "22:30",
    timeEnd: "23:00",
    status: "booked",
    student: "Hoàng Văn Thái"
  },{
    id: randomId(),
    day:"04/07/2020",
    courseName: "Grammar",
    timeStart: "12:30",
    timeEnd: "13:00",
    status: "available",
  },{
    id: randomId(),
    day:"04/07/2020",
    courseName: "TOEIC Advanced",
    timeStart: "15:30",
    timeEnd: "16:00",
    status: "available",
  },{
    id: randomId(),
    day:"03/07/2020",
    courseName: "IELTS 6.0",
    timeStart: "09:30",
    timeEnd: "10:00",
    status: "booked",
    student: "Hoàng Văn Thái"
  },{
    id: randomId(),
    day:"02/07/2020",
    courseName: "IELTS 6.0",
    timeStart: "11:00",
    timeEnd: "11:30",
    status: "booked",
    student: "Hoàng Văn Thái"
  }],
},{
	name: "John",
	gender: "0",
	image: "https://image.engoo.com/teacher/7144/m2037.jpg",
	rating: 90,
	nation: "Malaysia",
	schedule: [{
    id: randomId(),
    day:"03/07/2020",
    courseName: "English For Today",
    timeStart: "12:30",
    timeEnd: "13:00",
    status: "available",
  } ,{
    id: randomId(),
    day:"03/07/2020",
    courseName: "English For Today",
    timeStart: "13:30",
    timeEnd: "14:00",
    status: "available",
  },{
    id: randomId(),
    day:"03/07/2020",
    courseName: "English For Today",
    timeStart: "08:00",
    timeEnd: "08:30",
    status: "available",
  },{
    id: randomId(),
    day:"03/07/2020",
    courseName: "English For Today",
    timeStart: "20:30",
    timeEnd: "21:00",
    status: "available",
  },{
    id: randomId(),
    day:"03/07/2020",
    courseName: "TOEIC Basic",
    timeStart: "22:30",
    timeEnd: "23:00",
    status: "booked",
    student: "Hoàng Văn Thái"
  },{
    id: randomId(),
    day:"04/07/2020",
    courseName: "Grammar",
    timeStart: "12:30",
    timeEnd: "13:00",
    status: "available",
  },{
    id: randomId(),
    day:"04/07/2020",
    courseName: "TOEIC Advanced",
    timeStart: "15:30",
    timeEnd: "16:00",
    status: "available",
  },{
    id: randomId(),
    day:"03/07/2020",
    courseName: "IELTS 6.0",
    timeStart: "09:30",
    timeEnd: "10:00",
    status: "booked",
    student: "Hoàng Văn Thái"
  },{
    id: randomId(),
    day:"02/07/2020",
    courseName: "IELTS 6.0",
    timeStart: "11:00",
    timeEnd: "11:30",
    status: "booked",
    student: "Hoàng Văn Thái"
  }],
}]

const initialBookingModal = {
	name: "",
	day: "",
	start: "",
	end: ""
}

const ListTutor = ({ searchInput }) => {
	const [state, setState] = React.useState(initialState);
	const [stateBookingModal, setStateBookingModal] = React.useState(initialBookingModal);

	const handleBook = (id, courseName, day, start, end) => {
		$("#md-book-schedule").attr("data-id", id);
		setStateBookingModal({...stateBookingModal,
			name:courseName,
			day,
			start,
			end
		})
		$("#md-book-schedule").modal("show");
	}

	let learnTime = []
	let min = Math.min(
		parseInt(searchInput.startTime.split(":")[0]),
		parseInt(searchInput.endTime.split(":")[0])
	)
	let max = Math.max(
		parseInt(searchInput.startTime.split(":")[0]),
		parseInt(searchInput.endTime.split(":")[0])
	)

	for (let i = min; i <= max; i++)
	{
		learnTime.push(`${i<10?'0'+i:i}:00`)
		if(i!==max)
			learnTime.push(`${i<10?'0'+i:i}:30`)
	}


	React.useEffect(() => {
		$('#display-schedule').on('change', function () {
			if ($('#display-schedule').prop('checked') === true) {
				$('.tutor-schedule').slideDown();
			} else {
				$('.tutor-schedule').slideUp();
			}
		});
		$('.nationality').click(function () {
			$('#div-nationality').modal();
		});
		
	}, []);

	let filteredState = state

	if (searchInput.gender.length)
		filteredState = filteredState.filter(item => {
			return item.gender === searchInput.gender
		})

	if (searchInput.nation.length)
		filteredState = filteredState.filter(item => {
			return searchInput.nation.includes(item.nation)
		})

	return (
		<div className="filter-group pd-t-10 mg-t-10 bd-t" id="list-tutor">
			<div className="filter-row row">
				<div className="left col-md-2">
					<h5>List Tutor</h5>
				</div>
				<div className="right col-md-10" style={{ alignItems: 'center', display: 'inline-flex' }}>
					<div className="custom-control custom-checkbox">
						<input type="checkbox" className="custom-control-input" id="display-schedule" />
						<label className="custom-control-label" htmlFor="display-schedule">Show schedule</label>
					</div>
				</div>
			</div>
			<div className="filter-row row">
				<div className="col-sm-12">
					<div className="table-tutor">
						<ul className="list-tutors">
							{
								filteredState.map((item, index) => {
									return (
										<li className="tutor" key={index}>
											<div className="totor-detail">
												<a href="teacherDetail.html" className="tutor-wrap">
													<span className="tutor-avatar">
														<img src={item.image} alt="" />
													</span>
													<div className="tutor-infomation pd-5">
														<div className="tutor-info">
															<div className="tutor-rating-star">
																<div className="rating-stars">
																	<span className="empty-stars">
																		<i className="star fa fa-star"></i>
																		<i className="star fa fa-star"></i>
																		<i className="star fa fa-star"></i>
																		<i className="star fa fa-star"></i>
																		<i className="star fa fa-star"></i>
																	</span>
																	<span className="filled-stars" style={{ width: `${item.rating}%`, }}>
																		<i className="star fa fa-star"></i>
																		<i className="star fa fa-star"></i>
																		<i className="star fa fa-star"></i>
																		<i className="star fa fa-star"></i>
																		<i className="star fa fa-star"></i>
																	</span>
																</div>
																<div className="tutor-rate-point">{(item.rating / 20).toFixed(1)}</div>
															</div>
														</div>
														<h6 className="mg-t-5"><span className={`flag-icon flag-icon-${nationMapToFlag(item.nation)} flag-icon-squared`}></span>{item.name}</h6>
													</div>
												</a>
												<div className="tutor-schedule">
													<ul className="ul-schedule">
														{
															learnTime.map((time, index) => {
																let filterTime = item.schedule.filter(x=>{
																	return x.day === searchInput.date
																}).filter(x=>{
																	return x.timeStart === time
																})
																console.log(filterTime)
																const className = !(filterTime.length) ? "" :
																	filterTime[0] && filterTime[0].status === "available" ? "available" : "registed"
																return (
																	<li className={className} key={index}>
																		<span className="time">{time}</span>
																		<span className="status">
																			{
																				filterTime[0] && filterTime[0].status === "available" ?
																					<button className="open-lessionwish" onClick={()=>handleBook(
																						filterTime[0].id,
																						filterTime[0].courseName,
																						filterTime[0].day,
																						filterTime[0].timeStart,
																						filterTime[0].timeEnd)
																				}>Book now</button> :
																					filterTime[0] && filterTime[0].status === "booked" ? "Booked" : ""
																			}
																		</span>
																	</li>
																)
															})
														}
													</ul>
												</div>
											</div>
										</li>
									)
								})
							}
						</ul>
					</div>
				</div>
			</div>
			<BookingLessonModal
				style={{color:"#000",textAlign:"left"}}
				name={stateBookingModal.name}
				day={stateBookingModal.day}
				start={stateBookingModal.start}
				end={stateBookingModal.end}/>
		</div>
	)
}

export default ListTutor;