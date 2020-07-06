import React from 'react';
import ReactDOM from 'react-dom';
import { convertTime, convertDay } from "../../utils.js";

const initialState = {
    id:"",
    require:["Require 1","Require 2","Require 3"],
    selectedRequire:[],
    message: "",
}

const RequireLessonModal = ({
  id,
  avatar,
  teacher,
  name,
  note,
  date,
  start,
  end,
  documents,
  skype }) => {
   const [state, setState] = React.useState(initialState)

  const handleChange = (e) => {
    const target = e.target;
    let value;
    if (target.type === 'checkbox') {
      value = state.selectedRequire;
      if (target.checked) {
        value.push(target.value)
      }
      else {
          const index = state.selectedRequire.indexOf(target.value);
          value.splice(index, 1);
      }
    }
    else value = target.value;
    const key = target.getAttribute("name");
    setState({...state,
        id,
        [key]:value,
        })
  }

  const onSubmitRequire = () => {
    console.log(state)
  }

   React.useEffect(() => {
    $('.required-list ul li input').prop('checked', false);
        setState({...initialState,
          id,
          selectedRequire:[]
        })
    }, [id]);

  return (
    <div className="modal effect-scale" tabIndex="-1" role="dialog" id="js-md-required">
    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div className="modal-content">
    <form action="" className="">
    <div className="modal-body">
    <div className="cr-item lesson-info">
    <div className="media">
    <div className="teacher-information">
    <a className="teacher-avatar" href={"#"}>
    <img src={avatar} className="teacher-image" alt="" />
    <p className="course-teacher tx-14 tx-gray-800 tx-normal mg-b-0 tx-center mg-t-5 d-block">
    {teacher}</p>
    </a>
    </div>
    <div className="media-body  mg-l-20 pos-relative pd-b-0-f">
    <h5 className="mg-b-10">
    <span className="badge badge-warning">Incoming</span>{' '}
    <a href="lesson-detail.html" className="course-name tx-bold">{name}</a>
    </h5>
    <div className="course-information tx-14">
    <span className="mg-r-15 tx-gray-600 tx-medium"><i className="fa fa-calendar  tx-info mg-r-5"></i>
    {date}</span>
    <span className="mg-r-15 tx-gray-600 tx-medium"><i className="fa fa-clock  tx-info mg-r-5"></i>
    {`Start: ${start}`}</span>
    <span className="mg-r-15 tx-gray-600 tx-medium"><i className="fa fa-clock  tx-info mg-r-5"></i>
    {`End: ${end}`}</span>
    </div>
    <div className="course-note mg-t-15">
    <h6 className="mg-b-3">Lesson notes:</h6>
    <p className="tx-14 mg-b-0"> {note} </p>
    </div>
    <div className="course-docs mg-t-15">
    <h6 className="mg-b-3">Documents:</h6>
    <div className="docs-lists">
    {
      !!documents && Array.isArray(documents) && documents.length > 0 && documents.map((doc, index) =>
        <a key={index} href={"#"} className="file-doc"><i className="fa fa-file mg-r-3"></i>
        <span className="file-name">{doc.split('.')[0]}</span>
        <span className="file-ext">{`.${doc.split('.')[1]}`}</span>
        </a>
      )
    }
    </div>
    </div>
    <div className="required-list mg-t-15 bd-t pd-t-15">
    <ul className="list list-unstyled pd-l-0">
    {
      !!state.require && state.require.length > 0 && state.require.map((item, index) =>
        <li key={index}>
        <div className="custom-control custom-checkbox">
        <input type="checkbox" id={`require-${index}`} name="selectedRequire" className="custom-control-input" onChange={handleChange} value={item}/>
        <label className="custom-control-label" htmlFor={`require-${index}`}>{item}</label>
        </div>
        </li>
        )
    }
    </ul>
    <div className="required-text-box mg-t-15">
    <label className="tx-medium">Note for teachers:</label>
    <div className="form-group">
    <textarea name="message" id="" rows="4" className="form-control" value={state.message} onChange={handleChange} placeholder="Note for teacher"></textarea>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    <div className="modal-footer">
    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
    <button type="button" className="btn btn-primary" onClick={onSubmitRequire}>Request</button>
    </div>
    </form>
    </div>
    </div>
    </div>
    )
}
export default RequireLessonModal;