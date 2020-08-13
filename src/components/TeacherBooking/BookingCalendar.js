import React, { useState, useEffect } from 'react'
import { getListEventsOfWeek, setEventAvailable, setEventClose } from '~src/api/teacherAPI';
import { cancelLesson } from '~src/api/optionAPI';
import ActiveSlotModal from './ActiveSlotModal';
import CloseSlotModal from './CloseSlotModal';
import CancelSlotModal from './CancelSlotModal';
import { toast } from 'react-toastify';
let calendar;
const pad = (n) => (n >= 10 ? n : "0" + n);
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
};

Date.prototype.addDays = function (days) { return new Date(this.getTime() + (864e5 * days)); };

const getDifferentMinBetweenTime = (startDate, endDate) => {
    const oneMinutes = 1000 * 60 * 60;
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();
    const diffTime = endTime - startTime;
    return Math.round(diffTime / oneMinutes);
};


//Add hourse Prototype
const dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const hotTime = [5, 6, 7, 8, 9, 13, 14, 15, 16];

const date = new Date();
const d = date.getDate();
const m = date.getMonth() + 1;
const y = date.getFullYear();

const formatDateString = (dateStr) => {
    //Date object, 
    return moment(new Date(dateStr)).format('DD/MM/YYYY');
}



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


