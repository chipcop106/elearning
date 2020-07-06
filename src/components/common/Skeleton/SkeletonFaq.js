import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonLessonHistoryCard = () => {
    return (
      <section>
        <ul className="list" style={{paddingLeft:'0'}}>
          {Array(3)
            .fill()
            .map((item, index) => (
              <li className="card" key={index} style={{margin:'5px', padding: `5px`}}>
                <div>
                <Skeleton height={20} width={`40%`} />
                </div>
                <div>
                <Skeleton height={20} width={`100%`} />
                <Skeleton height={20} width={`100%`} />
                </div>
              </li>
            ))}
        </ul>
      </section>
    );
  };

  export default SkeletonLessonHistoryCard;