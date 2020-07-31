import React, { useState, useEffect, useReducer, useRef } from 'react'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { useForm, Controller } from 'react-hook-form';
import { appSettings } from '~src/config';
import { Modal, Button, Tabs, Tab } from 'react-bootstrap';
import Select from 'react-select'
import { randomId } from '~src/utils';
import { getTeacherInfoProfile } from '~src/api/teacherAPI';
import {
    uploadImageToServer,
    getEnglishProficiencyOptions,
    getLevelOfEducationOptions,
    getTimeZone,
    getListLevelPurpose

} from '~src/api/optionAPI';


const Schema = Yup.object().shape({
    fullName: Yup.string()
        .required('First name is not empty'),
    skypeId: Yup.string()
        .required('Skype id is not empty'),
    phoneNumber: Yup.number()
        .typeError('Invalid phone number')
        .integer('Invalid phone number')
        .required('Phone is not empty')
});

const optionState = {
    locationOptions: [
        {
            id: 1,
            name: 'New York',
            value: 'NY',
        },
        {
            id: 2,
            name: 'Viet Nam',
            value: 'VN',
        },
    ],
    stateOptions: [
        {
            ID: 1,
            StateName: 'Viet Nam'
        },
        {
            ID: 2,
            StateName: 'Paraquay'
        }
    ],
    majorOptions: [
        {
            ID: 1,
            MajorName: 'Business Studies/Administration/Management'
        },
        {
            ID: 2,
            MajorName: 'Automation Testing'
        }
    ],
    englishProficienOptions: [],
    levelOfPurposeOptions: [],
    levelOfEducationOptions: [],
    timeZoneOptions: [],
}

const initialState = {
    avatar: "https://theamericanschool.edu.vn/wp-content/uploads/2020/01/Ms-Hong-Nguyen-Vietnamese.jpg",
    fullName: "Truong Van Lam",
    skypeId: "mona.media",
    phoneNumber: "0886706289",
    location: {
        id: 2,
        name: 'Viet Nam',
        value: 'VN',
    },
    levelOfPurpose: null,
    levelOfEducation: null,
    state: {
        ID: 1,
        StateName: 'Viet Nam'
    },
    email: "vietdat106@gmail.com",
    timeZone: null,
    schoolName: "Bach Khoa University",
    major: null,
    englishProficien: null,
    loadOption: false,
}

const reducer = (prevState, { type, payload }) => {
    // console.log('Log payload', payload);
    switch (type) {
        case "UPDATE_STATE":
            return { ...prevState, [payload.key]: payload.value }
            break;
        default:
            return prevState;
            break;
    }
}

const ProfileAvatar = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [myAvatar, setAvatar] = useState();
    const inputFileRef = useRef(true);

    const handleUploadImage = async () => {
        setIsLoading(true);
        try {
            const input = inputFileRef.current;
            if (input.files && input.files[0]){
                const res = await uploadImageToServer(input.files);
                if(res.Code === 1 && res.Data.length > 0) {
                    props.updateAvatar('avatar', res.Data[0].UrlIMG);
                } 
            }
           
        } catch (error) {
            console.log(error?.message ?? 'Lỗi gọi api');
        }
        setIsLoading(false);
    }

    return (
        <>
            <div className={`teacher-avatar ${isLoading ? 'loading-style' : ''} mg-x-auto`}>
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                <div className="upload-container">
                    <label className="upload-avatar">
                        <input ref={inputFileRef} type="file" accept="image/*" className="upload-box hidden d-none upload-file" onChange={handleUploadImage} />
                        <img src={props?.getValues('avatar') ?? '../assets/img/default-avatar.png'} alt="avatar" className="image-holder" />
                    </label>
                </div>
            </div>
        </>
    )
}


