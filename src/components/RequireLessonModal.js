import React from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import 'react-toastify/scss/main.scss'
import { toastInit } from "~src/utils"
import { requestLessonAPI } from '~src/api/studentAPI';

import styles from "~components/RequireLessonModal.module.scss";

const initialState = {
  /* require: ["Require 1", "Require 2", "Require 3"],
  selectedRequire: [], */
  SpecialRequest: "",
}

const RequireLessonModal = ({
  BookingID,
  avatar = "default-avatar.png",
  TeacherUID,
  TeacherName,
  LessionMaterial,
  LessionName,
  SpecialRequest,
  date,
  start,
  end,
  DocumentName,
  SkypeID,
  callback,
  }) => {
  const [state, setState] = React.useState(initialState)
  const requireLesson = () => toast("Thank for your request!", toastInit);
  const requireLessonFail = () => toast("Some error happened, please retry!", toastInit);
  const requireLessonAlert = () => toast("Please fill your note", toastInit);

  const fetchAPI = async (params) => {
    const res = await requestLessonAPI(params);
    let result = res.Code;
    if (result === 1) //Success 
    {
      requireLesson();
      callback && callback(params.SpecialRequest, BookingID, TeacherUID);
    }
    else { //Fail
      requireLessonFail();
    }
  }

  const onSubmitRequire = () => {
    if (state.SpecialRequest.length <= 0) {
      requireLessonAlert();
    }
    else {
      /* Call API */
      fetchAPI({
        BookingID,
        SpecialRequest: state.SpecialRequest,
      })
      $('#js-md-required').fadeOut(500, function () {
        $('#js-md-required').modal('hide');
      });
    }
  }

  React.useEffect(() => {
    //$('.required-list ul li input').prop('checked', false);
    setState(initialState)
      //selectedRequire: []
  }, [BookingID]);

  return (
    <div className="modal effect-scale" tabIndex="-1" role="dialog" id="js-md-required">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <form action="" className="">
            <div className="modal-body">
              <div className="cr-item lesson-info">
                <div className="media">
                  <div className="teacher-information">
                    <a className="teacher-avatar" href={`teacherDetail.html?ID=${TeacherUID}`}>
                      <img src={avatar === "default-avatar.png" ?
                                `../assets/img/${avatar}` : avatar }
                        className="teacher-image" alt="" />
                      <p className="course-teacher tx-14 tx-gray-800 tx-normal mg-b-0 tx-center mg-t-5 d-block">
                        {TeacherName}</p>
                    </a>
                  </div>
                  <div className="media-body mg-l-20 pos-relative pd-b-0-f">
                    <h5 className="title mg-b-10 d-flex align-items-center">
                      <span className="badge badge-warning mg-r-5">Incoming</span>{' '}
                      <a href={`lessonDetail.html?ID=${BookingID}`} className="course-name tx-bold">{LessionName}</a>
                    </h5>
                    <div className="course-information tx-14">
                      <span className="mg-r-15 tx-gray-600 tx-medium"><i className="fa fa-calendar  tx-info mg-r-5"></i>
                        {date}</span>
                      <span className="mg-r-15 tx-gray-600 tx-medium"><i className="fa fa-clock  tx-info mg-r-5"></i>
                        {`Start: ${start}`}</span>
                      <span className="mg-r-15 tx-gray-600 tx-medium"><i className="fa fa-clock  tx-info mg-r-5"></i>
                        {`End: ${end}`}</span>
                    </div>
                    <div className="course-note mg-t-15">
                      <h6 className="mg-b-3">Lesson notes:</h6>
                      <p className="tx-14 mg-b-0"> {SpecialRequest} </p>
                    </div>
                    <div className="course-docs mg-t-15">
                      <h6 className="mg-b-3">Documents:</h6>
                      <div /* className="docs-lists" */>
                        {
                         /*  !!DocumentName && Array.isArray(DocumentName) && DocumentName.length > 0 &&
                          DocumentName.map((doc, index) =>
                            <a key={index} href={"#"} className="file-doc"><i className="fa fa-file mg-r-3"></i>
                              <span className="file-name">{doc.split('.')[0]}</span>
                              <span className="file-ext">{`.${doc.split('.')[1]}`}</span>
                            </a>
                          ) */
                          <a href={LessionMaterial} target="_blank">{DocumentName}</a>
                        }
                      </div>
                    </div>
                    <div className="required-list mg-t-15 bd-t pd-t-15">
                      {/* <ul className="list list-unstyled pd-l-0">
                        {
                          !!state.require && state.require.length > 0 && state.require.map((item, index) =>
                            <li key={index}>
                              <div className="custom-control custom-checkbox">
                                <input type="checkbox" id={`require-${index}`} name="selectedRequire" className="custom-control-input" onChange={handleChange} value={item} />
                                <label className="custom-control-label" htmlFor={`require-${index}`}>{item}</label>
                              </div>
                            </li>
                          )
                        }
                      </ul> */}
                      <div className="required-text-box mg-t-15">
                        <label className="tx-medium">Note for teachers:</label>
                        <div className="form-group">
                          <textarea name="message" id="" rows="4" className="form-control"
                          placeholder="Note for teacher"
                          value={state.SpecialRequest}
                          onChange={(e)=>setState({...state,SpecialRequest:e.target.value})} ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={onSubmitRequire}>Request</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default RequireLessonModal;