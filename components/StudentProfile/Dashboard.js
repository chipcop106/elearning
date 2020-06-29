"use strict";

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
  upcomingLesson: {
    teacher: "Hoàng Thị Uyên Phương",
    images: "https://images.unsplash.com/photo-1593087989983-e887d642a19c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    courseName: "IELST - Professional",
    date: "03/07/2020",
    startTime: "10:30",
    endTime: "11:00",
    note: "Prepare speaking topic",
    document: ["ReadingSpeaking.doc", "Listening.doc"],
    skype: "http://skype.com/abc",
    require: ["This is require 1", "This is require 2", "This is require 3"],
    selectedRequire: [],
    noteForTeacher: "Note for teacher"
  },
  lessonHistory: [{
    courseId: "1",
    teacher: "Hoàng Thị Uyên Phương",
    images: "https://image.engoo.com/teacher/15867/p2872.jpg",
    courseName: "IELST - Professional",
    date: "24/06/2020",
    startTime: "10:30",
    endTime: "11:00",
    note: "Student have a good speaking skill",
    ratingCourse: "90"
  }, {
    courseId: "2",
    teacher: "Hoàng Văn Thái",
    images: "https://images.unsplash.com/photo-1593087989983-e887d642a19c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    courseName: "IELST - Beginner",
    date: "15/06/2020",
    startTime: "10:00",
    endTime: "14:00",
    note: "Student have a good speaking skill",
    ratingCourse: "75"
  }],
  ratingCourse: {
    course: null,
    ratingStars: 0,
    note: ""
  }
};

var reducer = function reducer(prevState, _ref) {
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case "RATING_COURSE":
      {
        return _objectSpread(_objectSpread({}, prevState), {}, {
          ratingCourse: _objectSpread(_objectSpread({}, prevState.ratingCourse), {}, _defineProperty({}, payload.key, payload.value))
        });
      }

    case "REQUIRE_COURSE":
      {
        return _objectSpread(_objectSpread({}, prevState), {}, {
          upcomingLesson: _objectSpread(_objectSpread({}, prevState.upcomingLesson), {}, _defineProperty({}, payload.key, payload.value))
        });
      }

    default:
      return prevState;
      break;
  }
};

var convertDay = function convertDay(date) {
  var arrayDate = date.split('/');
  date = new Date("".concat(arrayDate[1], "/").concat(arrayDate[0], "/").concat(arrayDate[2])).getDay();

  switch (date) {
    case 0:
      return "Sunday";
      break;

    case 1:
      return "Monday";
      break;

    case 2:
      return "Tuesday";
      break;

    case 3:
      return "Wednesday";
      break;

    case 4:
      return "Thursday";
      break;

    case 5:
      return "Friday";
      break;

    default:
      return "Saturday";
      break;
  }
};

var convertTime = function convertTime(time) {
  time = time.split(':')[0];
  return time <= 12 ? "AM" : "PM";
};

