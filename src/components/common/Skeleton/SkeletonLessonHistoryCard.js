import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonLessonHistoryCard = () => {
    return (
      <section>
        <ul className="list pl-0">
          {Array(3)
            .fill()
            .map((item, index) => (
              <li className="card" key={index} style={{margin:`5px 0`, padding: `5px`}}>
                <h4 className="card-title">
                <Skeleton height={50} width={`80%`} /> &nbsp;
                  <Skeleton height={50} width={`10%`} />
                </h4>
              </li>
            ))}
        </ul>
      </section>
    );
  };

  export default SkeletonLessonHistoryCard;