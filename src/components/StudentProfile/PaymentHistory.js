import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from "react-js-pagination";
 
const initialState = [{
  LessionName: "IELST 8.0 Professional",
  Amount: "99.5 USD",
  Method: "VISA",
  PaymentDate: "2020-04-29",
  ExpirationDate: "2020-05-29",
}, {
  LessionName: "IELST 8.0 Professional",
  Amount: "99.5 USD",
  Method: "VISA",
  PaymentDate: "2020-04-29",
  ExpirationDate: "2020-05-29",
}, {
  LessionName: "IELST 8.0 Professional",
  Amount: "99.5 USD",
  Method: "VISA",
  PaymentDate: "2020-04-29",
  ExpirationDate: "2020-05-29",
}, {
  LessionName: "IELST 8.0 Professional",
  Amount: "99.5 USD",
  Method: "VISA",
  PaymentDate: "2020-04-29",
  ExpirationDate: "2020-05-29",
}]

const PaymentHistory = () => {
  const [state, setState] = React.useState(initialState)
  const [page, setPage] = React.useState(1)

  const handlePageChange = (pageNumber) =>  {
    setPage(pageNumber);
  }

  return (
    <React.Fragment>
      <div className="subcription-title">
        <div className="d-flex align-items-center justify-content-between mg-b-15">
          <div className="payment wd-sm-50p wd-100p">
            <div className="list-subscription">
              <dl className="subscription-info ">
                <dt>Payment method</dt>
                <dd>
                  <span><i className="fa fa-visa" /> VISA</span>
                </dd>
              </dl>
              <dl className="subscription-info ">
                <dt>Name</dt>
                <dd>
                  <span>TRUONG VAN LAM </span>
                </dd>
              </dl>
              <dl className="subscription-info ">
                <dt>Date Expired</dt>
                <dd>
                  <span>06/2022</span>
                </dd>
              </dl>
              <dl className="subscription-info ">
                <dt>Card number:</dt>
                <dd>
                  <span>XXXX-XXXX-XXXX-XXXX</span>
                </dd>
              </dl>
            </div>
          </div>
          <div className="code wd-sm-50p wd-100p">
            <div className="reference-code card pd-15 wd-300 mg-x-auto">
              <dl className="subscription-info ">
                <dt>Referrence code:</dt>
                <dd>
                  <span>MONA08438943</span>
                </dd>
              </dl>
              <dl className="subscription-info ">
                <dt>Promotion code:</dt>
                <dd>
                  <span>MONA08438943</span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <ul style={{ margin: 0 }}>
          <li>Long term plans will be expired on next payment
          date.</li>
          <li>For recurring plans, you can book a class after the
          payment date only if payment has been successfully
          tendered. Recurring payments are made at 12 PM on
          the payment date. (Lessons booked in advance will
          not be cancelled.)</li>
          <li>You can check payment history for the past year
          only.</li>
          <li>Please contact <strong>Customer Support
            (support@mona.media.com)</strong> for more
          information. </li>
        </ul>
        <div className="tx-center mg-y-15">
          <a href={"#"} className="btn btn-primary rounded-pill"><i className="fas fa-edit mg-r-5" /> Credit card</a>
        </div>
      </div>
      <div className="table-tiket">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Payment Date</th>
                <th>Expiration Date</th>
              </tr>
            </thead>
            <tbody>
              {
                !!state && Array.isArray(state) && state.length > 0 &&
                state.map((item,index) =>
                  <tr key={index}>
                    <td>{item.LessionName}</td>
                    <td>{item.Amount}</td>
                    <td>{item.Method}</td>
                    <td>{item.PaymentDate}</td>
                    <td>{item.ExpirationDate}</td>
                  </tr>)
              }
            </tbody>
          </table>
        </div>
        <Pagination
          innerClass="pagination justify-content-center mt-3"
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          itemClass="page-item"
          linkClass="page-link"
          onChange={handlePageChange.bind(this)}
            />
      </div>
    </React.Fragment>)
}

export default PaymentHistory;