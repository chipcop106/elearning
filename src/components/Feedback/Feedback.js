import React from 'react';
import ReactDOM from 'react-dom';
import SkeletonFeedback from "~components/common/Skeleton/SkeletonFeedback";
import Pagination from "react-js-pagination";

const initialState = {
  averageRate: 4.5,
  feedbacks: [
  {   
    id:randomId(),
    stName: 'Truong Van Lam',
    stAvatar: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
    stFeedback: 'This course is so great',
    lessonTime: '12/06/2020 10:30AM (Vietnam Time)',
    lessonName: 'Lesson 6: ReactJS application',
    rating: '3.5',
    teacherComments: [
    {
      id:randomId(),
      dateTime: new Date(),
      teacherName: 'Kelly Clarkson',
      teacherAvatar: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
      content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error earum
      molestias consequatur, iusto accusantium minima est saepe porro id odit nam, numquam
      voluptates quis repudiandae veniam. Provident illum et voluptate. Lorem ipsum dolor sit,
      amet consectetur adipisicing elit. Quaerat aliquam magni impedit vitae sit expedita totam
      labore neque, dolores eos veritatis? Qui nisi, ipsa nostrum nulla labore esse dicta.
      Aspernatur`,
      edited:false,
    },
    {
      id:randomId(),
      dateTime: new Date(),
      teacherName: 'Holy Breaker',
      teacherAvatar: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
      content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error earum
      molestias consequatur, iusto accusantium minima est saepe porro id odit nam, numquam
      voluptates.`,
      edited:false,
    }
    ]
  },
  {   
    id:randomId(),
    stName: 'Truong Van Lam',
    stAvatar: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
    stFeedback: 'This course is so great',
    lessonTime: '12/06/2020 10:30AM (Vietnam Time)',
    lessonName: 'Lesson 6: ReactJS application',
    rating: '5',
    teacherComments: [],
  },
  {
    id:randomId(),
    stName: 'Truong Van Lam',
    stAvatar: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
    stFeedback: 'Hello my world',
    lessonTime: '12/06/2020 10:30AM (Vietnam Time)',
    lessonName: 'Lesson 6: ReactJS application',
    rating: '1',
    teacherComments: [
    {
      id:randomId(),
      dateTime: new Date(),
      teacherName: 'Kelly Clarkson',
      teacherAvatar: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
      content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error earum
      molestias consequatur, iusto accusantium minima est saepe porro id odit nam, numquam
      voluptates quis repudiandae veniam. Provident illum et voluptate. Lorem ipsum dolor sit,
      amet consectetur adipisicing elit. Quaerat aliquam magni impedit vitae sit expedita totam
      labore neque, dolores eos veritatis? Qui nisi, ipsa nostrum nulla labore esse dicta.
      Aspernatur`,
      edited:false,
    },
    {
      id:randomId(),
      dateTime: new Date(),
      teacherName: 'Holy Breaker',
      teacherAvatar: 'https://i.pinimg.com/236x/aa/84/88/aa8488c0bdc927ac836586c004c7cb12.jpg',
      content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error earum
      molestias consequatur, iusto accusantium minima est saepe porro id odit nam, numquam
      voluptates.`,
      edited:false,
    }
    ]
  }
  ]
}

const TeacherComment = ({dateTime, teacherName, teacherAvatar, content }) => {
  return <div className="tc-comment">
  <img src={teacherAvatar} alt="avatar" className="avatar avatar rounded-circle" />
  <div className="tc-content">
  <div className="box">
  <p className="teacher-name">{teacherName}</p>
  <p className="mg-b-0">{content}</p>
  </div>
  <div className="meta">
  <div className="date">Comment at {moment(dateTime).format("LLLL")}</div>
  </div>
  </div>
  </div>
}

const Feedback = () => {
  const [page, setPage] = React.useState(1)
  const [state, setState] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);

  const handlePageChange = (pageNumber) =>  {
    setPage(pageNumber);
  }

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <React.Fragment>
    <div className="d-xl-flex align-items-center justify-content-between mg-b-30">
    <h4 className="mg-b-0 gradient-heading"><i className="fas fa-comment-dots"></i> FEEDBACK</h4>
    </div>
    <div className="mg-t-30 feedback-container">
    <div className="fb-summary-container">
    <p className="tx-16">Last 100 Parent Feedback Average: <span className="tx-warning tx-20 tx-bold">{state.averageRate}</span></p>
    <p className="tx-gray-500 tx-14">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus iure doloremque aperiam neque, tenetur harum soluta non pariatur explicabo sed ab vero assumenda dolore molestias, dicta voluptates officiis error tempora?</p>
    <div className="fb-summary">
    <div className="fb-type">
    <div className="fb-radio">
    <label>
    <input type="radio" name="fbType" group="feedback" defaultChecked />
    <span>All comments <span className="number">{state.feedbacks.length}</span></span>
    </label>
    </div>
    </div>
    <div className="fb-type">
    <div className="fb-radio">
    <label>
    <input type="radio" name="fbType" group="feedback" />
    <span>Excellent <span className="number">882</span></span>
    </label>
    </div>
    </div>
    <div className="fb-type">
    <div className="fb-radio">
    <label>
    <input type="radio" name="fbType" group="feedback" />
    <span>Good <span className="number">10</span></span>
    </label>
    </div>
    </div>
    <div className="fb-type">
    <div className="fb-radio">
    <label>
    <input type="radio" name="fbType" group="feedback" />
    <span>Unsatosfactory <span className="number">2</span></span>
    </label>
    </div>
    </div>
    </div>
    </div>
    {
      loading?<SkeletonFeedback/>:
      <div className="fb-list">
      {
        !!state && !!state.feedbacks && state.feedbacks.length > 0 && state.feedbacks.map(item=>
          <div className="fb-item" key={item.id}>
          <div className="fb-avatar">
          <img src={item.stAvatar} alt="avatar" className="avatar" />
          </div>
          <div className="fb-info">
          <div className="name-rating">
          <p className="name">{item.stName}</p>
          <div className="rating-wrap">
          <div className="rating">
          <i className="fas fa-star-half-alt"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          </div>
          </div>
          </div>
          <div className="feedback-comment">
          <p className="">{item.stFeedback}</p>
          </div>
          <div className="metas">
          <div className="meta">
          className Time: <span>{item.lessonTime}</span>
          </div>
          <div className="meta">
          {item.lessonName}
          </div>
          </div>
          {
            !! item.teacherComments && Array.isArray(item.teacherComments) && 
            item.teacherComments.length > 0 && 
            <div className="tc-comment-wrap">
            <h6 className="mg-b-15">The teacher had commented on this feedback:</h6>
            {
              item.teacherComments.map(tcComment=>
                <TeacherComment
                key={tcComment.id}
                dateTime={tcComment.dateTime}
                teacherName={tcComment.teacherName}
                teacherAvatar={tcComment.teacherAvatar}
                content={tcComment.content}/>)
            }
            </div>
          }
          </div>
          </div>
          )
      }
      </div>
    }
    </div>
    <Pagination
                innerClass="pagination justify-content-end mt-3"
                activePage={page}
                itemsCountPerPage={10}
                totalItemsCount={450}
                pageRangeDisplayed={5}
                itemClass="page-item"
                linkClass="page-link"
                onChange={handlePageChange.bind(this)}
            />
    </React.Fragment>
    )
}

ReactDOM.render(<Feedback />, document.getElementById('react-feedback'));






