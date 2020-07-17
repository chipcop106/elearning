import React from 'react';
import ReactDOM from 'react-dom';
import { randomId } from "~src/utils"
import TeacherSupportModal from "~components/TeacherSupportModal"
import { ToastContainer } from 'react-toastify';

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
  let filteredState = [...state]
  if (filter !== 0) {
    filteredState = filteredState.filter(item => item.status === filter)
  }
  return (
    <div className="sup">
      <div className="row">
        <div className="col-4">
          <h5 className="main-title">Support Center</h5>
          <div className="sub-menu">
            <p className={`${filter === 0 && 'active'}`}>
              <a className="btn" onClick={() => setFilter(0)}>Tất Cả</a>
            </p>
            <p className={`${filter === 1 && 'active'}`}>
              <a className="btn" onClick={() => setFilter(1)}>Đã trả lời</a>
            </p>
            <p className={`${filter === 2 && 'active'}`}>
              <a className="btn" onClick={() => setFilter(2)}>Đang xử lý</a>
            </p>
            <p className={`${filter === 3 && 'active'}`}>
              <a className="btn" onClick={() => setFilter(3)}>Đã hủy</a>
            </p>
          </div>
        </div>
        <div className="col-8">
          <div className="d-flex justify-content-between mg-b-30">
          <div className="d-xl-flex align-items-center justify-content-between">
              <h4 className="gradient-heading"> <i className="fas fa-address-card" /> Danh sách yêu cầu hỗ trợ</h4>
            </div>
          <button className="btn btn-primary"
            data-toggle="modal"
            data-target="#md-teacher-support"
            id="contactsub">Contact Support</button>
          </div>
            <div className="table-responsive mg-b-15">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Người gửi</th>
                    <th>Tiêu đề</th>
                    <th>Ngày gửi</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    !!filteredState && filteredState.length > 0 && filteredState.map(item =>
                      <tr key={item.id}>
                        <td>
                          <span><a className="sup-item-table-ten">{item.nguoigui}</a></span>
                        </td>
                        <td> <span><a className="sup-item-table-tieude">{item.tieude}</a></span><br /></td>
                        <td>
                          <span className="sup-item-table-gio">{moment(item.time).format("DD/MM/YYYY HH:mm")}</span> <br />
                        </td>
                        <td>
                          <span className={`badge badge-${
                            item.status === 1 ? 'success' :
                              item.status === 2 ? "warning" : "danger"} pd-5`}>
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
          </div>
      </div>

      <TeacherSupportModal />
      <ToastContainer />
    </div>
  )
}

const domContainer = document.getElementById('react-teacher-support');
ReactDOM.render(<TeacherSupport />, domContainer);