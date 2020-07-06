import React from 'react';
import ReactDOM from 'react-dom';
import LessonCard from '../LessonCard';
import StudentInformationModal from '../StudentInformationModal';
import NoteForStudentModal from '../NoteForStudentModal';
import { randomId } from '../../utils';
import styles from '../TeacherBooking/teacherBooking.module.scss';

let calendar;
const pad = (n) => (n >= 10 ? n : "0" + n);
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



const initEvents = [
    {
        id: randomId(),
        title: "Event Booked",
        start: new Date(moment(`${pad(d + 2)}/${m}/2020 10:30`, "DD/MM/YYYY hh:mm")),
        end: new Date(moment(`${pad(d + 2)}/${m}/2020 11:00`, "DD/MM/YYYY hh:mm")),
        eventType: 0, // 0 : Bình thường || 1 : Hot
        bookStatus: true,
        bookInfo: {
            name: "Trương Văn Lam",
        },
        available: false,
        isEmptySlot: false,
    },
    {
        id: randomId(),
        title: "Event Booked",
        start: new Date(moment(`${pad(d + 2)}/${m}/2020 15:30`, "DD/MM/YYYY hh:mm")),
        end: new Date(moment(`${pad(d + 2)}/${m}/2020 16:00`, "DD/MM/YYYY hh:mm")),
        eventType: 0, // 0 : Bình thường || 1 : Hot
        bookStatus: true,
        bookInfo: {
            name: "Hoàng Thúy Uyên",
        },
        available: false,
        isEmptySlot: false,
    },
    {
        id: randomId(),
        title: "Event Booked",
        start: new Date(moment(`${pad(d - 1)}/${m}/2020 12:30`, "DD/MM/YYYY hh:mm")),
        end: new Date(moment(`${pad(d - 1)}/${m}/2020 13:00`, "DD/MM/YYYY hh:mm")),
        eventType: 0, // 0 : Bình thường || 1 : Hot
        bookStatus: true,
        bookInfo: {
            name: "Huynh van Banh",
        },
        available: false,
        isEmptySlot: false,
    },
    {
        id: randomId(),
        title: "Event Booked",
        start: new Date(moment(`${pad(d)}/${m}/2020 08:30`, "DD/MM/YYYY hh:mm")),
        end: new Date(moment(`${pad(d)}/${m}/2020 09:00`, "DD/MM/YYYY hh:mm")),
        eventType: 0, // 0 : Bình thường || 1 : Hot
        bookStatus: true,
        bookInfo: {
            name: "Huynh van Banh",
        },
        available: false,
        isEmptySlot: false,
    },
    {
        id: randomId(),
        title: "Event Available",
        start: new Date(moment(`${pad(d - 2)}/${m}/2020 14:30`, "DD/MM/YYYY hh:mm")),
        end: new Date(moment(`${pad(d - 2)}/${m}/2020 15:00`, "DD/MM/YYYY hh:mm")),
        eventType: 0, // 0 : Bình thường || 1 : Hot
        bookStatus: false,
        bookInfo: null,
        available: true,
        isEmptySlot: false,
    },
    {
        id: randomId(),
        title: "Event Available",
        start: new Date(moment(`${pad(d)}/${m}/2020 14:30`, "DD/MM/YYYY hh:mm")),
        end: new Date(moment(`${pad(d)}/${m}/2020 15:00`, "DD/MM/YYYY hh:mm")),
        eventType: 0, // 0 : Bình thường || 1 : Hot
        bookStatus: false,
        bookInfo: null,
        available: true,
        isEmptySlot: false,
    },
    {
        id: randomId(),
        title: "Event Hot available",
        start: new Date(moment(`${pad(d + 1)}/${m}/2020 12:30`, "DD/MM/YYYY hh:mm")),
        end: new Date(moment(`${pad(d + 1)}/${m}/2020 13:00`, "DD/MM/YYYY hh:mm")),
        eventType: 1, // 0 : Bình thường || 1 : Hot
        bookStatus: false,
        bookInfo: null,
        available: true,
        isEmptySlot: false,
    },
    {
        id: randomId(),
        title: "Empty slot",
        start: new Date(moment(`${pad(d + 1)}/${m}/2020 07:30`, "DD/MM/YYYY hh:mm")),
        end: new Date(moment(`${pad(d + 1)}/${m}/2020 08:00`, "DD/MM/YYYY hh:mm")),
        eventType: 1, // 0 : Bình thường || 1 : Hot
        bookStatus: false,
        bookInfo: null,
        available: false,
        isEmptySlot: true,
    },
    {
        id: randomId(),
        title: "Empty slot",
        start: new Date(moment(`${pad(d + 1)}/${m}/2020 08:00`, "DD/MM/YYYY hh:mm")),
        end: new Date(moment(`${pad(d + 1)}/${m}/2020 08:30`, "DD/MM/YYYY hh:mm")),
        eventType: 1, // 0 : Bình thường || 1 : Hot
        bookStatus: false,
        bookInfo: null,
        available: false,
        isEmptySlot: true,
    },
    {
        id: randomId(),
        title: "Empty slot",
        start: new Date(moment(`${pad(d + 1)}/${m}/2020 09:30`, "DD/MM/YYYY hh:mm")),
        end: new Date(moment(`${pad(d + 1)}/${m}/2020 10:00`, "DD/MM/YYYY hh:mm")),
        eventType: 1, // 0 : Bình thường || 1 : Hot
        bookStatus: false,
        bookInfo: null,
        available: false,
        isEmptySlot: true,
    },
    {
        id: randomId(),
        title: "Empty slot",
        start: new Date(moment("15/06/2020 08:30", "DD/MM/YYYY hh:mm")),
        end: new Date(moment("15/06/2020 09:00", "DD/MM/YYYY hh:mm")),
        eventType: 1, // 0 : Bình thường || 1 : Hot
        bookStatus: false,
        bookInfo: null,
        available: false,
        isEmptySlot: true,
    },
]


