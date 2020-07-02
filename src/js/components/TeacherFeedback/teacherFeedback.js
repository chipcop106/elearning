import React from 'react';
import ReactDOM from 'react-dom';
import {randomId} from '../../utils';
import styles from '../TeacherFeedback/teacherFeedback.module.scss';

const initialState = {
    averageRate: 4.5,
    feedbacks: [
        {   
            id:randomId(),
            stName: 'Truong Van Lam',
            stAvatar: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
            stFeedback: 'Hello my world',
            lessonTime: '12/06/2020 10:30AM (Vietnam Time)',
            lessonName: 'Lesson 6: ReactJS application',
            rating: '3',
            teacherComments: [
                {
                    id:randomId(),
                    dateTime: new Date(),
                    teacherName: 'Kelly Clarkson',
                    teacherAvatar: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
                    content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error earum
                    molestias consequatur, iusto accusantium minima est saepe porro id odit nam, numquam
                    voluptates quis repudiandae veniam. Provident illum et voluptate. Lorem ipsum dolor sit,
                    amet consectetur adipisicing elit. Quaerat aliquam magni impedit vitae sit expedita totam
                    labore neque, dolores eos veritatis? Qui nisi, ipsa nostrum nulla labore esse dicta.
                    Aspernatur`,
                    edited:false,
                },
                {
                    id:randomId(),
                    dateTime: new Date(),
                    teacherName: 'Holy Breaker',
                    teacherAvatar: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
                    content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error earum
                    molestias consequatur, iusto accusantium minima est saepe porro id odit nam, numquam
                    voluptates.`,
                    edited:false,
                }
            ]
        },
        {
            id:randomId(),
            stName: 'Truong Van Lam',
            stAvatar: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
            stFeedback: 'Hello my world',
            lessonTime: '12/06/2020 10:30AM (Vietnam Time)',
            lessonName: 'Lesson 6: ReactJS application',
            rating: '3',
            teacherComments: [
                {
                    id:randomId(),
                    dateTime: new Date(),
                    teacherName: 'Kelly Clarkson',
                    teacherAvatar: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
                    content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error earum
                    molestias consequatur, iusto accusantium minima est saepe porro id odit nam, numquam
                    voluptates quis repudiandae veniam. Provident illum et voluptate. Lorem ipsum dolor sit,
                    amet consectetur adipisicing elit. Quaerat aliquam magni impedit vitae sit expedita totam
                    labore neque, dolores eos veritatis? Qui nisi, ipsa nostrum nulla labore esse dicta.
                    Aspernatur`,
                    edited:false,
                },
                {
                    id:randomId(),
                    dateTime: new Date(),
                    teacherName: 'Holy Breaker',
                    teacherAvatar: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
                    content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error earum
                    molestias consequatur, iusto accusantium minima est saepe porro id odit nam, numquam
                    voluptates.`,
                    edited:false,
                }
            ]
        }
    ]
}

const TeacherComment = ({id, teacherName, teacherAvatar, dateTime, commentContent, handleUpdateComment}) => {
    const [content, setContent] = React.useState(commentContent);
    const [editContent, setEditContent] = React.useState(content);
    const [editComment, setEditComment] = React.useState(false);

    const contentRef = React.createRef();
    const editBoxRef = React.createRef();
    
    const toggleBox = () => {
        if(editComment){
            contentRef.current.style.display = 'none';
            editBoxRef.current.style.display = 'block';
        }else{
            editBoxRef.current.style.display = 'none';
            contentRef.current.style.display = 'block';
        }
    }

    const _showEditBox = () => {
        setEditContent(content);
        setEditComment(true);
    }

    const _hideEditBox = () => {
        setEditContent(content);
        setEditComment(false);
       
    }

    const _saveEditComment = () => {
        setContent(editContent);
        handleUpdateComment(id, editContent);
        setEditComment(false);
    }

    const _onChange = (event) => {
        event.preventDefault();
        setEditContent(event.target.value);
    }

    React.useEffect(() => {
        toggleBox();
    }, [editComment])

    return (
        <>
        <div className="tc-comment">
            <img src={teacherAvatar} alt="avatar " className="avatar avatar rounded-circle object-fit" />
            <div className="tc-content"  ref={contentRef}>
                <div className="box">
                    <p className="teacher-name">{teacherName}</p>
                    <p className="mg-b-0">{content}</p>
                 
                </div>
                <div className="meta">
                    <div className="date">Comment at 10:30 AM | 20/10/2020</div>
                </div>
                <span type="button" className="edit-box" onClick={_showEditBox}><i className="fa fa-edit" /></span>
            </div>
            <div className="edit-form flex-grow-1 mg-l-10 rounded-10 bd-1 bd-primary" ref={editBoxRef}>
                <textarea className="form-control" rows="5" onChange={_onChange} value={editContent}/>
                <div className="mg-t-10">
                    <button type="button" className="btn btn-primary mg-r-10 btn-sm" onClick={_saveEditComment}><i className="fa fa-save mg-r-5"></i> Save</button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={_hideEditBox}><i className="fa fa-times mg-r-5"></i> Cancel</button>
                </div>
            </div>
        </div>
        </>
    )
}



