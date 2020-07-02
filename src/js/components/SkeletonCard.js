import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonCard = () => {
    return (
      <section>
        <ul className="list">
          {Array(3)
            .fill()
            .map((item, index) => (
              <li className="card" key={index} style={{margin:"15px 0", padding: "15px"}}>
                <Skeleton height={180} />
                <h4 className="card-title">
                <Skeleton circle={true} height={50} width={50} /> &nbsp;
                  <Skeleton height={36} width={`80%`} />
                </h4>
                <p className="card-channel">
                  <Skeleton width={`60%`} />
                </p>
                <div className="card-metrics">
                  <Skeleton width={`90%`} />
                </div>
              </li>
            ))}
        </ul>
      </section>
    );
  };

  export default SkeletonCard;