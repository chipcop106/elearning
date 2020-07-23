import React from 'react';
import ReactDOM from 'react-dom';
import { getScheduleByTeacherUID } from "~src/api/studentAPI";


let calendar;

const BookingSchedule = ({ TeacherUID, handleBookLesson, handleCancelLesson, onBookStudyTimeID, onBookTeacherUID, onBookStudentName, onCancelId }) => {

  const [schedule, setSchedule] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [dateFetch, setDate] = React.useState(new Date())

  const bookLesson = (StudyTimeID, LessionName, date, start, end) => {
    handleBookLesson(StudyTimeID, LessionName, date, start, end)
  }

  const cancelLesson = (BookingID, LessionName, date, start, end) => {
    handleCancelLesson(BookingID, LessionName, date, start, end)
  }

  const calendarInit = () => {
    const eventList = schedule.map(event=>{
      return {
        ...event,
        id: event.StudyTimeID,
        title: event.bookStatus ? "Event Booked" : "Event Hot Available",
        start: new Date(event.Start),
        end: new Date(event.End),
        eventType: event.eventType,
        bookStatus: event.bookStatus,
        bookInfo: event.bookInfo,
        available: event.available,
        isEmptySlot: event.isEmptySlot
    }
    })

    Date.prototype.addHours = function (h) {
      this.setTime(this.getTime() + h * 60 * 60 * 1000);
      return this;
    };

    const getDifferentMinBetweenTime = (startDate, endDate) => {
      const oneMinutes = 1000 * 60;
      const startTime = startDate.getTime();
      const endTime = endDate.getTime();
      const diffTime = endTime - startTime + (startDate.getTimezoneOffset() * 60 * 1000);
      return Math.round(diffTime / oneMinutes);
    };

    $(document).ready(function () {
      //Add hourse Prototype

      const dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const monthNames = [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ];
      const monthNamesShort = [
        "Thg 1",
        "Thg 2",
        "Thg 3",
        "Thg 4",
        "Thg 5",
        "Thg 6",
        "Thg 7",
        "Thg 8",
        "Thg 9",
        "Thg 10",
        "Thg 11",
        "Thg 12",
      ];

      const hotTime = [5, 6, 7, 8, 9, 13, 14, 15, 16];

      //const createEventSlots

      const calendarEl = document.getElementById("js-book-calendar");
      let $toggleCheckbox;
      /* const hotTimeSlot = [
        {
          dateIndex: 0,
          hotTime: [5, 6, 7, 8, 13, 14, 15],
        },
        {
          dateIndex: 1,
          hotTime: [5, 6, 7, 8, 13, 14, 15],
        },
        {
          dateIndex: 2,
          hotTime: [5, 6, 7, 8, 13, 14, 15],
        },
      ]; */

      const eventDidMount = (args) => {
        //console.log("eventDidMount", args);
        const { event } = args;
        let toggleStudent = document.getElementById('student-toggle-checkbox');
        //console.log(toggleStudent);
        $(args.el).tooltip({
          html: true,
          title: `<p class="mg-b-5">${moment(event.start).format("dddd, MM / YYYY")}</p>
          <p class="mg-b-5">Start: ${moment(event.start).format("hh:mm A")}</p>
          <p class="mg-b-5">End: ${moment(event.end).format("hh:mm A")}</p>`,
          animation: false,
          template: `<div class="tooltip tooltip-primary" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>`,
          trigger: "hover",
        });
        !!$toggleCheckbox && showStudentToggle();
      };

      const eventClick = (args) => {
        /*  Handle when click on cell const element = args.el;
         if ([...element.classList].includes("available-slot") &&
           !([...element.classList].includes("empty-slot") || [...element.classList].includes("fc-event-past"))
         ) {
           const { start, end } = args.event;
         }
         return; */
      };

      calendar = new FullCalendar.Calendar(calendarEl, {
        height: 600,
        expandRows: true,
        slotMinTime: "01:00",
        slotMaxTime: "23:00",
        headerToolbar: {
          start: '', // will normally be on the left. if RTL, will be on the right
          center: '',
          end: 'today,prev,title,next' // will normally be on the right. if RTL, will be on the left
        },
        titleFormat: { year: "numeric", month: "short" },
        navLinks: true, // can click day/week names to navigate views
        editable: false,
        stickyHeaderDates: true,
        selectable: true,
        nowIndicator: true,
        allDaySlot: false,
        allDayDefault: false,
        dayMaxEvents: true, // allow "more" link when too many events
        eventOverlap: false,
        initialDate: new Date(dateFetch),
        initialView: "timeGridWeek",
        firstDay: 1,
        slotDuration: "00:30",
        slotLabelInterval: "00:30",
        slotEventOverlap: false,
        customButtons: {
          prev: {
            click: function () {
              calendar.prev();
              setDate(calendar.getDate())
            }
          },
          next: {
            click: function () {
              calendar.next();
              setDate(calendar.getDate())
            }
          },
          today: {
            text: "Today",
            click: function () {
              calendar.today();
              setDate(calendar.getDate())
            }
          }
        },
        selectOverlap: function (event) {
          return event.rendering === "background";
        },
        slotLabelContent: function (arg) {
          //  console.log('slotLabelContent', arg);
          const hour = arg.date.getHours();

          let templateEl = document.createElement("div");
          templateEl.setAttribute("class", "slot-label");
          const html = `${hotTime.includes(hour) ? `<i class="fa fa-fire tx-danger hot-icon"></i>` : ""}
          ${arg.text.toUpperCase()}`;
          templateEl.innerHTML = html;
          return { html };
        },

        dayHeaderContent: function (args) {
          let count = 0;
          let slot = 0;
          schedule.map(item => {
            if (
              (new Date(item.Start).getDate() === args.date.getDate()) &&
              (new Date(item.Start).getMonth() === args.date.getMonth()) &&
              (new Date(item.Start).getFullYear() === args.date.getFullYear()) &&
              item.available
            ) {
              count++;
              if (item.bookStatus) slot++
            }
          })
          const days = args.date.getDay();
          const d = args.date.getDate();
          const html = `<span class="hd-date">${d} </span><span class="hd-day">${dayNamesShort[days]}
          </span><div class="slot"> <span class="hl">${slot}</span> / <span class="hl">${count}</span>
          </div>`;
          return { html };
        },

        eventClassNames: function (args) {
          const { event } = args;
          const {
            eventType,
            bookStatus,
            isEmptySlot,
          } = event.extendedProps;
          let classLists = bookStatus ? "booked-slot" : "available-slot";
          classLists += eventType === 1 ? " hot-slot " : "";
          classLists += isEmptySlot ? " empty-slot" : "";
          return classLists;
        },
        eventContent: function (args) {
          let templateEl = document.createElement("div");
          const { event, isPast, isStart } = args;
          const {
            bookInfo,
            bookStatus,
            isEmptySlot,
            title,
            BookingID,
          } = event.extendedProps;
          let minutesTilStart = getDifferentMinBetweenTime(new Date(), args.event._instance.range.start)
          const html = `${!isEmptySlot? `
    <div class="inner-book-wrap ">
    <div class="inner-content"> ${bookStatus ? `
      <span class="label-book booked"><i class="fas ${isPast ? "fa-check" : "fa-user-graduate"
    }"></i> ${isPast ? "FINISHED" : "BOOKED"}</span> 
      <p class="booking-name">${bookInfo.name}</p>
      ${ minutesTilStart > 30 ? `
        <a href="javascript:;" class="fix-btn cancel-schedule"
        data-toggle="modal"
        data-target="#md-cancel-schedule"
        data-bookingID="${BookingID}"
        data-id="${event.id}"
        data-title="${title}"
        data-start="${event.start}"
        data-end="${event.end}">Cancel</a>
        `: ""}`
        : ` <i class="fas fa-copyright"></i><span class="label-book">AVAILABLE</span>`
      }
      ${!bookStatus && (minutesTilStart > 30) ?
        `<a href="javascript:;" class="fix-btn book-schedule"
          data-toggle="modal"
          data-target="#md-book-schedule"
          data-id="${event.id}"
          data-title="${event._def.extendedProps.courseName}"
          data-start="${event.start}"
          data-end="${event.end}"}>Book</a>`
        : "" }
        </div>
        </div>` : ""
      }`;
          templateEl.innerHTML = html;
          return { domNodes: [templateEl] };
        },

        eventClick: eventClick,
        //  select: function (info) {

        //  },
        eventDidMount: eventDidMount,

        // eventDidMount: function(arg) { console.log('eventDidMount', arg) },
        // nowIndicatorDidMount: function(arg) { console.log('nowIndicatorDidMount', arg) },
        // nowIndicatorContent: function(arg) { console.log('nowIndicatorContent', arg); return 'hi' },
        // viewClassNames: 'sup',
        // dayCellClassNames: function(arg) { console.log('dayCellClassNames', arg) },

        // datesDidUpdate: function() { console.log('datesDidUpdate') },
        // viewDidMount: function (args){

        //   console.log('viewdidmount', args);
        // },

        nowIndicatorDidMount: function (args) {
          //console.log("nowIndicatorDidMount", args);
        },
        events: eventList,
      });

      calendar.render();
      if ($(".fc-toolbar-chunk:first-child").html() == "") {
        $(".fc-toolbar-chunk:first-child").append(
          `<div class="custom-control custom-checkbox" id="student-toggle">
    <input type="checkbox" class="custom-control-input" id="student-toggle-checkbox">
    <label class="custom-control-label" for="student-toggle-checkbox">Only show student booking hours</label>
    </div>`);
      }

      $('body').on('click', '.book-schedule', function (e) {
        e.preventDefault();
        const StudyTimeID = this.getAttribute('data-id');
        const LessionName = this.getAttribute('data-title')
        const date = moment(this.getAttribute('data-start')).format("DD/MM/YYYY");
        const start = moment(this.getAttribute('data-start')).format("HH:mm A");
        const end = moment(this.getAttribute('data-end')).format("HH:mm A");
        bookLesson(StudyTimeID, LessionName, date, start, end);
      });

      $('body').on('click', '.cancel-schedule', function (e) {
        e.preventDefault();
        const BookingID = this.getAttribute('data-bookingID');
        const LessionName = this.getAttribute('data-title')
        const date = moment(this.getAttribute('data-start')).format("DD/MM/YYYY");
        const start = moment(this.getAttribute('data-start')).format("HH:mm A");
        const end = moment(this.getAttribute('data-end')).format("HH:mm A");
        cancelLesson(BookingID, LessionName, date, start, end);
      });

      $toggleCheckbox = $('#student-toggle-checkbox');

      $('body').on('change', $toggleCheckbox, showStudentToggle);

      function showStudentToggle() {
        const value = $toggleCheckbox.prop('checked');
        const nonBookedEvents = $('.fc-event:not(.booked-slot)');
        value ? nonBookedEvents.hide() : nonBookedEvents.show();
      }
    });
  }

  const getAPI = async (params) => {
    setLoading(true);
    const res = await getScheduleByTeacherUID(params);
    if(res.Code === 1)
    {
      setSchedule(res.Data)
    }
    setLoading(false);
  }

  React.useEffect(() => {
    getAPI({
      TeacherUID,
      Date: moment(dateFetch).format("DD/MM/YYYY"),
    });
  }, [dateFetch])

  React.useEffect(() => {
    calendarInit()
  }, [schedule])

  React.useEffect(() => {
    let newSchedule = [...schedule]
    let index = newSchedule.findIndex(i => 
    i.StudyTimeID == onBookStudyTimeID && i.TeacherUID == onBookTeacherUID);
    if (index !== -1) {
      newSchedule[index].bookStatus = true;
      newSchedule[index].bookInfo.name = onBookStudentName;
      setSchedule(newSchedule);
    }
  }, [onBookStudyTimeID, onBookTeacherUID, onBookStudentName])


  React.useEffect(() => {
    let newSchedule = [...schedule]
    let index = newSchedule.findIndex(i => i.StudyTimeID == onCancelId);
    if (index !== -1) {
      newSchedule[index].bookStatus = false;
      setSchedule(newSchedule);
    }
  }, [onCancelId])


  return (
    <React.Fragment>
      <div className="book__calendar">
        <div className={`${loading ? '' : 'd-none'} overlay`}>
          <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
        <div id="js-book-calendar" className="fc fc-unthemed fc-ltr"
          height="500"></div>
      </div>
      <div className="note mg-t-30">
        <h5 className="sub-title"> <i className="fas fa-sticky-note"></i>Notes:</h5>
        <div className="introduce-content">
          <ul className="note-list">
            <li>Each session is 50 minutes</li>
            <li>To book a lesson, simply select the time frame and click the "Book" button</li>
            <li>You can only BOOK a lesson 30 minutes before the lesson starts.</li>
            <li>You can only CANCEL the lesson 30 minutes before the className starts.</li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  )
}
export default BookingSchedule;