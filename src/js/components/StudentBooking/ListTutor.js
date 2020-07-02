import React from 'react';
import ReactDOM from 'react-dom';
import { nationMapToFlag } from '../../utils'
import styles from '~components/StudentBooking/ListTutor.module.scss';

const initialState = [{
	name: "Cherrylen",
	gender: "1",
	images: "https://image.engoo.com/teacher/7144/m2037.jpg",
	rating: 90,
	nation: "U.S.",
	availableTime: ["13:00", "14:00"],
	notAvailableTime: ["10:00", "06:00"],
}, {
	name: "Jerry",
	gender: "0",
	images: "https://image.engoo.com/teacher/7144/m2037.jpg",
	rating: 70,
	nation: "Malaysia",
	availableTime: ["18:00", "08:00"],
	notAvailableTime: ["10:00", "12:00"],
}, {
	name: "Jenny",
	gender: "1",
	images: "https://image.engoo.com/teacher/7144/m2037.jpg",
	rating: 80,
	nation: "Vietnam",
	availableTime: ["13:00", "17:00", "07:00"],
	notAvailableTime: ["16:00", "06:00"],
}, {
	name: "John",
	gender: "0",
	images: "https://image.engoo.com/teacher/7144/m2037.jpg",
	rating: 90,
	nation: "Japan",
	availableTime: ["08:00", "10:00"],
	notAvailableTime: ["13:00", "15:00"],
}]

const ListTutor = ({ searchInput }) => {
	const [state, setState] = React.useState(initialState);
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
														<img src="https://image.engoo.com/teacher/7144/m2037.jpg"
															alt="" />
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
																const className = item.availableTime.includes(time) ? "available" :
																	item.notAvailableTime.includes(time) ? "registed" : ""
																return (
																	<li className={className} key={index}>
																		<span className="time">{time}</span>
																		<span className="status">
																			{
																				item.availableTime.includes(time) ?
																					<button className="open-lessionwish">Book now</button> :
																					item.notAvailableTime.includes(time) ? "Booked" : ""
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
		</div >
	)
}

export default ListTutor;