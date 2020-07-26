import React from 'react';
import ReactDOM from 'react-dom';
import { useForm, Controller } from "react-hook-form";
import { getProfile } from "~src/api/studentAPI";
import { updateProfileAPI } from "~src/api/studentAPI";
import { updatePassAPI } from "~src/api/optionAPI";
import { getTimeZoneAPI } from "~src/api/optionAPI";
import { uploadImageToServer } from "~src/api/optionAPI";
import { getListTargetAPI } from "~src/api/optionAPI";
import { getListLanguageAPI } from "~src/api/optionAPI";

import { yupResolver } from '@hookform/resolvers';
import * as Yup from "yup";

import Flatpickr from 'react-flatpickr';
import Select from 'react-select';

import { toast } from 'react-toastify';
import 'react-toastify/scss/main.scss'
import { toastInit } from "~src/utils"

import { getFormattedDate } from "~src/utils";

const schema = Yup.object().shape({
  FullName: Yup.string()
    .required('Name is not empty'),
  Phone: Yup.number()
    .typeError('Invalid phone number')
    .integer('Invalid phone number')
    .required('Phone is not empty'),
  Email: Yup.string()
    .required('Email is not empty')
    .email('invalid email'),
  SelectTarget: Yup.string().nullable()
    .required('Target is not empty'),
  Address: Yup.string()
    .required('Address is not empty'),
  PersonalPreference: Yup.string()
    .required('Hobbits is not empty'),
  RequestWithTeacher: Yup.string()
    .required('Notes is not empty'),
});

