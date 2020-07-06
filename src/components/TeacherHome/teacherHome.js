import React from 'react';
import ReactDOM from 'react-dom';
import LessonCard from '../LessonCard';
import NoteForStudentModal from '../NoteForStudentModal';
import styles from '~components/TeacherHome/teacherHome.module.scss';

const documents = [{
    id:1,
    name:"doc 1",
    extension:"docx",
    link:'http://mona.media'
},
{
    id:2,
    name:"doc 2",
    extension:"exce",
    link:'http://mona.media'
}];

const SituationBlock = ({ title, value, unit, imageUrl, link, linkTitle }) => {
    return (
        <div className="card rounded-10 shadow-base bd-0">
            <div className="card-body d-flex align-items-center justify-content-between bd-0-f pd-20">
                <div className="flex-shrink-0 d-flex flex-column justify-content-between">
                    <img src={imageUrl} className="wd-75 ht-50 object-fit mg-b-10" />
                    <p className="tx-18 text-center mg-b-0 tx-medium">{title}</p>
                    <a href={link} >{linkTitle}</a>
                </div>
                <div className="tx-center circle-value">
                    <p className="mg-b-0 tx-20 tx-bold tx-gray-600">{value}</p>
                    <p className="text-center mg-b-0 tx-gray-400">{unit}</p>
                </div>
            </div>
        </div>
    )
}

const SummaryBlock = ({imageUrl, title, value}) => {
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
    const _onFilterDate = (e) => {
        e.preventDefault();
       const fromDate = document.querySelector('#filter-time .from-date');
       const toDate = document.querySelector('#filter-time .to-date');
       console.log({fromDate, toDate});
    }


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
                                <SummaryBlock imageUrl='../assets/img/time-in-class.png' title="Hours Classes" value="32"/>
                                <SummaryBlock imageUrl='../assets/img/student.png' title="Student Members" value="172"/>
                                <SummaryBlock imageUrl='../assets/img/exp.png' title="Days Experience" value="122"/>
                                
                            </div>
                        </div>{/* col */}

                    </div>
                    <div className="col-lg-9">

                    <div className="gv-situation mg-t-30">
                            <div className="mg-b-15 d-lg-flex align-items-center justify-content-between">
                                <h3 className="gradient-heading mg-lg-b-0"><i className="fas fa-user-graduate  mg-r-10"></i> TEACHING SITUATION</h3>

                              
                                <div className="form-row from-to-group" id="filter-time">
                                    <div className="wd-sm-200 col">
                                        <input type="text" name="start-day " className="form-control datetimepicker from-date" placeholder="From date"/>
                                    </div>
                                    <div className="wd-sm-200 col">
                                        <input type="text" name="end-day" className="form-control datetimepicker to-date" placeholder="To date"/>
                                    </div>
                                    <div className="flex-grow-0 tx-right flex-shrink-0 pd-x-5">
                                        <button type="button" className="btn btn-info " onClick={_onFilterDate}><i className="fa fa-search" /></button>
                                    </div>
                                </div>
                            </div>
                            <div className="row mg-t-30">
                                <div className="col-12 col-md-4">
                                    <SituationBlock link={`teacherBooking.html`} linkTitle="Manage slot" title="Open" value="4500" unit="slots" imageUrl={'../assets/img/slot-open.png'} />
                                </div>
                                <div className="col-12 col-md-4">
                                    <SituationBlock link={`teacherBooking.html`} linkTitle="Manage slot" title="Booked" value="4500" unit="slots" imageUrl={'../assets/img/slot-booked.png'} />
                                </div>
                                <div className="col-12 col-md-4">
                                    <SituationBlock link={`teacherClassRooms.html`} linkTitle="View feedback" title="Missing" value="4500" unit="Feedback" imageUrl={'../assets/img/missing-feedback.png'} />
                                </div>



                            </div>

                        </div>
                      
                        <div className="gv-notice mg-t-45">
                            <h3 className="gradient-heading "><i className="fas fa-fire-alt mg-r-10"></i> UP COMMING LESSON</h3>
                            <div className="course-horizental pd-t-15 ">

                                <div className="list-wrap ">
                                    <div className="row">
                                        <div className="col-12">
                                            <LessonCard 
                                                courseName="IELST Professional 8.0"
                                                studentName="Truong Van Lam"
                                                lessonDate="Monday, 30/04/2020"
                                                lessonStart="10:30AM"
                                                lessonEnd="11:00AM"
                                                lessonStatus="Lesson 2"
                                                studentNote="Good job, you have excellent coding skills !!"
                                                cancellable={false}
                                                documents={documents}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <LessonCard 
                                                courseName="IELST Professional 8.0"
                                                studentName="Truong Van Lam"
                                                lessonDate="Monday, 30/04/2020"
                                                lessonStart="10:30AM"
                                                lessonEnd="11:00AM"
                                                lessonStatus="Lesson 2"
                                                studentNote="Good job, you have excellent coding skills !!"
                                                cancellable={true}
                                                documents={documents}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="empty-error tx-center mg-y-30 bg-white">
                                    <img src="../assets/img/no-booking.svg" alt="image" className="wd-200 mg-b-15" />
                                    <p className=" tx-danger tx-medium">You don't have any book lesson with student</p>
                                </div>

                            </div>

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