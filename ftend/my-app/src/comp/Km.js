import React, { useContext, useEffect, useState } from 'react'
import Ct from './Ct'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Km() {
  let obj = useContext(Ct)
  let [pobj, uprod] = useState("")
  let [cmt, ucmt] = useState({ "text": "", "rt": 3.6 })
  let navigate = useNavigate()




  let fun = (e) => {
    ucmt({ ...cmt, [e.target.name]: e.target.value })
  }


  useEffect(() => {
    uprod(obj.state.proddet)
    let storedProd = sessionStorage.getItem("proddet") // after refresh Load from session storage
    if (storedProd) {
      uprod(JSON.parse(storedProd))
    } else {
      uprod(obj.state.proddet)
    }
    console.log(obj.state.proddet)
  }, [obj.state])



  let addcom = () => {
    axios.post("http://localhost:5000/comment", { ...cmt, 'name': obj.state.name, 'pid': obj.state.proddet._id },{"headers":{"Authorization":obj.state.token}}).then((res) => {
      console.log(res.data)
      uprod(res.data)
    })
  }


  let addcart = () => {
    axios.post("http://localhost:5000/addcart", { "uid": obj.state._id, "pid": pobj._id, "pimg": pobj.pimg, "price": pobj.price, "name": pobj.name, "qty": 1 },{"headers":{"Authorization":obj.state.token}}).then((res) => {
      navigate("/cart")
    })
  }


  return (
    <div className='km'>
      <div className='kimg'><img src={`http://localhost:5000/pimgs/${pobj.pimg}`} alt='product' />
        <button onClick={addcart}>Add to Cart</button></div>
      <div className='kdet'>
        <h1>{pobj.name}</h1>
        <h2>₹ {pobj.price}</h2>
        <h3>{pobj.cat}</h3>
        <p>{pobj.desc}</p>
        <div className="offers">
          <h3>Available Offers</h3>

          <p><i class="fa-solid fa-tag"></i><strong>Special Price</strong> - Get extra 44% off (price inclusive of cashback/coupon) <span>T&C</span></p>
          <p><i class="fa-solid fa-tag"></i><strong>Bank Offer</strong> - 5% Unlimited Cashback on Flipkart Axis Bank Credit Card <span>T&C</span></p>
          <p><i class="fa-solid fa-tag"></i><strong>Bank Offer</strong> - Flat ₹500 off on RuPay Credit Card EMI Transactions, on orders of ₹15,000 and above <span>T&C</span></p>
          <p><i class="fa-solid fa-tag"></i><strong>Bank Offer</strong> - 10% off up to ₹1,200 on HDFC Bank Credit Card EMI on 6 and 9 months tenure. Min Txn Value: ₹5000 <span>T&C</span></p>
        </div>
      </div>
      <div className='add-cmt'>
        {obj.state._id !== "" && <div className='comment'>
          <textarea rows={4} placeholder='About the product' onChange={fun} name='text'></textarea>
          <Stack spacing={1}>
            <Rating
              value={cmt.rt} 
              precision={0.5}
              name="rt"
              onChange={(event, newValue) => ucmt({ ...cmt, rt: newValue })}
            />
          </Stack>
          <button onClick={addcom}>Add comment</button>
        </div>}
        <div className='cmt-store'>
          <h2>Comments Added by Users: </h2>
          {pobj.comm && pobj.comm.map((commnt) => {
            return (
              <div className='show-cmt'>
                <h3>{commnt.name}</h3>
                <p>{commnt.text}</p>
                <Rating name="half-rating-read" defaultValue={commnt.rt} precision={0.5} readOnly />
              </div>
            )
          })
          }
        </div>
      </div>
    </div>
  )
}

export default Km