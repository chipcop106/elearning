import React from 'react';
import ReactDOM from 'react-dom';

const BookingLessonModal = ({id, LessionName, date, start, end, style}) => {

  const handleBookingLesson = () => {
    console.log(id)
  }
    return <div style={style} className="modal fade effect-scale" id="md-book-schedule" tabIndex="-1" role="dialog" aria-labelledby="active-slot"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="newCampaignTitle">{LessionName}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
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