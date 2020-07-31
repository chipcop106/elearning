import React, { useEffect, useState, useRef, memo, useReducer } from 'react';
import { randomId } from '~src/utils';
import Select from 'react-select'
import { appSettings } from '~src/config';
import { Modal, Button, Tabs, Tab } from 'react-bootstrap';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';
import { getTeacherExperience, updateTeacherExperience } from '~src/api/teacherAPI'

import {
    getTesolCertificateOptions,
    getTeylCertificateOptions,
    getOtherCertificateOptions,
    getTeachingExperienceOptions,


} from '~src/api/optionAPI';


const initialState = {
    isLoading: true,
    otherCertificateOptions: [],
    teylCertificateOptions: [],
    tesolCertificateOptions: [],
    teylCertificate: null,
    tesolCertificate: null,
    otherCertificate: null,
    experienceLists: [],
    teacherExperiences: [],
    optionLoaded:false,
    teacherExp:null
}

const reducer = (prevState, { type, payload }) => {
    switch (type) {
        case "SET_LOADING":
            return { ...prevState, isLoading: payload.value }
            break;
        case "UPDATE_STATE":
            return { ...prevState, [payload.key]: payload.value }
            break;
        case "DEFAULT_STATE":
            return {
                ...prevState,
                ...payload
            }
            break;
        default: return prevState;
            break;
    }
}

const RenderExpRow = ({ exp, handleStateChange, deleteRow }) => {
    const [name, setName] = React.useState(exp.name);
    const [jobValue, setJobValue] = React.useState(exp.jobTitle);
    const [timePeriod, setTimePeriod] = React.useState(exp.timePeriod);
    const handleDeleteRow = (e) => {
        e.preventDefault();
        deleteRow(exp.id);
    }
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
                        <input type="text" className="form-control" placeholder="Job title" onChange={(e) => setJobValue(e.target.value)} defaultValue={jobValue} />
                        <label>Job Title</label>
                    </div>
                </div>
                <div className="form-group col-md-3">
                    <div className="input-float">
                        <input type="text" className="form-control" placeholder="Time period" onChange={(e) => setTimePeriod(e.target.value)} defaultValue={timePeriod} />

                        <label>Time period</label>
                    </div>
                </div>
                <div className="form-group col-md-3">
                    <button className="delete-row tx-24 btn"><i className="fa fa-minus-circle tx-danger" onClick={handleDeleteRow} /></button>
                </div>
            </div>

        }
    </>
}

