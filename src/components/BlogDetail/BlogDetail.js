import React from 'react'
import ReactDOM from 'react-dom'
import SkeletonBlogCard from "~components/common/Skeleton/SkeletonBlogCard"
import { getNotificationDetail } from "~src/api/studentAPI"
import { getFormattedDate } from "~src/utils"

const BlogDetail = () => {
  const [state, setState] = React.useState({})
  const [loading, setLoading] = React.useState(false);

  const getAPI = async (params) => {
    setLoading(true);
    const notification = await getNotificationDetail({
      NotificationID: params.NotificationID
    });
    setState(notification.Data)
    setLoading(false);
  }

  React.useEffect(() => {
    getAPI({
      NotificationID: "1"
    });
  }, []);

  return (
    loading ? <SkeletonBlogCard /> : <React.Fragment>
      <div className="content-blog bd-0-f">
        <div className="post-detail-cover">
          <img src={state.NotifictionIMG} alt="banner" className="banner-img" />
        </div>
        <div className="post-content">
          <div className="thread_title">
            <span>{state.NotificationTitle}</span>
          </div>
          <div className="author">
            <a href={"#"} className="avatar"><img src="../assets/img/teacher.jpg" alt="avatar" /></a>
            <div className="author-info">
              <a href={"#"} className="username"><span className="hasVerifiedBadge">{state.CreatedBy}</span></a>
              <div className="date-comment-view">
                <span className="date"><span className="DateTime" title="11:20 ngày 2/10/19">{getFormattedDate(state.CreatedDate)}</span></span>
                {/* <span className="comment">Comment: 7</span>
                <span className="comment">Like: 32</span> */}
              </div>
            </div>
          </div>
          <article>
            {/* <blockquote className="messageText">
              Dành tặng cho các học viên tại E-learn khi giới thiệu và giúp bạn bè đăng ký học khóa học tại E-learn để cải thiện ngay trình độ Tiếng Anh. <br /> Cụ thể như sau:<br />
              •	Bạn sẽ được nhận ngay 1.000.000 VND / lần khi giới thiệu bạn bè đăng kí thành công khóa học tiếng Anh tại E-learn.<br />
              •	Người được bạn giới thiệu cũng sẽ được giảm đến 1.000.000 VND học phí tùy vào gói học đã đăng ký.<br />
              •	Người được giới thiệu là học viên mới chưa từng sử dụng sản phẩm và dịch vụ của E-learn.<br /><br />
              Hãy cùng E-learn giúp các bạn học được đắm chìm trong môi trường học Tiếng Anh 1-1 với giáo viên bản ngữ nhé.<br />
              Mỗi ngày chỉ cần dành 25 – 50 phút nghe nói thỏa thích, các bạn có thể giao tiếp Tiếng Anh tự tin với người nước ngoài.<br /><br />
              <h6 className="">Cách thức đăng ký chương trình:</h6>
              •	Học viên hoặc phụ huynh của học viên khi giới thiệu bạn đến học tại E-learn vui lòng gửi thông tin người được bạn giới thiệu cho chuyên viên tư vấn.<br />
              •	Người được giới thiệu khi đăng ký thành công khóa học tại E-learn vui lòng đề cập tên học viên giới thiệu để được giảm học phí ngay cho học phí lần đầu này.<br />
            </blockquote> */}
            {
              state.NotificationContent
            }
          </article>
        </div>
      </div>
    </React.Fragment>
  )
}

ReactDOM.render(<BlogDetail />, document.getElementById('react-blog-detail'));