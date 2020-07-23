import React, { useState, useEffect } from 'react';
import { getUpcomingClass, cancelSchedule } from '~src/api/teacherAPI';
import SkeletonLessonCard from '~components/common/Skeleton/SkeletonLessonCard';
import { convertDateFromTo as cvDate, checkCancelTime } from '~src/utils';
import CancelBookingTeacher from '~components/CancelBookingTeacher';
import LessonCard from '~components/LessonCard';
const initialState = {
    FullName: 'Hoang Uyen Than',
    "Address": "Hồ Chí Minh",
    "Gender": 1,
    "BirthDay": "2020-07-10T09:52:14.5215882+07:00",
    "SkypeID": "live:shockdie1995",
    "Phone": "0909090909",
    "Username": "thaivietdat",
    "Email": "thaivietdat@gmail.com",
}



const UpComingList = () => {
    const [state, setState] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cancelData, setCancelData] = useState(null);
    const [showCancel, setShowcancel] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        const res = await getUpcomingClass({Page:1});
        if (res.Code === 1 && res.Data) {
            setState(res.Data);
        }else{
            setState([]);
        }
        setIsLoading(false);
    }


    const $mdCancel = $('#md-cancel-schedule');

    const handleCancelLesson = (lessonData) => {
        console.log('Booking cancel id: ', lessonData.lessonId);
        setCancelData(lessonData);
        $mdCancel.modal('show');
    }

    const refreshListUpcoming = (bookingId) => {
        const newUpcomings = [...state].filter(item => item.BookingID !== bookingId);
        setState(newUpcomings);
        console.log(bookingId);
    }

    useEffect(() => {
        console.log({state});
    }, [state]) 

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>


            <div className="course-horizental pd-t-15 ">
                <div className="list-wrap ">
                    {isLoading ? <SkeletonLessonCard /> : (
                        <div className="row">
                            {!!state && state.length > 0 ? (
                                [...state].map((lesson, index) => index < 6 && <div className="col-12" key={`${lesson.BookingID}`}>
                                    <LessonCard
                                        lessonId={lesson.BookingID}
                                        courseName={lesson.DocumentName}
                                        studentName={lesson.StudentName}
                                        lessonDate={cvDate(lesson.ScheduleTimeVN).date}
                                        lessonStart={cvDate(lesson.ScheduleTimeVN).fromTime}
                                        lessonEnd={cvDate(lesson.ScheduleTimeVN).endTime}
                                        lessonStatus={lesson.LessonName}
                                        cancellable={checkCancelTime(cvDate(lesson.ScheduleTimeVN).dateObject)}
                                        // cancellable={true} //Only for test cancel action, use above code for production
                                        skypeId={lesson.SkypeID}
                                        studentNote={lesson.SpecialRequest}
                                        documents={[{
                                            id: randomId(),
                                            name: "Tài liệu",
                                            extension: "",
                                            link: lesson.LessionMaterial
                                        }]}
                                        handleCancelLesson={handleCancelLesson}
                                    />
                                </div>)
                            ) : (
                                <div className="empty-error tx-center mg-y-30 bg-white mg-x-auto">
                                    <img src="../assets/img/no-booking.svg" alt="image" className="wd-200 mg-b-15" />
                                    <p className=" tx-danger tx-medium">You don't have any book lesson with student</p>
                                </div>
                                )
                            }
                        </div>
                    )}
                </div>
            </div>

            <CancelBookingTeacher
                BookingID={cancelData?.lessonId ?? ''}
                name="Warning !!"
                start={cancelData?.lessonStart ?? ''}
                end={cancelData?.lessonEnd ?? ''}
                date={cancelData?.lessonDate ?? ''}
                callback={refreshListUpcoming}
            />
        </>
    )
}


export default UpComingList;
