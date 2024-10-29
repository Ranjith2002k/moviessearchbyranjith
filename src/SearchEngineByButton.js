import { useState } from 'react';
import './App.css';
import React,{fragment} from './home';
import axios from 'axios';


function Btn_search_engine() {
  const [movieName,setMovieName]=useState('');
  const [Movies,setMovies]=useState([]);
  const [isLoading,setIsLoading]=useState("");
  const [movieresultas,setMovieResults]=useState(null);


  const fetchMovie=()=>{
    setMovieResults(true)
    setIsLoading(true);
    axios.get(`https://www.omdbapi.com/?apikey=c951ff1&s=${movieName}`)
    .then((res)=>{
      if(res.data.Response=='True'){
        setIsLoading(false);
        setMovies(res.data.Search)
      }else{
        setMovies([])
        setMovieResults(false)
        setIsLoading(false);
      }
    })
  }

  return (
    <>
      <div style={{textAlign:"center",marginTop:"30px"}}>
        <input onChange={(e)=>{setMovieName(e.target.value)}} placeholder='Enter movie Name'/>
        <button onClick={()=>{fetchMovie()}} class="ms-4">Search Movie</button>
        {isLoading==true?<p>Loading.....</p> : ""}
        {movieresultas==false?<p>404 Movie Not Found !</p> : ""}
        <div className='movie-wrapper'>
          {Movies.map((item,i)=>{
            return <div className='movie-card'>
            <img src={item.Poster}/>
            <p><b>Title : </b>{item.Title}</p>
            <p><b>Type : </b>{item.Type}</p>
            <p><b>Released Year : </b>{item.Year}</p>
          </div>
          })}
        </div>  
      </div>
    </>
  );
}
export default Btn_search_engine;
