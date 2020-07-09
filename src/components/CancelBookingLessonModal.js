import React from 'react';
import ReactDOM from 'react-dom';
import {cancelSchedule} from '~src/api/teacherAPI';
const CancelBookingLessonModal = ({id = 0, name = '', date = '', start = '', end = '', style = {}, callback}) => {
  const onSubmitCancelLesson = async () => {
    console.log(id)
    const res = await cancelSchedule({BookingID: id});
    if(res !== 1) return;
    callback && callback(id);
  }
  return <div style={style} className="modal fade effect-scale" id="md-cancel-schedule" tabIndex="-1" role="dialog" aria-labelledby="active-slot"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="newCampaignTitle">{name || ''}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Date: <span id="js-date-time" className="tx-medium">{date || ''}</span></p>
            <p>Start time: <span id="js-start-time" className="tx-medium">{start || ''}</span></p>
            <p>End time: <span id="js-end-time" className="tx-medium">{end || ''}</span></p>
            <p>Are you sure to cancel this lesson?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={onSubmitCancelLesson}>Yes</button>
          </div>
        </div>
      </div>
    </div>
}
export default CancelBookingLessonModal;