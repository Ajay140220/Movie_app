
import React from 'react';
import './App.css';
import NavBar from './componets/NavBar';
import Banner from './componets/Banner';
import List from './componets/List';
import Favourites from './componets/Favourites';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
function App() {
  return (
       <>
        {/* <NavBar/>
        <Banner/>
        <List/> */}
        <BrowserRouter>
        <Routes>
          <Route path="/"  element={<>
          <NavBar/>
          <Banner/>
          <List/></>}/>

          <Route path="/fav"  element={
          <><NavBar/>
          <Favourites/>
          </>} />
        </Routes>
        </BrowserRouter>
        
        </>
    );
}

export default App;
