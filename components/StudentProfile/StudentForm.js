"use strict";

var _this = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  studentCode: "107",
  fullName: "Nguyen Van Thai",
  phone: "0909080809",
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
  newPassword: ""
};

var reducer = function reducer(prevState, _ref) {
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case "STATE_CHANGE":
      {
        return _objectSpread(_objectSpread({}, prevState), {}, _defineProperty({}, payload.key, payload.value));
      }

    default:
      return prevState;
      break;
  }
};

var StudentForm = function StudentForm() {
  var _React$createElement, _React$createElement2;

  var _React$useReducer = React.useReducer(reducer, initialState),
      _React$useReducer2 = _slicedToArray(_React$useReducer, 2),
      state = _React$useReducer2[0],
      dispatch = _React$useReducer2[1];

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

  var datePicker = function datePicker(e) {
    var target = e.target;
    var value = target.value;
    var key = target.getAttribute("name");
    dispatch({
      type: "STATE_CHANGE",
      payload: {
        key: key,
        value: value
      }
    });
  };

  var onSubmit = function onSubmit(e) {
    e.preventDefault();
    console.log(state);
    var invalidArray = [];

    for (var _i2 = 0, _Object$entries = Object.entries(state); _i2 < _Object$entries.length; _i2++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      if (!value.length) invalidArray.push(key);
    }

    if (invalidArray) alert("Vui l\xF2ng \u0111i\u1EC1n \u0111\u1EA7y \u0111\u1EE7 th\xF4ng tin: [".concat(invalidArray, "]"));
  };

  React.useEffect(function () {
    $(".js-select2").on('change', handleSelect2.bind(_this));
    $(".datetimepicker").on('change', datePicker.bind(_this));
    return function () {
      $(".js-select2").off('change', handleSelect2.bind(_this));
      $(".datetimepicker").off('change', datePicker.bind(_this));
    };
  }, []);
  return /*#__PURE__*/React.createElement("form", {
    id: "form-account-profile",
    onSubmit: onSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-account pd-y-15"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row mg-b-15"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-3 col-label-fixed"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mg-b-0 tx-medium"
  }, "Student code:")), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-9"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    placeholder: "",
    name: "studentCode",
    defaultValue: state.studentCode,
    required: true,
    onChange: handleChange
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-row align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-3 col-label-fixed"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mg-b-0 tx-medium"
  }, "Phone:")), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-9"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    placeholder: "0123456789",
    name: "phone",
    defaultValue: state.phone,
    required: true,
    onChange: handleChange
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-row align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-3 col-label-fixed"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mg-b-0 tx-medium"
  }, "Date of birth:")), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-9"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control datetimepicker",
    name: "dateOfBirth",
    defaultValue: state.dateOfBirth,
    placeholder: "dd/mm/YYYY"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-row align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-3 col-label-fixed"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mg-b-0 tx-medium"
  }, "Language:")), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-9"
  }, /*#__PURE__*/React.createElement("select", {
    name: "language",
    id: "",
    value: state.language,
    className: "form-control",
    onChange: handleChange
  }, /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "Vietnamese"), /*#__PURE__*/React.createElement("option", {
    value: "2"
  }, "English"))))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-3 col-label-fixed"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mg-b-0 tx-medium"
  }, "Full name:")), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-9"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    name: "fullName",
    placeholder: "0",
    defaultValue: state.fullName,
    required: true,
    onChange: handleChange
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-row align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-3 col-label-fixed"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mg-b-0 tx-medium"
  }, "Email:")), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-9"
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    className: "form-control",
    name: "email",
    placeholder: "Ex: monamedia@mona.net",
    defaultValue: state.email,
    required: true,
    onChange: handleChange
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-row align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-3 col-label-fixed"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mg-b-0 tx-medium"
  }, "Sex:")), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-9"
  }, /*#__PURE__*/React.createElement("select", (_React$createElement = {
    name: "",
    className: "form-control",
    value: state.sex
  }, _defineProperty(_React$createElement, "name", "sex"), _defineProperty(_React$createElement, "onChange", handleChange), _React$createElement), /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "Male"), /*#__PURE__*/React.createElement("option", {
    value: "2"
  }, "Female")))), /*#__PURE__*/React.createElement("div", {
    className: "form-row align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-3 col-label-fixed"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mg-b-0 tx-medium"
  }, "Timezone:")), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-9"
  }, /*#__PURE__*/React.createElement("select", {
    name: "timezone",
    className: "form-control",
    onChange: handleChange
  }, /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "GTM +7"), /*#__PURE__*/React.createElement("option", {
    value: "2"
  }, "GTM -7"))))), /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row  align-items-center "
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-3 col-label-fixed"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mg-b-0 tx-medium "
  }, "Address:")), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-9"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    name: "address",
    placeholder: "Your address",
    defaultValue: state.address,
    onChange: handleChange
  })))), /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row  align-items-center "
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-3 col-label-fixed"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mg-b-0 tx-medium "
  }, "Target:")), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-9 select-checkbox"
  }, /*#__PURE__*/React.createElement("select", {
    id: "target-select",
    className: "js-select2 form-control",
    multiple: true,
    readOnly: true,
    name: "selectTarget",
    value: state.selectTarget,
    onClick: handleSelect2
  }, !!state.target && state.target.length > 0 ? state.target.map(function (item, index) {
    return /*#__PURE__*/React.createElement("option", {
      key: index,
      value: item
    }, item);
  }) : /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Loading option... "))))), /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row  align-items-center "
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-3 col-label-fixed"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mg-b-0 tx-medium "
  }, "Hobbits: ")), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-9"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "hobbits",
    className: "form-control",
    placeholder: "Your hobbit",
    defaultValue: state.hobbits,
    onChange: handleChange
  })))), /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row  align-items-center "
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-3 col-label-fixed"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mg-b-0 tx-medium "
  }, "Notes:")), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-9"
  }, /*#__PURE__*/React.createElement("textarea", (_React$createElement2 = {
    name: "",
    id: "",
    rows: "3",
    className: "form-control"
  }, _defineProperty(_React$createElement2, "name", "notes"), _defineProperty(_React$createElement2, "placeholder", "Notes for teachers"), _defineProperty(_React$createElement2, "defaultValue", state.notes), _defineProperty(_React$createElement2, "onChange", handleChange), _React$createElement2))))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-3 col-label-fixed"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mg-b-0 tx-medium"
  }, "Old password: ")), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-9"
  }, /*#__PURE__*/React.createElement("input", {
    type: "password",
    className: "form-control",
    placeholder: "",
    name: "oldPassword",
    defaultValue: state.oldPassword,
    required: true,
    onChange: handleChange
  })))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-3 col-label-fixed"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mg-b-0 tx-medium"
  }, "New password:")), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-9"
  }, /*#__PURE__*/React.createElement("input", {
    type: "password",
    className: "form-control",
    placeholder: "",
    name: "newPassword",
    defaultValue: state.newPassword,
    onChange: handleChange
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "tx-center"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary rounded-pill"
  }, "Save information"))));
};

var domContainer = document.getElementById('react-student-form');
ReactDOM.render( /*#__PURE__*/React.createElement(StudentForm, null), domContainer);