var LessonHistory = function LessonHistory(_ref2) {
  var ratingCourse = _ref2.ratingCourse,
      state = _ref2.state;

  var onRatingCourse = function onRatingCourse(course) {
    ratingCourse(course);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "course-horizental mg-t-20"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "list-wrap"
  }, state.lessonHistory.map(function (item, index) {
    return /*#__PURE__*/React.createElement("li", {
      key: index,
      className: "cr-item lesson-info"
    }, /*#__PURE__*/React.createElement("div", {
      className: "media"
    }, /*#__PURE__*/React.createElement("div", {
      className: "teacher-information"
    }, /*#__PURE__*/React.createElement("a", {
      className: "teacher-avatar",
      href: "#"
    }, /*#__PURE__*/React.createElement("img", {
      src: item.images,
      className: "teacher-image",
      alt: ""
    }), /*#__PURE__*/React.createElement("p", {
      className: "course-teacher tx-14 tx-gray-800 tx-normal mg-b-0 tx-center mg-t-5 d-block"
    }, item.teacher))), /*#__PURE__*/React.createElement("div", {
      className: "media-body  mg-l-20 pos-relative"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "mg-b-10"
    }, /*#__PURE__*/React.createElement("span", {
      className: "badge badge-success"
    }, "Finished"), ' ', /*#__PURE__*/React.createElement("a", {
      href: "lesson-detail.html",
      className: "course-name tx-bold"
    }, item.courseName)), /*#__PURE__*/React.createElement("div", {
      className: "course-information tx-14"
    }, /*#__PURE__*/React.createElement("span", {
      className: "mg-r-15 tx-gray-600 tx-medium"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-calendar  tx-info mg-r-5"
    }), convertDay(item.date) + ' ' + item.date), /*#__PURE__*/React.createElement("span", {
      className: "mg-r-15 tx-gray-600 tx-medium"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-clock  tx-info mg-r-5"
    }), "Start: ".concat(item.startTime, " ").concat(convertTime(item.startTime))), /*#__PURE__*/React.createElement("span", {
      className: "mg-r-15 tx-gray-600 tx-medium"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-clock  tx-info mg-r-5"
    }), "End: ".concat(item.endTime, " ").concat(convertTime(item.endTime)))), /*#__PURE__*/React.createElement("div", {
      className: "course-note mg-t-15"
    }, /*#__PURE__*/React.createElement("h6", {
      className: "mg-b-3"
    }, "Teacher note:"), /*#__PURE__*/React.createElement("p", {
      className: "tx-14 mg-b-0"
    }, "Student have a good speaking skill.")), /*#__PURE__*/React.createElement("div", {
      className: "course-rate mg-t-15"
    }, /*#__PURE__*/React.createElement("h6", {
      className: "mg-b-3"
    }, "Rating lesson:"), /*#__PURE__*/React.createElement("div", {
      className: "rating-stars"
    }, /*#__PURE__*/React.createElement("span", {
      className: "empty-stars"
    }, /*#__PURE__*/React.createElement("i", {
      className: "star fa fa-star"
    }), /*#__PURE__*/React.createElement("i", {
      className: "star fa fa-star"
    }), /*#__PURE__*/React.createElement("i", {
      className: "star fa fa-star"
    }), /*#__PURE__*/React.createElement("i", {
      className: "star fa fa-star"
    }), /*#__PURE__*/React.createElement("i", {
      className: "star fa fa-star"
    })), /*#__PURE__*/React.createElement("span", {
      className: "filled-stars",
      style: {
        width: "".concat(item.ratingCourse, "%")
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "star fa fa-star"
    }), /*#__PURE__*/React.createElement("i", {
      className: "star fa fa-star"
    }), /*#__PURE__*/React.createElement("i", {
      className: "star fa fa-star"
    }), /*#__PURE__*/React.createElement("i", {
      className: "star fa fa-star"
    }), /*#__PURE__*/React.createElement("i", {
      className: "star fa fa-star"
    }))), /*#__PURE__*/React.createElement("a", {
      href: "#",
      className: "rate-now",
      "data-toggle": "modal",
      onClick: function onClick() {
        return onRatingCourse(item);
      },
      "data-target": "#js-md-rate"
    }, "Rating now!")), /*#__PURE__*/React.createElement("div", {
      className: "course-actions"
    }, /*#__PURE__*/React.createElement("div", {
      className: "action-left"
    }, /*#__PURE__*/React.createElement("a", {
      href: "lesson-detail.html",
      className: "btn btn-sm btn-warning mg-r-10",
      target: "_blank",
      rel: "noopener"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-vote-yea mg-r-5"
    }), " ", /*#__PURE__*/React.createElement("span", null, "Detail lesson")))))));
  })));
};

