import React from 'react';
import ReactDOM from 'react-dom';

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

export default TeacherComment;