const RenderListTimeZone = ({ list }) => {
  return !!list && list.length > 0 && list.map((item, index) =>
    <option key={index} value={item.ID}>{item.TimeZoneName}</option>
  )
}
const RenderListLanguage = ({ list }) => {
  return !!list && list.length > 0 && list.map((item, index) =>
    <option key={index} value={item.ID}>{item.LanguageName}</option>
  )
}
const StudentForm = ({ tabDisplay }) => {
  const [profile, setProfile] = React.useState(null);
  const [listLanguage, setListLanguage] = React.useState([]);
  const [listTimeZone, setListTimeZone] = React.useState([]);
  const [listTarget, setListTarget] = React.useState([]);
  const [selectedTarget, setSelectedTarget] = React.useState([]);
  const [avatar, setAvatar] = React.useState("");
  const [loadingAvatar, setLoadingAvatar] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');

  const updateProfileToastSuccess = () => toast("Update profile successful!", toastInit);
  const updateProfileToastFail = () => toast("Update profile fail, please retry!", toastInit);

  const { register, handleSubmit, errors, getValues, setValue, control } = useForm({
    resolver: yupResolver(schema),
  });

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

    if (oldPassword === newPassword) {
      setError('Old password must be different from new password !!');
      return;
    }

    setError(null);
    const res = await updatePassAPI({
      OldPass: oldPassword,
      NewPass: newPassword
    });
    if (res.Code === 0) {
      setError('Old password is not correct');
      return;
    } else if (res.Code === 1) {
      setError(null);
      hideChangePasswordForm();
      updatePassToastSuccess();
    }

  }
  const onSubmit = data => {
    const array = data.SelectTarget.split(",");
    let z = [];
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < listTarget.length; j++) {
        if (array[i] === listTarget[j].TargetName) {
          z.push(listTarget[j].ID);
          break;
        }
      }
    }

    onUpdateProfileAPI({
      ...data,
      Avatar: avatar,
      BirthDay: moment(data.BirthDay[0]).format("DD/MM/YYYY"),
      Target: z.join(","),
      Hobbits: data.PersonalPreference,
    })
  }
  const getAPI = async () => {
    try {
      const resProfile = await getProfile();
      if (resProfile.Code === 1) {
        setProfile({
          ...resProfile.Data,
          OldPass: "",
          NewPass: "",
        })
        setAvatar(resProfile.Data.Avatar)
      }

      const resTarget = await getListTargetAPI();
      if (resTarget.Code === 1 && resTarget.Data.length > 0) {
        setListTarget(resTarget.Data);
      }

      let arrayProfile = resProfile.Data.Target.split(",");
      let z = [];

      for (let i = 0; i < arrayProfile.length; i++) {
        for (let j = 0; j < resTarget.Data.length; j++) {
          if (resTarget.Data[j].ID.toString() === arrayProfile[i].toString()) {
            z.push(resTarget.Data[j].TargetName);
            break;
          }
        }
      }
      setSelectedTarget(z);
    }
    catch { }
  }
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
  const onUpdateProfileAPI = async (params) => {
    const res = await updateProfileAPI(params)
    if (res.Code === 1) {
      updateProfileToastSuccess();
    }
    else {
      updateProfileToastFail();
    }
  }
  const renderTarget = (options) => {
    return options.map(item => item.TargetName)
  }
  const handleUploadImage = async (e) => {
    setLoadingAvatar(true);
    let files = e.target.files
    if (!files) {
      setLoadingAvatar(false);
      return;
    }
    else {
      const res = await uploadImageToServer(files)
      if (res.Code === 1) { //Upload Avatar success
        const avatar = res.Data[0].UrlIMG;
        setAvatar(avatar);
        let output = document.getElementById('avatar')
        output.src = URL.createObjectURL(files[0])
        output.onload = function () {
          URL.revokeObjectURL(output.src)
        }
      }
      setLoadingAvatar(false);
    }
  }
  React.useEffect(() => {
    getAPI();
    getTimeZone();
    getLanguage();
  }, [])

  return tabDisplay === 1 ? (!!profile ? (<>
    <form id="form-account-profile" className="metronic-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-account pd-y-15">
        <div className="row mg-b-15">
          <div className="col-12">
            <div className="form-row  align-items-center ">
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium ">Avatar: </p>
              </div>
              <div className="form-group col-sm-9">
                <div className="student-avatar">
                  <div className="upload-container">
                    <div className={`${loadingAvatar ? '' : 'd-none'} overlay`}>
                      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>
                    <label className="upload-avatar">
                      <input
                        type="file" accept="image/*"
                        className="upload-box hidden d-none upload-file"
                        onChange={handleUploadImage} />
                      <img id="avatar"
                        src={profile.Avatar ? profile.Avatar : "../assets/img/default-avatar.png"} />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-row align-items-center">
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium">Student code:</p>
              </div>
              <div className="form-group col-sm-9">
                <input type="text" className="form-control" placeholder="" disabled={true}
                  name="UID" required defaultValue={profile.UID} ref={register} />
              </div>
            </div>
            <div className="form-row align-items-center">
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium">Phone:</p>
              </div>
              <div className="form-group col-sm-9">
                <input type="text" className="form-control" placeholder="0123456789"
                  name="Phone"
                  ref={register()}
                  defaultValue={profile.Phone} />
                {
                  errors.Phone && <span className="text-danger d-block mt-2">{errors.Phone.message}</span>
                }
              </div>
            </div>
            <div className="form-row align-items-center">
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium">Date of birth:</p>
              </div>
              <div className="form-group col-sm-9">
                <Controller
                  as={
                    <Flatpickr
                      placeholder="dd/mm/YYYY"
                      options={{
                        dateFormat: "d/m/Y",
                        static: true,
                      }}
                      className="form-control" />
                  }
                  control={control}
                  defaultValue={getFormattedDate(profile.BirthDay)}
                  name="BirthDay" />
              </div>
            </div>
            <div className="form-row align-items-center">
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium">Language:</p>
              </div>
              <div className="form-group col-sm-9">
                {
                  !!listLanguage && listLanguage.length > 0 &&
                  <select name="Language"
                    ref={register}
                    defaultValue={profile.Language ? profile.Language : "0"}
                    className="form-control">
                    < option value="0">Choose Language</option>
                    <RenderListLanguage list={listLanguage} />
                  </select>
                }
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-row align-items-center">
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium">Full name:</p>
              </div>
              <div className="form-group col-sm-9">
                <input type="text" className="form-control"
                  ref={register()}
                  defaultValue={profile.FullName}
                  name="FullName" />
                {
                  errors.FullName &&
                  <span className="text-danger d-block mt-2">{errors.FullName.message}</span>
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
                  ref={register()}
                  defaultValue={profile.Email}
                  placeholder="Ex:example@domain.com" />
                {
                  errors.Email &&
                  <span className="text-danger d-block mt-2">{errors.Email.message}</span>
                }
              </div>
            </div>
            <div className="form-row align-items-center">
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium">Sex:</p>
              </div>
              <div className="form-group col-sm-9">
                <select className="form-control"
                  name="Gender"
                  ref={register}
                  defaultValue={profile.Gender} >
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
                {
                  !!listTimeZone && listTimeZone.length > 0 &&
                  <select name="TimezoneID"
                    ref={register}
                    defaultValue={profile.TimeZone ? profile.TimeZone : "0"}
                    className="form-control">
                    <option value="0">Choose Time Zone</option>
                    <RenderListTimeZone list={listTimeZone} />
                  </select>
                }
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
                  ref={register()}
                  defaultValue={profile.Address} />
                {
                  errors.Address &&
                  <span className="text-danger d-block mt-2">{errors.Address.message}</span>
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
                {
                  Array.isArray(selectedTarget) && selectedTarget.length > 0 &&
                  <><Controller
                    as={
                      <Select
                        isMulti
                        options={renderTarget(listTarget)}
                        getOptionLabel={label => label}
                        getOptionValue={value => value}
                        className="basic-multi-select"
                        placeholder="Select Target"
                        classNamePrefix="select"
                        onChange={val => setValue("SelectTarget", val)} />
                    }
                    control={control}
                    defaultValue={selectedTarget}
                    name="SelectTarget" />
                    {
                      errors.SelectTarget &&
                      <span className="text-danger d-block mt-2">{errors.SelectTarget.message}</span>
                    }
                  </>
                }
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
                  ref={register()}
                  defaultValue={profile.PersonalPreference} />
                {
                  errors.PersonalPreference &&
                  <span className="text-danger d-block mt-2">{errors.PersonalPreference.message}</span>
                }
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="form-row  align-items-center ">
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium ">Yêu cầu với giáo viên</p>
              </div>
              <div className="form-group col-sm-9">
                <textarea id="" rows="3" className="form-control" placeholder="Your notes"
                  name="RequestWithTeacher"
                  ref={register()}
                  defaultValue={profile.RequestWithTeacher}></textarea>
                {
                  errors.RequestWithTeacher &&
                  <span className="text-danger d-block mt-2">{errors.RequestWithTeacher.message}</span>
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
  </>) : <></>) : <PasswordForm />;
}
const PasswordForm = () => {
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [displayPassword, setDisplayPassword] = React.useState(false);
  const [error, setError] = React.useState(null);

  const updatePassToastSuccess = () => toast("Update Password successful!", toastInit);

  const _onSubmit = (e) => {
    e.preventDefault();

    if (oldPassword === '' || newPassword === '') {
      setError('Password field must not empty !!');
      return;
    }

    if (oldPassword === newPassword) {
      setError('Old password must be different from new password !!');
      return;
    }
    setError(null);
    _handleSubmitPassword();
  }

  const _handleSubmitPassword = async () => {
    const res = await updatePassAPI({
      OldPass: oldPassword,
      NewPass: newPassword
    });
    if (res.Code === 0) {
      setError('Old password is not correct');
      return;
    } else if (res.Code === 1) {
      setError(null);
      updatePassToastSuccess();
      setOldPassword('');
      setNewPassword('');
    }
  } 

  return <form className="metronic-form change-password-form" onSubmit={_onSubmit}>
    <div className="form-account pd-y-15">
      <div className="row mg-b-15">
        <div className="col-12">
          <div className="form-row align-items-center ">
            <div className="form-group col-sm-3 col-label-fixed">
              <p className="mg-b-0 tx-medium">Current Password:</p>
            </div>
            <div className="form-group col-sm-9">
              <input
                type={displayPassword ? "text" : "password"}
                className="form-control" name="OldPass"
                onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="form-row align-items-center ">
            <div className="form-group col-sm-3 col-label-fixed">
              <p className="mg-b-0 tx-medium">New Password:</p>
            </div>
            <div className="form-group col-sm-9">
              <input
                type={displayPassword ? "text" : "password"}
                className="form-control" name="NewPass"
                onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="form-row align-items-center ">
            <div className="form-group pd-l-10">
              <div className="d-flex align-items-center">
                <input type="checkbox" id="displaypassword" onChange={() => setDisplayPassword(!displayPassword)} />
                <label className="mg-0 mg-l-5" htmlFor="displaypassword">Show password</label>
              </div>
            </div>
          </div>
        </div>
        {error && error !== '' && (<span className="col-12 tx-danger">{error}</span>)}
      </div>
      <div className="tx-center">
        <button type="submit" className="btn btn-primary rounded-pill">Save Change</button>
      </div>
    </div>
  </form>
}

export default StudentForm;
