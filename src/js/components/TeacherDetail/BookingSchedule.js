import styles from '~components/TeacherDetail/BookingSchedule.module.scss';

let calendar;

const BookingSchedule = ({ schedule, handleBookSchedule, handleCancelSchedule }) => {

  const bookSchedule = (id, student) => {
    handleBookSchedule(id, student)
  }

  const cancelSchedule = (id) => {
    handleCancelSchedule(id)
  }

  const calendarInit = () => {

    let eventList = [];
    for (let i = 0; i < schedule.length; i++) {
      eventList.push({
        id: schedule[i].id,
        title: schedule[i].status === "booked" ? "Event Booked" : "Event Hot Available",
        courseName: schedule[i].courseName,
        day: schedule[i].day,
        timeStart: schedule[i].timeStart,
        timeEnd: schedule[i].timeEnd,
        start: new Date(moment(schedule[i].day + ' ' + schedule[i].timeStart, "DD/MM/YYYY hh:mm")),
        end: new Date(moment(schedule[i].day + ' ' + schedule[i].timeEnd, "DD/MM/YYYY hh:mm")),
        eventType: 0, // 0 : Bình thường || 1 : Hot
        bookStatus: schedule[i].status === "booked" ? true : false,
        bookInfo: schedule[i].student ? {
          name: schedule[i].student
        } : null,
        available: schedule[i].status === "booked" ? false : true,
        isEmptySlot: false,
      })
    }

    eventList.push({
      id: randomId(),
      title: "Empty slot",
      courseName: "Course Name",
      start: new Date(moment(`04/7/2020 09:30`, "DD/MM/YYYY hh:mm")),
      end: new Date(moment(`04/7/2020 10:00`, "DD/MM/YYYY hh:mm")),
      eventType: 1, // 0 : Bình thường || 1 : Hot
      bookStatus: false,
      bookInfo: null,
      available: false,
      isEmptySlot: true,
    })

    Date.prototype.addHours = function (h) {
      this.setTime(this.getTime() + h * 60 * 60 * 1000);
      return this;
    };

    const getDifferentMinBetweenTime = (startDate, endDate) => {
      const oneMinutes = 1000 * 60 * 60;
      const startTime = startDate.getTime();
      const endTime = endDate.getTime();
      const diffTime = endTime - startTime;
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

      const date = new Date();
      const d = date.getDate();
      const m = date.getMonth() + 1;
      const y = date.getFullYear();

      const randomId = () => {
        let dt = new Date().getTime();
        const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          (c) => {
            const r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
          }
        );
        return uuid;
      };

      const pad = (n) => (n >= 10 ? n : "0" + n);
      //const createEventSlots

      const calendarEl = document.getElementById("js-book-calendar");
      let $toggleCheckbox;
      const hotTimeSlot = [
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
      ];

      const eventDidMount = (args) => {
        console.log("eventDidMount", args);
        const { event } = args;
        let toggleStudent = document.getElementById('student-toggle-checkbox');
        console.log(toggleStudent);
        $(args.el).tooltip({
          html: true,
          title: `
<p class="mg-b-5">${moment(event.start).format(
            "dddd, MM / YYYY"
          )}</p>
<p class="mg-b-5">Start: ${moment(event.start).format(
            "hh:mm A"
          )}</p>
<p class="mg-b-5">End: ${moment(event.end).format("hh:mm A")}</p>
`,
          animation: false,
          template: `<div class="tooltip tooltip-primary" role="tooltip">
<div class="tooltip-arrow">
</div>
<div class="tooltip-inner">

</div>
</div>`,
          trigger: "hover",
        });
        !!$toggleCheckbox && showStudentToggle();
      };

      const toggleStudentView = () => {

      }

      const eventClick = (args) => {
       /*  const element = args.el;
        if ([...element.classList].includes("available-slot") &&
          !([...element.classList].includes("empty-slot") || [...element.classList].includes("fc-event-past"))
        ) {
          const { start, end } = args.event;

          const modalConfirm = document.getElementById("md-book-schedule");
          const nameEl = modalConfirm.querySelector("#newCampaignTitle");
          const dateEl = modalConfirm.querySelector("#js-date-time");
          const startEl = modalConfirm.querySelector("#js-start-time");
          const endEl = modalConfirm.querySelector("#js-end-time");

          nameEl.textContent = args.event._def.extendedProps.courseName
          dateEl.textContent = moment(start).format("DD/MM/YYYY");
          startEl.textContent = moment(start).format("HH:mm A");
          endEl.textContent = moment(end).format("HH:mm A");
          $("#md-book-schedule").modal("show");
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
        initialDate: new Date(),
        initialView: "timeGridWeek",
        firstDay: 1,
        slotDuration: "00:30",
        slotLabelInterval: "00:30",
        slotEventOverlap: false,
        selectOverlap: function (event) {
          return event.rendering === "background";
        },
        slotLabelContent: function (arg) {
          //  console.log('slotLabelContent', arg);
          const hour = arg.date.getHours();

          let templateEl = document.createElement("div");
          templateEl.setAttribute("class", "slot-label");
          const html = `
  ${
            hotTime.includes(hour)
              ? `<i class="fa fa-fire tx-danger hot-icon"></i>`
              : ""
            }
  ${arg.text.toUpperCase()}
  `;
          templateEl.innerHTML = html;
          return { html };
        },

        dayHeaderContent: function (args) {
          let count = 0;
          let slot = 0;
          schedule.map(item => {
            if (
              (parseInt(item.day.split('/')[0]) === args.date.getDate()) &&
              (parseInt(item.day.split('/')[1]) === args.date.getMonth() + 1) &&
              (parseInt(item.day.split('/')[2]) === args.date.getFullYear())
            ) {
              count++;
              if (item.status === "booked") slot++
            }
          })
          const days = args.date.getDay();
          const d = args.date.getDate();
          const html = `<span class="hd-date">${d} </span><span class="hd-day">${dayNamesShort[days]}</span>
  <div class="slot">${slot}/${count}</div>`;
          return { html };
        },

        eventClassNames: function (args) {
          const { event, isPast, isStart } = args;
          const {
            bookInfo,
            eventType,
            bookStatus,
            available,
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
            eventType,
            bookStatus,
            available,
            isEmptySlot,
            courseName,
            day,
            timeStart,
            timeEnd
          } = event.extendedProps;
          let milisecondsTilStart = Date.parse(args.event._instance.range.start) - Date.parse(new Date())
          milisecondsTilStart -= 7 * 60 * 60 * 1000 /* Convert to indochina time */
          let minutesTilStart = milisecondsTilStart / 60000
          console.log("còn lại phút", minutesTilStart)
          const html = `
  ${
            !isEmptySlot
              ? `
    <div class="inner-book-wrap ">
    <div class="inner-content">
    ${
              bookStatus
                ? `
      <span class="label-book booked"><i class="fas ${
                isPast ? "fa-check" : "fa-user-graduate"
                }"></i> ${isPast ? "FINISHED" : "BOOKED"}</span> 
      <p class="booking-name">${bookInfo.name}</p>
      ${minutesTilStart < 30 && minutesTilStart > 0
                  ? `
        <a href="javascript:;" class="fix-btn cancel-schedule"
        data-id="${event.id}"
        data-start="${event.start}"
        data-end="${event.end}">Cancel</a>
        `: ""}`
                : ` <i class="fas fa-copyright"></i><span class="label-book">AVAILABLE</span>`
              }
    ${
              available && (minutesTilStart > 30 || minutesTilStart < 0)
                ? `<a href="javascript:;" class="fix-btn book-schedule"
        data-id="${event.id}"
        data-start="${event.start}"
        data-end="${event.start}"}>Book</a>`
                : ""
              }
    </div>
    </div>`
              : ""
            }
  `;
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
          console.log("nowIndicatorDidMount", args);
        },
        events: eventList,
      });

      calendar.render();
      if ($(".fc-toolbar-chunk:first-child").html() == "") {
        $(".fc-toolbar-chunk:first-child").append(
          `<div class="custom-control custom-checkbox" id="student-toggle">
    <input type="checkbox" class="custom-control-input" id="student-toggle-checkbox">
    <label class="custom-control-label" for="student-toggle-checkbox">Only show student booking hours</label>
    </div>`
        );
      }

      $('body').on('click', '.book-schedule', function (e) {
        e.preventDefault();
        const id = this.getAttribute('data-id');
        $("#md-book-schedule").attr("data-id", id);
        const start = this.getAttribute('data-start');
        const end = this.getAttribute('data-end');
        let index = schedule.findIndex(x => x.id === id)
        const modalConfirm = document.getElementById("md-book-schedule");
        const nameEl = modalConfirm.querySelector("#newCampaignTitle");
        const dateEl = modalConfirm.querySelector("#js-date-time");
        const startEl = modalConfirm.querySelector("#js-start-time");
        const endEl = modalConfirm.querySelector("#js-end-time");
        nameEl.textContent = schedule[index].courseName;
        dateEl.textContent = moment(start).format("DD/MM/YYYY");
        startEl.textContent = moment(start).format("HH:mm A");
        endEl.textContent = moment(end).format("HH:mm A");
        $("#md-book-schedule").modal("show");
      });

      $('body').on('click', '#book-schedule-confirm', function (e) {
        e.preventDefault();
        const id = $("#md-book-schedule").attr('data-id');
        bookSchedule(id, "Nguyễn Văn Thái");
      });

      $('body').on('click', '.cancel-schedule', function (e) {
        e.preventDefault();
        const id = this.getAttribute('data-id');
        $("#md-cancel-schedule").attr("data-id", id);
        const start = this.getAttribute('data-start');
        const end = this.getAttribute('data-end');
        let index = schedule.findIndex(x => x.id === id)
        const modalConfirm = document.getElementById("md-cancel-schedule");
        const nameEl = modalConfirm.querySelector("#newCampaignTitle");
        const dateEl = modalConfirm.querySelector("#js-date-time");
        const startEl = modalConfirm.querySelector("#js-start-time");
        const endEl = modalConfirm.querySelector("#js-end-time");
        nameEl.textContent = schedule[index].courseName;
        dateEl.textContent = moment(start).format("DD/MM/YYYY");
          startEl.textContent = moment(start).format("HH:mm A");
          endEl.textContent = moment(end).format("HH:mm A");
        $("#md-cancel-schedule").modal("show");
      });
      
      $('body').on('click', '#cancel-schedule-confirm', function (e) {
        e.preventDefault();
        const id = $("#md-cancel-schedule").attr('data-id');
        cancelSchedule(id, "Nguyễn Văn Thái");
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

  React.useEffect(() => {
    calendarInit();
  }, [schedule])

  return (
    <React.Fragment>
      <div className="book__calendar">
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