const bookingCalendar = () => {
    const [eventSource, setEventSource] = useState(initEvents);
    const [activeDate, setActiveDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const [activeModal, setActiveModal] = useState({
        id: '',
        studentName: '',
        start: '',
        end: '',
        date: '',
    });
    // console.log(new Date().toLocateString());


    const getEventByWeek = async (date = formatDateString(activeDate)) => {
        setIsLoading(true);
        try {
            const res = await getListEventsOfWeek({ Date: date }); // @string date dd/mm/yyyy
            if (res.Code === 1 && res.Data.length > 0) {
                const newEvents = res.Data.map((event) => {
                    return {
                        ...event,
                        id: event.BookingID,
                        title: event.title || '',
                        start: moment(event.Start, 'YYYY-MM-DDTHH:mm').toDate(),
                        end: moment(event.End, 'YYYY-MM-DDTHH:mm').toDate(),
                        eventType: event.eventType,
                        bookStatus: event.bookStatus,
                        bookInfo: event.bookInfo,
                        available: event.available,
                        isEmptySlot: event.isEmptySlot
                    }
                });
                setEventSource(newEvents);
            }
            setIsLoading(false);
        } catch (error) {
            console.log('Goi API khong thanh cong');
        }

        // console.log(calendar.getEventSources());
    }

    const triggerNextCalendar = () => {
        const nextWeek = activeDate.setDate(activeDate.getDate() + 7);
        setActiveDate(nextWeek);
    }

    const triggerPrevCalendar = () => {
        const prevWeek = activeDate.setDate(activeDate.getDate() - 7);
        setActiveDate(prevWeek);
    }

    const triggerTodayCalendar = () => {
        setActiveDate(new Date());
    }
    const allEventDidMount = (event, relatedEvents, revert) => {
        console.log(event);
    }
    let $toggleCheckbox;
    const initCalendar = () => {
        //const createEventSlots

        const calendarEl = document.getElementById("js-book-calendar");

       
        const $closeModal = $('#md-close-slot');
        const $cancelModal = $('#md-cancel-slot');

        const eventDidMount = (args) => {
        //    console.log("eventDidMount", args);
            const { event, el } = args;
            el.setAttribute("tab-index", 0);
            if (!args.isPast && ![...el.classList].includes('booked-slot')) {
                $(el).tooltip({
                    html: true,
                    title: `
                      <p class="mg-b-5">${moment(event.start).format(
                        "dddd, DD/MM/YYYY"
                    )}</p>
                <p class="mg-b-5">Start: ${moment(event.start).format(
                        "hh:mm A"
                    )}</p>
                <p class="mg-b-5">End: ${moment(event.end).format("hh:mm A")}</p>
                `,
                    animation: false,
                    template: `<div class="tooltip" role="tooltip">
                    <div class="tooltip-arrow">
                    </div>
                    <div class="tooltip-inner">
                    
                    </div>
                  </div>`,
                    trigger: "hover",
                });
            }
            
            !!el && [...el.classList].includes('booked-slot') && $(el).popover({
                html:true,
                container: 'body',
                trigger: 'hover',
                title:'Booked information',
                content: `  
                <p class="mg-b-5"><span class="tx-medium mg-r-5">Course:</span>${event.extendedProps.bookInfo?.DocumentName ?? ''}</p>
                <p class="mg-b-5"><span class="tx-medium mg-r-5">Lesson:</span>${event.extendedProps.bookInfo?.LessonName ?? ''}</p>
                <p class="mg-b-5"><span class="tx-medium mg-r-5">Student:</span>${event.extendedProps.bookInfo?.name ?? ''}</p>
                <p class="mg-b-5"><span class="tx-medium mg-r-5">Date:</span>${moment(event.start).format(
                    'dddd, DD/MM/YYYY'
                )}</p>
            <p class="mg-b-5"><span class="tx-medium mg-r-5">Start:</span>${moment(event.start).format(
                    'hh:mm A'
                )}</p>
            <p class="mg-b-0"><span class="tx-medium mg-r-5">End:</span>${moment(event.end).format('hh:mm A')}</p>
           `
            });

            !!$toggleCheckbox && showStudentToggle();
            const events = calendar.getEvents();
            const dayHeaders = document.querySelectorAll('.fc-col-header-cell');
           // console.log({dayHeaders});
            if(dayHeaders.length > 0)
            for(let i = 0; i < dayHeaders.length; i++){
              //  console.log(dayHeaders[i]);
                if("data-date" in dayHeaders[i].dataset) continue;
                const date = dayHeaders[i].getAttribute('data-date');
                const dateHD = new Date(date);
                let bookedSlot = 0;
                let totalSlot = 0;
                events.map(event => {
                    const eventDate = new Date(event.extendedProps.Start.split('T')[0]);
                    if(eventDate.getTime() === dateHD.getTime()){
                        (event.extendedProps.available === true || event.extendedProps.bookStatus === true) && totalSlot++;
                        event.extendedProps.bookStatus === true && bookedSlot++;
                    }
                });
                // console.log(dayHeaders[i]);
                // console.log({bookedSlot, totalSlot});
                dayHeaders[i].querySelector('.booked').textContent = bookedSlot;
                dayHeaders[i].querySelector('.total').textContent = totalSlot;
            }
        };

        const eventClick = (args) => {
            const element = args.el;
            if(!!$toggleCheckbox && $toggleCheckbox.prop('checked') === true && ![...element.classList].includes("booked-slot") ){
                toast.warning('Please uncheck "Only show student booking hours" before open or booking slot !!',{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000
                });
                return;
            }
            if (
                [...element.classList].includes("fc-event-past") ||
                ![...element.classList].includes("empty-slot")
            )
                return;
            const { start, end, id } = args.event;
            // const modalConfirm = document.getElementById("md-active-slot");
            // const dateEl = modalConfirm.querySelector("#js-date-time");
            // const startEl = modalConfirm.querySelector("#js-start-time");
            // const endEl = modalConfirm.querySelector("#js-end-time");
            setActiveModal({
                ...activeModal,
                ...args.event.extendedProps,
                date: moment(start).format("DD/MM/YYYY"),
                start: moment(start).format("HH:mm A"),
                end: moment(end).format("HH:mm A")
            });
            // dateEl.textContent = moment(start).format("DD/MM/YYYY");
            // startEl.textContent = moment(start).format("HH:mm A");
            // endEl.textContent = moment(end).format("HH:mm A");
            $("#md-active-slot").appendTo('body').modal("show");
        };


        calendar = new FullCalendar.Calendar(calendarEl, {
            height: 550,
            expandRows: true,
            slotMinTime: "06:00",
            slotMaxTime: "23:00",
            eventSources: eventSource,
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
             
                const html = `
                    <div class="header-container">
                        <div class="date-wrap">
                            <span class="hd-date">${d} </span><span class="hd-day">${dayNamesShort[days]}</span>
                        </div>
                       <div class="box-slot">
                            <span class="booked"></span> <span class="mg-x-2">/</span> <span class="total"></span>
                       </div>
                    </div>
                `;
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
                    ...event.extendedProps,
                    id: event.id,
                    start: event.start,
                    end: event.end
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
                            : `<span class="label-book"><i class="fas fa-copyright"></i>AVAILABLE</span>`
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
                //   console.log("nowIndicatorDidMount", args);
            },
            //events: eventSource
        });

        calendar.render();

        $(".fc-toolbar-chunk:first-child").append(
            `<div class="custom-control custom-checkbox" id="student-toggle">
                <input type="checkbox" class="custom-control-input" id="student-toggle-checkbox">
                <label class="custom-control-label" for="student-toggle-checkbox">Only show student booking hours</label>
            </div>`
        );



        $('body').on('click', '.cancel-schedule', function (e) {
            e.preventDefault();
            const eventData = JSON.parse(this.getAttribute('data-schedule'));
            setActiveModal({
                ...activeModal,
                ...eventData,
                studentName: eventData.bookInfo?.name ?? '',
                date: moment(eventData.start).format('dddd, DD/MM/YYYY'),
                start: moment(eventData.start).format('hh:mm A'),
                end: moment(eventData.end).format('hh:mm A')
            });

            $cancelModal.appendTo('body').modal('show');
            // alert("Cancel schedule ID : " + eventData);
        });

        $('body').on('click', '.close-schedule', function (e) {
            e.preventDefault();
            const eventData = JSON.parse(this.getAttribute('data-schedule'));
            setActiveModal({
                ...activeModal,
                ...eventData,
                date: moment(eventData.start).format('dddd, DD/MM/YYYY'),
                start: moment(eventData.start).format('hh:mm A'),
                end: moment(eventData.end).format('hh:mm A')
            });
            $closeModal.appendTo('body').modal('show');
            // alert("Close slot available ID : " + eventData);
        });

        $('body').on('click', '#js-book-calendar .fc-next-button', triggerNextCalendar);
        $('body').on('click', '#js-book-calendar .fc-prev-button', triggerPrevCalendar);
        $('body').on('click', '#js-book-calendar .fc-today-button', triggerTodayCalendar);
        $toggleCheckbox = $('#student-toggle-checkbox');

        $('body').on('change', $toggleCheckbox, showStudentToggle);

        function showStudentToggle() {
            const value = $toggleCheckbox.prop('checked');
            const nonBookedEvents = $('.fc-event:not(.booked-slot)');
            value ? nonBookedEvents.addClass('hide-event') : nonBookedEvents.removeClass('hide-event');
        }

    }

    const setAvailableEvent = (newProps) => {
        const newSources = [...eventSource].map(event => (event.StudyTimeID === newProps.StudyTimeID) && (event.Start === newProps.Start) ? {
            ...event,
            available: true,
            bookStatus: false,
            isEmptySlot: false,
            OpenDayID:newProps.OpenDayID
        } : event)
        setEventSource(newSources);
    }

    const closeAvailableEvent = (newProps) => {
        const newSources = [...eventSource].map(event => (event.StudyTimeID === newProps.StudyTimeID) && (event.Start === newProps.Start) ? {
            ...event,
            available: false,
            bookStatus: false,
            isEmptySlot: true
        } : event)
        setEventSource(newSources);
    }

    const cancelBookedEvent = (newProps) => {
        const { StudyTimeID, Start } = newProps;
        const newSources = [...eventSource].map(event => (event.StudyTimeID === StudyTimeID) && (event.Start === Start) ? {
            ...event,
            available: false,
            bookStatus: false,
            isEmptySlot: true,
            bookInfo: null,
        } : event);
        setEventSource(newSources);
    }

    const _openSlot = async (data) => {
        setIsLoading(true);
        $('#md-active-slot').modal('hide');
        try {
            const res = await setEventAvailable({
                Date: formatDateString(new Date(data.Start)),
                StudyTimeID: data.StudyTimeID,
            });
            if (res.Code === 1) {
                setAvailableEvent({
                    ...data,
                    OpenDayID:res?.Data?.OpenDayID ?? 0
                });
                toast.success('Open slot success', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                });
            } else {
                toast.error('Open slot failed', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                });
                console.log('Loi  khi goi api');
            }
        } catch (error) {
            console.log('Error openSlot !', error);
            alert('Open slot failed !!');
        }
        setIsLoading(false);
    }

    const _closeSlot = async (data) => {
        setIsLoading(true);
        console.log(data);
        $('#md-close-slot').modal('hide');
        try {
            const res = await setEventClose({
                OpenDayID: data.OpenDayID
            });
            if (res.Code === 1) {
                closeAvailableEvent(data);
                toast.success('Close slot success', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                });
            } else {
                toast.error('Close slot failed', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                });
                console.log('Call api không thành công, xem lại tham số !');
            }
            
        } catch (error) {
            console.log('Error openSlot !', error);
        }
        setIsLoading(false);
    }

    const _cancelSlot = async (data) => {
        setIsLoading(true);
        $('#md-cancel-slot').modal('hide');
        try {
            const res = await cancelLesson({
                BookingID: data.BookingID,
                ReasonCancleOfTeacher:data.reason
            });
            if (res.Code === 1) {
                cancelBookedEvent(data);
                toast.success('Cancel booking success', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                });
            } else {
                toast.error(res?.Message ?? 'Cancel slot failed', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                });
            }
            
        } catch (error) {
            console.log('Error openSlot !', error);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        // console.log(calendar);
        if (!!calendar) {
            console.log('Event source updated', eventSource);
            // calendar.addEventSource(eventSource);
            let eventsInstance = calendar.getEventSources();
            eventsInstance[0] && eventsInstance[0].remove();
            calendar.addEventSource(eventSource);
        }
    }, [eventSource]);

    useEffect(() => {
        getEventByWeek();
       // console.log(activeDate);
    }, [activeDate]);

    useEffect(() => {
        initCalendar();
    }, []);

    return (
        <>
            <div className="book__calendar">
                {isLoading && <div className="loading-style">
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
                }
                <div className="time-zone"></div>
                <div id="js-book-calendar" className="fc fc-unthemed fc-ltr" />
            </div>
            <div className="notice pd-20 bg-primary-light rounded-5 mg-t-30">
                <h5 className="mg-b-15 tx-primary"><i className="fas fa-file"></i> Notes:</h5>
                <ul className="mg-b-0">
                    <li>Each session is 25 minutes</li>
                    <li>To open a slot, simply select the time frame in calendar</li>
                    <li>To close a slot, select the time available in calendar and click "Close"</li>
                    <li>To cancel a booked lesson, select the booked frame in calendar and click "Cancel"</li>
                    <li>You can only CANCEL the lesson 30 minutes before the lesson starts.</li>
                </ul>
            </div>
            <ActiveSlotModal
                data={activeModal}
                handleOpenSlot={_openSlot}
            />

            <CloseSlotModal
                data={activeModal}
                handleCloseSlot={_closeSlot}
            />

            <CancelSlotModal
                data={activeModal}
                handleCancelSlot={_cancelSlot}
            />
        </>
    )
}

export default bookingCalendar;
