import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Ct from './Ct';
import { useNavigate } from 'react-router-dom';

function Prod() {
  let [prod, uprod] = useState([])
  let navigate = useNavigate()
  let obj = useContext(Ct)
  let [f,setF]=useState(true)


  
  useEffect(() => {
    axios.get("http://localhost:5000/products").then((res) => {
      //uprod(res.data)
      uprod(res.data.sort(() => Math.random() - 0.5))  //for randomly suffle product
    })
  }, [f])



  let km = (pobj) => {
    obj.updstate({"proddet":pobj})
    sessionStorage.setItem("proddet", JSON.stringify(pobj))  // Saved to session storage
    navigate("/km")
  }

  let edit=(pobj)=>{
    obj.updstate({"proddet":pobj})
    navigate("/edit")
  }


  let addcart=(pobj)=>{
    axios.post("http://localhost:5000/addcart",{"uid":obj.state._id,"pid":pobj._id,"pimg":pobj.pimg,"price":pobj.price,"name":pobj.name,"qty":1},{
      "headers":{"Authorization":obj.state.token}
    }).then((res)=>{
      navigate("/cart")
    })
  }

  let del=(pid)=>{
    let ff = window.confirm("Are you sure you want to delete this product?")
    if(ff){
    axios.delete(`http://localhost:5000/delete/${pid}`,{"headers":{"Authorization":obj.state.token,"uid":obj.state._id}}).then((res)=>{
      setF(!f)
    })
  }
  }



  return (
    <div className='cardcon'>
      {prod.map((pobj) => {
        return (<div className='card'>
          <img src={`http://localhost:5000/pimgs/${pobj.pimg}`} alt='product' onClick={() => km(pobj)}/>
          <div className='card-content'>
            <h1>{pobj.name}</h1>
            <h2>Cat: {pobj.cat}</h2>
            <p>{pobj.desc}</p>
            <h2 className='price'>₹ {pobj.price}</h2>
          </div>
          
          <div className='card-buttons'>
            {obj.state.token !== "" && obj.state.role === "admin" && <button style={{ background: "#ff6f61" }} onClick={()=>del(pobj._id)}>Delete</button>}
            {obj.state.token !== "" && obj.state.role === "admin" && <button style={{ background: "#42a5f5" }} onClick={()=>edit(pobj)}>Edit</button>}
            <button style={{background: "#66bb6a"}} onClick={()=>addcart(pobj)}>Add to Cart</button>
            <button style={{ background: "#ffca28" }} onClick={() => km(pobj)}>Know More</button>
          </div>
        </div>)
      })
      }

    </div>
  )
}

export default Prod