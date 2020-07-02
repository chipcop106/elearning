import React from 'react';
import ReactDOM from 'react-dom';
import DocumentSlider from './DocumentSlider';

const TeachingCirriculum = [
    {
        id: 1,
        title: 'Teaching Cirriculum 1',
        imageUrl: 'https://mshoagiaotiep.com/uploads/images/userfiles/2020/02/khoa_hoc_tieng_anh_giao_tiep.jpg',
        urlDownload: 'http://mona.media',
        category: 'IELTS 8.0 Professional'
    },
    {
        id: 2,
        title: 'Teaching Cirriculum 2',
        imageUrl: 'https://mshoagiaotiep.com/uploads/images/userfiles/2020/02/khoa_hoc_tieng_anh_giao_tiep.jpg',
        urlDownload: 'http://mona.media',
        category: 'IELTS 8.0 Professional'
    },
    {
        id: 3,
        title: 'Teaching Cirriculum 2',
        imageUrl: 'https://mshoagiaotiep.com/uploads/images/userfiles/2020/02/khoa_hoc_tieng_anh_giao_tiep.jpg',
        urlDownload: 'http://mona.media',
        category: 'IELTS 8.0 Professional'
    },
    {
        id: 4,
        title: 'Teaching Cirriculum 4',
        imageUrl: 'https://mshoagiaotiep.com/uploads/images/userfiles/2020/02/khoa_hoc_tieng_anh_giao_tiep.jpg',
        urlDownload: 'http://mona.media',
        category: 'IELTS 8.0 Professional'
    },
    {
        id: 5,
        title: 'Teaching Cirriculum 5',
        imageUrl: 'https://mshoagiaotiep.com/uploads/images/userfiles/2020/02/khoa_hoc_tieng_anh_giao_tiep.jpg',
        urlDownload: 'http://mona.media',
        category: 'IELTS 8.0 Professional'
    }
]

const categories = [
    {
        id: 1,
        title: 'Adults Courses'
    },
    {
        id: 2,
        title: 'Kids Courses'
    },
    {
        id: 3,
        title: 'Teens Courses'
    },
    {
        id: 4,
        title: 'Free Talks'
    },
    {
        id: 5,
        title: 'IELTs'
    }
]

const TeacherLibrary = () => {

    const initSwiper = () => {
        const mySwiper = new Swiper('.swiper-container', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            slidesPerView: 4,
            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
            },
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // And if we need scrollbar
        });
    }

    React.useEffect(() => {
        initSwiper();
    });

    return (
        <>
            <div className="library-wrap">
                {/*s1*/}
                <div className="row">
                    <div className="col-sm-12 col-ms-12 col-lg-4 col-xl-3 bannerAndSlide  mb-2 ">
                        <div className="banner">
                            <a href="#">
                                <img src="https://via.placeholder.com/300x250" alt="" className="img-banner" />
                            </a>
                        </div>
                    </div>
                    <div className="col-sm-12 col-ms-12 col-lg-8 col-xl-9 bannerAndSlide">
                        <div className="banner-slide">
                            <DocumentSlider listItems={TeachingCirriculum} slideTitle='Teaching Cirriculum' />
                            {/*/foundation*/}
                        </div>
                    </div>
                </div>
                {/*s2*/}
                {/*/right*/}
                <div className="mg-y-30 filter-category">
                    <div className="list-button py-2 mt-2 mb-2">
                        {!!categories && categories.length > 0 && categories.map(cat => <a className="btn btn-primary mg-x-10" href="#">{cat.title}</a>)}
                    </div>
                </div>
                {/*foundation*/}
                <DocumentSlider listItems={TeachingCirriculum} slideTitle='Adults Courses' titleIcon="fa-user" />
                {/*/foundation*/}
                <DocumentSlider listItems={TeachingCirriculum} slideTitle='Kids Courses' titleIcon="fa-baby" />
                <DocumentSlider listItems={TeachingCirriculum} slideTitle='Teens Courses' titleIcon="fa-child" />
                <DocumentSlider listItems={TeachingCirriculum} slideTitle='Free Talks' titleIcon="fa-microphone" />
                <DocumentSlider listItems={TeachingCirriculum} slideTitle='IELTs' />
                {/*foundation copy*/}
            </div>

        </>
    )
}

const domContainer = document.getElementById('react-teacher-library');
ReactDOM.render(<TeacherLibrary />, domContainer);