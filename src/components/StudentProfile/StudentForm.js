import React from 'react';
import ReactDOM from 'react-dom';
import { useForm, Controller } from "react-hook-form";

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

function validdateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const StudentForm = () => {
  const [profile, setProfile] = React.useState(null);
  const [listLanguage, setListLanguage] = React.useState([]);
  const [listTimeZone, setListTimeZone] = React.useState([]);
  const [listTarget, setListTarget] = React.useState([]);
  const [selectedTarget, setSelectedTarget] = React.useState([]);
  const [passwordChange, togglePassword] = React.useState(false);
  const [avatar, setAvatar] = React.useState("");

  const updateProfileToastSuccess = () => toast("Update profile successful!", toastInit);
  const updateProfileToastFail = () => toast("Update profile fail, please retry!", toastInit);
  const updatePassToastSuccess = () => toast("Update Password successful!", toastInit);
  const updatePassToastFail = () => toast("Update password fail, please retry!", toastInit);

  const { register, handleSubmit, errors, setValue, control } = useForm();

  const onSubmit = data => {
    console.log(data);
    let z = [];
       for(let i=0; i<data.SelectTarget.length; i++) {
        for(let j=0; j<listTarget.length; j++) {
          if(data.SelectTarget[i] === listTarget[j].TargetName) {
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

      if (passwordChange) {
        onUpdatePassAPI({
          OldPass: data.OldPass,
          NewPass: data.NewPass,
        })
      }
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

  const onUpdatePassAPI = async (params) => {
    const res = await updatePassAPI(params)
    if (res.Code === 1) {
      updatePassToastSuccess();
    }
    else {
      updatePassToastFail();
    }
  }

  const renderTarget = (options) => {
    return options.map(item => item.TargetName)
  }

  const handleUploadImage = async (e) => {
    let files = e.target.files
    if (!files) return;
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
    }
  }

  React.useEffect(() => {
    getAPI();
    getTimeZone();
    getLanguage();
  }, [])

  return !profile ? <>loading...</> : (
    <form id="form-account-profile" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-account pd-y-15">
        <div className="student-avatar">
          <div className="upload-container">
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
        <div className="row mg-b-15">
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
                  ref={register({
                    validate: value => {
                      return (!isNaN(value) && parseInt(value) > 0) || "Phone number is invalid"
                    }
                  })}
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
                <select name="Language"
                  ref={register}
                  defaultValue={profile.Language}
                  className="form-control">
                  {
                    !!listLanguage && listLanguage.length > 0 && listLanguage.map((item, index) =>
                      <option key={index} value={item.ID}>{item.LanguageName}</option>
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
                <input type="text" className="form-control"
                  ref={register({
                    validate: value => value.length > 0 || "Name is not empty"
                  })}
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
                  ref={register({
                    validate: value => validdateEmail(value) || "Email is invalid"
                  })}
                  defaultValue={profile.Email}
                  placeholder="Ex:example@com" />
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
                <select name="TimezoneID"
                  ref={register}
                  defaultValue={profile.TimeZoneID}
                  className="form-control">
                  {
                    !!listTimeZone && listTimeZone.length > 0 && listTimeZone.map((item, index) =>
                      <option key={index} value={item.ID}>{item.TimeZoneName}</option>
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
                  ref={register({
                    validate: value => value.length > 0 || "Address is not empty"
                  })}
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
                    rules={{
                      validate: value => (!!value) || "Target is not empty"
                    }}
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
                  ref={register({
                    validate: value => value.length > 0 || "This field is not empty"
                  })}
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
                <p className="mg-b-0 tx-medium ">Bạn có yêu cầu gì với giáo viên không?</p>
              </div>
              <div className="form-group col-sm-9">
                <textarea id="" rows="3" className="form-control" placeholder="Your notes"
                  name="RequestWithTeacher"
                  ref={register({
                    validate: value => value.length > 0 || "This field is not empty"
                  })}
                  defaultValue={profile.RequestWithTeacher}></textarea>
                {
                  errors.RequestWithTeacher &&
                  <span className="text-danger d-block mt-2">{errors.RequestWithTeacher.message}</span>
                }
              </div>
            </div>
          </div>
          <div className="custom-control custom-switch col-md-12 mg-b-15" style={{ marginLeft: '15px' }}>
            <input name="passwordChange" type="checkbox" className="custom-control-input" id="customSwitch1" onChange={() => togglePassword(!passwordChange)} />
            <label className="custom-control-label" htmlFor="customSwitch1">Change password</label>
          </div>
          <div className={`${passwordChange ? 'col-md-6 d-block' : 'col-md-6 d-none'}`}>
            <div className="form-row align-items-center">
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium">Old password: </p>
              </div>
              <div className="form-group col-sm-9">
                <input type="password" className="form-control" placeholder=""
                  name="OldPass"
                  ref={register({
                    validate: value => {
                      if (passwordChange) {
                        return value.length >= 6 || "Password must at least 6 characters"
                      }
                      return true;
                    }
                  })}
                  defaultValue={profile.OldPass} />
                {
                  errors.OldPass &&
                  <span className="text-danger d-block mt-2">{errors.OldPass.message}</span>
                }

              </div>
            </div>
          </div>
          <div className={`${passwordChange ? 'col-md-6 d-block' : 'col-md-6 d-none'}`}>
            <div className="form-row align-items-center">
              <div className="form-group col-sm-3 col-label-fixed">
                <p className="mg-b-0 tx-medium">New password:</p>
              </div>
              <div className="form-group col-sm-9">
                <input type="password" className="form-control" placeholder=""
                  name="NewPass"
                  ref={register({
                    validate: value => {
                      if (passwordChange) {
                        return value.length >= 6 || "Password must at least 6 characters"
                      }
                      return true;
                    }
                  })}
                  defaultValue={profile.NewPass} />
                {
                  errors.NewPass &&
                  <span className="text-danger d-block mt-2">{errors.NewPass.message}</span>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="tx-center">
          <button type="submit" className="btn btn-primary rounded-pill">Save information</button>
        </div>
      </div>
    </form >)
}

export default StudentForm;