function TeacherInformation() {
    const [state, dispatch] = useReducer(reducer, optionState);
    const [isLoading, setIsLoading] = useState(true);
    const [optionLoaded, setOptionLoaded] = useState(false);

    const { errors, register, handleSubmit: handleSubmitInformation, setValue, getValues, control } = useForm({
        mode: 'onBlur',
        defaultValue: initialState,
        resolver: yupResolver(Schema),
    });

    const updateState = (key, value) => dispatch({ type: 'UPDATE_STATE', payload: { key, value } });

    const setMultipleValue = (dataObj) => {
        if (typeof dataObj !== 'object') return;
        for (let property in dataObj) {
            setValue(property, dataObj[property]);
        }
    }

    const loadTeacherInfo = async () => {
        setIsLoading(true);
        try {
            const res = await getTeacherInfoProfile();
            if (res.Code === 1) {
                setMultipleValue({
                    avatar: res.Data.TeacherIMG,
                    fullName: res.Data.FullName,
                    skypeId: res.Data.SkypeID,
                    phoneNumber: res.Data.Phone,
                    levelOfPurpose: state.levelOfPurposeOptions[res.Data?.levelOfPurpose] ?? null,
                    levelOfEducation: state.levelOfEducationOptions[res.Data?.LevelOfEducation] ?? null,
                    state: state.stateOptions[res.Data?.State] ?? null,
                    email: res.Data.Email,
                    timeZone: state.timeZoneOptions.filter(time => time?.ID === res.Data.TimezoneID)[0] ?? null,
                    schoolName: res.Data.SchoolName,
                    major: state.majorOptions[res.Data?.Major] ?? null,
                    englishProficien: state.englishProficienOptions[res.Data?.EnglishProficiency] ?? null,
                    location: state.locationOptions[res.Data?.Location] ?? null,
                });
            }

        } catch (e) {
            console.log(e.message);
        }
        setIsLoading(false);
    }

    const loadSelectOptionAPI = async () => {
        await getEnglishProficiencyOptions().then((res) => updateState('englishProficienOptions', res?.Data ?? []));
        await getLevelOfEducationOptions().then((res) => updateState('levelOfEducationOptions', res?.Data ?? []));
        await getListLevelPurpose().then((res) => updateState('levelOfPurposeOptions', res?.Data ?? []));
        await getTimeZone().then((res) => updateState('timeZoneOptions', res?.Data ?? []));
        setOptionLoaded(true);
    };

    const _onSubmitInformation = (data, e) => {
        e.preventDefault();
        // console.log('Submiting');
        console.log(data);
    }

    useEffect(() => {
        console.log(errors);
    }, [errors])

    useEffect(() => {
        optionLoaded === true && loadTeacherInfo();
    }, [optionLoaded])

    useEffect(() => {
        loadSelectOptionAPI();
    }, [])

    useEffect(() => {
        console.log('Lastest state', state);
    }, [state])

    return (
        <>
            <form onSubmit={handleSubmitInformation(_onSubmitInformation)}>
                <Controller
                    as={
                        <ProfileAvatar getValues={getValues} updateAvatar={setValue} />
                    }
                    control={control}
                    name="avatar"
                />
                {/* <ProfileAvatar ref={register} name="avatar" avatar={getValues('avatar')} updateAvatar={setValue} /> */}
                <div className="teacher-info mg-l-0-f mg-t-30">
                    <h5 className="mg-b-15"><i className="fas fa-user mg-r-5"></i>Basic Information</h5>
                    <div className="row group-float-label">
                        <div className="form-group col-12 col-sm-6">
                            <div className="input-float">
                                <input type="text" className={`form-control ${!!errors && errors.fullName ? 'error-form' : ''}`} placeholder="Full name *" name="fullName" ref={register} required />
                                <label>Full Name *</label>
                            </div>
                        </div>
                        <div className="form-group col-12 col-sm-6">
                            <div className="input-float">
                                <input type="text" className={`form-control ${!!errors && errors.skypeId ? 'error-form' : ''}`} placeholder="Skype ID *" name="skypeId" ref={register} required />
                                <label>Skype ID *</label>
                            </div>
                        </div>
                        <div className="form-group col-12 col-sm-6">
                            <div className="input-float">
                                <input type="number" className={`form-control ${!!errors && errors.phoneNumber ? 'error-form' : ''}`} placeholder="Phone number *" name="phoneNumber" ref={register} required />
                                <label>Phone Number *</label>
                            </div>
                        </div>
                        <div className="form-group col-12 col-sm-6">
                            <div className="input-float">
                                <input type="text" className={`form-control ${!!errors && errors.email ? 'error-form' : ''}`} placeholder="Email *" name="email" ref={register} required  readOnly/>
                                <label>Email</label>
                            </div>
                        </div>
                        <div className="form-group col-12 col-sm-6">
                            <div className="input-float">
                                <Controller
                                    as={
                                        <Select
                                            key={option => `${option.id}`}
                                            isSearchable={false}
                                            isLoading={state.locationOptions.length > 0 ? false : true}
                                            loadingMessage={() => 'Select option is loading...'}
                                            options={state.locationOptions}
                                            getOptionLabel={option => `${option.name}`}
                                            getOptionValue={option => `${option.value}`}
                                            onChange={(values) => setValue('location', values)}
                                            styles={appSettings.selectStyle}
                                            placeholder="Select your location..."
                                        />
                                    }
                                    control={control}
                                    name="location" />

                                <label>Location</label>
                            </div>
                        </div>
                        <div className="form-group col-12 col-sm-6">
                            <div className="input-float">
                                <Controller
                                    as={
                                        <Select
                                            key={option => `${option.id}`}
                                            isSearchable={false}
                                            isLoading={state.stateOptions.length > 0 ? false : true}
                                            loadingMessage={() => 'Select option is loading...'}
                                            options={state.stateOptions}
                                            getOptionLabel={option => `${option.StateName}`}
                                            getOptionValue={option => `${option.ID}`}
                                            onChange={(values) => setValue('state', values)}
                                            styles={appSettings.selectStyle}
                                            placeholder="Select state..."
                                        />
                                    }
                                    control={control}
                                    name="state" />
                                <label>State *</label>
                            </div>
                        </div>

                        <div className="form-group col-12 col-sm-6">
                            <div className="input-float">
                                <Controller
                                    as={
                                        <Select
                                            key={option => `${option.id}`}
                                            isSearchable={false}
                                            isLoading={state.timeZoneOptions.length > 0 ? false : true}
                                            loadingMessage={() => 'Loading options...'}
                                            options={state.timeZoneOptions}
                                            getOptionLabel={option => `${option.TimeZoneName}`}
                                            getOptionValue={option => `${option.ID}`}
                                            onChange={(values) => setValue('timeZone', values)}
                                            styles={appSettings.selectStyle}
                                            placeholder="Select timezone..."

                                        />
                                    }
                                    control={control}
                                    name="timeZone" />

                                <label>Time zone *</label>
                            </div>
                        </div>
                        <div className="form-group col-12 col-sm-6">
                            <div className="input-float">
                                <Controller
                                    as={
                                        <Select
                                            key={option => `${option.id}`}
                                            isSearchable={false}
                                            isLoading={isLoading}
                                            loadingMessage={() => 'Loading options...'}
                                            options={state.levelOfPurposeOptions}
                                            getOptionLabel={option => `${option.PurposeLevelName}`}
                                            getOptionValue={option => `${option.ID}`}
                                            onChange={(values) => setValue('levelOfPurpose', values)}
                                            styles={appSettings.selectStyle}
                                        />
                                    }
                                    control={control}
                                    name="levelOfPurpose" />

                                <label>Level purpose</label>
                            </div>
                        </div>
                    </div>
                    <hr className="mg-b-30 mg-t-0" style={{ borderStyle: 'dashed' }} />
                    <h5 className="mg-b-15"><i className="fas fa-user-graduate mg-r-5"></i> Education Attainment</h5>
                    <div className="row group-float-label">
                        <div className="form-group col-12 col-sm-6">
                            <div className="input-float">
                                <Controller
                                    as={
                                        <Select
                                            key={option => `${option.id}`}
                                            isSearchable={false}
                                            isLoading={isLoading}
                                            loadingMessage={() => 'Loading options...'}
                                            options={state.levelOfEducationOptions}
                                            getOptionLabel={option => `${option.LevelOfEducationName}`}
                                            getOptionValue={option => `${option.ID}`}
                                            onChange={(values) => setValue('levelOfEducation', values)}
                                            styles={appSettings.selectStyle}
                                            placeholder="Select level..."
                                        />
                                    }
                                    control={control}
                                    name="levelOfEducation" />

                                <label>Level of Education</label>
                            </div>
                        </div>
                        <div className="form-group col-12 col-sm-6">
                            <div className="input-float">
                                <input type="text" className={`form-control ${!!errors && errors.schoolName ? 'error-form' : ''}`} placeholder="School name" name="schoolName" ref={register} />
                                <label>School name</label>
                            </div>
                        </div>
                        <div className="form-group col-12 col-sm-6">
                            <div className="input-float">
                                <Controller
                                    as={
                                        <Select
                                            key={option => `${option.id}`}
                                            isSearchable={false}
                                            isLoading={isLoading}
                                            loadingMessage={() => 'Loading options...'}
                                            options={state.majorOptions}
                                            getOptionLabel={option => `${option.MajorName}`}
                                            getOptionValue={option => `${option.ID}`}
                                            onChange={(values) => setValue('major', values)}
                                            styles={appSettings.selectStyle}
                                        />
                                    }
                                    control={control}
                                    name="major" />

                                <label>Major/Specialization *</label>
                            </div>
                        </div>
                        <div className="form-group col-12 col-sm-6">
                            <div className="input-float">
                                <Controller
                                    as={
                                        <Select
                                            key={option => `${option.id}`}
                                            isSearchable={false}
                                            isLoading={isLoading}
                                            loadingMessage={() => 'Loading options...'}
                                            options={state.englishProficienOptions}
                                            getOptionLabel={option => `${option.EnglishProficiencyName}`}
                                            getOptionValue={option => `${option.ID}`}
                                            onChange={(values) => setValue('englishProficiency', values)}
                                            styles={appSettings.selectStyle}
                                            placeholder="Select proficiency..."
                                        />
                                    }
                                    control={control}
                                    name="englishProficien" />

                                <label>English proficiency</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tx-center mg-t-30">
                    <button type="submit" className="btn btn-primary"><i className="fa fa-save mg-r-5"></i>Save information</button>
                </div>
            </form>
        </>
    )
}


export default TeacherInformation

