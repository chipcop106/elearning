import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import { getEvaluation } from "~src/api/teacherAPI";
import { randomId } from '~src/utils';
import { appSettings } from '~src/config';
import styles from './teacherFeedbackDetail.module.scss';
import Select from 'react-select';



const initialState = {
    isLoading: true,
    lessonInfo: null,
    note: '',
    grammar: '',
    pronounce: '',
    memorize: '',
    summary: '',
    vocabulary: '',
    finishedType: 0,
    finishedOptions: null,
    studentComments: [
        {
            id: randomId(),
            dateTime: new Date(),
            teacherName: 'Kelly Clarkson',
            teacherAvatar: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
            content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error earum
            molestias consequatur, iusto accusantium minima est saepe porro id odit nam, numquam
            voluptates quis repudiandae veniam. Provident illum et voluptate. Lorem ipsum dolor sit,
            amet consectetur adipisicing elit. Quaerat aliquam magni impedit vitae sit expedita totam
            labore neque, dolores eos veritatis? Qui nisi, ipsa nostrum nulla labore esse dicta.
            Aspernatur`,
            editted: false,
        },
        {
            id: randomId(),
            dateTime: new Date(),
            teacherName: 'Holy Breaker',
            teacherAvatar: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
            content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error earum
            molestias consequatur, iusto accusantium minima est saepe porro id odit nam, numquam
            voluptates.`,
            editted: false,
        }
    ],
}

const reducer = (prevState, { type, payload }) => {
    switch (type) {
        case "UPDATE_STATE":
            return {
                ...prevState,
                [payload.key]: payload.value
            }
            break;

        default:
            break;
    }
}

