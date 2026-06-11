import React, { Suspense, useEffect, useState } from "react";
import QuickBooking from "../QuickBooking/QuickBooking.jsx";
import "./HomeContent.scss";

const MovieCard = React.lazy(()=>import("component/MovieCard"))

const dummyItem = [{name:"Dummy Movie"}]

const HomeContent = (props) => {
  const [movies, setMovies] = useState(dummyItem);

  useEffect(async () => {
    const resp = await fetch("http://localhost:5555/movies")
    const data = await resp.json()
    setMovies(data)
  }, []);

  const movieClicked = (item) => {
    if (typeof props.movieClicked === "function") {
      props.movieClicked(item);
    }
  };

  const renderMovieList = () => {
    let items = movies.map((item) => {
      return (
        <div onClick={() => movieClicked(item)} key={item.name}>
          <Suspense fallback={null}>
            <MovieCard title={item.name} imageUrl={item.imageUrl}></MovieCard>
          </Suspense>
        </div>
      );
    });

    return items;
  };

  return (
    <div className="home-content-container">
      <QuickBooking></QuickBooking>
      <div className="movies-container">
        {renderMovieList()}
      </div>
    </div>
  );
};

export default HomeContent;
