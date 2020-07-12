import React, {useState, useEffect} from 'react';
import LessonCard from '~components/LessonCard';
import SkeletonLessonCard from '../common/Skeleton/SkeletonLessonCard';
import { getBookingRequest } from '~src/api/teacherAPI';
import Flatpickr from 'react-flatpickr';
const BookingRequest = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [lessons, setLessons] = useState(null);
    const [courseSelect, setCourseSelect] = useState('1');
    const [pageNumber, setPageNumber] = useState(1);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const loadBookingRequestData = async () => {
        try {
            const res = await getBookingRequest({ 
                Page: pageNumber,
            });
            if (res?.Code && res.Code === 1) {
                setLessons(res.Data);
            } else {
                console.log(res);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadBookingRequestData();
    }, [pageNumber])

    return (
        <div className="course-horizental">
            <div className="empty-error tx-center mg-y-30 bg-white">
                <img src="../assets/img/no-booking.svg" alt="image" className="wd-200 mg-b-15" />
                <p className=" tx-danger tx-medium">You don't have any book lesson with student</p>
            </div>
            <div className="fb-summary-container pd-x-20-f pd-b-0-f pd-t-20-f ">
                <form method="get" className="st-date">
                    <div className="row from-to-group">
                        <div className="col-12 col-md-3 form-group">
                            <select value={courseSelect} className="form-control" onChange={(event) => setCourseSelect(event.target.value)}>
                                <option value="1">All course</option>
                                <option value="2">IELTS 8.0 Professional</option>
                            </select>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 form-group">
                        <Flatpickr
                                            placeholder="To date"
                                            options={{
                                                dateFormat: "d/m/Y",
                                            }}
                                            className="form-control"
                                            onChange={(date) => setFromDate(date)}
                                        />
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 form-group">
                        <Flatpickr
                                            placeholder="To date"
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
                                        />
                        </div>

                        <div className="form-group col-md-3">
                            <button className="btn btn-info btn-block"><i className="fa fa-search mg-r-5" /> Search</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="list-wrap ">
                <div className="row">
                    {isLoading ? (
                        <>
                        <div className="col-lg-6">
                        <SkeletonLessonCard />
                        </div>
                        <div className="col-lg-6">
                        <SkeletonLessonCard />
                        </div>
                        </>
                    ) : (
                        <>
                        {!!lessons && !!lessons.length > 0 && data.map(lesson => <div className="col-lg-6">
                            <LessonCard
                                courseName="IELST Professional 8.0"
                                studentName="Truong Van Lam"
                                lessonDate="Monday, 30/04/2020"
                                lessonStart="10:30AM"
                                lessonEnd="11:00AM"
                                lessonStatus="Lesson 2"
                                studentNote="Good job, you have excellent coding skills !!"
                                cancellable={false}
                                documents={[{
                                    id: 1,
                                    name: "doc 1",
                                    extension: "docx",
                                    link: 'http://mona.media'
                                },
                                {
                                    id: 2,
                                    name: "doc 2",
                                    extension: "exce",
                                    link: 'http://mona.media'
                                }]}
                            />
                        </div>)
                        }
                        {!!lessons && !!lessons.length > 10 && (
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
                    )}
                </div>
            </div>
        </div>

    );
}

export default BookingRequest;


