!function(e){var t={};function a(r){if(t[r])return t[r].exports;var c=t[r]={i:r,l:!1,exports:{}};return e[r].call(c.exports,c,c.exports,a),c.l=!0,c.exports}a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)a.d(r,c,function(t){return e[t]}.bind(null,c));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=30)}({30:function(e,t,a){"use strict";a.r(t);function r(e){return function(e){if(Array.isArray(e))return n(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||l(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var a=[],r=!0,c=!1,l=void 0;try{for(var n,o=e[Symbol.iterator]();!(r=(n=o.next()).done)&&(a.push(n.value),!t||a.length!==t);r=!0);}catch(e){c=!0,l=e}finally{try{r||null==o.return||o.return()}finally{if(c)throw l}}return a}(e,t)||l(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){if(e){if("string"==typeof e)return n(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?n(e,t):void 0}}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function m(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){s(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var i={studentCode:"107",fullName:"Nguyen Van Thai",phone:"0111222333",email:"example@gmail.com",dateOfBirth:"01/09/1999",sex:"1",language:"2",timezone:"1",address:"123 Ly Thuong Kiet, TPHCM",target:["Exam preparation","Study aboard","Self improvement","Other"],selectTarget:["Exam preparation"],hobbits:"Learn English",notes:"Your note....",oldPassword:"",newPassword:""},u=function(e,t){var a=t.type,r=t.payload;switch(a){case"STATE_CHANGE":return m(m({},e),{},s({},r.key,r.value));default:return e}},d=function(){var e,t,a=c(React.useReducer(u,i),2),l=a[0],n=a[1],o=function(e){var t=e.target,a="checkbox"===t.type?t.checked:t.value,r=t.getAttribute("name");n({type:"STATE_CHANGE",payload:{key:r,value:a}})},m=function(e){var t=e.target,a=[];r(t.children).map((function(e){e.selected&&a.push(e.value)}));var c=t.getAttribute("name");n({type:"STATE_CHANGE",payload:{key:c,value:a}})};return React.useEffect((function(){return $(".js-select2").on("change",m.bind(void 0)),$(".datetimepicker").on("change",o.bind(void 0)),function(){$(".js-select2").off("change",m.bind(void 0)),$(".datetimepicker").off("change",o.bind(void 0))}}),[]),React.createElement("form",{id:"form-account-profile",onSubmit:function(e){e.preventDefault(),console.log(l);for(var t=[],a=0,r=Object.entries(l);a<r.length;a++){var n=c(r[a],2),o=n[0];n[1].length||t.push(o)}t.length>0&&alert("Vui lòng điền đầy đủ thông tin: [".concat(t,"]"))}},React.createElement("div",{className:"form-account pd-y-15"},React.createElement("div",{className:"row mg-b-15"},React.createElement("div",{className:"col-md-6"},React.createElement("div",{className:"form-row align-items-center"},React.createElement("div",{className:"form-group col-sm-3 col-label-fixed"},React.createElement("p",{className:"mg-b-0 tx-medium"},"Student code:")),React.createElement("div",{className:"form-group col-sm-9"},React.createElement("input",{type:"text",className:"form-control",placeholder:"",name:"studentCode",defaultValue:l.studentCode,required:!0,onChange:o}))),React.createElement("div",{className:"form-row align-items-center"},React.createElement("div",{className:"form-group col-sm-3 col-label-fixed"},React.createElement("p",{className:"mg-b-0 tx-medium"},"Phone:")),React.createElement("div",{className:"form-group col-sm-9"},React.createElement("input",{type:"text",className:"form-control",placeholder:"0123456789",name:"phone",defaultValue:l.phone,required:!0,onChange:o}))),React.createElement("div",{className:"form-row align-items-center"},React.createElement("div",{className:"form-group col-sm-3 col-label-fixed"},React.createElement("p",{className:"mg-b-0 tx-medium"},"Date of birth:")),React.createElement("div",{className:"form-group col-sm-9"},React.createElement("input",{type:"text",className:"form-control datetimepicker",name:"dateOfBirth",defaultValue:l.dateOfBirth,placeholder:"dd/mm/YYYY"}))),React.createElement("div",{className:"form-row align-items-center"},React.createElement("div",{className:"form-group col-sm-3 col-label-fixed"},React.createElement("p",{className:"mg-b-0 tx-medium"},"Language:")),React.createElement("div",{className:"form-group col-sm-9"},React.createElement("select",{name:"language",value:l.language,className:"form-control",onChange:o},React.createElement("option",{value:"1"},"Vietnamese"),React.createElement("option",{value:"2"},"English"))))),React.createElement("div",{className:"col-md-6"},React.createElement("div",{className:"form-row align-items-center"},React.createElement("div",{className:"form-group col-sm-3 col-label-fixed"},React.createElement("p",{className:"mg-b-0 tx-medium"},"Full name:")),React.createElement("div",{className:"form-group col-sm-9"},React.createElement("input",{type:"text",className:"form-control",name:"fullName",placeholder:"0",defaultValue:l.fullName,required:!0,onChange:o}))),React.createElement("div",{className:"form-row align-items-center"},React.createElement("div",{className:"form-group col-sm-3 col-label-fixed"},React.createElement("p",{className:"mg-b-0 tx-medium"},"Email:")),React.createElement("div",{className:"form-group col-sm-9"},React.createElement("input",{type:"email",className:"form-control",name:"email",placeholder:"Ex: monamedia@mona.net",defaultValue:l.email,required:!0,onChange:o}))),React.createElement("div",{className:"form-row align-items-center"},React.createElement("div",{className:"form-group col-sm-3 col-label-fixed"},React.createElement("p",{className:"mg-b-0 tx-medium"},"Sex:")),React.createElement("div",{className:"form-group col-sm-9"},React.createElement("select",(s(e={name:"",className:"form-control",value:l.sex},"name","sex"),s(e,"onChange",o),e),React.createElement("option",{value:"1"},"Male"),React.createElement("option",{value:"2"},"Female")))),React.createElement("div",{className:"form-row align-items-center"},React.createElement("div",{className:"form-group col-sm-3 col-label-fixed"},React.createElement("p",{className:"mg-b-0 tx-medium"},"Timezone:")),React.createElement("div",{className:"form-group col-sm-9"},React.createElement("select",{name:"timezone",className:"form-control",onChange:o},React.createElement("option",{value:"1"},"GTM +7"),React.createElement("option",{value:"2"},"GTM -7"))))),React.createElement("div",{className:"col-12"},React.createElement("div",{className:"form-row  align-items-center "},React.createElement("div",{className:"form-group col-sm-3 col-label-fixed"},React.createElement("p",{className:"mg-b-0 tx-medium "},"Address:")),React.createElement("div",{className:"form-group col-sm-9"},React.createElement("input",{type:"text",className:"form-control",name:"address",placeholder:"Your address",defaultValue:l.address,onChange:o})))),React.createElement("div",{className:"col-12"},React.createElement("div",{className:"form-row  align-items-center "},React.createElement("div",{className:"form-group col-sm-3 col-label-fixed"},React.createElement("p",{className:"mg-b-0 tx-medium "},"Target:")),React.createElement("div",{className:"form-group col-sm-9 select-checkbox"},React.createElement("select",{id:"target-select",className:"js-select2 form-control",multiple:!0,readOnly:!0,name:"selectTarget",value:l.selectTarget,onClick:m},l.target&&l.target.length>0?l.target.map((function(e,t){return React.createElement("option",{key:t,value:e},e)})):React.createElement("option",{value:""},"Loading option... "))))),React.createElement("div",{className:"col-12"},React.createElement("div",{className:"form-row  align-items-center "},React.createElement("div",{className:"form-group col-sm-3 col-label-fixed"},React.createElement("p",{className:"mg-b-0 tx-medium "},"Hobbits: ")),React.createElement("div",{className:"form-group col-sm-9"},React.createElement("input",{type:"text",name:"hobbits",className:"form-control",placeholder:"Your hobbit",defaultValue:l.hobbits,onChange:o})))),React.createElement("div",{className:"col-12"},React.createElement("div",{className:"form-row  align-items-center "},React.createElement("div",{className:"form-group col-sm-3 col-label-fixed"},React.createElement("p",{className:"mg-b-0 tx-medium "},"Notes:")),React.createElement("div",{className:"form-group col-sm-9"},React.createElement("textarea",(s(t={name:"",id:"",rows:"3",className:"form-control"},"name","notes"),s(t,"placeholder","Notes for teachers"),s(t,"defaultValue",l.notes),s(t,"onChange",o),t))))),React.createElement("div",{className:"col-md-6"},React.createElement("div",{className:"form-row align-items-center"},React.createElement("div",{className:"form-group col-sm-3 col-label-fixed"},React.createElement("p",{className:"mg-b-0 tx-medium"},"Old password: ")),React.createElement("div",{className:"form-group col-sm-9"},React.createElement("input",{type:"password",className:"form-control",placeholder:"",name:"oldPassword",defaultValue:l.oldPassword,required:!0,onChange:o})))),React.createElement("div",{className:"col-md-6"},React.createElement("div",{className:"form-row align-items-center"},React.createElement("div",{className:"form-group col-sm-3 col-label-fixed"},React.createElement("p",{className:"mg-b-0 tx-medium"},"New password:")),React.createElement("div",{className:"form-group col-sm-9"},React.createElement("input",{type:"password",className:"form-control",placeholder:"",name:"newPassword",defaultValue:l.newPassword,required:!0,onChange:o}))))),React.createElement("div",{className:"tx-center"},React.createElement("button",{type:"submit",className:"btn btn-primary rounded-pill"},"Save information"))))},f=function(){return React.createElement(d,null)};ReactDOM.render(React.createElement(f,null),document.getElementById("react-student-form"))}});