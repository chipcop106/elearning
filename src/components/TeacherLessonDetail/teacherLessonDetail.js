import React, {useReducer} from 'react';
import ReactDOM from 'react-dom';
import SkeletonLessonDetail from "../common/Skeleton/SkeletonLessonDetail";
import TinyEditor,{ imageUploadHandle } from '~components/common/TinyEditor';
import { getEvaluation } from "~src/api/studentAPI";
import {addEvaluation} from "~src/api/teacherAPI";
import {randomId} from '~src/utils'

const editorOptions = {
    height: 300,
    id:randomId(),
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
    // quickbars_insert_toolbar: 'quicktable image table',
    // quickbars_selection_toolbar: 'bold italic underline | formatselect | blockquote quicklink',
    // contextmenu: 'undo redo | inserttable | cell row column deletetable | help',
    toolbar:
        'undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | table media image link',
    
}

const initialState = {
    isLoading:true,
    lessonInfo: null,
    note:'',
    grammar: '',
    pronounce: '',
    memorize:'',
    summary:'',
    vocabulary:'',
    studentComments:[
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

const reducer = (prevState, {type, payload}) => {
    switch (type) {
        case "UPDATE_STATE":
            return {
                ...prevState,
                [payload.key]:payload.value
            }
            break;
    
        default:
            break;
    }
}

const TeacherLessonDetail = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const updateState = (key, value) => {
        dispatch({type: 'UPDATE_STATE', payload:{key, value}})
    }

    const getAPI = async () => {
        updateState('isLoading', true);
        try {
            const params = getParamsUrl();
            if(!params.has('ID')) return;
            const evaluation = await getEvaluation({ BookingID: params.get('ID') });
            evaluation.Code === 1 && updateState('lessonInfo', evaluation.Data);
        } catch (error) {
            console.log(error?.message ?? 'Lỗi gọi api, vui lòng xem lại tham số');
        }
        updateState('isLoading', false);
    }

    const _submitFeedback = async () => {
        const res = await addEvaluation({
            ElearnBookingID: parseInt(state?.lessonInfo.ElearnBookingID || 0) ,
            Pronunciation:state?.pronounce ?? '',
            Vocabulary:state?.vocabulary ?? '',
            Grammar:state?.grammar ?? '',
            SentenceDevelopmentAndSpeak:state?.memorize ?? '',
            Note:state?.note ?? '',
        });
        console.log(res);
    }

    React.useEffect(() => {
        console.log(state);
    }, [state]);

    const getParamsUrl = () => {
        if(typeof window == undefined) return;
        const params = new URLSearchParams(window.location.search); 
        return params;
      }

    React.useEffect(() => {
        getAPI()
    }, []);

    return (<>
        {
            state.loading ? <SkeletonLessonDetail /> : (
                <>
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            {/* <!--thông tin buổi học--> */}
                            <div className="st-thontinbuoihoc">
                                <h5 className="main-title">Lesson information</h5>
                                <div className="infomation__wrap">
                                    <div className="st-time">
                                        <p className="st-teacher-text">
                                            <i className="fa fa-book st-icon wd-20 mg-r-5"></i>
                                            <span>Course name: <span className="tx-primary">{!!state.lessonInfo && !!state.lessonInfo.DocumentName && state.lessonInfo.DocumentName}</span></span>
                                        </p>
                                    </div>
                                    <div className="st-time">
                                        <p className="st-time-text">
                                            <i className="fa fa-user-clock st-icon wd-20 mg-r-5"></i>
                                            <span className="tx-black tx-normal">Time:</span> <span className="tx-primary">{!!state.lessonInfo && !!state.lessonInfo.ScheduleTimeVN && state.lessonInfo.ScheduleTimeVN}</span>
                                        </p>
                                    </div>
                                    <div className="st-time">
                                        <p className="st-teacher-text">
                                            <i className="fa fa-user-graduate st-icon wd-20 mg-r-5"></i>
                                            <span>Student:</span> <span className="st-tengv tx-primary">{!!state.lessonInfo && !!state.lessonInfo.StudentName && state.lessonInfo.StudentName}</span>
                                        </p>
                                    </div>
                                    <div className="st-time">
                                        <p className="st-teacher-text">
                                            <i className="fa fa-book-open st-icon wd-20 mg-r-5"></i>
                                            <span>Material: <a href={!!state.lessonInfo && !!state.lessonInfo.MaterialLink ? state.lessonInfo.MaterialLink : ''} target="_blank">{!!state.lessonInfo && !!state.lessonInfo.Material && state.lessonInfo.Material}</a> </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* <!--/thông tin buổi học--> */}
                        </div>
                        <div className="col-md-6 col-sm-12">
                            {/* <!--thang danh gia--> */}
                            <div className="st-thangdanhgia">
                                <h5 className="main-title">Rating</h5>
                                <div className="st-rating">
                                    <div className="cell">
                                        <span className="label">Grammar:</span>
                                    </div>
                                    <div className="cell">
                                        <p className="st-noidung-rating">
                                            <i className="fas fa-star st-icon-star"></i>
                                            <i className="fas fa-star st-icon-star"></i>
                                            <i className="fas fa-star st-icon-star"></i>
                                            <i className="fas fa-star st-icon-star"></i>
                                            <i className="fas fa-star-half-alt st-icon-star"></i>
                                            <span className="badge badge-light tx-success mg-l-5"><i
                                                className="fa fa-check-circle"></i> Very Good</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="st-rating">
                                    <div className="cell">
                                        <span className="label">Volcabualary:</span>
                                    </div>
                                    <div className="cell">
                                        <p className="st-noidung-rating">
                                            <i className="fas fa-star st-icon-star"></i>
                                            <i className="fas fa-star st-icon-star"></i>
                                            <i className="fas fa-star st-icon-star"></i>
                                            <i className="fas fa-star st-icon-star"></i>
                                            <i className="fas fa-star-half-alt st-icon-star"></i>
                                            <span className="badge badge-light tx-success mg-l-5"><i
                                                className="fa fa-check-circle"></i> Very Good</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="st-rating">
                                    <div className="cell">
                                        <span className="label">Pronunciation:</span>
                                    </div>
                                    <div className="cell">
                                        <p className="st-noidung-rating">
                                            <i className="fas fa-star st-icon-star"></i>
                                            <i className="fas fa-star st-icon-star"></i>
                                            <i className="fas fa-star st-icon-star"></i>
                                            <i className="fas fa-star st-icon-star"></i>
                                            <i className="fas fa-star-half-alt st-icon-star"></i>
                                            <span className="badge badge-light tx-success mg-l-5"><i
                                                className="fa fa-check-circle"></i> Very Good</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="st-rating">
                                    <div className="cell">
                                        <span className="label">Fluency/Coherence:</span>
                                    </div>
                                    <div className="cell">
                                        <p className="st-noidung-rating">
                                            <i className="fas fa-star st-icon-star"></i>
                                            <i className="fas fa-star st-icon-star"></i>
                                            <i className="fas fa-star st-icon-star"></i>
                                            <i className="fas fa-star st-icon-star"></i>
                                            <i className="fas fa-star-half-alt st-icon-star"></i>
                                            <span className="badge badge-light tx-success mg-l-5"><i
                                                className="fa fa-check-circle"></i> Very Good</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="review__wrap sec">
                        <h5 className="main-title">Review</h5>

                        <div className="st-danhgianguphap  mg-b-30">
                            <div className="st-title-danhgia mg-b-15">
                                <h5 className="sub-title">Vocabulary:</h5>
                            </div>
                            <div>
                                <TinyEditor options={{
                                    ...editorOptions,
                                    placeholder: 'Vocabulary feedback...'
                                }}
                                    onChange={(content, editor) => updateState('vocabulary', content)}
                                />
                            </div>

                        </div>
                        {/* <!--Đánh giá phát âm--> */}
                        <div className="st-danhgianguphap  mg-b-30">
                            <div className="st-title-danhgia mg-b-15">
                                <h5 className="sub-title">Grammar:</h5>
                            </div>
                            <div>
                                <TinyEditor options={{
                                    ...editorOptions,
                                    placeholder: 'Grammar feedback...'
                                }}
                                    onChange={(content, editor) => updateState('grammar', content)}
                                />
                            </div>

                        </div>
                        {/* <!--Đánh giá phát âm--> */}
                        <div className="st-danhgianguphap  mg-b-30">
                            <div className="st-title-danhgia mg-b-15">
                                <h5 className="sub-title">Pronounce</h5>
                            </div>
                            <div>
                                <TinyEditor options={{
                                    ...editorOptions,
                                    placeholder: 'Pronounce feedback...'
                                }}
                                    onChange={(content, editor) => updateState('pronounce', content)}

                                />
                            </div>
                        </div>
                        {/* <!--/Đánh giá phát âm-->
                      <!--Từ cần ghi nhớ--> */}
                        <div className="st-danhgianguphap  mg-b-30">
                            <div className="st-title-danhgia mg-b-15">
                                <h5 className="sub-title">Sentence Development And Speak</h5>
                            </div>
                            <div>
                                <TinyEditor options={{
                                    ...editorOptions,
                                    placeholder: 'Sentence feedback...'
                                }}
                                    onChange={(content, editor) => updateState('memorize', content)}

                                />
                            </div>
                        </div>
                        {/* <!--/Từ cần ghi nhớ-->
                        
                      <!--Đánh giá chung--> */}
                        <div className="st-danhgianguphap  mg-b-30">
                            <div className="st-title-danhgia mg-b-15">
                                <h5 className="sub-title">General assessment</h5>
                            </div>
                            <div>
                                <TinyEditor options={{
                                    ...editorOptions,
                                    placeholder: 'Summary feedback...'
                                }}
                                    onChange={(content, editor) => updateState('summary', content)}

                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h5 className="main-title">
                            Note
                        </h5>
                        <div className="mg-b-30">
                            <TinyEditor options={{
                                ...editorOptions,
                                placeholder: 'Note feedback...'
                            }}
                                onChange={(content, editor) => updateState('note', content)}

                            />
                        </div>
                    </div>
                    <div className="d-flex mg-t-30">
                        <button className="btn btn-primary mg-r-15" onClick={_submitFeedback}><i className="fa fa-save mg-r-5"></i> Submit feedback</button>
                        <button className="btn btn-danger mg-r-15" onClick={() => alert('Redirected another url')}>Cancel</button>
                    </div>
                </>
            )}
    </>
    )
}

ReactDOM.render(<TeacherLessonDetail />, document.getElementById('react-teacher-lesson-detail'));