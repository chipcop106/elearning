
const NotificationItem = ({ title, thumnail, author, time, content }) => {
    return (
        <div className="card card-event">
            <img src={thumnail} className="card-img-top" alt="" />
            <div className="card-body tx-13">
                <h5><a href="blog-detail.html" className="tx-16">{title}</a></h5>
                <p className="meta mg-t-5">
                    <a href="#" className="author">{author}</a>
                    <span className="tx-12 tx-color-03">{time}</span>
                </p>
                <p className="mg-b-0 mg-t-10">{content}</p>
            </div>
        </div>
    )
}

export default NotificationItem;