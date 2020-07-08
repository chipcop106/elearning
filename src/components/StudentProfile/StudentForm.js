import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, withFormik } from 'formik';
import * as Yup from 'yup';
import { getProfile } from "../../api/studentAPI";

const Schema = Yup.object().shape({
    FullName: Yup.string()
        .required('Name is not empty'),
    Phone: Yup.number()
        .typeError('Invalid phone number')
        .integer('Invalid phone number')
        .required('Phone is not empty'),
    Email: Yup.string()
        .required('Email is not empty')
        .email('invalid email'),
    Address: Yup.string()
        .required('Address is not empty'),
    PeronalPreference: Yup.string()
        .required('Hobbits is not empty'),
    RequestWithTeacher: Yup.string()
        .required('Notes is not empty'),
});


const StudentForm = (props) => {

    const handleSelect2 = (e) => {
        const target = e.target;
        const value = [];
        [...target.children].map(option => {
            if (option.selected) value.push(option.value);
        });
        const key = target.getAttribute("name");
        props.values[key] = value;
    }

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    const datePickerInit = () => {
        $(".datetimepicker").flatpickr({
            dateFormat: "d/m/Y",
        });
    }

    const select2Init = () => {
        $('#target-select').select2({
            closeOnSelect: false,
            placeholder: "Learning target",
            allowHtml: true,
            allowClear: true,
            tags: true
        });
    }

    React.useEffect(() => {
        $(".js-select2").on('change', handleSelect2.bind(this));
        $(".datetimepicker").on('change', handleChange.bind(this));

        return () => {
            $(".js-select2").off('change', handleSelect2.bind(this));
            $(".datetimepicker").off('change', handleChange.bind(this));
        }
    }, [values])

    React.useEffect(()=>{
        select2Init();
        datePickerInit();
    },[])

    return (
        <form id="form-account-profile" onSubmit={handleSubmit}>
            <div className="form-account pd-y-15">
                <div className="row mg-b-15">
                    <div className="col-md-6">
                        <div className="form-row align-items-center">
                            <div
                                className="form-group col-sm-3 col-label-fixed">
                                <p className="mg-b-0 tx-medium">Student code:</p>
                            </div>
                            <div className="form-group col-sm-9">
                                <input type="text" className="form-control" placeholder="" disabled={true}
                                    name="UID" required value={values.UID} />
                            </div>
                        </div>
                        <div className="form-row align-items-center">
                            <div
                                className="form-group col-sm-3 col-label-fixed">
                                <p className="mg-b-0 tx-medium">Phone:</p>
                            </div>
                            <div className="form-group col-sm-9">
                                <input type="text" className="form-control"
                                    placeholder="0123456789"
                                    name="Phone"
                                    value={values.Phone}
                                    required
                                    onChange={handleChange} />
                                {
                                    errors.Phone ? <span className="text-danger d-block mt-2">{errors.Phone}</span> : ""
                                }
                            </div>
                        </div>
                        <div className="form-row align-items-center">
                            <div
                                className="form-group col-sm-3 col-label-fixed">
                                <p className="mg-b-0 tx-medium">Date of birth:</p>
                            </div>
                            <div className="form-group col-sm-9">
                                <input type="text"
                                    className="form-control datetimepicker"
                                    name="dateOfBirth"
                                    value={values.dateOfBirth}
                                    onChange={handleChange}
                                    placeholder="dd/mm/YYYY" />
                            </div>
                        </div>
                        <div className="form-row align-items-center">
                            <div
                                className="form-group col-sm-3 col-label-fixed">
                                <p className="mg-b-0 tx-medium">Language:</p>
                            </div>
                            <div className="form-group col-sm-9">
                                <select name="Language"
                                    value={values.Language}
                                    className="form-control" onChange={handleChange}>
                                    <option value="1">Vietnamese</option>
                                    <option value="2">English</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-row align-items-center">
                            <div
                                className="form-group col-sm-3 col-label-fixed">
                                <p className="mg-b-0 tx-medium">Full name:</p>
                            </div>
                            <div className="form-group col-sm-9">
                                <input type="text" className="form-control"
                                    value={values.FullName}
                                    name="FullName"
                                    placeholder="0"
                                    required onChange={handleChange} />
                                {
                                    errors.FullName ? <span className="text-danger d-block mt-2">{errors.FullName}</span> : ""
                                }
                            </div>
                        </div>
                        <div className="form-row align-items-center">
                            <div
                                className="form-group col-sm-3 col-label-fixed">
                                <p className="mg-b-0 tx-medium">Email:</p>
                            </div>
                            <div className="form-group col-sm-9">
                                <input type="email" className="form-control"
                                    name="Email"
                                    value={values.Email}
                                    placeholder="Ex: monamedia@mona.net"
                                    required onChange={handleChange} />
                                {
                                    errors.Email ? <span className="text-danger d-block mt-2">{errors.Email}</span> : ""
                                }
                            </div>
                        </div>
                        <div className="form-row align-items-center">
                            <div
                                className="form-group col-sm-3 col-label-fixed">
                                <p className="mg-b-0 tx-medium">Sex:</p>
                            </div>
                            <div className="form-group col-sm-9">
                                <select className="form-control" name="Gender"
                                    value={values.Gender}
                                    onChange={handleChange}>
                                    <option value="0">Female</option>
                                    <option value="1">Male</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row align-items-center">
                            <div
                                className="form-group col-sm-3 col-label-fixed">
                                <p className="mg-b-0 tx-medium">Timezone:</p>
                            </div>
                            <div className="form-group col-sm-9">
                                <select name="TimeZone"
                                    value={values.TimeZone}
                                    className="form-control"
                                    onChange={handleChange} >
                                    <option value="1">GTM +7</option>
                                    <option value="2">GTM +0</option>
                                    <option value="3">GTM -7</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-row  align-items-center ">
                            <div
                                className="form-group col-sm-3 col-label-fixed">
                                <p className="mg-b-0 tx-medium ">Address:</p>
                            </div>
                            <div className="form-group col-sm-9">
                                <input type="text" className="form-control"
                                    name="Address"
                                    value={values.Address}
                                    placeholder="Your address"
                                    onChange={handleChange} />
                                {
                                    errors.Address ? <span className="text-danger d-block mt-2">{errors.Address}</span> : ""
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-row  align-items-center ">
                            <div
                                className="form-group col-sm-3 col-label-fixed">
                                <p className="mg-b-0 tx-medium ">Target:</p>
                            </div>
                            <div
                                className="form-group col-sm-9 select-checkbox">
                                <select id="target-select"
                                    className="js-select2 form-control"
                                    multiple={true}
                                    readOnly={true}
                                    name="SelectTarget"
                                    value={values.SelectTarget}
                                    onClick={handleChange}>
                                    {!!values.Target && values.Target.length > 0 ? (
                                        values.Target.map((item, index) => <option key={index} value={item}>{item}</option>)) :
                                        (<option value="">Loading option... </option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-row  align-items-center ">
                            <div
                                className="form-group col-sm-3 col-label-fixed">
                                <p className="mg-b-0 tx-medium ">Hobbits: </p>
                            </div>
                            <div className="form-group col-sm-9">
                                <input type="text" name="PeronalPreference" className="form-control"
                                    placeholder="Your hobbit"
                                    value={values.PeronalPreference}
                                    onChange={handleChange} />
                                {
                                    errors.PeronalPreference ? <span className="text-danger d-block mt-2">{errors.PeronalPreference}</span> : ""
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-row  align-items-center ">
                            <div
                                className="form-group col-sm-3 col-label-fixed">
                                <p className="mg-b-0 tx-medium ">Notes:</p>
                            </div>
                            <div className="form-group col-sm-9">
                                <textarea id="" rows="3"
                                    className="form-control"
                                    name="RequestWithTeacher"
                                    value={values.RequestWithTeacher}
                                    placeholder="Notes for teachers"
                                    onChange={handleChange}></textarea>
                                {
                                    errors.RequestWithTeacher ? <span className="text-danger d-block mt-2">{errors.RequestWithTeacher}</span> : ""
                                }
                            </div>
                        </div>
                    </div>
                    <div className="custom-control custom-switch col-md-12" style={{ marginLeft: '15px' }}>
                        <input name="passwordChange" type="checkbox" className="custom-control-input" id="customSwitch1" onChange={handleChange} />
                        <label className="custom-control-label" htmlFor="customSwitch1">Change password</label>
                    </div>
                    <div className={`${values.passwordChange ? 'col-md-6 d-block' : 'col-md-6 d-none'}`}>
                        <div className="form-row align-items-center">
                            <div
                                className="form-group col-sm-3 col-label-fixed">
                                <p className="mg-b-0 tx-medium">Old password: </p>
                            </div>
                            <div className="form-group col-sm-9">
                                <input type="password"
                                    className="form-control" placeholder="" name="password"
                                    value={values.password}
                                    onChange={handleChange} />
                                {
                                    errors.password ? <span className="text-danger d-block mt-2">{errors.password}</span> : ""
                                }
                            </div>
                        </div>
                    </div>
                    <div className={`${values.passwordChange ? 'col-md-6 d-block' : 'col-md-6 d-none'}`}>
                        <div className="form-row align-items-center">
                            <div
                                className="form-group col-sm-3 col-label-fixed">
                                <p className="mg-b-0 tx-medium">New password:</p>
                            </div>
                            <div className="form-group col-sm-9">
                                <input type="password"
                                    className="form-control" placeholder="" name="newPassword"
                                    value={values.newPassword}
                                    onChange={handleChange} />
                                {
                                    errors.newPassword ? <span className="text-danger d-block mt-2">{errors.newPassword}</span> : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tx-center">
                    <button type="submit" className="btn btn-primary rounded-pill">Save information</button>
                </div>
            </div>
        </form>
    )
}

const FormWrap = () => {
    const [profile, setProfile] = React.useState({});

    const getAPI = async () => {
        const profile = await getProfile();
        setProfile({
            ...profile.Data,
        })
    }

    React.useEffect(() => {
        getAPI();
    }, []);

    const FormikForm = withFormik({
        mapPropsToValues() {
            return {
                UID: profile.UID,
                FullName: profile.FullName,
                avatar: "student.png",
                Address: profile.Address,
                Phone: profile.Phone,
                Gender: profile.Gender,
                TimeZone: profile.TimeZone,
                Language: profile.Language,
                dateOfBirth: "12/09/1999",
                Email: profile.Email,
                Target: ["Exam preparation", "Study aboard", "Self improvement", "Other"],
                SelectTarget: ["Exam preparation"],
                PeronalPreference: profile.PeronalPreference,
                RequestWithTeacher: profile.RequestWithTeacher,
                password: "",
                newPassword: "",
                passwordChange: false,
            }
        },
        validationSchema: Schema,
        validate: (values) => {
            const errors = {};
            if (values.passwordChange) {
                if (values.password.length < 6)
                    errors.password = 'Password at least 6 characters';
                if (values.newPassword.length < 6)
                    errors.newPassword = 'Password at least 6 characters';
            }
            return errors;
        },
        handleSubmit: (values) => {
            console.log(values)
        },
    })(StudentForm)

    return <FormikForm />
}

export default FormWrap;