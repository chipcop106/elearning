import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import ListSchedule from "./ListSchedule"
import { getListTeacher } from "~src/api/studentAPI";
import { getListLevelPurpose } from "~src/api/optionAPI";

import BookingLessonModal from "../BookingLessonModal";
import { nationMapToFlag } from "~src/utils"
import { ToastContainer } from 'react-toastify'
import Flatpickr from 'react-flatpickr';

import styles from '~components/StudentBooking/BookingLesson.module.scss';

const initialState = {
  nation: [],
  gender: "1,2,3",
  levelPurpose: [],
  selectedLevelPurpose: [],
  date: moment(new Date()).format('DD/MM/YYYY'),
  startTime: "06:00",
  endTime: "23:00",
  searchText: "",
}

const initialBookLesson = {
  StudyTimeID: "",
  LessionName: "",
  TeacherUID: "",
  TeacherIMG: "",
  TeacherName: "",
  Rate: "",
  date: "",
  start: "",
  end: "",
}

const initialOnBookState = {
  TeacherUID: "",
  StudyTimeID: "",
  studentName: "",
}

const reducer = (prevState, { type, payload }) => {
  switch (type) {
    case "STATE_CHANGE": {
      return {
        ...prevState,
        [payload.key]: payload.value
      }
    }
    default: return prevState;
      break;
  }
}

