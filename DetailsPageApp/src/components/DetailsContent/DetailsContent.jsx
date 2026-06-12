import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import "./DetailsContent.scss";

const API_URL = "http://localhost:5555";

const DetailsContent = (props) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [date, setDate] = useState("01/02/2022");
  const [time, setTime] = useState("10 Am");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect( () => {
    const fetchMovie = async()=>{
      try{
        setLoading(true)
        setError("")

        const resp = await fetch(`${API_URL}/movies/${id}`);
        console.log({resp})

        if (!resp.ok) {
          throw new Error("Movie not found");
        }

        const data = await resp.json();
        setMovie(data)
      }catch(err){
        setError(err.message || "failed to fetch movie detail.")
      }finally{
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id]);

  const bookMovie = () => {
    const booking = {
      movie: movie.id,
      date,
      time,
    };

    console.log({booking})
  };

  if (loading) return <div>Loading movie detail...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="details-content-container">
      <div className="details-content-row">
        <img src={`${API_URL}/images/${movie.imageUrl}`} alt={movie.name} />

        <div className="details-content-column ml-2">
          <div>
            <h3 className="movie-title">{movie.name}</h3>
            <br/>
            <span>{movie.description}</span>
          </div>
        </div>
      </div>

      <hr/>

      <div className="details-content-column align-center">
        <div className="details-content-book-movie">
          <span className="mb-2">Book Movie</span>
          <select
            className="mb-2"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          >
            <option value="01/02/2022">01/02/2022</option>
            <option value="02/02/2022">02/02/2022</option>
            <option value="03/02/2022">03/02/2022</option>
            <option value="04/02/2022">04/02/2022</option>
            <option value="05/02/2022">05/02/2022</option>
          </select>

          <select
            className="mb-2"
            onChange={(e) => setTime(e.target.value)}
            value={time}
          >
            <option value="10 Am">10 Am</option>
            <option value="12:30 PM">12:30 PM</option>
            <option value="4 PM">4 PM</option>
            <option value="8 PM">8 PM</option>
            <option value="9:30 PM">9:30 PM</option>
          </select>

          <button onClick={bookMovie}>Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default DetailsContent;
