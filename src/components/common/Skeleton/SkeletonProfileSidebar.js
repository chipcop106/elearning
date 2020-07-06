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
    padding: "10px",
    width:"200px",
    maxWidth: "100%",
}
const SkeletonProfileSidebar = () => {
    return (
      <section className="pr-3">
      <section style={styleSection}>
        <div style={styleWrapper}>
           <div className="w-100 mb-1 text-center">
            <Skeleton duration={2} circle={true} width={120} height={120}/>
           </div>
           <div className="w-100 mb-1">
            <Skeleton width={`80%`} height={20}/>
           </div>
           <div className="w-100 mb-1">
            <Skeleton width={`100%`} height={50}/>
           </div>
           <div className="w-100 mb-1">
            <Skeleton width={`80%`} height={20}/>
           </div>
           <div className="w-100 mb-1">
            <Skeleton width={`100%`} height={50}/>
           </div>
           <div className="w-100 mb-1">
            <Skeleton width={`80%`} height={20}/>
           </div>
           <div className="w-100 mb-1">
            <Skeleton width={`100%`} height={50}/>
           </div>
        </div>
      </section>
      </section>
    );
  };

  export default SkeletonProfileSidebar;