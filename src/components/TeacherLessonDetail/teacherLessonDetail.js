import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import SkeletonLessonDetail from "../common/Skeleton/SkeletonLessonDetail";
import TinyEditor, { imageUploadHandle } from '~components/common/TinyEditor';
import { addEvaluation, getBookingInfo } from "~src/api/teacherAPI";
import { getFinishedOptions } from '~src/api/optionAPI';
import { randomId } from '~src/utils';
import { appSettings } from '~src/config';
import styles from './teacherLessonDetail.module.scss';
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';

const editorOptions = {
    id: randomId(),
    min_height: 200,
    menubar: false,
    images_upload_handler: imageUploadHandle,
    images_reuse_filename: true,
    // toolbar: false,
    // menubar: false,
    inline: false,
    plugins: [
        'autolink lists link image ',
        'media table paste help wordcount',
        'lists',
        'autolink',
        'paste',
        'autoresize',
        'table',
    ],
    paste_data_images:false,
    paste_as_text:true,
    // quickbars_insert_toolbar: 'quicktable image table',
    // quickbars_selection_toolbar: 'bold italic underline | formatselect | blockquote quicklink',
    // contextmenu: 'undo redo | inserttable | cell row column deletetable | help',
    toolbar:
        'undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
    outdent indent | removeformat | table media image link',

}

