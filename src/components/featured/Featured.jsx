import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { InfoOutlined } from '@material-ui/icons';
import { PlayArrow } from '@material-ui/icons';
import movieTrailer from 'movie-trailer';
import './featured.scss';

export default function Featured ( { type, setGenre } ) {

  const api_key = process.env.REACT_APP_API_KEY;
  const movie_link = `https://api.themoviedb.org/3/trending/all/week?api_key=${api_key}&language=en-US`;
  const image_path = `https://image.tmdb.org/t/p/original`;

  const [movie, setMovie] = useState({ original_title: "Nightmare Alley"});
  const [youtubeId, setYouTubeId] = useState('');

  useEffect( () => {
  const getMovie = async () => {
      try {
        const { data } = await axios.get(movie_link);
        setMovie(data.results[Math.floor(Math.random() * 10)]);
        } catch(err) {
           console.log(err)
        }
      }
     getMovie();
  },[type]);

  const trailerPath = async () => {
    try {
        const url = await movieTrailer((
            movie?.original_title || movie?.original_name || movie?.name || movie?.title));
        const urlParam = url.split('=');
        setYouTubeId(urlParam[1]);
    } catch( err ) {
        console.log(err)
    } 
 }
  trailerPath();

  return (
    <div className='featured'>
        {type && (
            <div className='category'>
                <span>{ type === "movie" ? "Movies" : "Series"}</span>
                <select 
                 name='genre' id='genre'
                 onChange={(e) => setGenre(e.target.value) }
                >
                    <option value="none">Genre</option>
                    <option value="35">Comedy</option>
                    <option value="80">Crime</option>
                    <option value="9648">Fantasy</option>
                    <option value="10749">Romance</option>
                    <option value="10751">Kids and Family</option>
                    <option value="37">Western</option>
                    <option value="16">Animation</option>
                    <option value="18">Drama</option>
                    <option value="99">Documentary</option>
                </select>
            </div>
        )}
    
    <img src={ image_path + `${ movie?.backdrop_path || movie.poster_path }` } alt="" />
    <div className='info'>
    <span className='movieTitle'>
        { movie?.original_title || movie?.original_name || movie?.name || movie?.title }
    </span>
    <span className='desc'>
        { movie?.overview }
    </span>
    <div className='buttons'>
    <Link className='link' to='/watch' state={{youtubeId}}>
        <button className='play'>
            <PlayArrow />
            <span>Play</span>
        </button>
    </Link>
        <button className='more'>
            <InfoOutlined />
            <span>Info</span>
        </button>
    </div>
    </div>
    </div>
  )
}


