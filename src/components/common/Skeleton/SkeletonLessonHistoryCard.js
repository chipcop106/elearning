import React from "react";
import Skeleton from "react-loading-skeleton";

const style = {
  display: "flex",
  justifyContent: "space-between",
}
const SkeletonLessonHistoryCard = () => {
  return (
    <tr>
      <th><Skeleton height={40} /></th>
      <th><Skeleton height={40} /></th>
      <th><Skeleton height={40} /></th>
      <th><Skeleton height={40} /></th>
      <th><Skeleton height={40} /></th>
      <th><Skeleton height={40} /></th>
  </tr>
  );
};

export default SkeletonLessonHistoryCard;