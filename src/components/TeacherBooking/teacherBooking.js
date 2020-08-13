import React from 'react';
import ReactDOM from 'react-dom';
import NoteForStudentModal from '../NoteForStudentModal';
import ScheduleLogTable from '~components/table/ScheduleLogTable'
import BookingRequest from './BookingRequest';
import BookingCalendar from './BookingCalendar';
import { ToastContainer } from 'react-toastify';
import { getTeacherInfo } from '~src/api/teacherAPI';
import styles from '../TeacherBooking/teacherBooking.module.scss';
import { Tab } from 'react-bootstrap';
let teacherInfoSwiper;
const TeacherBooking = () => {
    const [timeZone, setTimeZone] = React.useState('');
    const [activeTab, setActiveTab] = React.useState('book');
    const getProfile = async () => {
        const res = await getTeacherInfo();
        res.Code === 1 && setTimeZone(res?.Data.TimeZoneString ?? '')
    }

    const updateHeight = () => {
        teacherInfoSwiper.update();
    }

    React.useEffect(() => {
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
                                <li className={`tab-item`} onClick={() => setActiveTab('book')}>
                                    <a className={`tab-link ${activeTab === 'book' ? 'active' : ''}`}><i className="far fa-calendar-alt"></i> BOOK SCHEDULE</a>
                                </li>
                                <li className={`tab-item`} onClick={() => setActiveTab('log')}>
                                    <a className={`tab-link ${activeTab === 'log' ? 'active' : ''}`} ><i className="far fa-clock"></i> SCHEDULE LOG</a>
                                </li>
                                {/* <li className={`tab-item`} onClick={() => setActiveTab('request')}>
                                    <a className={`tab-link ${activeTab === 'request' ? 'active' : ''}`} ><i className="far fa-calendar-check"></i> BOOKING REQUEST</a>
                                </li> */}
                            </ul>

                        </div>
                        <div className="tab-navigation-content">
                            <div className="swiper-container" id="js-teacher__info">
                                <div className="teacher__info-wrap pd-t-30">
                                    <Tab.Container
                                        activeKey={activeTab}
                                        defaultActiveKey={activeTab}
                                    >
                                        <Tab.Content>
                                            <Tab.Pane eventKey="book">
                                                <BookingCalendar />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="log">
                                                <ScheduleLogTable />
                                            </Tab.Pane>
                                            {/* <Tab.Pane eventKey="request">
                                        <BookingRequest />
                                    </Tab.Pane> */}
                                        </Tab.Content>
                                    </Tab.Container>


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