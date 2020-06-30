import { convertTime } from "../../utils.js";
import { convertDay } from "../../utils.js";

const RequireLessonModal = ({ course }) => {
  const onHandleChange = (e) => {
    const target = e.target;
    let value;
    if (target.type === 'checkbox') {
      value = course.selectedRequire;
      if (target.checked) {
        value.push(target.value)
      }
      else {
        const index = course.require.indexOf(target.value);
        value.splice(index, 1);
      }
    }
    else value = target.value;
    const key = target.getAttribute("name");
    course[key] = value;
  }

  const onSubmitRequire = () => {
    console.log(course)
  }

  return (
    <div className="modal effect-scale" tabIndex="-1" role="dialog" id="js-md-required">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <form action="" className="">
            <div className="modal-body">
              <div className="cr-item lesson-info">
                <div className="media">
                  <div className="teacher-information">
                    <a className="teacher-avatar" href="#">
                      <img src={course.course && course.course.images} className="teacher-image" alt="" />
                      <p className="course-teacher tx-14 tx-gray-800 tx-normal mg-b-0 tx-center mg-t-5 d-block">
                        {course.course && course.course.teacher}</p>
                    </a>
                  </div>
                  <div className="media-body  mg-l-20 pos-relative pd-b-0-f">
                    <h5 className="mg-b-10">
                      <span className="badge badge-warning">Incoming</span>{' '}
                      <a href="lesson-detail.html" className="course-name tx-bold">{course.course && course.course.courseName}</a>
                    </h5>
                    <div className="course-information tx-14">
                      <span className="mg-r-15 tx-gray-600 tx-medium"><i className="fa fa-calendar  tx-info mg-r-5"></i>
                        {course.course && convertDay(course.course.date) + ' ' + course.course.date}</span>
                      <span className="mg-r-15 tx-gray-600 tx-medium"><i className="fa fa-clock  tx-info mg-r-5"></i>
                        {course.course && `Start: ${course.course.startTime} ${convertTime(course.course.startTime)}`}</span>
                      <span className="mg-r-15 tx-gray-600 tx-medium"><i className="fa fa-clock  tx-info mg-r-5"></i>
                        {course.course && `End: ${course.course.endTime} ${convertTime(course.course.endTime)}`}</span>
                    </div>
                    <div className="course-note mg-t-15">
                      <h6 className="mg-b-3">Lesson notes:</h6>
                      <p className="tx-14 mg-b-0"> {course.course && course.course.note} </p>
                    </div>
                    <div className="course-docs mg-t-15">
                      <h6 className="mg-b-3">Documents:</h6>
                      <div className="docs-lists">
                        {
                          course.course && course.course.document.map((doc, index) => {
                            return <a key={index} href="#" className="file-doc"><i className="fa fa-file mg-r-3"></i>
                              <span className="file-name">{doc.split('.')[0]}</span>
                              <span className="file-ext">{`.${doc.split('.')[1]}`}</span>
                            </a>
                          })
                        }
                      </div>
                    </div>
                    <div className="required-list mg-t-15 bd-t pd-t-15">
                      <ul className="list list-unstyled pd-l-0">
                        {
                          course.require.map((item, index) => {
                            return (
                              <li key={index}>
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" id={`requied ${index}`} name="selectedRequire" className="custom-control-input" onChange={onHandleChange} value={item} />
                                  <label className="custom-control-label" htmlFor={`requied ${index}`}>{item}</label>
                                </div>
                              </li>
                            )
                          })
                        }
                      </ul>
                      <div className="required-text-box mg-t-15">
                        <label className="tx-medium">Note for teachers:</label>
                        <div className="form-group">
                          <textarea name="note" id="" rows="4" className="form-control" defaultValue={course.note} onChange={onHandleChange}></textarea>
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