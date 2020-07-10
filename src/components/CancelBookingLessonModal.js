import React from 'react';
import ReactDOM from 'react-dom';

import { cancelLesson } from '../api/optionAPI';

const CancelBookingLessonModal = ({id, LessionName, date, start, end, style, callback}) => {


  const getAPI = async (id) => {
    /* start: 0 */
    let result = 0;
    callback && callback(id, result)
    const lessons = await cancelLesson({BookingID:id});
    //console.log(lessons.Message)
    /* success:1, fail:2 */
    result = 1;
    callback && callback(id, result);
  }


  const onSubmitCancelLesson = () => {
    console.log(id)
    getAPI(id)

  }
  return <div style={style} className="modal fade effect-scale" id="md-cancel-schedule" tabIndex="-1" role="dialog" aria-labelledby="active-slot"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="newCampaignTitle">{LessionName}</h5>
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