const BookingLesson = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [teachersList, setTeacherList] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [onBookState, setOnBookState] = React.useState(initialOnBookState)
  const [stateBookLesson, setStateBookLesson] = React.useState(initialBookLesson);

  let learnTime = [];

  const getAPI = async (params) => {
    setLoading(true);
    const res = await getListTeacher(params);
    if (res.Code === 1 && res.Data.length > 0) {
      setTeacherList(res.Data);
    }
    setLoading(false);
  }

  const renderLevelPurpose = (options) => {
    return options.map(item => item.PurposeLevelName)
  }

  const fetchListLevelPurpose = async (params) => {
    const res = await getListLevelPurpose(params);
    if (res.Code === 1 && res.Data.length > 0) {
      let key = "levelPurpose";
      const value = res.Data;
      dispatch({ type: "STATE_CHANGE", payload: { key, value } })
    }
  }

  const onHandleBooking = (StudyTimeID, LessionName, TeacherUID, TeacherIMG, TeacherName, Rate, date, start, end) => {
    setStateBookLesson({
      ...stateBookLesson,
      StudyTimeID,
      LessionName,
      TeacherUID,
      TeacherIMG,
      TeacherName,
      Rate,
      date,
      start,
      end,
    })
  }

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const key = target.getAttribute("name");
    dispatch({ type: "STATE_CHANGE", payload: { key, value } })
  }

  const handleChangeDate = (e) => {
    let key = "date";
    let value = $("#date-selected").val().split(", ")[1]
    dispatch({ type: "STATE_CHANGE", payload: { key, value } })
  }

  const handleChangeNation = (e) => {
    let key = "nation";
    let array = [];
    $('#div-nationality .national-checkbox input').each(function () {
      if ($(this).is(':checked')) {
        array.push($(this).next().text())
      }
    })
    const value = array.join(",");
    dispatch({ type: "STATE_CHANGE", payload: { key, value } })
  }

  const onBook = (TeacherUID, StudyTimeID, studentName) => {
     setOnBookState({
      ...onBookState,
      TeacherUID,
      StudyTimeID,
      studentName
    })
  }

  const onSearch = (e) => {
    console.log(state)
    setTeacherList([]);
    e.preventDefault();
    console.log(state)
    let z = [];
    for (let i = 0; i < state.selectedLevelPurpose.length; i++) {
      for (let j = 0; j < state.levelPurpose.length; j++) {
        if (state.selectedLevelPurpose[i] === state.levelPurpose[j].PurposeLevelName) {
          z.push(state.levelPurpose[j].ID);
          break;
        }
      }
    }

    setTeacherList([]);
    $('#display-schedule').prop('checked', false);
    getAPI({
      Nation: state.nation.length === 0 ? "" : state.nation,
      LevelPurpose: z.join(","),
      Gender: state.gender,
      Date: state.date,
      Start: state.startTime,
      End: state.endTime,
    });
  }

  const initCalendar = () => {
    'use strict';
    const dateString = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thusday', 'Friday', 'Saturday'];
    const monthString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December'
    ];
    const getMonthString = inMonth => monthString[inMonth];
    const getDateString = inDate => dateString[inDate];
    const getNextNumberDay = (startDate, daysToAdd) => {
      let arrDates = [];
      for (let i = 1; i <= daysToAdd; i++) {
        let currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        let html = `	<div class="day-block swiper-slide" data-date='${currentDate}'>
          <div class="day-month">${getMonthString(currentDate.getMonth())}</div>
          <div class="day-number">${currentDate.getDate()}</div>
          <div class="day-text">${getDateString(currentDate.getDay())}</div>
          </div>`;
        arrDates.push(html);
      }
      return arrDates;
    }
    const dateDisplay = document.getElementById('date-selected');

    const slideClickCallback = (event) => {
      let swiper = calendarSwiper;
      if (event.target !== swiper.clickedSlide)
        return false;
      let slides = swiper.slides;
      let i = 0;
      while (i < slides.length) {
        swiper.slides[i].classList.remove('selected');
        i++;
      }
      swiper.clickedSlide.classList.add('selected');

      if (window.matchMedia('(min-width: 992px)').matches) {
        swiper.slideTo((swiper.clickedIndex - 3), 500, false);
      } else if (window.matchMedia('(min-width: 600px)').matches) {
        swiper.slideTo((swiper.clickedIndex - 2), 500, false);
      } else {
        swiper.slideTo((swiper.clickedIndex - 1), 500, false);
      }
    };
    const calendarSwiper = new Swiper('.calendar__picker', {
      init: false,
      speed: 500,
      spaceBetween: 5,
      slidesPerView: 7,
      grabCursor: true,
      loop: false,
      //   centerMode:true,
      watchOverflow: true,
      // centeredSlidesBounds:true,
      // centerInsufficientSlides:true,
      navigation: {
        nextEl: '.navigation_slider .next-btn',
        prevEl: '.navigation_slider .prev-btn',
      },
      breakpoints: {
        992: {
          slidesPerView: 7,
          spaceBetween: 10,

        },
        600: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
        0: {
          slidesPerView: 3,
          spaceBetween: 5,
        }
      },
      observer: true,
      observeParents: true,
      on: {
        init: function () {
          let today = new Date();
          today.setDate(today.getDate() - 1);
          this.appendSlide(getNextNumberDay(today, 14));
        },
        click: slideClickCallback,
        reachEnd: function (event) {
          if (this.slides.length === 0 || this.slides.length > 14) return;
          let lastDate = new Date(this.slides[this.slides.length - 1].dataset.date);
          this.appendSlide(getNextNumberDay(lastDate, 7));
          this.update();
        }
      }
    });
    calendarSwiper.init();

    const todayBtn = document.getElementById('js-select-today');

    const chooseToday = (e) => {
      e && e.preventDefault();
      const slideEls = document.querySelectorAll('.calendar__picker .day-block');
      [...slideEls].map(slide => slide.classList.remove('selected'));
      slideEls[0].classList.add('selected');
      calendarSwiper.slideTo(0, 500, false);
      const date = slideEls[0].dataset.date;
      dateDisplay.value = moment(new Date(date)).format('dddd, DD/MM/YYYY');
    }
    todayBtn.addEventListener('click', chooseToday);



    function setDateDisplay() {
      const selected = this.el.querySelector('.swiper-slide.selected');
      if (selected) {
        const date = selected.dataset.date;
        dateDisplay.value = moment(new Date(date)).format('dddd, DD/MM/YYYY');
      }
    }

    calendarSwiper.on('click', setDateDisplay);
    calendarSwiper.on('slideChange', setDateDisplay);
    chooseToday();
  }

  (function init() {
    let min = Math.min(
      parseInt(state.startTime.split(":")[0]),
      parseInt(state.endTime.split(":")[0])
    )
    let max = Math.max(
      parseInt(state.startTime.split(":")[0]),
      parseInt(state.endTime.split(":")[0])
    )

    for (let i = min; i <= max; i++) {
      learnTime.push(`${i < 10 ? '0' + i : i}:00`)
      if (i !== max)
        learnTime.push(`${i < 10 ? '0' + i : i}:30`)
    }
  })();

  React.useEffect(() => {
    initCalendar();
    fetchListLevelPurpose({})

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

    $('#div-nationality input').on('change', handleChangeNation.bind(this))
    $('#div-nationality .legend-checkbox').on('click', handleChangeNation.bind(this))
    $(document).on("click", ".day-block", handleChangeDate.bind(this))
    $("#js-select-today").on("click", handleChangeDate.bind(this))
  }, []);

  return (
    <React.Fragment>
      <div className={`${loading ? '' : 'd-none'} overlay`}>
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
      <div className="d-xl-flex align-items-center justify-content-between ">
        <h4 className="mg-b-0 gradient-heading"><i className="fas fa-calendar-alt"></i> BOOKING LESSON</h4>
      </div>
      <p className="mg-b-0 mg-t-15">Select one day:</p>
      <div className="calendar__picker swiper-container">
        <div className="calendar-slider swiper-wrapper">
        </div>
        <div className="navigation_slider">
          <button type="button" className="prev-btn"><i className="fa fa-chevron-left" aria-hidden="true"></i></button>
          <button type="button" className="next-btn"><i className="fa fa-chevron-right" aria-hidden="true"></i></button>
        </div>
      </div>
      <a href="#" className="btn btn-danger" id="js-select-today"><i className="fa fa-calendar mg-r-5"></i>Select today</a>
      <div className="filter-group-wrap">
        <div className="filter-group pd-t-20">
          <div className="filter-row row">
            <div className="left col-md-2">
              <h5>CONDITIONS</h5>
            </div>
            <div className="right col-md-10">
              <div className="form-row">
                <div className="col-sm-6 col-md-3 item">
                  <a href={"#"} className="form-control nationality" name="txt-full-name" onClick={(e) => { e.preventDefault() }}>Nation</a>
                </div>
                <div className="col-sm-6 col-md-3 item">
                  <select type="text" className="form-control " name="gender" onChange={handleChange}
                    defaultValue="Gender">
                    <option value="1,2,3">Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other</option>
                  </select>
                </div>
                <div className="col-sm-12 col-md-6 item">
                  <Select
                    isMulti
                    name="selectedLevelPurpose"
                    options={renderLevelPurpose(state.levelPurpose)}
                    value={state.selectedLevelPurpose}
                    getOptionLabel={label => label}
                    getOptionValue={value => value}
                    className="basic-multi-select"
                    placeholder="Select Level Purpose"
                    classNamePrefix="select"
                    onChange={val => {
                      dispatch({
                        type: "STATE_CHANGE",
                        payload: { key: "selectedLevelPurpose", value: val }
                      })
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="filter-group pd-t-20">
          <div className="filter-row row from-to-group">
            <div className="left col-md-2">
              <h5>TIMES</h5>
            </div>
            <div className="right col-md-10">
              <div className="form-row">
                <div className="col-md-4 item">
                  <input name="date" type="text" className="form-control" placeholder="Date" disabled id="date-selected" />
                </div>
                <div className="col-sm-6 col-md-4 item">
                  <Flatpickr
                    placeholder="Start time"
                    value={state.startTime}
                    options={{
                      dateFormat: "H:i",
                      enableTime: true,
                      noCalendar: true,
                      minTime: "06:00",
                      maxTime: "23:00",
                      static: true,
                    }}
                    className="form-control"
                    onChange={(selectedDates, dateStr, instance) => {
                      dispatch({ type: "STATE_CHANGE", payload: { key: "startTime", value: dateStr } })
                    }} />
                </div>
                <div className="col-sm-6 col-md-4 item">
                  <Flatpickr
                    placeholder="End time"
                    value={state.endTime}
                    options={{
                      dateFormat: "H:i",
                      enableTime: true,
                      noCalendar: true,
                      minTime: "06:00",
                      maxTime: "23:00",
                      static: true,
                    }}
                    className="form-control"
                    onChange={(selectedDates, dateStr, instance) => {
                      dispatch({ type: "STATE_CHANGE", payload: { key: "endTime", value: dateStr } })
                    }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="filter-group pd-t-20">
          <div className="filter-row row">
            <div className="left col-md-2">
              <h5>Search</h5>
            </div>
            <div className="right col-md-10">
              <div className="form-row">
                <div className="col-sm-8 item">
                  <input className="form-control" name="searchText" type="text" placeholder="..." onChange={handleChange} />
                </div>
                <div className="col-sm-4 item search-btn-group">
                  <a href={"#"} className="submit-search btn btn-primary btn-block" onClick={onSearch}>
                    Search</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                  !!teachersList && teachersList.length > 0 && teachersList.map(item =>
                    <li className="tutor" key={item.TeacherUID}>
                      <div className="totor-detail">
                        <a href="teacherDetail.html" className="tutor-wrap">
                          <span className="tutor-avatar">
                            <img src={item.TeacherIMG ? item.TeacherIMG: "../assets/img/default_avatar.png"} alt="" />
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
                                  <span className="filled-stars" style={{ width: `${item.Rate * 20}%`, }}>
                                    <i className="star fa fa-star"></i>
                                    <i className="star fa fa-star"></i>
                                    <i className="star fa fa-star"></i>
                                    <i className="star fa fa-star"></i>
                                    <i className="star fa fa-star"></i>
                                  </span>
                                </div>
                                <div className="tutor-rate-point">{item.Rate.toFixed(1)}</div>
                              </div>
                            </div>
                            <h6 className="mg-t-5"><span className={`flag-icon flag-icon-${nationMapToFlag(item.National)} flag-icon-squared`}></span>{item.TeacherName}</h6>
                          </div>
                        </a>
                        <div className="tutor-schedule">
                          <ul className="ul-schedule">
                            <ListSchedule
                              onBookStudyTimeID={onBookState.StudyTimeID}
                              onBookTeacherUID={onBookState.TeacherUID}
                              onBookStudentName={onBookState.studentName}
                              learnTime={learnTime}
                              TeacherUID={item.TeacherUID}
                              TeacherIMG={item.TeacherIMG}
                              TeacherName={item.TeacherName}
                              Rate={item.Rate}
                              date={state.date}
                              handleBooking={onHandleBooking} />
                          </ul>
                        </div>
                      </div>
                    </li>)
                }
              </ul>
            </div>
          </div>
        </div>

        <BookingLessonModal
          style={{ color: "#000", textAlign: "left" }}
          StudyTimeID={stateBookLesson.StudyTimeID}
          LessionName={stateBookLesson.LessionName}
          TeacherUID={stateBookLesson.TeacherUID}
          TeacherIMG={stateBookLesson.TeacherIMG}
          TeacherName={stateBookLesson.TeacherName}
          Rate={stateBookLesson.Rate}
          date={stateBookLesson.date}
          start={stateBookLesson.start}
          end={stateBookLesson.end}
          onBook={onBook} />

        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

ReactDOM.render(<BookingLesson />, document.getElementById('react-booking-lesson'));