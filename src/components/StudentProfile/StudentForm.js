import React from 'react';
import ReactDOM from 'react-dom';

import { withFormik } from 'formik';
import * as Yup from 'yup';

import { getProfile } from "~src/api/studentAPI";
import { getListLevelPurpose } from "~src/api/optionAPI";
import { updateProfileAPI } from "~src/api/studentAPI";
import { updatePassAPI } from "~src/api/optionAPI";
import { getTimeZoneAPI } from "~src/api/optionAPI";
import { uploadImageToServer } from "~src/api/optionAPI";
import { getListTargetAPI } from "~src/api/optionAPI";
import { getListLanguageAPI } from "~src/api/optionAPI";

import Flatpickr from 'react-flatpickr';
import Select from 'react-select';

import { toast } from 'react-toastify';
import 'react-toastify/scss/main.scss'
import { toastInit } from "~src/utils"

import { getFormattedDate } from "~src/utils";


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
  const [listTimeZone, setListTimeZone] = React.useState([]);
  const [listLanguage, setListLanguage] = React.useState([]);
  const [listTarget, setListTarget] = React.useState([]);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = props;

  const getTimeZone = async () => {
    const res = await getTimeZoneAPI();
    if (res.Code === 1 && res.Data.length > 0) {
      setListTimeZone(res.Data);
    }
  }

  const getLanguage = async () => {
    const res = await getListLanguageAPI();
    if (res.Code === 1 && res.Data.length > 0) {
      setListLanguage(res.Data);
    }
  }

  const getTarget = async () => {
    const res = await getListTargetAPI();
    let x = [];
    if (res.Code === 1 && res.Data.length > 0) {
      x = res.Data.map(item => item.TargetName)
      console.log(x)
      setListTarget(x);
    }
  }

  const handleUploadImage = async (e) => {
    let files = e.target.files
    if (!files) return;
    else {
      const res = await uploadImageToServer(files)
      if (res.Code === 1) { //Upload Avatar success

        const avatar = res.Data[0].UrlIMG;
        setFieldValue("Avatar", avatar, false);

        let output = document.getElementById('avatar')
        output.src = URL.createObjectURL(files[0])
        output.onload = function () {
          URL.revokeObjectURL(output.src)
        }
      }
    }
  }

  React.useEffect(() => {
    getTimeZone();
    getLanguage();
    getTarget();
  }, [])

  return /* values.errorFetch ? <></> : */ (
    <form id="form-account-profile" onSubmit={handleSubmit}>
      <div className="form-account pd-y-15">
        {/* Avatar field */}
        <div className="student-avatar">
          <div className="upload-container">
            <label className="upload-avatar">
              <input type="file" accept="image/*" className="upload-box hidden d-none upload-file" onChange={handleUploadImage} />
              <img id="avatar" src={values.Avatar} />
            </label>
          </div>
        </div>
        {/* End avatar field */}
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
                <Flatpickr
                  placeholder="dd/mm/YYYY"
                  name="BirthDay"
                  options={{
                    dateFormat: "d/m/Y",
                    static: true,
                  }}
                  className="form-control"
                  value={getFormattedDate(values.BirthDay)}
                  onChange={(selectedDates, dateStr, instance) => {
                    setFieldValue("BirthDay", dateStr, false)
                  }} />
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
                  {
                    !!listLanguage && listLanguage.length > 0 && listLanguage.map(item =>
                      <option value={item.ID}>{item.LanguageName}</option>
                    )
                  }
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
                <input type="text" className="form-control" required
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
                  placeholder="Ex: example@com"
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
                <select name="TimezoneID"
                  value={values.TimezoneID}
                  className="form-control"
                  onChange={handleChange} >
                  {
                    !!listTimeZone && listTimeZone.length > 0 && listTimeZone.map(item =>
                      <option value={item.ID}>{item.TimeZoneName}</option>
                    )
                  }
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
                  options={listTarget}
                  value={values.SelectTarget}
                  getOptionLabel={label => label}
                  getOptionValue={value => value}
                  className="basic-multi-select"
                  placeholder="Select Target"
                  classNamePrefix="select"
                  onChange={val => {
                    setFieldValue("SelectTarget", val, false)
                  }} />
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
                <p className="mg-b-0 tx-medium ">Bạn có yêu cầu gì với giáo viên không?</p>
              </div>
              <div className="form-group col-sm-9">
                <textarea id="" rows="3" className="form-control" placeholder="Your notes"
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
    </form >
  )
}

