import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from "react-js-pagination";
import SkeletonLessonHistoryCard from "~components/common/Skeleton/SkeletonLessonHistoryCard";
import { NOT_DATA_FOUND } from "~components/common/Constant/message"
import { getPaymentHistoryAPI } from "~src/api/studentAPI";

const PaymentHistory = () => {
  const [state, setState] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(0);
  const [totalResult, setTotalResult] = React.useState(0);

  const handlePageChange = (pageNumber) => {
    if (page !== pageNumber) {
      setPage(pageNumber);
      getAPI({
        Page: pageNumber,
      })
    }
  }

  const getAPI = async (params) => {
    setLoading(true);
    const res = await getPaymentHistoryAPI(params);
    if (res.Code === 1 && res.Data.length > 0) {
      setState(res.Data);
      setPageSize(res.PageSize);
      setTotalResult(res.TotalResult)
    }
    setLoading(false);
  }

  React.useEffect(() => {
    getAPI({
      Page: 1,
    });
  }, [])

  return <>
    {/*
 <div className="subcription-title">
 <div className="d-flex flex-wrap align-items-center justify-content-between mg-b-15">
   <div className="payment wd-sm-50p wd-100p">
     <div className="list-subscription">
       <dl className="subscription-info ">
         <dt>Payment method</dt>
         <dd>
           <span><i className="fa fa-visa" />VISA</span>
         </dd>
       </dl>
       <dl className="subscription-info ">
         <dt>Name</dt>
         <dd>
           <span>TRUONG VAN LAM</span>
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
     <div className="reference-code card pd-15 mg-x-auto mw-300">
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
</div>*/
    }
    <div className="table-tiket">
      <div className="table-responsive">
        <table className="table tx-nowrap">
          <thead className="thead-light tx-center">
            <tr>
              <th>Course Name</th>
              <th>Amount</th>
              <th>Start</th>
              <th>End</th>
              <th>Method</th>
              <th>Payment Date</th>
              <th>Expiration Date</th>
              <th>Status</th>
              <th>Total Lesson</th>
            </tr>
          </thead>
          <tbody>
            {
              loading ? <SkeletonLessonHistoryCard column={9} /> :
                !!state && Array.isArray(state) && state.length > 0 ?
                  state.map((item, index) =>
                    <tr key={index}>
                      <td>{item.PlanName}</td>
                      <td>{item.Amount}</td>
                      <td>{item.StartDate}</td>
                      <td>{item.EndDate}</td>
                      <td>{item.PaymentTypeString}</td>
                      <td>{moment(item.PaymentDate).format("YYYY-MM-DD")}</td>
                      <td>{item.ExpirationDate}</td>
                      <th><span className={`badge badge-${
                        item.Status === 1 ? 'warning' :
                          item.Status === 2 ? "success" : "danger"} pd-5 tx-12 wd-75`}>
                        {
                          item.Status === 1 ? "Chưa kích hoạt" :
                            item.Status === 2 ? "Đã kích hoạt" : "Hết hạn"
                        }
                      </span></th>
                      <th>{item.TotalLesson}</th>
                    </tr>) :
                  <tr style={{ backgroundColor: "transparent" }}>
                    <td colSpan="9">
                      <NOT_DATA_FOUND />
                    </td>
                  </tr>
            }
          </tbody>
        </table>
      </div>
      {
        pageSize < totalResult && <Pagination
          innerClass="pagination justify-content-center mt-3"
          activePage={page}
          itemsCountPerPage={pageSize}
          totalItemsCount={totalResult}
          pageRangeDisplayed={3}
          itemClass="page-item"
          linkClass="page-link"
          onChange={handlePageChange.bind(this)} />
      }
    </div>
  </>
}

export default PaymentHistory;