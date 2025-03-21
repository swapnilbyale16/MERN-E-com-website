import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'
import Cookies from 'js-cookie'

function Login() {
    let [data,udata] = useState({"_id":"","pwd":""})
    let [msg,umsg] = useState("")
    let navigate = useNavigate()
    let [msgColor, setMsgColor] = useState('red')
    let obj = useContext(Ct)
    let fun=(e)=>{
        udata({...data,[e.target.name]:e.target.value})
    }
    let log=()=>{
        if(data._id !=="" && data.pwd !==""){
            axios.post("http://localhost:5000/login",data).then((res)=>{
                if(res.data.token !== undefined){
                    obj.updstate(res.data)
                    console.log( Cookies.set('authToken', res.data.token, { expires: 1 }))
                    umsg("Login Successfully")
                    setMsgColor('green')
                    setTimeout(() => navigate('/'), 1000)
                }else{
                    umsg(res.data.msg)
                }
            })
        }else{
            umsg("please fill the details")
        }
    }
  return (
    <div className='main'>
        <div className='form'>
            <div className='msg' style={{ color: msgColor }}>{msg}</div>
            <input type='text' placeholder='Enter Email' onChange={fun} name='_id' value={data._id} />
            <input type='password' placeholder='Enter Password' onChange={fun} name='pwd' value={data.pwd} />
            <button onClick={log}>Login</button>
        </div>
    </div>
  )
}

export default Login