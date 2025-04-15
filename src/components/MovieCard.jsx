import React from "react";

function MovieCard({
  movie: { title, poster_path, release_date, original_language, vote_average },
}) {
  return (
    <li className="movie-card">
      <img
        className="movie-card__image"
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-poster.png"
        }
        alt={title}
      />
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="/rating.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>
          <span>.</span>
          <p className="lang">{original_language}</p>
          <span>.</span>
          <p className="year">
            {release_date ? release_date.slice(0, 4) : "N/A"}
          </p>
        </div>
      </div>
    </li>
  );
}

export default MovieCard;