var RatingLessonModal = function RatingLessonModal(_ref3) {
  var handleChange = _ref3.handleChange,
      course = _ref3.course,
      state = _ref3.state;

  var onHandleChange = function onHandleChange(e) {
    handleChange(e);
  };

  var onSubmitRating = function onSubmitRating() {
    console.log(state.ratingCourse);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "modal effect-scale",
    tabIndex: "-1",
    role: "dialog",
    id: "js-md-rate"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-dialog modal-dialog-centered",
    role: "document"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/React.createElement("form", {
    action: "",
    className: ""
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "close",
    "data-dismiss": "modal",
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\xD7")), /*#__PURE__*/React.createElement("h4", {
    className: "tx-danger"
  }, "\u0110\xE1nh gi\xE1 bu\u1ED5i h\u1ECDc"), /*#__PURE__*/React.createElement("div", {
    className: "image-fb tx-center pd-y-30"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/img/feedback-image.svg",
    alt: "",
    className: "wd-150"
  })), /*#__PURE__*/React.createElement("p", {
    className: "mg-b-0 tx-center title"
  }, "Bu\u1ED5i h\u1ECDc c\u1EE7a b\u1EA1n v\u1EDBi gi\xE1o vi\xEAn ", course.course && course.course.teacher, " nh\u01B0 th\u1EBF n\xE0o ?"), /*#__PURE__*/React.createElement("div", {
    className: "rating"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "rating",
    id: "rating-5"
  }), /*#__PURE__*/React.createElement("label", {
    name: "ratingStars",
    htmlFor: "rating-5",
    onClick: onHandleChange
  }), /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "rating",
    id: "rating-4"
  }), /*#__PURE__*/React.createElement("label", {
    name: "ratingStars",
    htmlFor: "rating-4",
    onClick: onHandleChange
  }), /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "rating",
    id: "rating-3"
  }), /*#__PURE__*/React.createElement("label", {
    name: "ratingStars",
    htmlFor: "rating-3",
    onClick: onHandleChange
  }), /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "rating",
    id: "rating-2"
  }), /*#__PURE__*/React.createElement("label", {
    name: "ratingStars",
    htmlFor: "rating-2",
    onClick: onHandleChange
  }), /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "rating",
    id: "rating-1"
  }), /*#__PURE__*/React.createElement("label", {
    name: "ratingStars",
    htmlFor: "rating-1",
    onClick: onHandleChange
  }), /*#__PURE__*/React.createElement("div", {
    className: "emoji-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "emoji"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "rating-0",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "256",
    cy: "256",
    r: "256",
    fill: "#ffd93b"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M512 256c0 141.44-114.64 256-256 256-80.48 0-152.32-37.12-199.28-95.28 43.92 35.52 99.84 56.72 160.72 56.72 141.36 0 256-114.56 256-256 0-60.88-21.2-116.8-56.72-160.72C474.8 103.68 512 175.52 512 256z",
    fill: "#f4c534"
  }), /*#__PURE__*/React.createElement("ellipse", {
    transform: "scale(-1) rotate(31.21 715.433 -595.455)",
    cx: "166.318",
    cy: "199.829",
    rx: "56.146",
    ry: "56.13",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("ellipse", {
    transform: "rotate(-148.804 180.87 175.82)",
    cx: "180.871",
    cy: "175.822",
    rx: "28.048",
    ry: "28.08",
    fill: "#3e4347"
  }), /*#__PURE__*/React.createElement("ellipse", {
    transform: "rotate(-113.778 194.434 165.995)",
    cx: "194.433",
    cy: "165.993",
    rx: "8.016",
    ry: "5.296",
    fill: "#5a5f63"
  }), /*#__PURE__*/React.createElement("ellipse", {
    transform: "scale(-1) rotate(31.21 715.397 -1237.664)",
    cx: "345.695",
    cy: "199.819",
    rx: "56.146",
    ry: "56.13",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("ellipse", {
    transform: "rotate(-148.804 360.25 175.837)",
    cx: "360.252",
    cy: "175.84",
    rx: "28.048",
    ry: "28.08",
    fill: "#3e4347"
  }), /*#__PURE__*/React.createElement("ellipse", {
    transform: "scale(-1) rotate(66.227 254.508 -573.138)",
    cx: "373.794",
    cy: "165.987",
    rx: "8.016",
    ry: "5.296",
    fill: "#5a5f63"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M370.56 344.4c0 7.696-6.224 13.92-13.92 13.92H155.36c-7.616 0-13.92-6.224-13.92-13.92s6.304-13.92 13.92-13.92h201.296c7.696.016 13.904 6.224 13.904 13.92z",
    fill: "#3e4347"
  })), /*#__PURE__*/React.createElement("svg", {
    className: "rating-1",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "256",
    cy: "256",
    r: "256",
    fill: "#ffd93b"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z",
    fill: "#f4c534"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M328.4 428a92.8 92.8 0 0 0-145-.1 6.8 6.8 0 0 1-12-5.8 86.6 86.6 0 0 1 84.5-69 86.6 86.6 0 0 1 84.7 69.8c1.3 6.9-7.7 10.6-12.2 5.1z",
    fill: "#3e4347"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M269.2 222.3c5.3 62.8 52 113.9 104.8 113.9 52.3 0 90.8-51.1 85.6-113.9-2-25-10.8-47.9-23.7-66.7-4.1-6.1-12.2-8-18.5-4.2a111.8 111.8 0 0 1-60.1 16.2c-22.8 0-42.1-5.6-57.8-14.8-6.8-4-15.4-1.5-18.9 5.4-9 18.2-13.2 40.3-11.4 64.1z",
    fill: "#f4c534"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M357 189.5c25.8 0 47-7.1 63.7-18.7 10 14.6 17 32.1 18.7 51.6 4 49.6-26.1 89.7-67.5 89.7-41.6 0-78.4-40.1-82.5-89.7A95 95 0 0 1 298 174c16 9.7 35.6 15.5 59 15.5z",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M396.2 246.1a38.5 38.5 0 0 1-38.7 38.6 38.5 38.5 0 0 1-38.6-38.6 38.6 38.6 0 1 1 77.3 0z",
    fill: "#3e4347"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M380.4 241.1c-3.2 3.2-9.9 1.7-14.9-3.2-4.8-4.8-6.2-11.5-3-14.7 3.3-3.4 10-2 14.9 2.9 4.9 5 6.4 11.7 3 15z",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M242.8 222.3c-5.3 62.8-52 113.9-104.8 113.9-52.3 0-90.8-51.1-85.6-113.9 2-25 10.8-47.9 23.7-66.7 4.1-6.1 12.2-8 18.5-4.2 16.2 10.1 36.2 16.2 60.1 16.2 22.8 0 42.1-5.6 57.8-14.8 6.8-4 15.4-1.5 18.9 5.4 9 18.2 13.2 40.3 11.4 64.1z",
    fill: "#f4c534"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M155 189.5c-25.8 0-47-7.1-63.7-18.7-10 14.6-17 32.1-18.7 51.6-4 49.6 26.1 89.7 67.5 89.7 41.6 0 78.4-40.1 82.5-89.7A95 95 0 0 0 214 174c-16 9.7-35.6 15.5-59 15.5z",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M115.8 246.1a38.5 38.5 0 0 0 38.7 38.6 38.5 38.5 0 0 0 38.6-38.6 38.6 38.6 0 1 0-77.3 0z",
    fill: "#3e4347"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M131.6 241.1c3.2 3.2 9.9 1.7 14.9-3.2 4.8-4.8 6.2-11.5 3-14.7-3.3-3.4-10-2-14.9 2.9-4.9 5-6.4 11.7-3 15z",
    fill: "#fff"
  })), /*#__PURE__*/React.createElement("svg", {
    className: "rating-2",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "256",
    cy: "256",
    r: "256",
    fill: "#ffd93b"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z",
    fill: "#f4c534"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M336.6 403.2c-6.5 8-16 10-25.5 5.2a117.6 117.6 0 0 0-110.2 0c-9.4 4.9-19 3.3-25.6-4.6-6.5-7.7-4.7-21.1 8.4-28 45.1-24 99.5-24 144.6 0 13 7 14.8 19.7 8.3 27.4z",
    fill: "#3e4347"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M276.6 244.3a79.3 79.3 0 1 1 158.8 0 79.5 79.5 0 1 1-158.8 0z",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "340",
    cy: "260.4",
    r: "36.2",
    fill: "#3e4347"
  }), /*#__PURE__*/React.createElement("g", {
    fill: "#fff"
  }, /*#__PURE__*/React.createElement("ellipse", {
    transform: "rotate(-135 326.4 246.6)",
    cx: "326.4",
    cy: "246.6",
    rx: "6.5",
    ry: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M231.9 244.3a79.3 79.3 0 1 0-158.8 0 79.5 79.5 0 1 0 158.8 0z"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "168.5",
    cy: "260.4",
    r: "36.2",
    fill: "#3e4347"
  }), /*#__PURE__*/React.createElement("ellipse", {
    transform: "rotate(-135 182.1 246.7)",
    cx: "182.1",
    cy: "246.7",
    rx: "10",
    ry: "6.5",
    fill: "#fff"
  })), /*#__PURE__*/React.createElement("svg", {
    className: "rating-3",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "256",
    cy: "256",
    r: "256",
    fill: "#ffd93b"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M407.7 352.8a163.9 163.9 0 0 1-303.5 0c-2.3-5.5 1.5-12 7.5-13.2a780.8 780.8 0 0 1 288.4 0c6 1.2 9.9 7.7 7.6 13.2z",
    fill: "#3e4347"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z",
    fill: "#f4c534"
  }), /*#__PURE__*/React.createElement("g", {
    fill: "#fff"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M115.3 339c18.2 29.6 75.1 32.8 143.1 32.8 67.1 0 124.2-3.2 143.2-31.6l-1.5-.6a780.6 780.6 0 0 0-284.8-.6z"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "356.4",
    cy: "205.3",
    rx: "81.1",
    ry: "81"
  })), /*#__PURE__*/React.createElement("ellipse", {
    cx: "356.4",
    cy: "205.3",
    rx: "44.2",
    ry: "44.2",
    fill: "#3e4347"
  }), /*#__PURE__*/React.createElement("g", {
    fill: "#fff"
  }, /*#__PURE__*/React.createElement("ellipse", {
    transform: "scale(-1) rotate(45 454 -906)",
    cx: "375.3",
    cy: "188.1",
    rx: "12",
    ry: "8.1"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "155.6",
    cy: "205.3",
    rx: "81.1",
    ry: "81"
  })), /*#__PURE__*/React.createElement("ellipse", {
    cx: "155.6",
    cy: "205.3",
    rx: "44.2",
    ry: "44.2",
    fill: "#3e4347"
  }), /*#__PURE__*/React.createElement("ellipse", {
    transform: "scale(-1) rotate(45 454 -421.3)",
    cx: "174.5",
    cy: "188",
    rx: "12",
    ry: "8.1",
    fill: "#fff"
  })), /*#__PURE__*/React.createElement("svg", {
    className: "rating-4",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "256",
    cy: "256",
    r: "256",
    fill: "#ffd93b"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z",
    fill: "#f4c534"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M232.3 201.3c0 49.2-74.3 94.2-74.3 94.2s-74.4-45-74.4-94.2a38 38 0 0 1 74.4-11.1 38 38 0 0 1 74.3 11.1z",
    fill: "#e24b4b"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M96.1 173.3a37.7 37.7 0 0 0-12.4 28c0 49.2 74.3 94.2 74.3 94.2C80.2 229.8 95.6 175.2 96 173.3z",
    fill: "#d03f3f"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M215.2 200c-3.6 3-9.8 1-13.8-4.1-4.2-5.2-4.6-11.5-1.2-14.1 3.6-2.8 9.7-.7 13.9 4.4 4 5.2 4.6 11.4 1.1 13.8z",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M428.4 201.3c0 49.2-74.4 94.2-74.4 94.2s-74.3-45-74.3-94.2a38 38 0 0 1 74.4-11.1 38 38 0 0 1 74.3 11.1z",
    fill: "#e24b4b"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M292.2 173.3a37.7 37.7 0 0 0-12.4 28c0 49.2 74.3 94.2 74.3 94.2-77.8-65.7-62.4-120.3-61.9-122.2z",
    fill: "#d03f3f"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M411.3 200c-3.6 3-9.8 1-13.8-4.1-4.2-5.2-4.6-11.5-1.2-14.1 3.6-2.8 9.7-.7 13.9 4.4 4 5.2 4.6 11.4 1.1 13.8z",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M381.7 374.1c-30.2 35.9-75.3 64.4-125.7 64.4s-95.4-28.5-125.8-64.2a17.6 17.6 0 0 1 16.5-28.7 627.7 627.7 0 0 0 218.7-.1c16.2-2.7 27 16.1 16.3 28.6z",
    fill: "#3e4347"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M256 438.5c25.7 0 50-7.5 71.7-19.5-9-33.7-40.7-43.3-62.6-31.7-29.7 15.8-62.8-4.7-75.6 34.3 20.3 10.4 42.8 17 66.5 17z",
    fill: "#e24b4b"
  })), /*#__PURE__*/React.createElement("svg", {
    className: "rating-5",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/React.createElement("g", {
    fill: "#ffd93b"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "256",
    cy: "256",
    r: "256"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M512 256A256 256 0 0 1 56.8 416.7a256 256 0 0 0 360-360c58 47 95.2 118.8 95.2 199.3z"
  })), /*#__PURE__*/React.createElement("path", {
    d: "M512 99.4v165.1c0 11-8.9 19.9-19.7 19.9h-187c-13 0-23.5-10.5-23.5-23.5v-21.3c0-12.9-8.9-24.8-21.6-26.7-16.2-2.5-30 10-30 25.5V261c0 13-10.5 23.5-23.5 23.5h-187A19.7 19.7 0 0 1 0 264.7V99.4c0-10.9 8.8-19.7 19.7-19.7h472.6c10.8 0 19.7 8.7 19.7 19.7z",
    fill: "#e9eff4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M204.6 138v88.2a23 23 0 0 1-23 23H58.2a23 23 0 0 1-23-23v-88.3a23 23 0 0 1 23-23h123.4a23 23 0 0 1 23 23z",
    fill: "#45cbea"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M476.9 138v88.2a23 23 0 0 1-23 23H330.3a23 23 0 0 1-23-23v-88.3a23 23 0 0 1 23-23h123.4a23 23 0 0 1 23 23z",
    fill: "#e84d88"
  }), /*#__PURE__*/React.createElement("g", {
    fill: "#38c0dc"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M95.2 114.9l-60 60v15.2l75.2-75.2zM123.3 114.9L35.1 203v23.2c0 1.8.3 3.7.7 5.4l116.8-116.7h-29.3z"
  })), /*#__PURE__*/React.createElement("g", {
    fill: "#d23f77"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M373.3 114.9l-66 66V196l81.3-81.2zM401.5 114.9l-94.1 94v17.3c0 3.5.8 6.8 2.2 9.8l121.1-121.1h-29.2z"
  })), /*#__PURE__*/React.createElement("path", {
    d: "M329.5 395.2c0 44.7-33 81-73.4 81-40.7 0-73.5-36.3-73.5-81s32.8-81 73.5-81c40.5 0 73.4 36.3 73.4 81z",
    fill: "#3e4347"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M256 476.2a70 70 0 0 0 53.3-25.5 34.6 34.6 0 0 0-58-25 34.4 34.4 0 0 0-47.8 26 69.9 69.9 0 0 0 52.6 24.5z",
    fill: "#e24b4b"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M290.3 434.8c-1 3.4-5.8 5.2-11 3.9s-8.4-5.1-7.4-8.7c.8-3.3 5.7-5 10.7-3.8 5.1 1.4 8.5 5.3 7.7 8.6z",
    fill: "#fff",
    opacity: ".2"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-12"
  }, /*#__PURE__*/React.createElement("label", null, "\xDD ki\u1EBFn c\u1EE7a b\u1EA1n:"), /*#__PURE__*/React.createElement("textarea", {
    name: "note",
    rows: "5",
    className: "form-control",
    onChange: onHandleChange
  })))), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    "data-dismiss": "modal"
  }, "Close"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-primary",
    onClick: onSubmitRating
  }, "Save"))))));
};

