import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Ct from './Ct';
import axios from 'axios';

function Cart() {
  let obj = useContext(Ct);
  let navigate = useNavigate();
  let [cart, ucart] = useState([]);
  let [total, utotal] = useState(0);
  let [f, setF] = useState(true);

  useEffect(() => {
    if (!obj.state._id) {
      navigate("/login");
    } else {
      axios.get(`http://localhost:5000/getcart/${obj.state._id}`, {
        headers: { "Authorization": obj.state.token }
      }).then((res) => {
        ucart(res.data);
        obj.updstate({ "cartlength": res.data.length });
        let s = res.data.reduce((acc, item) => acc + item.qty * item.price, 0);
        utotal(s);
      }).catch(err => console.error("Error fetching cart:", err));
    }
  }, [f, navigate, obj.state._id]);

  let shop = () => navigate("/");

  let inc = (cid) => {
    axios.get(`http://localhost:5000/inc/${cid}`, {
      headers: { "Authorization": obj.state.token }
    }).then(() => setF(!f));
  };

  let dec = (cid, qty) => {
    if (qty > 1) {
      axios.get(`http://localhost:5000/dec/${cid}`, {
        headers: { "Authorization": obj.state.token }
      }).then(() => setF(!f));
    } else {
      del(cid);
    }
  };

  let del = (cid) => {
    axios.delete(`http://localhost:5000/delcart/${cid}`, {
      headers: { "Authorization": obj.state.token }
    }).then(() => setF(!f));
  };

  let placeOrder = () => {
    axios.post("http://localhost:5000/place-order", {
      uid: obj.state._id,
      email: obj.state._id,  // ✅ Ensure email is sent
      cart: cart
    }, {
      headers: { "Authorization": obj.state.token }
    })
    .then(res => {
      alert(res.data.message);
      navigate("/");
    })
    .catch(err => {
      console.error("Order Error:", err);
      alert("Failed to place order. Try again.");
    });
  };

  let handleOrder = (prod) => {
    axios.post("http://localhost:5000/place-order", {
      uid: obj.state._id,
      email: obj.state._id,
      cart: [prod] // ✅ Send only one product
    }, {
      headers: { "Authorization": obj.state.token }
    })
    .then(res => {
      alert(`Order placed for ${prod.name}!`);
      navigate("/");
    })
    .catch(err => {
      console.error("Buy Now Error:", err);
      alert("Failed to place order. Try again.");
    });
  };

  return (
    <div className='cart-con'>
      {cart.length === 0 ? (
        <div className='cart-empty'>
          <img src='https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90' alt='err' />
          Your cart is empty! Start adding some amazing products.
          <button className='cart-shop' onClick={shop}>Shop Now</button>
        </div>
      ) : (
        <>
          {cart.map((prodobj) => (
            <div className='cart' key={prodobj._id}>
              <img src={`http://localhost:5000/pimgs/${prodobj.pimg}`} alt='product' />
              <div className='cart-body'>
                <h3>{prodobj.name}</h3>
                <p>Price : {prodobj.price}</p>
                <div className='cart-btn'>
                  <div className='cart-qty'>
                    <button onClick={() => dec(prodobj._id, prodobj.qty)}>-</button>
                    {prodobj.qty}
                    <button onClick={() => inc(prodobj._id)}>+</button>
                  </div>
                  <button className='cart-del' onClick={() => del(prodobj._id)}>Delete</button>
                  <button className='cart-buy' onClick={() => handleOrder(prodobj)}>Buy Now</button>
                </div>
              </div>
            </div>
          ))}
          <div className='cart-nav'>
            <div className='cart-total'>
              <i className="fas fa-shopping-bag"></i> Cart Total: {total}
            </div>
            <button className='cart-shop' onClick={placeOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
