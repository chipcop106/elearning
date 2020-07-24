import React from 'react';
const CancelSlotModal = ({data, handleCancelSlot}) => {
    const { id, date, start, end, studentName } = data;
    console.log(data);

    const _onSubmit = (e) => {
      e.preventDefault();
      handleCancelSlot(data);
    }
    return (
        <div className="modal fade effect-scale" data-backdrop="static" data-keyboard="false" id="md-cancel-slot" tabIndex={-1} role="dialog" aria-labelledby="cancel-slot" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header bg-danger">
              <h5 className="mg-b-0 tx-white">Warning !!</h5>
            </div>
            <div className="modal-body">
              <p className="tx-danger">Do you want to cancel this lesson ?</p>
              <p className="tx-medium">Lesson info: </p>
              <p>Student name: <span className="tx-medium"/>{studentName}</p>
              <p>Date: <span className="tx-medium" />{date}</p>
              <div className="row">
                <div className="col">
                  <p>Start: <span className="tx-medium" />{start}</p>
                </div>
                <div className="col">
                  <p>End: <span className="tx-medium" />{end}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer bd-t-0 pd-t-0">
              <button type="button" className="btn btn-light btn-sm" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-flat btn-sm tx-primary" onClick={_onSubmit}>Yes, cancel it</button>
            </div>
          </div>
        </div>
      </div>
      
      
    )
}



export default CancelSlotModal;
