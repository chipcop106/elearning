import React from "react";
import Skeleton from "react-loading-skeleton";

let styleWrapper = {
  display: "flex",
  flexDirection: 'column',
  flexWrap: "wrap",
}
const SkeletonProfileSidebar = () => {
  return (
    <div className="profile-sidebar pd-lg-r-25">
      <div className="sidebar-overlay"></div>
      <div style={styleWrapper}>
        <div className="w-100 mg-b-15">
          <Skeleton circle={true} width={100} height={100} />
        </div>
        <div className="w-100" style={{marginBottom: "40px"}}>
          <Skeleton width={`80%`} height={30} />
        </div>
        <div className="w-100 mb-2 pd-l-10 text-left">
          <Skeleton width={120} height={20} />
        </div>
        <div className="w-100 mb-2 pd-l-10 text-left">
          <Skeleton width={80} height={20} />
        </div>
        <div className="w-100 mb-2 pd-l-10 text-left">
          <Skeleton width={100} height={20} />
        </div>
        <div className="w-100 mb-2 pd-l-10 text-left">
          <Skeleton width={85} height={20} />
        </div>
        <div className="w-100 mb-2 pd-l-10 text-left">
          <Skeleton width={113} height={20} />
        </div>
        <div className="w-100 mb-2 pd-l-10 text-left">
          <Skeleton width={104} height={20} />
        </div>
        <div className="w-100 mb-2 pd-l-10 text-left">
          <Skeleton width={75} height={20} />
        </div>
        <div className="w-100 mb-4 pd-l-10 text-left">
          <Skeleton width={35} height={20} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonProfileSidebar;