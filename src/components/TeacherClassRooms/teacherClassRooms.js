import React from 'react';
import ReactDOM from 'react-dom';
import styles from './teacherClassRooms.module.scss';
import StudentInformationModal from '../StudentInformationModal';

const UpcomingRow = ({ status = 'booked', showStudentModal }) => {
    return (
        <tr>
            <td className="clr-time">
                <div className="mg-b-5">
                    <span className="tx-medium mg-r-5"><i className="fa fa-clock"></i> VN:</span>
                    <span className="tx-gray-500">May 03, 2020 11:00 AM</span>
                </div>
                <div className="mg-b-5">
                    <span className="tx-medium mg-r-5"><i className="fa fa-clock"></i> BJT:</span>
                    <span className="tx-gray-500">May 03, 2020 11:30 AM</span>
                </div>
            </td>
            <td className="clr-lesson">
                <div className="mg-b-5">
                    <span className="tx-primary tx-medium">IETLS 8.0 Professional</span>
                </div>
                <div className="mg-b-5">
                    <span className="tx-medium mg-r-5">Lesson name:</span>
                    <span className="tx-gray-500">React JS Application</span>
                </div>
            
            </td>
            <td className="clr-student">
                <a href={`#`} onClick={(e)=>{e.preventDefault(); showStudentModal('1')}} className="clrm-studentname">Pretty<i className="fa fa-mars mg-l-10 clrm-icon-male" /></a>
            </td>
            <td className="clr-status">
                {status === 'booked' && <span className="badge badge-warning pd-5">BOOKED</span>}
                {status === 'finished' && <span className="badge badge-success pd-5">FINISHED</span>}

            </td>
            <td className="clr-actions">
                <a href={`#`} className="btn btn-sm btn-warning rounded-5 mg-r-10"><i className="fa fa-book-open clrm-icon" /> Material</a>
                <a href={`skype:val.kyrie106?chat`} className=" btn btn-sm btn-warning rounded-5"><i className="fab fa-skype clrm-icon" /> Enter Class</a>
               
            </td>
        </tr>
    )
}

const MissingFeedbackRow = () => {
    return (
        <tr>
            <td className="clr-time">
                <div className="mg-b-5">
                    <span className="tx-medium mg-r-5"><i className="fa fa-clock"></i> VN:</span>
                    <span className="tx-gray-500">May 03, 2020 11:00 AM</span>
                </div>
                <div className="mg-b-5">
                    <span className="tx-medium mg-r-5"><i className="fa fa-clock"></i> BJT:</span>
                    <span className="tx-gray-500">May 03, 2020 11:30 AM</span>
                </div>
            </td>
            <td className="clr-lesson">
                <div className="mg-b-5">
                    <span className="tx-primary tx-medium">IETLS 8.0 Professional</span>
                </div>
                <div className="mg-b-5">
                    <span className="tx-medium mg-r-5">Lesson name:</span>
                    <span className="tx-gray-500">React JS Application</span>
                </div>
            </td>
            <td className="clr-feedbackStatus">
                <div>
                    <span className="tx-medium mg-r-5">Student:</span>
                    <span className="tx-success">Done</span>
                </div>
                <div className="mg-b-5">
                    <span className="tx-medium mg-r-5">Teacher:</span>
                    <span className="tx-danger">Not feedback</span>
                </div>

            </td>
            <td className="clr-actions">
                <a href={`#`} className="btn btn-sm btn-warning rounded-5"><i className="fa fa-comment-alt clrm-icon" /> Feedback</a>
            </td>
        </tr>
    )
}

