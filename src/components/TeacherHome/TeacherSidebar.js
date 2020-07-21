import React, {useState, useEffect} from 'react';
import { getTeacherInfo } from '~src/api/teacherAPI';
import Skeleton from 'react-loading-skeleton';
import {Modal} from 'react-bootstrap';
import { updatePassAPI } from '~src/api/optionAPI';
import { toastInit } from "~src/utils"
const initialState = {
    FullName: 'Hoang Uyen Than',
    Address: "Hồ Chí Minh",
    Gender: 1,
    BirthDay: "2020-07-10T09:52:14.5215882+07:00",
    SkypeID: "live:shockdie1995",
    Phone: "0909090909",
    Username: "thaivietdat",
    Email: "thaivietdat@gmail.com",
}

const SummaryBlock = ({ imageUrl, title, value, isLoading }) => {
    return (
        <div className="d-flex align-items-center mg-b-15">
            {!isLoading ? (<span className="bg-gray-100 wd-50 ht-50 rounded-circle d-inline-flex align-items-center justify-content-center">
                <img className="wd-30 ht-30 object-fit" src={imageUrl || '../assets/img/teacher.jpg'} />
            </span>) : (<Skeleton circle={true} width={30} height={30}/>)}
            
            <div className="mg-l-10">
                <p className="mg-b-0 tx-medium tx-20 tx-primary">{!isLoading ? (value) : (<Skeleton width={25}/>)} </p>
                <p className="tx-gray-500 mg-b-0">{!isLoading ? (title) : (<Skeleton width={25}/>)}</p>
            </div>
        </div>
    )
}

const ModalChangePass = ({error, showPassword, hideChangePasswordForm, _onSubmitPassword }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const _onSubmit = (e) => {
        e.preventDefault();
        _onSubmitPassword({oldPassword, newPassword});
    }

    return (
        <Modal 
        show={showPassword} 
        onHide={hideChangePasswordForm}
        size="sm"
        >
           <Modal.Header closeButton>
           <Modal.Title>Các bước lấy embed nhúng của youtube</Modal.Title>
           </Modal.Header>
           <Modal.Body>
               <div className="form-group">
                   <div className="input-float">
                       <input type="password" className="form-control" placeholder="Job title" onChange={(e) => setOldPassword(e.target.value)} defaultValue={''} />
                       <label>Old password</label>
                   </div>
               </div>
               <div className="form-group">
                   <div className="input-float">
                       <input type="password" className="form-control" placeholder="Job title" onChange={(e) => setNewPassword(e.target.value)} defaultValue={''} />
                       <label>New password</label>
                   </div>
               </div>
               {error && error !== '' && (<span className="tx-danger">{error}</span>)}
           </Modal.Body>
           <Modal.Footer>
           <Button variant="primary" onClick={_onSubmit}>
               Close
           </Button>
           <Button variant="secondary" onClick={hideChangePasswordForm}>
               Close
           </Button>
           </Modal.Footer>
       </Modal>
    )
}

const TeacherSidebar = () => {
    const [state, setState] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const showChangePasswordForm = () => {
        setShowPassword(true);
    }

    const hideChangePasswordForm = () => {
        setShowPassword(false);
    }

    const _onSubmitPassword = async (formData) => {
        const {oldPassword, newPassword} = formData;
        if(oldPassword === '' || newPassword === ''){
            setError('Password field must not empty !!');
            return;
        }
        setError(null);
        const res = await updatePassAPI({
            UID:state.UID,
            OldPass:oldPassword,
            NewPass:newPassword
        });
        if(res.Code === 0){
            setError('Old password not correct');
            return;
        }else if(res.Code === 1){
            setError(null);
            hideChangePasswordForm();
            toast.success("Change password successful!", toastInit);
        }
        
    }

    const fetchData = async () => {
        setIsLoading(true);
        const res = await getTeacherInfo();
        if(res.Code === 1 && res.Data){
            setState(res.Data);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <div className="mg-sm-r-30 mg-lg-r-0 d-sm-flex d-lg-block">
                <div className="mg-b-20 mg-sm-x-30 mg-lg-x-0">
                    <div className="avatar avatar-xxl avatar-online"><img src="../assets/img/default-avatar.png" className="rounded-circle" alt="" /></div>
                    <h5 className="mg-b-2 tx-spacing--1 mg-t-15">{!isLoading ? state.FullName || '' : <Skeleton width={50}/>}</h5>
                </div>{/* col */}
                <div className="d-flex mg-b-25">
                  <button type="button" className="btn btn-xs btn-primary flex-fill" onClick={showChangePasswordForm}>Change password</button>
                </div>
                <div >
                    <label className="tx-sans tx-10 tx-semibold tx-uppercase tx-color-01 tx-spacing-1 mg-b-15">Contact Information</label>
                    <ul className="list-unstyled profile-info-list mg-b-10">
                        <li><i data-feather="phone" /><a href="tel:0987654321">{!isLoading ? state.Phone || '' : <Skeleton width={50}/>}</a></li>
                        <li><i data-feather="mail" /><a href={`mailto:${state.Email || ''}`}>{!isLoading ? state.Email || '' : <Skeleton width={50}/>}</a>
                        </li>
                    </ul>
                </div>{/* col */}
            </div>
            <div >
                <label className="tx-sans tx-10 tx-semibold tx-uppercase tx-color-01 tx-spacing-1 mg-b-15">Summary</label>
                <div className="list-unstyled">
                    <SummaryBlock imageUrl='../assets/img/time-in-class.png' title="Hours Classes" value="32" isLoading={isLoading}/>
                    <SummaryBlock imageUrl='../assets/img/student.png' title="Student Members" value="172" isLoading={isLoading}/>
                    <SummaryBlock imageUrl='../assets/img/exp.png' title="Days Experience" value="122" isLoading={isLoading}/>

                </div>
            </div>{/* col */}
            <ModalChangePass 
                error={error}
                showPassword={showPassword}
                _onSubmitPassword={_onSubmitPassword}
                hideChangePasswordForm={hideChangePasswordForm}
            />
        </>
    )
}


export default TeacherSidebar