const initialState = {
    isLoading: true,
    lessonInfo: null,
    note: '',
    grammar: '',
    pronounce: '',
    memorize: '',
    summary: '',
    vocabulary: '',
    finishedType: '',
    finishedOptions: [],
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

const TeacherLessonDetail = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const selectRef = React.useRef(true);

    const updateState = (key, value) => {
        dispatch({ type: 'UPDATE_STATE', payload: { key, value } })
    }

    const getBookingLessonInfo = async () => {
        updateState('isLoading', true);
        try {
            const params = getParamsUrl();
            if (!params.has('ID')) return;
            console.log(params.get('ID'));
            const evaluation = await getBookingInfo({ BookingID: parseInt(params.get('ID')) });
            evaluation.Code === 1 && updateState('lessonInfo', evaluation.Data);
        } catch (error) {
            console.log(error?.message ?? 'Lỗi gọi api getEvaluation, vui lòng xem lại tham số');
        }
        updateState('isLoading', false);
    }

    const getFinishedOpts = async () => {
        updateState('isLoading', true);
        try {
            const res = await getFinishedOptions();
            res.Code === 1 && updateState('finishedOptions', res.Data);
        } catch (error) {
            console.log(error?.message ?? 'Lỗi gọi api getFinishedOptions, vui lòng xem lại tham số');
        }
        updateState('isLoading', false);
    }

    const _submitFeedback = async () => {
        if(!state?.finishedType && !state.finishedType || state.finishedType === 0){
            toast.warning('Please select Finished type !!');
            selectRef.current.focus();
            return;
        }
        try {
            const res = await addEvaluation({
                ElearnBookingID: parseInt(state?.lessonInfo.BookingID || 0),
                Pronunciation: encodeURI(state?.pronounce ?? ''),
                Vocabulary: encodeURI(state?.vocabulary ?? ''),
                Grammar: encodeURI(state?.grammar ?? ''),
                SentenceDevelopmentAndSpeak: encodeURI(state?.memorize ?? ''),
                Note: encodeURI(state?.note ?? ''),
                FinishedType: parseInt(!!state.finishedType && !!state.finishedType ? state.finishedType.ID : 0)
            });
            if (res.Code === 1) {
                toast.success('Update feedback success, redirect after 2 second !!');
                setTimeout(() => window.location.href = '/ElearnTeacher/FeedbackDetail?ID=' + state.lessonInfo.BookingID, 2000)
            }
            res.Code !== 1 &&  toast.error('Update feedback failed !!');
        } catch (error) {
            console.log(error?.message ?? 'Lỗi gọi api addEvaluation, vui lòng xem lại tham số');
        }

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
        getFinishedOpts();
        getBookingLessonInfo();
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
                                                <a href={!!state.lessonInfo && !!state.lessonInfo.MaterialLink ? state.lessonInfo.MaterialLink : ''} target="_blank">{!!state.lessonInfo && !!state.lessonInfo.Material ? state.lessonInfo.Material : ''}</a>
                                            </p>
                                        </div>
                                        <div className="st-time">
                                            <div className="st-teacher-text d-flex justify-content-between align-items-center">
                                                <span className=""><i className="fas fa-lightbulb tx-primary open st-icon wd-20 mg-r-5"></i>Finished type:</span>
                                                <div className="flex-grow-1">
                                                    <Select
                                                        openMenuOnFocus
                                                        ref={selectRef}
                                                        key={option => `${option.ID}`}
                                                        loadingMessage={() => 'Select option is loading...'}
                                                        options={state?.finishedOptions}
                                                        getOptionLabel={option => `${option.FinishTypeName}`}
                                                        getOptionValue={option => `${option.ID}`}
                                                        onChange={(values) => updateState('finishedType', values)}
                                                        name="finishedType"
                                                        styles={appSettings.selectStyle}
                                                        placeholder="Type..."
                                                        defaultValue={state?.finishedType}
                                                        isSearchable={false}
                                                    />
                                                </div>

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
                                                    (!!state.LessonInfo && !!state.lessonInfo.StudentRating ? state.lessonInfo.StudentRating : 0) === 0 ? (<span className="tx-black">No rating</span>) : (
                                                        [...Array(5)].map((el, index) => (5 - index) <= state.LessonInfo.StudentRating
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
                                            <span className="">{!!state.LessonInfo && !!state.LessonInfo.StudentNode ? state.LessonInfo.StudentNode : ''}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="mg-y-30" style={{ borderStyle: "dashed" }} />
                        <div className="d-flex">
                            <button className="btn btn-primary mg-r-15" onClick={_submitFeedback}><i className="fa fa-save mg-r-5"></i> Submit feedback</button>
                            <button className="btn btn-icon btn-light mg-r-15" onClick={() => window.history.back()}><i className="fas fa-arrow-left mg-r-5"></i> Back</button>
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
                            <div>
                                <TinyEditor options={{
                                    ...editorOptions,
                                    placeholder: 'Vocabulary feedback...'
                                }}
                                    onChangeEvent={(content, editor) => updateState('vocabulary', content)}
                                />
                            </div>

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
                            <div>
                                <TinyEditor options={{
                                    ...editorOptions,
                                    placeholder: 'Grammar feedback...'
                                }}
                                    onChangeEvent={(content, editor) => updateState('grammar', content)}
                                />
                            </div>

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
                            <div>
                                <TinyEditor options={{
                                    ...editorOptions,
                                    placeholder: 'Pronounce feedback...'
                                }}
                                    onChangeEvent={(content, editor) => updateState('pronounce', content)}

                                />
                            </div>
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
                            <div>
                                <TinyEditor options={{
                                    ...editorOptions,
                                    placeholder: 'Sentence feedback...'
                                }}
                                    onChangeEvent={(content, editor) => updateState('memorize', content)}

                                />
                            </div>

                        </div>
                    </div>
                </div>
              
                <div className="card">
                    <div className="card-header">
                        <h5 className="mg-b-5">Note</h5>
                        <p className="tx-gray-300 mg-b-0">Note for student</p>
                    </div>
                    <div className="card-body">
                        <div>
                            <div className="">
                                <TinyEditor options={{
                                    ...editorOptions,
                                    placeholder: 'Note feedback...'
                                }}
                                    onChangeEvent={(content, editor) => updateState('note', content)}

                                />
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
    </>
    )
}

ReactDOM.render(<TeacherLessonDetail />, document.getElementById('react-teacher-lesson-detail'));