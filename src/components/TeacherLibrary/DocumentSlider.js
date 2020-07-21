import React, { useState, useEffect, useRef } from 'react';
import { getLibraryByCategoryID } from '~src/api/teacherAPI';
import LibraryCard from './../LibraryCard';
import Skeleton from 'react-loading-skeleton';


const SkeletonCourse = () => {
    return (
        <>
            <Skeleton height={100} className="mg-b-5" />
            <Skeleton className="mg-b-5" />
            <Skeleton className="mg-b-5" />
        </>
    )
}

const DocumentSlider = ({ categoryID, slideTitle, moreLink, titleIcon }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [listItems, setListItems] = useState(null);
    const slideRef = useRef(true);
    const initSwiper = () => {
        new Swiper(slideRef.current, {
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            slidesPerView: 4,
            spaceBetween:10,
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // And if we need scrollbar
        });
    }

    const getCourseLists = async () => {
        const res = await getLibraryByCategoryID({ CategoryLibraryID: categoryID });
        if (res.Code !== 1) return;
        setListItems(res.Data);
        setIsLoading(false);
        initSwiper();
    }

    useEffect(() => {
        getCourseLists();
        return () => {
            slideRef.current = false;
        }
    }, []);


    return (
        <div className="foundations">
            <div className="d-xl-flex align-items-center justify-content-between mg-b-15">
                <h3 className="mg-b-0 gradient-heading"><i className={`fas ${titleIcon} mg-r-10-f`}></i>{slideTitle}
                </h3>
                {!!moreLink && (
                    <div className="more-btn">
                        <a href="#">More ›</a>
                    </div>
                )}
            </div>
            {isLoading ? (
                <div className="d-flex">
                    <div className="col-3">
                        <SkeletonCourse />
                    </div>
                    <div className="col-3">
                        <SkeletonCourse />
                    </div>
                    <div className="col-3">
                        <SkeletonCourse />
                    </div>
                    <div className="col-3">
                        <SkeletonCourse />
                    </div>
                </div>
            ) : (
                    !!listItems && listItems.length > 0 ? (
                        <div className="swiper-container" ref={slideRef}>
                            {/* Additional required wrapper */}
                            <div className="swiper-wrapper">
                                {listItems.map((item, index) => <LibraryCard
                                    key={`${parseInt(item.ID) + index}`}
                                    title={item.LibraryName}
                                    imageUrl={item.BackgroundIMGThumbnails}
                                    urlDownload={item.LinkFile}
                                    category={slideTitle} />
                                )}
                            </div>
                            {/* Slides */}
                            {/* If we need navigation buttons */}
                            <div className="swiper-button-prev" />
                            <div className="swiper-button-next" />
                            {/* If we need scrollbar */}
                        </div>
                    ) : (
                            <h6 className="tx-gray-500">This category not have any documents</h6>
                        )
                )}
        </div>

    )
}


DocumentSlider.defaultProps = {
    titleIcon: 'fa-book-open'
}

export default DocumentSlider;

