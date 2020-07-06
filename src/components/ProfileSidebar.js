import React from 'react';
import ReactDOM from 'react-dom';
import SideMenu from "./SideMenu";

let initialState = {
  fullName: "Nguyễn Văn Thái",
  avatar: "student.png",
  phone: "0111222333",
  email: "example@gmail.com",
  sex: "1",
  address: "123 Ly Thuong Kiet, TPHCM",
}

const ProfileSidebar = () => {
  const [state, setState] = React.useState(initialState)

  return (
    <div className="profile-sidebar pd-lg-r-25">
      <div className="user__infomation d-flex d-lg-block flex-wrap">
        <div className="col-sm-12 col-md-6 col-lg-12 mg-b-20">
          <div className="avatar avatar-xxl avatar-online"><img src={`../assets/img/${state.avatar}`} className="rounded-circle" alt="" /></div>
          <h5 className="mg-b-2 tx-spacing--1 mg-t-15">{state.fullName}</h5>
        </div>{/* col */}
        <div className="col-sm-12 col-md-6 col-lg-12  ">
          <label className="tx-sans tx-10 tx-semibold tx-uppercase tx-color-01 tx-spacing-1 mg-b-15">Contact
        Information</label>
          <ul className="list-unstyled profile-info-list mg-b-10">
            <li><i data-feather="home" /><span>{state.address}</span></li>
            <li><i data-feather="phone" /><a href="tel:0987654321">{state.phone}</a></li>
            <li><i data-feather="mail" /><a href={`mailto:${state.email}`}>{state.email}</a></li>
          </ul>
        </div>{/* col */}
        <div className="col-sm-12 col-md-6 col-lg-12 mg-t-20 mg-sm-t-0 mg-lg-t-25">
          <div className="d-flex mg-b-25">
            <a className="btn btn-xs btn-primary flex-fill mg-r-2 bg-orange tx-white" href="bookingLesson.html">Book a
          Lesson</a>
          </div>
        </div>
      </div>{/* row */}
      <div className="user__navigation">
        <div className="col-sm-6 col-md-5 col-lg-12 mg-t-20">
          <label className="tx-sans tx-10 tx-semibold tx-uppercase tx-color-01 tx-spacing-1 mg-b-15">Navigation</label>
          <SideMenu />
        </div>
      </div>
    </div>
  )
}

const domContainer = document.getElementById('js-component-profilesidebar');
if(domContainer){
  ReactDOM.render(<ProfileSidebar />, domContainer);
}
