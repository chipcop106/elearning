import React from 'react';
import ReactDOM from 'react-dom';

import LibraryCard from './../LibraryCard';


const DocumentSlider = ({ listItems, slideTitle, moreLink, titleIcon }) => {
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
            <div className="swiper-container">
                {/* Additional required wrapper */}
                <div className="swiper-wrapper">
                    {!!listItems && listItems.length > 0
                        && listItems.map(item => <LibraryCard
                            key={`${item.id}`}
                            title={item.title}
                            imageUrl={item.imageUrl}
                            urlDownload={item.urlDownload}
                            category={item.category} />
                        )}
                </div>
                {/* Slides */}
                {/* If we need navigation buttons */}
                <div className="swiper-button-prev" />
                <div className="swiper-button-next" />
                {/* If we need scrollbar */}
            </div>
        </div>

    )
}


DocumentSlider.defaultProps = {
    titleIcon:'fa-book-open'
}

export default DocumentSlider;

