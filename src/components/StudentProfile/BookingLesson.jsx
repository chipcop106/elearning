const initialState = {
  nation: "",
  gender: "",
  program: ["Children", "Youth", "Basic", "Advanced", "Speaking", "Pronounce", "Other"],
  date: "",
  startTime: "",
  endTime: "",
  search: "",
}
const BookingLesson = () => {
  const handleChange = (e) => {
    console.log(e.target)
  }
  React.useEffect(() => {
    $('#div-nationality input').on('change', handleChange.bind(this))
  });

  return (
    <React.Fragment>
      <div className="d-xl-flex align-items-center justify-content-between ">
        <h4 className="mg-b-0 gradient-heading"><i className="fas fa-calendar-alt"></i> BOOKING LESSON</h4>
      </div>
      <p className="mg-b-0 mg-t-15">Select one day:</p>
      <div className="calendar__picker swiper-container">
        <div className="calendar-slider swiper-wrapper">
        </div>
        <div className="navigation_slider">
          <button type="button" className="prev-btn"><i className="fa fa-chevron-left" aria-hidden="true"></i></button>
          <button type="button" className="next-btn"><i className="fa fa-chevron-right" aria-hidden="true"></i></button>
        </div>
      </div>
      <a href="#" className="btn btn-danger" id="js-select-today"><i className="fa fa-calendar mg-r-5"></i>Select today</a>
      <div className="filter-group-wrap">
        <div className="filter-group pd-t-20">
          <div className="filter-row row">
            <div className="left col-md-2">
              <h5>CONDITIONS</h5>
            </div>
            <div className="right col-md-10">
              <div className="form-row">
                <div className="col-sm-6 col-md-4 item">
                  <a href="javascript:;" className="form-control nationality" name="txt-full-name">Nation</a>
                </div>
                <div className="col-sm-6 col-md-4  item">
                  <select type="text" className="form-control " name="txt-gender">
                    <option>Gender</option>
                    <option value="0">Male</option>
                    <option value="0">Female</option>
                  </select>
                </div>
                <div className="col-sm-12 col-md-4  item">
                  <select type="text" className="form-control" name="txt-age">
                    <option>Study program</option>
                    <option value="10">Children</option>
                    <option value="20">Youth</option>
                    <option value="30">Basic</option>
                    <option value="40">Advanced</option>
                    <option value="40">Speaking</option>
                    <option value="40">Pronounce</option>
                    <option value="40">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="filter-group pd-t-20">
          <div className="filter-row row from-to-group">
            <div className="left col-md-2">
              <h5>TIMES</h5>
            </div>
            <div className="right col-md-10">
              <div className="form-row">
                <div className="col-md-4 item">
                  <input type="text" className="form-control" placeholder="Date" disabled id="date-selected" />
                </div>
                <div className="col-sm-6 col-md-4 item">
                  <input type="text" className="from-date form-control time-only"
                    placeholder="Start time" />
                </div>
                <div className="col-sm-6 col-md-4 item">
                  <input type="text" className="to-date form-control time-only" placeholder="End time" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="filter-group pd-t-20">
          <div className="filter-row row">
            <div className="left col-md-2">
              <h5>Search</h5>
            </div>
            <div className="right col-md-10">
              <div className="form-row">
                <div className="col-sm-8 item">
                  <input className="form-control" type="text" placeholder="..." />
                </div>
                <div className="col-sm-4 item">
                  <a href="#" className="btn btn-primary btn-block"
                    onClick="showlist()">Search</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

ReactDOM.render(<BookingLesson />, document.getElementById('react-booking-lesson'));