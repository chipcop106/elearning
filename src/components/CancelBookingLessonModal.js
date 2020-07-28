import React from 'react';
import ReactDOM from 'react-dom';
import { cancelLessonAPI } from '../api/studentAPI';
import { toast } from 'react-toastify';
import 'react-toastify/scss/main.scss'
import { toastInit } from "~src/utils"

const CancelBookingLessonModal = ({ BookingID, LessionName, date, start, end, style, callback }) => {
  const [reason, setReason] = React.useState("")
  const cancelToastSuccess = () => toast.success("Cancel lesson successful!", toastInit);

  const cancelToastFail = () => toast.error("Cancel lesson fail, some errors happened!", toastInit);

  const reasonTooShortAlert = () => toast("Please fill the reason!", toastInit);

  const getAPI = async (params) => {
    /* start: -1 */
    let status = -1;
    callback && callback(params.BookingID, status)
    const lessons = await cancelLessonAPI(params);
    status = lessons.Code; /* success:1 , fail: 0*/
    if (status === 1) {
      cancelToastSuccess()
    }
    else {
      cancelToastFail()
    }
    callback && callback(params.BookingID, status);
  }


  const onSubmitCancelLesson = () => {
    if (reason.length <= 0) {
      reasonTooShortAlert()
    }
    else {
      getAPI({
        BookingID,
        ReasonCancel: reason
      })
      $('#md-cancel-schedule').fadeOut(500, function () {
        $('#md-cancel-schedule').modal('hide');
      });
    }
  }

  React.useEffect(() => {
    setReason("")
  }, [BookingID]);

  return <div style={style} className="modal fade effect-scale" id="md-cancel-schedule" tabIndex="-1" role="dialog" aria-labelledby="active-slot"
    aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
      <div className="modal-content">
        <div className="modal-header bg-danger">
          <h5 className="modal-title tx-white">Warning</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span className="tx-white" aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p id="newCampaignTitle">Lesson Name: {LessionName || ''}</p>
          <p>Date: <span id="js-date-time" className="tx-medium">{date || ''}</span></p>
          <p>Start time: <span id="js-start-time" className="tx-medium">{start || ''}</span></p>
          <p>End time: <span id="js-end-time" className="tx-medium">{end || ''}</span></p>
          <div className="form-group">
            <textarea style={{ width: '100%', height: '100px', border: '1px solid #555', padding: '5px' }}
              placeholder="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}></textarea>
          </div>
          <p className="tx-danger">Are you sure to cancel this lesson?</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-light" data-dismiss="modal">No</button>
          <button type="button" className="btn btn-primary" onClick={onSubmitCancelLesson}>Yes</button>
        </div>
      </div>
    </div>
  </div>
}
export default CancelBookingLessonModal;