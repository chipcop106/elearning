"use strict";

var _this = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var validateRules = {
  firstName: {
    presence: true
  }
};
var initialState = {
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
  introduce: "While I have no soccer skills, I once played in a fairly competitive adult soccer league with my then-teenage stepson. I was terrible, but I played because he asked me to. (When your kids get older and ask you to do something with them, the first time you say no might be the last time you get asked.) I was trying to match the drollness of my \"Wow\" when my stepson stepped in, half-smile on his lips and full twinkle in his eyes, and rescued me by saying, \"Come on, we need to get ready.\" Was Louis cocky? Certainly, but only on the surface. His $400 cleats, carbon fiber shin guards, and \"I'm the king of the business world\" introduction was an unconscious effort to protect his ego. His introduction said, \"Hey, I might not turn out to be good at soccer, but out there in the real world, where it really matters, I am the Man.\" As we took the field before a game, a guy on the other team strutted over, probably picking me out because I was clearly the oldest player on the field. (There's a delightful sentence to write.)",
  teacherExperiences: [{
    id: 1,
    title: 'I have taught in school/College/University/ or learning centers',
    value: 'exp1'
  }, {
    id: 2,
    title: 'I have home-schooling, volunteer, tutor, or other informal teaching experience.',
    value: 'exp2'
  }, {
    id: 3,
    title: 'None of the above',
    value: 'exp3'
  }],
  selectTeacherExp: ['exp1', 'exp2'],
  experienceLists: [{
    id: 1,
    name: "Moan Media",
    jobTitle: "fe",
    timePeriod: "2018"
  }, {
    id: 2,
    name: "Mona Media",
    jobTitle: "be",
    timePeriod: "2019"
  }],
  tesolCertificate: '1',
  teylCertificate: '2',
  otherCertificate: '2'
};

var reducer = function reducer(prevState, _ref) {
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case "STATE_CHANGE":
      {
        return _objectSpread(_objectSpread({}, prevState), {}, _defineProperty({}, payload.key, payload.value));
      }

    case "ADD_EXPROW":
      {
        return _objectSpread(_objectSpread({}, prevState), {}, {
          experienceLists: [].concat(_toConsumableArray(prevState.experienceLists), [payload])
        });
      }

    case "DELETE_EXPROW":
      {
        return _objectSpread(_objectSpread({}, prevState), {}, {
          experienceLists: _toConsumableArray(prevState.experienceLists).filter(function (exp) {
            return exp.id !== payload.id;
          })
        });
      }

    case "EXP_CHANGE":
      {
        return _objectSpread(_objectSpread({}, prevState), {}, {
          experienceLists: _toConsumableArray(prevState.experienceLists).map(function (exp) {
            return exp.id === payload.id ? _objectSpread(_objectSpread({}, exp), {}, {
              name: payload.name,
              jobTitle: payload.jobValue,
              timePeriod: payload.timePeriod
            }) : exp;
          })
        });
      }

    default:
      return prevState;
      break;
  }
};

var jobs = [{
  id: 1,
  title: 'Front End Developer',
  value: 'fe'
}, {
  id: 2,
  title: 'Backend Enginer',
  value: 'be'
}];
var timeLists = [{
  id: 1,
  title: '2018',
  value: '2018'
}, {
  id: 2,
  title: '2019',
  value: '2019'
}];

var RenderExpRow = function RenderExpRow(_ref2) {
  var exp = _ref2.exp,
      handleStateChange = _ref2.handleStateChange,
      deleteRow = _ref2.deleteRow;

  var _React$useState = React.useState(exp.name),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      name = _React$useState2[0],
      setName = _React$useState2[1];

  var _React$useState3 = React.useState(exp.jobTitle),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      jobValue = _React$useState4[0],
      setJobValue = _React$useState4[1];

  var _React$useState5 = React.useState(exp.timePeriod),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      timePeriod = _React$useState6[0],
      setTimePeriod = _React$useState6[1];

  React.useEffect(function () {
    handleStateChange({
      id: exp.id,
      name: name,
      jobValue: jobValue,
      timePeriod: timePeriod
    });
  }, [name, jobValue, timePeriod]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "exp-row form-row  align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-md-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-float"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    placeholder: "Organization Name",
    onChange: function onChange(e) {
      return setName(e.target.value);
    },
    defaultValue: name
  }), /*#__PURE__*/React.createElement("label", null, "Organization Name"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-md-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-float"
  }, /*#__PURE__*/React.createElement("select", {
    name: "experienceLists",
    value: jobValue,
    onChange: function onChange(e) {
      return setJobValue(e.target.value);
    },
    className: "form-control"
  }, [].concat(jobs).map(function (job) {
    return /*#__PURE__*/React.createElement("option", {
      value: job.value,
      key: "".concat(job.id)
    }, job.title);
  })), /*#__PURE__*/React.createElement("label", null, "Job Title"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-md-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-float"
  }, /*#__PURE__*/React.createElement("select", {
    name: "experienceLists",
    value: timePeriod,
    onChange: function onChange(e) {
      return setTimePeriod(e.target.value);
    },
    className: "form-control"
  }, [].concat(timeLists).map(function (time) {
    return /*#__PURE__*/React.createElement("option", {
      value: time.value,
      key: "".concat(time.id)
    }, time.title);
  })), /*#__PURE__*/React.createElement("label", null, "Time period"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-md-3"
  }, /*#__PURE__*/React.createElement("button", {
    className: "delete-row tx-24 btn"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-minus-circle tx-danger",
    onClick: function onClick() {
      return deleteRow(exp.id);
    }
  })))));
};

