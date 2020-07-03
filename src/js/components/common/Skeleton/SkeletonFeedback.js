import React from "react";
import Skeleton from "react-loading-skeleton";

let styleWrapper={
    margin: "5px",
    padding: "15px 15px 15px 0",
    display: "flex",
    flexDirection:'row',
    flexWrap: "wrap",
    borderRadius: "5px",
}
const SkeletonFeedback = () => {
    return (
      <section>
        <ul className="list" style={{paddingLeft:'0'}}>
          {Array(3)
            .fill()
            .map((item, index) => (
              <li className="card" key={index} style={styleWrapper}>
                <div className="text-center" style={{width:'20%'}}>
                <Skeleton circle={true} height={100} width={100} />
                </div>
                <div style={{width:'80%'}}>
                <Skeleton className="mb-2" height={20} width={50} /><br/>
                <Skeleton className="mb-2" height={70} width={`100%`} /><br/>
                <Skeleton className="mb-2" height={20} width={`90%`}/><br/>
                <Skeleton className="mb-2" height={20} width={50}/><br/>
                </div>
              </li>
            ))}
        </ul>
      </section>
    );
  };

  export default SkeletonFeedback;