const AllClassRow = ({ status = 'booked', finishType = "", showStudentModal }) => {
    return (
        <tr>
            <td className="clr-id">
                <span className="tx-gray-500">00232332</span>
            </td>
            <td className="clr-lesson">
                <span className="tx-medium mg-r-5">Lesson 6:</span>
                <span className="tx-gray-500">React JS Application</span>
            </td>
            <td className="clr-student">
            <a href={`#`} onClick={(e)=>{e.preventDefault(); showStudentModal('1')}} className="clrm-studentname">Pretty<i className="fa fa-mars mg-l-10 clrm-icon-male" /></a>
            </td>
            <td className="clr-time">
                <div className="mg-b-5">
                    <span className="tx-medium mg-r-5"><i className="fa fa-clock"></i> VN:</span>
                    <span className="tx-gray-500">May 03, 2020 11:00 AM</span>
                </div>
                <div className="mg-b-5">
                    <span className="tx-medium mg-r-5"><i className="fa fa-clock"></i> BJT:</span>
                    <span className="tx-gray-500">May 03, 2020 11:30 AM</span>
                </div>
            </td>
            <td className="clr-status">
                {status === 'booked' && <span className="badge badge-warning pd-5">BOOKED</span>}
                {status === 'finished' && <span className="badge badge-success pd-5">FINISHED</span>}
            </td>
            <td className="clr-finishType">
                <span className="tx-gray-500">{finishType}</span>
                {/* <span className="tx-gray-500">AS SCHEDULE</span>
                <span className="tx-gray-500">TEACHER NO SHOW</span>
                <span className="tx-gray-500">STUDENT NO SHOW</span>
                <span className="tx-gray-500">TEACHER LATE</span>
                <span className="tx-gray-500">IT PROBLEM</span> */}
            </td>
            <td className="clr-actions">
                <a href={`#`} className="btn btn-sm btn-warning rounded-5 mg-r-10"><i className="fa fa-book-open clrm-icon" /> Material</a>
                {status === 'booked' && <a href={`skype:val.kyrie106?chat`} className=" btn btn-sm btn-warning rounded-5"><i className="fab fa-skype clrm-icon" /> Enter Class</a>}
            </td>
        </tr>
    )
}

const initStudentInfo = {
    stImageUrl:'', 
    stName:'', 
    stCourseLearning:'', 
    stLastLesson:'', 
    stNation:'', 
    stTimeZone:'', 
    stDescription:''
}