var TeacherForm = function TeacherForm() {
  var _React$useReducer = React.useReducer(reducer, initialState),
      _React$useReducer2 = _slicedToArray(_React$useReducer, 2),
      state = _React$useReducer2[0],
      dispatch = _React$useReducer2[1];

  var avatarRef = React.createRef();
  var inputFileRef = React.createRef();

  var handleChange = function handleChange(e) {
    var target = e.target;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    var key = target.getAttribute("name");
    dispatch({
      type: "STATE_CHANGE",
      payload: {
        key: key,
        value: value
      }
    });
  };

  var handleExpRowChange = function handleExpRowChange(rowState) {
    var id = rowState.id,
        name = rowState.name,
        jobValue = rowState.jobValue,
        timePeriod = rowState.timePeriod;
    dispatch({
      type: "EXP_CHANGE",
      payload: {
        id: id,
        name: name,
        jobValue: jobValue,
        timePeriod: timePeriod
      }
    });
  };

  var handleSelect2 = function handleSelect2(e) {
    var target = e.target;
    var value = [];

    _toConsumableArray(target.children).map(function (option) {
      if (option.selected) value.push(option.value);
    });

    var key = target.getAttribute("name");
    dispatch({
      type: "STATE_CHANGE",
      payload: {
        key: key,
        value: value
      }
    });
  };

  var _handleSubmitForm = function _handleSubmitForm(e) {
    e.preventDefault(); //Submit form

    form === undefined && (form = document.getElementById('form-teacher-profile'));
    var err = validate(form, validateRules);
    !err && alert('submited');
  };

  var _addExpRow = function _addExpRow() {
    var rowData = {
      id: randomId(),
      name: "",
      jobTitle: "fe",
      timePeriod: "2018"
    };
    dispatch({
      type: "ADD_EXPROW",
      payload: rowData
    });
  };

  var _deleteExpRow = function _deleteExpRow(id) {
    dispatch({
      type: "DELETE_EXPROW",
      payload: {
        id: id
      }
    });
  };

  var handleUploadImage = function handleUploadImage() {
    var input = inputFileRef.current;

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        avatarRef.current.setAttribute('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  React.useEffect(function () {
    $(".js-select2").on('change', handleSelect2.bind(_this));
    return function () {
      return $(".js-select2").off('change', handleSelect2.bind(_this));
    };
  }, []);
  return /*#__PURE__*/React.createElement("form", {
    id: "form-teacher-profile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "teacher__detail__wrap card-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "teacher__detail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "teacher-header pos-relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "teacher-avatar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "upload-container"
  }, /*#__PURE__*/React.createElement("label", {
    className: "upload-avatar"
  }, /*#__PURE__*/React.createElement("input", {
    ref: inputFileRef,
    type: "file",
    accept: "image/*",
    className: "upload-box hidden d-none upload-file",
    onChange: handleUploadImage
  }), /*#__PURE__*/React.createElement("img", {
    ref: avatarRef,
    src: "https://theamericanschool.edu.vn/wp-content/uploads/2020/01/Ms-Hong-Nguyen-Vietnamese.jpg",
    alt: "avatar",
    className: "image-holder"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "teacher-info flex-grow-1"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "mg-b-15"
  }, "Basic Information"), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-12 col-sm-6 col-lg-4 col-xl-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-float"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    placeholder: "First Name *",
    name: "firstName",
    onChange: handleChange,
    defaultValue: state.firstName,
    required: true
  }), /*#__PURE__*/React.createElement("label", null, "First Name *")), /*#__PURE__*/React.createElement("div", {
    "class": "error-messages"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-12 col-sm-6 col-lg-4 col-xl-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-float"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    placeholder: "Last Name *",
    name: "lastName",
    onChange: handleChange,
    defaultValue: state.lastName,
    required: true
  }), /*#__PURE__*/React.createElement("label", null, "Last Name *"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-12 col-sm-6 col-lg-4 col-xl-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-float"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    placeholder: "Skype ID *",
    name: "skypeId",
    onChange: handleChange,
    defaultValue: state.skypeId,
    required: true
  }), /*#__PURE__*/React.createElement("label", null, "Skype ID *"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-12 col-sm-6 col-lg-4 col-xl-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-float"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "form-control",
    placeholder: "Phone number *",
    name: "phoneNumber",
    onChange: handleChange,
    defaultValue: state.phoneNumber,
    required: true
  }), /*#__PURE__*/React.createElement("label", null, "Phone Number *"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-12 col-sm-6 col-lg-4 col-xl-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-float"
  }, /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    value: state.location,
    name: "location",
    onChange: handleChange
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Location"), /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "United States")), /*#__PURE__*/React.createElement("label", null, "Location"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-12 col-sm-6 col-lg-4 col-xl-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-float"
  }, /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    value: state.state,
    name: "state",
    onChange: handleChange
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "State/Province/Region *"), /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "New York")), /*#__PURE__*/React.createElement("label", null, "State *"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-12 col-sm-6 col-lg-4 col-xl-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-float"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    placeholder: "Phone number *",
    name: "postalCode",
    onChange: handleChange,
    defaultValue: state.postalCode,
    required: true
  }), /*#__PURE__*/React.createElement("label", null, "Postal Code"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-12 col-sm-6 col-lg-4 col-xl-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-float"
  }, /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    name: "timeZone",
    value: state.timeZone,
    onChange: handleChange
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Your current time zone *"), /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "GTM +7")), /*#__PURE__*/React.createElement("label", null, "Time zone *")))), /*#__PURE__*/React.createElement("h5", {
    className: "mg-b-15"
  }, "Education Attainment"), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-12 col-sm-6 col-lg-4 col-xl-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-float"
  }, /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    name: "education",
    value: state.education,
    onChange: handleChange
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Highest Level of Education *"), /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "High School Graduate"), /*#__PURE__*/React.createElement("option", {
    value: "2"
  }, "Vocational Course"), /*#__PURE__*/React.createElement("option", {
    value: "3"
  }, "College Student"), /*#__PURE__*/React.createElement("option", {
    value: "4"
  }, "Bachelor's Degree"), /*#__PURE__*/React.createElement("option", {
    value: "5"
  }, "Master's Degree"), /*#__PURE__*/React.createElement("option", {
    value: "6"
  }, "PHD"), /*#__PURE__*/React.createElement("option", {
    value: "7"
  }, "Associate Degree")), /*#__PURE__*/React.createElement("label", null, "Education"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-12 col-sm-6 col-lg-4 col-xl-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-float"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    placeholder: "School name",
    name: "schoolName",
    onChange: handleChange,
    defaultValue: state.schoolName
  }), /*#__PURE__*/React.createElement("label", null, "School name"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-12 col-sm-6 col-lg-4 col-xl-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-float"
  }, /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    name: "major",
    value: state.major,
    onChange: handleChange
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Major/Specialization *"), /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "Business Studies/Administration/Management")), /*#__PURE__*/React.createElement("label", null, "Major/Specialization *"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-12 col-sm-6 col-lg-4 col-xl-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-float"
  }, /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    name: "englishProficiency",
    value: state.englishProficiency,
    onChange: handleChange
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Please select your English proficiency *"), /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "Native Speaker"), /*#__PURE__*/React.createElement("option", {
    value: "2"
  }, "Proficient - C2"), /*#__PURE__*/React.createElement("option", {
    value: "3"
  }, "Advanced - C1"), /*#__PURE__*/React.createElement("option", {
    value: "4"
  }, "Upper Intermediate - B2"), /*#__PURE__*/React.createElement("option", {
    value: "5"
  }, "Below Upper Intermediate - B1")), /*#__PURE__*/React.createElement("label", null, "English proficiency")))))), /*#__PURE__*/React.createElement("div", {
    className: "teacher-body mg-t-0-f"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tab-navigation-content bd-t pd-t-15"
  }, /*#__PURE__*/React.createElement("div", {
    className: "swiper-container",
    id: "js-teacher__info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "teacher__info-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "content-block mg-b-30"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "main-title"
  }, "Introduce"), /*#__PURE__*/React.createElement("div", {
    className: "introduce-content"
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "form-control",
    rows: 7,
    defaultValue: "While I have no soccer skills, I once played in a fairly competitive adult soccer league with my then-teenage stepson. I was terrible, but I played because he asked me to. (When your kids get older and ask you to do something with them, the first time you say no might be the last time you get asked.) I was trying to match the drollness of my \"Wow\" when my stepson stepped in, half-smile on his lips and full twinkle in his eyes, and rescued me by saying, \"Come on, we need to get ready.\" Was Louis cocky? Certainly, but only on the surface. His $400 cleats, carbon fiber shin guards, and \"I'm the king of the business world\" introduction was an unconscious effort to protect his ego. His introduction said, \"Hey, I might not turn out to be good at soccer, but out there in the real world, where it really matters, I am the Man.\" As we took the field before a game, a guy on the other team strutted over, probably picking me out because I was clearly the oldest player on the field. (There's a delightful sentence to write.)"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "content-block"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "main-title"
  }, "CURRICULUM VITAE"), /*#__PURE__*/React.createElement("div", {
    className: "introduce-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "teacher__content-block"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "sub-title"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-user-clock"
  }), " Experience"), /*#__PURE__*/React.createElement("div", {
    className: "form-groupselect-checkbox mg-b-30 mg-t-15"
  }, /*#__PURE__*/React.createElement("h6", null, "Teacher experience"), /*#__PURE__*/React.createElement("div", {
    className: "input-float"
  }, /*#__PURE__*/React.createElement("select", {
    value: state.selectTeacherExp,
    readOnly: true,
    name: "selectTeacherExp",
    className: "js-select2 form-control",
    multiple: true
  }, !!state.teacherExperiences && state.teacherExperiences.length > 0 ? state.teacherExperiences.map(function (exp) {
    return /*#__PURE__*/React.createElement("option", {
      key: "".concat(exp.id),
      value: exp.value
    }, exp.title);
  }) : /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Loading option... "))))), /*#__PURE__*/React.createElement("div", {
    className: "teacher__content-block mg-b-30"
  }, /*#__PURE__*/React.createElement("h6", null, " Fill in your teaching experience:"), /*#__PURE__*/React.createElement("div", {
    className: "experience__list mg-t-15",
    id: "js-exp-list"
  }, !!state.experienceLists && state.experienceLists.length > 0 && _toConsumableArray(state.experienceLists).map(function (exp) {
    return /*#__PURE__*/React.createElement(RenderExpRow, {
      key: "".concat(exp.id),
      handleStateChange: handleExpRowChange,
      exp: exp,
      deleteRow: _deleteExpRow
    });
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-warning",
    id: "js-add-row",
    onClick: _addExpRow
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-plus"
  }), " Add row")), /*#__PURE__*/React.createElement("div", {
    className: "teacher__content-block"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "sub-title"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-certificate"
  }), " Certificate"), /*#__PURE__*/React.createElement("div", {
    className: "row teacher__certificate pd-y-15"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-md-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-float"
  }, /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    name: "tesolCertificate",
    value: state.tesolCertificate,
    onChange: handleChange
  }, /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "TESOL (Other)"), /*#__PURE__*/React.createElement("option", {
    value: "2"
  }, "TESOL (Full)"), /*#__PURE__*/React.createElement("option", {
    value: "3"
  }, "TESOL (Foundation)")), /*#__PURE__*/React.createElement("label", null, "TESOL Certificate"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-md-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-float"
  }, /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    name: "teylCertificate",
    value: state.teylCertificate,
    onChange: handleChange
  }, /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "TEYL (Other)"), /*#__PURE__*/React.createElement("option", {
    value: "2"
  }, "TEYL (51 Talk)")), /*#__PURE__*/React.createElement("label", null, "TEYL Certificate"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-md-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-float"
  }, /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    name: "otherCertificate",
    value: state.otherCertificate,
    onChange: handleChange
  }, /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "CELTA"), /*#__PURE__*/React.createElement("option", {
    value: "2"
  }, "LET"), /*#__PURE__*/React.createElement("option", {
    value: "3"
  }, "IELTS"), /*#__PURE__*/React.createElement("option", {
    value: "4"
  }, "TOEFL"), /*#__PURE__*/React.createElement("option", {
    value: "5"
  }, "TOEIC"), /*#__PURE__*/React.createElement("option", {
    value: "6"
  }, "TKT (4 Score)"), /*#__PURE__*/React.createElement("option", {
    value: "7"
  }, "CELTYL")), /*#__PURE__*/React.createElement("label", null, "Other Certificate")))))))))))), /*#__PURE__*/React.createElement("div", {
    className: "tx-center"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-success",
    onClick: _handleSubmitForm
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-save mg-r-5"
  }), " Update information"))));
};

var domContainer = document.getElementById('react-teacher-form');
ReactDOM.render( /*#__PURE__*/React.createElement(TeacherForm, null), domContainer);