const OperationRow = () => {
    return (
        <tr>
            <td>20/10/2020 10:30:00 AM</td>
            <td className="tx-center">Hong Loan</td>
            <td>20/10/2020 10:30:00 AM</td>
            <td>20/10/2020 10:30:00 AM</td>
            <td className="tx-center"><span className="badge badge-danger">Closed</span>
            </td>
            <td className="tx-center"><span className="badge badge-success">Open</span>
            </td>
        </tr>
    )
}

const TeacherBooking = () => {
    const [courseSelect, setCourseSelect] = React.useState('1');
    const [eventSource, setEventSource] = React.useState(initEvents);
    const _onChangeCourse = (event) => {
        setCourseSelect(event.target.value);
    }

    const _onFilterDate = (e) => {
        e.preventDefault();
        const fromDate = document.querySelector('#filter-time .from-date');
        const toDate = document.querySelector('#filter-time .to-date');
        console.log({ fromDate, toDate });
    }

    const closeEvent = (eventId) => {

    }

    const cancelEvent = (eventId) => {

    }

    const initCalendar = () => {
        //const createEventSlots

        const calendarEl = document.getElementById("js-book-calendar");

        let $toggleCheckbox;

        const eventDidMount = (args) => {
            console.log("eventDidMount", args);
            const { event } = args;
            let toggleStudent = document.getElementById('student-toggle-checkbox');
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
            const element = args.el;
            if (
                [...element.classList].includes("fc-event-past") ||
                ![...element.classList].includes("empty-slot")
            )
                return;
            const { start, end } = args.event;
            const modalConfirm = document.getElementById("md-active-slot");
            const dateEl = modalConfirm.querySelector("#js-date-time");
            const startEl = modalConfirm.querySelector("#js-start-time");
            const endEl = modalConfirm.querySelector("#js-end-time");

            dateEl.textContent = moment(start).format("DD/MM/YYYY");
            startEl.textContent = moment(start).format("HH:mm A");
            endEl.textContent = moment(end).format("HH:mm A");
            $("#md-active-slot").modal("show");
        };


        calendar = new FullCalendar.Calendar(calendarEl, {
            height: 500,
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
                const days = args.date.getDay();
                const d = args.date.getDate();
                const html = `<span class="hd-date">${d} </span><span class="hd-day">${dayNamesShort[days]}</span>`;
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
                } = event.extendedProps;
                const data = {
                    bookInfo,
                    eventType,
                    bookStatus,
                    available,
                    isEmptySlot,
                    id:event.id,
                    start:event.start,
                    end:event.end
                }
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
                          <a href="javascript:;" class="fix-btn cancel-schedule" data-schedule='${
                            JSON.stringify(data)
                            }'>Cancel</a>`
                            : ` <i class="fas fa-copyright"></i><span class="label-book">AVAILABLE</span>`
                        }
                  ${
                        available
                            ? `<a href="javascript:;" class="fix-btn close-schedule" data-schedule='${JSON.stringify(data)}'>Close</a>`
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
            eventDidMount: eventDidMount,
            nowIndicatorDidMount: function (args) {
                console.log("nowIndicatorDidMount", args);
            },
            events: eventSource
        });

        calendar.render();

        $(".fc-toolbar-chunk:first-child").append(
            `<div class="custom-control custom-checkbox" id="student-toggle">
        <input type="checkbox" class="custom-control-input" id="student-toggle-checkbox">
        <label class="custom-control-label" for="student-toggle-checkbox">Only show student booking hours</label>
    </div>`
        );

        const $closeModal = $('#md-close-slot');
        const $cancelModal = $('#md-cancel-slot');

        $('body').on('click', '.cancel-schedule', function (e) {
            e.preventDefault();
            const eventData = JSON.parse(this.getAttribute('data-schedule'));
            document.getElementById('js-cancel-name').textContent = eventData.bookInfo?.name ?? '';
            document.getElementById('js-cancel-date').textContent = moment(eventData.start).format('dddd, DD/MM/YYYY');
            document.getElementById('js-cancel-start').textContent = moment(eventData.start).format('hh:mm A');
            document.getElementById('js-cancel-end').textContent = moment(eventData.end).format('hh:mm A');
            $cancelModal.modal('show');
           // alert("Cancel schedule ID : " + eventData);
        });

      
        $('body').on('click', '.close-schedule', function (e) {
            e.preventDefault();
            const eventData = JSON.parse(this.getAttribute('data-schedule'));
            document.getElementById('js-close-date').textContent = moment(eventData.start).format('dddd, DD/MM/YYYY');
            document.getElementById('js-close-start').textContent = moment(eventData.start).format('hh:mm A');
            document.getElementById('js-close-end').textContent = moment(eventData.end).format('hh:mm A');
            $closeModal.attr('data-id-close', eventData);
            $closeModal.modal('show');
           // alert("Close slot available ID : " + eventData);
        });
        
        $toggleCheckbox = $('#student-toggle-checkbox');

        $('body').on('change', $toggleCheckbox, showStudentToggle);

        function showStudentToggle() {
            const value = $toggleCheckbox.prop('checked');
            const nonBookedEvents = $('.fc-event:not(.booked-slot)');
            value ? nonBookedEvents.hide() : nonBookedEvents.show();
        }

    }

    const initSwiper = () => {
        const teacherInfoSwiper = new Swiper('.swiper-container', {
            loop: false,
            freeModeMomentum: false,
            preventInteractionOnTransition: true,
            simulateTouch: false,
            autoHeight: true,
        })

        const listTab = document.getElementById('js-list-tab');
        const tabLinks = listTab.querySelectorAll('.tab-link');
        const swapTab = (e) => {
            e.preventDefault();
            const element = e.target;
            const indexSlide = element.dataset?.index ?? 0;
            teacherInfoSwiper.slideTo(indexSlide, 500, false);
            [...tabLinks].map(link => link === element ? link.classList.add('active') : link.classList.remove('active'));
        }
        [...tabLinks].map(link => {
            link.addEventListener('click', swapTab);
        });

    }

    React.useEffect(() => {
        initCalendar();
        initSwiper();
    }, []);

    return (
        <>
            <div className="book__container mg-t-15">
                <div className="d-xl-flex align-items-center justify-content-between mg-b-30">
                    <h4 className="mg-b-0 gradient-heading"><i className="fas fa-address-card" /> BOOKING SCHEDULE</h4>
                </div>
                <div className="tab-navigation">
                    <ul className="list-tab" id="js-list-tab">
                        <li className="tab-item">
                            <a href={`#`} className="tab-link active" data-index={0}>BOOK SCHEDULE</a>
                        </li>
                        <li className="tab-item">
                            <a href={`#`} className="tab-link " data-index={1}>SCHEDULE LOG</a>
                        </li>
                        <li className="tab-item">
                            <a href={`#`} className="tab-link " data-index={2}>BOOKING REQUEST</a>
                        </li>
                    </ul>
                </div>
                <div className="tab-navigation-content">
                    <div className="swiper-container" id="js-teacher__info">
                        <div className="teacher__info-wrap swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="slide-tab-content">
                                    <div className="book__calendar">
                                        <div id="js-book-calendar" className="fc fc-unthemed fc-ltr" />
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="slide-tab-content">
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores minima
                                    nesciunt unde exercitationem vitae quibusdam reiciendis rerum necessitatibus
                                    ipsa aliquam praesentium totam modi tempore, illum sint vero eius aperiamcumque.</p>
                                    <div className="table-responsive">
                                        <table className="table table-light">
                                            <thead>
                                                <tr>
                                                    <th>Operation time</th>
                                                    <th className="tx-center">Operator</th>
                                                    <th>Schedule time (Local)</th>
                                                    <th>Schedule time (VN)</th>
                                                    <th className="tx-center">Previous Action</th>
                                                    <th className="tx-center">Updated Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <OperationRow />
                                                <OperationRow />
                                                <OperationRow />
                                                <OperationRow />
                                                <OperationRow />
                                                <OperationRow />
                                            </tbody>
                                        </table>
                                    </div>
                                    <nav aria-label="Page navigation" className="mg-t-15">
                                        <ul className="pagination mg-b-0 justify-content-end">
                                            <li className="page-item disabled"><a className="page-link page-link-icon" href="#"><i data-feather="chevron-left" /></a></li>
                                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item"><a className="page-link page-link-icon" href="#"><i data-feather="chevron-right" /></a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="slide-tab-content">
                                    <div className="course-horizental">
                                        <div className="empty-error tx-center mg-y-30 bg-white">
                                            <img src="../assets/img/no-booking.svg" alt="image" className="wd-200 mg-b-15" />
                                            <p className=" tx-danger tx-medium">You don't have any book lesson with student</p>
                                        </div>
                                        <div className="fb-summary-container pd-x-20-f pd-b-0-f pd-t-20-f ">
                                            <form method="get" className="st-date">
                                                <div className="row from-to-group">
                                                    <div className="col-12 col-md-3 form-group">
                                                        <select value={courseSelect} className="form-control" onChange={_onChangeCourse}>
                                                            <option value="1">All course</option>
                                                            <option value="2">IELTS 8.0 Professional</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-12 col-sm-6 col-md-3 form-group">
                                                        <input type="text" name="start-day " className="form-control datetimepicker from-date" placeholder="From date" />
                                                    </div>
                                                    <div className="col-12 col-sm-6 col-md-3 form-group">
                                                        <input type="text" name="end-day" className="form-control datetimepicker to-date" placeholder="To date" />
                                                    </div>

                                                    <div className="form-group col-md-3">
                                                        <button className="btn btn-info btn-block"><i className="fa fa-search mg-r-5" /> Search</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="list-wrap ">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <LessonCard
                                                        courseName="IELST Professional 8.0"
                                                        studentName="Truong Van Lam"
                                                        lessonDate="Monday, 30/04/2020"
                                                        lessonStart="10:30AM"
                                                        lessonEnd="11:00AM"
                                                        lessonStatus="Lesson 2"
                                                        studentNote="Good job, you have excellent coding skills !!"
                                                        cancellable={false}
                                                        documents={[{
                                                            id: 1,
                                                            name: "doc 1",
                                                            extension: "docx",
                                                            link: 'http://mona.media'
                                                        },
                                                        {
                                                            id: 2,
                                                            name: "doc 2",
                                                            extension: "exce",
                                                            link: 'http://mona.media'
                                                        }]}
                                                    />
                                                </div>
                                                <div className="col-lg-6">
                                                    <LessonCard
                                                        courseName="IELST Professional 8.0"
                                                        studentName="Truong Van Lam"
                                                        lessonDate="Monday, 30/04/2020"
                                                        lessonStart="10:30AM"
                                                        lessonEnd="11:00AM"
                                                        lessonStatus="Lesson 2"
                                                        studentNote="Good job, you have excellent coding skills !!"
                                                        cancellable={false}
                                                        documents={[{
                                                            id: 1,
                                                            name: "doc 1",
                                                            extension: "docx",
                                                            link: 'http://mona.media'
                                                        },
                                                        {
                                                            id: 2,
                                                            name: "doc 2",
                                                            extension: "exce",
                                                            link: 'http://mona.media'
                                                        }]}
                                                    /> </div>
                                                <div className="col-lg-6">
                                                    <LessonCard
                                                        courseName="IELST Professional 8.0"
                                                        studentName="Truong Van Lam"
                                                        lessonDate="Monday, 30/04/2020"
                                                        lessonStart="10:30AM"
                                                        lessonEnd="11:00AM"
                                                        lessonStatus="Lesson 2"
                                                        studentNote="Good job, you have excellent coding skills !!"
                                                        cancellable={true}
                                                        documents={[{
                                                            id: 1,
                                                            name: "doc 1",
                                                            extension: "docx",
                                                            link: 'http://mona.media'
                                                        },
                                                        {
                                                            id: 2,
                                                            name: "doc 2",
                                                            extension: "exce",
                                                            link: 'http://mona.media'
                                                        }]}
                                                    /></div>
                                                <div className="col-lg-6">
                                                    <LessonCard
                                                        courseName="IELST Professional 8.0"
                                                        studentName="Truong Van Lam"
                                                        lessonDate="Monday, 30/04/2020"
                                                        lessonStart="10:30AM"
                                                        lessonEnd="11:00AM"
                                                        lessonStatus="Lesson 2"
                                                        studentNote="Good job, you have excellent coding skills !!"
                                                        cancellable={false}
                                                        documents={[{
                                                            id: 1,
                                                            name: "doc 1",
                                                            extension: "docx",
                                                            link: 'http://mona.media'
                                                        },
                                                        {
                                                            id: 2,
                                                            name: "doc 2",
                                                            extension: "exce",
                                                            link: 'http://mona.media'
                                                        }]}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <NoteForStudentModal />

        </>
    )
}

const domContainer = document.getElementById('react-teacher-booking');
ReactDOM.render(<TeacherBooking />, domContainer);