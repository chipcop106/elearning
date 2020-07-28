import React from 'react';
import ReactDOM from 'react-dom';
import GridSalary from './GridSalary';
import PaymentHistory from './PaymentHistory';


const TeacherPayment = () => {

    return (
        <>

            {/*title trang*/}
            <GridSalary />

            <div className="payment__wrap mg-b-30 mg-t-30">
                <PaymentHistory />
            </div>
        </>


    )
}

const domContainer = document.getElementById('react-teacher-payment');
ReactDOM.render(<TeacherPayment />, domContainer);