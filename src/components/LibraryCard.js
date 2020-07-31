import React from 'react';
import ReactDOM from 'react-dom';

const LibraryCard = ({title, imageUrl, category, urlDownload }) =>{
    return (
        <React.Fragment>
            <div className="swiper-slide">
                <a href={urlDownload} rel="noopener" target="_blank">
                    <img src="https://mshoagiaotiep.com/uploads/images/userfiles/2020/02/khoa_hoc_tieng_anh_giao_tiep.jpg" alt="" className="img-100" />
                </a>
                <h5 className="py-2"> 
                    <a href={urlDownload} rel="noopener" target="_blank">{title}</a>
                </h5>
                <p className="smalltext-item-foundation mg-b-0">{category}</p>
            </div>
        </React.Fragment>
    )
}

export default LibraryCard;