import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Reg() {
    let [data, udata] = useState({ '_id': "", "name": "", "phno": "", "pwd": "" })
    let [msg, umsg] = useState("")
    let navigate = useNavigate()
    let fun = (e) => {
        udata({ ...data, [e.target.name]: e.target.value })
    }
    let add = () => {
        if (data.id !== "" && data.name !== "" && data.phno !== "" && data.pwd !== "") {
            axios.post("http://localhost:5000/reg", data).then((res) => {
                if (res.data.msg === "registration done") {
                    navigate("/login")
                } else {
                    umsg(res.data.msg)
                }
            })
        } else {
            umsg("please enter all the details")
        }
    }
    return (
        <div className='main'>
            <div className='form'>
                <div className='msg'>{msg}</div>
                <input type='text' placeholder='Enter Email' onChange={fun} name='_id' value={data._id} />
                <input type='text' placeholder='Enter Name' onChange={fun} name='name' value={data.name} />
                <input type='text' placeholder='Enter Phno' onChange={fun} name='phno' value={data.phno} />
                <input type='text' placeholder='Enter Password' onChange={fun} name='pwd' value={data.pwd} />
                <button onClick={add}>Add</button>
            </div>
        </div>
    )
}

export default Reg