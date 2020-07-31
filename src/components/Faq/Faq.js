import React from 'react';
import ReactDOM from 'react-dom';
import SkeletonFaq from "~components/common/Skeleton/SkeletonFaq";
import { getFaqAPI } from "~src/api/studentAPI";

const Faq = () => {
  const [state, setState] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getAPI = async () => {
    setLoading(true);
    const res = await getFaqAPI();
    if (res.Code === 1) {
      setState(res.Data)
    }
    setLoading(false);
  }

  React.useEffect(() => {
    getAPI();
  }, []);

  return <React.Fragment>
    <div className="faq-image tx-center">
      <img src="../assets/img/faq.svg" alt="faq" className="wd-300" />
    </div>
    <div className="faq-container">
      <div className="d-xl-flex align-items-center justify-content-between mg-b-15 mg-t-30">
        <h4 className="mg-b-0 gradient-heading"><i className="fas fa-comment-alt"></i> Frequently Asked Questions</h4>
      </div>
      {
        loading ? <SkeletonFaq /> :
          <div id="accordion">
            {
              !!state && state.length > 0 && state.map((item, index) =>
                <div className="card" key={item.ID}>
                  <div className="card-header" id={item.ID}>
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link collapsed"
                        data-toggle="collapse"
                        aria-expanded={index === 0 ? 'true' : 'false'}
                        data-target={`#collapse${item.ID}`}
                        aria-controls={`collapse${item.ID}`}>
                        {item.Title}
                      </button>
                    </h5>
                  </div>
                  <div
                    data-parent="#accordion"
                    id={`collapse${item.ID}`}
                    className={`${index === 0 ? 'show' : ''} collapse`}
                    aria-labelledby={item.ID} >
                    <div className="card-body" dangerouslySetInnerHTML={{ __html: item.FaqContent }}>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
      }
    </div>
  </React.Fragment>
}

ReactDOM.render(<Faq />, document.getElementById('react-faq'));