const FeedbackRow = ({stName, stAvatar,stFeedback, lessonTime, lessonName, teacherComments, rating, handleUpdateComment}) => {

    return (
        <div className="fb-item">
            <div className="fb-avatar">
                <img src="../../assets/img/teacher.jpg" alt="avatar" className="avatar" />
            </div>
            <div className="fb-info">
                <div className="name-rating">
                    <p className="name">{stName}</p>
                    <div className="rating-wrap">
                        <div className="rating">
                            <i className="far fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                        </div>
                    </div>
                </div>
                <div className="feedback-comment">
                    <p className="tx-gray-500 tx-bold">The student didn't leave any feedback for this class</p>
                </div>
                <div className="metas">
                    <div className="meta">
                        Class Time: <span>{lessonTime}</span>
                    </div>
                    <div className="meta">
                       <span>{lessonName}</span>
                    </div>
                </div>
                <div className="reply-box">
                    <div className="form-group cmt-box">
                        <textarea rows={5} className="form-control" defaultValue={""} />
                    </div>
                    <div className="cmt-action">
                        <a href={`#`} className="btn btn-primary mg-r-10">Submit</a>
                        <a href={`#`} className="btn btn-light btn-cancel-form">Cancel</a>
                    </div>
                </div>
                <div className="actions">
                    <a href={`#`} className="btn btn-sm btn-outline-twitter btn-icon btn-reply"><i className="fas fa-reply" /> Reply</a>
                </div>
                <div className="tc-comment-wrap">
                    <h6 className="mg-b-15">The teacher had commented on this feedback:</h6>
                    {!!teacherComments && teacherComments.length > 0 && teacherComments.map(comment => <TeacherComment 
                        key={`${comment.id}`}
                        id={comment.id}
                        teacherName={comment.teacherName}
                        teacherAvatar={comment.teacherAvatar}
                        dateTime={comment.dateTime}
                        commentContent={comment.content}
                        handleUpdateComment={handleUpdateComment}
                    />) }
                
                </div>
               
            </div>
        </div>

    )
}

const reducer = (prevState, {type, action}) =>{
    switch (type) {
     
        default: return prevState;
            break;
    }
}

const TeacherFeedback = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const handleUpdateComment = (id, content) =>{
        console.log({id, content});
    }
    return (
        <div>
            <div className="d-xl-flex align-items-center justify-content-between mg-b-30">
                <h3 className="mg-b-0 gradient-heading"><i className="fas fa-comment-dots" /> FEEDBACK</h3>
            </div>
            <div className="mg-t-30 feedback-container">
                <div className="fb-summary-container">
                    <p className="tx-16">Last 100 Parent Feedback Average: <span className="tx-warning tx-20 tx-bold">{state.averageRate}</span></p>
                    <p className="tx-gray-500 tx-14">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus iure
                    doloremque aperiam neque, tenetur harum soluta non pariatur explicabo sed ab vero assumenda dolore
        molestias, dicta voluptates officiis error tempora?</p>
                    <div className="fb-summary">
                        <div className="fb-type">
                            <div className="fb-radio">
                                <label>
                                    <input type="radio" name="fbType" group="feedback" defaultChecked />
                                    <span>All feedbacks <span className="number">882</span></span>
                                </label>
                            </div>
                        </div>
                        <div className="fb-type">
                            <div className="fb-radio">
                                <label>
                                    <input type="radio" name="fbType" group="feedback" />
                                    <span>5 <i className="fa fa-star tx-warning"></i> Excellent <span className="number">882</span></span>
                                </label>
                            </div>
                        </div>
                        <div className="fb-type">
                            <div className="fb-radio">
                                <label>
                                    <input type="radio" name="fbType" group="feedback" />
                                    <span>4 <i className="fa fa-star tx-warning"></i> Good<span className="number">10</span></span>
                                </label>
                            </div>
                        </div>
                        <div className="fb-type">
                            <div className="fb-radio">
                                <label>
                                    <input type="radio" name="fbType" group="feedback" />
                                    <span>3 <i className="fa fa-star tx-warning"></i> Average<span className="number">2</span></span>
                                </label>
                            </div>
                        </div>
                        <div className="fb-type">
                            <div className="fb-radio">
                                <label>
                                    <input type="radio" name="fbType" group="feedback" />
                                    <span>2 <i className="fa fa-star tx-warning"></i> Bad<span className="number">2</span></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fb-list">
                    {!!state.feedbacks && state.feedbacks.length > 0 && [...state.feedbacks].map(fb =>  <FeedbackRow
                        key={`${fb.id}`}
                        stName={fb.stName} 
                        stAvatar={fb.stAvatar}
                        stFeedback={fb.stFeedback}
                        lessonTime={fb.lessonTime}
                        lessonName={fb.lessonName}
                        teacherComments={fb.teacherComments}
                        rating={fb.rating}
                        handleUpdateComment={handleUpdateComment}
                    />)}
                   
                </div>
            </div>
            <nav aria-label="Page navigation" className="mg-t-10">
                <ul className="pagination mg-b-0 justify-content-end">
                    <li className="page-item disabled"><a className="page-link page-link-icon" href="#"><i data-feather="chevron-left" /></a></li>
                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link page-link-icon" href="#"><i data-feather="chevron-right" /></a></li>
                </ul>
            </nav>
        </div>


    )
}

const domContainer = document.getElementById('react-teacher-feedback');
ReactDOM.render(<TeacherFeedback />, domContainer);