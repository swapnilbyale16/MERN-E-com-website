import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'

function AddProd() {

  let obj = useContext(Ct)
  let navigate = useNavigate()
  let [data, udata] = useState({ "name": "", "cat": "", "price": "", "desc": "", "pimg": "" })


  let fun = (e) => {
    udata({ ...data, [e.target.name]: e.target.value })
  }
  let fun1 = (e) => {
    udata({ ...data, 'pimg': e.target.files[0] })
  }

  useEffect(()=>{
    if(obj.state._id === "" && obj.state.role !== "admin"){
      navigate("/login")
    }
  },[])
  let add = () => {
    if (data.name !== "" && data.cat !== "" && data.price !== "" && data.desc !== "" && data.pimg !== "") {
      let fd = new FormData()
      for (let i in data) {
        fd.append(i, data[i])
      }
      axios.post("http://localhost:5000/add", fd,{"headers":{"Authorization":obj.state.token,"uid":obj.state._id}}).then((res) => {
        navigate("/")
      })
    } else {
      alert("Please fill out all fields before submitting.")
    }
  }


  return (
    <div className='main'>
      <div className='form'>
        <input type='text' onChange={fun} placeholder='Name of the product' name='name' />
        <input type='text' onChange={fun} placeholder='Catagory of the product' name='cat' />
        <input type='text' onChange={fun} placeholder='Price of the product' name='price' />
        <textarea rows={4} onChange={fun} placeholder='Description' name='desc'></textarea>
        <input type='file' name='pimg' onChange={fun1} />
        <button onClick={add}>Add Product</button>

      </div>
    </div>
  )
}

export default AddProd