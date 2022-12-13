import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class NavBar extends Component {
  render() {
    return (
      <div style={{display: "flex" , justifyContent: "center", alignItems: "center", padding: "1rem", background:"lightblue"}}>
       <Link to="/">
       <h1>Movies App</h1>
       </Link>
         <Link to="/fav"> 
        <h1 style = {{marginLeft:"2rem"}}>Favourites</h1>
        </Link>
      </div>
    );
  }
}
