import React from 'react';
import ReactDOM from 'react-dom';
import SkeletonFaq from "../common/Skeleton/SkeletonFaq";

const Faq = () => {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
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
          loading?<SkeletonFaq/>:
            <div id="accordion">
          <div className="card">
            <div className="card-header" id="headingOne">
              <h5 className="mb-0">
                <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Khi nào tôi có thể đặt lịch học ?
                  </button>
              </h5>
            </div>
            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
              <div className="card-body">
                Hệ thống đặt lịch học của E-learn hoạt động 24 giờ 1 ngày, 7 ngày trong tuần.  Bạn có thể truy cập vào trang (để link để học sinh có thể sign in) và đăng nhập vào tài khoản của mình để đặt lịch học.
                </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingTwo">
              <h5 className="mb-0">
                <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Tôi có thể đặt một buổi học trước thời gian học bao lâu?
                  </button>
              </h5>
            </div>
            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
              <div className="card-body">
                Đặt một buổi học rất dễ dàng. Hệ thống đặt lịch học của E-learn luôn sẵn sàng phục vụ bạn bất cứ lúc nào và bạn có thể đặt các buổi học tối đa trước một tuần và tối đa 15 phút trước mỗi buổi học.
                </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingThree">
              <h5 className="mb-0">
                <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Tôi có thể hủy một buổi học trước thời gian học bao lâu?
                  </button>
              </h5>
            </div>
            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
              <div className="card-body">
                <p>Buổi học của bạn có thể bị hủy tối thiểu 30 phút trước giờ học.</p>
                <p>Để hủy một buổi học bạn cần Đăng nhập vào tài khoản của bạn và vào mục “Lịch Học”. Bạn sẽ thấy một danh sách tất cả các buổi học bạn đã đặt. Nhấn vào "Hủy Buổi Học" bên cạnh buổi học bạn muốn hủy.
                  (hình ảnh màn hình minh họa cho phần này)</p>
                <p> E-learn có thể hủy 1 buôỉ học của bạn trong trường hợp bất khả kháng.</p>
                <p>Trong trường hợp này E-learn sẽ thông báo cho bạn và sẽ không trừ buổi học này vào số buổi học bạn đã đăng ký.</p>
              </div>
            </div>
          </div>
        </div>
        }
      </div>
      </React.Fragment>
}

ReactDOM.render(<Faq />, document.getElementById('react-faq'));