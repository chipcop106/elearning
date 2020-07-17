import React, { useEffect, useState, createRef, memo, useLayoutEffect } from 'react';
import { randomId } from '~src/utils';

import styles from './TeacherForm.module.scss';
import Select from 'react-select'
import { appSettings } from '~src/config';
import {
    uploadImageToServer,
    getEnglishProficiencyOptions,
    getLevelOfEducationOptions,
    getLevelPurposeOptions,
    getTesolCertificateOptions,
    getTeylCertificateOptions,
    getOtherCertificateOptions,
    getTeachingExperienceOptions,
    getTimeZone,

} from '~src/api/optionAPI';

const jobs = [{
    id: 1,
    title: 'Front End Developer',
    value: 'fe',
}, {
    id: 2,
    title: 'Backend Enginer',
    value: 'be',
}];
const timeLists = [{
    id: 1,
    title: '2018',
    value: '2018',
}, {
    id: 2,
    title: '2019',
    value: '2019',
}];

const RenderExpRow = ({ exp, handleStateChange, deleteRow }) => {
    const [name, setName] = React.useState(exp.name);
    const [jobValue, setJobValue] = React.useState(exp.jobTitle);
    const [timePeriod, setTimePeriod] = React.useState(exp.timePeriod);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        handleStateChange({ id: exp.id, name, jobValue, timePeriod });
    }, [name, jobValue, timePeriod])

    return <>
        {
            <div className="exp-row form-row  align-items-center">
                <div className="form-group col-md-3">
                    <div className="input-float">
                        <input type="text" className="form-control" placeholder="Organization Name" onChange={(e) => setName(e.target.value)} defaultValue={name} />
                        <label>Organization Name</label>
                    </div>
                </div>
                <div className="form-group col-md-3">
                    <div className="input-float">
                        <select name="experienceLists" value={jobValue} onChange={(e) => setJobValue(e.target.value)} className="form-control">
                            {[...jobs].map(job => <option value={job.value} key={`${job.id}`}>{job.title}</option>)}
                        </select>
                        <label>Job Title</label>
                    </div>
                </div>
                <div className="form-group col-md-3">
                    <div className="input-float">
                        <select name="experienceLists" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className="form-control">
                            {[...timeLists].map(time => <option value={time.value} key={`${time.id}`}>{time.title}</option>)}
                        </select>
                        <label>Time period</label>
                    </div>
                </div>
                <div className="form-group col-md-3">
                    <button className="delete-row tx-24 btn"><i className="fa fa-minus-circle tx-danger" onClick={() => deleteRow(exp.id)} /></button>
                </div>
            </div>

        }
    </>
}

