const initPoster = "./noimage.jpg";

const Movie = ({ movie }) => {
  const poster = movie.Poster === "N/A" ? initPoster : movie.Poster;
  return (
    <li className="p-movie">
      <h2 className="p-movie__title">{movie.Title}</h2>
      <div className="p-movie__content">
        <img
          className="p-movie__img"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
      </div>
      <p className="p-movie__year">{movie.Year}年公開</p>
    </li>
  );
};


export default Movie;