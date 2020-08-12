import React from 'react';
import ReactDOM from 'react-dom';
import { cancelLessonAPI } from '../api/studentAPI';
import { toast } from 'react-toastify';
import 'react-toastify/scss/main.scss'
import { toastInit } from "~src/utils"
import { FILL_REASON } from '~components/common/Constant/toast';

const CancelBookingLessonModal = ({ BookingID, LessionName, date, start, end, style, callback }) => {
  const [reason, setReason] = React.useState("")
  const reasonTooShortAlert = () => toast.warn(FILL_REASON, toastInit);

  const getAPI = async (params) => {
    /* start: -1 */
    callback && callback(params.BookingID, -1);
    const res = await cancelLessonAPI(params);
    if (res.Code === 1) callback && callback(params.BookingID, 1);
    else callback && callback(params.BookingID, 0);
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
          <p id="newCampaignTitle">Lớp học: <span className="tx-medium">{LessionName || ''}</span></p>
          <p>Ngày: <span id="js-date-time" className="tx-medium">{date || ''}</span></p>
          <p>Bắt đầu: <span id="js-start-time" className="tx-medium">{start || ''}</span></p>
          <p>Kết thúc: <span id="js-end-time" className="tx-medium">{end || ''}</span></p>
          <div className="metronic-form">
            <div className="form-group">
              <textarea style={{height: '100px'}}
                className="form-control"
                placeholder="Lý do hủy"
                value={reason}
                onChange={(e) => setReason(e.target.value)}></textarea>
            </div>
          </div>
          <p className="tx-danger">Bạn có chắc muốn hủy lớp học này?</p>
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