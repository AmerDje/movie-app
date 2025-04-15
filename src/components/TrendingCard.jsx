import React from "react";

function TrendingCard({ movie: { poster_url, movie_id }, index }) {
  return (
    <li>
      <p>{index + 1}</p>
      <img src={poster_url} alt={movie_id} />
    </li>
  );
}

export default TrendingCard;
