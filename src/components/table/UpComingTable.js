import React, { useState, useEffect, createRef } from 'react';
import ReactDOM from 'react-dom';
import SkeletonTable from '~components/common/Skeleton/SkeletonTable';
import { getUpcomingClass } from '~src/api/teacherAPI';
import Pagination from "react-js-pagination";

const UpcomingRow = ({ data, showStudentModal }) => {
    const { ScheduleTimeVN, ScheduleTimeUTC, StudentName, StudentUID, DocumentName, LessionName, SkypeID, StatusString, Status, LessionMaterial } = data;
    return (
        <tr>
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
            <td className="clr-lesson">
                <div className="mg-b-5">
                    <span className="tx-primary tx-medium">{DocumentName}</span>
                </div>
                <div className="mg-b-5">
                    <span className="tx-medium mg-r-5">Lesson name:</span>
                    <span className="tx-gray-500">{LessionName}</span>
                </div>

            </td>
            <td className="clr-student">
                <a href={`#`} onClick={(e) => { e.preventDefault(); showStudentModal(StudentUID) }} className="clrm-studentname">{StudentName}<i className="fa fa-mars mg-l-10 clrm-icon-male" /></a>
            </td>
            <td className="clr-status">
                <span className={`badge badge-${Status === 1 ? 'warning' : 'success'} pd-5`}>{StatusString && StatusString.toString().toUpperCase()}</span>
                {/* {status === 1 && <span className="badge badge-warning pd-5">BOOKED</span>}
                {status === 2 && <span className="badge badge-success pd-5">FINISHED</span>} */}

            </td>
            <td className="clr-actions">
                <a href={LessionMaterial} className="btn btn-sm btn-warning rounded-5 mg-r-10" target="_blank" rel="noopener"><i className="fa fa-book-open clrm-icon" /> Material</a>
                <a href={`skype:${SkypeID}?chat`} className=" btn btn-sm btn-warning rounded-5"><i className="fab fa-skype clrm-icon" /> Enter Class</a>

            </td>
        </tr>
    )
}

const UpCommingTable = ({ updateSwiperHeight, showStudentModal }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState(null);

    const loadUpcomingClasses = async () => {
        try {
            const res = await getUpcomingClass({ Page: pageNumber });
            if (res?.Code && res.Code === 1) {
                setData(res.Data);
            } else {
                console.log('Code response khác 1');
            }
            setIsLoading(false);
            updateSwiperHeight();
            return;
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
        setData([]);
    }

    const _onClickPage = (e) => {
        const target = e.target;
    }

    useEffect(() => {
        loadUpcomingClasses();
    }, [])

    return (
        <>
            {
                isLoading ? <SkeletonTable /> : (
                    <>
                        <div className="table-responsive">
                            <table className="table table-classrooms">
                                <thead>
                                    <tr className="thead-light">
                                        <th className="clr-time">Scheduled Times</th>
                                        <th className="clr-lesson">Course</th>
                                        <th className="clr-student">Student</th>
                                        <th className="clr-status">Status</th>
                                        <th className="clr-action">Actions</th>
                                    </tr>
                                </thead>
                                {/*1 item*/}
                                <tbody>
                                    {!!data && !!data.length > 0 ? data.map(item => <UpcomingRow key={`${item.BookingID}`} data={item} showStudentModal={showStudentModal} />) 
                                    : (<tr><td colSpan={5}><span className="tx-danger d-block tx-center tx-medium tx-16">No upcoming classes.</span></td></tr>)}
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