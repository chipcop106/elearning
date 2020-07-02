import React from 'react';
import ReactDOM from 'react-dom';
import LessonList from './LessonList';

let initialState = {
  courseName: "",
  fromDate: "",
  toDate: "",
}

const reducer = (prevState, { type, payload }) => {
  switch (type) {
    case "STATE_CHANGE": {
      return {
        ...prevState,
        [payload.key]: payload.value
      }
    }
    default: return prevState;
      break;
  }
}

const LessonHistory = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const key = target.getAttribute("name");
    dispatch({ type: "STATE_CHANGE", payload: { key, value } })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  }

  React.useEffect(() => {
    $(".datetimepicker").on('change', handleChange.bind(this));
  }, []);
  
  return (
    <React.Fragment>
    <div className="fb-summary-container pd-x-20-f pd-b-0-f pd-t-20-f ">
      <form action="" method="get" className="st-date" onSubmit={onSubmit}>
        <div className="row">
          <div className="col-12 col-md-3 form-group">
            <select name="courseName" id="" className="form-control" defaultValue="Course name" onChange={handleChange}>
              <option value="">Course name</option>
              <option value="IELTS 8.0 Professional">IELTS 8.0 Professional</option>
            </select>
          </div>
          <div className="col-12 col-sm-6 col-md-3 form-group">
            <input type="text" name="fromDate" className="form-control datetimepicker"
              placeholder="From date"/>
          </div>
          <div className="col-12 col-sm-6 col-md-3 form-group">
            <input type="text" name="toDate" className="form-control datetimepicker"
              placeholder="To date"/>
          </div>
          <div className="form-group col-md-3">
            <button type="submit" className="btn btn-info btn-block"><i className="fa fa-search mg-r-5"></i>Search</button>
          </div>
        </div>
      </form>
    </div>
    <LessonList/>
    </React.Fragment>
  )
}

ReactDOM.render(<LessonHistory />, document.getElementById('react-lesson-history'));