const FormWrap = () => {
  const [profile, setProfile] = React.useState({});
  const [listLevelPurpose, setListLevelPurpose] = React.useState([]);
  const [myLevel, setMylevel] = React.useState(1);
  const [errorFetch, setErrorFetch] = React.useState(false);

  const updateProfileToastSuccess = () => toast("Update profile successful!", toastInit);
  const updateProfileToastFail = () => toast("Update profile fail, please retry!", toastInit);
  const updatePassToastSuccess = () => toast("Update Password successful!", toastInit);
  const updatePassToastFail = () => toast("Update password fail, please retry!", toastInit);

  const getAPI = async () => {
    try {
      const resLevelPurpose = await getListLevelPurpose();
      let x = [];
      if (resLevelPurpose.Code === 1 && resLevelPurpose.Data.length > 0) {
        x = resLevelPurpose.Data.map(item => {
          return item.PurposeLevelName
        })
        setListLevelPurpose(x)
      }
      const resProfile = await getProfile();
      if (resProfile.Code === 1) {
        setProfile({
          ...resProfile.Data,
        })
      }
      else {
        setErrorFetch(true)
      }
      /* const index = resListTarget.Data.map(x => x.ID.toString()).indexOf(resProfile.Data.LevelPurpose);
      setMylevel([resLevelPurpose.Data[index].PurposeLevelName]) */
    }
    catch { }
  }

  const onUpdateProfileAPI = async (params) => {
    const res = await updateProfileAPI(params)
    if (res.Code === 1) {
      updateProfileToastSuccess();
    }
    else {
      updateProfileToastFail();
    }
  }

  const onUpdatePassAPI = async (params) => {
    const res = await updatePassAPI(params)
    if (res.Code === 1) {
      updatePassToastSuccess();
    }
    else {
      updatePassToastFail();
    }
  }

  React.useEffect(() => {
    getAPI();
  }, []);

  const FormikForm = withFormik({
    mapPropsToValues() {
      return {
        UID: profile.UID,
        FullName: profile.FullName,
        Avatar: profile.Avatar,
        Address: profile.Address,
        Phone: profile.Phone,
        Gender: profile.Gender,
        TimezoneID: profile.Timezone,
        Language: profile.Language,
        BirthDay: profile.BirthDay,
        Email: profile.Email,
        SelectTarget: myLevel,
        PersonalPreference: profile.PersonalPreference,
        RequestWithTeacher: profile.RequestWithTeacher,
        password: "",
        newPassword: "",
        passwordChange: false,
        errorFetch: errorFetch,
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
      onUpdateProfileAPI({
        FullName: values.FullName,
        Phone: values.Phone,
        Email: values.Email,
        BirthDay: values.BirthDay,
        Gender: values.Gender,
        Language: values.Language,
        TimezoneID: values.TimezoneID,
        Address: values.Address,
        Target: values.SelectTarget && values.SelectTarget.join(","),
        Hobbits: values.PersonalPreference,
        RequestWithTeacher: values.RequestWithTeacher,
        PurposeLevel: values.PurposeLevel,
        Avatar: values.Avatar,
      })
      if (values.passwordChange) {
        onUpdatePassAPI({
          OldPass: values.password,
          NewPass: values.newPassword,
        })
      }
    },
  })(StudentForm)
  return <FormikForm />
}
export default FormWrap;
