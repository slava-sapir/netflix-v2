import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { PlayArrow, Add, ThumbUpAltOutlined, ThumbDownAltOutlined }  from '@material-ui/icons';
import movieTrailer from 'movie-trailer';
import './listItem.scss';

export default function ListItem( { movie, index } ) {

  const [isHovered, setIsHovered] = useState(false);
  const [youtubeId, setYouTubeId] = useState('');

  const videoSourse =`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&modestbranding=1&controls=0>`;
  const image_path = `https://image.tmdb.org/t/p/original`;

  useEffect( () => {

    const trailerPath = () => {
      movieTrailer(movie?.original_title || movie?.original_name || movie?.name || movie?.title)
      .then((url) => {
        if(url) {
          const urlParam = url.split('=');
          setYouTubeId(urlParam[1]);
        }
      })
        .catch((err) => console.log(err))  
    }
    trailerPath();

  }, [])
    
    return (
      <Link className='link' to='/watch' state={{youtubeId}}>
        <div className='listItem'
          style={{left: isHovered && index*225 - 50 + index*2.5}}
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)} 
        >
        <img
          src={ movie.backdrop_path === null ? 'https://via.placeholder.com/225X140?text=image+lost'
              : image_path + `${ movie?.backdrop_path || movie.poster_path }`
              }
          alt=""
        />
          {isHovered && (
          <>
          <iframe className='video' title="video frame" src={videoSourse}></iframe>
          <div className='itemInfo'>
            <div className='icons'>
              <PlayArrow className='icon'/>
              <Add className='icon'/>
              <ThumbUpAltOutlined className='icon'/>
              <ThumbDownAltOutlined className='icon'/>
            </div>
                <div className='itemInfoTop'>
                  <span>{movie.original_title || movie.original_name || movie.name}</span>
                  <span className='limit'>{movie.adult ? '16+' : 'Any age' }</span>
                  <span>{movie.release_date || movie.first_air_date}</span>
                </div>
              <div className='desc'>
                { movie.overview }
              </div>
            <div className='genre'>{movie.media_type ? `Type : ${movie.media_type}` : '' }</div>
          </div>
          </>
          )}
        </div>
      </Link>
 );
}
