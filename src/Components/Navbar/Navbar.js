//import styles here
import "./Navbar.css"
// import svg logos here
import Temple from "../../assets/temple.svg"
//Import react router dom here
import {Link} from "react-router-dom";
// import firestore hooks
import {useLogout} from "../../Hooks/useLogout";
import { useAuthContext } from "../../Hooks/useAuthContext";

const Navbar = () => {

    const {user} = useAuthContext();

    const {logout, isPending} = useLogout();

  return (
    <nav className="navbar">
        <ul>
            <li className="logo">
                <img src={Temple} alt=""/>
                <span>The Dojo</span>
            </li>
            {!user && <li><Link to ="/login">Login</Link></li> }
            {!user && <li><Link to ="/signup">Signup</Link></li>}
            
            <li>
                {!isPending && user && <button className="btn" onClick={logout}>Logout</button>}
                {isPending && <button disabled className="btn">Logging out...</button>}
            </li>
        </ul>
    </nav>
  )
}

export default Navbar