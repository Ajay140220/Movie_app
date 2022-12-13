import React, { Component } from 'react'
// import { movies } from './getmovies';
import axios from 'axios';
export default class List extends Component {

  constructor(){
    console.log("constructor");
      super();
      this.state = {
           hover:0,
           movies:[],
           currpage:1,
           favourites:JSON.parse(localStorage.getItem("movies")),
           
      };
    //  this.favouritesMovies = [];
      //movie of object
  }

  handleEnter = (id)=>{
       this.setState({
           hover:id
       });
  }
  handleLeave = ()=>{
    this.setState({
        hover:0
    });
}

async componentDidMount(){
  console.log("cdm");
  let data = await axios.get(
    "https://api.themoviedb.org/3/movie/popular?api_key=f060fa0e9f765c858800f34492b77418&language=en-US&page=1"
  );
    console.log(data);
    this.setState({
          movies:[...data.data.results]
    });

}

async getupdatedmovies(){
  console.log("updated movies data");
  let data = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=f060fa0e9f765c858800f34492b77418&language=en-US&page=${this.state.currpage}`
  );
    console.log(data);
    this.setState({
          movies:[...data.data.results]
    });

}

handlenext = ()=>{
  this.setState({currpage: this.state.currpage + 1}, this.getupdatedmovies);
}

handleprevious = ()=>{
   if(this.state.currpage>1){
     this.setState({currpage: this.state.currpage - 1}, this.getupdatedmovies);
    }
}
handleFavourites = (movieObj) => {
  
  let fav = JSON.parse(localStorage.getItem("movies")) || [];

  if (this.state.favourites.includes(movieObj.id)) {
    //if id already present -> remove
    fav = fav.filter((movie) => movie.id != movieObj.id);
  } else {
    //add the movie
     fav.push(movieObj);
  }

  localStorage.setItem("movies", JSON.stringify(fav));
  let tempData = fav.map((movieObj) => movieObj.id);
  this.setState({
    favourites: [...tempData],
  });
};

  componentWillUnmount = ()=>{
       console.log("cwm called");
  }
  render() {
    let checkfav = JSON.parse(localStorage.getItem("movies")) || [];
    checkfav = checkfav.map((movie) => movie.id);
    // let allmovies = movies.results;
    console.log("render");
    return (
         <>{this.state.movies.length == 0 ? (
            <div className="spinner-border text-info" role ="status">
              <span className = "visually-hidden">Loading...  </span>
            </div>
         ):(
          <div>
            <h3 className="display-3 heading-trending">Trending</h3>

        <div className="movies-list">
             {
               this.state.movies.map((movieobj)=>{
                return(
                <div className="card movie-card" 
                onMouseEnter={() =>this.handleEnter(movieobj.id)} 
                onMouseLeave={this.handleLeave}
                key = {movieobj.id}>
                <img src={`https://image.tmdb.org/t/p/original/${movieobj.backdrop_path}`}className="card-img-banner-img" alt="..."/>
                
                <h5 className="card-title movie-title">{movieobj.title}</h5>
                 <div className="button-wrapper">
                {
                  this.state.hover == movieobj.id && ( 
                  <a className="btn btn-info movie-button" onClick={() => this.handleFavourites(movieobj)}>
                 {!checkfav.includes(movieobj.id)? 
                 `Add to favourites`:
                 `Remove from favourites`   
                 }
              </a>)
                }
                </div>
                
               </div>);
               })
             }
       </div>
       </div>
         )
         
         }
         <div>
         <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item" onClick={this.handleprevious}><a className="page-link" >Previous</a></li>
    <li className="page-item"><a className="page-link" >{this.state.currpage}</a></li>
     
    <li className="page-item" onClick={this.handlenext}><a className="page-link" >Next</a></li>
  </ul>
   </nav>
         </div>
         </>
    );
  }
}