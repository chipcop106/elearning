import React, { useState, useEffect } from 'react';
import SkeletonTable from '~components/common/Skeleton/SkeletonTable';
import { getMissingFeedback } from '~src/api/teacherAPI';
import Pagination from "react-js-pagination";

const MissingFeedbackRow = ({ data }) => {
    const { ScheduleTimeVN, ScheduleTimeUTC, DocumentName, LessionName } = data;
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
            <td className="clr-feedbackStatus">
                <div>
                    <span className="tx-medium mg-r-5">Student:</span>
                    <span className="tx-success">Done</span>
                </div>
                <div className="mg-b-5">
                    <span className="tx-medium mg-r-5">Teacher:</span>
                    <span className="tx-danger">Not feedback</span>
                </div>

            </td>
            <td className="clr-actions">
                <a href={`teacherLessonDetail.html`} className="btn btn-sm btn-warning rounded-5"><i className="fa fa-comment-alt clrm-icon" /> Feedback</a>
            </td>
        </tr>
    )
}



const MissingFeedbackTable = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState([]);

    const loadMissingFeedback = async () => {
        try {
            const res = await getMissingFeedback({ Page: pageNumber });
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

    useEffect(() => {
        loadMissingFeedback();
    }, [pageNumber])

    return (
        <>
            {
                isLoading ? <SkeletonTable /> : (
                    <>
                        <div className="table-responsive">
                            <table className="table table-classrooms">
                                <thead>
                                    <tr className="thead-light">
                                        <th className="clr-time">Lesson Times</th>
                                        <th className="clr-lesson">Lesson Info</th>
                                        <th className="clr-feedbackStatus">Feedback Status</th>
                                        <th className="clr-actions">Actions</th>
                                    </tr>
                                </thead>
                                {/*1 item*/}
                                <tbody>
                                    {!!data && !!data.length > 0 ? data.map(item => <MissingFeedbackRow key={`${item.BookingID}`} data={item} />) : (<tr><td colSpan={4}><span className="tx-danger d-block tx-center tx-medium tx-16">No data found.</span></td></tr>)}
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
                                onChange={(page) => setPageNumber(page)}
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

export default MissingFeedbackTable;