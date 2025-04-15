import { useEffect, useState, React } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spiner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { updateSearchCount, getTrendingMovies } from "../appwrite";
import TrendingCard from "./components/TrendingCard";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const apiOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};

function App() {
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);
  const [errorMessageMovies, setErrorMessageMovies] = useState("");
  const [isTrendingLoading, setIsTrendingLoading] = useState(false);
  const [errorMessageTrending, setErrorMessageTrending] = useState("");
  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    2000,
    [searchTerm]
  );
  const fetchMovies = async (query = "") => {
    setIsMoviesLoading(true);
    setErrorMessageMovies("");
    try {
      // we added encodeURIComponent to handle special characters and spaces
      const endpoint = query
        ? `${baseUrl}/search/movie?query=${encodeURIComponent(query)}`
        : `${baseUrl}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, apiOptions);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessageMovies(data.Error || "Failed to fetch movies");
        setMovieList([]);
      }

      setMovieList(data.results || []);
      if (query && data.results.length > 0) {
        updateSearchCount(query, data.results[0]);
      }
    } catch (e) {
      setErrorMessageMovies(`Error Fetching Movies ${e.message}`);
    } finally {
      setIsMoviesLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    setIsTrendingLoading(true);
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      setErrorMessageTrending(`Error Fetching Movies ${error.message}`);
      console.log(error);
    } finally {
      setIsTrendingLoading(false);
    }
  };
  //listen to searchTerm changes and fires fetchMovies
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero-bg.png" alt="Hero Banner" />
            <h1>
              Find <span className="text-gradient">Movies</span> You'll Enjoy
              Without Hassle
            </h1>
            {/* we passed searchTerm and its set because we want to update with it the movies list and it wont update if we define it inside search component */}
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>
          <section className="trending">
            <h2>Trending Movies</h2>
            {isTrendingLoading ? (
              <Spinner />
            ) : errorMessageTrending ? (
              <p className="text-red-500">{errorMessageTrending}</p>
            ) : (
              <ul className="movie-list">
                {trendingMovies.map((movie, index) => (
                  //  Appwrite that uses $id as a standard for document IDs. and not in javascript
                  <TrendingCard key={movie.$id} movie={movie} index={index} />
                ))}
              </ul>
            )}
          </section>

          <section className="all-movies">
            {/* <h2 className="mt-[40px]">All Movies</h2> */}
            <h2>All Movies</h2>
            {isMoviesLoading ? (
              <Spinner />
            ) : errorMessageMovies ? (
              <p className="text-red-500">{errorMessageMovies}</p>
            ) : (
              <ul className="movie-list">
                {movieList.map((movie) => (
                  //key is a unique identifier needed so react knows what to render and to update
                  //every component has a predefined key property so we only assign it
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
            {/* this means if errorMessageMovies is not empty show the error message */}
            {/* {errorMessageMovies && <p className="text-red-500">{errorMessageMovies}</p>} */}
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import { useEffect, useState } from "react";
// import "./App.css";

// // useState for managing state (setState in flutter)
// // useEffect for handling side effects like data fetching (it runs after every ui build in the start and when we rebuild component)
// // useContext for sharing data across components
// // useCallback for optimizing callback functions

// //there are two types of components

// /* //Class Component
// //Not recommended to use
// class App extends React.Component {
//   render() {
//     return <h1>Class Component</h1>
//   }
// }*/

// //Function component
// /*
// function App() {
//   return (
//  <h1>Function Component</h1>
//   );
// }*/

// const App = () => {
//   return (
//     //when multiple must have a parent element which is now a fragment <> or regular div
//     //when you're passing props, values that are expressions (like arrays, objects, or variables) should be wrapped in curly braces ({}). This is because the curly braces tell React that you're passing JavaScript expressions as props rather than static values (like strings).
//     // in a nutshell props are always passed between {} excepts if they are a plain string
//     <div className="card-container">
//       <h1>Function Component</h1>
//       <Card title="Star Wars" year="1977" />
//       <Card title="Avatar" year="2009" />
//       <Card title="Lion King" year="1994" />
//     </div>
//   );
// };

// //props are passed in as an object to the component
// const Card = ({ title, year }) => {
//   const [count, setCount] = useState(0);
//   //every function starts with use in react is a hook
//   const [hasLiked, setHasLiked] = useState(false);
//   //const [variableGonnaChange (state), variableChanger] = useState(initialState)
//   //use effect is called in every state rebuild so we gonna use [] so it calls only when some variable changes
//   useEffect(() => {
//     console.log(`${title} has been Liked: ${hasLiked}`);
//     //fires only when hasLiked updated
//   }, [hasLiked]);

//   //when dependency list is defined and is empty, use effect fires only once at the mounting or creation or first appears of that component
//   useEffect(() => {
//     console.log("Created");
//   }, []);

//   return (
//     // when using props they should be between {}
//     <div
//       className="card"
//       //it is never recommended in react to update the state by using the state it self so we use a callback function
//       onClick={() => setCount((prevState) => prevState + 1)}
//       //  onClick={() => setCount(count + 1)}
//       // style={{
//       //   border: "1px solid #4b5362",
//       //   padding: "20px",
//       //   margin: "10px",
//       //   backgroundColor: "#31363f",
//       //   borderRadius: "10px",
//       //   minHeight: "100px",
//       // }}
//     >
//       <h2>
//         {title} <br /> {count || null}
//         {/* means count ? count : null, means if count is null dont show else show */}
//       </h2>
//       <p>{year}</p>
//       <button
//         onClick={() => {
//           //setHasLiked(!hasLiked);
//           setHasLiked((prevState) => !prevState);
//         }}
//       >
//         {hasLiked ? "❤️" : "🤍"}
//       </button>
//     </div>
//   );
// };
// export default App;