var RequireLessonModal = function RequireLessonModal(_ref4) {
  var handleChange = _ref4.handleChange,
      state = _ref4.state;

  var onHandleChange = function onHandleChange(e) {
    handleChange(e);
  };

  var onSubmitRequire = function onSubmitRequire() {
    console.log(state.upcomingLesson);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "modal effect-scale",
    tabIndex: "-1",
    role: "dialog",
    id: "js-md-required"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-dialog modal-dialog-centered modal-lg",
    role: "document"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/React.createElement("form", {
    action: "",
    className: ""
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cr-item lesson-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "media"
  }, /*#__PURE__*/React.createElement("div", {
    className: "teacher-information"
  }, /*#__PURE__*/React.createElement("a", {
    className: "teacher-avatar",
    href: "#"
  }, /*#__PURE__*/React.createElement("img", {
    src: state.upcomingLesson.images,
    className: "teacher-image",
    alt: ""
  }), /*#__PURE__*/React.createElement("p", {
    className: "course-teacher tx-14 tx-gray-800 tx-normal mg-b-0 tx-center mg-t-5 d-block"
  }, state.upcomingLesson.teacher))), /*#__PURE__*/React.createElement("div", {
    className: "media-body  mg-l-20 pos-relative pd-b-0-f"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "mg-b-10"
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge badge-warning"
  }, "Incoming"), /*#__PURE__*/React.createElement("a", {
    href: "lesson-detail.html",
    className: "course-name tx-bold"
  }, state.upcomingLesson.courseName)), /*#__PURE__*/React.createElement("div", {
    className: "course-information tx-14"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mg-r-15 tx-gray-600 tx-medium"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-calendar  tx-info mg-r-5"
  }), convertDay(state.upcomingLesson.date) + ' ' + state.upcomingLesson.date), /*#__PURE__*/React.createElement("span", {
    className: "mg-r-15 tx-gray-600 tx-medium"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-clock  tx-info mg-r-5"
  }), "Start: ".concat(state.upcomingLesson.startTime, " ").concat(convertTime(state.upcomingLesson.startTime))), /*#__PURE__*/React.createElement("span", {
    className: "mg-r-15 tx-gray-600 tx-medium"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-clock  tx-info mg-r-5"
  }), "End: ".concat(state.upcomingLesson.endTime, " ").concat(convertTime(state.upcomingLesson.endTime)))), /*#__PURE__*/React.createElement("div", {
    className: "course-note mg-t-15"
  }, /*#__PURE__*/React.createElement("h6", {
    className: "mg-b-3"
  }, "Lesson notes:"), /*#__PURE__*/React.createElement("p", {
    className: "tx-14 mg-b-0"
  }, " ", state.upcomingLesson.note, " ")), /*#__PURE__*/React.createElement("div", {
    className: "course-docs mg-t-15"
  }, /*#__PURE__*/React.createElement("h6", {
    className: "mg-b-3"
  }, "Documents:"), /*#__PURE__*/React.createElement("div", {
    className: "docs-lists"
  }, state.upcomingLesson.document.map(function (doc, index) {
    return /*#__PURE__*/React.createElement("a", {
      key: index,
      href: "#",
      className: "file-doc"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-file mg-r-3"
    }), /*#__PURE__*/React.createElement("span", {
      className: "file-name"
    }, doc.split('.')[0]), /*#__PURE__*/React.createElement("span", {
      className: "file-ext"
    }, ".".concat(doc.split('.')[1])));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "required-list mg-t-15 bd-t pd-t-15"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "list list-unstyled pd-l-0"
  }, state.upcomingLesson.require.map(function (item, index) {
    return /*#__PURE__*/React.createElement("li", {
      key: index
    }, /*#__PURE__*/React.createElement("div", {
      className: "custom-control custom-checkbox"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      id: "requied ".concat(index),
      name: "selectedRequire",
      className: "custom-control-input",
      onChange: onHandleChange,
      value: item
    }), /*#__PURE__*/React.createElement("label", {
      className: "custom-control-label",
      htmlFor: "requied ".concat(index)
    }, item)));
  })), /*#__PURE__*/React.createElement("div", {
    className: "required-text-box mg-t-15"
  }, /*#__PURE__*/React.createElement("label", {
    className: "tx-medium"
  }, "Note for teachers:"), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("textarea", {
    name: "noteForTeacher",
    id: "",
    rows: "4",
    className: "form-control",
    defaultValue: state.upcomingLesson.noteForTeacher,
    onChange: onHandleChange
  })))))))), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    "data-dismiss": "modal"
  }, "Close"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-primary",
    onClick: onSubmitRequire
  }, "Request"))))));
};

