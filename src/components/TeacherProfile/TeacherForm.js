import React from 'react';
import ReactDOM from 'react-dom';
import {randomId} from '~src/utils';

import styles from './TeacherForm.module.scss';

const validateRules = {
    firstName: {
        presence: true,
    },
}

const initialState = {
    avatar: "",
    firstName: "Truong Hong",
    lastName: "Anh",
    skypeId: "mona.media",
    phoneNumber: "0886706289",
    location: "1",
    state: "1",
    postalCode: "10010",
    timeZone: "1",
    education: "2",
    schoolName: "1",
    major: "1",
    englishProficiency: "3",
    introduce: `While I have no soccer skills, I once played in a fairly competitive adult soccer league with my then-teenage stepson. I was terrible, but I played because he asked me to. (When your kids get older and ask you to do something with them, the first time you say no might be the last time you get asked.) I was trying to match the drollness of my "Wow" when my stepson stepped in, half-smile on his lips and full twinkle in his eyes, and rescued me by saying, "Come on, we need to get ready." Was Louis cocky? Certainly, but only on the surface. His $400 cleats, carbon fiber shin guards, and "I'm the king of the business world" introduction was an unconscious effort to protect his ego. His introduction said, "Hey, I might not turn out to be good at soccer, but out there in the real world, where it really matters, I am the Man." As we took the field before a game, a guy on the other team strutted over, probably picking me out because I was clearly the oldest player on the field. (There's a delightful sentence to write.)`,
    teacherExperiences: [
        {
            id: 1,
            title: 'I have taught in school/College/University/ or learning centers',
            value: 'exp1',
        },
        {
            id: 2,
            title: 'I have home-schooling, volunteer, tutor, or other informal teaching experience.',
            value: 'exp2',
        },
        {
            id: 3,
            title: 'None of the above',
            value: 'exp3',
        },
    ],
    selectTeacherExp: ['exp1', 'exp2'],
    experienceLists: [
        {
            id: 1,
            name: "Moan Media",
            jobTitle: "fe",
            timePeriod: "2018",
        },
        {
            id: 2,
            name: "Mona Media",
            jobTitle: "be",
            timePeriod: "2019",
        }
    ],
    tesolCertificate: '1',
    teylCertificate: '2',
    otherCertificate: '2',
}

const reducer = (prevState, { type, payload }) => {
    switch (type) {
        case "STATE_CHANGE": {
            return {
                ...prevState,
                [payload.key]: payload.value
            }
        }
        case "ADD_EXPROW": {
            return {
                ...prevState,
                experienceLists: [...prevState.experienceLists, payload]
            }
        }
        case "DELETE_EXPROW": {
            return {
                ...prevState,
                experienceLists: [...prevState.experienceLists].filter(exp => exp.id !== payload.id)
            }
        }
        case "EXP_CHANGE": {
            return {
                ...prevState,
                experienceLists: [...prevState.experienceLists].map(exp => (exp.id === payload.id) ? {
                    ...exp,
                    name: payload.name,
                    jobTitle: payload.jobValue,
                    timePeriod: payload.timePeriod
                } : exp)
            }
        }
        default: return prevState;
            break;
    }
}

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

