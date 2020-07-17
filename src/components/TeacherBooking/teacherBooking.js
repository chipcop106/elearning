import React from 'react';
import ReactDOM from 'react-dom';
import NoteForStudentModal from '../NoteForStudentModal';
import styles from '../TeacherBooking/teacherBooking.module.scss';
import ScheduleLogTable from '~components/table/ScheduleLogTable'
import BookingRequest from './BookingRequest';
import BookingCalendar from './BookingCalendar';
import { ToastContainer } from 'react-toastify';
const TeacherBooking = () => {
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
        initSwiper();
    }, []);
    

    return (
        <>
            <div className="book__container mg-t-15">
                <div className="d-xl-flex align-items-center justify-content-between mg-b-30">
                    <h4 className="mg-b-0 gradient-heading"><i className="fas fa-address-card" /> BOOKING SCHEDULE</h4>
                    <span className="tx-primary bg-gray-200 pd-5 rounded d-inline-block tx-medium"><i class="fas fa-globe-europe mg-r-5"></i>Timezone: GTM + 7</span>
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
                                    
                                    <BookingCalendar />
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="slide-tab-content">
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores minima
                                    nesciunt unde exercitationem vitae quibusdam reiciendis rerum necessitatibus
                                    ipsa aliquam praesentium totam modi tempore, illum sint vero eius aperiamcumque.</p>
                                    <ScheduleLogTable />
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="slide-tab-content">
                                    <div className="course-horizental">
                                        <BookingRequest />
                                    </div>
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