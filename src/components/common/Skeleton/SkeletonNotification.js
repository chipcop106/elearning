import React from "react";
import Skeleton from "react-loading-skeleton";

let styleWrapper={
    display: "flex",
    flexDirection:'column',
    flexWrap: "wrap",
}
let styleSection = {
    border: "1px solid #e1e1e1",
    borderRadius: "5px",
    padding: "10px"
}
const SkeletonNotification = () => {
    return (
      <section style={styleSection}>
        <div style={styleWrapper}>
           <div className="w-100 mb-3">
               <Skeleton width={`100%`} height={100}/>
           </div>
           <div className="w-100 mb-1">
            <Skeleton width={`100%`} height={30}/>
           </div>
           <div className="w-100 mb-1">
            <Skeleton width={`80%`} height={20}/>
           </div>
           <div className="w-100 mb-1">
            <Skeleton width={`100%`} height={50}/>
           </div>
        </div>
      </section>
    );
  };

  export default SkeletonNotification;