const TeacherForm = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const avatarRef = React.createRef();
    const inputFileRef = React.createRef();


    const handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const key = target.getAttribute("name");
        dispatch({ type: "STATE_CHANGE", payload: { key, value } })
    }

    const handleExpRowChange = (rowState) => {
        const { id, name, jobValue, timePeriod } = rowState;
        dispatch({ type: "EXP_CHANGE", payload: { id, name, jobValue, timePeriod } })
    }

    const handleSelect2 = (e) => {
        const target = e.target;
        const value = [];
        [...target.children].map(option => {
            if (option.selected) value.push(option.value);
        });

        const key = target.getAttribute("name");
        dispatch({ type: "STATE_CHANGE", payload: { key, value } })
    }

    const _handleSubmitForm = (e) => {
        e.preventDefault();
        //Submit form
        form === undefined && (form = document.getElementById('form-teacher-profile'))
        const err = validate(form, validateRules);
        !err && alert('submited');

    }

    const _addExpRow = () => {
        const rowData = {
            id: randomId(),
            name: "",
            jobTitle: "fe",
            timePeriod: "2018",
        };
        dispatch({ type: "ADD_EXPROW", payload: rowData })
    }

    const _deleteExpRow = (id) => {
        dispatch({ type: "DELETE_EXPROW", payload: { id } })
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


    React.useEffect(() => {
        $(".js-select2").on('change', handleSelect2.bind(this));
        return () => $(".js-select2").off('change', handleSelect2.bind(this));
    }, [])

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
                                        <input type="text" className="form-control" placeholder="First Name *" name="firstName" onChange={handleChange} defaultValue={state.firstName} required />
                                        <label>First Name *</label>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                        <input type="text" className="form-control" placeholder="Last Name *" name="lastName" onChange={handleChange} defaultValue={state.lastName} required />
                                        <label>Last Name *</label>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                        <input type="text" className="form-control" placeholder="Skype ID *" name="skypeId" onChange={handleChange} defaultValue={state.skypeId} required />
                                        <label>Skype ID *</label>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                        <input type="number" className="form-control" placeholder="Phone number *" name="phoneNumber" onChange={handleChange} defaultValue={state.phoneNumber} required />
                                        <label>Phone Number *</label>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                        <select className="form-control" value={state.location} name="location" onChange={handleChange}>
                                            <option value="" disabled>Location</option>
                                            <option value="1" >United States</option>
                                        </select>
                                        <label>Location</label>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                        <select className="form-control" value={state.state} name="state" onChange={handleChange}>
                                            <option value="" disabled>State/Province/Region *</option>
                                            <option value="1">New York</option>
                                        </select>
                                        <label>State *</label>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                        <input type="text" className="form-control" placeholder="Phone number *" name="postalCode" onChange={handleChange} defaultValue={state.postalCode} required />
                                        <label>Postal Code</label>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                        <select className="form-control" name="timeZone" value={state.timeZone} onChange={handleChange}>
                                            <option value="" disabled>Your current time zone *</option>
                                            <option value="1">GTM +7</option>
                                        </select>
                                        <label>Time zone *</label>
                                    </div>
                                </div>
                            </div>
                            <h5 className="mg-b-15">Education Attainment</h5>
                            <div className="form-row">
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                        <select className="form-control" name="education" value={state.education} onChange={handleChange}>
                                            <option value="" disabled>Highest Level of Education *</option>
                                            <option value="1">High School Graduate</option>
                                            <option value="2">Vocational Course</option>
                                            <option value="3">College Student</option>
                                            <option value="4">Bachelor's Degree</option>
                                            <option value="5">Master's Degree</option>
                                            <option value="6">PHD</option>
                                            <option value="7">Associate Degree</option>
                                        </select>
                                        <label>Education</label>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                        <input type="text" className="form-control" placeholder="School name" name="schoolName" onChange={handleChange} defaultValue={state.schoolName} />
                                        <label>School name</label>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                        <select className="form-control" name="major" value={state.major} onChange={handleChange}>
                                            <option value="" disabled>Major/Specialization *</option>
                                            <option value="1">Business Studies/Administration/Management</option>
                                        </select>
                                        <label>Major/Specialization *</label>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6 col-lg-4 col-xl-3">
                                    <div className="input-float">
                                        <select className="form-control" name="englishProficiency" value={state.englishProficiency} onChange={handleChange}>
                                            <option value="" disabled>Please select your English proficiency *</option>
                                            <option value="1">Native Speaker</option>
                                            <option value="2">Proficient - C2</option>
                                            <option value="3">Advanced - C1</option>
                                            <option value="4">Upper Intermediate - B2</option>
                                            <option value="5">Below Upper Intermediate - B1</option>
                                        </select>
                                        <label>English proficiency</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="teacher-body mg-t-0-f">
                        <div className="tab-navigation-content bd-t pd-t-15">
                            <div className="swiper-container" id="js-teacher__info">
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
                                                        <select value={state.selectTeacherExp} readOnly={true} name="selectTeacherExp" className="js-select2 form-control" multiple={true}>
                                                            {!!state.teacherExperiences && state.teacherExperiences.length > 0 ? (
                                                                state.teacherExperiences.map(exp => <option key={`${exp.id}`} value={exp.value}>{exp.title}</option>)
                                                            ) : (<option value="">Loading option... </option>)}

                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="teacher__content-block mg-b-30">
                                                <h6> Fill in your teaching experience:</h6>
                                                <div className="experience__list mg-t-15" id="js-exp-list">
                                                    {!!state.experienceLists && state.experienceLists.length > 0 && [...state.experienceLists].map(exp =>
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
                                                            <select className="form-control" name="tesolCertificate" value={state.tesolCertificate} onChange={handleChange}>
                                                                <option value="1">TESOL (Other)</option>
                                                                <option value="2">TESOL (Full)</option>
                                                                <option value="3">TESOL (Foundation)</option>
                                                            </select>
                                                            <label>TESOL Certificate</label>
                                                        </div>
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <div className="input-float">
                                                            <select className="form-control" name="teylCertificate" value={state.teylCertificate} onChange={handleChange}>
                                                                <option value="1">TEYL (Other)</option>
                                                                <option value="2">TEYL (51 Talk)</option>
                                                            </select>
                                                            <label>TEYL Certificate</label>
                                                        </div>
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <div className="input-float">
                                                            <select className="form-control" name="otherCertificate" value={state.otherCertificate} onChange={handleChange}>
                                                                <option value="1">CELTA</option>
                                                                <option value="2">LET</option>
                                                                <option value="3">IELTS</option>
                                                                <option value="4">TOEFL</option>
                                                                <option value="5">TOEIC</option>
                                                                <option value="6">TKT (4 Score)</option>
                                                                <option value="7">CELTYL</option>
                                                            </select>
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
                    </div>
                </div>
                <div className="tx-center">
                    <button type="button" className="btn btn-success" onClick={_handleSubmitForm}><i className="fa fa-save mg-r-5" /> Update information</button>
                </div>
            </div>
        </form>
    )
}


const domContainer = document.getElementById('react-teacher-form');
ReactDOM.render(<TeacherForm />, domContainer);