var Dashboard = function Dashboard() {
  var _React$useReducer = React.useReducer(reducer, initialState),
      _React$useReducer2 = _slicedToArray(_React$useReducer, 2),
      state = _React$useReducer2[0],
      dispatch = _React$useReducer2[1];

  var onRatingCourse = function onRatingCourse(course) {
    var key = 'course';
    var value = course;
    dispatch({
      type: "RATING_COURSE",
      payload: {
        key: key,
        value: value
      }
    });
  };

  var onHandleChangeRating = function onHandleChangeRating(e) {
    var target = e.target;
    var value = target.type === 'checkbox' ? target.checked : target.getAttribute("name") === 'ratingStars' ? parseInt(target.getAttribute('for').split('-')[1]) : target.value;
    var key = target.getAttribute("name");
    dispatch({
      type: "RATING_COURSE",
      payload: {
        key: key,
        value: value
      }
    });
  };

  var onHandleChangeRequire = function onHandleChangeRequire(e) {
    var target = e.target;
    var value;

    if (target.type === 'checkbox') {
      value = state.upcomingLesson.selectedRequire;

      if (target.checked) {
        value.push(target.value);
      } else {
        var index = state.upcomingLesson.require.indexOf(target.value);

        value.splice(index, 1);
      }
    } else value = target.value;

    var key = target.getAttribute("name");
    dispatch({
      type: "REQUIRE_COURSE",
      payload: {
        key: key,
        value: value
      }
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "content content-fixed"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container pd-x-0 pd-lg-x-10 pd-xl-x-0 dashboard-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "media d-block d-lg-flex"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-sidebar pd-lg-r-25"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user__infomation d-flex d-lg-block flex-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12 col-md-6 col-lg-12 mg-b-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "avatar avatar-xxl avatar-online"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/img/teacher.jpg",
    className: "rounded-circle",
    alt: ""
  })), /*#__PURE__*/React.createElement("h5", {
    className: "mg-b-2 tx-spacing--1 mg-t-15"
  }, "Tr\u1EA7n L\xEA Ph\u01B0\u01A1ng Quy\xEAn")), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12 col-md-6 col-lg-12  "
  }, /*#__PURE__*/React.createElement("label", {
    className: "tx-sans tx-10 tx-semibold tx-uppercase tx-color-01 tx-spacing-1 mg-b-15"
  }, "Contact Information"), /*#__PURE__*/React.createElement("ul", {
    className: "list-unstyled profile-info-list mg-b-10"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    "data-feather": "home"
  }), /*#__PURE__*/React.createElement("span", {
    className: ""
  }, "Gia Lai")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    "data-feather": "phone"
  }), /*#__PURE__*/React.createElement("a", {
    href: "tel:0987654321"
  }, "0987654321")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    "data-feather": "mail"
  }), /*#__PURE__*/React.createElement("a", {
    href: "mailto:example@gmail.com"
  }, "example@gmail.com")))), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12 col-md-6 col-lg-12 mg-t-20 mg-sm-t-0 mg-lg-t-25"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex mg-b-25"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-xs btn-primary flex-fill mg-r-2 bg-orange tx-white",
    href: "book-lesson.html"
  }, "Book a Lesson")))), /*#__PURE__*/React.createElement("div", {
    className: "user__navigation"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-6 col-md-5 col-lg-12 mg-t-20"
  }, /*#__PURE__*/React.createElement("label", {
    className: "tx-sans tx-10 tx-semibold tx-uppercase tx-color-01 tx-spacing-1 mg-b-15"
  }, "Navigation"), /*#__PURE__*/React.createElement("ul", {
    className: "list-unstyled profile-info-list course mg-b-10"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    "data-feather": "user"
  }), /*#__PURE__*/React.createElement("a", {
    href: "profile.html"
  }, "My Page")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    "data-feather": "aperture"
  }), /*#__PURE__*/React.createElement("a", {
    href: "index.html"
  }, "DashBoard")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    "data-feather": "bell"
  }), /*#__PURE__*/React.createElement("a", {
    href: "notification.html"
  }, "Notification")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    "data-feather": "calendar"
  }), /*#__PURE__*/React.createElement("a", {
    href: "booked-lesson.html"
  }, "Booked Lessons")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    "data-feather": "calendar"
  }), /*#__PURE__*/React.createElement("a", {
    href: "lesson-history.html"
  }, "Lesson History")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    "data-feather": "message-circle"
  }), /*#__PURE__*/React.createElement("a", {
    href: "feedback.html"
  }, "FeedBack")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    "data-feather": "message-square"
  }), /*#__PURE__*/React.createElement("a", {
    href: "faq.html"
  }, "FAQ")))))), /*#__PURE__*/React.createElement("div", {
    className: "media-body mg-t-30 mg-lg-t-0 pd-lg-x-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "overall__summary"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "top-step animated fadeInDown"
  }, /*#__PURE__*/React.createElement("li", {
    className: "top-step-item "
  }, /*#__PURE__*/React.createElement("span", {
    className: "item-count"
  }, "10"), /*#__PURE__*/React.createElement("div", {
    className: "item-title"
  }, "Booked Lessons")), /*#__PURE__*/React.createElement("li", {
    className: "top-step-item "
  }, /*#__PURE__*/React.createElement("span", {
    className: "item-count"
  }, "2"), /*#__PURE__*/React.createElement("div", {
    className: "item-title"
  }, "Canceled Lessons")), /*#__PURE__*/React.createElement("li", {
    className: "top-step-item "
  }, /*#__PURE__*/React.createElement("span", {
    className: "item-count"
  }, "2"), /*#__PURE__*/React.createElement("div", {
    className: "item-title"
  }, "Truant Lessons")), /*#__PURE__*/React.createElement("li", {
    className: "top-step-item "
  }, /*#__PURE__*/React.createElement("span", {
    className: "item-count"
  }, "2"), /*#__PURE__*/React.createElement("div", {
    className: "item-title"
  }, "Remaining Lessons")))), /*#__PURE__*/React.createElement("div", {
    className: "lesson mg-t-45 animated fadeInUp am-animation-delay-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-xl-flex align-items-center justify-content-between "
  }, /*#__PURE__*/React.createElement("h4", {
    className: "mg-b-0 gradient-heading"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-fire"
  }), " UPCOMING LESSON")), /*#__PURE__*/React.createElement("div", {
    className: "course-horizental mg-t-20"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "list-wrap"
  }, /*#__PURE__*/React.createElement("li", {
    className: "cr-item lesson-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "media"
  }, /*#__PURE__*/React.createElement("div", {
    className: "teacher-information"
  }, /*#__PURE__*/React.createElement("a", {
    className: "teacher-avatar",
    href: "#"
  }, /*#__PURE__*/React.createElement("img", {
    src: state.upcomingLesson.images,
    className: "teacher-image",
    alt: ""
  }), /*#__PURE__*/React.createElement("p", {
    className: "course-teacher tx-14 tx-gray-800 tx-normal mg-b-0 tx-center mg-t-5 d-block"
  }, state.upcomingLesson.teacher))), /*#__PURE__*/React.createElement("div", {
    className: "media-body  mg-l-20 pos-relative"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "mg-b-10"
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge badge-warning"
  }, "Incoming"), ' ', /*#__PURE__*/React.createElement("a", {
    href: "lesson-detail.html",
    className: "course-name tx-bold"
  }, state.upcomingLesson.courseName)), /*#__PURE__*/React.createElement("div", {
    className: "course-information tx-14"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mg-r-15 tx-gray-600 tx-medium"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-calendar  tx-info mg-r-5"
  }), convertDay(state.upcomingLesson.date) + ' ' + state.upcomingLesson.date), /*#__PURE__*/React.createElement("span", {
    className: "mg-r-15 tx-gray-600 tx-medium"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-clock  tx-info mg-r-5"
  }), " ", "Start: ".concat(state.upcomingLesson.startTime, " ").concat(convertTime(state.upcomingLesson.startTime))), /*#__PURE__*/React.createElement("span", {
    className: "mg-r-15 tx-gray-600 tx-medium"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-clock  tx-info mg-r-5"
  }), " ", "End: ".concat(state.upcomingLesson.endTime, " ").concat(convertTime(state.upcomingLesson.endTime)))), /*#__PURE__*/React.createElement("div", {
    className: "course-note mg-t-15"
  }, /*#__PURE__*/React.createElement("h6", {
    className: "mg-b-3"
  }, "Lesson notes:"), /*#__PURE__*/React.createElement("p", {
    className: "tx-14 mg-b-0"
  }, state.upcomingLesson.note)), /*#__PURE__*/React.createElement("div", {
    className: "course-docs mg-t-15"
  }, /*#__PURE__*/React.createElement("h6", {
    className: "mg-b-3"
  }, "Documents:"), /*#__PURE__*/React.createElement("div", {
    className: "docs-lists"
  }, state.upcomingLesson.document.map(function (doc, index) {
    return /*#__PURE__*/React.createElement("a", {
      key: index,
      href: "#",
      className: "file-doc"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-file mg-r-3"
    }), /*#__PURE__*/React.createElement("span", {
      className: "file-name"
    }, doc.split('.')[0]), /*#__PURE__*/React.createElement("span", {
      className: "file-ext"
    }, ".".concat(doc.split('.')[1])));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "course-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "action-left"
  }, /*#__PURE__*/React.createElement("a", {
    href: state.upcomingLesson.skype,
    className: "btn btn-sm btn-info mg-r-10",
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fab fa-skype mg-r-5"
  }), " ID: ", /*#__PURE__*/React.createElement("span", {
    className: "tx-bold"
  }, "mona.media")), /*#__PURE__*/React.createElement("a", {
    href: "#js-md-required",
    className: "btn btn-sm btn-success",
    "data-toggle": "modal"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-edit mg-r-5"
  }), " Checking lesson booking ")), /*#__PURE__*/React.createElement("div", {
    className: "action-right"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://skype.com",
    className: "btn btn-sm btn-outline-danger",
    target: "_blank",
    rel: "noopener",
    "data-toggle": "tooltip",
    title: "You can only cancel this lesson before start for 30 minutes !!",
    "data-placement": "top"
  }, /*#__PURE__*/React.createElement("i", {
    "data-feather": "x"
  }), " Cancel lesson"))))))))), /*#__PURE__*/React.createElement("div", {
    className: "lesson mg-t-45 animated fadeInUp am-animation-delay-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-xl-flex align-items-center justify-content-between "
  }, /*#__PURE__*/React.createElement("h4", {
    className: "mg-b-0 gradient-heading"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-file"
  }), "LESSON HISTORY"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "link"
  }, "View all history")), /*#__PURE__*/React.createElement(LessonHistory, {
    ratingCourse: onRatingCourse,
    state: state
  })))))), /*#__PURE__*/React.createElement(RatingLessonModal, {
    course: state.ratingCourse,
    state: state,
    handleChange: onHandleChangeRating
  }), /*#__PURE__*/React.createElement(RequireLessonModal, {
    state: state,
    handleChange: onHandleChangeRequire
  }));
};

ReactDOM.render( /*#__PURE__*/React.createElement(Dashboard, null), document.getElementById('react-account-dashboard'));