const TeacherFeedbackDetail = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const updateState = (key, value) => {
        dispatch({ type: 'UPDATE_STATE', payload: { key, value } })
    }


    const getFeedbackDetail = async () => {
        updateState('isLoading', true);
        try {
            const params = getParamsUrl();
            if (!params.has('ID')) return;
            console.log(params.get('ID'));
            const res = await getEvaluation({ BookingID: parseInt(params.get('ID')) });
            res.Code === 1 && updateState('lessonInfo', {
                ...state.lessonInfo,
                ...res.Data,
                note: decodeURI(res.Data?.Note ?? ''),
                grammar: decodeURI(res.Data?.Grammar ?? ''),
                pronounce: decodeURI(res.Data?.Pronunciation ?? ''),
                memorize: decodeURI(res.Data?.SentenceDevelopmentAndSpeak ?? ''),
                vocabulary: decodeURI(res.Data?.Vocabulary ?? ''),
                finishedType: res.Data?.FinishedTypeString ?? '',
            });
        } catch (error) {
            console.log(error?.message ?? 'Lỗi gọi api getEvaluation, vui lòng xem lại tham số');
        }
        updateState('isLoading', false);
    }


    React.useEffect(() => {
        console.log(state);
    }, [state]);

    const getParamsUrl = () => {
        if (typeof window == undefined) return;
        const params = new URLSearchParams(window.location.search);
        return params;
    }

    React.useEffect(() => {
        getFeedbackDetail();
    }, []);

    return (<>
        <h3 className="text-dark font-weight-bold mg-b-30">Lesson Detail</h3>
        <div className="row">
            <div className="col-xl-4 col-lg-5 mg-b-30">
                <div className="card card-custom lesson-sidebar">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-12 mg-b-15">
                                {/* <!--thông tin buổi học--> */}
                                <div className="">
                                    <h5 className="mg-b-15">Lesson information</h5>
                                    <div className="infomation__wrap">
                                        <div className="st-time">
                                            <p className="st-teacher-text d-flex justify-content-between">
                                                <span className=""><i className="fa fa-book-open tx-primary st-icon wd-20 mg-r-5"></i>Course: </span>
                                                <span className="">{!!state.lessonInfo && !!state.lessonInfo.DocumentName ? state.lessonInfo.DocumentName : ''}</span>
                                            </p>
                                        </div>
                                        <div className="st-time">
                                            <p className="st-teacher-text d-flex justify-content-between">
                                                <span className=""><i className="fa fa-book-reader tx-primary graduate st-icon wd-20 mg-r-5"></i>Lesson:</span>
                                                <span className="st-tengv">{!!state.lessonInfo && !!state.lessonInfo.Material ? state.lessonInfo.Material : ''}</span>
                                            </p>
                                        </div>
                                        <div className="st-time">
                                            <p className="st-teacher-text d-flex justify-content-between">
                                                <span className="tx-black tx-normal"><i className="fa fa-clock tx-primary clock st-icon wd-20 mg-r-5"></i>Time:</span>
                                                <span className="">{!!state.lessonInfo && !!state.lessonInfo.ScheduleDate ? state.lessonInfo.ScheduleDate : ''}</span>
                                            </p>
                                        </div>
                                        <div className="st-time">
                                            <p className="st-teacher-text d-flex justify-content-between">
                                                <span className=""><i className="fa fa-book tx-primary open st-icon wd-20 mg-r-5"></i>Material:</span>
                                                <span><a href={!!state.lessonInfo && !!state.lessonInfo.MaterialLink ? state.lessonInfo.MaterialLink : ''} target="_blank">{!!state.lessonInfo && !!state.lessonInfo.Material ? state.lessonInfo.Material : ''}</a></span>
                                            </p>
                                        </div>
                                        <div className="st-time">
                                            <div className="st-teacher-text d-flex justify-content-between align-items-center">
                                                <span className=""><i className="fas fa-lightbulb tx-primary open st-icon wd-20 mg-r-5"></i>Finished type:</span>
                                                <span className="">{!!state.lessonInfo && !!state.lessonInfo.finishedType ? state.lessonInfo.finishedType : ''}</span>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--/thông tin buổi học--> */}
                            </div>
                            <div className="col-sm-12">
                                {/* <!--thang danh gia--> */}
                                <div className="infomation__wrap">
                                    <h5 className="mg-b-15 mg-md-t-15 mg-t-15 mg-md-t-0-f">Student Information</h5>
                                    <div className="st-time">
                                        <p className="st-teacher-text d-flex justify-content-between">
                                            <span className=""><i className="fa fa-user-graduate  tx-primary st-icon wd-20 mg-r-5"></i>Name: </span>
                                            <span className="">{!!state.lessonInfo && !!state.lessonInfo.StudentName ? state.lessonInfo.StudentName : ''}</span>
                                        </p>
                                    </div>
                                    <div className="st-time">

                                        <p className="st-teacher-text d-flex justify-content-between">

                                            <span className=""><i className="fa fa-thumbs-up tx-primary st-icon wd-20 mg-r-5"></i>Feedback: </span>
                                            <span className="tx-primary">
                                                {
                                                    (!!state.lessonInfo && !!state.lessonInfo.StudentRating ? state.lessonInfo.StudentRating : 0) === 0 ? (<span className="tx-black">No rating</span>) : (
                                                        [...Array(5)].map((el, index) => (5 - index) <= state.lessonInfo.StudentRating
                                                            ? <i key={`${index}`} className="fas fa-star" />
                                                            : <i key={`${index}`} className="far fa-star" />))
                                                }
                                                {/* <i className="fas fa-star st-icon-star"></i>
                                                        <i className="fas fa-star st-icon-star"></i>
                                                        <i className="fas fa-star st-icon-star"></i>
                                                        <i className="fas fa-star st-icon-star"></i>
                                                        <i className="fas fa-star-half-alt st-icon-star"></i> */}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="st-time">
                                        <p className="st-teacher-text d-flex justify-content-between mg-b-5">
                                            <span className=""><i className="fa fa-comment tx-primary st-icon wd-20 mg-r-5"></i>Evalution: </span>
                                            <span className="">{!!state.lessonInfo && !!state.lessonInfo.StudentNode ? state.lessonInfo.StudentNode : ''}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-8 col-lg-7">
                <div className="card  mg-b-30">
                    <div className="card-header">
                        <h5 className="mg-b-5">Vocabulary</h5>
                        <p className="tx-gray-300 mg-b-0">Feedback vocabulary of student</p>
                    </div>
                    <div className="card-body">
                        <div className="st-danhgianguphap ">
                            {
                                !!state.lessonInfo && !!state.lessonInfo.vocabulary && <div className="" dangerouslySetInnerHTML={{ __html: state.lessonInfo.vocabulary }}></div>
                            }
                        </div>
                    </div>
                </div>
                <div className="card  mg-b-30">
                    <div className="card-header">
                        <h5 className="mg-b-5">Grammar</h5>
                        <p className="tx-gray-300 mg-b-0">Feedback Grammar of student</p>
                    </div>
                    <div className="card-body">
                        <div className="st-danhgianguphap ">
                            <div className="" dangerouslySetInnerHTML={{ __html: !!state && !!state.lessonInfo && !!state.lessonInfo.grammar ? state.lessonInfo.grammar :'' }}></div>
                          

                        </div>
                    </div>
                </div>
                <div className="card  mg-b-30">
                    <div className="card-header">
                        <h5 className="mg-b-5">Pronounce</h5>
                        <p className="tx-gray-300 mg-b-0">Feedback Pronounce of student</p>
                    </div>
                    <div className="card-body">
                        <div className="st-danhgianguphap ">
                            <div className="" dangerouslySetInnerHTML={{ __html: !!state && !!state.lessonInfo && !!state.lessonInfo.pronounce ? state.lessonInfo.pronounce : '' }}></div>
                        </div>
                    </div>
                </div>
                <div className="card  mg-b-30">
                    <div className="card-header">
                        <h5 className="mg-b-5">Sentence Development And Speak</h5>
                        <p className="tx-gray-300 mg-b-0">Feedback sentence development and speak of student</p>
                    </div>
                    <div className="card-body">
                        <div className="st-danhgianguphap ">
                            <div className="" dangerouslySetInnerHTML={{ __html: !!state && !!state.lessonInfo && !!state.lessonInfo.memorize ? state.lessonInfo.memorize : '' }}></div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h5 className="mg-b-5">Note</h5>
                        <p className="tx-gray-300 mg-b-0">Note for student</p>
                    </div>
                    <div className="card-body">
                        <div className="" dangerouslySetInnerHTML={{ __html: !!state && !!state.lessonInfo && !!state.lessonInfo.note ? state.lessonInfo.note  : '' }}></div>
                    </div>
                </div>
            </div>
        </div>
   
    </>
    )
}

ReactDOM.render(<TeacherFeedbackDetail />, document.getElementById('react-teacher-feedback-detail'));