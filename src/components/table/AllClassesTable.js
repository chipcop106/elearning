import React, { useState, useEffect, createRef } from 'react';
import ReactDOM from 'react-dom';
import StudentInformationModal from '~components/StudentInformationModal';
import SkeletonTable from '~components/common/Skeleton/SkeletonTable';
import { getAllClass } from '~src/api/teacherAPI';
import Pagination from 'react-js-pagination'
const AllClassRow = ({ data, showStudentModal }) => {
    const {
        Status,
        StatusString,
        FinishTypeString,
        ScheduleTimeVN = '',
        ScheduleTimeUTC = '',
        LessionMaterial = '',
        StudentName = '',
        BookingID = '',
        LessionName = '',
        SkypeID,
        StudentUID
    } = data;
    return (
        <tr>
            <td className="clr-id">
                <span className="tx-gray-500">{BookingID}</span>
            </td>
            <td className="clr-lesson">
            
                <span className="tx-gray-500">{LessionName}</span>
            </td>
            <td className="clr-student">
                <a href={`#`} onClick={(e) => { e.preventDefault(); showStudentModal(StudentUID) }} className="clrm-studentname">{StudentName}<i className="fa fa-mars mg-l-10 clrm-icon-male" /></a>
            </td>
            <td className="clr-time">
                <div className="mg-b-5">
                    <span className="tx-medium mg-r-5"><i className="fa fa-clock"></i> VN:</span>
                    <span className="tx-gray-500">{ScheduleTimeVN}</span>
                </div>
                <div className="mg-b-5">
                    <span className="tx-medium mg-r-5"><i className="fa fa-clock"></i> UTC:</span>
                    <span className="tx-gray-500">{ScheduleTimeUTC}</span>
                </div>
            </td>
            <td className="clr-status">
            <span className={`badge badge-${Status === 1 ? 'warning' : 'success'} pd-5`}>{StatusString && StatusString.toString().toUpperCase()}</span>
                {/* {Status === 1 && <span className="badge badge-warning pd-5">BOOKED</span>}
                {Status === 2 && <span className="badge badge-success pd-5">FINISHED</span>} */}
            </td>
            <td className="clr-finishType">
                {Status === 2 && <span className="tx-gray-500">{FinishTypeString}</span>}
                {/* <span className="tx-gray-500">AS SCHEDULE</span>
                <span className="tx-gray-500">TEACHER NO SHOW</span>
                <span className="tx-gray-500">STUDENT NO SHOW</span>
                <span className="tx-gray-500">TEACHER LATE</span>
                <span className="tx-gray-500">IT PROBLEM</span> */}
            </td>
            <td className="clr-actions">
                <a href={LessionMaterial} className="btn btn-sm btn-warning rounded-5 mg-r-10" target="_blank" rel="noopener"><i className="fa fa-book-open clrm-icon" /> Material</a>
                {Status === 1 && <a href={`skype:${SkypeID}?chat`} className=" btn btn-sm btn-warning rounded-5"><i className="fab fa-skype clrm-icon" /> Enter Class</a>}
            </td>
        </tr>
    )
}

const UpCommingTable = ({showStudentModal}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [filterStatusAllClass, setFilterStatusAllClass] = React.useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [data, setData] = useState(null);

    const _onFilterDate = (e) => {
        e.preventDefault();
        const fromDate = document.querySelector('#filter-time .from-date');
        const toDate = document.querySelector('#filter-time .to-date');
        console.log({ fromDate, toDate });
    }

    const _changeFilterStatusAllClass = (event) => {
        setFilterStatusAllClass(event.target.value);
        //LoadAjax table
    }
    
    const loadAllClassesData = async () => {
        try {
            const res = await getAllClass({ 
                Page: pageNumber,
                Status:filterStatusAllClass
            });
            if (res?.Code && res.Code === 1) {
                setData(res.Data);
            } else {
                console.log('Code response khác 1');
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const _onClickPage = (e) => {
        const target = e.target;
    }

    useEffect(() => {
        loadAllClassesData();
    }, [pageNumber])

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mg-b-15">
                <div>
                    <select name="language" id=""
                        value={filterStatusAllClass}
                        className="form-control" onChange={_changeFilterStatusAllClass}>
                        <option value="1">All status</option>
                        <option value="2">Booked</option>
                        <option value="3">Finished</option>
                    </select>
                </div>
                <div className="form-row from-to-group" id="filter-time">
                    <div className="wd-sm-200 col">
                        <input type="text" name="start-day " className="form-control datetimepicker from-date" placeholder="From date" />
                    </div>
                    <div className="wd-sm-200 col">
                        <input type="text" name="end-day" className="form-control datetimepicker to-date" placeholder="To date" />
                    </div>
                    <div className="flex-grow-0 tx-right flex-shrink-0 pd-x-5">
                        <button type="button" className="btn btn-info " onClick={_onFilterDate}><i className="fa fa-filter" /> Filter</button>
                    </div>
                </div>
            </div>

            {
                isLoading ? <SkeletonTable /> : (
                    <>

                        <div className="table-responsive">
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th className="clr-id">Lesson ID</th>
                                        <th className="clr-lesson">Lesson Name</th>
                                        <th className="clr-student">Student Name</th>
                                        <th className="clr-time">Schedule Time</th>
                                        <th className="clr-status">Status</th>
                                        <th className="clr-finishType">Finish Type</th>
                                        <th className="clr-actions">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!!data && !!data.length > 0 && data.map(item =>  <AllClassRow key={`${item.BookingID}`} data={item} showStudentModal={showStudentModal} />)}
                                </tbody>
                            </table>
                        </div>

                        {!!data && !!data.length > 10 && (
                            <Pagination 
                                innerClass="pagination"
                                activePage={pageNumber}
                                itemsCountPerPage={10}
                                totalItemsCount={100}
                                pageRangeDisplayed={5}
                                onChange={_handlePageChange}
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="active"
                            />
                        )}
                    </>
                )
            }
        </>
    )
}

export default UpCommingTable;