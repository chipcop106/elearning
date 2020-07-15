import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/scss/main.scss'
import { toastInit } from "~src/utils"

const BookingLessonModal = ({id, LessionName, date, start, end, style, onBook}) => {

   const bookingToast = () => toast("Book lesson successful!", toastInit);

  const handleBookingLesson = () => {
    console.log(id)
    onBook(id, "Nguyen Van A");
    /* Goi API */
    bookingToast();
  }
    return <div style={style} className="modal fade effect-scale" id="md-book-schedule" tabIndex="-1" role="dialog" aria-labelledby="active-slot"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header bg-info">
            <h5 className="modal-title tx-white">Info</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span className="tx-white" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Lesson info:</p>
            <p id="newCampaignTitle">Name: {LessionName}</p>
            <p>Date: <span id="js-date-time" className="tx-medium">{date}</span></p>
            <p>Start time: <span id="js-start-time" className="tx-medium">{start}</span></p>
            <p>End time: <span id="js-end-time" className="tx-medium">{end}</span></p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleBookingLesson}>Book</button>
          </div>
        </div>
      </div>
    </div>
}

export default BookingLessonModal;