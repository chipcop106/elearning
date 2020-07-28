import React from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import 'react-toastify/scss/main.scss'
import { toastInit } from "~src/utils"
import { bookingLessonAPI } from "~src/api/studentAPI";

import styles from '~components/BookingLessonModal.module.scss';

const whoami = (localStorage.getItem("user")===null) ? {} :
  JSON.parse(localStorage.getItem('user'));

const initialState = {
  SpecialRequest: "",
}

const BookingLessonModal = ({
  style,
  StudyTimeID,
  LessionName = "Lesson Name",
  TeacherUID,
  TeacherIMG,
  TeacherName,
  Rate,
  date,
  start,
  end,
  note = null,
  documents = null,
  BookingID,
  onBook,
}) => {

  const [state, setState] = React.useState(initialState);

  const bookingToast = () => toast("Book lesson successful!", toastInit);
  const bookingToastFail = () => toast("Some errors happened, please retry!", toastInit);
  const bookingToastAlert = () => toast("Plesea fill note!", toastInit);

  const fetchAPI = async (params) => {
    const res = await bookingLessonAPI(params)
    if (res.Code === 1) {
      bookingToast();
      onBook(TeacherUID, StudyTimeID, whoami.FullName);
    }
    else {
      bookingToastFail();
    }
  }

  const handleBookingLesson = () => {
    if (state.SpecialRequest.length <= 0) {
      bookingToastAlert();
    }
    else {
      fetchAPI({
        TeacherUID,
        Date: date,
        StudyTimeID,
        SpecialRequest: state.SpecialRequest,
      })
      $('#md-book-schedule').fadeOut(500, function () {
        $('#md-book-schedule').modal('hide');
      });
    }
  }

  React.useEffect(()=>{
    setState(initialState)
  },[TeacherUID, StudyTimeID])

  return (
    <div className="modal effect-scale" tabIndex="-1" role="dialog" id="md-book-schedule">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <form action="" className="">
            <div className="modal-body">
              <div className="cr-item lesson-info">
                <div className="media">
                  <div className="teacher-information">
                    <a className="teacher-avatar" href={`teacherDetail.html?ID=${TeacherUID}`}>
                      <img src={TeacherIMG} className="teacher-image" alt="" />
                      <p className="course-teacher tx-14 tx-gray-800 tx-normal mg-b-0 tx-center mg-t-5 d-block">
                        {TeacherName}</p>
                    </a>
                  </div>
                  <div className="media-body  mg-l-20 pos-relative pd-b-0-f">
                    <h5 className="mg-b-10">
                      <span className="badge badge-warning">Incoming</span>{' '}
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
                      {note && <p className="tx-14 mg-b-0">{note}</p>}
                    </div>
                    <div className="course-docs mg-t-15">
                      <h6 className="mg-b-3">Documents:</h6>
                      <div className="docs-lists">
                        {
                          !!documents && Array.isArray(documents) && documents.length > 0 &&
                          documents.map((doc, index) =>
                            <a key={index} href={"#"} className="file-doc"><i className="fa fa-file mg-r-3"></i>
                              <span className="file-name">{doc.split('.')[0]}</span>
                              <span className="file-ext">{`.${doc.split('.')[1]}`}</span>
                            </a>
                          )
                        }
                      </div>
                    </div>
                    <div className="required-list mg-t-15 bd-t pd-t-15">
                      <div className="required-text-box mg-t-15">
                        <label className="tx-medium">Note for teachers:</label>
                        <div className="form-group">
                          <textarea name="message" id="" rows="4" className="form-control"
                            placeholder="Note for teacher"
                            value={state.SpecialRequest}
                            onChange={(e) => setState({ SpecialRequest: e.target.value })}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleBookingLesson}>Book</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookingLessonModal;