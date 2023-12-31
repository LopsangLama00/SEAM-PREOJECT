import { useState } from 'react'
import './App.css'
import NavScrollExample from './components/Navbar';

import {BrowserRouter,Routes,Route } from 'react-router-dom';
import PlaintextExample from './components/SignIn/Login';
import Homepage from './components/Homepage';
import Register from './components/SignIn/SignUp';
import GetProductTest from './components/Products/GetProductTest';
import AddProduct from './components/Products/AddProduct';
import Checkout from './components/Order/Order';


function App() {


  return (
    <>
    <BrowserRouter>
    <NavScrollExample />
    <Routes>

      <Route path="/login" element={<PlaintextExample />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Homepage />} />
      <Route path="/productlist" element={<GetProductTest />} />
      <Route path="/addProduct" element= {<AddProduct />} />
      <Route path="/ordering" element={<Checkout/>} />


    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
