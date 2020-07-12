import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import NoteForStudentModal from '../NoteForStudentModal';
import styles from '~components/TeacherHome/teacherHome.module.scss';
import { getTeacherDashboard, cancelSchedule } from '~src/api/teacherAPI'
import Skeleton from 'react-loading-skeleton';
import Flatpickr from 'react-flatpickr';
import TeacherSidebar from './TeacherSidebar';
import UpComingList from './UpComingList';

const DateTimeFormat = new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    month: "2-digit",
    day: "2-digit",
});

const SituationBlock = ({ title, value, unit, imageUrl, link, linkTitle, isLoading }) => {
    return (
        <div className="card rounded-10 shadow-base bd-0">
            <div className="card-body d-flex align-items-center justify-content-between bd-0-f pd-20">
                <div className="flex-shrink-0 d-flex flex-column justify-content-between">
                    {imageUrl ? <img src={imageUrl} className="wd-75 ht-50 object-fit mg-b-10" /> : <Skeleton circle={true} />}
                    <p className="tx-18 text-center mg-b-0 tx-medium">{!isLoading ? (title) : (<Skeleton />)}</p>
                    <a href={link ? link : ''} >{!isLoading ? (linkTitle) : (<Skeleton />)}</a>
                </div>
                <div className="tx-center circle-value">
                    <p className="mg-b-0 tx-20 tx-bold tx-gray-600">{!isLoading ? (value) : (<Skeleton />)}</p>
                    <p className="text-center mg-b-0 tx-gray-400">{!isLoading ? (unit) : (<Skeleton />)}</p>
                </div>
            </div>
        </div>
    )
}



const TeacherHome = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [dashboardInfo, setDashboardInfo] = useState(null);

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const _onFilterDate = (e) => {
        e.preventDefault();
        if (fromDate.value === '' || toDate.value === '') {
            alert('Vui lòng nhập đầy đủ ngày bắt đầu và ngày kết thúc');
            return;
        }
        console.log('Filtered, chua co API');
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
                        <TeacherSidebar />
                    </div>
                    <div className="col-lg-9">
                        <div className="gv-situation mg-t-30">
                            <div className="mg-b-15 d-lg-flex align-items-center justify-content-between">
                                <h3 className="gradient-heading mg-lg-b-0"><i className="fas fa-user-graduate  mg-r-10"></i> TEACHING SITUATION</h3>
                                <div className="form-row from-to-group" id="filter-time">
                                    <div className="wd-sm-200 col">
                                        <Flatpickr
                                            placeholder="From date"
                                            options={{
                                                dateFormat: "d/m/Y",
                                            }}
                                            className="form-control"
                                            onChange={(date) => setFromDate(date)}
                                        />
                                    </div>
                                    <div className="wd-sm-200 col">
                                        <Flatpickr
                                            placeholder="To date"
                                            options={{
                                                dateFormat: "d/m/Y",
                                                onOpen: function (selectedDates, dateStr, instance) {
                                                    console.log(instance);
                                                    if (fromDate === '') return;
                                                    instance.set("minDate", new Date(fromDate));

                                                }
                                            }}
                                            className="form-control"
                                            onChange={(date) => setToDate(date)}
                                        />
                                    </div>
                                    <div className="flex-grow-0 tx-right flex-shrink-0 pd-x-5">
                                        <button type="button" className="btn btn-info " onClick={_onFilterDate}><i className="fa fa-search" /></button>
                                    </div>
                                </div>
                            </div>
                            <div className="row mg-t-30">
                                <div className="col-12 col-md-4 mg-b-10">
                                    <SituationBlock isLoading={isLoading} link={dashboardInfo?.OpenSlotURL} linkTitle="Manage slot" title="Open" value={dashboardInfo?.OpenSlot} unit="slots" imageUrl={'../assets/img/slot-open.png'} />
                                </div>
                                <div className="col-12 col-md-4  mg-b-10">
                                    <SituationBlock isLoading={isLoading} link={dashboardInfo?.BookedSlotURl} linkTitle="Manage slot" title="Booked" value={dashboardInfo?.BookedSlot} unit="slots" imageUrl={'../assets/img/slot-booked.png'} />
                                </div>
                                <div className="col-12 col-md-4  mg-b-10">
                                    <SituationBlock isLoading={isLoading} link={dashboardInfo?.FeedbackURL} linkTitle="View feedback" title="Missing" value={dashboardInfo?.Feedback} unit="Feedback" imageUrl={'../assets/img/missing-feedback.png'} />
                                </div>
                            </div>

                        </div>

                        <div className="gv-notice mg-t-45">
                            <h3 className="gradient-heading "><i className="fas fa-fire-alt mg-r-10"></i> UP COMMING LESSON</h3>
                            <UpComingList />
                        </div>
                        {/*Home*/}
                    </div>
                </div>
            </div>



            <NoteForStudentModal />
        </>
    )
}

const domContainer = document.getElementById('react-teacher-home');
ReactDOM.render(<TeacherHome />, domContainer);