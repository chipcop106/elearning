"use strict";

var BookingLesson = function BookingLesson() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "d-xl-flex align-items-center justify-content-between "
  }, /*#__PURE__*/React.createElement("h4", {
    className: "mg-b-0 gradient-heading"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-calendar-alt"
  }), " BOOKING LESSON")), /*#__PURE__*/React.createElement("p", {
    className: "mg-b-0 mg-t-15"
  }, "Select one day:"), /*#__PURE__*/React.createElement("div", {
    className: "calendar__picker swiper-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "calendar-slider swiper-wrapper"
  }), /*#__PURE__*/React.createElement("div", {
    className: "navigation_slider"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "prev-btn"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-chevron-left",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "next-btn"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-chevron-right",
    "aria-hidden": "true"
  })))), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "btn btn-danger",
    id: "js-select-today"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-calendar mg-r-5"
  }), "Select today"), /*#__PURE__*/React.createElement("div", {
    className: "filter-group-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter-group pd-t-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter-row row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "left col-md-2"
  }, /*#__PURE__*/React.createElement("h5", null, "CONDITIONS")), /*#__PURE__*/React.createElement("div", {
    className: "right col-md-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-6 col-md-4 item"
  }, /*#__PURE__*/React.createElement("a", {
    href: "javascript:;",
    className: "form-control nationality",
    name: "txt-full-name"
  }, "Nation")), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-6 col-md-4  item"
  }, /*#__PURE__*/React.createElement("select", {
    type: "text",
    className: "form-control ",
    name: "txt-gender"
  }, /*#__PURE__*/React.createElement("option", null, "Gender"), /*#__PURE__*/React.createElement("option", {
    value: "0"
  }, "Male"), /*#__PURE__*/React.createElement("option", {
    value: "0"
  }, "Female"))), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12 col-md-4  item"
  }, /*#__PURE__*/React.createElement("select", {
    type: "text",
    className: "form-control",
    name: "txt-age"
  }, /*#__PURE__*/React.createElement("option", null, "Study program"), /*#__PURE__*/React.createElement("option", {
    value: "10"
  }, "Children"), /*#__PURE__*/React.createElement("option", {
    value: "20"
  }, "Youth"), /*#__PURE__*/React.createElement("option", {
    value: "30"
  }, "Basic"), /*#__PURE__*/React.createElement("option", {
    value: "40"
  }, "Advanced"), /*#__PURE__*/React.createElement("option", {
    value: "40"
  }, "Speaking"), /*#__PURE__*/React.createElement("option", {
    value: "40"
  }, "Pronounce"), /*#__PURE__*/React.createElement("option", {
    value: "40"
  }, "Other"))))))), /*#__PURE__*/React.createElement("div", {
    className: "filter-group pd-t-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter-row row from-to-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "left col-md-2"
  }, /*#__PURE__*/React.createElement("h5", null, "TIMES")), /*#__PURE__*/React.createElement("div", {
    className: "right col-md-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-4 item"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    placeholder: "Date",
    disabled: true,
    id: "date-selected"
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-6 col-md-4 item"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "from-date form-control time-only",
    placeholder: "Start time"
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-6 col-md-4 item"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "to-date form-control time-only",
    placeholder: "End time"
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "filter-group pd-t-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter-row row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "left col-md-2"
  }, /*#__PURE__*/React.createElement("h5", null, "Search")), /*#__PURE__*/React.createElement("div", {
    className: "right col-md-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-8 item"
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-control",
    type: "text",
    placeholder: "..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-4 item"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "btn btn-primary btn-block",
    onClick: "showlist()"
  }, "Search"))))))));
};

ReactDOM.render( /*#__PURE__*/React.createElement(BookingLesson, null), document.getElementById('react-booking-lesson'));