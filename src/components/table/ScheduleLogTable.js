import React, { useState, useEffect, createRef } from 'react';
import ReactDOM from 'react-dom';
import StudentInformationModal from '~components/StudentInformationModal';
import SkeletonTable from '~components/common/Skeleton/SkeletonTable';
import { getScheduleLog } from '~src/api/teacherAPI';
import Pagination from "react-js-pagination";

const OperationRow = ({data}) => {
    const {OparationTime, CreatedBy, ScheduleTimeOfTeacher, ScheduleTimeLocal, Previous, UpdatedAction} = data;
    return (
        <tr>
            <td>{OparationTime}</td>
            <td className="tx-center">{CreatedBy}</td>
            <td>{ScheduleTimeLocal}</td>
            <td>{ScheduleTimeOfTeacher}</td>
            {/* <td className="tx-center">
                {Previous === 'Close' ? <span className="badge badge-danger">Closed</span> : <span className="badge badge-success">Open</span>}
                <span className="badge badge-danger">Closed</span>
            </td> */}
            <td className="tx-center">
                {UpdatedAction === 'Close' ? <span className="badge badge-danger">Closed</span> : <span className="badge badge-success">Open</span>}
                {/* <span className="badge badge-success">Open</span> */}
            </td>
        </tr>
    )
}



const ScheduleLogTable = ({ showStudentModal }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState(null);

    const loadScheduleLogData = async () => {
        try {
            const res = await getScheduleLog({
                Page: pageNumber
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

    const _handlePageChange = (value) => {
        console.log('Page active is: ', value)
        setPageNumber(value)
    }

    useEffect(() => {
        loadScheduleLogData();
    }, [pageNumber])

    return (
        <>
            {
                isLoading ? <SkeletonTable /> : (
                    <>
                        <div className="table-responsive mg-b-15">
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Operation time</th>
                                        <th className="tx-center">Operator</th>
                                        <th>Schedule time (Local)</th>
                                        <th>Schedule time (VN)</th>
                                        {/* <th className="tx-center">Previous Action</th> */}
                                        <th className="tx-center">Updated Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!!data && !!data.length > 0 ? data.map((item, index) => <OperationRow key={`${index}`} data={item} showStudentModal={showStudentModal} />) : (<tr><td colSpan={6}><span className="tx-danger d-block tx-center tx-medium tx-16">No data found.</span></td></tr>)}
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

export default ScheduleLogTable;