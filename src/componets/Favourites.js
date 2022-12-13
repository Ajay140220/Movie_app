import React, { Component } from 'react'
import NavBar from './NavBar';
import axios from 'axios';
let genreId = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV",
  53: "Thriller",
  10752: "War",
  37: "Western",
};
export default class Favourites extends Component {

    constructor(){
        super();
        this.state = {
            movies:[],
            genre:[],
            currGenre:"All Genre",
            
        }
   }
   async componentDidMount(){
     let data =  JSON.parse(localStorage.getItem("movies")) || [];
          console.log(data);
     let allgenre = [];
     data.map((movieobj) =>{
        if(!allgenre.includes(genreId[movieobj.genre_ids[0]])){
            allgenre.push(genreId[movieobj.genre_ids[0]]);
        }
     })
     allgenre.unshift("All Genre");
     
     this.setState({
      movies:[...data],
      genre:allgenre
});

 }

 handlegenre = (e) =>{
        let genre = e.target.innertext;
        this.setState({
          currGenre:genre
        })
 }
  

  render() {
    
    let filteredMovies = [];
    let filmov=  JSON.parse(localStorage.getItem("movies")) || [];
    /* For filtering on genre */
    if (this.state.currGenre == "All Genre") {
          filteredMovies = filmov;
    } else {
    filteredMovies = filmov.filter(
        (movieObj) => genreId[movieObj.genre_ids[0]] == this.state.currGenre
     );
     }

    return (
     
     
     <div className="row">
     <div className = "col-3 p-5 Favourites-list">
     <ul class="list-group">
     {/* {
      this.state.genre.map((genre)=>{
         return this.state.currGenre == genre?
        <li class="list-group-item active" aria-current="true">{genre}</li>:
          <li class="list-group-item " onClick={this.handlegenre}>{genre}</li>

         
  
      })
   } */}
      {this.state.genre.map((genreName, id) => {
                return genreName == this.state.currGenre ? (
                  <a
                    href="#"
                    className="list-group-item list-group-item-action px-3 border-0 ripple active"
                    aria-current="true"
                    key={id}
                  >
                    {this.state.currGenre}
                  </a>
                ) : (
                  <a
                    href="#"
                    className="list-group-item list-group-item-action px-3 border-0"
                    key={id}
                    onClick={this.handleGenre}
                  >
                    {genreName}
                  </a>
                );
              })}
  {/* <li class="list-group-item">Fantasy</li>
  <li class="list-group-item">Action</li>
  <li class="list-group-item">Animation</li> */}
   
   </ul>
   </div>
   <div className = "col p-5 favourites-table">
   <div className = "row p-2">
    <input type="text" placeholder='Enter you search' className="col-8"></input>
    <input type="number" placeholder='results per page' className="col"></input>
   </div>
     
  <table className="table">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Genre</th>
      <th scope="col">Popularity</th>
      <th scope="col">Rating</th>
    </tr>
  </thead>
  <tbody>
    {
      filteredMovies.map((movieobj) => {
    return(
        
    <tr>
      <td><img src={`https://image.tmdb.org/t/p/original/${movieobj.backdrop_path}`}
                        style={{width:'8rem'}} />
        {movieobj.title}</td>
      <td>{genreId[movieobj.genre_ids[0]]}</td>
      <td>{movieobj.popularity}</td>
      <td>{movieobj.vote_average}</td>
      <td> <button className="btn btn-outline-danger">Delete</button></td>
    </tr>
    );
  }
)
}
  </tbody>
  </table>
      </div>
      </div>
     
    )
  }
}
