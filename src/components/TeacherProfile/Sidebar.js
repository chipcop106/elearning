import React, { useState, useEffect } from 'react';
import { getTeacherInfo } from '~src/api/teacherAPI';
import Skeleton from 'react-loading-skeleton';
import { Modal, Button } from 'react-bootstrap';
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
            </span>) : (<Skeleton circle={true} width={30} height={30} />)}

            <div className="mg-l-10">
                <p className="mg-b-0 tx-medium tx-20 tx-primary">{!isLoading ? (value) : (<Skeleton width={25} />)} </p>
                <p className="tx-gray-500 mg-b-0">{!isLoading ? (title) : (<Skeleton width={25} />)}</p>
            </div>
        </div>
    )
}

const ModalChangePass = ({ error, showPassword, hideChangePasswordForm, _onSubmitPassword }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const _onSubmit = (e) => {
        e.preventDefault();
        _onSubmitPassword({ oldPassword, newPassword });
    }

    return (
        <Modal
            show={showPassword}
            onHide={hideChangePasswordForm}
            size="sm"
        >
            <Modal.Header closeButton>
                <Modal.Title>Change password</Modal.Title>
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
                    Change
           </Button>
                <Button variant="secondary" onClick={hideChangePasswordForm}>
                    Close
           </Button>
            </Modal.Footer>
        </Modal>
    )
}

const SideBar = ({ setActive, activePage }) => {
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
        const { oldPassword, newPassword } = formData;
        if (oldPassword === '' || newPassword === '') {
            setError('Password field must not empty !!');
            return;
        }
        setError(null);
        const res = await updatePassAPI({
            UID: state.UID,
            OldPass: oldPassword,
            NewPass: newPassword
        });
        if (res.Code === 0) {
            setError('Old password is not correct');
            return;
        } else if (res.Code === 1) {
            setError(null);
            hideChangePasswordForm();
            toast.success("Change password successful!", toastInit);
        }

    }

    const fetchData = async () => {
        setIsLoading(true);
        const res = await getTeacherInfo();
        if (res.Code === 1 && res.Data) {
            setState(res.Data);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <div className="card card-custom gutter-b wd-100p">
                {/*begin::Body*/}
                <div className="card-body">
                    {/*begin::Wrapper*/}
                    <div className="d-flex justify-content-between flex-column h-100">
                        {/*begin::Container*/}
                        <div>
                            {/*begin::Header*/}
                            <div className="d-flex flex-column flex-center  tx-center">
                                {/*begin::Symbol*/}
                                <div className="symbol symbol-120 symbol-circle symbol-success overflow-hidden mg-b-15">
                                    <span className="symbol-label">
                                        <img src="../assets/img/default-avatar.png" className="avatar-xxl align-self-end" alt="" />
                                    </span>
                                </div>
                                {/*end::Symbol*/}
                                {/*begin::Username*/}
                                <a href="#" className="card-title tx-primary tx-bolder tx-16">{!isLoading ? state.FullName || '' : <Skeleton width={50} />}</a>
                                {/*end::Username*/}
                                {/*begin::Info*/}
                                <div className="d-flex justify-content-between align-items-center mg-b-5">
                                    <span className="tx-medium">Phone:</span>
                                    <a href="tel:0987654321" className="tx-gray-400">{!isLoading ? state.Phone || '' : <Skeleton width={50} />}</a>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mg-b-15">
                                    <span className="tx-medium">Email:</span>
                                    <a href={`mailto:${state.Email || ''}`} className="tx-gray-400">{!isLoading ? state.Email || '' : <Skeleton width={50} />}</a>
                                </div>

                                {/*end::Info*/}
                            </div>
                            {/*end::Header*/}
                            {/*begin::Body*/}
                            <div>
                                <ul className="pd-l-0 sidebar-profile mg-b-0">
                                    <li className={activePage === 'profile' ? 'active' : ''}>
                                        <a className="d-flex align-items-center nav-link" onClick={() => setActive('profile')}>
                                            <span className="icon"><i className="fas fa-user"></i></span>
                                            <span className="mg-l-10">Profile</span>
                                        </a>
                                    </li>
                                    <li className={activePage === 'password' ? 'active' : ''}>
                                        <a className="d-flex align-items-center nav-link" onClick={() => setActive('password')}>
                                            <span className="icon"><i className="fas fa-key"></i></span>
                                            <span className="mg-l-10">Change password</span>
                                        </a>
                                    </li>
                                    <li className={activePage === 'payment' ? 'active' : ''}>
                                        <a className="d-flex align-items-center nav-link" onClick={() => setActive('payment')}>
                                            <span className="icon"><i className="fas fa-credit-card"></i></span>
                                            <span className="mg-l-10">Payment Information</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {/*end::Body*/}
                        </div>
                        {/*eng::Container*/}

                    </div>
                    {/*end::Wrapper*/}
                </div>
                {/*end::Body*/}
            </div>


            <ModalChangePass
                error={error}
                showPassword={showPassword}
                _onSubmitPassword={_onSubmitPassword}
                hideChangePasswordForm={hideChangePasswordForm}
            />
        </>
    )
}


export default SideBar
