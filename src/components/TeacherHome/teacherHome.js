import React from 'react';
import ReactDOM from 'react-dom';
import LessonCard from '../LessonCard';
import NoteForStudentModal from '../NoteForStudentModal';
import styles from '~components/TeacherHome/teacherHome.module.scss';
import { getTeacherDashboard, cancelSchedule } from '~src/api/teacherAPI'
import Skeleton from 'react-loading-skeleton';
import { convertDateFromTo as cvDate, checkCancelTime } from '~src/utils'
import SkeletonLessonCard from '~components/common/Skeleton/SkeletonLessonCard';
import CancelBookingLessonModal from '~components/CancelBookingLessonModal';

const SituationBlock = ({ title, value, unit, imageUrl, link, linkTitle }) => {
    return (
        <div className="card rounded-10 shadow-base bd-0">
            <div className="card-body d-flex align-items-center justify-content-between bd-0-f pd-20">
                <div className="flex-shrink-0 d-flex flex-column justify-content-between">
                    {imageUrl ? <img src={imageUrl} className="wd-75 ht-50 object-fit mg-b-10" /> : <Skeleton circle={true} />}
                    <p className="tx-18 text-center mg-b-0 tx-medium">{title || <Skeleton />}</p>
                    <a href={link} >{linkTitle || <Skeleton />}</a>
                </div>
                <div className="tx-center circle-value">
                    <p className="mg-b-0 tx-20 tx-bold tx-gray-600">{value || <Skeleton />}</p>
                    <p className="text-center mg-b-0 tx-gray-400">{unit || <Skeleton />}</p>
                </div>
            </div>
        </div>
    )
}

const SummaryBlock = ({ imageUrl, title, value }) => {
    return (
        <div className="d-flex align-items-center mg-b-15">
            <span className="bg-gray-100 wd-50 ht-50 rounded-circle d-inline-flex align-items-center justify-content-center">
                <img className="wd-30 ht-30 object-fit" src={imageUrl} />
            </span>
            <div className="mg-l-10">
                <p className="mg-b-0 tx-medium tx-20 tx-primary">{value} </p>
                <p className="tx-gray-500 mg-b-0">{title}</p>
            </div>
        </div>
    )
}

