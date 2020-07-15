import React from 'react';
import ReactDOM from 'react-dom';
import { cancelLesson } from '../api/optionAPI';
import { toast } from 'react-toastify';
import 'react-toastify/scss/main.scss'
import { toastInit } from "~src/utils"

const CancelBookingLessonModal = ({id, LessionName, date, start, end, style, callback}) => {
  const [reason, setReason] = React.useState("")
  const cancelToastSuccess = () => toast("Cancel lesson successful!", toastInit);

  const cancelToastFail = () => toast("Cancel lesson fail, some errors happened!", toastInit);

  const reasonTooShortAlert = () => toast("Please fill the reason!", toastInit);

  const getAPI = async (id) => {
    /* start: 0 */
    let result = 0;
    callback && callback(id, result)
    const lessons = await cancelLesson({
      BookingID:id,
      Reason: reason,
    });    
    result = lessons.Code; /* success:1, fail:2 */
    if(result === 1) {
      cancelToastSuccess()
    }
    else if(result === 2) {
      cancelToastFail()
    }
    callback && callback(id, result);
  }


  const onSubmitCancelLesson = () => {
    console.log(id)
    if(reason.length <= 0) {
      reasonTooShortAlert()
    }
    else {
      getAPI(id)
      $('#md-cancel-schedule').fadeOut(500,function(){
        $('#md-cancel-schedule').modal('hide');
     });
    }
  }

  React.useEffect(() => {
    setReason("")
  }, [id]);

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
            <p id="newCampaignTitle">Name: {LessionName || ''}</p>
            <p>Date: <span id="js-date-time" className="tx-medium">{date || ''}</span></p>
            <p>Start time: <span id="js-start-time" className="tx-medium">{start || ''}</span></p>
            <p>End time: <span id="js-end-time" className="tx-medium">{end || ''}</span></p>
            <div className="form-group">
            <textarea style={{width:'100%',height:'100px',border:'1px solid #555',padding:'5px'}}
            placeholder="Reason"
            value={reason}
            onChange={(e)=>setReason(e.target.value)}></textarea>
            </div>
            <p className="tx-danger">Are you sure to cancel this lesson?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
            <button type="button" className="btn btn-primary" onClick={onSubmitCancelLesson}>Yes</button>
          </div>
        </div>
      </div>
    </div>
}
export default CancelBookingLessonModal;