const TeacherForm = (props) => {
    const { values, handleChange, setFieldValue, errors } = props;
    const avatarRef = createRef();
    const inputFileRef = createRef();
    
    const handleExpRowChange = (rowState) => {
        const { id, name, jobValue, timePeriod } = rowState;
        const newValue = [...values.experienceLists].map(exp => (exp.id === id) ? {
            ...exp,
            name: name,
            jobTitle: jobValue,
            timePeriod: timePeriod
        } : exp)
        setFieldValue('experienceLists', newValue);
    }


    const _handleSubmitForm = (e) => {
        e.preventDefault();

    }

    const _addExpRow = () => {
        const rowData = {
            id: randomId(),
            name: "",
            jobTitle: "fe",
            timePeriod: "2018",
        };
        setFieldValue('experienceLists', [...values.experienceLists, rowData]);
    }

    const _deleteExpRow = (id) => {
        setFieldValue('experienceLists', [...values.experienceLists].filter(exp => exp.id !== id));
    }

    const handleUploadImage = () => {
        const input = inputFileRef.current;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                avatarRef.current.setAttribute('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    const loadAPI = async () => {
        await Promise.all([
            getEnglishProficiencyOptions().then((res) => setFieldValue('englishProficienOptions', res?.Data ?? [])),
            getLevelOfEducationOptions().then((res) => setFieldValue('levelOfEducationOptions', res?.Data ?? [])),
            getLevelPurposeOptions().then((res) => setFieldValue('levelOfPurposeOptions', res?.Data ?? [])),
            getTeylCertificateOptions().then((res) => setFieldValue('teylCertificateOptions', res?.Data ?? [])),
            getTeachingExperienceOptions().then((res) => setFieldValue('teacherExperiences', res?.Data ?? [])),
            getOtherCertificateOptions().then((res) => setFieldValue('otherCertificateOptions', res?.Data ?? [])),
            getTesolCertificateOptions().then((res) => setFieldValue('tesolCertificateOptions', res?.Data ?? [])),
            getTimeZone().then((res) => setFieldValue('timeZoneOptions', res?.Data ?? [])),
        ]);
    };

    useEffect(() => {
        loadAPI();
    }, []);

    useLayoutEffect(() => {
        console.log(props);
    },[props]);

    return (
        <form id="form-teacher-profile">
            <div className="teacher__detail__wrap card-box">
                <div className="teacher__detail">
                    <div className="teacher-header pos-relative">
                        <div className="teacher-avatar">
                            <div className="upload-container">
                                <label className="upload-avatar">
                                    <input ref={inputFileRef} type="file" accept="image/*" className="upload-box hidden d-none upload-file" onChange={handleUploadImage} />
                                    <img ref={avatarRef} src="https://theamericanschool.edu.vn/wp-content/uploads/2020/01/Ms-Hong-Nguyen-Vietnamese.jpg" alt="avatar" className="image-holder" />
                                </label>
                            </div>
                        </div>
                        <div className="teacher-info flex-grow-1">
                            <h5 className="mg-b-15">Basic Information</h5>
                            <div className="form-row">
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                        <input type="text" className={`form-control ${!!errors && errors.fullName ? 'error-form' : 'success-form'}`} placeholder="Full name *" name="fullName" onChange={handleChange} defaultValue={values.fullName} required />
                                        <label>Full Name *</label>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                        <input type="text" className={`form-control ${!!errors && errors.skypeId ? 'error-form' : 'success-form'}`} placeholder="Skype ID *" name="skypeId" onChange={handleChange} defaultValue={values.skypeId} required />
                                        <label>Skype ID *</label>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                        <input type="number" className={`form-control ${!!errors && errors.phoneNumber ? 'error-form' : 'success-form'}`} placeholder="Phone number *" name="phoneNumber" onChange={handleChange} defaultValue={values.phoneNumber} required />
                                        <label>Phone Number *</label>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                        <Select
                                            key={option => `${option.id}`}
                                            isSearchable={false}
                                            isLoading={values.locationOptions.length > 0 ? false : true}
                                            loadingMessage={() => 'Select option is loading...'}
                                            options={values.locationOptions}
                                            getOptionLabel={option => `${option.name}`}
                                            getOptionValue={option => `${option.value}`}
                                            onChange={(values) => setFieldValue('location', values)}
                                            styles={appSettings.selectStyle}
                                            placeholder="Select your location..."
                                        />
                                        <label>Location</label>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                        <Select
                                            key={option => `${option.id}`}
                                            isSearchable={false}
                                            isLoading={values.stateOptions.length > 0 ? false : true}
                                            loadingMessage={() => 'Select option is loading...'}
                                            options={values.stateOptions}
                                            getOptionLabel={option => `${option.StateName}`}
                                            getOptionValue={option => `${option.ID}`}
                                            onChange={(values) => setFieldValue('state', values)}
                                            styles={appSettings.selectStyle}
                                            placeholder="Select state..."
                                        />
                                        <label>State *</label>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                        <input type="text" className="form-control" placeholder="Phone number *" name="postalCode" onChange={handleChange} defaultValue={values.postalCode} required />
                                        <label>Postal Code</label>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">

                                        <Select
                                            key={option => `${option.id}`}
                                            isSearchable={false}
                                            isLoading={values.timeZoneOptions.length > 0 ? false : true}
                                            loadingMessage={() => 'Loading options...'}
                                            options={values.timeZoneOptions}
                                            getOptionLabel={option => `${option.TimeZoneName}`}
                                            getOptionValue={option => `${option.ID}`}
                                            onChange={(values) => setFieldValue('timeZone', values)}
                                            styles={appSettings.selectStyle}
                                            placeholder="Select timezone..."
                                        />
                                        <label>Time zone *</label>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                        <Select
                                            key={option => `${option.id}`}
                                            isSearchable={false}
                                            isLoading={values.levelOfPurposeOptions.length > 0 ? false : true}
                                            loadingMessage={() => 'Loading options...'}
                                            options={values.levelOfPurposeOptions}
                                            getOptionLabel={option => `${option.PurposeLevelName}`}
                                            getOptionValue={option => `${option.ID}`}
                                            onChange={(values) => setFieldValue('levelOfPurpose', values)}
                                            styles={appSettings.selectStyle}
                                        />
                                        <label>Level purpose</label>
                                    </div>
                                </div>
                            </div>
                            <h5 className="mg-b-15">Education Attainment</h5>
                            <div className="form-row">
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                        <Select
                                            key={option => `${option.id}`}
                                            isSearchable={false}
                                            isLoading={values.levelOfEducationOptions.length > 0 ? false : true}
                                            loadingMessage={() => 'Loading options...'}
                                            options={values.levelOfEducationOptions}
                                            getOptionLabel={option => `${option.LevelOfEducationName}`}
                                            getOptionValue={option => `${option.ID}`}
                                            onChange={(values) => setFieldValue('levelOfEducation', values)}
                                            styles={appSettings.selectStyle}
                                            placeholder="Select level..."
                                        />
                                        <label>Level of Education</label>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                        <input type="text" className={`form-control ${!!errors && errors.schoolName ? 'error-form' : 'success-form'}`} placeholder="School name" name="schoolName" onChange={handleChange} defaultValue={values.schoolName} />
                                        <label>School name</label>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                    <Select
                                            key={option => `${option.id}`}
                                            isSearchable={false}
                                            isLoading={values.levelOfEducationOptions.length > 0 ? false : true}
                                            loadingMessage={() => 'Loading options...'}
                                            options={values.majorOptions}
                                            getOptionLabel={option => `${option.MajorName}`}
                                            getOptionValue={option => `${option.ID}`}
                                            onChange={(values) => setFieldValue('major', values)}
                                            styles={appSettings.selectStyle}
                                        />
                                        <label>Major/Specialization *</label>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                        <Select
                                            key={option => `${option.id}`}
                                            isSearchable={false}
                                            isLoading={values.englishProficienOptions.length > 0 ? false : true}
                                            loadingMessage={() => 'Loading options...'}
                                            options={values.englishProficienOptions}
                                            getOptionLabel={option => `${option.EnglishProficiencyName}`}
                                            getOptionValue={option => `${option.ID}`}
                                            onChange={(values) => setFieldValue('englishProficiency', values)}
                                            styles={appSettings.selectStyle}
                                            placeholder="Select proficiency..."
                                        />
                                        <label>English proficiency</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="teacher-body mg-t-0-f">

                        <div className="teacher__info-wrap">
                            <div className="content-block mg-b-30">
                                <h5 className="main-title">Introduce</h5>
                                <div className="introduce-content">
                                    <textarea className="form-control" rows={7} defaultValue={"While I have no soccer skills, I once played in a fairly competitive adult soccer league with my then-teenage stepson. I was terrible, but I played because he asked me to. (When your kids get older and ask you to do something with them, the first time you say no might be the last time you get asked.) I was trying to match the drollness of my \"Wow\" when my stepson stepped in, half-smile on his lips and full twinkle in his eyes, and rescued me by saying, \"Come on, we need to get ready.\" Was Louis cocky? Certainly, but only on the surface. His $400 cleats, carbon fiber shin guards, and \"I'm the king of the business world\" introduction was an unconscious effort to protect his ego. His introduction said, \"Hey, I might not turn out to be good at soccer, but out there in the real world, where it really matters, I am the Man.\" As we took the field before a game, a guy on the other team strutted over, probably picking me out because I was clearly the oldest player on the field. (There's a delightful sentence to write.)"} />
                                </div>
                            </div>
                            <div className="content-block">
                                <h5 className="main-title">CURRICULUM VITAE</h5>
                                <div className="introduce-content">
                                    <div className="teacher__content-block">
                                        <h5 className="sub-title"><i className="fas fa-user-clock" /> Experience</h5>
                                        <div className="form-groupselect-checkbox mg-b-30 mg-t-15">
                                            <h6>Teacher experience</h6>
                                            <div className="input-float">
                                                <Select
                                                    key={option => `${option.id}`}
                                                    isMulti={true}
                                                    isSearchable={false}
                                                    isLoading={values.teacherExperiences.length > 0 ? false : true}
                                                    loadingMessage={() => 'Select option is loading...'}
                                                    options={values.teacherExperiences}
                                                    getOptionLabel={option => `${option.TeachingExperienceName}`}
                                                    getOptionValue={option => `${option.ID}`}
                                                    onChange={(values) => setFieldValue('teacherExp', values)}
                                                    styles={appSettings.selectStyle}
                                                    placeholder="Select experiences..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="teacher__content-block mg-b-30">
                                        <h6> Fill in your teaching experience:</h6>
                                        <div className="experience__list mg-t-15" id="js-exp-list">
                                            {!!values.experienceLists && values.experienceLists.length > 0 && [...values.experienceLists].map(exp =>
                                                <RenderExpRow key={`${exp.id}`} handleStateChange={handleExpRowChange} exp={exp} deleteRow={_deleteExpRow} />
                                            )}

                                        </div>
                                        <button type="button" className="btn btn-warning" id="js-add-row" onClick={_addExpRow}><i className="fa fa-plus" /> Add row</button>
                                    </div>
                                    <div className="teacher__content-block">
                                        <h5 className="sub-title"><i className="fas fa-certificate" /> Certificate
                  </h5>
                                        <div className="row teacher__certificate pd-y-15">
                                            <div className="form-group col-md-4">
                                                <div className="input-float">
                                                 
                                                    <Select
                                                        key={option => `${option.id}`}
                                                        isMulti={true}
                                                        isSearchable={false}
                                                        isLoading={values.teacherExperiences.length > 0 ? false : true}
                                                        loadingMessage={() => 'Select option is loading...'}
                                                        options={values.tesolCertificateOptions}
                                                        getOptionLabel={option => `${option.TesolCertificateName}`}
                                                        getOptionValue={option => `${option.ID}`}
                                                        onChange={(values) => setFieldValue('tesolCertificate', values)}
                                                        styles={appSettings.selectStyle}
                                                    />
                                                    <label>TESOL Certificate</label>
                                                </div>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <div className="input-float">
                                                    <Select
                                                        key={option => `${option.id}`}
                                                        isMulti={true}
                                                        isSearchable={false}
                                                        isLoading={values.teacherExperiences.length > 0 ? false : true}
                                                        loadingMessage={() => 'Select option is loading...'}
                                                        options={values.teylCertificateOptions}
                                                        getOptionLabel={option => `${option.TeylCertificateName}`}
                                                        getOptionValue={option => `${option.ID}`}
                                                        onChange={(values) => setFieldValue('teylCertificate', values)}
                                                        styles={appSettings.selectStyle}
                                                    />

                                                    <label>TEYL Certificate</label>
                                                </div>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <div className="input-float">

                                                    <Select
                                                        key={option => `${option.id}`}
                                                        isMulti={true}
                                                        isSearchable={false}
                                                        isLoading={values.teacherExperiences.length > 0 ? false : true}
                                                        loadingMessage={() => 'Select option is loading...'}
                                                        options={values.otherCertificateOptions}
                                                        getOptionLabel={option => `${option.OtherCertificateName}`}
                                                        getOptionValue={option => `${option.ID}`}
                                                        onChange={(values) => setFieldValue('otherCertificate', values)}
                                                        styles={appSettings.selectStyle}
                                                    />
                                                    <label>Other Certificate</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="tx-center">
                    <button type="button" className="btn btn-success" onClick={_handleSubmitForm}><i className="fa fa-save mg-r-5" /> Update information</button>
                </div>
            </div>
        </form>
    )
}

export default memo(TeacherForm);