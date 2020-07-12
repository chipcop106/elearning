import React, {useState, useReducer, useEffect} from 'react';
import ReactDOM from 'react-dom';
import DocumentSlider from './DocumentSlider';
import Skeleton from 'react-loading-skeleton';
import {getListCategoryLibrary} from '~src/api/teacherAPI';
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



const TeacherLibrary = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const updateLibrary = ({key, value}) => {
        dispatch({type:'UPDATE_LIBRARY', payload:{key, value}})
    }

    const getCategories = async () => {
        const res = await getListCategoryLibrary();
        if(res.Code !== 1) return;
        setCategories(res.Data);
        setIsLoading(false);
    }

    useEffect(() => {
        getCategories();
    },[])

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
                            <DocumentSlider categoryID={1} slideTitle='Teaching Cirriculum' />
                            {/*/foundation*/}
                        </div>
                    </div>
                </div>
                {/*s2*/}
                {/*/right*/}
                <div className="mg-y-30 filter-category">
                    <div className="list-button py-2 mt-2 mb-2">
                        {!isLoading ? !!categories && categories.length > 0 && categories.map(cat => <a key={`${cat.ID}`} className="btn btn-primary mg-x-10" href="#">{cat.CategoryLibrary}</a>) : (<div className="d-flex"><Skeleton width={100} height={40} className="mg-x-10"/><Skeleton width={100} height={40} className="mg-x-10"/><Skeleton width={100} height={40} className="mg-x-10"/></div>)}
                    </div>
                </div>
                {/*foundation*/}
                <DocumentSlider categoryID={1} slideTitle='Adults Courses' titleIcon="fa-user" />
                {/*/foundation*/}
                <DocumentSlider categoryID={2} slideTitle='Kids Courses' titleIcon="fa-baby" />
                <DocumentSlider categoryID={1} slideTitle='Teens Courses' titleIcon="fa-child" />
                <DocumentSlider categoryID={1} slideTitle='Free Talks' titleIcon="fa-microphone" />
                <DocumentSlider categoryID={1} slideTitle='IELTS' />
                {/*foundation copy*/}
            </div>

        </>
    )
}

const domContainer = document.getElementById('react-teacher-library');
ReactDOM.render(<TeacherLibrary />, domContainer);