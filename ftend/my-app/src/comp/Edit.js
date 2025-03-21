import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'

function Edit() {

  let [prod,uprod] = useState({"_id":"","name":"","price":"","cat":""})
  let navigate = useNavigate()
  let obj = useContext(Ct)

  let fun = (e) =>{
    uprod({...prod,[e.target.name]:e.target.value})
  }
  

  useEffect(()=>{
    uprod(obj.state.proddet)
    if(obj.state._id === "" && obj.state.role !== "admin"){
      navigate("/login")
    }
  },[obj.state.proddet])

  let edit =()=>{
      axios.put("http://localhost:5000/edit",prod,{"headers":{"Authorization":obj.state.token,"uid":obj.state._id}}).then((res)=>{
        navigate("/")
      })
    
  }


  return (
    <div className='main'>
      <div className='form'>
        <input type='text' placeholder='Enter product name' onChange={fun} name='name' value={prod.name}/>
        <input type='text' placeholder='Enter price' onChange={fun} name='price' value={prod.price}/>
        <input type='text' placeholder='Enter catagory' onChange={fun} name='cat' value={prod.cat}/>
        <textarea onChange={fun} name='desc' value={prod.desc}></textarea>
        <button onClick={edit}>Edit</button>
      </div>
    </div>
  )
}

export default Edit