"use strict";

var Footer = function Footer() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
    href: "javascript:;",
    id: "scroll-to-top"
  }, /*#__PURE__*/React.createElement("i", {
    className: "material-icons"
  }, "keyboard_arrow_up")), /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "\xA9 ", /*#__PURE__*/React.createElement("span", {
    id: "js-current-year"
  })), /*#__PURE__*/React.createElement("span", null, "C\xF4ng ty Mona Media. GPKD: 123456. \u0110T: 1900 000. \u0110C: 373/226 L\xFD Th\u01B0\u1EDDng Ki\u1EC7t, P8, Q. T\xE2n B\xECnh, HCM")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://mona.media",
    className: "nav-link"
  }, "Terms of use"), /*#__PURE__*/React.createElement("a", {
    href: "https://mona.media",
    className: "nav-link"
  }, "Privacy Policy"), /*#__PURE__*/React.createElement("a", {
    href: "https://mona.media",
    className: "nav-link"
  }, "License")))));
};

var domContainer = document.getElementById('footer');
ReactDOM.render( /*#__PURE__*/React.createElement(Footer, null), domContainer);