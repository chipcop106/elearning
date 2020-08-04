import React from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import 'react-toastify/scss/main.scss';
import { randomId } from "~src/utils"
import { toastInit } from "~src/utils";
import { REQUEST_SUCCESS, FILL_ALL } from '~components/common/Constant/toast';
import {addSupportTicket} from '~src/api/teacherAPI';
import TinyEditor,{ imageUploadHandle } from '~components/common/TinyEditor';
import styles from "~components/TeacherSupportModal.module.scss"

const editorOptions = {
    min_height: 300,
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
        'table',
    ],
    // quickbars_insert_toolbar: 'quicktable image table',
    // quickbars_selection_toolbar: 'bold italic underline | formatselect | blockquote quicklink',
    // contextmenu: 'undo redo | inserttable | cell row column deletetable | help',
    toolbar:
        'undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist  | removeformat | image link',
    
}

const initialState = {
    nguoigui: "",
    title: "",
    content: "",
    file: "",
}

const TeacherSupportModal = ({refreshList}) => {
    const [state, setState] = React.useState(initialState);
    const [editorContent, setEditorContent] = React.useState('');
    const submitSuccess = () => toast.success(REQUEST_SUCCESS, toastInit);
    const submitAlert = () => toast.warn(FILL_ALL, toastInit);

  

    const handleChange = (e) => {
        const target = e.target;
        const value = target.type === "file" ? target.files[0] : target.value;
        const key = target.getAttribute("name");
        setState({
            ...state,
            [key]: value,
        })
    }

    const handleSubmit = async () => {
        if(state.title.length <= 0 || editorContent.length <= 0){ submitAlert(); return;}
        try {
            const res = await addSupportTicket({
                SupportTitle: state?.title ?? '',
                SupportContent: editorContent || ''
            })
            if(res.Code === 1){
                submitSuccess();
                $('#md-teacher-support').fadeOut(500, function () {
                    $('#md-teacher-support').modal('hide');
                });
                refreshList && refreshList();
            }
        }catch (error) {
            console.log(error?.message ?? 'Submit ticket không thành công')
        }
    }

    const _handleEditorChange = (content, editor) => {
        setEditorContent(content);
        console.log(content);
    }

    React.useEffect(() => {
        let focusEvent = $(document).on('focusin', function(e) {
            if ($(e.target).closest(".tox").length) {
              e.stopImmediatePropagation();
            }
        });
        return () => {
            focusEvent.remove();
        }
    },[]);


    React.useEffect(() => {
        console.log(state);
    },[state]);

    return <div className="modal fade effect-scale" id="md-teacher-support" tabIndex="-1" role="dialog" aria-labelledby="active-slot"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-primary" role="document">
            <div className="modal-content">
                <div className="modal-header bg-primary">
                    <h5 className="modal-title tx-white"><i className="fas fa-send-o"></i> Create ticket</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span className="tx-white" aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-row align-items-center">
                        <div className="form-group col-sm-2 col-label-fixed">
                            <p className="mg-b-0 tx-medium">Title:</p>
                        </div>
                        <div className="form-group col-sm-10">
                            <input type="text" className="form-control" name="title"
                                value={state.title}
                                onChange={handleChange} />
                        </div>
                    </div>
                 
                    <div className="form-row ht-300">
                        <div className="form-group col-sm-2 col-label-fixed">
                            <p className="mg-b-0 tx-medium mg-t-10">Content:</p>
                        </div>
                        <div className="form-group col-sm-10">
                        <TinyEditor options={{
                                    ...editorOptions,
                                    placeholder: 'Your content...'
                                }}
                                    onChangeEvent={_handleEditorChange}
                                />
                        </div>
                    </div>
                   
           
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-light" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Send</button>
                </div>
            </div>
        </div>
    </div>
}

export default TeacherSupportModal;