import React, {useState, useReducer, useEffect} from 'react';
import ReactDOM from 'react-dom';
import DocumentSlider from './DocumentSlider';
import Skeleton from 'react-loading-skeleton';
import {getListCategoryLibrary} from '~src/api/teacherAPI';

const TeacherLibrary = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);

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
                                <img src="../assets/img/library.png" alt="" className="img-banner" />
                            </a>
                        </div>
                    </div>
                    <div className="col-sm-12 col-ms-12 col-lg-8 col-xl-9 bannerAndSlide">
                        <div className="banner-slide">
                            <DocumentSlider categoryID={2} slideTitle='New Cirriculum' />
                            {/*/foundation*/}
                        </div>
                    </div>
                </div>
                {
                    !!categories && categories.length > 0 && [...categories].map(category => <DocumentSlider key={`${category.ID}`} categoryID={category.ID} slideTitle={category.CategoryLibrary}/>)
                }
            </div>

        </>
    )
}

const domContainer = document.getElementById('react-teacher-library');
ReactDOM.render(<TeacherLibrary />, domContainer);