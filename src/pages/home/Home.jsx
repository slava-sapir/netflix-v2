
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import Navbar from '../../components/navbar/Navbar';
import './home.scss';

const Home = ( { type } ) => {
  
  const api_key = process.env.REACT_APP_API_KEY;
  const type_all = `https://api.themoviedb.org/3/trending/all/week?api_key=${api_key}&language=en-US&sort_by=popularity.desc`;
  const media_type = `https://api.themoviedb.org/3/discover/${type}?api_key=${api_key}&language=en-US&sort_by=popularity.desc`;
  
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const media = genre ? (media_type + `&with_genres=${genre}`) : media_type;
  const link = type ? media : type_all;

  useEffect(() => {
    const lists = [];
    const getLists = async () => {
      try {
          for(let page = 1; page < 6; page ++) {
              const { data } = await axios.get(link + `&page=${page}`);
              lists.push(data);
          }
           setLists(lists);
      } catch (err) {
        console.log(err);
      }
    };
    getLists();
  }, [type, genre]);


  return (
    <div className='home'>
        <Navbar />
        <Featured type={type} setGenre={setGenre}/>
         { lists?.map((list, i) => 
          <List list={list} key={i}/>
        )}
    </div>
  )
}

export default Home;