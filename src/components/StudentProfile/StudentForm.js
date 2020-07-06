import React from 'react';
import ReactDOM from 'react-dom';

let initialState = {
    studentCode: "107",
    fullName: "Nguyen Văn Thái",
    avatar: "student.png",
    phone: "0111222333",
    email: "example@gmail.com",
    dateOfBirth: "01/09/1999",
    sex: "1",
    language: "2",
    timezone: "1",
    address: "123 Ly Thuong Kiet, TPHCM",
    target: ["Exam preparation", "Study aboard", "Self improvement", "Other"],
    selectTarget: ["Exam preparation"],
    hobbits: "Learn English",
    notes: "Your note....",
    oldPassword: "",
    newPassword: "",
}

const reducer = (prevState, { type, payload }) => {
    switch (type) {
        case "STATE_CHANGE": {
            return {
                ...prevState,
                [payload.key]: payload.value
            }
        }
        default: return prevState;
        break;
    }
}
const StudentForm = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const key = target.getAttribute("name");
        dispatch({ type: "STATE_CHANGE", payload: { key, value } })
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

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(state)
        let invalidArray = [];
        for (const [key, value] of Object.entries(state)) {
           if(!value.length) invalidArray.push(key)
       }
   if(invalidArray.length > 0) alert(`Vui lòng điền đầy đủ thông tin: [${invalidArray}]`)
}

React.useEffect(() => {
    $(".js-select2").on('change', handleSelect2.bind(this));
    $(".datetimepicker").on('change', handleChange.bind(this));

    return () => {
        $(".js-select2").off('change', handleSelect2.bind(this));
        $(".datetimepicker").off('change', handleChange.bind(this));
    }
}, [])
return (
    <form id="form-account-profile" onSubmit={onSubmit}>
    <div className="form-account pd-y-15">
    <div className="row mg-b-15">
    <div className="col-md-6">
    <div className="form-row align-items-center">
    <div
    className="form-group col-sm-3 col-label-fixed">
    <p className="mg-b-0 tx-medium">Student code:</p>
    </div>
    <div className="form-group col-sm-9">
    <input type="text" className="form-control" placeholder=""
    name="studentCode" defaultValue={state.studentCode} required onChange={handleChange} />
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
    defaultValue={state.phone} required
    onChange={handleChange} />
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
    defaultValue={state.dateOfBirth}
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
    value={state.language}
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
    defaultValue={state.fullName} required onChange={handleChange} />
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
    defaultValue={state.email} required onChange={handleChange} />
    </div>
    </div>
    <div className="form-row align-items-center">
    <div
    className="form-group col-sm-3 col-label-fixed">
    <p className="mg-b-0 tx-medium">Sex:</p>
    </div>
    <div className="form-group col-sm-9">
    <select name="" className="form-control" value={state.sex} name="sex"
    onChange={handleChange}>
    <option value="1">Male</option>
    <option value="2">Female</option>
    </select>
    </div>
    </div>
    <div className="form-row align-items-center">
    <div
    className="form-group col-sm-3 col-label-fixed">
    <p className="mg-b-0 tx-medium">Timezone:</p>
    </div>
    <div className="form-group col-sm-9">
    <select name="timezone" className="form-control" onChange={handleChange}>
    <option value="1">GTM +7</option>
    <option value="2">GTM -7</option>
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
    defaultValue={state.address} onChange={handleChange} />
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
    value={state.selectTarget}
    onClick={handleSelect2}>
    {!!state.target && state.target.length > 0 ? (
        state.target.map((item, index) => <option key={index} value={item}>{item}</option>)) :
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
    placeholder="Your hobbit" defaultValue={state.hobbits} onChange={handleChange} />
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
    defaultValue={state.notes} onChange={handleChange}></textarea>
    </div>
    </div>
    </div>
    <div className="col-md-6">
    <div className="form-row align-items-center">
    <div
    className="form-group col-sm-3 col-label-fixed">
    <p className="mg-b-0 tx-medium">Old password: </p>
    </div>
    <div className="form-group col-sm-9">
    <input type="password"
    className="form-control" placeholder="" name="oldPassword"
    defaultValue={state.oldPassword} required onChange={handleChange} />
    </div>
    </div>
    </div>
    <div className="col-md-6">
    <div className="form-row align-items-center">
    <div
    className="form-group col-sm-3 col-label-fixed">
    <p className="mg-b-0 tx-medium">New password:</p>
    </div>
    <div className="form-group col-sm-9">
    <input type="password"
    className="form-control" placeholder="" name="newPassword"
    defaultValue={state.newPassword} required onChange={handleChange} />
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
export default StudentForm;