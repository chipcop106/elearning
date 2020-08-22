import React from 'react';
import ReactDOM from 'react-dom';

const Footer = () => {

    return (
        <>

  <a href={"#"} id="scroll-to-top"><i className="material-icons">keyboard_arrow_up</i></a>
  <footer className="footer">
    <div>
      <span>© <span id="js-current-year" /></span>
      <span>
        Công ty Mona Media. GPKD: 123456. ĐT: 1900 000. ĐC: 373/226 Lý Thường Kiệt, P8, Q. Tân Bình, HCM</span>
    </div>
    <div>
      <nav className="nav">
        <a href="https://mona.media" className="nav-link">Terms of use</a>
        <a href="https://mona.media" className="nav-link">Privacy Policy</a>
        <a href="https://mona.media" className="nav-link">License</a>
      </nav>
    </div>
    </footer>
         </>
    )
}

const domContainer = document.getElementById('footer');
if(domContainer)
ReactDOM.render(<Footer />, domContainer);