import React from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import 'react-toastify/scss/main.scss';
import { toastInit } from "~src/utils";
import { REQUEST_SUCCESS, FILL_ALL } from '~components/common/Constant/toast';

import styles from "~components/TeacherSupportModal.module.scss"

const initialState = {
    nguoigui: "",
    title: "",
    content: "",
    file: "",
}

const TeacherSupportModal = () => {
    const [state, setState] = React.useState(initialState);
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

    const handleSubmit = () => {
        if (state.nguoigui.length <= 0 ||
            state.title.length <= 0 ||
            state.content.length <= 0 ||
            !state.file
        ) {
            submitAlert()
        }
        else {
            /* Call API */
            submitSuccess();
            console.log(state)
            $('#md-teacher-support').fadeOut(500, function () {
                $('#md-teacher-support').modal('hide');
            });
        }
    }

    return <div className="modal fade effect-scale" id="md-teacher-support" tabIndex="-1" role="dialog" aria-labelledby="active-slot"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-info" role="document">
            <div className="modal-content">
                <div className="modal-header bg-info">
                    <h5 className="modal-title tx-white">Info</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span className="tx-white" aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-row align-items-center">
                        <div className="form-group col-sm-2 col-label-fixed">
                            <p className="mg-b-0 tx-medium">Người gửi:</p>
                        </div>
                        <div className="form-group col-sm-10">
                            <input type="text" className="form-control" name="nguoigui"
                                value={state.nguoigui}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row align-items-center">
                        <div className="form-group col-sm-2 col-label-fixed">
                            <p className="mg-b-0 tx-medium">Tiêu đề:</p>
                        </div>
                        <div className="form-group col-sm-10">
                            <input type="text" className="form-control" name="title"
                                value={state.title}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row align-items-center">
                        <div className="form-group col-sm-2 col-label-fixed">
                            <p className="mg-b-0 tx-medium">Nội dung:</p>
                        </div>
                        <div className="form-group col-sm-10">
                            <textarea type="text" className="form-control" name="content"
                                value={state.content}
                                onChange={handleChange}>
                            </textarea>
                        </div>
                    </div>
                    <div className="form-row align-items-center">
                        <div className="form-group col-sm-2 col-label-fixed">
                            <p className="mg-b-0 tx-medium">File đính kèm:</p>
                        </div>
                        <div className="form-group col-sm-10">
                            <input type="file" name="file" onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Send</button>
                </div>
            </div>
        </div>
    </div>
}

export default TeacherSupportModal;