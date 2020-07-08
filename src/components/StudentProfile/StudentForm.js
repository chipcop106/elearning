import React from 'react';
import ReactDOM from 'react-dom';


const Schema = Yup.object().shape({
    fullName: Yup.string()
        .required('Name is not empty'),
    phone: Yup.number()
        .typeError('Invalid phone number')
        .integer('Invalid phone number')
        .required('Phone is not empty'),
    email: Yup.string()
        .required('Email is not empty')
        .email('invalid email'),
    address: Yup.string()
        .required('Address is not empty'),
    hobbits: Yup.string()
        .required('Hobbits is not empty'),
    notes: Yup.string()
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

    React.useEffect(() => {
        $(".js-select2").on('change', handleSelect2.bind(this));
        $(".datetimepicker").on('change', handleChange.bind(this));

        return () => {
            $(".js-select2").off('change', handleSelect2.bind(this));
            $(".datetimepicker").off('change', handleChange.bind(this));
        }
    }, [values])
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
                                    name="studentCode" value={values.studentCode} required />
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
                                    name="phone"
                                    required
                                    onChange={handleChange}
                                    value={values.phone} />
                                {
                                    errors.phone ? <span className="text-danger d-block mt-2">{errors.phone}</span> : ""
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
                                <select name="language"
                                    value={values.language}
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
                                    name="fullName"
                                    placeholder="0"
                                    value={values.fullName}
                                    required onChange={handleChange} />
                                {
                                    errors.fullName ? <span className="text-danger d-block mt-2">{errors.fullName}</span> : ""
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
                                    name="email"
                                    placeholder="Ex: monamedia@mona.net"
                                    value={values.email}
                                    required onChange={handleChange} />
                                {
                                    errors.email ? <span className="text-danger d-block mt-2">{errors.email}</span> : ""
                                }
                            </div>
                        </div>
                        <div className="form-row align-items-center">
                            <div
                                className="form-group col-sm-3 col-label-fixed">
                                <p className="mg-b-0 tx-medium">Sex:</p>
                            </div>
                            <div className="form-group col-sm-9">
                                <select className="form-control" value={values.sex} name="sex"
                                    onChange={handleChange}>
                                    <option value="0">Male</option>
                                    <option value="1">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row align-items-center">
                            <div
                                className="form-group col-sm-3 col-label-fixed">
                                <p className="mg-b-0 tx-medium">Timezone:</p>
                            </div>
                            <div className="form-group col-sm-9">
                                <select name="timeZone"
                                    className="form-control"
                                    value={values.timeZone}
                                    onChange={handleChange}
                                >
                                    <option value="+7">GTM +7</option>
                                    <option value="-7">GTM -7</option>
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
                                    name="address"
                                    placeholder="Your address"
                                    value={values.address}
                                    onChange={handleChange} />
                                {
                                    errors.address ? <span className="text-danger d-block mt-2">{errors.address}</span> : ""
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
                                    name="selectTarget"
                                    value={values.selectTarget}
                                    onClick={handleChange}>
                                    {!!values.target && values.target.length > 0 ? (
                                        values.target.map((item, index) => <option key={index} value={item}>{item}</option>)) :
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
                                <input type="text" name="hobbits" className="form-control"
                                    placeholder="Your hobbit"
                                    value={values.hobbits}
                                    onChange={handleChange} />
                                {
                                    errors.hobbits ? <span className="text-danger d-block mt-2">{errors.hobbits}</span> : ""
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
                                <textarea name="" id="" rows="3"
                                    className="form-control"
                                    name="notes"
                                    placeholder="Notes for teachers"
                                    value={values.notes}
                                    onChange={handleChange}></textarea>
                                {
                                    errors.notes ? <span className="text-danger d-block mt-2">{errors.notes}</span> : ""
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

const FormikForm = withFormik({
    mapPropsToValues(props) {
        return {
            studentCode: "107",
            fullName: "Nguyễn Văn Thái",
            avatar: "student.png",
            address: "123 Ly Thuong Kiet, TPHCM",
            phone: "0111222333",
            sex: "1",
            timeZone: "-7",
            language: "2",
            dateOfBirth: "12/09/1999",
            email: "example@gmail.com",
            target: ["Exam preparation", "Study aboard", "Self improvement", "Other"],
            selectTarget: ["Exam preparation"],
            hobbits: "Learning English",
            notes: "Notes for teacher",
            password: "",
            newPassword: "",
            passwordChange: false,
        }
    },
    validationSchema: Schema,
    validate : (values) => {
        const errors = {};
        if(values.passwordChange)
        {
            if(values.password.length < 6)
            errors.password = 'Password at least 6 characters';
            if(values.newPassword.length < 6)
            errors.newPassword = 'Password at least 6 characters';
        }
        return errors;
    },
    handleSubmit: (values) => {
        console.log(values)
    },

})(StudentForm)


export default FormikForm;