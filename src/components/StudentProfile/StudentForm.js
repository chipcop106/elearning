import React from 'react';
import ReactDOM from 'react-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { getProfile } from "~src/api/studentAPI";
import { getListLevelPurpose } from "~src/api/optionAPI";
import { SkeletonStudentForm } from "~components/common/Skeleton/SkeletonStudentForm"

import { getFormattedDate } from "~src/utils";
import Select from 'react-select';

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
  PersonalPreference: Yup.string()
    .required('Hobbits is not empty'),
  RequestWithTeacher: Yup.string()
    .required('Notes is not empty'),
});


const StudentForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = props;

  const handleSelect2 = (val) => {
    const key = "SelectTarget";
    setFieldValue(key, val, false)
  }

  const datePickerInit = () => {
    $(".datetimepicker").flatpickr({
      dateFormat: "d/m/Y",
    });
  }

  React.useEffect(() => {
    $(".datetimepicker").on('change', handleChange.bind(this));

    return () => {
      $(".datetimepicker").off('change', handleChange.bind(this));
    }
  }, [values])

  React.useEffect(() => {
    datePickerInit();
  }, [])

  return (
    <form id="form-account-profile" onSubmit={handleSubmit}>
      <div className="form-account pd-y-15">
        <div className="row mg-b-15">
          <div className="col-md-6">
            <div className="form-row align-items-center">
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium">Student code:</p>
              </div>
              <div className="form-group col-sm-9">
                <input type="text" className="form-control" placeholder="" disabled={true}
                  name="UID" required value={values.UID} />
              </div>
            </div>
            <div className="form-row align-items-center">
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium">Phone:</p>
              </div>
              <div className="form-group col-sm-9">
                <input type="text" className="form-control" required placeholder="0123456789"
                  name="Phone"
                  value={values.Phone}
                  onChange={handleChange} />
                {
                  errors.Phone && touched.Phone &&
                  <span className="text-danger d-block mt-2">{errors.Phone}</span>
                }
              </div>
            </div>
            <div className="form-row align-items-center">
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium">Date of birth:</p>
              </div>
              <div className="form-group col-sm-9">
                <input type="text" className="form-control datetimepicker" placeholder="dd/mm/YYYY"
                  name="BirthDay"
                  value={getFormattedDate(values.BirthDay)}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row align-items-center">
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium">Language:</p>
              </div>
              <div className="form-group col-sm-9">
                <select name="Language"
                  value={values.Language}
                  className="form-control"
                  onChange={handleChange}>
                  <option value="1">Vietnamese</option>
                  <option value="2">English</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-row align-items-center">
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium">Full name:</p>
              </div>
              <div className="form-group col-sm-9">
                <input type="text" className="form-control" placeholder="0" required
                  value={values.FullName}
                  name="FullName"
                  onChange={handleChange} />
                {
                  errors.FullName && touched.FullName &&
                  <span className="text-danger d-block mt-2">{errors.FullName}</span>
                }
              </div>
            </div>
            <div className="form-row align-items-center">
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium">Email:</p>
              </div>
              <div className="form-group col-sm-9">
                <input type="email" className="form-control"
                  name="Email"
                  value={values.Email}
                  placeholder="Ex: monamedia@mona.net"
                  required onChange={handleChange} />
                {
                  errors.Email && touched.Email &&
                  <span className="text-danger d-block mt-2">{errors.Email}</span>
                }
              </div>
            </div>
            <div className="form-row align-items-center">
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium">Sex:</p>
              </div>
              <div className="form-group col-sm-9">
                <select className="form-control" name="Gender"
                  value={values.Gender}
                  onChange={handleChange}>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">Other</option>
                </select>
              </div>
            </div>
            <div className="form-row align-items-center">
              <div className="form-group col-sm-3 col-label-fixed">
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
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium ">Address:</p>
              </div>
              <div className="form-group col-sm-9">
                <input type="text" className="form-control" placeholder="Your address"
                  name="Address"
                  value={values.Address}
                  onChange={handleChange} />
                {
                  errors.Address && touched.Address &&
                  <span className="text-danger d-block mt-2">{errors.Address}</span>
                }
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="form-row  align-items-center ">
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium ">Target:</p>
              </div>
              <div className="form-group col-sm-9 select-checkbox">
                <Select
                  isMulti
                  name="SelectTarget"
                  options={values.Target}
                  value={values.SelectTarget}
                  getOptionLabel={label => label}
                  getOptionValue={value => value}
                  className="basic-multi-select"
                  placeholder="Select Target"
                  classNamePrefix="select"
                  onChange={handleSelect2} />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="form-row  align-items-center ">
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium ">Hobbits: </p>
              </div>
              <div className="form-group col-sm-9">
                <input type="text" placeholder="Your hobbit" className="form-control"
                  name="PersonalPreference"
                  value={values.PersonalPreference}
                  onChange={handleChange} />
                {
                  errors.PersonalPreference && touched.PersonalPreference &&
                  <span className="text-danger d-block mt-2">{errors.PersonalPreference}</span>
                }
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="form-row  align-items-center ">
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium ">Notes:</p>
              </div>
              <div className="form-group col-sm-9">
                <textarea id="" rows="3" className="form-control" placeholder="Notes for teachers"
                  name="RequestWithTeacher"
                  value={values.RequestWithTeacher}
                  onChange={handleChange}></textarea>
                {
                  errors.RequestWithTeacher && touched.RequestWithTeacher &&
                  <span className="text-danger d-block mt-2">{errors.RequestWithTeacher}</span>
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
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium">Old password: </p>
              </div>
              <div className="form-group col-sm-9">
                <input type="password" className="form-control" placeholder=""
                  name="password"
                  value={values.password}
                  onChange={handleChange} />
                {
                  errors.password && touched.password &&
                  <span className="text-danger d-block mt-2">{errors.password}</span>
                }
              </div>
            </div>
          </div>
          <div className={`${values.passwordChange ? 'col-md-6 d-block' : 'col-md-6 d-none'}`}>
            <div className="form-row align-items-center">
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium">New password:</p>
              </div>
              <div className="form-group col-sm-9">
                <input type="password" className="form-control" placeholder=""
                  name="newPassword"
                  value={values.newPassword}
                  onChange={handleChange} />
                {
                  errors.newPassword && touched.newPassword &&
                  <span className="text-danger d-block mt-2">{errors.newPassword}</span>
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
  const [listLevelPurpose, setListLevelPurpose] = React.useState([]);
  const [myLevel, setMylevel] = React.useState(null);

  const getAPI = async () => {
    const resLevelPurpose = await getListLevelPurpose();
    let x;
    if (resLevelPurpose.Code === 1 && resLevelPurpose.Data.length > 0) {
      x = resLevelPurpose.Data.map(item => {
        return item.PurposeLevelName
      })
      setListLevelPurpose(x)
    }

    const resProfile = await getProfile();
    if (resProfile.Code === 1)
      setProfile({
        ...resProfile.Data,
      })
    const index = resLevelPurpose.Data.map(x => x.ID.toString()).indexOf(resProfile.Data.LevelPurpose);
    setMylevel([resLevelPurpose.Data[index].PurposeLevelName])
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
        BirthDay: profile.BirthDay,
        Email: profile.Email,
        Target: listLevelPurpose,
        SelectTarget: myLevel,
        PersonalPreference: profile.PersonalPreference,
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
