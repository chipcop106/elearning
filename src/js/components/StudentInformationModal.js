import React from 'react';
import ReactDOM from 'react-dom';

const StudentInformationModal = React.forwardRef(({ studentId }, ref) => {
    const [state, setState] = React.useState({
        stImageUrl: 'https://media.techz.vn/media2019/source/myphan/my-t32/ngoc-trinh.jpg',
        stName: 'Ngoc Trinh',
        stSex:'Female',
        stCourseLearning: 'IELST 8.0 Professional',
        stLastLesson: 'Lesson 6: React JS Application',
        stNation: 'Vietnam',
        stTimeZone: 'GMT+7',
        stDescription: 'Là một trong những mỹ nhân hàng đầu showbiz, không có gì bất ngờ khi Ngọc Trinh được rất nhiều người săn đón.'
    });

    const loadStudentInfo = () => {
        if (!!!studentId) return;
        console.log('Load ajax modal student id: ', studentId);
        //setState
    }

    React.useEffect(() => {
        loadStudentInfo();
    }, [studentId]);
    return (
        <>
            <div className="modal effect-scale show" tabIndex={-1} role="dialog" id="js-md-studentInfo" ref={ref}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Student information</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex">
                                <div className="flex-shrink-0 mg-r-15">
                                    <img src={state.stImageUrl} className="avatar-xxl avatar-xl rounded" />
                                </div>
                                <div className="flex-grow-1">
                                    <div className="d-flex mg-b-15">
                                        <div className="wd-150 tx-medium">
                                            <span>Full name:</span>
                                        </div>
                                        <div className="col">
                                            <span>{state.stName}</span>
                                        </div>
                                    </div>
                                    <div className="d-flex mg-b-15">
                                        <div className="wd-150 tx-medium">
                                            <span>Sex:</span>
                                        </div>
                                        <div className="col">
                                            {/* <span className="valign-middle mg-r-5 tx-primary"><i className="fa fa-mars" /></span> */}
                                            <span className="valign-middle mg-r-5 tx-primary"><i className="fa fa-venus" /></span>
                                            <span>{state.stSex}</span>
                                     
                                        </div>
                                    </div>
                                    <div className="d-flex mg-b-15">
                                        <div className="wd-150 tx-medium">
                                            <span>Nation:</span>
                                        </div>
                                        <div className="col">
                                            <span className="mg-r-5 valign-middle"><i className="flag-icon flag-icon-vn"></i> </span>
                                            <span>{state.stNation}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="d-flex mg-b-15">
                                        <div className="wd-150 tx-medium">
                                            <span>Timezone:</span>
                                        </div>
                                        <div className="col">
                                            <span>{state.stTimeZone}</span>
                                        </div>
                                    </div>
                                    <div className="d-flex mg-b-15">
                                        <div className="wd-150 tx-medium">
                                            <span>Learning course:</span>
                                        </div>
                                        <div className="col">
                                            <span>{state.stCourseLearning}</span>
                                        </div>
                                    </div>
                                    <div className="d-flex mg-b-15">
                                        <div className="wd-150 tx-medium">
                                            <span>Last lesson:</span>
                                        </div>
                                        <div className="col">
                                            <span>{state.stLastLesson}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="required-list mg-t-5 bd-t pd-t-5">
                                <div className="required-text-box mg-t-15">
                                    <label className="tx-medium"><i className="fas fa-info-circle mg-r-5"></i> Student description:</label>
                                    <p>{state.stDescription}</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default StudentInformationModal;