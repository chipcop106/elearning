import React from 'react';
import ReactDOM from 'react-dom';
import { randomId } from "~src/utils"
import TeacherSupportModal from "~components/TeacherSupportModal"
import { ToastContainer } from 'react-toastify';
import SupportDetail from './SupportDetail';
import styles from "~components/TeacherSupport/teacherSupport.module.scss"

const initialState = [{
  id: randomId(),
  nguoigui: "Hoàng Văn Thái",
  tieude: "Công ty trả thiếu lương",
  noidung: "Công ty trả thiếu lương Công ty trả thiếu lương Công ty trả thiếu lương",
  time: new Date(),
  status: 1,
}, {
  id: randomId(),
  nguoigui: "Trần Văn A",
  tieude: "Không nhận tiết dạy",
  noidung: "Không nhận tiết dạy Không nhận tiết dạy Không nhận tiết dạy",
  time: new Date(),
  status: 2,
}, {
  id: randomId(),
  nguoigui: "Hoàng Văn Thái",
  tieude: "Đơn xin nghỉ phép",
  noidung: "Đơn xin nghỉ phép Đơn xin nghỉ phép Đơn xin nghỉ phép",
  time: new Date(),
  status: 3,
}]


const TeacherSupport = () => {
  const [state, setState] = React.useState(initialState);
  const [filter, setFilter] = React.useState(0);
  const [showDetail, setShowDetail] = React.useState(false);
  const [detailId, setDetailId] = React.useState(0);
  let filteredState = [...state];
  if (filter !== 0) {
    filteredState = filteredState.filter(item => item.status === filter)
  }

  const pushHistoryState = (id) => {
    if(typeof window == undefined) return;
    const history = window.history;
    history.pushState({id:id},'Ticket detail', `${window.location.pathname}?id=${id}`);
  }

  const showDetailBox = (id) =>{
    setDetailId(id)
    pushHistoryState(id)
    setShowDetail(true);
  }

  const _handlefilter = (index) => {
    hideDetailBox();
    setFilter(index)
  }

  const hideDetailBox = () =>{
    console.log('hide nè');
    setShowDetail(false);
    window.history.pushState(null,'Teacher Support', `${window.location.pathname}`);
  }

  const checkDetailUrl = () => {
    if(typeof window == undefined) return;
    const params = new URLSearchParams(window.location.search); 
    params.has('id') && showDetailBox(params.get('id'));
  }

  React.useEffect(() =>{
    checkDetailUrl();
  },[]);

  return (
    <div className="sup">
      <div className="d-md-flex justify-content-between align-items-center mg-b-30">
        <h3 className="tx-bold tx-dark mg-md-b-0">Support Center</h3>
        <button type="button" className="btn btn-primary"
          data-toggle="modal"
          data-target="#md-teacher-support"
          id="contactsub"><i className="fa fa-plus mg-r-10"></i>Ticket</button>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="card card-custom">
            <div className="sub-menu card-body">
              <p className={`${filter === 0 && 'active'} d-flex align-items-center justify-content-between`}>
                <a className="link" onClick={() => _handlefilter(0)}>Tất Cả</a>
                <span className="badge badge-primary-light rounded-circle d-inline-block pd-0 ht-30 wd-30">10</span>
              </p>
              <p className={`${filter === 1 && 'active'} d-flex align-items-center justify-content-between`}>
                <a className="link" onClick={() => _handlefilter(1)}>Đã trả lời</a>
                <span className="badge badge-primary-light rounded-circle d-inline-block pd-0 ht-30 wd-30">10</span>
              </p>
              <p className={`${filter === 2 && 'active'} d-flex align-items-center justify-content-between`}>
                <a className="link" onClick={() => _handlefilter(2)}>Đang xử lý</a>
                <span className="badge badge-primary-light rounded-circle d-inline-block pd-0 ht-30 wd-30">10</span>
              </p>
              <p className={`${filter === 3 && 'active'} d-flex align-items-center justify-content-between`}>
                <a className="link" onClick={() => _handlefilter(3)}>Đã hủy</a>
                <span className="badge badge-primary-light rounded-circle d-inline-block pd-0 ht-30 wd-30">10</span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card card-custom">
            <div className="card-body">
              {showDetail ? <SupportDetail 
                onClickBack={hideDetailBox}
                detailId={detailId}
              /> : (
                <div className="table-responsive mg-b-15">
                  <table className="table table-custom table-borderless">
                    <thead >
                      <tr>
                        <th>Tiêu đề</th>
                        <th>Ngày gửi</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        !!filteredState && filteredState.length > 0 && filteredState.map(item =>
                          <tr key={`${item.id}`}>
                            <td> <span><a href="#" onClick={() => showDetailBox(item.id)} className="sup-item-table-tieude">{item.tieude}</a></span><br /></td>
                            <td>
                              <span className="sup-item-table-gio">{moment(item.time).format("DD/MM/YYYY HH:mm")}</span> <br />
                            </td>
                            <td>
                              <span className={`badge badge-${
                                item.status === 1 ? 'success' :
                                  item.status === 2 ? "warning" : "danger"} pd-5 tx-12 wd-75`}>
                                {
                                  item.status === 1 ? "Đã trả lời" :
                                    item.status === 2 ? "Đang xử lý" : "Đã hủy"
                                }
                              </span>
                            </td>
                          </tr>)
                      }
                    </tbody>
                  </table>
                </div>
              )
              }


            </div>
          </div>
        </div>
      </div>

      <TeacherSupportModal />
      <ToastContainer />
    </div>
  )
}

const domContainer = document.getElementById('react-teacher-support');
ReactDOM.render(<TeacherSupport />, domContainer);