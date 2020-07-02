import React from 'react';
import ReactDOM from 'react-dom';

const TeacherSupport = () => {
    return (
        <div className="sup">
            <div className="row">
                <div className="col-4">
                    <h5 className="main-title">Support Center</h5>
                    <div className="sub-menu">
                        {/*1 menu*/}
                        <p>
                            <a className="btn" data-toggle="collapse" href="#contentId" aria-expanded="false" aria-controls="contentId">Payment, Contract &amp; Account
          </a>
                        </p>
                        <div className="collapse" id="contentId">
                            <ul>
                                <li><button className="btn" id="payment"><i className="fa fa-angle-right mg-r-8" />Payment</button></li>
                                <li><button className="btn" id="youraccount"><i className="fa fa-angle-right mg-r-8" />Your Account</button></li>
                                <li><button className="btn" id="contract"><i className="fa fa-angle-right mg-r-8" />Contract</button></li>
                                <li><button className="btn" id="contactsubl"><i className="fa fa-angle-right mg-r-8" />List hỗ trợ</button></li>
                            </ul>
                        </div>
                        {/*/1 menu*/}
                        <p>
                            <a className="btn" data-toggle="collapse" href="#contentId2" aria-expanded="false" aria-controls="contentId">Bookings, Cancellations &amp; No Show
          </a>
                        </p>
                        <div className="collapse" id="contentId2">
                            <ul>
                                <li><button className="btn" id="payment"><i className="fa fa-angle-right mg-r-8" />Payment</button></li>
                                <li><button className="btn" id="youraccount"><i className="fa fa-angle-right mg-r-8" />Your Account</button></li>
                                <li><button className="btn" id="contract"><i className="fa fa-angle-right mg-r-8" />Contract</button></li>
                                <li><button className="btn"><i className="fa fa-angle-right mg-r-8" />Incentives</button></li>
                            </ul>
                        </div>
                        {/*1 menu*/}
                        <p>
                            <a className="btn" data-toggle="collapse" href="#contentId4" aria-expanded="false" aria-controls="contentId">IT &amp; Features
          </a>
                        </p>
                        <div className="collapse" id="contentId4">
                            <ul>
                                <li><button className="btn" id="payment"><i className="fa fa-angle-right mg-r-8" />Payment</button></li>
                                <li><button className="btn" id="youraccount"><i className="fa fa-angle-right mg-r-8" />Your Account</button></li>
                                <li><button className="btn" id="contract"><i className="fa fa-angle-right mg-r-8" />Contract</button></li>
                                <li><button className="btn"><i className="fa fa-angle-right mg-r-8" />Incentives</button></li>
                            </ul>
                        </div>
                        {/*/1 menu*/}
                        {/*1 menu*/}
                        <p>
                            <a className="btn" data-toggle="collapse" href="#contentId5" aria-expanded="false" aria-controls="contentId">Feedback, Students &amp; Parents
          </a>
                        </p>
                        <div className="collapse" id="contentId5">
                            <ul>
                                <li><button className="btn" id="payment"><i className="fa fa-angle-right mg-r-8" />Payment</button></li>
                                <li><button className="btn" id="youraccount"><i className="fa fa-angle-right mg-r-8" />Your Account</button></li>
                                <li><button className="btn" id="contract"><i className="fa fa-angle-right mg-r-8" />Contract</button></li>
                                <li><button className="btn"><i className="fa fa-angle-right mg-r-8" />Incentives</button></li>
                            </ul>
                        </div>
                        {/*/1 menu*/}
                        {/*1 menu*/}
                        <p>
                            <a className="btn" data-toggle="collapse" href="#contentId6" aria-expanded="false" aria-controls="contentId">VIPKid Community
          </a>
                        </p>
                        <div className="collapse" id="contentId6">
                            <ul>
                                <li><button className="btn" id="payment"><i className="fa fa-angle-right mg-r-8" />Payment</button></li>
                                <li><button className="btn" id="youraccount"><i className="fa fa-angle-right mg-r-8" />Your Account</button></li>
                                <li><button className="btn" id="contract"><i className="fa fa-angle-right mg-r-8" />Contract</button></li>
                                <li><button className="btn"><i className="fa fa-angle-right mg-r-8" />Incentives</button></li>
                            </ul>
                        </div>
                        {/*/1 menu*/}
                        {/*1 menu*/}
                        <p>
                            <a className="btn" data-toggle="collapse" href="#contentId7" aria-expanded="false" aria-controls="contentId">Important Procedures
          </a>
                        </p>
                        <div className="collapse" id="contentId7">
                            <ul>
                                <li><button className="btn" id="payment"><i className="fa fa-angle-right mg-r-8" />Payment</button></li>
                                <li><button className="btn" id="youraccount"><i className="fa fa-angle-right mg-r-8" />Your Account</button></li>
                                <li><button className="btn" id="contract"><i className="fa fa-angle-right mg-r-8" />Contract</button></li>
                                <li><button className="btn"><i className="fa fa-angle-right mg-r-8" />Incentives</button></li>
                            </ul>
                        </div>
                        {/*/1 menu*/}
                    </div>
                </div>
                <div className="col-8">
                    <button className="btn float-right btn-primary" id="contactsub">Contact Support</button>
                    <div className="clear" />
                    <div className="sup-item" id="sup-item">
                        <h5 className="sub-title mg-t-10">Danh sách yêu cầu hỗ trợ</h5>
                        <table className="table mg-t-20">
                            <tbody><tr>
                                <th className="bg-xanh">Người gửi</th>
                                <th className="bg-xanh">Tiêu đề</th>
                                <th className="bg-xanh">Ngày gửi</th>
                                <th className="bg-xanh">Trạng thái</th>
                            </tr>
                                <tr>
                                    <td>
                                        <span><a className="sup-item-table-ten">Trần Lê Phương Uyên</a></span>
                                    </td>
                                    <td>
                                        <span><a href="#" className="sup-item-table-tieude">Công ty trả thiếu lương</a></span><br /></td>
                                    <td>
                                        <span className="sup-item-table-gio">24/06/2020</span> <br />
                                        <span className="sup-item-table-gio">16:00 </span>
                                    </td>
                                    <td>
                                        <span className="badge badge-success pd-5">Đã trả lời</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span><a className="sup-item-table-ten ">Lê Trần Phương Uyên</a></span>
                                    </td>
                                    <td> <span><a className="sup-item-table-tieude">Không nhận tiết dạy</a></span><br /></td>
                                    <td>
                                        <span className="sup-item-table-gio">24/06/2020</span> <br />
                                        <span className="sup-item-table-gio">16:00 </span>
                                    </td>
                                    <td>
                                        <span className="badge badge-danger pd-5">Đã hủy</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span><a className="sup-item-table-ten ">Lê Trần Phương Uyên</a></span>
                                    </td>
                                    <td> <span><a className="sup-item-table-tieude">Đơn xin nghỉ phép</a></span><br /></td>
                                    <td>
                                        <span className="sup-item-table-gio">24/06/2020</span> <br />
                                        <span className="sup-item-table-gio">16:00 </span>
                                    </td>
                                    <td>
                                        <span className="badge badge-warning pd-5">Đang xử lý</span>
                                    </td>
                                </tr>
                            </tbody></table>
                    </div>
                </div>
            </div>
        </div>


    )
}

const domContainer = document.getElementById('react-teacher-support');
ReactDOM.render(<TeacherSupport />, domContainer);