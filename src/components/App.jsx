import React, { useState, useEffect } from "react";
import "../assets/css/App.scss";
import Header from "./Header.jsx";
import Movie from "./Movie.jsx";
import Search from "./Search.jsx";

const MOVIE_API_URL = "https://www.omdbapi.com/?apikey=4a3b711b&s=man&plot=full"; // you should replace this with yours

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  // mount時のみの処理（第２引数に空の配列）
  useEffect(() => {
    // なんかuseEffectのコールバック関数にasync関数は非推奨らしい
    (async function() {
      const initRequest = await fetch(MOVIE_API_URL);
      const initJson = await initRequest.json()

      setMovies(initJson.Search);
      setLoading(false);
    })();
  }, []);

  const search = async (searchValue) => {
    setLoading(true);
    setErrorMessage(null);

    const request = await fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`);
    const json = await request.json();

    if (json.Response === "True") {
      console.log(json.Search);
      setMovies(json.Search);
    } else {
      setErrorMessage(json.Error);
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <ul className="movies">
        {loading && !errorMessage ? (
          // loding === true && errorMessage === null のとき
          // loding画面表示
        <span>loading...</span>

        ) : errorMessage ? (
          // loding === true && errorMessage !== null のとき
          // エラーメッセージ表示
          <div className="errorMessage">{errorMessage}</div>

        ) : (
          // loding === false && errorMessage === null のとき
          // componentをループで回すときはmapを使うらしい
          movies.map((movie) => (
            <Movie key={movie.imdbID} movie={movie} />
          ))
        )}
      </ul>
    </div>
  );
};

export default App;