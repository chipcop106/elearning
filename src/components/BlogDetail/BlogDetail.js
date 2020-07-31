import React from 'react'
import ReactDOM from 'react-dom'
import SkeletonBlogCard from "~components/common/Skeleton/SkeletonBlogCard"
import { getNotificationDetailAPI } from "~src/api/studentAPI"
import { getFormattedDate } from "~src/utils"
import { NOT_DATA_FOUND } from "~components/common/Constant/message"

import styles from "~components/BlogDetail/BlogDetail.module.scss"
const BlogDetail = () => {
  const [state, setState] = React.useState(null)
  const [loading, setLoading] = React.useState(false);

  const getAPI = async (params) => {
    setLoading(true);
    const res = await getNotificationDetailAPI(params);
    if (res.Code === 1) {
      setState(res.Data)
    }
    setLoading(false);
  }

  React.useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let ID = params.get('ID');
    getAPI({
      NotificationID: ID,
    });
  }, []);

  return  <div className="media-body">
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb breadcrumb-style1 mg-b-30">
        <li className="breadcrumb-item tx-primary">
          <a href="ElearnStudent/notification"><i className="fas fa-bell mg-r-5"></i> Notification</a></li>
        {
          !!state && <li className="breadcrumb-item active"
            aria-current="page">{state.NotificationTitle}</li>
        }
      </ol>
    </nav>
    {
      loading ? <SkeletonBlogCard /> : <>
        {
          !!state ? <div className="content-blog pd-15 shadow rounded-5">
            <div className="post-detail-cover">
              <img src={state.NotifictionIMG} alt="banner" className="banner-img" />
            </div>
            <div className="post-content">
              <div className="thread_title">
                <span>{state.NotificationTitle}</span>
              </div>
              <div className="author">
                {/* <a href={"#"} className="avatar">
              <img src={state.IMG ? state.IMG : "../assets/img/default-avatar.png"} alt="avatar" />
              </a> */}
                <div className="author-information">
                  <span className="main-color bg-transparent username">
                    <span className="hasVerifiedBadge">{state.CreatedBy}</span></span>
                  <div className="date-comment-view">
                    <span className="date"><span className="DateTime" title={moment(state.CreatedDate).format("LLLL")}>{getFormattedDate(state.CreatedDate)}</span></span>
                  </div>
                </div>
              </div>
              <article dangerouslySetInnerHTML={{ __html: state.NotificationContent }}></article>
            </div>
          </div> : <NOT_DATA_FOUND />
        } </>
    }
  </div>
}

ReactDOM.render(<BlogDetail />, document.getElementById('react-blog-detail'));