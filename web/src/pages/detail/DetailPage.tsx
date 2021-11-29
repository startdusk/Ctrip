import React from "react";
import { useParams } from "react-router-dom";

interface DetailPageProps {}

export const DetailPage: React.FC<DetailPageProps> = () => {
  const { touristRouteId } = useParams();
  return <div>DetailPage: {touristRouteId}</div>;
};
