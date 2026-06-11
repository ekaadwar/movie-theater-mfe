import React, { Suspense, useEffect, useState } from "react";
import QuickBooking from "../QuickBooking/QuickBooking.jsx";
import "./HomeContent.scss";

const MovieCard = React.lazy(()=>import("component/MovieCard"))

const dummyItem = [{id:"dummy", name:"Dummy Movie"}]

const HomeContent = (props) => {
  const [movies, setMovies] = useState(dummyItem);

  useEffect( () => {
    const fetchMovies = async()=>{
      try{
        const resp = await fetch("http://localhost:5555/movies")
        const data = await resp.json()
        setMovies(data)
      }catch(error){
        console.error("Failed to fetch movies: ", error)
      }
    }

    fetchMovies()
  }, []);

  const movieClicked = (item) => {
    if (typeof props.movieClicked === "function") {
      props.movieClicked(item);
    }
  };

  const renderMovieList = () => {
    return movies.map((item) => {
      return (
        <div onClick={() => movieClicked(item)} key={item.id}>
          <Suspense fallback={<div>Loading movie card...</div>}>
            <MovieCard title={item.name} imageUrl={item.imageUrl} />
          </Suspense>
        </div>
      );
    });
  };

  return (
    <div className="home-content-container">
      <QuickBooking/>
      <div className="movies-container">
        {renderMovieList()}
      </div>
    </div>
  );
};

export default HomeContent;
