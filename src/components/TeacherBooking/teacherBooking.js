import React from 'react';
import ReactDOM from 'react-dom';
import NoteForStudentModal from '../NoteForStudentModal';
import ScheduleLogTable from '~components/table/ScheduleLogTable'
import BookingRequest from './BookingRequest';
import BookingCalendar from './BookingCalendar';
import { ToastContainer } from 'react-toastify';
import {getTeacherInfo} from '~src/api/teacherAPI';
import styles from '../TeacherBooking/teacherBooking.module.scss';
let teacherInfoSwiper;
const TeacherBooking = () => {
    const [timeZone, setTimeZone] = React.useState('');
    const initSwiper = () => {
        teacherInfoSwiper = new Swiper('.swiper-container', {
            loop: false,
            freeModeMomentum: false,
            preventInteractionOnTransition: true,
            simulateTouch: false,
            autoHeight: true,
            shortSwipes:false,
            longSwipes:false,
            allowTouchMove:false,
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

    const getProfile = async () =>{
        const res = await getTeacherInfo();
        res.Code === 1 && setTimeZone(res?.Data.TimeZoneString ?? '')
    }

    const updateHeight = () => {
        teacherInfoSwiper.update();
    }

    React.useEffect(() => {
        initSwiper();
        getProfile();
    }, []);
    

    return (
        <>
            <div className="book__container mg-t-15">
                <div className="d-xl-flex align-items-center justify-content-between mg-b-30">
                    <h3 className="text-dark font-weight-bold">Booking Schedule</h3>
                    <span className="bg-white pd-y-10 pd-x-15 rounded d-inline-block  tx-dark"><i className="fas fa-globe-europe mg-r-5"></i>Timezone: <span className="tx-medium tx-primary">{timeZone}</span></span>
                </div>
                <div className="card card-custom">
                    <div className="card-body">
                        <div className="tab-navigation teacher-custom">
                            <ul className="list-tab" id="js-list-tab">
                                <li className="tab-item">
                                    <a href={`#`} className="tab-link active" data-index={0}><i className="fas fa-calendar-alt mg-r-5"></i> BOOK SCHEDULE</a>
                                </li>
                                <li className="tab-item">
                                    <a href={`#`} className="tab-link " data-index={1}><i className="fas fa-clock mg-r-5"></i> SCHEDULE LOG</a>
                                </li>
                                {/* <li className="tab-item">
                                    <a href={`#`} className="tab-link " data-index={2}><i className="fas fa-calendar-week mg-r-5"></i> BOOKING REQUEST</a>
                                </li> */}
                            </ul>
                        </div>
                        <div className="tab-navigation-content">
                            <div className="swiper-container" id="js-teacher__info">
                                <div className="teacher__info-wrap swiper-wrapper">
                                    <div className="swiper-slide">
                                        <div className="slide-tab-content pd-b-0-f">
                                            
                                            <BookingCalendar />
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="slide-tab-content">
                                            <ScheduleLogTable />
                                        </div>
                                    </div>
                                    {/* <div className="swiper-slide">
                                        <div className="slide-tab-content">
                                            <div className="course-horizental">
                                                <BookingRequest updateSwiperHeight={updateHeight}/>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <NoteForStudentModal />
        </>
    )
}

const domContainer = document.getElementById('react-teacher-booking');
ReactDOM.render(<TeacherBooking />, domContainer);