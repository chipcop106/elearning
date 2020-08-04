import React from 'react';
import ReactDOM from 'react-dom';
import styles from './teacherClassRooms.module.scss';
import { getAllClass, getUpcomingClass } from '~src/api/teacherAPI';
import Skeleton from 'react-loading-skeleton';
import UpComingTable from '~components/table/UpComingTable';
import AllClassesTable from '~components/table/AllClassesTable';
import MissingFeedbackTable from '~components/table/MissingFeedbackTable';
import StudentInformationModal from '~components/StudentInformationModal';

let teacherInfoSwiper;

const TeacherClassRooms = () => {
    const [studentId, setStudentId] = React.useState(null);
    const mdStudentInfo = React.useRef(true);

    const showStudentModal = (studentId) => {
        setStudentId(studentId);
        $(mdStudentInfo.current).modal('show');
    }

    const unMountComponents = () => {
        mdStudentInfo.current = false;
    }

    const initSwiper = () => {
        teacherInfoSwiper = new Swiper('.swiper-container', {
            loop: false,
            freeModeMomentum: false,
            preventInteractionOnTransition: true,
            simulateTouch: false,
            autoHeight: true,
        });
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

    const updateHeight = () => {
        teacherInfoSwiper.updateAutoHeight(500, false);
    }

    React.useEffect(() => {
        initSwiper();
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
                        <div className="tab-navigation">
                            <ul className="list-tab" id="js-list-tab">
                                <li className="tab-item">
                                    <span className="tab-link active" data-index={0}><i className="far fa-calendar-alt"></i> Upcoming classes</span>
                                </li>
                                <li className="tab-item">
                                    <span className="tab-link " data-index={1}><i className="far fa-comment-alt"></i> Missing feedback</span>
                                </li>
                                <li className="tab-item">
                                    <span className="tab-link " data-index={2}><i className="far fa-calendar-check"></i> All Classes</span>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-navigation-content">
                            <div className="swiper-container" id="js-teacher__info">
                                <div className="teacher__info-wrap swiper-wrapper">
                                    {/*tab 1*/}
                                    <div className="swiper-slide">
                                        <div className="slide-tab-content">
                                            <UpComingTable updateSwiperHeight={updateHeight} showStudentModal={showStudentModal} />
                                        </div>
                                    </div>
                                    {/*/tab 1*/}
                                    {/*tab 2*/}
                                    <div className="swiper-slide">
                                        <div className="slide-tab-content">
                                            <MissingFeedbackTable updateSwiperHeight={updateHeight} />
                                        </div>
                                    </div>
                                    {/*/tab 2*/}
                                    {/*tab 3*/}
                                    <div className="swiper-slide">
                                        <div className="slide-tab-content">
                                            <AllClassesTable updateSwiperHeight={updateHeight} showStudentModal={showStudentModal} />
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
                studentId={studentId}
            />
        </>
    )
}


const domContainer = document.getElementById('react-teacher-classrooms');
ReactDOM.render(<TeacherClassRooms />, domContainer);