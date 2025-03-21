import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { useState } from 'react'
import Prod from './comp/Prod'
import Login from './comp/Login'
import Reg from './comp/Reg'
import Nav from './comp/Nav'
import Cart from './comp/Cart'
import Logout from './comp/Logout'
import Ct from './comp/Ct'
import AddProd from './comp/AddProd'
import Km from './comp/Km'
import Edit from './comp/Edit'

function App() {
  let [state,setState] = useState({"token":"","_id":"","name":"","role":""})
  let updstate=(obj)=>{
    setState({...state,...obj})
  }
  let obj = {"state":state,"updstate":updstate}
  return (
    <BrowserRouter>
    <Ct.Provider value={obj}>
    <Nav/>
    <Routes>
      <Route path='/' element={<Prod/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/reg' element={<Reg/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/addproduct' element={<AddProd/>}></Route>
      <Route path='/logout' element={<Logout/>}></Route>
      <Route path='/km' element={<Km/>}></Route>
      <Route path='/edit' element={<Edit/>}></Route>
    </Routes>
    </Ct.Provider>
    </BrowserRouter>
  )
}

export default App