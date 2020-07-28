import React from 'react';
import ReactDOM from 'react-dom';
import { randomId } from "~src/utils"
import TeacherSupportModal from "~components/TeacherSupportModal"
import { ToastContainer } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import styles from "~components/TeacherSupport/teacherSupport.module.scss"

const initialState = {
    author: 'Trương Văn Lam',
    location: 'Vietnam',
    avatar: null,
    title: 'Yêu cầu trả lương trước tết !!',
    content: `<p>Greetings!</p>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p>
            <p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. </p>
            <p>Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem.</p><p><span>Sincerely yours,</span><br /><strong>Mona Media Team</strong></p>`,
    files: [
        {
            id: 1,
            name: 'Image 1',
            url: 'https://drive.google.com/drive/'
        },
        {
            id: 2,
            name: 'Image 2',
            url: 'https://drive.google.com/drive/'
        },
    ],
    date: '20/04/2020 10:30AM',
}


const SupportDetail = ({onClickBack, detailId}) => {
    const [state, setState] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const getDetail = async () => {
        setIsLoading(true);
        //Call API
        await setTimeout(() => {
            setState(initialState)
            setIsLoading(false);
        }, 1500)
 
   
    }

    const _onClickBack = (e) => {
        e.preventDefault();
        onClickBack();
    }

    React.useEffect(() => {
        getDetail();
    },[detailId])
    return (
        <>
            <div className="">
                <button type="button" className="btn btn-sm btn-light mg-b-15" onClick={_onClickBack}><i className="fas fa-arrow-left mg-r-5" ></i> Back</button>
                <div className="mg-b-30 bd-b pd-b-10 d-flex align-items-center justify-content-between">
                    <h5 className="mg-b-0">{isLoading ? <Skeleton width={200} height={25}/> : state?.title ?? ''}</h5>
                    <span className="tx-gray-300">{isLoading ? <Skeleton width={100} height={25}/> : state?.date ?? ''}</span>
                </div>
                
                <div className="d-flex align-items-center">
                    <span className="avatar avatar-md">
                        {
                            isLoading ? (<Skeleton circle={true} width={48} height={48}/>) 
                            :  <img src={state?.avatar ?? '../assets/img/default-avatar.png'} className="rounded-circle" /> 
                        }
                    </span>
                    <div className="mg-l-10">
                        <h6 className="tx-semibold mg-b-0">{isLoading ? <Skeleton width={100} height={25}/> : state?.author ?? ''}</h6>
                        <span className="tx-color-03">{isLoading ? <Skeleton width={100} height={25}/> : state?.location ?? ''}</span>
                    </div>
                </div>
                {
                    isLoading ? <div className="pd-y-30"><Skeleton count={5}/></div> :  <div className="pd-y-30" dangerouslySetInnerHTML={{__html:state?.content ?? ''}}></div>
                }
               
                <div className="file-include pd-y-15 bd-t">
                    <h6>File attachment:</h6>
                    <div className="d-flex align-items-center flex-wrap">
                        {
                            isLoading ? <Skeleton width={100} height={25}/> : !!state && !!state.files && [...state.files].map(file => <a key={`${file.id}`} href={file.url} className="mg-5"><i className="fas fa-file mg-r-5"></i> {file.name}</a>)
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default SupportDetail;