const TeacherHome = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [dashboardInfo, setDashboardInfo] = React.useState(null);
    const [cancelData, setCancelData] = React.useState(null);
    const [showCancel, setShowcancel] = React.useState(false); 

    const _onFilterDate = (e) => {
        e.preventDefault();
        const fromDate = document.querySelector('#filter-time .from-date');
        const toDate = document.querySelector('#filter-time .to-date');
        if(fromDate.value === '' || toDate.value  === '') {
            alert('Vui lòng nhập đầy đủ ngày bắt đầu và ngày kết thúc');
            return;
        }
        console.log({ fromDate, toDate });
    }

    const getData = async () => {
        setIsLoading(true);
        try {
            const res = await getTeacherDashboard();
            if (res?.Code && res.Code === 1) {
                setDashboardInfo(res.Data);
                setIsLoading(false);
                return;
            } else {
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    const $mdCancel =  $('#md-cancel-schedule');

    const handleCancelLesson = (lessonData) => {
        console.log('Booking cancel id: ', lessonData.lessonId);
        setCancelData(lessonData);
        $mdCancel.modal('show');
    }

    const refreshListUpcoming = (bookingId) => {
        const newUpcomings = [...dashboardInfo.UpcomingLession].filter(item => item.BookingID !== bookingId);
        setDashboardInfo({...dashboardInfo, UpcomingLession:newUpcomings});
    }

    React.useEffect(() => {
        console.log(dashboardInfo);
    }, [dashboardInfo])
    React.useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <div className="gv-pro">
                <div className="row">
                    <div className="col-lg-3 d-sm-flex d-lg-block">
                        <div className="mg-sm-r-30 mg-lg-r-0 d-sm-flex d-lg-block">
                            <div className="mg-b-20 mg-sm-x-30 mg-lg-x-0">
                                <div className="avatar avatar-xxl avatar-online"><img src="../assets/img/teacher.jpg" className="rounded-circle" alt="" /></div>
                                <h5 className="mg-b-2 tx-spacing--1 mg-t-15">Trần Lê Phương Quyên </h5>
                            </div>{/* col */}
                            <div >
                                <label className="tx-sans tx-10 tx-semibold tx-uppercase tx-color-01 tx-spacing-1 mg-b-15">Contact Information</label>
                                <ul className="list-unstyled profile-info-list mg-b-10">
                                    <li><i data-feather="home" /><span>Gia Lai</span></li>
                                    <li><i data-feather="phone" /><a href="tel:0987654321">0987654321</a></li>
                                    <li><i data-feather="mail" /><a href="mailto:example@gmail.com">example@gmail.com</a>
                                    </li>
                                </ul>
                            </div>{/* col */}
                        </div>
                        <div >
                            <label className="tx-sans tx-10 tx-semibold tx-uppercase tx-color-01 tx-spacing-1 mg-b-15">Summary</label>
                            <div className="list-unstyled">
                                <SummaryBlock imageUrl='../assets/img/time-in-class.png' title="Hours Classes" value="32" />
                                <SummaryBlock imageUrl='../assets/img/student.png' title="Student Members" value="172" />
                                <SummaryBlock imageUrl='../assets/img/exp.png' title="Days Experience" value="122" />

                            </div>
                        </div>{/* col */}

                    </div>
                    <div className="col-lg-9">
                        <div className="gv-situation mg-t-30">
                            <div className="mg-b-15 d-lg-flex align-items-center justify-content-between">
                                <h3 className="gradient-heading mg-lg-b-0"><i className="fas fa-user-graduate  mg-r-10"></i> TEACHING SITUATION</h3>
                                <div className="form-row from-to-group" id="filter-time">
                                    <div className="wd-sm-200 col">
                                        <input type="text" name="start-day " className="form-control datetimepicker from-date" placeholder="From date" />
                                    </div>
                                    <div className="wd-sm-200 col">
                                        <input type="text" name="end-day" className="form-control datetimepicker to-date" placeholder="To date" />
                                    </div>
                                    <div className="flex-grow-0 tx-right flex-shrink-0 pd-x-5">
                                        <button type="button" className="btn btn-info " onClick={_onFilterDate}><i className="fa fa-search" /></button>
                                    </div>
                                </div>
                            </div>
                            <div className="row mg-t-30">
                                <div className="col-12 col-md-4 mg-b-10">
                                    <SituationBlock link={`teacherBooking.html`} linkTitle="Manage slot" title="Open" value={dashboardInfo?.OpenSlot} unit="slots" imageUrl={'../assets/img/slot-open.png'} />
                                </div>
                                <div className="col-12 col-md-4  mg-b-10">
                                    <SituationBlock link={`teacherBooking.html`} linkTitle="Manage slot" title="Booked" value={dashboardInfo?.BookedSlot} unit="slots" imageUrl={'../assets/img/slot-booked.png'} />
                                </div>
                                <div className="col-12 col-md-4  mg-b-10">
                                    <SituationBlock link={`teacherClassRooms.html`} linkTitle="View feedback" title="Missing" value={dashboardInfo?.Feedback} unit="Feedback" imageUrl={'../assets/img/missing-feedback.png'} />
                                </div>
                            </div>

                        </div>

                        <div className="gv-notice mg-t-45">
                            <h3 className="gradient-heading "><i className="fas fa-fire-alt mg-r-10"></i> UP COMMING LESSON</h3>
                            <div className="course-horizental pd-t-15 ">
                                <div className="list-wrap ">
                                    <div className="row">
                                        {!!!dashboardInfo &&
                                            <div className="col-12" >
                                                <SkeletonLessonCard />
                                            </div>
                                        }

                                        {!!dashboardInfo && !!dashboardInfo.UpcomingLession && dashboardInfo.UpcomingLession.length > 0 ? (
                                            [...dashboardInfo.UpcomingLession].map(lesson => <div className="col-12" key={`${lesson.BookingID}`}>
                                                <LessonCard
                                                    lessonId={lesson.BookingID}
                                                    courseName={lesson.DocumentName}
                                                    studentName={lesson.StudentName}
                                                    lessonDate={cvDate(lesson.ScheduleTimeVN).date}
                                                    lessonStart={cvDate(lesson.ScheduleTimeVN).fromTime}
                                                    lessonEnd={cvDate(lesson.ScheduleTimeVN).endTime}
                                                    lessonStatus={lesson.LessonName}
                                                    // cancellable={checkCancelTime(cvDate(lesson.ScheduleTimeVN).dateObject)}
                                                    cancellable={true} //Only for test cancel action, use above code for production
                                                    skypeId={lesson.SkypeID}
                                                    studentNote={lesson.SpecialRequest}
                                                    documents={[{
                                                        id: randomId(),
                                                        name: "Tài liệu",
                                                        extension: "",
                                                        link: lesson.LessionMaterial
                                                    }]}
                                                    handleCancelLesson={handleCancelLesson}
                                                />
                                            </div>)
                                        ) : !!dashboardInfo && !!dashboardInfo.UpcomingLession  && !!dashboardInfo.UpcomingLession.length === 0 && 
                                            <div className="empty-error tx-center mg-y-30 bg-white">
                                                <img src="../assets/img/no-booking.svg" alt="image" className="wd-200 mg-b-15" />
                                                <p className=" tx-danger tx-medium">You don't have any book lesson with student</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/*Home*/}
                    </div>
                </div>
            </div>

            <CancelBookingLessonModal 
                id={cancelData?.lessonId ?? ''}
                name="Warning !!"
                start={cancelData?.lessonStart ?? ''}
                end={cancelData?.lessonEnd ?? ''}
                date={cancelData?.lessonDate  ?? ''}
                callback={refreshListUpcoming}
            />
            
            <NoteForStudentModal/>
        </>
    )
}

const domContainer = document.getElementById('react-teacher-home');
ReactDOM.render(<TeacherHome />, domContainer);