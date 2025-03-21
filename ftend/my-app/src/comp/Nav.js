import { Link } from 'react-router-dom'
import '../App.css'
import { useContext} from 'react'
import Ct from './Ct'
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';



function Nav() {
  let obj = useContext(Ct)

  return (
    <nav>
      <div className='logo'>Shophub</div>
        <Link to="/"><i class="fa-solid fa-house"></i>&nbsp;Home</Link>
        {obj.state.token ==="" && <Link to="/reg"><i class="fa-solid fa-registered"></i>&nbsp;Registar</Link>}

        {obj.state.token ==="" && <Link to="/login"><i class="fa-solid fa-right-to-bracket"></i>&nbsp;Login </Link>}

        {obj.state.token !=="" && <Link to="/cart"><i class="fa-solid fa-cart-shopping"></i>&nbsp;Cart{obj.state.cartlength>0 &&<button>{obj.state.cartlength}</button>}</Link>}

        {obj.state.token !=="" && obj.state.role === "admin" && <Link to="/addproduct"><i class="fa-solid fa-square-plus"></i>&nbsp;AddProd</Link>}

        {obj.state.token !=="" &&<Link to="/logout">Logout &nbsp;<i class="fa-solid fa-right-from-bracket"></i></Link>}

        {obj.state.token!=="" && <div style = {{display:"flex", gap: "5px" }}><Avatar sx={{ bgcolor: deepOrange[500] }}>{obj.state.name[0].toUpperCase()}</Avatar><div className='name'>{obj.state.name}</div></div>}
    </nav>
  )
}

export default Nav