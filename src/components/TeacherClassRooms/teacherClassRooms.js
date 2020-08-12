import React from 'react';
import ReactDOM from 'react-dom';
import styles from './teacherClassRooms.module.scss';
import { getAllClass, getUpcomingClass } from '~src/api/teacherAPI';
import Skeleton from 'react-loading-skeleton';
import UpComingTable from '~components/table/UpComingTable';
import AllClassesTable from '~components/table/AllClassesTable';
import MissingFeedbackTable from '~components/table/MissingFeedbackTable';
import StudentInformationModal from '~components/StudentInformationModal';
import { Tab } from 'react-bootstrap';


const TeacherClassRooms = () => {
    const [studentId, setStudentId] = React.useState(null);
    const mdStudentInfo = React.useRef(true);
    const [activeTab, setActiveTab] = React.useState('upcoming');
    const showStudentModal = (studentId) => {
        setStudentId(studentId);
        $(mdStudentInfo.current).modal('show');
    }

    const unMountComponents = () => {
        mdStudentInfo.current = false;
    }
 
    React.useEffect(() => {
        return unMountComponents;
    }, []);

    return (
        <>
            <div className="d-xl-flex align-items-center justify-content-between mg-b-30">
                <h3 className="text-dark font-weight-bold mg-b-0">Classrooms</h3>
            </div>
            <div className="teacher__detail__wrap card card-custom">
                <div className="teacher__detail card-body">
                    <div className="teacher-body mg-t-0-f">
                        <div className="tab-navigation teacher-custom">
                            <ul className="list-tab" id="js-list-tab">
                                <li className={`tab-item`} onClick={() => setActiveTab('upcoming')}>
                                    <a className={`tab-link ${activeTab === 'upcoming' ? 'active' : ''}`}><i className="far fa-calendar-alt"></i> Upcoming classes</a>
                                </li>
                                <li className={`tab-item`} onClick={() => setActiveTab('missing')}>
                                    <a className={`tab-link ${activeTab === 'missing' ? 'active' : ''}`} ><i className="far fa-comment-alt"></i> Missing feedback</a>
                                </li>
                                <li className={`tab-item`} onClick={() => setActiveTab('allclass')}>
                                    <a className={`tab-link ${activeTab === 'allclass' ? 'active' : ''}`} ><i className="far fa-calendar-check"></i> All Classes</a>
                                </li>
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
                                    <Tab.Pane eventKey="upcoming">
                                        <UpComingTable showStudentModal={showStudentModal} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="missing">
                                        <MissingFeedbackTable />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="allclass">
                                        <AllClassesTable showStudentModal={showStudentModal} />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <StudentInformationModal
                ref={mdStudentInfo}
                studentId={studentId}
            />
        </>
    )
}


const domContainer = document.getElementById('react-teacher-classrooms');
ReactDOM.render(<TeacherClassRooms />, domContainer);