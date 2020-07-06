import React from 'react';
import ReactDOM from 'react-dom';
import styles from './teacherPayment.module.scss';

const TeacherPayment = () => {
    const _onFilterDate = (e) => {
        e.preventDefault();
        const fromDate = document.querySelector('#filter-time .from-date');
        const toDate = document.querySelector('#filter-time .to-date');
        console.log({ fromDate, toDate });
    }

    return (
        <div>
            <div className="pay">
                {/*Button print va thong bao*/}
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="gradient-heading clear mg-r-20 mg-b-0"><i className="fa fa-credit-card mg-r-10"></i>Total Payment</h3>
                    
                </div>
                <div className="clear" />
                <div className="pay-note mg-t-20">
                    <p className="pay-note-text"><i className="fa fa-bell pay-note-icon" /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia veritatis quam dignissimos neque, sit iure ea maxime ab quaerat ipsum?</p>
                    <p className="pay-note-text"><i className="fa fa-bell pay-note-icon" /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia veritatis quam dignissimos neque, sit iure ea maxime ab quaerat ipsum?</p>
                </div>
                {/*/Button print va thong bao*/}
                {/*title trang*/}
                <div className="pay-title mg-t-30">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <div className="d-flex align-items-center">
                                
                                <select id="pay-dotluong" className="btn btn-white">
                                    <option value>The first 2 weeks </option>
                                    <option value>2 weeks later</option>
                                </select>
                                <span className="pay-title-times mg-x-10">2nd half of May 2010</span>
                                <a href="#" className="pay-pending">Pending <i className="fa fa-angle-right" /></a>
                            </div>
                        </div>
                        <div >
                            <div className="pay-print-btn align-right">
                                <button className="btn btn-primary"><i className="far fa-file-excel mg-r-5"></i> Export excel</button>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
            {/*title trang*/}
            <hr className="kengang" />
            {/*Bang luong tong hop*/}
            <div className="d-table wd-100p tb-salary">

                <div className="table-row">
                    <div className="pay-border">
                        <div className="d-flex justify-content-between ht-55">
                            <p className="pay-syn-title">COURSE</p>
                            <p className="pay-syn-money">$538</p>  
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="pay-syn-text">Buổi</p>
                            <p className="pay-syn-text">$32</p>  
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="pay-syn-text">Lương tiết</p>
                            <p className="pay-syn-text">$165</p>  
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="pay-syn-text">Thưởng</p>
                            <p className="pay-syn-text">$15</p>  
                        </div>
                    </div>
                    <div className="pay-border">
                        <div className="d-flex justify-content-between ht-55">
                            <p className="pay-syn-title">Participation Incentives</p>
                            <p className="pay-syn-money">$538</p>  
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="pay-syn-text">Buổi</p>
                            <p className="pay-syn-text">$32</p>  
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="pay-syn-text">Lương tiết</p>
                            <p className="pay-syn-text">$165</p>  
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="pay-syn-text">Thưởng</p>
                            <p className="pay-syn-text">$15</p>  
                        </div>
                    </div>
                    <div className="pay-border">
                        <div className="d-flex justify-content-between ht-55">
                            <p className="pay-syn-title">Other Incentives</p>
                            <p className="pay-syn-money">$538</p>  
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="pay-syn-text">Buổi</p>
                            <p className="pay-syn-text">$32</p>  
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="pay-syn-text">Lương tiết</p>
                            <p className="pay-syn-text">$165</p>  
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="pay-syn-text">Thưởng</p>
                            <p className="pay-syn-text">$15</p>  
                        </div>
                    </div>
                </div>
                
                <div className="table-row">
                    <div className="pay-border">
                        <div className="d-flex justify-content-between ht-55">
                            <p className="pay-syn-title">COURSE</p>
                            <p className="pay-syn-money">$538</p>  
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="pay-syn-text">Buổi</p>
                            <p className="pay-syn-text">$32</p>  
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="pay-syn-text">Lương tiết</p>
                            <p className="pay-syn-text">$165</p>  
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="pay-syn-text">Thưởng</p>
                            <p className="pay-syn-text">$15</p>  
                        </div>
                    </div>
                    <div className="pay-border">
                        <div className="d-flex justify-content-between ht-55">
                            <p className="pay-syn-title">Participation Incentives</p>
                            <p className="pay-syn-money">$538</p>  
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="pay-syn-text">Buổi</p>
                            <p className="pay-syn-text">$32</p>  
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="pay-syn-text">Lương tiết</p>
                            <p className="pay-syn-text">$165</p>  
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="pay-syn-text">Thưởng</p>
                            <p className="pay-syn-text">$15</p>  
                        </div>
                    </div>
                    <div className="pay-border">
                        <div className="d-flex justify-content-between ht-55">
                            <p className="pay-syn-title">Other Incentives</p>
                            <p className="pay-syn-money">$538</p>  
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="pay-syn-text">Buổi</p>
                            <p className="pay-syn-text">$32</p>  
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="pay-syn-text">Lương tiết</p>
                            <p className="pay-syn-text">$165</p>  
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="pay-syn-text">Thưởng</p>
                            <p className="pay-syn-text">$15</p>  
                        </div>
                    </div>
                </div>
                
            </div>
            <h3 className="tx-right mg-t-15 tx-normal">Total salary: <span className="tx-primary tx-medium">$817.00</span></h3>
            {/*/Bang luong tong hop*/}
            <div className="pay-chitiet mg-t-30">
                <h5 className="sub-title"><i className="fa fa-file mg-r-10"></i> PAYMENT HISTORY</h5>
                <div className="gv-datime-luong mg-t-15">
                    <div className="form-row from-to-group mx-wd-600" id="filter-time">
                        <div className="wd-sm-200 col">
                            <input type="text" name="start-day " className="form-control datetimepicker from-date" placeholder="From date" />
                        </div>
                        <div className="wd-sm-200 col">
                            <input type="text" name="end-day" className="form-control datetimepicker to-date" placeholder="To date" />
                        </div>
                        <div className="flex-grow-0 tx-right flex-shrink-0 pd-x-5">
                            <button type="button" className="btn btn-info " onClick={_onFilterDate}><i className="fa fa-search" /></button>
                        </div>
                    </div>
                </div>
                <table className="table mg-t-15">
                    <thead className="thead-light">
                        <tr className="gv-bg-table">
                            <th className="tx-left">Date range</th>
                            <th className="tx-center">Total salary</th>
                            <th className="tx-center">Payment method</th>
                            <th className="tx-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="tx-left wd-250">15/04/2020 <i className="fa fa-long-arrow-alt-right mg-x-10"></i> 01/05/2020</td>
                            <td className="tx-center">$815</td>
                            <td className="tx-center">Internet Banking</td>
                            <td className="tx-center"><span className="badge badge-warning">Pending</span></td>
                        </tr>
                        <tr>
                            <td className="tx-left wd-250">01/04/2020 <i className="fa fa-long-arrow-alt-right mg-x-10"></i> 15/04/2020</td>
                            <td className="tx-center">$815</td>
                            <td className="tx-center">Internet Banking</td>
                            <td className="tx-center"><span className="badge badge-success done">Done</span></td>
                        </tr>
                        
                    </tbody>
                    </table>
            </div>
        </div>


    )
}

const domContainer = document.getElementById('react-teacher-payment');
ReactDOM.render(<TeacherPayment />, domContainer);