import React from 'react';
import ReactDOM from 'react-dom';
import ListTutor from './ListTutor';

const initialState = {
  nation: "",
  gender: "",
  program: ["Children","Youth","Basic","Advanced","Speaking", "Pronounce","Other"],
  selectedProgram: ["Children"],
  date: "",
  startTime: "06:00",
  endTime: "23:00",
  searchText: "",
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

  const handleSelect2 = (e) => {
    console.log("change")
    const target = e.target;
    const value = [];
    [...target.children].map(option => {
        if (option.selected) value.push(option.value);
    });
    console.log(value)
    const key = target.getAttribute("name");
    dispatch({ type: "STATE_CHANGE", payload: { key, value } })
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
    let value = [];
    $('#div-nationality .national-checkbox input').each(function () {
      if ($(this).is(':checked')) {
        value.push($(this).next().text())
      }
    })
    dispatch({ type: "STATE_CHANGE", payload: { key, value } })
  }

  const onSearch = (e) => {
    e.preventDefault();
    console.log(state)
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
        325: {
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
      e.preventDefault();
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

    $(".time-only").flatpickr({
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      minTime: "06:00",
      maxTime: "23:00",
    });
  }
  React.useEffect(() => {
    initCalendar();
    $(".js-select2").on('change', handleSelect2.bind(this));
    $('#div-nationality input').on('change', handleChangeNation.bind(this))
    $('#div-nationality .legend-checkbox').on('click', handleChangeNation.bind(this))
    $(document).on("click", ".day-block", handleChangeDate.bind(this))
    $("#js-select-today").on("click", handleChangeDate.bind(this))
    $('.from-date').on('change', handleChange.bind(this))
    $('.to-date').on('change', handleChange.bind(this))
  }, []);

  return (
    <React.Fragment>
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
                  <a href={"#"} className="form-control nationality" name="txt-full-name">Nation</a>
                </div>
                <div className="col-sm-6 col-md-3 item">
                  <select type="text" className="form-control " name="gender" onChange={handleChange}
                    defaultValue="Gender">
                    <option value="">Gender</option>
                    <option value={0}>Male</option>
                    <option value={1}>Female</option>
                  </select>
                </div>
                <div className="col-sm-12 col-md-6 item">
                  <select id="target-select"
                    className="js-select2 form-control"
                    multiple={true}
                    readOnly={true}
                    name="selectedProgram"
                    value={state.selectedProgram}
                    onClick={handleSelect2}>
                    {!!state.program && state.program.length > 0 ? (
                      state.program.map((item, index) => <option key={index} value={item}>{item}</option>)) :
                      (<option value="">Loading option... </option>)}
                  </select>
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
                  <input type="text" name="startTime" className="from-date form-control time-only"
                    placeholder="Start time" defaultValue={state.startTime} />
                </div>
                <div className="col-sm-6 col-md-4 item">
                  <input type="text" name="endTime" className="to-date form-control time-only"
                    placeholder="End time" defaultValue={state.endTime} />
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
                <div className="col-sm-4 item">
                  <a href={"#"} className="btn btn-primary btn-block"
                    onClick={onSearch}>Search</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ListTutor searchInput={state} />
    </React.Fragment>
  )
}

ReactDOM.render(<BookingLesson />, document.getElementById('react-booking-lesson'));