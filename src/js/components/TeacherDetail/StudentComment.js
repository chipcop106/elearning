const initialState = ""
const StudentComment = () => {
  const [state, setState] = React.useState(initialState);
  const handleChange = (e) => {
      setState(e.target.value)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    console.log(state)
  }
  return (
    <div className="tc-comment-wrap bd-t-0-f mg-t-0-f pd-t-0-f">
      <h5>Leave comment for this teacher:</h5>
      <div className="leave-comment mg-b-30">
        <div className="form-group cmt-box">
          <textarea rows="5" className="form-control" onChange={handleChange}></textarea>
        </div>
        <div className="cmt-action">
          <a href={"#"}
            className="btn btn-primary mg-r-10" onClick={onSubmit}>Submit</a>
          <a href={"#"}
            className="btn btn-light btn-cancel-form">Cancel</a>
        </div>
      </div>
      <h6 className="mg-b-15">10 student has comment for this teacher:
                            </h6>
      <div className="comment__wrapper">
        <div className="tc-comment">
          <img src="../../assets/img/bg-status2.jpg" alt="avatar "
            className="avatar avatar rounded-circle" />
          <div className="tc-content">
            <div className="box">
              <p className="teacher-name">Kelly Clarkson</p>
              <p className="mg-b-0">Lorem ipsum dolor sit, amet
                                      consectetur adipisicing elit. <br />Error
                                      earum molestias consequatur, iusto
                                      accusantium minima est saepe porro id odit
                                      nam, numquam voluptates quis repudiandae
                                      veniam. Provident illum et voluptate. Lorem
                                      ipsum dolor sit, amet consectetur
                                      adipisicing elit. Quaerat aliquam magni
                                      impedit vitae sit expedita totam labore
                                      neque, dolores eos veritatis? Qui nisi, ipsa
                                      nostrum nulla labore esse dicta. Aspernatur.
                                    </p>
            </div>
            <div className="meta">
              <div className="date">Comment at 10:30 AM | 20/10/2020</div>
            </div>
            <a href={"#"} className="edit-box"><i
              className="fa fa-edit"></i></a>
          </div>
        </div>
        <div className="tc-comment">
          <img src="../../assets/img/bg-status2.jpg" alt="avatar "
            className="avatar avatar rounded-circle" />
          <div className="tc-content">

            <div className="box">
              <p className="teacher-name">Kelly Clarkson</p>
              <p className="mg-b-0">Lorem ipsum dolor sit, amet
                                        consectetur adipisicing elit. <br />Error
                                        earum molestias consequatur, iusto
                                        accusantium minima est saepe porro id odit
                                        nam, numquam voluptates quis repudiandae
                                        veniam. Provident illum et voluptate. Lorem
                                        ipsum dolor sit, amet consectetur
                                        adipisicing elit. Quaerat aliquam magni
                                        impedit vitae sit expedita totam labore
                                        neque, dolores eos veritatis? Qui nisi, ipsa
                                        nostrum nulla labore esse dicta. Aspernatur.
                                      </p>
            </div>
            <div className="meta">
              <div className="date">Comment at 10:30 AM | 20/10/2020</div>
            </div>
            <a href={"#"} className="edit-box"><i
              className="fa fa-edit"></i></a>
          </div>
        </div>
        <div className="tc-comment">
          <img src="../../assets/img/bg-status2.jpg" alt="avatar "
            className="avatar avatar rounded-circle" />
          <div className="tc-content">
            <div className="box">
              <p className="teacher-name">Kelly Clarkson</p>
              <p className="mg-b-0">Lorem ipsum dolor sit, amet
                                          consectetur adipisicing elit. <br />Error
                                          earum molestias consequatur, iusto
                                          accusantium minima est saepe porro id odit
                                          nam, numquam voluptates quis repudiandae
                                          veniam. Provident illum et voluptate. Lorem
                                          ipsum dolor sit, amet consectetur
                                          adipisicing elit. Quaerat aliquam magni
                                          impedit vitae sit expedita totam labore
                                          neque, dolores eos veritatis? Qui nisi, ipsa
                                          nostrum nulla labore esse dicta. Aspernatur.
                                        </p>
            </div>
            <div className="meta">
              <div className="date">Comment at 10:30 AM | 20/10/2020</div>
            </div>
            <a href={"#"} className="edit-box"><i
              className="fa fa-edit"></i></a>
          </div>
        </div>
        <div className="tc-comment">
          <img src="../../assets/img/bg-status2.jpg" alt="avatar "
            className="avatar avatar rounded-circle" />
          <div className="tc-content">
            <div className="box">
              <p className="teacher-name">Kelly Clarkson</p>
              <p className="mg-b-0">Lorem ipsum dolor sit, amet
                                            consectetur adipisicing elit. <br />Error
                                            earum molestias consequatur, iusto
                                            accusantium minima est saepe porro id odit
                                            nam, numquam voluptates quis repudiandae
                                            veniam. Provident illum et voluptate. Lorem
                                            ipsum dolor sit, amet consectetur
                                            adipisicing elit. Quaerat aliquam magni
                                            impedit vitae sit expedita totam labore
                                            neque, dolores eos veritatis? Qui nisi, ipsa
                                            nostrum nulla labore esse dicta. Aspernatur.
                                          </p>
            </div>
            <div className="meta">
              <div className="date">Comment at 10:30 AM | 20/10/2020</div>
            </div>
            <a href={"#"} className="edit-box"><i
              className="fa fa-edit"></i></a>
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation" className="mg-t-15">
        <ul className="pagination mg-b-0 justify-content-end">
          <li className="page-item disabled"><a
            className="page-link page-link-icon" href="#"><i
              data-feather="chevron-left"></i></a></li>
          <li className="page-item active"><a className="page-link"
            href="#">1</a></li>
          <li className="page-item"><a className="page-link"
            href="#">2</a></li>
          <li className="page-item"><a className="page-link"
            href="#">3</a></li>
          <li className="page-item"><a
            className="page-link page-link-icon" href="#"><i
              data-feather="chevron-right"></i></a></li>
        </ul>
      </nav>
    </div>
  )
}
export default StudentComment;