import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home, ProductDetails, Purchases } from './pages';
import { ScreenLoading, NavBar, ProtectedRoutes } from './components'
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
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/Purchases' element={<Purchases />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
