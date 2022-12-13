import React, { Component } from 'react'
import axios from 'axios';
export default class Banner extends Component {

  constructor(){
       super();
       this.state = {
           movies:[],
       }
  }
  async componentDidMount(){
    let data = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=f060fa0e9f765c858800f34492b77418&language=en-US&page=1"
    );
    console.log(data);
    this.setState({
          movies:[...data.data.results]
    });

}
  render() {
    
    return (
      <>
      {this.state.movies.length == 0 ? (
        <div className="spinner-border text-warning" role="status">
          ...  
        </div>
      ) :(
      <div className="card banner-card">
      <img src={`https://image.tmdb.org/t/p/original/${this.state.movies[0].backdrop_path}`}
       className="card-img banner-img" alt="..."/>
      
      <h5 className="card-title banner-title">{this.state.movies[0].title}</h5>
       <p className="card-text banner-text">{this.state.movies[0].overview} </p>
       {/* <a href="#" className="btn btn-primary">
        Go somewhere
         </a> */}
         </div>
         
      )
      }
        </>
     
         
    );
  }
}
