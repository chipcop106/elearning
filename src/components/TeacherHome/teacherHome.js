import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import NoteForStudentModal from '../NoteForStudentModal';
import styles from '~components/TeacherHome/teacherHome.module.scss';
import { getTeacherDashboard, cancelSchedule } from '~src/api/teacherAPI'
import Skeleton from 'react-loading-skeleton';
import Flatpickr from 'react-flatpickr';
import TeacherSidebar from './TeacherSidebar';
import UpComingList from './UpComingList';
import { ToastContainer } from 'react-toastify';
import {appSettings} from '~src/config';
import Select from 'react-select';
const DateTimeFormat = new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    month: "2-digit",
    day: "2-digit",
});

const itemShowOptions = [
    {
        value:5,
        label:'Last 5 lesson'
    },
    {
        value:10,
        label:'Last 10 lesson'
    }
]

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
    const [selectShow, setSelectShow] = useState(itemShowOptions[0]);
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
        feather.replace();
    }, [selectShow])
    React.useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <h3 className="text-dark font-weight-bold mg-b-30">My Dashboard</h3>
            <div className="">
                <div className="d-flex flex-wrap flex-xl-nowrap row--lg">
                    <div className="wd-100p mg-xl-b-0 mg-b-30 wd-xl-350 pd-xl-x-15 d-sm-flex d-xl-block flex-shrink-0">
                        <TeacherSidebar />
                    </div>
                    <div className="flex-grow-1 pd-xl-x-15 wd-100p">
                        <div className="gv-situation mg-b-15">
                            {/* <div className="mg-b-15 d-lg-flex align-items-center justify-content-between">
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
                            </div> */}
                            <div className="row">
                                <div className="col-12 col-md-4 mg-b-15">
                                    <SituationBlock isLoading={isLoading} link={dashboardInfo?.OpenSlotURL} linkTitle="Manage slot" title="Open" value={dashboardInfo?.OpenSlot} unit="slots" imageUrl={'../assets/img/slot-open.png'} />
                                </div>
                                <div className="col-12 col-md-4  mg-b-15">
                                    <SituationBlock isLoading={isLoading} link={dashboardInfo?.BookedSlotURl} linkTitle="Manage slot" title="Booked" value={dashboardInfo?.BookedSlot} unit="slots" imageUrl={'../assets/img/slot-booked.png'} />
                                </div>
                                <div className="col-12 col-md-4  mg-b-15">
                                    <SituationBlock isLoading={isLoading} link={dashboardInfo?.FeedbackURL} linkTitle="View feedback" title="Missing" value={dashboardInfo?.Feedback} unit="Feedback" imageUrl={'../assets/img/missing-feedback.png'} />
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                            <div className="card card-custom">
                                <div className="card-header align-items-center d-flex justify-content-between pd-x-20-f">
                                    <div className="d-flex align-items-center">
                                        <div className="">
                                            <h5 className="mg-b-5">Upcoming lesson</h5>
                                            <p className="tx-gray-300 mg-b-0">Next upcoming lesson with student</p>
                                        </div>
                                    </div>
                                    <div className="wd-150">
                                        <Select 
                                            options={itemShowOptions}
                                            styles={appSettings.selectStyle}
                                            onChange={setSelectShow}
                                            defaultValue={selectShow}
                                        />
                                    </div>
                                   
                                </div>
                                <div className="card-body pd-x-10-f pd-y-15-f">
                                    <div className="gv-notice">
                                        <UpComingList itemShow={selectShow}/>
                                    </div>
                                </div>
                            </div>
                               
                               
                            </div>
                           
                        </div>
                     
                       
                    </div>
                </div>
            </div>



            <NoteForStudentModal />
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
        </>
    )
}

const domContainer = document.getElementById('react-teacher-home');
ReactDOM.render(<TeacherHome />, domContainer);