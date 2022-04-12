import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home, ProductDetails } from './pages';
import { ScreenLoading, NavBar } from './components'
import { useSelector } from 'react-redux';
import React from 'react';
import './App.css';

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <div className="App">
      <HashRouter>
        {isLoading && <ScreenLoading />}
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetails />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
