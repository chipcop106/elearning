import React, { useState, useEffect } from 'react';
import styles from './GridSalary.module.scss';
import { getPaymentInfo } from '~src/api/teacherAPI';
import Skeleton from 'react-loading-skeleton'
import moment from 'moment';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const now = new Date();

const GridSalary = () => {
    const [data, setData] = useState();
    const [selectedSection, setSelectedSection] = useState('1');
    const [month, setMonth] = useState('1');
    const [isLoading, setIsLoading] = useState(true);
    const loadPaymentData = async () => {
        setIsLoading(true);
        const res = await getPaymentInfo({ Date: moment(new Date()).format('DD/MM/YYYY') })
        if (res.Code !== 1) return;
        setData(res.Data);
        setIsLoading(false);
    }

    useEffect(() => {
        loadPaymentData();
    }, [selectedSection, month])

    return (
        <>
            <div className="pay-title mg-t-30">
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="gradient-heading clear mg-r-20 mg-b-0"><i className="fa fa-credit-card mg-r-10"></i>Total Payment</h3>
                    <div className="d-flex align-items-center">
                    <span className="pay-title-times mg-x-10">{selectedSection == 1 ? '1st' : '2nd'} half of <span className="tx-primary">{monthNames[now.getMonth()]} {now.getFullYear()}</span></span>
                        <div className="mg-r-10">
                            <select className="btn btn-white" value={selectedSection} onChange={(event) => setSelectedSection(event.target.value)} >
                                <option value="1">The first 2 weeks </option>
                                <option value="2">2 weeks later</option>
                            </select>
                        </div>
                        <div>
                            <select className="btn btn-white" value={month} onChange={(event) => setMonth(event.target.value)}>
                                {new Array(12).fill().map((ele, index) => {
                                    return index <= now.getMonth() ? <option key={`${index}`} value={index + 1}>{monthNames[index]}</option> : null;
                                })}
                            </select>
                        </div>

                        
                    </div>

                </div>
            </div>
            <hr className="kengang" />
            {/*Bang luong tong hop*/}
            <div className="d-table wd-100p tb-salary">

                <div className="table-row form-row">

                    <div className="col-md-4">
                        <div className="pay-border ">
                            <div className="d-flex justify-content-between">
                                <p className="pay-syn-title">Participation Incentives</p>
                                <p className="pay-syn-money">{!isLoading ? `${parseFloat(data.FinishedClass) + parseFloat(data.CourseDeduction)}$` : <Skeleton count={1} width={40} height={20} />}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="pay-syn-text">Total classes</p>
                                <p className="pay-syn-text">{!isLoading ? `${data.TotalClasses}` : <Skeleton count={1} width={40} height={15}/>}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="pay-syn-text">Finished class</p>
                                <p className="pay-syn-text">{!isLoading ? `${data.FinishedClass}$` : <Skeleton count={1} width={40} height={15} />}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="pay-syn-text">Course deduction</p>
                                <p className="pay-syn-text">{!isLoading ? `${data.CourseDeduction}$` : <Skeleton count={1} width={40} height={15} />}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="pay-border">
                            <div className="d-flex justify-content-between">
                                <p className="pay-syn-title">Other Incentives</p>
                                <p className="pay-syn-money">{!isLoading ? `${parseFloat(data.TeacherRefferalFee) + parseFloat(data.NewStudentSignup) + parseFloat(data.Rewards)}$` : <Skeleton count={1} width={40} height={20} />}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="pay-syn-text">Teacher Refferal Fee</p>
                                <p className="pay-syn-text">{!isLoading ? `${data.TeacherRefferalFee}$` : <Skeleton count={1} width={40} height={15} />}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="pay-syn-text">New Student Signup</p>
                                <p className="pay-syn-text">{!isLoading ? `${data.NewStudentSignup}$` : <Skeleton count={1} width={40} height={15} />}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="pay-syn-text">Rewards</p>
                                <p className="pay-syn-text">{!isLoading ? `${data.Rewards}$` : <Skeleton count={1} width={40} height={15} />}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="pay-border ">
                            <div className="d-flex justify-content-between">
                                <p className="pay-syn-title">Adjustments</p>
                                <p className="pay-syn-money">{!isLoading ? `${parseFloat(data.BaseSalary) + parseFloat(data.Additions) + parseFloat(data.Deductions)}$` : <Skeleton count={1} width={40} height={20} />}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="pay-syn-text">Base salary</p>
                                <p className="pay-syn-text">{!isLoading ? `${data.BaseSalary}$` : <Skeleton count={1} width={40} height={15} />}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="pay-syn-text">Additions</p>
                                <p className="pay-syn-text">{!isLoading ? `${data.Additions}$` : <Skeleton count={1} width={40} height={15} />}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="pay-syn-text">Deductions</p>
                                <p className="pay-syn-text">{!isLoading ? `${data.Deductions}$` : <Skeleton count={1} width={40} height={15} />}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <h3 className="tx-right mg-t-15 tx-normal">Total salary: <span className="tx-primary tx-medium">{!isLoading ? `$${data.NetIncome}` : <Skeleton count={1} width={40} height={25} />}</span></h3>
            {/*/Bang luong tong hop*/}
        </>
    )
};

export default GridSalary;