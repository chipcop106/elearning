import React, { useState, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import { getPaymentHistory } from '~src/api/teacherAPI';
import Skeleton from 'react-loading-skeleton'
import Pagination from 'react-js-pagination';
import NumberFormat from 'react-number-format'

const RenderRow = ({ data }) => {
    return (<tr>
        <td className="tx-left wd-150">{data.CreatedDate}</td>
        <td className="tx-center"><NumberFormat value={`${data.Salary}`} displayType={'text'} thousandSeparator={true} suffix={'$'} /></td>
        <td className="tx-center">{data.Note}</td>
    </tr>)
}

const PaymentHistory = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState(null);

    const loadHistoryAPI = async () => {
        setIsLoading(true);
        const params = {
            Page: parseInt(pageNumber), //Int
            FromDate: fromDate === '' ? fromDate : moment(new Date(fromDate)).format('DD/MM/YYYY'), // string dd/mm/yyyy
            ToDate: toDate === '' ? toDate : moment(new Date(toDate)).format('DD/MM/YYYY') // string dd/mm/yyyy
        };
        const res = await getPaymentHistory(params);
        res.Code === 1 ? setData(res.Data) : setData([]);
        setIsLoading(false);
    }

    useEffect(() => {
        loadHistoryAPI();
    }, [pageNumber])

    return (
        <div className="card card-custom">
            <div className="card-header d-lg-flex justify-content-between align-items-center pd-x-20-f pd-y-15-f">
                <h5 className="tx-dark mg-lg-b-0">Payment history</h5>
                <div className="gv-datime-luong">
                    <div className="form-row from-to-group" id="filter-time">
                        <div className="wd-sm-200 col">
                            <Flatpickr
                                options={{
                                    dateFormat: "d/m/Y",
                                }}
                                className="form-control"
                                onChange={(date) => setFromDate(date)}
                                placeholder="From date"
                            />
                        </div>
                        <div className="wd-sm-200 col">
                            <Flatpickr
                                options={{
                                    dateFormat: "d/m/Y",
                                    onOpen: function (selectedDates, dateStr, instance) {
                                        console.log(instance);
                                        if (fromDate === '') return;
                                        instance.set("minDate", new Date(fromDate));

                                    }
                                }}
                                className="form-control"
                                onChange={(date) => setToDate(date)}
                                placeholder="To date"

                            />
                        </div>
                        <div className="flex-grow-0 tx-right flex-shrink-0 pd-x-5">
                            <button type="button" className="btn btn-primary " onClick={loadHistoryAPI}><i className="fa fa-search" /></button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="card-body pd-20-f">
                <div className="table-responsive">
                    <table className="table">
                        <thead className="thead-light">
                            <tr className="gv-bg-table">
                                <th className="tx-left">Date </th>
                                <th className="tx-center">Total salary</th>
                                <th className="tx-center">Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <>
                                    <tr>
                                        <td><Skeleton /></td>
                                        <td><Skeleton /></td>
                                        <td><Skeleton /></td>
                                    </tr>
                                    <tr>
                                        <td><Skeleton /></td>
                                        <td><Skeleton /></td>
                                        <td><Skeleton /></td>
                                    </tr>
                                    <tr>
                                        <td><Skeleton /></td>
                                        <td><Skeleton /></td>
                                        <td><Skeleton /></td>
                                    </tr>
                                </>
                            ) : (
                                    !!data && !!data.length > 0 ? data.map((item, index) => <RenderRow key={`${index}`} data={item} />) : (<tr><td colSpan={3}><span className="tx-danger d-block tx-center tx-medium tx-16">No history record.</span></td></tr>)
                                )}


                        </tbody>
                    </table>
                </div>
                {!!data && !!data.length > data.PageSize && (
                    <Pagination
                        innerClass="pagination"
                        activePage={pageNumber}
                        itemsCountPerPage={data.PageSize || 0}
                        totalItemsCount={data.TotalResult || 0}
                        pageRangeDisplayed={5}
                        onChange={(page) => setPageNumber(page)}
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="active"
                    />
                )}
            </div>
        </div>
    )
}



export default PaymentHistory;
