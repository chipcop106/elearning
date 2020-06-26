"use strict";

var ProfileSidebar = function ProfileSidebar() {
  return /*#__PURE__*/React.createElement("div", {
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
  }, "Tr\u1EA7n L\xEA Ph\u01B0\u01A1ng Quy\xEAn ")), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12 col-md-6 col-lg-12  "
  }, /*#__PURE__*/React.createElement("label", {
    className: "tx-sans tx-10 tx-semibold tx-uppercase tx-color-01 tx-spacing-1 mg-b-15"
  }, "Contact Information"), /*#__PURE__*/React.createElement("ul", {
    className: "list-unstyled profile-info-list mg-b-10"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    "data-feather": "home"
  }), /*#__PURE__*/React.createElement("span", {
    className: true
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
  }, "Book a Lession")))), /*#__PURE__*/React.createElement("div", {
    className: "user__navigation"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-6 col-md-5 col-lg-12 mg-t-20"
  }, /*#__PURE__*/React.createElement("label", {
    className: "tx-sans tx-10 tx-semibold tx-uppercase tx-color-01 tx-spacing-1 mg-b-15"
  }, "Navigation"), /*#__PURE__*/React.createElement("div", {
    id: "js-component-sidemenu"
  }), /*#__PURE__*/React.createElement("script", {
    src: "../components/SideMenu.jsx"
  }))));
};

var domContainer = document.getElementById('js-component-profilesidebar');
ReactDOM.render( /*#__PURE__*/React.createElement(Header, null), domContainer);