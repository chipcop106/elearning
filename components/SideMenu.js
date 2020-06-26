"use strict";

var SideMenu = function SideMenu() {
  return /*#__PURE__*/React.createElement("ul", {
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
  }, "FAQ")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("i", {
    "data-feather": "message-square"
  }), /*#__PURE__*/React.createElement("a", {
    href: "faq.html"
  }, "FAQ")));
};

var domContainer = document.getElementById('js-component-sidemenu');
ReactDOM.render( /*#__PURE__*/React.createElement(Header, null), domContainer);