import React from 'react';
import ReactDOM from 'react-dom';
import LessonItem from './LessonItem'
import SkeletonLessonHistoryCard from "../common/Skeleton/SkeletonLessonHistoryCard";
import { randomId } from "../../utils"
import { getLessonHistory } from "../../api/studentAPI";
import { convertDateFromTo } from "../../utils.js"
import Pagination from "react-js-pagination";

let initialState = {}

const LessonList = ({ searchInput }) => {
    const [page, setPage] = React.useState(1)
    const [state, setState] = React.useState(initialState);
    const [loading, setLoading] = React.useState(false);

    const getAPI = async () => {
        setLoading(true);
        const lessons = await getLessonHistory({
            FromDate: searchInput.fromDate,
            ToDate: searchInput.toDate
        });
        setState(lessons.Data)

        setLoading(false);
    }


    const handlePageChange = (pageNumber) =>  {
        setPage(pageNumber);
      }

    React.useEffect(() => {
        getAPI()
    }, [searchInput]);

    return loading ? <SkeletonLessonHistoryCard /> :
        <React.Fragment>
            <div className="table-responsive">
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Course</th>
                            <th>Date</th>
                            <th>Lesson</th>
                            <th>Teacher</th>
                            <th>Checkin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !!state && Array.isArray(state) && state.length > 0 &&
                            state.map(item => <LessonItem
                                key={item.CoursesID}
                                CoursesID={item.CoursesID}
                                CoursesName={item.CoursesName}
                                LessionID={item.LessionID}
                                LessionName={item.LessionName}
                                start={convertDateFromTo(item.SchudeDate).fromTime}
                                end={convertDateFromTo(item.SchudeDate).endTime}
                                date={convertDateFromTo(item.SchudeDate).date}
                                Teacher={item.Teacher}
                                Status={item.Status} />)
                        }
                    </tbody>
                </table>
            </div>
            <Pagination
                innerClass="pagination justify-content-end mt-3"
                activePage={page}
                itemsCountPerPage={10}
                totalItemsCount={450}
                pageRangeDisplayed={5}
                itemClass="page-item"
                linkClass="page-link"
                onChange={handlePageChange.bind(this)}
            />
        </React.Fragment>
}

export default LessonList;