const TeacherExperience = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const setIsLoading = (value) => dispatch({ type: "SET_LOADING", payload: { value } });
    const updateState = (key, value) => dispatch({ type: 'UPDATE_STATE', payload: { key, value } });

    const handleExpRowChange = (rowState) => {
        const { id, name, jobValue, timePeriod } = rowState;
        const newValue = [...state.experienceLists].map(exp => (exp.id === id) ? {
            ...exp,
            name: name,
            jobTitle: jobValue,
            timePeriod: timePeriod
        } : exp)
        updateState('experienceLists', newValue);
    }


    const _handleSubmitForm = async (e) => {
        //Ok submit
        e.preventDefault();
        const exps = [...state.experienceLists].map(exp => {
            return {
                ID:exp.idItem,
                OrganizationName:exp.name,
                JobTitle:exp.jobTitle,
                TimePeriod:exp.timePeriod
            }
        });
        try {
            const params = {
                Experience: !!state.teacherExp && state.teacherExp.length > 0 && state.teacherExp.length.map(exp => exp.ID) || null,
                ExperienceObject:JSON.stringify(exps),
                TesolCertificate:!!state.tesolCertificate && !!state.tesolCertificate.length > 0 && state.tesolCertificate.map(ce => ce.ID) || null,
                TeylCertificate:!!state.teylCertificate && !!state.teylCertificate.length > 0 && state.teylCertificate.map(ce => ce.ID) || null,
                OtherCertificate:!!state.otherCertificate && !!state.otherCertificate.length > 0 && state.otherCertificate.map(ce => ce.ID) || null
            }
            const res = await updateTeacherExperience(params);
            res.Code === 1 && toast.success('Update experience success !!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });
            res.Code === 0 && toast.danger('Update experience failed, please try again !!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });
        } catch (error) {
            console.log(error?.message ?? 'Lỗi tham số API, vui lòng kiểm tra lại !!');
        }
    }

    const _addExpRow = (e) => {
        e.preventDefault();
        const rowData = {
            id: randomId(),
            name: "",
            jobTitle: "",
            timePeriod: "",
            idItem: 0,
        };
        updateState('experienceLists', [...state.experienceLists, rowData]);
    }

    const _deleteExpRow = (id) => {
        updateState('experienceLists', [...state.experienceLists].filter(exp => exp.id !== id));
    }

    const loadTeacherExperience = async () => {
        setIsLoading(true);
        const res = await getTeacherExperience();
        res.Code === 1 ? dispatch({type:"DEFAULT_STATE", payload:{
            ...state,
            teacherExp:res.Data.TeacherExperience,
            experienceLists:[...res.Data?.TeachingExperience ?? []].map(exp => {
                return {
                    id: randomId(),
                    idItem:exp.ID,
                    name: exp.OrganizationName,
                    jobTitle: exp.JobTitle,
                    timePeriod: exp.TimePeried
                }
            }),
            teylCertificate:  res.Data?.TeylCertificate ?? null,
            tesolCertificate: res.Data?.TesolCertificate ?? null,
            otherCertificate: res.Data?.OtherCertificate ?? null
        }}) : dispatch({type:"DEFAULT_STATE", payload:initialState});
        setIsLoading(false);
    }

    const loadSelectOptionAPI = async () => {
        await getTeylCertificateOptions().then((res) => updateState('teylCertificateOptions', res?.Data ?? []));
        await getTeachingExperienceOptions().then((res) => updateState('teacherExperiences', res?.Data ?? []));
        await getOtherCertificateOptions().then((res) => updateState('otherCertificateOptions', res?.Data ?? []));
        await getTesolCertificateOptions().then((res) => updateState('tesolCertificateOptions', res?.Data ?? []));
        updateState('optionLoaded', true)
    };

    useEffect(() => {
        loadSelectOptionAPI();
    }, []);

    useEffect(() => {
        state.optionLoaded === true && loadTeacherExperience();
    }, [state.optionLoaded]);


    return (
        <>
            <form onSubmit={_handleSubmitForm}>
                <div className="content-block">
                    <div className="introduce-content">
                        <div className="teacher__content-block">
                            <h5 className="mg-b-15"><i className="fa fa-user-clock mg-r-5"></i> Experience</h5>
                            <div className="form-groupselect-checkbox mg-b-30 mg-t-15">
                                <p className="mg-b-5">- Teacher experience:</p>
                                <div className="input-float">
                                    <Select
                                        key={option => `${option.id}`}
                                        isMulti={true}
                                        isSearchable={false}
                                        isLoading={state.teacherExperiences.length > 0 ? false : true}
                                        loadingMessage={() => 'Select option is loading...'}
                                        options={state.teacherExperiences}
                                        getOptionLabel={option => `${option.TeachingExperienceName}`}
                                        getOptionValue={option => `${option.ID}`}
                                        onChange={(values) => updateState('teacherExp', values)}
                                        styles={appSettings.selectStyle}
                                        placeholder="Select experiences..."
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="teacher__content-block mg-b-30">
                            <p className="mg-b-5">- Fill in your teaching experience:</p>
                            <div className="experience__list" id="js-exp-list">
                                {!!state.experienceLists && state.experienceLists.length > 0 && [...state.experienceLists].map(exp =>
                                    <RenderExpRow key={`${exp.id}`} handleStateChange={handleExpRowChange} exp={exp} deleteRow={_deleteExpRow} />
                                )}

                            </div>
                            <button type="button" className="btn btn-success" id="js-add-row" onClick={_addExpRow}><i className="fa fa-plus" /> Add experience</button>
                        </div>
                        <hr className="mg-b-30 mg-t-0" style={{ borderStyle: 'dashed' }} />
                        <div className="teacher__content-block">
                            <h5 className="mg-b-15"><i className="fas fa-certificate mg-r-5"></i> Certificate</h5>
                            <div className="row teacher__certificate pd-y-15">
                                <div className="form-group col-12">
                                    <div className="input-float">

                                        <Select
                                            key={option => `${option.id}`}
                                            isMulti={true}
                                            isSearchable={false}
                                            isLoading={state.tesolCertificateOptions.length > 0 ? false : true}
                                            loadingMessage={() => 'Select option is loading...'}
                                            options={state.tesolCertificateOptions}
                                            getOptionLabel={option => `${option.TesolCertificateName}`}
                                            getOptionValue={option => `${option.ID}`}
                                            onChange={(values) => updateState('tesolCertificate', values)}
                                            styles={appSettings.selectStyle}
                                            menuPortalTarget={document.body}
                                        />
                                        <label>TESOL Certificate</label>
                                    </div>
                                </div>
                                <div className="form-group col-12">
                                    <div className="input-float">
                                        <Select
                                            key={option => `${option.id}`}
                                            isMulti={true}
                                            isSearchable={false}
                                            isLoading={state.teylCertificateOptions.length > 0 ? false : true}
                                            loadingMessage={() => 'Select option is loading...'}
                                            options={state.teylCertificateOptions}
                                            value={state.teylCertificate}
                                            getOptionLabel={option => `${option.TeylCertificateName}`}
                                            getOptionValue={option => `${option.ID}`}
                                            onChange={(values) => updateState('teylCertificate', values)}
                                            styles={appSettings.selectStyle}
                                            menuPortalTarget={document.body}
                                        />

                                        <label>TEYL Certificate</label>
                                    </div>
                                </div>
                                <div className="form-group col-12">
                                    <div className="input-float">

                                        <Select
                                            key={option => `${option.id}`}
                                            isMulti={true}
                                            isSearchable={false}
                                            isLoading={state.otherCertificateOptions.length > 0 ? false : true}
                                            loadingMessage={() => 'Select option is loading...'}
                                            options={state.otherCertificateOptions}
                                            value={state.otherCertificate}
                                            getOptionLabel={option => `${option.OtherCertificateName}`}
                                            getOptionValue={option => `${option.ID}`}
                                            onChange={(values) => updateState('otherCertificate', values)}
                                            styles={appSettings.selectStyle}
                                            menuPortalTarget={document.body}
                                        />
                                        <label>Other Certificate</label>
                                    </div>
                                </div>
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

export default memo(TeacherExperience);