import React from 'react';
import ReactDOM from 'react-dom';
import GridSalary from './GridSalary';
import PaymentHistory from './PaymentHistory';


const TeacherPayment = () => {

    return (
        <>
         
            {/*title trang*/}
            <GridSalary />

            <div className="pay-chitiet mg-t-30">
                <h5 className="sub-title"><i className="fa fa-file mg-r-10"></i> PAYMENT HISTORY</h5>
            </div>
            <div className="payment__wrap mg-b-30">
                <PaymentHistory />
            </div>
        </>


    )
}

const domContainer = document.getElementById('react-teacher-payment');
ReactDOM.render(<TeacherPayment />, domContainer);