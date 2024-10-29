//Finding Movies By Search Engine When User Gives Inputing
import React,{useState,useEffect} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Btn_search_engine from "./SearchEngineByButton";
import './App.css';
import Home from "./home";


function App() {
  
  const [popularMovies,setPopularMovies]=useState([]);
  const [searchedMovieName,setSearchMovieName]=useState("");
  const [searchedMovies,setSearchedMovies]=useState([]);

  useEffect(()=>{
    axios.get("https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716")
    .then((res)=>{
      console.log(res.data)
      setPopularMovies(res.data.results)
    })
},[])

useEffect(()=>{
  axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchedMovieName}&api_key=cfe422613b250f702980a3bbf9e90716`)
  .then((res)=>{
    console.log(res.data)
    setSearchedMovies(res.data.results)
  })
},[searchedMovieName])
  
  return (
    <>
      <Home/>
      <Btn_search_engine/> 
       <div class="text-center mt-5">
       <input  class="form-control w-25 text-center mx-auto mt-5" onChange={(e)=>{
          setSearchMovieName(e.target.value);
         }} placeholder="Search Movie Name"> 
        </input>
      </div>
      <div class="container mt-5">
        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
           { searchedMovies.length > 0 || searchedMovieName != "" ?  searchedMovies.map((item,i)=>{
           return <div class="col">
            <div class="card" >
              <img style={{height:"300px",width:"100%"}} src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} alt="images not found !"/>
              <div class="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.overview}</p>
              </div>
            </div>
            
          </div>
          }) :
          
          popularMovies.map((item,i)=>{
            return <div class="col">
             <div class="card">
               <img style={{height:"300px",width:"100%"}} src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} alt="images not found !"/>
               <div class="card-body">
                 <h5 className="card-title">{item.title}</h5>
                 <p className="card-text">{item.overview}</p>
               </div>
             </div>
           </div>
           })
          }
        </div>
        {searchedMovies.length==0 && searchedMovieName!="" ? <div class="text-center"><p>404 Searched Movies Not Found !</p></div> : ""}
      </div>
    </>
  )
}

export default App

// import React,{useState} from "react";
// import './GeneratePassword.css'


// function App() {
//   const [Length,setLength]=useState(4)
//   const [checkboxData,setcheckboxData]=useState([
//     {title:"Include UpperCase Letter",State:false},
//     {title:"Include LowerCase Letter",State:false},
//     {title:"Include Numbers", State:false},
//     {title:"Include Symbols", State:false}
//   ])
//   console.log(Length)
//   const HandleCheckboxesChange=(index)=>{
//     const updatedCheckBoxeData=[...checkboxData]
//     updatedCheckBoxeData[index].State=!updatedCheckBoxeData[index].State
//     setcheckboxData(updatedCheckBoxeData)
//   }
//   return (
//     <>
//       <div className="text_center">
//         <h2>App Component.</h2>
//       </div>
//       <div className="container">
//         <div className="header">
//           <div className="title">kfc@123</div>
//           <button className="copyBtn">Copy</button>
//         </div>
//         <div className="charLength">
//           <span >
//             <label>charLength</label>
//             <label>{Length}</label>
//           </span>
//           <input type="range" min={4} max={20} value={Length} onChange={(e)=>{setLength(e.target.value)}}/>
//         </div>
//         <div className="checkBoxes">
//           {checkboxData.map((checkbox,index)=>{
//             return <div className="" key={index}>
//               <input type="checkbox" checked={checkbox.State} onChange={()=>{HandleCheckboxesChange(index)}}/>
//               <label>{checkbox.title}</label>
//             </div>
//           })}
//         </div>
//         <button className="GenerateBtn" onClick={()=>{}}>Generate Password</button>
//       </div>
//     </>
//   )
// }

// export default App