const TeacherClassRooms = () => {
    const [studentId, setStudentId] = React.useState(null);
    const [filterStatusAllClass, setFilterStatusAllClass] = React.useState('1');
    const mdStudentInfo = React.createRef();
    const _onFilterDate = (e) => {
        e.preventDefault();
        const fromDate = document.querySelector('#filter-time .from-date');
        const toDate = document.querySelector('#filter-time .to-date');
        console.log({ fromDate, toDate });
    }

    const showStudentModal = (studentId) => {
        setStudentId(studentId);
        $(mdStudentInfo.current).modal('show');
    }

    const _changeFilterStatusAllClass = (event) => {
        setFilterStatusAllClass(event.target.value);
        //LoadAjax table
    }

    return (
        <>
        <div className="teacher__detail__wrap card-box">
            <div className="teacher__detail">
                <div className="teacher-body">
                    <div className="tab-navigation">
                        <ul className="list-tab" id="js-list-tab">
                            <li className="tab-item">
                                <span className="tab-link active" data-index={0}>Upcoming classe</span>
                            </li>
                            <li className="tab-item">
                                <span className="tab-link " data-index={1}>Missing feedback</span>
                            </li>
                            <li className="tab-item">
                                <span className="tab-link " data-index={2}>All Classed</span>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-navigation-content">
                        <div className="swiper-container" id="js-teacher__info">
                            <div className="teacher__info-wrap swiper-wrapper">
                                {/*tab 1*/}
                                <div className="swiper-slide">
                                    <div className="slide-tab-content">
                                        <div className="clrm-notice">
                                            <p>
                                                <i className="fa fa-bell clrm-icon" />
                                                <span className="clrm-notice-text">Lorem ipsum dolor sit, amet
                    consectetur adipisicing elit. Eveniet, ad.</span>
                                            </p>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-classrooms">
                                                <thead>
                                                    <tr className="thead-light">
                                                        <th className="clr-time">Scheduled Times</th>
                                                        <th className="clr-lesson">Course</th>
                                                        <th className="clr-student">Student</th>
                                                        <th className="clr-status">Status</th>
                                                        <th className="clr-action">Actions</th>
                                                    </tr>
                                                </thead>
                                                {/*1 item*/}
                                                <tbody>
                                                    <UpcomingRow showStudentModal={showStudentModal}/>
                                                    <UpcomingRow showStudentModal={showStudentModal} status="finished" />
                                                    <UpcomingRow showStudentModal={showStudentModal} status="finished" />
                                                    <UpcomingRow showStudentModal={showStudentModal}/>
                                                </tbody>
                                            </table>
                                        </div>
                                        <nav aria-label="Page navigation" className="mg-t-10">
                                            <ul className="pagination mg-b-0 justify-content-end">
                                                <li className="page-item disabled"><a className="page-link page-link-icon" href="#"><i data-feather="chevron-left" /></a></li>
                                                <li className="page-item active"><a className="page-link" href="#">1</a>
                                                </li>
                                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                <li className="page-item"><a className="page-link page-link-icon" href="#"><i data-feather="chevron-right" /></a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                {/*/tab 1*/}
                                {/*tab 2*/}
                                <div className="swiper-slide">
                                    <div className="slide-tab-content">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr className="thead-light">
                                                        <th className="clr-time">Lesson Times</th>
                                                        <th className="clr-lesson">Lesson Info</th>
                                                        <th className="clr-feedbackStatus">Feedback Status</th>
                                                        <th className="clr-actions">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <MissingFeedbackRow />
                                                    <MissingFeedbackRow />
                                                    <MissingFeedbackRow />
                                                    <MissingFeedbackRow />
                                                    <MissingFeedbackRow />
                                                </tbody>
                                            </table>
                                        </div>
                                        <nav aria-label="Page navigation" className="mg-t-10">
                                            <ul className="pagination mg-b-0 justify-content-end">
                                                <li className="page-item disabled"><a className="page-link page-link-icon" href="#"><i data-feather="chevron-left" /></a></li>
                                                <li className="page-item active"><a className="page-link" href="#">1</a>
                                                </li>
                                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                <li className="page-item"><a className="page-link page-link-icon" href="#"><i data-feather="chevron-right" /></a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                {/*/tab 2*/}
                                {/*tab 3*/}
                                <div className="swiper-slide">
                                    <div className="slide-tab-content">
                                        <div className="d-flex align-items-center justify-content-between mg-b-15">
                                            <div>
                                                <select name="language" id=""
                                                    value={filterStatusAllClass}
                                                    className="form-control" onChange={_changeFilterStatusAllClass}>
                                                    <option value="1">All status</option>
                                                    <option value="2">Booked</option>
                                                    <option value="3">Finished</option>
                                                </select>
                                            </div>
                                            <div className="form-row from-to-group" id="filter-time">
                                                <div className="wd-sm-200 col">
                                                    <input type="text" name="start-day " className="form-control datetimepicker from-date" placeholder="From date" />
                                                </div>
                                                <div className="wd-sm-200 col">
                                                    <input type="text" name="end-day" className="form-control datetimepicker to-date" placeholder="To date" />
                                                </div>
                                                <div className="flex-grow-0 tx-right flex-shrink-0 pd-x-5">
                                                    <button type="button" className="btn btn-info " onClick={_onFilterDate}><i className="fa fa-filter" /> Filter</button>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th className="clr-id">Lesson ID</th>
                                                        <th className="clr-lesson">Lesson Name</th>
                                                        <th className="clr-student">Student Name</th>
                                                        <th className="clr-time">Schedule Time</th>
                                                        <th className="clr-status">Status</th>
                                                        <th className="clr-finishType">Finish Type</th>
                                                        <th className="clr-actions">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <AllClassRow showStudentModal={showStudentModal}/>
                                                    <AllClassRow showStudentModal={showStudentModal}/>
                                                    <AllClassRow showStudentModal={showStudentModal} status='finished' finishType="AS SCHEDULE" />
                                                    <AllClassRow showStudentModal={showStudentModal} status='finished' finishType="TEACHER NO SHOW" />
                                                    <AllClassRow showStudentModal={showStudentModal} status='finished' finishType="STUDENT  NO SHOW" />
                                                    <AllClassRow showStudentModal={showStudentModal} status='finished' finishType="TEACHER LATE" />
                                                    <AllClassRow showStudentModal={showStudentModal} status='finished' finishType="IT PROBLEM" />
                                                </tbody>
                                            </table>
                                        </div>
                                        <nav aria-label="Page navigation" className="mg-b-10">
                                            <ul className="pagination mg-b-0 justify-content-end">
                                                <li className="page-item disabled"><a className="page-link page-link-icon" href="#"><i data-feather="chevron-left" /></a></li>
                                                <li className="page-item active"><a className="page-link" href="#">1</a>
                                                </li>
                                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                <li className="page-item"><a className="page-link page-link-icon" href="#"><i data-feather="chevron-right" /></a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                {/*/tab 3*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <StudentInformationModal 
            ref={mdStudentInfo} 
            // stImageUrl={studentInfo.stImageUrl}
            // stName={studentInfo.stName}
            // stCourseLearning={studentInfo.stCourseLearning}
            // stLastLesson={studentInfo.stLastLesson}
            // stNation={studentInfo.stNation}
            // stTimeZone={studentInfo.stTimeZone}
            // stDescription={studentInfo.stDescription}
            studentId={studentId}
        />
        </>
    )
}


const domContainer = document.getElementById('react-teacher-classrooms');
ReactDOM.render(<TeacherClassRooms />, domContainer);